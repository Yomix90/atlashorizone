import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ChevronLeft, ChevronRight, SearchX } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ButtonLink, Container } from '@/components/ui/primitives';
import { DestinationCard } from '@/components/destinations/DestinationCard';
import { DestinationFilters } from '@/components/destinations/DestinationFilters';
import {
  getDestinations,
  getSiteSettings,
  type BudgetFilter,
  type DestinationSort,
  type DurationFilter,
} from '@/lib/strapi';
import { buildMetadata } from '@/lib/seo';
import { FALLBACK_AGENCY } from '@/lib/site';
import { REGIONS, TRIP_TYPES, type Region, type TripType } from '@/lib/types';

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: SearchParams }): Promise<Metadata> {
  const { locale } = await params;
  const sp = await searchParams;
  const t = await getTranslations({ locale, namespace: 'destinations' });
  const settings = await getSiteSettings(locale).catch(() => null);
  const filtered = Object.keys(sp).length > 0;
  return buildMetadata({
    locale,
    path: '/destinations',
    title: t('metaTitle'),
    description: t('metaDescription'),
    siteName: settings?.agencyName ?? FALLBACK_AGENCY.name,
    image: settings?.defaultSeo?.shareImage,
    // Les combinaisons de filtres ne sont pas indexées (canonical vers la liste complète).
    noIndex: filtered,
  });
}

const pick = <T extends string>(value: unknown, allowed: readonly T[]): T | undefined =>
  typeof value === 'string' && (allowed as readonly string[]).includes(value) ? (value as T) : undefined;

export default async function DestinationsPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: SearchParams }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const sp = await searchParams;
  const t = await getTranslations('destinations');

  const page = Math.max(1, Math.min(50, Number(sp.page) || 1));
  const query = {
    locale,
    region: pick<Region>(sp.region, REGIONS),
    tripType: pick<TripType>(sp.type, TRIP_TYPES),
    duration: pick<DurationFilter>(sp.duration, ['1', '2-3', '4+']),
    budget: pick<BudgetFilter>(sp.budget, ['lt150', '150-250', 'gt250']),
    sort: pick<DestinationSort>(sp.sort, ['popularity', 'price_asc', 'price_desc', 'rating', 'duration']),
    q: typeof sp.q === 'string' ? sp.q.slice(0, 80) : undefined,
    page,
  };

  const [settings, result] = await Promise.all([
    getSiteSettings(locale).catch(() => null),
    getDestinations(query).catch(() => null),
  ]);
  const currency = settings?.currency ?? 'EUR';
  const destinations = result?.data ?? [];
  const pagination = result?.meta.pagination;

  const pageHref = (p: number) => ({
    pathname: '/destinations' as const,
    query: { ...Object.fromEntries(Object.entries(sp).filter(([, v]) => typeof v === 'string')), page: String(p) },
  });

  return (
    <>
      <section className="bg-sand-100/60 pb-10 pt-14">
        <Container>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-terracotta-600">{t('eyebrow')}</p>
          <h1 className="font-display text-4xl font-bold sm:text-5xl">{t('title')}</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-soft">{t('subtitle')}</p>
        </Container>
      </section>

      <Container className="-mt-2 py-10">
        <Suspense fallback={<div className="h-48 animate-pulse rounded-3xl bg-white" />}>
          <DestinationFilters />
        </Suspense>

        <p className="mt-8 text-sm text-ink-soft" aria-live="polite">
          {t('results', { count: pagination?.total ?? 0 })}
        </p>

        {destinations.length > 0 ? (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((d, i) => (
              <DestinationCard key={d.documentId} destination={d} currency={currency} priority={i < 3} />
            ))}
          </div>
        ) : (
          <div className="mt-6 flex flex-col items-center rounded-3xl bg-white px-6 py-16 text-center shadow-card">
            <SearchX className="h-10 w-10 text-terracotta-500" aria-hidden />
            <h2 className="mt-4 text-xl font-bold">{t('empty.title')}</h2>
            <p className="mt-2 max-w-md text-ink-soft">{t('empty.text')}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/destinations" variant="outline">{t('empty.reset')}</ButtonLink>
              <ButtonLink href="/custom-tour">{t('empty.custom')}</ButtonLink>
            </div>
          </div>
        )}

        {pagination && pagination.pageCount > 1 && (
          <nav aria-label={t('pagination.aria')} className="mt-10 flex items-center justify-center gap-2">
            {page > 1 && (
              <Link href={pageHref(page - 1)} className="inline-flex h-11 items-center gap-1 rounded-full border border-ink/15 bg-white px-4 text-sm font-semibold" rel="prev">
                <ChevronLeft className="h-4 w-4 rtl:rotate-180" aria-hidden />
                {t('pagination.previous')}
              </Link>
            )}
            <span className="px-3 text-sm text-ink-soft">{t('pagination.status', { page, total: pagination.pageCount })}</span>
            {page < pagination.pageCount && (
              <Link href={pageHref(page + 1)} className="inline-flex h-11 items-center gap-1 rounded-full border border-ink/15 bg-white px-4 text-sm font-semibold" rel="next">
                {t('pagination.next')}
                <ChevronRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
              </Link>
            )}
          </nav>
        )}
      </Container>
    </>
  );
}
