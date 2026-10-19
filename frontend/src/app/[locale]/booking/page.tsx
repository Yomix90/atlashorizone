import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/ui/primitives';
import { BookingForm } from '@/components/forms/BookingForm';
import { getBookingOptions, getSiteSettings } from '@/lib/strapi';
import { normalizePricing } from '@/lib/pricing';
import { countryOptions, languageOptions } from '@/lib/format';
import { locales } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { FALLBACK_AGENCY } from '@/lib/site';

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'booking' });
  const settings = await getSiteSettings(locale).catch(() => null);
  return buildMetadata({
    locale,
    path: '/booking',
    title: t('metaTitle'),
    description: t('metaDescription'),
    siteName: settings?.agencyName ?? FALLBACK_AGENCY.name,
  });
}

const str = (v: unknown) => (typeof v === 'string' ? v : undefined);
const int = (v: unknown, min: number, max: number) => {
  const n = Number(v);
  return Number.isInteger(n) && n >= min && n <= max ? n : undefined;
};

export default async function BookingPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: SearchParams }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const sp = await searchParams;
  const t = await getTranslations('booking');

  const [settings, options] = await Promise.all([getSiteSettings(locale).catch(() => null), getBookingOptions(locale).catch(() => [])]);
  const slug = str(sp.destination);
  const preselected = slug ? options.find((o) => o.slug === slug) : undefined;
  const date = str(sp.date);

  return (
    <>
      <section className="bg-sand-100/60 pb-10 pt-14">
        <Container>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-terracotta-600">{t('eyebrow')}</p>
          <h1 className="font-display text-4xl font-bold sm:text-5xl">{t('title')}</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-soft">{t('subtitle')}</p>
        </Container>
      </section>
      <Container className="py-10">
        <BookingForm
          destinations={options}
          pricing={normalizePricing(settings?.pricing)}
          currency={settings?.currency ?? 'EUR'}
          countries={countryOptions(locale)}
          guideLanguages={languageOptions(locales, locale)}
          whatsapp={settings?.whatsappNumber ?? FALLBACK_AGENCY.whatsapp}
          initial={{
            destination: preselected?.documentId,
            startDate: date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : undefined,
            adults: int(sp.adults, 1, 30),
            children: int(sp.children, 0, 30),
          }}
        />
      </Container>
    </>
  );
}
