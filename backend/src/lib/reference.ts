import crypto from 'node:crypto';
import type { Core } from '@strapi/strapi';
import { UID } from './constants';

// Sans 0/O ni 1/I pour éviter les confusions lorsqu'un client dicte sa référence au téléphone.
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const PREFIX = process.env.RESERVATION_PREFIX || 'AHV';

function randomCode(length: number) {
  const bytes = crypto.randomBytes(length);
  return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join('');
}

/** Référence unique lisible, ex. AHV-2610-K7M2QX (préfixe-AAMM-code). */
export async function generateReservationReference(strapi: Core.Strapi): Promise<string> {
  const now = new Date();
  const period = `${String(now.getUTCFullYear()).slice(2)}${String(now.getUTCMonth() + 1).padStart(2, '0')}`;

  for (let attempt = 0; attempt < 10; attempt++) {
    const reference = `${PREFIX}-${period}-${randomCode(6)}`;
    const existing = await strapi.db.query(UID.reservation).findOne({ where: { reference }, select: ['id'] });
    if (!existing) return reference;
  }
  throw new Error('Impossible de générer une référence de réservation unique');
}
