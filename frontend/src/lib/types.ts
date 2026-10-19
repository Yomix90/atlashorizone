import type { BlocksContent } from '@/components/ui/BlocksRenderer';

export interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
}

export interface StrapiMedia {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
  width: number | null;
  height: number | null;
  mime?: string;
  formats?: Partial<Record<'thumbnail' | 'small' | 'medium' | 'large' | 'xlarge', StrapiMediaFormat>> | null;
}

export interface Seo {
  metaTitle?: string | null;
  metaDescription?: string | null;
  shareImage?: StrapiMedia | null;
  noIndex?: boolean | null;
}

export const REGIONS = [
  'tanger_tetouan_al_hoceima',
  'oriental',
  'fes_meknes',
  'rabat_sale_kenitra',
  'beni_mellal_khenifra',
  'casablanca_settat',
  'marrakech_safi',
  'draa_tafilalet',
  'souss_massa',
  'guelmim_oued_noun',
  'laayoune_sakia_el_hamra',
  'dakhla_oued_ed_dahab',
] as const;
export type Region = (typeof REGIONS)[number];

export const TRIP_TYPES = ['desert', 'imperial_city', 'beach', 'mountain', 'culture'] as const;
export type TripType = (typeof TRIP_TYPES)[number];

export type Difficulty = 'easy' | 'moderate' | 'challenging';

export interface ListItem {
  id: number;
  text: string;
}

export interface ItineraryDay {
  id: number;
  day: number;
  title: string;
  description: string | null;
  overnight: string | null;
  meals: string | null;
}

export interface DestinationCardData {
  id: number;
  documentId: string;
  locale: string;
  title: string;
  slug: string;
  region: Region;
  tripType: TripType;
  summary: string;
  difficulty: Difficulty;
  durationDays: number;
  priceAdult: number;
  priceChild: number | null;
  ratingAverage: number;
  ratingCount: number;
  featured: boolean;
  coverImage: StrapiMedia | null;
}

export interface Destination extends DestinationCardData {
  description: BlocksContent | null;
  highlights: ListItem[];
  itinerary: ItineraryDay[];
  included: ListItem[];
  excluded: ListItem[];
  bestPeriod: string | null;
  bestMonths: number[] | null;
  gallery: StrapiMedia[] | null;
  latitude: number | null;
  longitude: number | null;
  popularity: number;
  seo: Seo | null;
  updatedAt: string;
}

export interface BookingDestinationOption {
  documentId: string;
  title: string;
  slug: string;
  durationDays: number;
  priceAdult: number;
  priceChild: number | null;
}

export interface Review {
  id: number;
  documentId: string;
  author: string;
  countryCode: string | null;
  rating: number;
  title: string | null;
  text: string;
  travelDate: string | null;
  destination?: { documentId: string; slug: string; title: string } | null;
  /** Nom du pays traduit, calculé côté serveur. */
  countryLabel?: string | null;
}

export interface Faq {
  id: number;
  documentId: string;
  question: string;
  answer: string;
  category: 'booking' | 'payment' | 'travel' | 'onsite';
  order: number;
}

export interface StaticPage {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  subtitle: string | null;
  content: BlocksContent | null;
  coverImage: StrapiMedia | null;
  seo: Seo | null;
  updatedAt: string;
}

export interface PricingSettings {
  transportPerPerson: number;
  accommodationStandardPerNight: number;
  accommodationSuperiorPerNight: number;
  accommodationLuxuryPerNight: number;
  childAccommodationRatio: number;
  privateGuidePerDay: number;
}

export type SocialPlatform = 'facebook' | 'instagram' | 'tiktok' | 'youtube' | 'x' | 'tripadvisor' | 'linkedin' | 'pinterest';

export interface SiteSettings {
  agencyName: string;
  tagline: string | null;
  description: string | null;
  logo: StrapiMedia | null;
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string | null;
  city: string | null;
  latitude: number | null;
  longitude: number | null;
  openingHours: Array<{ id: number; label: string; hours: string | null; closed: boolean }>;
  socialLinks: Array<{ id: number; platform: SocialPlatform; url: string }>;
  currency: string;
  pricing: PricingSettings | null;
  licenseNumber: string | null;
  companyId: string | null;
  defaultSeo: Seo | null;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiList<T> {
  data: T[];
  meta: { pagination: Pagination };
}
