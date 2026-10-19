'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { CONSENT_EVENT, readConsent, type Consent } from '@/lib/consent';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/** Google Analytics 4 chargé uniquement si configuré ET accepté par le visiteur. */
export function Analytics() {
  const [consent, setConsent] = useState<Consent | null>(null);

  useEffect(() => {
    setConsent(readConsent());
    const onChange = (e: Event) => setConsent((e as CustomEvent<Consent>).detail);
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  if (!GA_ID || consent !== 'all') return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
