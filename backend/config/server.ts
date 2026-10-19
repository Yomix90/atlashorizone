import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Server => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // URL publique de Strapi (ex. https://cms.example-agence.ma) — utilisée pour l'admin et les médias.
  url: env('PUBLIC_URL', 'http://localhost:1337'),
  // Strapi tourne derrière Nginx : faire confiance aux en-têtes X-Forwarded-*.
  proxy: env.bool('IS_PROXIED', false),
  app: {
    keys: env.array('APP_KEYS'),
  },
});

export default config;
