import 'server-only';
import qs from 'qs';
import { cache } from 'react';
import type {
  BookingDestinationOption,
  Destination,
  DestinationCardData,
  Faq,
  Region,
  Review,
  SiteSettings,
  StaticPage,
  StrapiList,
  TripType,
} from './types';
import { locales } from '@/i18n/routing';

/**
 * Client typé de l'API REST Strapi, exécuté uniquement côté serveur (le token n'atteint
 * jamais le navigateur). Les lectures sont mises en cache (ISR) avec des tags que Strapi
 * invalide via POST /api/revalidate dès qu'un contenu est publié.
 */

const API_URL = (process.env.STRAPI_API_URL || 'http://localhost:1337').replace(/\/$/, '');
const TOKEN = process.env.STRAPI_API_TOKEN;
const DEFAULT_REVALIDATE = 3600;

export const CACHE_TAGS = {
  destinations: 'destinations',
  reviews: 'reviews',
  faqs: 'faqs',
  pages: 'pages',
  settings: 'site-settings',
} as const;

export class StrapiError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: unknown
  ) {
    super(message);
  }
}

interface FetchOptions {
  query?: Record<string, unknown>;
  tags?: string[];
  revalidate?: number;
  method?: 'GET' | 'POST';
  body?: unknown;
}

async function strapiFetch<T>(path: string, { query, tags = [], revalidate = DEFAULT_REVALIDATE, method = 'GET', body }: FetchOptions = {}): Promise<T> {
  const search = query ? `?${qs.stringify(query, { encodeValuesOnly: true })}` : '';
  const res = await fetch(`${API_URL}/api${path}${search}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    ...(method === 'GET' ? { next: { tags, revalidate } } : { cache: 'no-store' as const }),
    signal: AbortSignal.timeout(15000),
  });

  if (!res.ok) {
    let details: unknown;
    try {
      details = await res.json();
    } catch {
      /* corps non JSON */
    }
    throw new StrapiError(res.status, `Strapi ${method} ${path} → ${res.status}`, details);
  }
  return (await res.json()) as T;
}

const MEDIA_FIELDS = ['url', 'alternativeText', 'width', 'height', 'formats', 'mime'];
const CARD_FIELDS = [
  'title',
  'slug',
  'region',
  'tripType',
  'summary',
  'difficulty',
  'durationDays',
  'priceAdult',
  'priceChild',
  'ratingAverage',
  'ratingCount',
  'featured',
  'locale',
];

const toNumber = (v: unknown) => (v === null || v === undefined ? null : Number(v));
function normalizeCard<T extends DestinationCardData>(d: T): T {
  return {
    ...d,
    priceAdult: Number(d.priceAdult),
    priceChild: toNumber(d.priceChild),
    ratingAverage: Number(d.ratingAverage ?? 0),
    ratingCount: Number(d.ratingCount ?? 0),
  };
}

// ─── Destinations ────────────────────────────────────────

export type DestinationSort = 'popularity' | 'price_asc' | 'price_desc' | 'rating' | 'duration';
export type DurationFilter = '1' | '2-3' | '4+';
export type BudgetFilter = 'lt150' | '150-250' | 'gt250';

export interface DestinationQuery {
  locale: string;
  region?: Region;
  tripType?: TripType;
  duration?: DurationFilter;
  budget?: BudgetFilter;
  q?: string;
  sort?: DestinationSort;
  page?: number;
  pageSize?: number;
}

const SORTS: Record<DestinationSort, string[]> = {
  popularity: ['popularity:desc', 'title:asc'],
  price_asc: ['priceAdult:asc'],
  price_desc: ['priceAdult:desc'],
  rating: ['ratingAverage:desc', 'ratingCount:desc'],
  duration: ['durationDays:asc', 'priceAdult:asc'],
};

export async function getDestinations(params: DestinationQuery) {
  const filters: Record<string, unknown> = {};
  if (params.region) filters.region = { $eq: params.region };
  if (params.tripType) filters.tripType = { $eq: params.tripType };
  if (params.duration === '1') filters.durationDays = { $eq: 1 };
  if (params.duration === '2-3') filters.durationDays = { $between: [2, 3] };
  if (params.duration === '4+') filters.durationDays = { $gte: 4 };
  if (params.budget === 'lt150') filters.priceAdult = { $lt: 150 };
  if (params.budget === '150-250') filters.priceAdult = { $between: [150, 250] };
  if (params.budget === 'gt250') filters.priceAdult = { $gt: 250 };
  if (params.q) filters.$or = [{ title: { $containsi: params.q } }, { summary: { $containsi: params.q } }];

  const res = await strapiFetch<StrapiList<DestinationCardData>>('/destinations', {
    query: {
      locale: params.locale,
      filters,
      sort: SORTS[params.sort ?? 'popularity'],
      fields: CARD_FIELDS,
      populate: { coverImage: { fields: MEDIA_FIELDS } },
      pagination: { page: params.page ?? 1, pageSize: params.pageSize ?? 12 },
    },
    tags: [CACHE_TAGS.destinations],
  });
  return { ...res, data: res.data.map(normalizeCard) };
}

export async function getFeaturedDestinations(locale: string, limit = 6) {
  const res = await strapiFetch<StrapiList<DestinationCardData>>('/destinations', {
    query: {
      locale,
      filters: { featured: { $eq: true } },
      sort: SORTS.popularity,
      fields: CARD_FIELDS,
      populate: { coverImage: { fields: MEDIA_FIELDS } },
      pagination: { pageSize: limit },
    },
    tags: [CACHE_TAGS.destinations],
  });
  return res.data.map(normalizeCard);
}

export const getDestinationBySlug = cache(async (locale: string, slug: string): Promise<Destination | null> => {
  const res = await strapiFetch<StrapiList<Destination>>('/destinations', {
    query: {
      locale,
      filters: { slug: { $eq: slug } },
      populate: {
        coverImage: { fields: MEDIA_FIELDS },
        gallery: { fields: MEDIA_FIELDS },
        highlights: true,
        itinerary: true,
        included: true,
        excluded: true,
        seo: { populate: { shareImage: { fields: MEDIA_FIELDS } } },
      },
      pagination: { pageSize: 1 },
    },
    tags: [CACHE_TAGS.destinations],
  });
  const d = res.data[0];
  return d ? { ...normalizeCard(d), latitude: toNumber(d.latitude), longitude: toNumber(d.longitude) } : null;
});

export async function getSimilarDestinations(locale: string, current: Pick<Destination, 'documentId' | 'tripType' | 'region'>, limit = 3) {
  const res = await strapiFetch<StrapiList<DestinationCardData>>('/destinations', {
    query: {
      locale,
      filters: {
        documentId: { $ne: current.documentId },
        $or: [{ tripType: { $eq: current.tripType } }, { region: { $eq: current.region } }],
      },
      sort: SORTS.popularity,
      fields: CARD_FIELDS,
      populate: { coverImage: { fields: MEDIA_FIELDS } },
      pagination: { pageSize: limit },
    },
    tags: [CACHE_TAGS.destinations],
  });
  return res.data.map(normalizeCard);
}

/** Destinations proposées dans le formulaire de réservation. */
export const getBookingOptions = cache(async (locale: string): Promise<BookingDestinationOption[]> => {
  const res = await strapiFetch<StrapiList<BookingDestinationOption>>('/destinations', {
    query: {
      locale,
      fields: ['title', 'slug', 'durationDays', 'priceAdult', 'priceChild'],
      sort: ['title:asc'],
      pagination: { pageSize: 100 },
    },
    tags: [CACHE_TAGS.destinations],
  });
  return res.data.map((d) => ({ ...d, priceAdult: Number(d.priceAdult), priceChild: toNumber(d.priceChild) }));
});

/** Slugs et dates de mise à jour par langue (sitemap, generateStaticParams). */
export async function getDestinationIndex() {
  const entries = await Promise.all(
    locales.map(async (locale) => {
      const res = await strapiFetch<StrapiList<{ slug: string; updatedAt: string }>>('/destinations', {
        query: { locale, fields: ['slug', 'updatedAt'], pagination: { pageSize: 100 } },
        tags: [CACHE_TAGS.destinations],
      });
      return res.data.map((d) => ({ locale, slug: d.slug, updatedAt: d.updatedAt }));
    })
  );
  return entries.flat();
}

// ─── Avis, FAQ, pages, paramètres ────────────────────────

export async function getReviews(locale: string, { destinationDocumentId, limit = 9 }: { destinationDocumentId?: string; limit?: number } = {}) {
  const res = await strapiFetch<StrapiList<Review>>('/reviews', {
    query: {
      locale,
      filters: destinationDocumentId ? { destination: { documentId: { $eq: destinationDocumentId } } } : {},
      sort: ['travelDate:desc', 'createdAt:desc'],
      populate: { destination: { fields: ['slug', 'title'] } },
      pagination: { pageSize: limit },
    },
    tags: [CACHE_TAGS.reviews],
  });
  return res.data;
}

export async function getFaqs(locale: string) {
  const res = await strapiFetch<StrapiList<Faq>>('/faqs', {
    query: { locale, sort: ['order:asc'], pagination: { pageSize: 100 } },
    tags: [CACHE_TAGS.faqs],
  });
  return res.data;
}

export const getPage = cache(async (locale: string, slug: string): Promise<StaticPage | null> => {
  const res = await strapiFetch<StrapiList<StaticPage>>('/pages', {
    query: {
      locale,
      filters: { slug: { $eq: slug } },
      populate: { coverImage: { fields: MEDIA_FIELDS }, seo: { populate: { shareImage: { fields: MEDIA_FIELDS } } } },
      pagination: { pageSize: 1 },
    },
    tags: [CACHE_TAGS.pages],
  });
  return res.data[0] ?? null;
});

export const getSiteSettings = cache(async (locale: string): Promise<SiteSettings | null> => {
  try {
    const res = await strapiFetch<{ data: SiteSettings | null }>('/site-setting', {
      query: {
        locale,
        populate: {
          logo: { fields: MEDIA_FIELDS },
          openingHours: true,
          socialLinks: true,
          pricing: true,
          defaultSeo: { populate: { shareImage: { fields: MEDIA_FIELDS } } },
        },
      },
      tags: [CACHE_TAGS.settings],
    });
    return res.data;
  } catch (error) {
    if (error instanceof StrapiError && error.status === 404) return null;
    throw error;
  }
});

// ─── Écritures (Server Actions uniquement) ───────────────

export interface ReservationResult {
  documentId: string;
  reference: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  currency: string;
  status: string;
}

export async function createReservation(data: Record<string, unknown>) {
  const res = await strapiFetch<{ data: ReservationResult }>('/reservations', { method: 'POST', body: { data } });
  return res.data;
}

export async function createContactMessage(data: Record<string, unknown>) {
  const res = await strapiFetch<{ data: { documentId: string } }>('/contact-messages', { method: 'POST', body: { data } });
  return res.data;
}
