import type { Core } from '@strapi/strapi';
import { registerDocumentMiddlewares } from './lib/document-middlewares';
import { registerReservationExport } from './lib/reservation-export';
import { ensureFrontendToken, ensureLocales, ensurePublicPermissions } from './lib/setup';

export default {
  /** Middlewares du Document Service (référence, emails, notes, ISR) et route d'export CSV. */
  register({ strapi }: { strapi: Core.Strapi }) {
    registerDocumentMiddlewares(strapi);
    registerReservationExport(strapi);
  },

  /**
   * Exécuté à chaque démarrage, de façon idempotente :
   * locales FR/EN/ES/DE/AR, permissions publiques en lecture seule, token serveur Next.js.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await ensureLocales(strapi);
    await ensurePublicPermissions(strapi);
    await ensureFrontendToken(strapi);
  },
};
