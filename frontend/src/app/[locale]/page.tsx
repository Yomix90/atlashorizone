import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowRight, Compass, Headset, ShieldCheck, Wallet } from 'lucide-react';
import { ButtonLink, Container, SectionHeading } from '@/components/ui/primitives';
import { FadeIn } from '@/components/ui/Motion';
import { DestinationCard } from '@/components/destinations/DestinationCard';
import { QuickSearch } from '@/components/home/QuickSearch';
import { ReviewsCarousel } from '@/components/home/ReviewsCarousel';
import { CtaBand } from '@/components/home/CtaBand';
import { getBookingOptions, getFeaturedDestinations, getReviews, getSiteSettings } from '@/lib/strapi';
import { BLUR_DATA_URL, FALLBACK_AGENCY, mediaSrc } from '@/lib/site';
import { countryName } from '@/lib/format';

export const revalidate = 3600;

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');

  const [settings, featured, reviews, options] = await Promise.all([
    getSiteSettings(locale).catch(() => null),
    getFeaturedDestinations(locale, 6).catch(() => []),
    getReviews(locale, { limit: 9 }).catch(() => []),
    getBookingOptions(locale).catch(() => []),
  ]);
  const currency = settings?.currency ?? 'EUR';
  const hero = featured[0]?.coverImage;
  const heroSrc = mediaSrc(hero, 'large') ?? mediaSrc(hero);

  const reasons = [
    { key: 'guides', icon: Compass },
    { key: 'prices', icon: Wallet },
    { key: 'support', icon: Headset },
    { key: 'custom', icon: ShieldCheck },
  ] as const;

  return (
    <>
      {/* Hero plein écran */}
      <section className="relative isolate flex min-h-[calc(100svh-4.5rem)] items-end overflow-hidden pb-10 pt-32 sm:items-center sm:pb-16">
        {heroSrc && (
          <Image
            src={heroSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
        )}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/80 via-ink/40 to-ink/10" aria-hidden />
        <Container>
          <FadeIn className="max-w-3xl text-white">
            <p className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold backdrop-blur">
              {settings?.tagline ?? t('hero.eyebrow')}
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight sm:text-6xl">{t('hero.title')}</h1>
            <p className="mt-5 max-w-2xl text-lg text-sand-100 sm:text-xl">{t('hero.subtitle')}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/destinations" size="lg">
                {t('hero.cta')}
                <ArrowRight className="h-5 w-5 rtl:rotate-180" aria-hidden />
              </ButtonLink>
              <ButtonLink href="/custom-tour" variant="light" size="lg">
                {t('hero.secondaryCta')}
              </ButtonLink>
            </div>
          </FadeIn>
          <FadeIn delay={0.15} className="mt-10 max-w-5xl">
            <QuickSearch options={options.map((o) => ({ slug: o.slug, title: o.title }))} />
          </FadeIn>
        </Container>
      </section>

      {/* Destinations populaires */}
      <section className="py-20" aria-labelledby="popular-title">
        <Container>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-terracotta-600">{t('popular.eyebrow')}</p>
              <h2 id="popular-title" className="font-display text-3xl font-bold sm:text-4xl">{t('popular.title')}</h2>
            </div>
            <ButtonLink href="/destinations" variant="outline">
              {t('popular.viewAll')}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((d, i) => (
              <FadeIn key={d.documentId} delay={(i % 3) * 0.08}>
                <DestinationCard destination={d} currency={currency} />
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Pourquoi nous choisir */}
      <section className="bg-sand-100/60 py-20" aria-labelledby="why-title">
        <Container>
          <SectionHeading id="why-title" eyebrow={t('why.eyebrow')} title={t('why.title')} subtitle={t('why.subtitle')} />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map(({ key, icon: Icon }, i) => (
              <li key={key}>
                <FadeIn delay={i * 0.08} className="h-full rounded-[var(--radius-card)] bg-white p-6 shadow-card">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-terracotta-50 text-terracotta-600">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-ink">{t(`why.items.${key}.title`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t(`why.items.${key}.text`)}</p>
                </FadeIn>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Avis */}
      {reviews.length > 0 && (
        <section className="py-20" aria-labelledby="reviews-title">
          <Container>
            <SectionHeading id="reviews-title" eyebrow={t('reviews.eyebrow')} title={t('reviews.title')} />
            <ReviewsCarousel reviews={reviews.map((r) => ({ ...r, countryLabel: countryName(r.countryCode, locale) }))} />
          </Container>
        </section>
      )}

      <CtaBand whatsapp={settings?.whatsappNumber ?? FALLBACK_AGENCY.whatsapp} />
    </>
  );
}
