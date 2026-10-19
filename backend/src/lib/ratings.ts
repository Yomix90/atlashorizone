import type { Core } from '@strapi/strapi';
import { UID } from './constants';

/** documentIds des destinations liées à un avis (toutes locales, brouillon ou publié). */
export async function destinationsOfReview(strapi: Core.Strapi, reviewDocumentId?: string): Promise<string[]> {
  if (!reviewDocumentId) return [];
  const rows = await strapi.db.query(UID.review).findMany({
    where: { documentId: reviewDocumentId },
    populate: { destination: { select: ['documentId'] } },
  });
  return [...new Set(rows.map((r: any) => r.destination?.documentId).filter(Boolean))] as string[];
}

/**
 * Recalcule note moyenne et nombre d'avis publiés d'une destination.
 * Un avis traduit en 5 langues compte une seule fois (dédoublonnage par documentId).
 * Mise à jour directe en base sur toutes les lignes (locales + brouillon/publié) :
 * ces champs sont calculés et ne doivent pas créer de modification en attente de publication.
 */
export async function recomputeDestinationRating(strapi: Core.Strapi, destinationDocumentId: string) {
  const rows = await strapi.db.query(UID.review).findMany({
    where: { publishedAt: { $notNull: true }, destination: { documentId: destinationDocumentId } },
    select: ['documentId', 'rating'],
  });

  const ratings = new Map<string, number>();
  for (const row of rows as Array<{ documentId: string; rating: number }>) {
    if (!ratings.has(row.documentId)) ratings.set(row.documentId, row.rating);
  }

  const count = ratings.size;
  const average = count ? Math.round(([...ratings.values()].reduce((a, b) => a + b, 0) / count) * 10) / 10 : 0;

  await strapi.db.query(UID.destination).updateMany({
    where: { documentId: destinationDocumentId },
    data: { ratingAverage: average, ratingCount: count },
  });
}
