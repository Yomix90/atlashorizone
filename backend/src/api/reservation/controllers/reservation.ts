import { factories } from '@strapi/strapi';
import { UID } from '../../../lib/constants';
import { computeQuote, normalizePricing } from '../../../lib/pricing';
import { validateReservation } from '../../../lib/validation';

const addDays = (isoDate: string, days: number) => {
  const d = new Date(`${isoDate}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};

export default factories.createCoreController(UID.reservation, ({ strapi }) => ({
  /**
   * POST /api/reservations (token serveur Next.js uniquement).
   * Le prix, la date de fin, le statut et la référence sont calculés ici, jamais repris du client.
   */
  async create(ctx) {
    const { data, errors } = validateReservation(ctx.request.body?.data);
    if (!data) return ctx.badRequest('validation_error', { errors });

    const destination =
      (await strapi.documents(UID.destination).findOne({
        documentId: data.destination,
        locale: data.customerLocale,
        status: 'published',
      })) ??
      (await strapi.documents(UID.destination).findOne({
        documentId: data.destination,
        status: 'published',
      }));
    if (!destination) return ctx.badRequest('validation_error', { errors: { destination: 'not_found' } });

    const settings = await strapi.documents(UID.siteSetting).findFirst({ populate: ['pricing'] });
    const quote = computeQuote(
      {
        priceAdult: Number(destination.priceAdult),
        priceChild: destination.priceChild == null ? null : Number(destination.priceChild),
        durationDays: destination.durationDays,
        adults: data.adults,
        children: data.children,
        transport: data.transport,
        accommodation: data.accommodation,
        privateGuide: data.privateGuide,
      },
      normalizePricing(settings?.pricing as any)
    );

    const reservation = await strapi.documents(UID.reservation).create({
      data: {
        ...data,
        destination: destination.documentId,
        endDate: addDays(data.startDate, Math.max(1, destination.durationDays) - 1),
        totalPrice: quote.total,
        currency: settings?.currency || 'EUR',
        status: 'pending',
        paymentStatus: 'unpaid',
        paymentProvider: 'none',
      } as any,
    });

    ctx.status = 201;
    ctx.body = {
      data: {
        documentId: reservation.documentId,
        reference: reservation.reference,
        startDate: reservation.startDate,
        endDate: reservation.endDate,
        totalPrice: Number(reservation.totalPrice),
        currency: reservation.currency,
        status: reservation.status,
        quote,
      },
    };
  },
}));
