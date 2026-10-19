'use client';

import { useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, options: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const SCRIPT_ID = 'cf-turnstile-script';

function loadScript(): Promise<void> {
  return new Promise((resolve) => {
    if (window.turnstile) return resolve();
    const existing = document.getElementById(SCRIPT_ID);
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      return;
    }
    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.addEventListener('load', () => resolve(), { once: true });
    document.head.appendChild(script);
  });
}

/** Widget Cloudflare Turnstile (anti-robot sans puzzle). Inactif si aucune clé n'est configurée. */
export function Turnstile({ onToken }: { onToken: (token: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const callback = useRef(onToken);
  callback.current = onToken;

  useEffect(() => {
    if (!SITE_KEY || !ref.current) return;
    let widgetId: string | undefined;
    let cancelled = false;

    loadScript().then(() => {
      if (cancelled || !ref.current || !window.turnstile) return;
      widgetId = window.turnstile.render(ref.current, {
        sitekey: SITE_KEY,
        language: locale,
        theme: 'light',
        callback: (token: string) => callback.current(token),
        'expired-callback': () => callback.current(''),
        'error-callback': () => callback.current(''),
      });
    });

    return () => {
      cancelled = true;
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, [locale]);

  if (!SITE_KEY) return null;
  return <div ref={ref} className="min-h-[65px]" />;
}
