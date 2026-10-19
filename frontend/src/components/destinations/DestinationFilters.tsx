'use client';

import { useEffect, useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { ChevronDown, Search, SlidersHorizontal, X } from 'lucide-react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { REGIONS, TRIP_TYPES } from '@/lib/types';

const DURATIONS = ['1', '2-3', '4+'] as const;
const BUDGETS = ['lt150', '150-250', 'gt250'] as const;
const SORTS = ['popularity', 'price_asc', 'price_desc', 'rating', 'duration'] as const;

/** Filtres synchronisés avec l'URL (partageables, indexables, bouton retour fonctionnel). */
export function DestinationFilters({ regions }: { regions?: string[] }) {
  const t = useTranslations('destinations.filters');
  const labels = useTranslations('labels');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [q, setQ] = useState(searchParams.get('q') ?? '');
  const [open, setOpen] = useState(false);

  useEffect(() => setQ(searchParams.get('q') ?? ''), [searchParams]);

  const update = (key: string, value: string) => {
    const query = Object.fromEntries(searchParams.entries());
    if (value) query[key] = value;
    else delete query[key];
    delete query.page;
    startTransition(() => router.replace({ pathname, query }, { scroll: false }));
  };

  const reset = () => startTransition(() => router.replace(pathname, { scroll: false }));
  const hasFilters = ['region', 'type', 'duration', 'budget', 'q'].some((k) => searchParams.get(k));

  const selectClass = 'h-11 w-full rounded-xl border border-ink/10 bg-white px-3 text-sm text-ink focus:border-majorelle-500';
  const availableRegions = regions?.length ? REGIONS.filter((r) => regions.includes(r)) : REGIONS;

  return (
    <section aria-label={t('aria')} className="rounded-3xl bg-white p-4 shadow-card sm:p-5" aria-busy={pending}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold text-ink">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="filters-panel"
            className="inline-flex items-center gap-2 lg:pointer-events-none"
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden />
            {t('title')}
            <ChevronDown className={`h-4 w-4 transition-transform lg:hidden ${open ? 'rotate-180' : ''}`} aria-hidden />
          </button>
        </h2>
        {hasFilters && (
          <button type="button" onClick={reset} className="inline-flex items-center gap-1 text-sm font-semibold text-majorelle-600 hover:underline">
            <X className="h-4 w-4" aria-hidden />
            {t('reset')}
          </button>
        )}
      </div>

      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          update('q', q.trim());
        }}
        className="relative mb-4"
      >
        <label htmlFor="filter-q" className="sr-only">{t('search')}</label>
        <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" aria-hidden />
        <input
          id="filter-q"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onBlur={() => q.trim() !== (searchParams.get('q') ?? '') && update('q', q.trim())}
          placeholder={t('searchPlaceholder')}
          maxLength={80}
          className="h-11 w-full rounded-xl border border-ink/10 bg-white ps-10 pe-3 text-sm focus:border-majorelle-500"
        />
      </form>

      <div id="filters-panel" className={`${open ? 'grid' : 'hidden'} gap-3 sm:grid-cols-2 lg:grid lg:grid-cols-5`}>
        <div>
          <label htmlFor="filter-region" className="mb-1 block text-xs font-semibold text-ink-soft">{t('region')}</label>
          <select id="filter-region" className={selectClass} value={searchParams.get('region') ?? ''} onChange={(e) => update('region', e.target.value)}>
            <option value="">{t('all')}</option>
            {availableRegions.map((r) => (
              <option key={r} value={r}>{labels(`regions.${r}`)}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="filter-type" className="mb-1 block text-xs font-semibold text-ink-soft">{t('type')}</label>
          <select id="filter-type" className={selectClass} value={searchParams.get('type') ?? ''} onChange={(e) => update('type', e.target.value)}>
            <option value="">{t('all')}</option>
            {TRIP_TYPES.map((v) => (
              <option key={v} value={v}>{labels(`tripTypes.${v}`)}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="filter-duration" className="mb-1 block text-xs font-semibold text-ink-soft">{t('duration')}</label>
          <select id="filter-duration" className={selectClass} value={searchParams.get('duration') ?? ''} onChange={(e) => update('duration', e.target.value)}>
            <option value="">{t('all')}</option>
            {DURATIONS.map((v) => (
              <option key={v} value={v}>{t(`durations.${v}`)}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="filter-budget" className="mb-1 block text-xs font-semibold text-ink-soft">{t('budget')}</label>
          <select id="filter-budget" className={selectClass} value={searchParams.get('budget') ?? ''} onChange={(e) => update('budget', e.target.value)}>
            <option value="">{t('all')}</option>
            {BUDGETS.map((v) => (
              <option key={v} value={v}>{t(`budgets.${v}`)}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="filter-sort" className="mb-1 block text-xs font-semibold text-ink-soft">{t('sort')}</label>
          <select id="filter-sort" className={selectClass} value={searchParams.get('sort') ?? 'popularity'} onChange={(e) => update('sort', e.target.value === 'popularity' ? '' : e.target.value)}>
            {SORTS.map((v) => (
              <option key={v} value={v}>{t(`sorts.${v}`)}</option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
