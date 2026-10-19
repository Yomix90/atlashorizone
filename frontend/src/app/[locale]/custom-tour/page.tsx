import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CalendarHeart, MessagesSquare, Route } from 'lucide-react';
import { Container } from '@/components/ui/primitives';
import { CustomTripForm } from '@/components/forms/CustomTripForm';
import { getSiteSettings } from '@/lib/strapi';
import { buildMetadata } from '@/lib/seo';
import { FALLBACK_AGENCY } from '@/lib/site';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'customTour' });
  const settings = await getSiteSettings(locale).catch(() => null);
  return buildMetadata({ locale, path: '/custom-tour', title: t('metaTitle'), description: t('metaDescription'), siteName: settings?.agencyName ?? FALLBACK_AGENCY.name });
}

export default async function CustomTourPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('customTour');
  const settings = await getSiteSettings(locale).catch(() => null);

  const steps = [
    { key: 'share', icon: MessagesSquare },
    { key: 'design', icon: Route },
    { key: 'enjoy', icon: CalendarHeart },
  ] as const;

  return (
    <>
      <section className="bg-zellige pb-16 pt-16 text-white">
        <Container>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-sand-300">{t('eyebrow')}</p>
          <h1 className="max-w-3xl font-display text-4xl font-bold sm:text-5xl">{t('title')}</h1>
          <p className="mt-4 max-w-2xl text-lg text-majorelle-100">{t('subtitle')}</p>
          <ol className="mt-10 grid gap-4 sm:grid-cols-3">
            {steps.map(({ key, icon: Icon }, i) => (
              <li key={key} className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                <Icon className="h-6 w-6 text-sand-300" aria-hidden />
                <p className="mt-3 text-sm font-semibold text-sand-300">{t('stepLabel', { step: i + 1 })}</p>
                <h2 className="text-lg font-bold">{t(`steps.${key}.title`)}</h2>
                <p className="mt-1 text-sm text-majorelle-100">{t(`steps.${key}.text`)}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      <Container className="max-w-4xl py-12">
        <CustomTripForm currency={settings?.currency ?? 'EUR'} />
      </Container>
    </>
  );
}
