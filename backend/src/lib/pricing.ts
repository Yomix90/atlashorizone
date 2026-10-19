/**
 * Calcul du prix total d'une réservation.
 * Même formule que le front-end (frontend/src/lib/pricing.ts) : le front affiche une estimation,
 * Strapi recalcule toujours le montant enregistré (le prix envoyé par le navigateur est ignoré).
 */

export type Accommodation = 'none' | 'standard' | 'superior' | 'luxury';

export interface PricingSettings {
  transportPerPerson: number;
  accommodationStandardPerNight: number;
  accommodationSuperiorPerNight: number;
  accommodationLuxuryPerNight: number;
  childAccommodationRatio: number;
  privateGuidePerDay: number;
}

export interface QuoteInput {
  priceAdult: number;
  priceChild?: number | null;
  durationDays: number;
  adults: number;
  children: number;
  transport: boolean;
  accommodation: Accommodation;
  privateGuide: boolean;
}

export interface Quote {
  base: number;
  transport: number;
  accommodation: number;
  guide: number;
  total: number;
  nights: number;
}

export const DEFAULT_PRICING: PricingSettings = {
  transportPerPerson: 60,
  accommodationStandardPerNight: 35,
  accommodationSuperiorPerNight: 70,
  accommodationLuxuryPerNight: 140,
  childAccommodationRatio: 0.5,
  privateGuidePerDay: 90,
};

const round2 = (n: number) => Math.round(n * 100) / 100;
const num = (v: unknown, fallback: number) => {
  const n = typeof v === 'string' ? parseFloat(v) : (v as number);
  return Number.isFinite(n) ? n : fallback;
};

export function normalizePricing(raw?: Partial<Record<keyof PricingSettings, unknown>> | null): PricingSettings {
  const p = raw ?? {};
  return {
    transportPerPerson: num(p.transportPerPerson, DEFAULT_PRICING.transportPerPerson),
    accommodationStandardPerNight: num(p.accommodationStandardPerNight, DEFAULT_PRICING.accommodationStandardPerNight),
    accommodationSuperiorPerNight: num(p.accommodationSuperiorPerNight, DEFAULT_PRICING.accommodationSuperiorPerNight),
    accommodationLuxuryPerNight: num(p.accommodationLuxuryPerNight, DEFAULT_PRICING.accommodationLuxuryPerNight),
    childAccommodationRatio: num(p.childAccommodationRatio, DEFAULT_PRICING.childAccommodationRatio),
    privateGuidePerDay: num(p.privateGuidePerDay, DEFAULT_PRICING.privateGuidePerDay),
  };
}

export function computeQuote(input: QuoteInput, pricing: PricingSettings): Quote {
  const durationDays = Math.max(1, Math.floor(input.durationDays));
  const nights = durationDays - 1;
  const priceAdult = num(input.priceAdult, 0);
  const priceChild = num(input.priceChild, priceAdult);
  const travellers = input.adults + input.children;

  const base = input.adults * priceAdult + input.children * priceChild;
  const transport = input.transport ? travellers * pricing.transportPerPerson : 0;

  const nightly = {
    none: 0,
    standard: pricing.accommodationStandardPerNight,
    superior: pricing.accommodationSuperiorPerNight,
    luxury: pricing.accommodationLuxuryPerNight,
  }[input.accommodation];
  const accommodation =
    nightly * nights * (input.adults + input.children * pricing.childAccommodationRatio);

  const guide = input.privateGuide ? pricing.privateGuidePerDay * durationDays : 0;

  return {
    base: round2(base),
    transport: round2(transport),
    accommodation: round2(accommodation),
    guide: round2(guide),
    total: round2(base + transport + accommodation + guide),
    nights,
  };
}
