import { factories } from '@strapi/strapi';
import { UID } from '../../../lib/constants';
import { validateContact } from '../../../lib/validation';

export default factories.createCoreController(UID.contactMessage, ({ strapi }) => ({
  /** POST /api/contact-messages (token serveur Next.js uniquement). */
  async create(ctx) {
    const { data, errors } = validateContact(ctx.request.body?.data);
    if (!data) return ctx.badRequest('validation_error', { errors });

    const message = await strapi.documents(UID.contactMessage).create({
      data: { ...data, handled: false } as any,
    });

    ctx.status = 201;
    ctx.body = { data: { documentId: message.documentId, kind: message.kind } };
  },
}));
