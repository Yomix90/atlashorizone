import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.NODE_ENV === 'production' && !SITE_URL.includes('localhost');
  return {
    rules: isProduction ? [{ userAgent: '*', allow: '/', disallow: ['/api/'] }] : [{ userAgent: '*', disallow: '/' }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
