import type { Core } from '@strapi/strapi';
import { UID } from './constants';

/** Tags de cache Next.js invalidés quand un contenu change (cf. frontend/src/lib/strapi.ts). */
export const REVALIDATION_TAGS: Record<string, string[]> = {
  [UID.destination]: ['destinations'],
  [UID.review]: ['reviews', 'destinations'],
  [UID.faq]: ['faqs'],
  [UID.page]: ['pages'],
  [UID.siteSetting]: ['site-settings'],
};

const pending = new Set<string>();
let timer: NodeJS.Timeout | null = null;

/**
 * Regroupe les invalidations (une publication touche souvent 5 locales) puis appelle
 * POST {FRONTEND_URL}/api/revalidate. Équivaut à un webhook Strapi, sans configuration manuelle.
 */
export function scheduleRevalidation(strapi: Core.Strapi, uid: string) {
  const tags = REVALIDATION_TAGS[uid];
  const frontendUrl = process.env.FRONTEND_URL;
  const secret = process.env.REVALIDATE_SECRET;
  if (!tags || !frontendUrl || !secret || process.env.SEED_MODE === 'true') return;

  tags.forEach((tag) => pending.add(tag));
  if (timer) clearTimeout(timer);
  timer = setTimeout(async () => {
    const batch = [...pending];
    pending.clear();
    timer = null;
    try {
      const res = await fetch(`${frontendUrl.replace(/\/$/, '')}/api/revalidate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-revalidate-secret': secret },
        body: JSON.stringify({ tags: batch }),
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) strapi.log.warn(`[revalidate] Réponse ${res.status} du front pour ${batch.join(', ')}`);
      else strapi.log.info(`[revalidate] Cache du front invalidé : ${batch.join(', ')}`);
    } catch (error) {
      strapi.log.warn(`[revalidate] Front injoignable (${(error as Error).message})`);
    }
  }, 1500);
}
