import { localeTags, type Locale } from '@/i18n/routing';

const intlLocale = (locale: string) => localeTags[locale as Locale]?.intl ?? locale;

export function formatPrice(amount: number, currency: string, locale: string, fractionDigits = 0) {
  return new Intl.NumberFormat(intlLocale(locale), {
    style: 'currency',
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount);
}

export function formatDate(iso: string, locale: string, style: 'long' | 'medium' = 'long') {
  return new Intl.DateTimeFormat(intlLocale(locale), { dateStyle: style, timeZone: 'UTC' }).format(new Date(`${iso.slice(0, 10)}T00:00:00Z`));
}

export function monthName(month: number, locale: string) {
  return new Intl.DateTimeFormat(intlLocale(locale), { month: 'long', timeZone: 'UTC' }).format(new Date(Date.UTC(2026, month - 1, 1)));
}

export function countryName(code: string | null | undefined, locale: string) {
  if (!code) return null;
  try {
    return new Intl.DisplayNames([intlLocale(locale)], { type: 'region' }).of(code) ?? code;
  } catch {
    return code;
  }
}

export function languageName(code: string, locale: string) {
  try {
    return new Intl.DisplayNames([intlLocale(locale)], { type: 'language' }).of(code) ?? code;
  } catch {
    return code;
  }
}

/** Codes ISO 3166-1 alpha-2 ; les noms sont traduits par Intl.DisplayNames. */
export const COUNTRY_CODES =
  'AD AE AF AG AL AM AO AR AT AU AZ BA BB BD BE BF BG BH BI BJ BN BO BR BS BT BW BY BZ CA CD CF CG CH CI CL CM CN CO CR CU CV CY CZ DE DJ DK DM DO DZ EC EE EG ER ES ET FI FJ FR GA GB GD GE GH GM GN GQ GR GT GW GY HK HN HR HT HU ID IE IL IN IQ IR IS IT JM JO JP KE KG KH KM KN KR KW KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MG MK ML MM MN MR MT MU MV MW MX MY MZ NA NE NG NI NL NO NP NZ OM PA PE PG PH PK PL PS PT PY QA RO RS RU RW SA SC SD SE SG SI SK SL SM SN SO SR SS ST SV SY SZ TD TG TH TJ TL TM TN TO TR TT TW TZ UA UG US UY UZ VA VC VE VN YE ZA ZM ZW'.split(' ');

export interface Option {
  value: string;
  label: string;
}

/** Listes localisées calculées côté serveur puis passées aux composants client
 * (l'ICU de Node et celui du navigateur ne nomment pas toujours les pays de la même façon). */
export function countryOptions(locale: string): Option[] {
  return COUNTRY_CODES.map((code) => ({ value: code, label: countryName(code, locale) ?? code })).sort((a, b) =>
    a.label.localeCompare(b.label, intlLocale(locale))
  );
}

export function languageOptions(codes: readonly string[], locale: string): Option[] {
  return codes.map((code) => ({ value: code, label: languageName(code, locale) }));
}
