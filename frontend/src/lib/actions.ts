'use server';

import { hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import {
  bookingSchema,
  contactSchema,
  customTripSchema,
  flattenErrors,
  type FormResult,
} from './schemas';
import { createContactMessage, createReservation, StrapiError, type ReservationResult } from './strapi';
import { getClientIp, rateLimit, verifyTurnstile } from './security';

/**
 * Server Actions des formulaires : limitation de débit, pot de miel, Turnstile, validation zod,
 * puis transmission à Strapi avec le token serveur. Le navigateur ne parle jamais à Strapi.
 */

const TEN_MINUTES = 10 * 60 * 1000;

type Guard = { ok: true; ip: string } | { ok: false; result: FormResult<never> };

async function guard(form: string, honeypot: string | undefined, token: string | undefined, limit: number): Promise<Guard> {
  const ip = await getClientIp();
  if (!rateLimit(`${form}:${ip}`, limit, TEN_MINUTES)) return { ok: false, result: { ok: false, error: 'rate_limited' } };
  if (honeypot) return { ok: false, result: { ok: false, error: 'captcha' } };
  if (!(await verifyTurnstile(token, ip))) return { ok: false, result: { ok: false, error: 'captcha' } };
  return { ok: true, ip };
}

function strapiFailure(error: unknown): FormResult<never> {
  if (error instanceof StrapiError && error.status === 400) {
    const details = (error.details as { error?: { details?: { errors?: Record<string, string> } } })?.error?.details;
    if (details?.errors) return { ok: false, error: 'validation', fieldErrors: details.errors };
  }
  console.error('[form] Échec de transmission à Strapi', error);
  return { ok: false, error: 'server' };
}

const safeLocale = (locale: string) => (hasLocale(routing.locales, locale) ? locale : routing.defaultLocale);

export async function submitBooking(values: unknown, locale: string): Promise<FormResult<ReservationResult>> {
  const parsed = bookingSchema.safeParse(values);
  if (!parsed.success) return { ok: false, error: 'validation', fieldErrors: flattenErrors(parsed.error) };
  const v = parsed.data;

  const check = await guard('booking', v.company, v.turnstileToken, 5);
  if (!check.ok) return check.result;

  try {
    const data = await createReservation({
      destination: v.destination,
      startDate: v.startDate,
      adults: v.adults,
      children: v.children,
      transport: v.transport,
      accommodation: v.accommodation,
      privateGuide: v.privateGuide,
      guideLanguage: v.guideLanguage,
      fullName: v.fullName,
      email: v.email,
      phone: v.phone,
      country: v.country || null,
      message: v.message || null,
      customerLocale: safeLocale(locale),
      termsAccepted: true,
    });
    return { ok: true, data };
  } catch (error) {
    return strapiFailure(error);
  }
}

export async function submitContact(values: unknown, locale: string): Promise<FormResult> {
  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) return { ok: false, error: 'validation', fieldErrors: flattenErrors(parsed.error) };
  const v = parsed.data;

  const check = await guard('contact', v.company, v.turnstileToken, 5);
  if (!check.ok) return check.result;

  try {
    await createContactMessage({
      kind: 'general',
      name: v.name,
      email: v.email,
      phone: v.phone || null,
      subject: v.subject || null,
      message: v.message,
      customerLocale: safeLocale(locale),
    });
    return { ok: true, data: undefined };
  } catch (error) {
    return strapiFailure(error);
  }
}

export async function submitCustomTrip(values: unknown, locale: string): Promise<FormResult> {
  const parsed = customTripSchema.safeParse(values);
  if (!parsed.success) return { ok: false, error: 'validation', fieldErrors: flattenErrors(parsed.error) };
  const v = parsed.data;

  const check = await guard('custom-trip', v.company, v.turnstileToken, 3);
  if (!check.ok) return check.result;

  try {
    await createContactMessage({
      kind: 'custom_trip',
      name: v.name,
      email: v.email,
      phone: v.phone || null,
      subject: 'custom_trip',
      message: v.message,
      customerLocale: safeLocale(locale),
      tripDetails: {
        startDate: v.startDate || 'flexible',
        durationDays: v.durationDays,
        adults: v.adults,
        children: v.children,
        budgetPerPersonEur: v.budget,
        accommodation: v.accommodation,
        interests: v.interests,
      },
    });
    return { ok: true, data: undefined };
  } catch (error) {
    return strapiFailure(error);
  }
}
