import type { StrapiMedia } from './types';

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
export const MEDIA_URL = (process.env.NEXT_PUBLIC_MEDIA_URL || 'http://localhost:1337').replace(/\/$/, '');

/** Valeurs de repli si les Paramètres du site ne sont pas encore saisis dans Strapi. */
export const FALLBACK_AGENCY = {
  name: 'Atlas Horizons Voyages',
  whatsapp: '212600000000',
  phone: '+212 5 24 00 00 00',
  email: 'contact@example-agence.ma',
};

export const absoluteUrl = (path = '/') => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

export function mediaUrl(url?: string | null) {
  if (!url) return null;
  return url.startsWith('http') ? url : `${MEDIA_URL}${url}`;
}

export function mediaSrc(media?: StrapiMedia | null, format?: 'small' | 'medium' | 'large') {
  if (!media) return null;
  const chosen = format ? media.formats?.[format] : null;
  return mediaUrl(chosen?.url ?? media.url);
}

/** Lien wa.me avec message prérempli. */
export function whatsappLink(number: string, text?: string) {
  const digits = number.replace(/\D/g, '');
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
}

/** Placeholder flou léger (dégradé sable) pour next/image, sans requête supplémentaire. */
export const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxMCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZjNlM2MzIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZTJiNDhhIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEwIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+';
