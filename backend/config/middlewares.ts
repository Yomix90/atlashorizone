import type { Core } from '@strapi/strapi';

/**
 * CORS restreint : seules les origines listées (site Next.js, admin) sont autorisées.
 * Les écritures (réservations, contacts) passent par le serveur Next.js avec un token.
 */
const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Middlewares => {
  const mediaSources = [
    "'self'",
    'data:',
    'blob:',
    'market-assets.strapi.io',
    ...env.array('CSP_MEDIA_SOURCES', []),
  ];

  return [
    'strapi::logger',
    'strapi::errors',
    {
      name: 'strapi::security',
      config: {
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            'connect-src': ["'self'", 'https:'],
            'img-src': mediaSources,
            'media-src': mediaSources,
            upgradeInsecureRequests: null,
          },
        },
      },
    },
    {
      name: 'strapi::cors',
      config: {
        origin: env.array('CORS_ORIGINS', ['http://localhost:3000', 'http://localhost:1337']),
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
        headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
        keepHeaderOnError: true,
      },
    },
    'strapi::poweredBy',
    'strapi::query',
    {
      name: 'strapi::body',
      config: {
        formLimit: '256kb',
        jsonLimit: '256kb',
        textLimit: '256kb',
        formidable: { maxFileSize: 25 * 1024 * 1024 },
      },
    },
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
  ];
};

export default config;
