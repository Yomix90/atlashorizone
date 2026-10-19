import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Clock, MapPin } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Badge, ButtonLink, RatingStars } from '@/components/ui/primitives';
import { formatPrice } from '@/lib/format';
import { BLUR_DATA_URL, mediaSrc } from '@/lib/site';
import type { DestinationCardData } from '@/lib/types';

export function DestinationCard({ destination: d, currency, priority = false }: { destination: DestinationCardData; currency: string; priority?: boolean }) {
  const t = useTranslations('destination');
  const labels = useTranslations('labels');
  const locale = useLocale();
  const src = mediaSrc(d.coverImage, 'medium');

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-white shadow-card transition-shadow hover:shadow-lg">
      <Link href={`/destinations/${d.slug}`} className="relative block aspect-[4/3] overflow-hidden" tabIndex={-1} aria-hidden>
        {src && (
          <Image
            src={src}
            alt={d.coverImage?.alternativeText || d.title}
            fill
            sizes="(min-width: 1280px) 400px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            priority={priority}
          />
        )}
        <div className="absolute start-3 top-3 flex flex-wrap gap-2">
          <Badge>{labels(`tripTypes.${d.tripType}`)}</Badge>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-1.5 text-xs font-medium text-ink-soft">
          <MapPin className="h-3.5 w-3.5" aria-hidden />
          {labels(`regions.${d.region}`)}
        </div>
        <h3 className="mt-2 font-display text-xl font-bold leading-snug text-ink">
          <Link href={`/destinations/${d.slug}`} className="hover:text-terracotta-700">
            {d.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-ink-soft">{d.summary}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-soft">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4" aria-hidden />
            {t('days', { count: d.durationDays })}
          </span>
          {d.ratingCount > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <RatingStars value={d.ratingAverage} size={14} label={t('ratingAria', { rating: d.ratingAverage, count: d.ratingCount })} />
              <span className="text-xs">({d.ratingCount})</span>
            </span>
          )}
        </div>

        <div className="mt-auto pt-5">
          <p className="flex flex-wrap items-baseline gap-x-1.5 text-sm text-ink-soft">
            {t('from')}
            <span className="font-display text-2xl font-bold text-terracotta-700">{formatPrice(d.priceAdult, currency, locale)}</span>
            <span className="text-xs">{t('perPerson')}</span>
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <ButtonLink href={`/destinations/${d.slug}`} variant="outline" size="sm" aria-label={t('detailsAria', { title: d.title })}>
              {t('details')}
            </ButtonLink>
            <ButtonLink href={{ pathname: '/booking', query: { destination: d.slug } }} size="sm" aria-label={t('bookAria', { title: d.title })}>
              {t('book')}
            </ButtonLink>
          </div>
        </div>
      </div>
    </article>
  );
}
