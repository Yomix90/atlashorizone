import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CalendarDays, Check, ChevronRight, Clock, Gauge, MapPin, Moon, Utensils, X } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { BlocksRenderer } from '@/components/ui/BlocksRenderer';
import { Container, RatingStars } from '@/components/ui/primitives';
import { JsonLd } from '@/components/ui/JsonLd';
import { Gallery } from '@/components/destination/Gallery';
import { MapView } from '@/components/map/MapView';
import { BookingForm } from '@/components/forms/BookingForm';
import { DestinationCard } from '@/components/destinations/DestinationCard';
import { WhatsAppIcon } from '@/components/layout/WhatsAppIcon';
import {
  getBookingOptions,
  getDestinationBySlug,
  getDestinationIndex,
  getReviews,
  getSimilarDestinations,
  getSiteSettings,
} from '@/lib/strapi';
import { countryName, formatDate, formatPrice, monthName } from '@/lib/format';
import { normalizePricing } from '@/lib/pricing';
import { countryOptions, languageOptions } from '@/lib/format';
import { locales } from '@/i18n/routing';
import { buildMetadata, localizedUrl, seoTitle } from '@/lib/seo';
import { FALLBACK_AGENCY, mediaSrc, whatsappLink } from '@/lib/site';

export const revalidate = 3600;
export const dynamicParams = true;

/** Pages pré-générées au build pour chaque langue (ISR ensuite, invalidées par Strapi). */
export async function generateStaticParams() {
  try {
    const index = await getDestinationIndex();
    return index.map(({ locale, slug }) => ({ locale, slug }));
  } catch {
    return [];
  }
}

type Params = Promise<{ locale: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const [destination, settings] = await Promise.all([getDestinationBySlug(locale, slug).catch(() => null), getSiteSettings(locale).catch(() => null)]);
  if (!destination) return {};
  return buildMetadata({
    locale,
    path: `/destinations/${slug}`,
    title: seoTitle(destination.seo, destination.title),
    absoluteTitle: !!destination.seo?.metaTitle,
    description: destination.seo?.metaDescription ?? destination.summary,
    image: destination.seo?.shareImage ?? destination.coverImage,
    noIndex: destination.seo?.noIndex,
    type: 'article',
    siteName: settings?.agencyName ?? FALLBACK_AGENCY.name,
  });
}

export default async function DestinationPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const destination = await getDestinationBySlug(locale, slug);
  if (!destination) notFound();

  const [t, labels, settings, reviews, similar, options] = await Promise.all([
    getTranslations('destination'),
    getTranslations('labels'),
    getSiteSettings(locale).catch(() => null),
    getReviews(locale, { destinationDocumentId: destination.documentId, limit: 6 }).catch(() => []),
    getSimilarDestinations(locale, destination).catch(() => []),
    getBookingOptions(locale).catch(() => []),
  ]);

  const currency = settings?.currency ?? 'EUR';
  const whatsapp = settings?.whatsappNumber ?? FALLBACK_AGENCY.whatsapp;
  const images = [destination.coverImage, ...(destination.gallery ?? [])].filter((m): m is NonNullable<typeof m> => !!m);
  const fmt = (n: number) => formatPrice(n, currency, locale);
  const url = localizedUrl(locale, `/destinations/${slug}`);

  // Données structurées : TouristTrip + TouristDestination + notes et avis
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'TouristTrip',
      name: destination.title,
      description: destination.summary,
      url,
      image: images.map((m) => mediaSrc(m)).filter(Boolean),
      touristType: labels(`tripTypes.${destination.tripType}`),
      inLanguage: locale,
      itinerary: {
        '@type': 'ItemList',
        numberOfItems: destination.itinerary.length,
        itemListElement: destination.itinerary.map((day, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: { '@type': 'TouristAttraction', name: day.title, description: day.description ?? undefined },
        })),
      },
      offers: {
        '@type': 'Offer',
        price: destination.priceAdult,
        priceCurrency: currency,
        availability: 'https://schema.org/InStock',
        url,
      },
      provider: { '@type': 'TravelAgency', name: settings?.agencyName ?? FALLBACK_AGENCY.name },
      ...(destination.ratingCount > 0
        ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: destination.ratingAverage, reviewCount: destination.ratingCount, bestRating: 5 } }
        : {}),
      review: reviews.map((r) => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: r.author },
        reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
        name: r.title ?? undefined,
        reviewBody: r.text,
        datePublished: r.travelDate ?? undefined,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'TouristDestination',
      name: destination.title,
      description: destination.summary,
      url,
      ...(destination.latitude && destination.longitude
        ? { geo: { '@type': 'GeoCoordinates', latitude: destination.latitude, longitude: destination.longitude } }
        : {}),
      containedInPlace: { '@type': 'Country', name: 'Morocco' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t('breadcrumbHome'), item: localizedUrl(locale, '') },
        { '@type': 'ListItem', position: 2, name: t('breadcrumbDestinations'), item: localizedUrl(locale, '/destinations') },
        { '@type': 'ListItem', position: 3, name: destination.title, item: url },
      ],
    },
  ];

  return (
    <>
      <Container className="pt-6">
        <nav aria-label={t('breadcrumbAria')} className="text-sm text-ink-soft">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li><Link href="/" className="hover:text-terracotta-700">{t('breadcrumbHome')}</Link></li>
            <li aria-hidden><ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" /></li>
            <li><Link href="/destinations" className="hover:text-terracotta-700">{t('breadcrumbDestinations')}</Link></li>
            <li aria-hidden><ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" /></li>
            <li aria-current="page" className="font-semibold text-ink">{destination.title}</li>
          </ol>
        </nav>

        <header className="mt-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta-700">
              <MapPin className="h-4 w-4" aria-hidden />
              {labels(`regions.${destination.region}`)} · {labels(`tripTypes.${destination.tripType}`)}
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold sm:text-5xl">{destination.title}</h1>
            {destination.ratingCount > 0 && (
              <p className="mt-3 flex items-center gap-2 text-sm text-ink-soft">
                <RatingStars value={destination.ratingAverage} label={t('ratingAria', { rating: destination.ratingAverage, count: destination.ratingCount })} />
                <span>{t('reviewsCount', { rating: destination.ratingAverage, count: destination.ratingCount })}</span>
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="#booking" className="inline-flex h-11 items-center justify-center rounded-full bg-terracotta-600 px-6 text-sm font-semibold text-white hover:bg-terracotta-700">{t('book')}</a>
            <a href={whatsappLink(whatsapp, t('whatsappMessage', { title: destination.title }))} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-emerald-700 px-5 text-sm font-semibold text-white hover:bg-emerald-800">
              <WhatsAppIcon className="h-5 w-5" />
              {t('whatsapp')}
            </a>
          </div>
        </header>

        <div className="mt-6">
          <Gallery images={images} title={destination.title} />
        </div>
      </Container>

      <Container className="mt-12 grid gap-12 lg:grid-cols-[1fr_360px]">
        <div className="min-w-0 space-y-14">
          {/* Infos clés */}
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: Clock, label: t('facts.duration'), value: t('days', { count: destination.durationDays }) },
              { icon: Gauge, label: t('facts.difficulty'), value: labels(`difficulty.${destination.difficulty}`) },
              { icon: CalendarDays, label: t('facts.bestPeriod'), value: destination.bestPeriod ?? '—' },
              { icon: MapPin, label: t('facts.region'), value: labels(`regions.${destination.region}`) },
            ].map(({ icon: Icon, label, value }) => (
              <li key={label} className="rounded-2xl bg-white p-4 shadow-card">
                <Icon className="h-5 w-5 text-terracotta-600" aria-hidden />
                <p className="mt-2 text-xs text-ink-soft">{label}</p>
                <p className="font-semibold text-ink">{value}</p>
              </li>
            ))}
          </ul>

          <section aria-labelledby="about-title">
            <h2 id="about-title" className="font-display text-2xl font-bold">{t('sections.about')}</h2>
            <p className="mt-4 text-lg text-ink">{destination.summary}</p>
            <BlocksRenderer content={destination.description} className="mt-4" />
          </section>

          {destination.highlights.length > 0 && (
            <section aria-labelledby="highlights-title">
              <h2 id="highlights-title" className="font-display text-2xl font-bold">{t('sections.highlights')}</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {destination.highlights.map((h) => (
                  <li key={h.id} className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-card">
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sand-100 text-terracotta-700"><Check className="h-4 w-4" aria-hidden /></span>
                    <span className="font-medium">{h.text}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {destination.itinerary.length > 0 && (
            <section aria-labelledby="itinerary-title">
              <h2 id="itinerary-title" className="font-display text-2xl font-bold">{t('sections.itinerary')}</h2>
              <ol className="relative mt-6 space-y-6 border-s-2 border-sand-300 ps-8">
                {destination.itinerary.map((day) => (
                  <li key={day.id} className="relative">
                    <span className="absolute -start-[45px] top-0 inline-flex h-8 w-8 items-center justify-center rounded-full bg-terracotta-600 text-sm font-bold text-white">{day.day}</span>
                    <p className="text-xs font-semibold uppercase tracking-widest text-terracotta-700">{t('day', { day: day.day })}</p>
                    <h3 className="mt-1 text-lg font-bold">{day.title}</h3>
                    {day.description && <p className="mt-2 text-ink-soft">{day.description}</p>}
                    {(day.overnight || day.meals) && (
                      <div className="mt-3 flex flex-wrap gap-2 text-xs">
                        {day.overnight && <span className="inline-flex items-center gap-1.5 rounded-full bg-majorelle-50 px-3 py-1 text-majorelle-700"><Moon className="h-3.5 w-3.5" aria-hidden />{day.overnight}</span>}
                        {day.meals && <span className="inline-flex items-center gap-1.5 rounded-full bg-sand-100 px-3 py-1 text-ink"><Utensils className="h-3.5 w-3.5" aria-hidden />{day.meals}</span>}
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          )}

          <section aria-labelledby="included-title" className="grid gap-6 sm:grid-cols-2">
            <h2 id="included-title" className="sr-only">{t('sections.includedExcluded')}</h2>
            <div className="rounded-[var(--radius-card)] bg-white p-6 shadow-card">
              <h3 className="text-lg font-bold">{t('sections.included')}</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {destination.included.map((i) => (
                  <li key={i.id} className="flex gap-2.5"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden />{i.text}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[var(--radius-card)] bg-white p-6 shadow-card">
              <h3 className="text-lg font-bold">{t('sections.excluded')}</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {destination.excluded.map((i) => (
                  <li key={i.id} className="flex gap-2.5"><X className="mt-0.5 h-4 w-4 shrink-0 text-terracotta-600" aria-hidden />{i.text}</li>
                ))}
              </ul>
            </div>
          </section>

          {!!destination.bestMonths?.length && (
            <section aria-labelledby="period-title">
              <h2 id="period-title" className="font-display text-2xl font-bold">{t('sections.bestPeriod')}</h2>
              <ul className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-12">
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => {
                  const good = destination.bestMonths!.includes(m);
                  return (
                    <li key={m} className={`rounded-xl px-2 py-2 text-center text-xs font-semibold ${good ? 'bg-emerald-700 text-white' : 'bg-sand-100 text-ink-soft'}`}>
                      <span aria-hidden>{monthName(m, locale).slice(0, 4)}</span>
                      <span className="sr-only">{monthName(m, locale)} : {good ? t('recommended') : t('notRecommended')}</span>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {destination.latitude && destination.longitude && (
            <section aria-labelledby="map-title">
              <h2 id="map-title" className="font-display text-2xl font-bold">{t('sections.map')}</h2>
              <MapView lat={destination.latitude} lng={destination.longitude} label={destination.title} className="mt-5 h-80" />
            </section>
          )}

          <section aria-labelledby="booking-title" id="booking" className="scroll-mt-24">
            <h2 id="booking-title" className="mb-5 font-display text-2xl font-bold">{t('sections.booking')}</h2>
            <BookingForm
              destinations={options}
              pricing={normalizePricing(settings?.pricing)}
              currency={currency}
              countries={countryOptions(locale)}
              guideLanguages={languageOptions(locales, locale)}
              whatsapp={whatsapp}
              fixedDestinationId={destination.documentId}
              compact
            />
          </section>

          <section aria-labelledby="reviews-title">
            <h2 id="reviews-title" className="font-display text-2xl font-bold">{t('sections.reviews')}</h2>
            {reviews.length ? (
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {reviews.map((r) => (
                  <li key={r.documentId} className="rounded-[var(--radius-card)] bg-white p-5 shadow-card">
                    <RatingStars value={r.rating} size={14} label={t('ratingAria', { rating: r.rating, count: 1 })} />
                    {r.title && <p className="mt-2 font-bold">{r.title}</p>}
                    <p className="mt-1 text-sm text-ink-soft">{r.text}</p>
                    <p className="mt-3 text-xs text-ink-soft">
                      <span className="font-semibold text-ink">{r.author}</span>
                      {r.countryCode && ` · ${countryName(r.countryCode, locale)}`}
                      {r.travelDate && ` · ${formatDate(r.travelDate, locale, 'medium')}`}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-ink-soft">{t('noReviews')}</p>
            )}
          </section>
        </div>

        {/* Colonne tarifaire */}
        <aside className="h-fit space-y-4 lg:sticky lg:top-24" aria-label={t('pricesAria')}>
          <div className="rounded-[var(--radius-card)] bg-white p-6 shadow-card">
            <p className="text-sm text-ink-soft">{t('from')}</p>
            <p className="font-display text-4xl font-bold text-terracotta-700">{fmt(destination.priceAdult)}</p>
            <p className="text-sm text-ink-soft">{t('perAdult')}</p>
            {destination.priceChild != null && (
              <p className="mt-3 rounded-xl bg-sand-50 px-3 py-2 text-sm">{t('childPrice', { price: fmt(destination.priceChild) })}</p>
            )}
            <a href="#booking" className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-full bg-terracotta-600 font-semibold text-white hover:bg-terracotta-700">{t('book')}</a>
            <a href={whatsappLink(whatsapp, t('whatsappMessage', { title: destination.title }))} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-emerald-700 font-semibold text-emerald-800 hover:bg-emerald-50">
              <WhatsAppIcon className="h-5 w-5" />
              {t('askQuestion')}
            </a>
            <ul className="mt-5 space-y-2 text-sm text-ink-soft">
              <li className="flex gap-2"><Check className="h-4 w-4 text-emerald-700" aria-hidden />{t('perks.free')}</li>
              <li className="flex gap-2"><Check className="h-4 w-4 text-emerald-700" aria-hidden />{t('perks.private')}</li>
              <li className="flex gap-2"><Check className="h-4 w-4 text-emerald-700" aria-hidden />{t('perks.support')}</li>
            </ul>
          </div>
        </aside>
      </Container>

      {similar.length > 0 && (
        <section className="mt-20" aria-labelledby="similar-title">
          <Container>
            <h2 id="similar-title" className="font-display text-3xl font-bold">{t('sections.similar')}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((d) => (
                <DestinationCard key={d.documentId} destination={d} currency={currency} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <JsonLd data={jsonLd} />
    </>
  );
}
