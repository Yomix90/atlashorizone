import type { MetadataRoute } from 'next';
import { defaultLocale, locales } from '@/i18n/routing';
import { getDestinationIndex } from '@/lib/strapi';
import { localizedUrl } from '@/lib/seo';

export const revalidate = 3600;

const STATIC_PATHS: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: '/destinations', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/custom-tour', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/booking', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/faq', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/terms', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/legal-notice', priority: 0.2, changeFrequency: 'yearly' },
];

const alternatesFor = (path: string, available: readonly string[] = locales) => ({
  languages: {
    ...Object.fromEntries(available.map((l) => [l, localizedUrl(l, path)])),
    'x-default': localizedUrl(available.includes(defaultLocale) ? defaultLocale : available[0], path),
  },
});

/** Sitemap multilingue : une entrée par langue, avec ses alternatives hreflang. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = STATIC_PATHS.flatMap(({ path, priority, changeFrequency }) =>
    locales.map((locale) => ({ url: localizedUrl(locale, path), changeFrequency, priority, alternates: alternatesFor(path) }))
  );

  const index = await getDestinationIndex().catch(() => []);
  const bySlug = new Map<string, typeof index>();
  for (const entry of index) bySlug.set(entry.slug, [...(bySlug.get(entry.slug) ?? []), entry]);

  for (const [slug, translations] of bySlug) {
    const path = `/destinations/${slug}`;
    const available = translations.map((t) => t.locale);
    for (const t of translations) {
      entries.push({
        url: localizedUrl(t.locale, path),
        lastModified: new Date(t.updatedAt),
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: alternatesFor(path, available),
      });
    }
  }
  return entries;
}
