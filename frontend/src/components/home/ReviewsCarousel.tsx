'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { RatingStars } from '@/components/ui/primitives';
import type { Review } from '@/lib/types';

/**
 * Carrousel en défilement natif (scroll-snap) : tactile, accessible au clavier et
 * naturellement inversé en RTL. Les flèches tiennent compte du sens d'écriture.
 */
export function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  const t = useTranslations('reviews');
  const track = useRef<HTMLUListElement>(null);

  const scroll = (direction: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const rtl = getComputedStyle(el).direction === 'rtl';
    const card = el.querySelector('li');
    const step = (card?.clientWidth ?? 320) + 24;
    el.scrollBy({ left: direction * step * (rtl ? -1 : 1), behavior: 'smooth' });
  };

  if (!reviews.length) return null;

  return (
    <div className="relative">
      <ul
        ref={track}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4"
        aria-label={t('carouselAria')}
        tabIndex={0}
      >
        {reviews.map((r) => (
          <li key={r.documentId} className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
            <figure className="flex h-full flex-col rounded-[var(--radius-card)] bg-white p-6 shadow-card">
              <Quote className="h-8 w-8 text-sand-300 rtl:-scale-x-100" aria-hidden />
              <RatingStars value={r.rating} label={t('ratingAria', { rating: r.rating })} />
              {r.title && <p className="mt-3 font-display text-lg font-bold text-ink">{r.title}</p>}
              <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{r.text}</blockquote>
              <figcaption className="mt-5 border-t border-ink/5 pt-4 text-sm">
                <span className="font-semibold text-ink">{r.author}</span>
                {r.countryLabel && <span className="text-ink-soft"> · {r.countryLabel}</span>}
                {r.destination?.title && <span className="block text-xs text-terracotta-700">{r.destination.title}</span>}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-center gap-3">
        <button type="button" onClick={() => scroll(-1)} aria-label={t('previous')} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-white hover:border-terracotta-400">
          <ChevronLeft className="h-5 w-5 rtl:rotate-180" aria-hidden />
        </button>
        <button type="button" onClick={() => scroll(1)} aria-label={t('next')} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-white hover:border-terracotta-400">
          <ChevronRight className="h-5 w-5 rtl:rotate-180" aria-hidden />
        </button>
      </div>
    </div>
  );
}
