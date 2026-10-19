import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const isDev = process.env.NODE_ENV !== 'production';
function parseMediaUrl(raw: string | undefined): URL {
  const value = raw?.trim() || 'http://localhost:1337';
  try {
    const url = new URL(value);
    if (!url.hostname) throw new Error('hostname vide');
    return url;
  } catch {
    throw new Error(
      `NEXT_PUBLIC_MEDIA_URL invalide (« ${value} »). En Docker/Dokploy, renseignez CMS_DOMAIN sans https:// (ex. cms.atlashorizon.ma).`
    );
  }
}
const mediaUrl = parseMediaUrl(process.env.NEXT_PUBLIC_MEDIA_URL);
const gaEnabled = Boolean(process.env.NEXT_PUBLIC_GA_ID);
// Domaines d'images supplémentaires (Cloudinary, S3/CDN…), ex. EXTRA_IMAGE_HOSTS=res.cloudinary.com,cdn.example.com
const extraImageHosts = (process.env.EXTRA_IMAGE_HOSTS || '')
  .split(',')
  .map((h) => h.trim())
  .filter(Boolean);

/**
 * Content-Security-Policy. 'unsafe-inline' pour les scripts reste nécessaire avec des pages
 * statiques/ISR (les nonces imposeraient un rendu dynamique de toutes les pages).
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://challenges.cloudflare.com${gaEnabled ? ' https://www.googletagmanager.com' : ''}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${mediaUrl.origin}${extraImageHosts.map((h) => ` https://${h}`).join('')} https://*.tile.openstreetmap.org${gaEnabled ? ' https://www.google-analytics.com https://www.googletagmanager.com' : ''}`,
  "font-src 'self' data:",
  `connect-src 'self' https://challenges.cloudflare.com${gaEnabled ? ' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com' : ''}${isDev ? ' ws:' : ''}`,
  'frame-src https://challenges.cloudflare.com',
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  ...(isDev ? [] : ['upgrade-insecure-requests']),
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
  ...(isDev ? [] : [{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }]),
];

const nextConfig: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: mediaUrl.protocol.replace(':', '') as 'http' | 'https',
        hostname: mediaUrl.hostname,
        port: mediaUrl.port,
        pathname: '/uploads/**',
      },
      ...extraImageHosts.map((hostname) => ({ protocol: 'https' as const, hostname })),
    ],
    // En local, Strapi tourne sur localhost : autoriser l'optimiseur d'images à le contacter.
    dangerouslyAllowLocalIP: isDev || process.env.IMAGES_ALLOW_LOCAL_IP === 'true',
    minimumCacheTTL: 60 * 60 * 24,
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default withNextIntl(nextConfig);
