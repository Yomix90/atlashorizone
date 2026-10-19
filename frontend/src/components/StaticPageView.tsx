import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { BlocksRenderer } from '@/components/ui/BlocksRenderer';
import { Container } from '@/components/ui/primitives';
import { getPage, getSiteSettings } from '@/lib/strapi';
import { formatDate } from '@/lib/format';
import { buildMetadata, seoTitle } from '@/lib/seo';
import { FALLBACK_AGENCY } from '@/lib/site';

/** Pages éditoriales gérées dans Strapi (À propos, CGV, confidentialité, mentions légales). */
export async function staticPageMetadata(locale: string, slug: string, path: string): Promise<Metadata> {
  const [page, settings] = await Promise.all([getPage(locale, slug).catch(() => null), getSiteSettings(locale).catch(() => null)]);
  if (!page) return {};
  return buildMetadata({
    locale,
    path,
    title: seoTitle(page.seo, page.title),
    absoluteTitle: !!page.seo?.metaTitle,
    description: page.seo?.metaDescription ?? page.subtitle,
    image: page.seo?.shareImage ?? page.coverImage,
    noIndex: page.seo?.noIndex,
    siteName: settings?.agencyName ?? FALLBACK_AGENCY.name,
  });
}

export async function StaticPageView({ locale, slug }: { locale: string; slug: string }) {
  const page = await getPage(locale, slug).catch(() => null);
  if (!page) notFound();
  const t = await getTranslations('common');

  return (
    <>
      <section className="bg-sand-100/60 pb-10 pt-14">
        <Container className="max-w-4xl">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">{page.title}</h1>
          {page.subtitle && <p className="mt-4 text-lg text-ink-soft">{page.subtitle}</p>}
        </Container>
      </section>
      <Container className="max-w-4xl py-12">
        <article className="rounded-[var(--radius-card)] bg-white p-6 shadow-card sm:p-10">
          <BlocksRenderer content={page.content} />
          <p className="mt-10 border-t border-ink/5 pt-4 text-xs text-ink-soft">{t('lastUpdated', { date: formatDate(page.updatedAt, locale) })}</p>
        </article>
      </Container>
    </>
  );
}
