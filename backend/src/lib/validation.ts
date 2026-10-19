import { SUPPORTED_LOCALES, isSupportedLocale, type SupportedLocale } from './constants';
import type { Accommodation } from './pricing';

/**
 * Validation serveur (seconde barrière après zod côté Next.js).
 * Les champs inconnus sont ignorés : impossible d'injecter statut, prix ou notes internes.
 * Les erreurs sont renvoyées sous forme de codes (« required », « invalid »…) traduits par le front.
 */

export type FieldErrors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9 ().-]{6,30}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const COUNTRY_RE = /^[A-Z]{2}$/;
const ACCOMMODATIONS: Accommodation[] = ['none', 'standard', 'superior', 'luxury'];

const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
const int = (v: unknown) => (typeof v === 'number' ? v : typeof v === 'string' && v !== '' ? Number(v) : NaN);
const bool = (v: unknown) => v === true || v === 'true';

function checkText(errors: FieldErrors, field: string, value: string, { min = 0, max }: { min?: number; max: number }) {
  if (min > 0 && value.length === 0) errors[field] = 'required';
  else if (value.length < min) errors[field] = 'too_short';
  else if (value.length > max) errors[field] = 'too_long';
}

export interface ReservationInput {
  destination: string;
  startDate: string;
  adults: number;
  children: number;
  transport: boolean;
  accommodation: Accommodation;
  privateGuide: boolean;
  guideLanguage: SupportedLocale;
  fullName: string;
  email: string;
  phone: string;
  country: string | null;
  customerLocale: SupportedLocale;
  message: string | null;
  termsAccepted: true;
}

export function validateReservation(raw: any): { data?: ReservationInput; errors: FieldErrors } {
  const errors: FieldErrors = {};
  const input = raw && typeof raw === 'object' ? raw : {};

  const destination = str(input.destination);
  if (!/^[a-z0-9]{10,40}$/i.test(destination)) errors.destination = 'required';

  const startDate = str(input.startDate);
  if (!DATE_RE.test(startDate) || Number.isNaN(Date.parse(`${startDate}T00:00:00Z`))) {
    errors.startDate = 'invalid';
  } else {
    const start = Date.parse(`${startDate}T00:00:00Z`);
    const today = new Date();
    const tomorrow = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() + 1);
    const maxDate = Date.UTC(today.getUTCFullYear() + 2, today.getUTCMonth(), today.getUTCDate());
    if (start < tomorrow) errors.startDate = 'date_too_soon';
    else if (start > maxDate) errors.startDate = 'date_too_far';
  }

  const adults = int(input.adults);
  if (!Number.isInteger(adults) || adults < 1 || adults > 30) errors.adults = 'invalid';
  const children = input.children === undefined ? 0 : int(input.children);
  if (!Number.isInteger(children) || children < 0 || children > 30) errors.children = 'invalid';

  const accommodation = (str(input.accommodation) || 'none') as Accommodation;
  if (!ACCOMMODATIONS.includes(accommodation)) errors.accommodation = 'invalid';

  const guideLanguage = str(input.guideLanguage) || 'fr';
  if (!isSupportedLocale(guideLanguage)) errors.guideLanguage = 'invalid';

  const fullName = str(input.fullName);
  checkText(errors, 'fullName', fullName, { min: 2, max: 120 });

  const email = str(input.email).toLowerCase();
  if (!email) errors.email = 'required';
  else if (!EMAIL_RE.test(email) || email.length > 200) errors.email = 'invalid';

  const phone = str(input.phone);
  if (!phone) errors.phone = 'required';
  else if (!PHONE_RE.test(phone)) errors.phone = 'invalid';

  const country = str(input.country).toUpperCase();
  if (country && !COUNTRY_RE.test(country)) errors.country = 'invalid';

  const customerLocale = str(input.customerLocale) || 'fr';
  if (!isSupportedLocale(customerLocale)) errors.customerLocale = 'invalid';

  const message = str(input.message);
  checkText(errors, 'message', message, { max: 3000 });

  if (input.termsAccepted !== true) errors.termsAccepted = 'required';

  if (Object.keys(errors).length > 0) return { errors };

  return {
    errors,
    data: {
      destination,
      startDate,
      adults,
      children,
      transport: bool(input.transport),
      accommodation,
      privateGuide: bool(input.privateGuide),
      guideLanguage: guideLanguage as SupportedLocale,
      fullName,
      email,
      phone,
      country: country || null,
      customerLocale: customerLocale as SupportedLocale,
      message: message || null,
      termsAccepted: true,
    },
  };
}

export interface ContactInput {
  kind: 'general' | 'custom_trip';
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  tripDetails: Record<string, unknown> | null;
  customerLocale: SupportedLocale;
}

/** Détails d'un circuit sur mesure : objet plat de valeurs simples, taille limitée. */
function sanitizeTripDetails(value: unknown): Record<string, unknown> | null | 'invalid' {
  if (value === undefined || value === null) return null;
  if (typeof value !== 'object' || Array.isArray(value)) return 'invalid';
  const out: Record<string, unknown> = {};
  for (const [key, v] of Object.entries(value as Record<string, unknown>).slice(0, 30)) {
    if (!/^[a-zA-Z][a-zA-Z0-9_]{0,40}$/.test(key)) continue;
    if (typeof v === 'string') out[key] = v.trim().slice(0, 500);
    else if (typeof v === 'number' && Number.isFinite(v)) out[key] = v;
    else if (typeof v === 'boolean') out[key] = v;
    else if (Array.isArray(v)) out[key] = v.filter((x) => typeof x === 'string').slice(0, 20).map((x: string) => x.slice(0, 100));
  }
  return JSON.stringify(out).length > 6000 ? 'invalid' : out;
}

export function validateContact(raw: any): { data?: ContactInput; errors: FieldErrors } {
  const errors: FieldErrors = {};
  const input = raw && typeof raw === 'object' ? raw : {};

  const kind = str(input.kind) || 'general';
  if (kind !== 'general' && kind !== 'custom_trip') errors.kind = 'invalid';

  const name = str(input.name);
  checkText(errors, 'name', name, { min: 2, max: 120 });

  const email = str(input.email).toLowerCase();
  if (!email) errors.email = 'required';
  else if (!EMAIL_RE.test(email) || email.length > 200) errors.email = 'invalid';

  const phone = str(input.phone);
  if (phone && !PHONE_RE.test(phone)) errors.phone = 'invalid';

  const subject = str(input.subject);
  checkText(errors, 'subject', subject, { max: 200 });

  const message = str(input.message);
  checkText(errors, 'message', message, { min: 5, max: 5000 });

  const tripDetails = sanitizeTripDetails(input.tripDetails);
  if (tripDetails === 'invalid') errors.tripDetails = 'invalid';

  const customerLocale = str(input.customerLocale) || 'fr';
  if (!(SUPPORTED_LOCALES as readonly string[]).includes(customerLocale)) errors.customerLocale = 'invalid';

  if (Object.keys(errors).length > 0) return { errors };

  return {
    errors,
    data: {
      kind: kind as ContactInput['kind'],
      name,
      email,
      phone: phone || null,
      subject: subject || null,
      message,
      tripDetails: tripDetails as Record<string, unknown> | null,
      customerLocale: customerLocale as SupportedLocale,
    },
  };
}
