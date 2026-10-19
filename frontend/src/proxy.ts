import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

/** Next.js 16 « proxy » (ex-middleware) : préfixe de langue, détection et cookie NEXT_LOCALE. */
export default createMiddleware(routing);

export const config = {
  // Toutes les routes sauf API, fichiers internes Next et fichiers avec extension (sitemap.xml, robots.txt, images…)
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
};
