import { timingSafeEqual } from 'node:crypto';
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';
import { CACHE_TAGS } from '@/lib/strapi';

const ALLOWED_TAGS = new Set<string>(Object.values(CACHE_TAGS));

function secretMatches(received: string | null) {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected || !received) return false;
  const a = Buffer.from(received);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * Appelé par Strapi (Document Service middleware) à chaque publication / modification :
 * POST /api/revalidate  { "tags": ["destinations", "reviews"] }  + en-tête x-revalidate-secret
 */
export async function POST(request: NextRequest) {
  if (!secretMatches(request.headers.get('x-revalidate-secret'))) {
    return NextResponse.json({ revalidated: false, error: 'unauthorized' }, { status: 401 });
  }

  let tags: string[] = [];
  let all = false;
  try {
    const body = (await request.json()) as { tags?: unknown; all?: unknown };
    all = body.all === true;
    if (Array.isArray(body.tags)) tags = body.tags.filter((t): t is string => typeof t === 'string' && ALLOWED_TAGS.has(t));
  } catch {
    return NextResponse.json({ revalidated: false, error: 'invalid_body' }, { status: 400 });
  }

  // { "all": true } : tout le site (utilisé au démarrage du conteneur si le build n'a pas pu joindre Strapi)
  if (all) {
    for (const tag of ALLOWED_TAGS) revalidateTag(tag, 'max');
    revalidatePath('/', 'layout');
    return NextResponse.json({ revalidated: true, all: true, now: Date.now() });
  }

  if (!tags.length) return NextResponse.json({ revalidated: false, error: 'no_valid_tags' }, { status: 400 });

  for (const tag of tags) revalidateTag(tag, 'max');
  return NextResponse.json({ revalidated: true, tags, now: Date.now() });
}
