import { getTranslations } from 'next-intl/server';
import { defaultLocale } from '@/i18n/routing';
import { fontVariables } from '@/lib/fonts';

/** 404 hors préfixe de langue (rare : le proxy redirige vers /fr, /en…). */
export default async function GlobalNotFound() {
  const t = await getTranslations({ locale: defaultLocale, namespace: 'notFound' });
  return (
    <html lang={defaultLocale} className={fontVariables}>
      <body className="flex min-h-screen flex-col items-center justify-center bg-cream p-6 text-center">
        <p className="font-display text-7xl font-bold text-sand-400">404</p>
        <h1 className="mt-2 font-display text-3xl font-bold">{t('title')}</h1>
        <p className="mt-3 max-w-md text-ink-soft">{t('text')}</p>
        <a href={`/${defaultLocale}`} className="mt-8 inline-flex h-11 items-center rounded-full bg-terracotta-600 px-6 font-semibold text-white">
          {t('home')}
        </a>
      </body>
    </html>
  );
}
