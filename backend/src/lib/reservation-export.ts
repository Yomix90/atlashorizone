import type { Core } from '@strapi/strapi';
import { UID } from './constants';

const COLUMNS: Array<[string, (r: any) => unknown]> = [
  ['reference', (r) => r.reference],
  ['created_at', (r) => r.createdAt],
  ['status', (r) => r.status],
  ['destination', (r) => r.destination?.title],
  ['destination_slug', (r) => r.destination?.slug],
  ['start_date', (r) => r.startDate],
  ['end_date', (r) => r.endDate],
  ['adults', (r) => r.adults],
  ['children', (r) => r.children],
  ['transport', (r) => r.transport],
  ['accommodation', (r) => r.accommodation],
  ['private_guide', (r) => r.privateGuide],
  ['guide_language', (r) => r.guideLanguage],
  ['total_price', (r) => r.totalPrice],
  ['currency', (r) => r.currency],
  ['full_name', (r) => r.fullName],
  ['email', (r) => r.email],
  ['phone', (r) => r.phone],
  ['country', (r) => r.country],
  ['customer_locale', (r) => r.customerLocale],
  ['message', (r) => r.message],
  ['payment_status', (r) => r.paymentStatus],
  ['internal_notes', (r) => r.internalNotes],
];

/** Échappement CSV + neutralisation des formules Excel (=, +, -, @) contre l'injection CSV. */
function cell(value: unknown) {
  if (value === null || value === undefined) return '';
  let text = value instanceof Date ? value.toISOString() : String(value);
  const looksNumeric = /^[+-]?[\d\s().-]+$/.test(text); // téléphones, montants
  if (/^[=@\t\r]/.test(text) || (/^[+-]/.test(text) && !looksNumeric)) text = `'${text}`;
  return /[",;\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

/**
 * GET /reservation-export/csv?status=pending&from=2026-01-01&to=2026-12-31
 * Route d'administration : JWT admin requis + droit de lecture sur les réservations.
 */
export function registerReservationExport(strapi: Core.Strapi) {
  strapi.server.routes({
    type: 'admin',
    prefix: '',
    routes: [
      {
        method: 'GET',
        path: '/reservation-export/csv',
        handler: async (ctx: any) => {
          const ability = ctx.state.userAbility;
          if (!ability?.can('plugin::content-manager.explorer.read', UID.reservation)) {
            return ctx.forbidden();
          }

          const filters: Record<string, unknown> = {};
          const { status, from, to } = ctx.query as Record<string, string | undefined>;
          if (status && ['pending', 'confirmed', 'cancelled'].includes(status)) filters.status = status;
          const dateRe = /^\d{4}-\d{2}-\d{2}$/;
          if ((from && dateRe.test(from)) || (to && dateRe.test(to))) {
            filters.startDate = {
              ...(from && dateRe.test(from) ? { $gte: from } : {}),
              ...(to && dateRe.test(to) ? { $lte: to } : {}),
            };
          }

          const rows: any[] = [];
          const pageSize = 500;
          for (let start = 0; ; start += pageSize) {
            const batch = await strapi.documents(UID.reservation).findMany({
              filters,
              sort: 'createdAt:desc',
              start,
              limit: pageSize,
              populate: { destination: { fields: ['title', 'slug'] } },
            });
            rows.push(...batch);
            if (batch.length < pageSize) break;
          }

          const lines = [COLUMNS.map(([name]) => name).join(';')];
          for (const row of rows) lines.push(COLUMNS.map(([, get]) => cell(get(row))).join(';'));

          const date = new Date().toISOString().slice(0, 10);
          ctx.set('Content-Type', 'text/csv; charset=utf-8');
          ctx.set('Content-Disposition', `attachment; filename="reservations-${date}.csv"`);
          ctx.set('Cache-Control', 'no-store');
          // BOM UTF-8 pour un affichage correct des accents / de l'arabe dans Excel.
          ctx.body = `﻿${lines.join('\r\n')}\r\n`;
        },
        config: { policies: ['admin::isAuthenticatedAdmin'] },
        info: { type: 'admin', pluginName: undefined } as any,
      },
    ],
  });
}
