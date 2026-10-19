export const UID = {
  destination: 'api::destination.destination',
  reservation: 'api::reservation.reservation',
  contactMessage: 'api::contact-message.contact-message',
  review: 'api::review.review',
  faq: 'api::faq.faq',
  page: 'api::page.page',
  siteSetting: 'api::site-setting.site-setting',
} as const;

export const SUPPORTED_LOCALES = ['fr', 'en', 'es', 'de', 'ar'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const isSupportedLocale = (value: unknown): value is SupportedLocale =>
  typeof value === 'string' && (SUPPORTED_LOCALES as readonly string[]).includes(value);
