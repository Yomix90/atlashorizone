'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales, type Locale } from '@/i18n/routing';

/** Nom de chaque langue dans sa propre langue (autonyme). */
const AUTONYMS: Record<Locale, string> = {
  fr: 'Français',
  en: 'English',
  es: 'Español',
  de: 'Deutsch',
  ar: 'العربية',
};

export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const t = useTranslations('common');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const switchTo = (next: Locale) => {
    setOpen(false);
    const query = Object.fromEntries(searchParams.entries());
    startTransition(() => router.replace({ pathname, query }, { locale: next }));
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('chooseLanguage')}
        className="inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-ink hover:bg-sand-100"
        disabled={pending}
      >
        <Globe className="h-4 w-4" aria-hidden />
        <span>{locale.toUpperCase()}</span>
        <ChevronDown className="h-4 w-4" aria-hidden />
      </button>
      {open && (
        <ul role="listbox" aria-label={t('chooseLanguage')} className="absolute end-0 z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-ink/10 bg-white py-1 shadow-card">
          {locales.map((l) => (
            <li key={l} role="option" aria-selected={l === locale}>
              <button
                type="button"
                lang={l}
                dir={l === 'ar' ? 'rtl' : 'ltr'}
                onClick={() => switchTo(l)}
                className={`flex w-full items-center justify-between gap-2 px-4 py-2.5 text-start text-sm hover:bg-sand-50 ${l === locale ? 'font-semibold text-terracotta-700' : 'text-ink'}`}
              >
                {AUTONYMS[l]}
                {l === locale && <Check className="h-4 w-4" aria-hidden />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
