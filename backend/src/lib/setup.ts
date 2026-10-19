import crypto from 'node:crypto';
import type { Core } from '@strapi/strapi';

export const LOCALES = [
  { code: 'fr', name: 'Français (fr)' },
  { code: 'en', name: 'English (en)' },
  { code: 'es', name: 'Español (es)' },
  { code: 'de', name: 'Deutsch (de)' },
  { code: 'ar', name: 'العربية (ar)' },
] as const;

export const DEFAULT_LOCALE = 'fr';

/** Lecture seule publique sur les contenus publiés. */
export const PUBLIC_READ_ACTIONS = [
  'api::destination.destination.find',
  'api::destination.destination.findOne',
  'api::review.review.find',
  'api::review.review.findOne',
  'api::faq.faq.find',
  'api::faq.faq.findOne',
  'api::page.page.find',
  'api::page.page.findOne',
  'api::site-setting.site-setting.find',
];

/** Le serveur Next.js lit les contenus et crée réservations / messages. */
export const FRONTEND_TOKEN_ACTIONS = [
  ...PUBLIC_READ_ACTIONS,
  'api::reservation.reservation.create',
  'api::contact-message.contact-message.create',
];

export const FRONTEND_TOKEN_NAME = 'frontend-server';

/** Crée les 5 locales et fait du français la langue par défaut. */
export async function ensureLocales(strapi: Core.Strapi) {
  const localesService = strapi.plugin('i18n').service('locales');
  const existing: Array<{ code: string }> = await localesService.find();

  for (const locale of LOCALES) {
    if (!existing.some((l) => l.code === locale.code)) {
      await localesService.create({ code: locale.code, name: locale.name });
      strapi.log.info(`[setup] Locale « ${locale.code} » créée`);
    }
  }

  const current = await localesService.getDefaultLocale();
  if (current !== DEFAULT_LOCALE) {
    await localesService.setDefaultLocale({ code: DEFAULT_LOCALE });
    strapi.log.info(`[setup] Locale par défaut : ${DEFAULT_LOCALE}`);
  }
}

/** Accorde au rôle « Public » la lecture des contenus publiés, et rien d'autre. */
export async function ensurePublicPermissions(strapi: Core.Strapi) {
  const roleQuery = strapi.db.query('plugin::users-permissions.role');
  const permissionQuery = strapi.db.query('plugin::users-permissions.permission');

  const publicRole = await roleQuery.findOne({ where: { type: 'public' } });
  if (!publicRole) {
    strapi.log.warn('[setup] Rôle public introuvable : permissions non configurées');
    return;
  }

  const current = await permissionQuery.findMany({
    where: { role: publicRole.id },
    select: ['id', 'action'],
  });
  const currentActions = new Set(current.map((p: { action: string }) => p.action));

  for (const action of PUBLIC_READ_ACTIONS) {
    if (!currentActions.has(action)) {
      await permissionQuery.create({ data: { action, role: publicRole.id } });
    }
  }

  // Sécurité : retire toute écriture publique sur les contenus de l'API (ajoutée à la main par erreur).
  const forbidden = current.filter(
    (p: { action: string }) => p.action.startsWith('api::') && !PUBLIC_READ_ACTIONS.includes(p.action)
  );
  for (const permission of forbidden) {
    await permissionQuery.delete({ where: { id: permission.id } });
    strapi.log.warn(`[setup] Permission publique retirée : ${permission.action}`);
  }
}

/**
 * Crée (ou met à jour) le token d'API « frontend-server » dont la valeur est fixée par
 * la variable FRONTEND_API_TOKEN, partagée avec le serveur Next.js. Ainsi aucune étape
 * manuelle dans l'admin n'est nécessaire au déploiement, et le token n'est jamais envoyé
 * au navigateur.
 */
export async function ensureFrontendToken(strapi: Core.Strapi) {
  const accessKey = process.env.FRONTEND_API_TOKEN;
  if (!accessKey || accessKey.length < 32 || accessKey.startsWith('changeMe')) {
    strapi.log.warn(
      '[setup] FRONTEND_API_TOKEN absent ou trop faible (>= 32 caractères aléatoires requis) : token non créé'
    );
    return;
  }

  const tokenService = strapi.service('admin::api-token');
  const tokenQuery = strapi.db.query('admin::api-token');

  let token = await tokenQuery.findOne({ where: { name: FRONTEND_TOKEN_NAME } });
  if (!token) {
    const created = await tokenService.create({
      name: FRONTEND_TOKEN_NAME,
      description: 'Serveur Next.js : lecture des contenus, création des réservations et messages',
      type: 'custom',
      lifespan: null,
      permissions: FRONTEND_TOKEN_ACTIONS,
    });
    token = await tokenQuery.findOne({ where: { id: created.id } });
    strapi.log.info(`[setup] Token d'API « ${FRONTEND_TOKEN_NAME} » créé`);
  } else {
    await tokenService.update(token.id, { type: 'custom', permissions: FRONTEND_TOKEN_ACTIONS });
  }

  const hashed =
    typeof tokenService.hash === 'function'
      ? tokenService.hash(accessKey)
      : crypto
          .createHmac('sha512', strapi.config.get('admin.apiToken.salt') as string)
          .update(accessKey)
          .digest('hex');

  if (token.accessKey !== hashed) {
    await tokenQuery.update({ where: { id: token.id }, data: { accessKey: hashed } });
    strapi.log.info(`[setup] Valeur du token « ${FRONTEND_TOKEN_NAME} » synchronisée avec FRONTEND_API_TOKEN`);
  }
}
