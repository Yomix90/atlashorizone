'use client';

import { useTranslations } from 'next-intl';

/** Rouvre le bandeau de consentement (droit de retrait du consentement, RGPD). */
export function CookieSettingsButton() {
  const t = useTranslations('footer');
  return (
    <button type="button" className="hover:text-white" onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))}>
      {t('cookieSettings')}
    </button>
  );
}
