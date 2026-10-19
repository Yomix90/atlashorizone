import type { Core } from '@strapi/strapi';
import { UID } from './constants';
import { sendContactEmails, sendReservationEmails } from './mailer';
import { destinationsOfReview, recomputeDestinationRating } from './ratings';
import { generateReservationReference } from './reference';
import { REVALIDATION_TAGS, scheduleRevalidation } from './revalidate';

const WRITE_ACTIONS = new Set(['create', 'update', 'delete', 'publish', 'unpublish', 'discardDraft']);
const REVIEW_ACTIONS = new Set(['create', 'update', 'delete', 'publish', 'unpublish']);

/**
 * Middlewares du Document Service (équivalent Strapi 5 des lifecycle hooks), appliqués que la
 * donnée vienne de l'API, de l'admin ou du seed :
 *  - réservation : référence unique avant création, emails client + agence après création ;
 *  - message de contact : emails client + agence ;
 *  - avis : recalcul de la note moyenne de la destination ;
 *  - contenus publics : invalidation du cache ISR du front-end.
 *
 * Les transactions sont ouvertes à l'intérieur du repository : après `next()` la donnée est validée,
 * les emails partent donc uniquement pour des enregistrements réellement créés.
 */
export function registerDocumentMiddlewares(strapi: Core.Strapi) {
  strapi.documents.use(async (context, next) => {
    const { uid, action } = context;
    const params = context.params as any;

    if (uid === UID.reservation && action === 'create') {
      params.data = params.data ?? {};
      if (!params.data.reference) params.data.reference = await generateReservationReference(strapi);
    }

    const isReviewWrite = uid === UID.review && REVIEW_ACTIONS.has(action);
    const destinationsBefore = isReviewWrite ? await destinationsOfReview(strapi, params.documentId) : [];

    const result: any = await next();

    if (action === 'create' && result?.documentId) {
      if (uid === UID.reservation) {
        sendReservationEmails(strapi, result.documentId).catch((error) =>
          strapi.log.error(`[email] Réservation ${result.reference} : ${(error as Error).message}`)
        );
      } else if (uid === UID.contactMessage) {
        sendContactEmails(strapi, result.documentId).catch((error) =>
          strapi.log.error(`[email] Message de contact : ${(error as Error).message}`)
        );
      }
    }

    if (isReviewWrite) {
      const after = await destinationsOfReview(strapi, params.documentId ?? result?.documentId);
      for (const destinationId of new Set([...destinationsBefore, ...after])) {
        await recomputeDestinationRating(strapi, destinationId);
      }
    }

    if (WRITE_ACTIONS.has(action) && REVALIDATION_TAGS[uid]) scheduleRevalidation(strapi, uid);

    return result;
  });
}
