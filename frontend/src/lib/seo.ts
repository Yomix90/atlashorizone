import type { Metadata } from 'next';
import { defaultLocale, localeTags, locales, type Locale } from '@/i18n/routing';
import { SITE_URL, mediaUrl } from './site';
import type { Seo, StrapiMedia } from './types';

interface BuildMetadataInput {
  locale: string;
  /** Chemin sans préfixe de langue, ex. "/destinations/merzouga" ("" pour l'accueil). */
  path: string;
  title: string;
  description?: string | null;
  image?: StrapiMedia | null;
  noIndex?: boolean | null;
  type?: 'website' | 'article';
  siteName: string;
  /** true quand le titre SEO saisi dans Strapi contient déjà le nom de l'agence. */
  absoluteTitle?: boolean;
}

export const localizedUrl = (locale: string, path: string) => `${SITE_URL}/${locale}${path}`;

/** hreflang pour chaque langue + x-default (français). */
export function languageAlternates(path: string) {
  return {
    ...Object.fromEntries(locales.map((l) => [l, localizedUrl(l, path)])),
    'x-default': localizedUrl(defaultLocale, path),
  };
}

export function buildMetadata({ locale, path, title, description, image, noIndex, type = 'website', siteName, absoluteTitle = false }: BuildMetadataInput): Metadata {
  const url = localizedUrl(locale, path);
  const imageUrl = mediaUrl(image?.formats?.large?.url ?? image?.url);
  const images = imageUrl ? [{ url: imageUrl, width: image?.width ?? undefined, height: image?.height ?? undefined, alt: image?.alternativeText ?? title }] : undefined;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description: description ?? undefined,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type,
      url,
      title,
      description: description ?? undefined,
      siteName,
      locale: localeTags[locale as Locale]?.og,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeTags[l].og),
      images,
    },
    twitter: { card: imageUrl ? 'summary_large_image' : 'summary', title, description: description ?? undefined, images: imageUrl ? [imageUrl] : undefined },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}

export const seoTitle = (seo: Seo | null | undefined, fallback: string) => seo?.metaTitle || fallback;
