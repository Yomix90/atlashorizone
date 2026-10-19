import 'server-only';
import { headers } from 'next/headers';

/**
 * Limitation de débit en mémoire (fenêtre glissante) par IP et par formulaire.
 * Suffisant pour une instance unique (Docker / PM2 fork). En cluster, utiliser Redis.
 */
const buckets = new Map<string, number[]>();

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (hits.length >= limit) {
    buckets.set(key, hits);
    return false;
  }
  hits.push(now);
  buckets.set(key, hits);

  if (buckets.size > 5000) {
    for (const [k, v] of buckets) if (!v.some((t) => now - t < windowMs)) buckets.delete(k);
  }
  return true;
}

/** IP du client transmise par Nginx (X-Real-IP / X-Forwarded-For). */
export async function getClientIp() {
  const h = await headers();
  return h.get('x-real-ip') || h.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}

let warnedMissingSecret = false;

/** Vérifie un jeton Cloudflare Turnstile. Sans clé secrète configurée, la vérification est ignorée. */
export async function verifyTurnstile(token: string | undefined, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    if (!warnedMissingSecret) {
      console.warn('[turnstile] TURNSTILE_SECRET_KEY absente : vérification anti-robot désactivée');
      warnedMissingSecret = true;
    }
    return true;
  }
  if (!token) return false;

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip !== 'unknown') body.set('remoteip', ip);
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
      signal: AbortSignal.timeout(8000),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (error) {
    console.error('[turnstile] Vérification impossible', error);
    return false;
  }
}
