import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { isRtl, routing } from '@/i18n/routing';
import { fontVariables } from '@/lib/fonts';
import { getSiteSettings } from '@/lib/strapi';
import { FALLBACK_AGENCY, SITE_URL, mediaUrl } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { CookieConsent } from '@/components/layout/CookieConsent';
import { Analytics } from '@/components/layout/Analytics';
import { JsonLd } from '@/components/ui/JsonLd';
import { MotionProvider } from '@/components/ui/Motion';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#c2552d',
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const settings = await getSiteSettings(locale).catch(() => null);
  const agency = settings?.agencyName ?? FALLBACK_AGENCY.name;
  const title = settings?.defaultSeo?.metaTitle ?? t('defaultTitle', { agency });

  return {
    metadataBase: new URL(SITE_URL),
    applicationName: agency,
    ...buildMetadata({
      locale,
      path: '',
      title,
      description: settings?.defaultSeo?.metaDescription ?? t('defaultDescription'),
      image: settings?.defaultSeo?.shareImage,
      siteName: agency,
    }),
    title: { default: title, template: `%s | ${agency}` },
  };
}

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'common' });
  const settings = await getSiteSettings(locale).catch(() => null);

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: settings?.agencyName ?? FALLBACK_AGENCY.name,
    url: `${SITE_URL}/${locale}`,
    description: settings?.description ?? undefined,
    logo: mediaUrl(settings?.logo?.url) ?? undefined,
    telephone: settings?.phone ?? FALLBACK_AGENCY.phone,
    email: settings?.email ?? FALLBACK_AGENCY.email,
    address: settings?.address
      ? { '@type': 'PostalAddress', streetAddress: settings.address, addressLocality: settings.city ?? undefined, addressCountry: 'MA' }
      : undefined,
    geo:
      settings?.latitude && settings?.longitude
        ? { '@type': 'GeoCoordinates', latitude: settings.latitude, longitude: settings.longitude }
        : undefined,
    sameAs: settings?.socialLinks?.map((s) => s.url),
  };

  return (
    <html lang={locale} dir={isRtl(locale) ? 'rtl' : 'ltr'} className={fontVariables}>
      <body className="flex min-h-screen flex-col">
        <NextIntlClientProvider>
          <MotionProvider>
            <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow-card">
              {t('skipToContent')}
            </a>
            <Header phone={settings?.phone ?? FALLBACK_AGENCY.phone} agencyName={settings?.agencyName ?? FALLBACK_AGENCY.name} />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer locale={locale} settings={settings} />
            <WhatsAppFloat number={settings?.whatsappNumber ?? FALLBACK_AGENCY.whatsapp} />
            <CookieConsent />
            <Analytics />
          </MotionProvider>
        </NextIntlClientProvider>
        <JsonLd data={organization} />
      </body>
    </html>
  );
}
