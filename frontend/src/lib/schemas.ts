import { z } from 'zod';
import { locales } from '@/i18n/routing';

/**
 * Schémas zod partagés client / serveur. Les messages sont des CODES d'erreur,
 * traduits à l'affichage via les messages next-intl « errors.<code> ».
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9 ().-]{6,30}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export const todayIso = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
const isAfterToday = (value: string) => value > todayIso();

const email = z.string().trim().min(1, 'required').max(200, 'too_long').regex(EMAIL_RE, 'invalid_email');
const phone = z.string().trim().min(1, 'required').regex(PHONE_RE, 'invalid_phone');
const optionalPhone = z.string().trim().refine((v) => v === '' || PHONE_RE.test(v), 'invalid_phone');
const fullName = z.string().trim().min(1, 'required').min(2, 'too_short').max(120, 'too_long');
const localeEnum = z.enum(locales);

/** Champs anti-spam communs : pot de miel (doit rester vide) + jeton Turnstile. */
const antiSpam = {
  company: z.string().max(0).optional().or(z.literal('')),
  turnstileToken: z.string().optional(),
};

// ─── Réservation (formulaire multi-étapes) ───────────────
export const bookingTripSchema = z.object({
  destination: z.string().min(1, 'required'),
  startDate: z.string().regex(DATE_RE, 'invalid_date').refine(isAfterToday, 'date_too_soon'),
  adults: z.number({ error: 'required' }).int().min(1, 'min_adults').max(30, 'max_travellers'),
  children: z.number({ error: 'required' }).int().min(0, 'invalid').max(30, 'max_travellers'),
});

export const bookingOptionsSchema = z.object({
  transport: z.boolean(),
  accommodation: z.enum(['none', 'standard', 'superior', 'luxury']),
  privateGuide: z.boolean(),
  guideLanguage: localeEnum,
});

export const bookingContactSchema = z.object({
  fullName,
  email,
  phone,
  country: z.string().regex(/^([A-Z]{2})?$/, 'invalid'),
  message: z.string().trim().max(3000, 'too_long'),
});

export const bookingConfirmSchema = z.object({
  termsAccepted: z.boolean().refine((v) => v === true, 'terms_required'),
  ...antiSpam,
});

export const bookingSchema = bookingTripSchema
  .extend(bookingOptionsSchema.shape)
  .extend(bookingContactSchema.shape)
  .extend(bookingConfirmSchema.shape);

export type BookingValues = z.infer<typeof bookingSchema>;

// ─── Contact ─────────────────────────────────────────────
export const contactSchema = z.object({
  name: fullName,
  email,
  phone: optionalPhone,
  subject: z.string().trim().max(200, 'too_long'),
  message: z.string().trim().min(1, 'required').min(5, 'too_short').max(5000, 'too_long'),
  ...antiSpam,
});
export type ContactValues = z.infer<typeof contactSchema>;

// ─── Circuit sur mesure ──────────────────────────────────
export const INTERESTS = ['desert', 'imperial_city', 'beach', 'mountain', 'culture', 'gastronomy', 'trekking', 'wellness'] as const;
export const BUDGETS = ['lt1000', '1000-2000', '2000-4000', 'gt4000'] as const;

export const customTripSchema = z.object({
  name: fullName,
  email,
  phone: optionalPhone,
  startDate: z.string().refine((v) => v === '' || (DATE_RE.test(v) && isAfterToday(v)), 'date_too_soon'),
  durationDays: z.number({ error: 'required' }).int().min(1, 'invalid').max(30, 'invalid'),
  adults: z.number({ error: 'required' }).int().min(1, 'min_adults').max(30, 'max_travellers'),
  children: z.number({ error: 'required' }).int().min(0, 'invalid').max(30, 'max_travellers'),
  budget: z.enum(BUDGETS),
  accommodation: z.enum(['standard', 'superior', 'luxury']),
  interests: z.array(z.enum(INTERESTS)).min(1, 'choose_one'),
  message: z.string().trim().min(1, 'required').min(5, 'too_short').max(5000, 'too_long'),
  ...antiSpam,
});
export type CustomTripValues = z.infer<typeof customTripSchema>;

/** Résultat renvoyé par les Server Actions de formulaire. */
export type FormResult<T = undefined> =
  | { ok: true; data: T }
  | { ok: false; error: 'validation' | 'rate_limited' | 'captcha' | 'server'; fieldErrors?: Record<string, string> };

/** Convertit les erreurs zod en { champ: code }. */
export function flattenErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join('.');
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
