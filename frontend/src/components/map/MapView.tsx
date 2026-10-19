'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { MapPin } from 'lucide-react';

const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-sand-100" />,
});

/** Carte OpenStreetMap chargée uniquement côté navigateur (Leaflet n'est pas compatible SSR). */
export function MapView({ lat, lng, label, zoom, className = 'h-80' }: { lat: number; lng: number; label: string; zoom?: number; className?: string }) {
  const t = useTranslations('map');
  return (
    <figure className={`relative isolate overflow-hidden rounded-[var(--radius-card)] border border-ink/10 ${className}`}>
      <LeafletMap lat={lat} lng={lng} label={label} zoom={zoom} />
      <figcaption className="sr-only">{t('caption', { place: label })}</figcaption>
      <a
        href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=${zoom ?? 9}/${lat}/${lng}`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 start-3 z-[400] inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink shadow"
      >
        <MapPin className="h-3.5 w-3.5" aria-hidden />
        {t('open')}
      </a>
    </figure>
  );
}
