import { defineRouting } from 'next-intl/routing';

export const locales = ['fr', 'en', 'es', 'de', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'fr';
export const rtlLocales: readonly Locale[] = ['ar'];
export const isRtl = (locale: string) => rtlLocales.includes(locale as Locale);

/** Locale BCP 47 complète pour Intl / Open Graph. */
export const localeTags: Record<Locale, { intl: string; og: string }> = {
  fr: { intl: 'fr-FR', og: 'fr_FR' },
  en: { intl: 'en-GB', og: 'en_GB' },
  es: { intl: 'es-ES', og: 'es_ES' },
  de: { intl: 'de-DE', og: 'de_DE' },
  ar: { intl: 'ar-MA', og: 'ar_MA' },
};

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
  // Détection via Accept-Language + mémorisation du choix dans le cookie NEXT_LOCALE
  localeDetection: true,
});
