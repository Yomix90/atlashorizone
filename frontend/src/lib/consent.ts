/** Consentement cookies (RGPD) : « all » = mesure d'audience autorisée, « essential » = cookies techniques uniquement. */
export type Consent = 'all' | 'essential';

export const CONSENT_COOKIE = 'cookie_consent';
export const CONSENT_EVENT = 'cookie-consent-change';

export function readConsent(): Consent | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=(all|essential)`));
  return (match?.[1] as Consent) ?? null;
}

export function writeConsent(value: Consent) {
  const maxAge = 60 * 60 * 24 * 180; // 6 mois
  const secure = location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${maxAge}; Path=/; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}
