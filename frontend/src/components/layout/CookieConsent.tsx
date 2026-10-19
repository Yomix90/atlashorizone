'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Cookie } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/primitives';
import { CONSENT_EVENT, readConsent, writeConsent } from '@/lib/consent';

/** Bandeau de consentement : rien n'est déposé hors cookies techniques avant un choix explicite. */
export function CookieConsent() {
  const t = useTranslations('cookies');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(readConsent() === null);
    const reopen = () => setVisible(true);
    window.addEventListener('open-cookie-settings', reopen);
    return () => window.removeEventListener('open-cookie-settings', reopen);
  }, []);

  useEffect(() => {
    const hide = () => setVisible(false);
    window.addEventListener(CONSENT_EVENT, hide);
    return () => window.removeEventListener(CONSENT_EVENT, hide);
  }, []);

  if (!visible) return null;

  return (
    <div role="dialog" aria-live="polite" aria-labelledby="cookie-title" className="fixed inset-x-3 bottom-3 z-50 sm:inset-x-auto sm:start-6 sm:bottom-6 sm:max-w-md">
      <div className="rounded-3xl border border-ink/10 bg-white p-5 shadow-card">
        <div className="flex items-start gap-3">
          <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-terracotta-600" aria-hidden />
          <div>
            <h2 id="cookie-title" className="font-semibold text-ink">{t('title')}</h2>
            <p className="mt-1 text-sm text-ink-soft">
              {t('text')}{' '}
              <Link href="/privacy" className="font-semibold text-majorelle-600 underline underline-offset-2">
                {t('learnMore')}
              </Link>
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" size="sm" onClick={() => writeConsent('essential')}>
            {t('essentialOnly')}
          </Button>
          <Button size="sm" onClick={() => writeConsent('all')}>
            {t('acceptAll')}
          </Button>
        </div>
      </div>
    </div>
  );
}
