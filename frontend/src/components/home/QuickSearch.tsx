'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { CalendarDays, MapPin, Search, Users } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import { todayIso } from '@/lib/schemas';

interface Option {
  slug: string;
  title: string;
}

/** Recherche rapide : avec une destination → formulaire de réservation prérempli, sinon → liste filtrable. */
export function QuickSearch({ options }: { options: Option[] }) {
  const t = useTranslations('home.search');
  const router = useRouter();
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [travellers, setTravellers] = useState(2);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (destination) {
      router.push({
        pathname: '/booking',
        query: { destination, ...(date ? { date } : {}), adults: String(travellers) },
      });
    } else {
      router.push('/destinations');
    }
  };

  const fieldClass = 'h-12 w-full rounded-xl border border-ink/10 bg-white ps-10 pe-3 text-sm text-ink focus:border-majorelle-500';

  return (
    <form onSubmit={onSubmit} role="search" aria-label={t('aria')} className="grid gap-3 rounded-3xl bg-white/95 p-3 shadow-card backdrop-blur md:grid-cols-[1.4fr_1fr_0.8fr_auto] md:p-4">
      <div className="relative">
        <label htmlFor="qs-destination" className="sr-only">{t('destination')}</label>
        <MapPin className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-terracotta-600" aria-hidden />
        <select id="qs-destination" value={destination} onChange={(e) => setDestination(e.target.value)} className={fieldClass}>
          <option value="">{t('allDestinations')}</option>
          {options.map((o) => (
            <option key={o.slug} value={o.slug}>{o.title}</option>
          ))}
        </select>
      </div>
      <div className="relative">
        <label htmlFor="qs-date" className="sr-only">{t('date')}</label>
        <CalendarDays className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-terracotta-600" aria-hidden />
        <input id="qs-date" type="date" min={todayIso()} value={date} onChange={(e) => setDate(e.target.value)} className={fieldClass} />
      </div>
      <div className="relative">
        <label htmlFor="qs-travellers" className="sr-only">{t('travellers')}</label>
        <Users className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-terracotta-600" aria-hidden />
        <select id="qs-travellers" value={travellers} onChange={(e) => setTravellers(Number(e.target.value))} className={fieldClass}>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>{t('travellersCount', { count: n })}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-terracotta-600 px-6 font-semibold text-white hover:bg-terracotta-700">
        <Search className="h-4 w-4" aria-hidden />
        {t('submit')}
      </button>
    </form>
  );
}
