'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { BLUR_DATA_URL, mediaSrc } from '@/lib/site';
import type { StrapiMedia } from '@/lib/types';

/** Galerie en mosaïque + visionneuse plein écran (<dialog> natif : focus piégé, Échap pour fermer). */
export function Gallery({ images, title }: { images: StrapiMedia[]; title: string }) {
  const t = useTranslations('gallery');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const count = images.length;

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const go = useCallback((delta: number) => setIndex((i) => (i + delta + count) % count), [count]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (!dialog.open) return;
      const rtl = document.documentElement.dir === 'rtl';
      if (e.key === 'ArrowRight') go(rtl ? -1 : 1);
      if (e.key === 'ArrowLeft') go(rtl ? 1 : -1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  if (!count) return null;
  const visible = images.slice(0, 5);
  const alt = (img: StrapiMedia, i: number) => img.alternativeText || t('imageAlt', { title, index: i + 1 });

  return (
    <>
      <div className="grid h-[320px] grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-[var(--radius-card)] sm:h-[460px]">
        {visible.map((img, i) => (
          <button
            key={img.documentId ?? i}
            type="button"
            onClick={() => open(i)}
            className={`group relative overflow-hidden bg-sand-100 ${i === 0 ? 'col-span-4 row-span-2 sm:col-span-2' : 'hidden sm:block'}`}
            aria-label={t('open', { index: i + 1, total: count })}
          >
            <Image
              src={mediaSrc(img, i === 0 ? 'large' : 'medium') ?? ''}
              alt={alt(img, i)}
              fill
              priority={i === 0}
              sizes={i === 0 ? '(min-width: 640px) 50vw, 100vw' : '25vw'}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
          </button>
        ))}
      </div>
      {count > 1 && (
        <button type="button" onClick={() => open(0)} className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-majorelle-600 hover:underline">
          <Expand className="h-4 w-4" aria-hidden />
          {t('viewAll', { count })}
        </button>
      )}

      <dialog
        ref={dialogRef}
        aria-label={t('dialogAria', { title })}
        className="m-0 h-full max-h-none w-full max-w-none bg-ink/95 p-0 backdrop:bg-ink/80"
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        <div className="relative flex h-full w-full items-center justify-center p-4 sm:p-12">
          <div className="relative h-full w-full">
            <Image src={mediaSrc(images[index]) ?? ''} alt={alt(images[index], index)} fill sizes="100vw" className="object-contain" />
          </div>
          <p className="absolute bottom-4 start-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white rtl:translate-x-1/2" aria-live="polite">
            {t('counter', { index: index + 1, total: count })}
          </p>
          <button type="button" onClick={close} aria-label={t('close')} className="absolute end-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25">
            <X className="h-6 w-6" aria-hidden />
          </button>
          {count > 1 && (
            <>
              <button type="button" onClick={() => go(-1)} aria-label={t('previous')} className="absolute start-3 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25">
                <ChevronLeft className="h-7 w-7 rtl:rotate-180" aria-hidden />
              </button>
              <button type="button" onClick={() => go(1)} aria-label={t('next')} className="absolute end-3 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25">
                <ChevronRight className="h-7 w-7 rtl:rotate-180" aria-hidden />
              </button>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
