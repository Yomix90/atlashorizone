import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ChevronDown } from 'lucide-react';
import { ButtonLink, Container } from '@/components/ui/primitives';
import { JsonLd } from '@/components/ui/JsonLd';
import { getFaqs, getSiteSettings } from '@/lib/strapi';
import { buildMetadata } from '@/lib/seo';
import { FALLBACK_AGENCY } from '@/lib/site';
import type { Faq } from '@/lib/types';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faq' });
  const settings = await getSiteSettings(locale).catch(() => null);
  return buildMetadata({ locale, path: '/faq', title: t('metaTitle'), description: t('metaDescription'), siteName: settings?.agencyName ?? FALLBACK_AGENCY.name });
}

const CATEGORIES: Faq['category'][] = ['booking', 'payment', 'travel', 'onsite'];

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('faq');
  const faqs = await getFaqs(locale).catch(() => []);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
  };

  return (
    <>
      <section className="bg-sand-100/60 pb-10 pt-14">
        <Container className="max-w-4xl">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">{t('title')}</h1>
          <p className="mt-4 text-lg text-ink-soft">{t('subtitle')}</p>
        </Container>
      </section>
      <Container className="max-w-4xl space-y-10 py-12">
        {CATEGORIES.map((category) => {
          const items = faqs.filter((f) => f.category === category);
          if (!items.length) return null;
          return (
            <section key={category} aria-labelledby={`faq-${category}`}>
              <h2 id={`faq-${category}`} className="mb-4 font-display text-2xl font-bold">{t(`categories.${category}`)}</h2>
              <div className="space-y-3">
                {items.map((f) => (
                  <details key={f.documentId} className="group rounded-2xl bg-white p-5 shadow-card open:ring-2 open:ring-sand-200">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink [&::-webkit-details-marker]:hidden">
                      {f.question}
                      <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" aria-hidden />
                    </summary>
                    <p className="mt-3 whitespace-pre-line leading-relaxed text-ink-soft">{f.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          );
        })}
        <div className="rounded-[var(--radius-card)] bg-white p-8 text-center shadow-card">
          <h2 className="font-display text-2xl font-bold">{t('moreTitle')}</h2>
          <p className="mt-2 text-ink-soft">{t('moreText')}</p>
          <ButtonLink href="/contact" className="mt-5">{t('contactCta')}</ButtonLink>
        </div>
      </Container>
      {faqs.length > 0 && <JsonLd data={jsonLd} />}
    </>
  );
}
