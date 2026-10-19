#!/usr/bin/env node
/**
 * Seed des contenus de démonstration en 5 langues (FR, EN, ES, DE, AR) :
 * 12 destinations, avis, FAQ, pages statiques, paramètres du site et images d'illustration.
 *
 *   npm run seed            → ajoute uniquement ce qui manque (idempotent)
 *   npm run seed -- --force → SUPPRIME puis recrée destinations, avis, FAQ, pages et paramètres
 *
 * Les réservations et messages de contact ne sont jamais touchés.
 */
'use strict';

process.env.SEED_MODE = 'true'; // désactive la revalidation ISR pendant le seed

const fs = require('fs');
const os = require('os');
const path = require('path');
const { compileStrapi, createStrapi } = require('@strapi/strapi');

const { LOCALES, ITEMS, SITE_SETTINGS, FAQS } = require('./seed-data/common');
const DESTINATIONS = [...require('./seed-data/destinations-1'), ...require('./seed-data/destinations-2')];
const REVIEWS = require('./seed-data/reviews');
const PAGES = require('./seed-data/pages');
const { renderPlaceholder } = require('./lib/placeholder-images');

const FORCE = process.argv.includes('--force');
const DEFAULT_LOCALE = 'fr';
const OTHER_LOCALES = LOCALES.filter((l) => l !== DEFAULT_LOCALE);
const AGENCY = SITE_SETTINGS.shared.agencyName;

const UID = {
  destination: 'api::destination.destination',
  review: 'api::review.review',
  faq: 'api::faq.faq',
  page: 'api::page.page',
  siteSetting: 'api::site-setting.site-setting',
};

// ─── Helpers ─────────────────────────────────────────────
const truncate = (text, max) => (text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`);
const text = (value) => [{ type: 'text', text: value }];
const paragraphs = (list) => list.map((p) => ({ type: 'paragraph', children: text(p) }));
const toBlocks = (content) =>
  content.map(([type, value]) => {
    if (type === 'h2') return { type: 'heading', level: 2, children: text(value) };
    if (type === 'ul')
      return { type: 'list', format: 'unordered', children: value.map((item) => ({ type: 'list-item', children: text(item) })) };
    return { type: 'paragraph', children: text(value) };
  });

async function uploadImage(strapi, { name, alt, buffer }) {
  const existing = await strapi.db.query('plugin::upload.file').findOne({ where: { name } });
  if (existing) return existing.id;

  const tmp = path.join(os.tmpdir(), `seed-${Date.now()}-${name}`);
  fs.writeFileSync(tmp, buffer);
  try {
    const [file] = await strapi
      .plugin('upload')
      .service('upload')
      .upload({
        data: { fileInfo: { name, alternativeText: alt, caption: alt } },
        files: { filepath: tmp, originalFilename: name, mimetype: 'image/jpeg', size: buffer.length },
      });
    return file.id;
  } finally {
    fs.rmSync(tmp, { force: true });
  }
}

/** Crée un document dans la locale par défaut, ajoute les traductions, puis publie toutes les locales. */
async function createLocalized(strapi, uid, shared, perLocale, { draftAndPublish = true } = {}) {
  const doc = await strapi.documents(uid).create({
    locale: DEFAULT_LOCALE,
    data: { ...shared, ...perLocale[DEFAULT_LOCALE] },
  });
  for (const locale of OTHER_LOCALES) {
    if (!perLocale[locale]) continue;
    await strapi.documents(uid).update({
      documentId: doc.documentId,
      locale,
      data: { ...shared, ...perLocale[locale] },
    });
  }
  if (draftAndPublish) await strapi.documents(uid).publish({ documentId: doc.documentId, locale: '*' });
  return doc;
}

async function wipe(strapi, uid) {
  const rows = await strapi.db.query(uid).findMany({ select: ['documentId'] });
  const ids = [...new Set(rows.map((r) => r.documentId))];
  for (const documentId of ids) await strapi.documents(uid).delete({ documentId, locale: '*' });
  return ids.length;
}

// ─── Seeders ─────────────────────────────────────────────
async function seedDestinations(strapi) {
  const ids = {};
  const covers = {};

  for (const dest of DESTINATIONS) {
    const existing = await strapi.db.query(UID.destination).findOne({ where: { slug: dest.slug }, select: ['documentId'] });
    const coverAlt = dest.i18n[DEFAULT_LOCALE].title;

    const coverId = await uploadImage(strapi, {
      name: `${dest.slug}-cover.jpg`,
      alt: coverAlt,
      buffer: await renderPlaceholder(dest.image, 0),
    });
    covers[dest.slug] = coverId;

    if (existing) {
      ids[dest.slug] = existing.documentId;
      strapi.log.info(`[seed] Destination « ${dest.slug} » déjà présente, ignorée`);
      continue;
    }

    const gallery = [];
    for (let v = 1; v <= 3; v++) {
      gallery.push(
        await uploadImage(strapi, {
          name: `${dest.slug}-gallery-${v}.jpg`,
          alt: `${coverAlt} (${v})`,
          buffer: await renderPlaceholder(dest.image, v),
        })
      );
    }

    const shared = {
      slug: dest.slug,
      region: dest.region,
      tripType: dest.tripType,
      difficulty: dest.difficulty,
      durationDays: dest.durationDays,
      priceAdult: dest.priceAdult,
      priceChild: dest.priceChild,
      latitude: dest.latitude,
      longitude: dest.longitude,
      featured: dest.featured,
      popularity: dest.popularity,
      bestMonths: dest.bestMonths,
      coverImage: coverId,
      gallery,
    };

    const perLocale = {};
    for (const locale of LOCALES) {
      const t = dest.i18n[locale];
      perLocale[locale] = {
        title: t.title,
        summary: t.summary,
        description: paragraphs(t.description),
        highlights: t.highlights.map((h) => ({ text: h })),
        itinerary: t.itinerary.map((day, i) => ({
          day: i + 1,
          title: day.title,
          description: day.description,
          overnight: day.overnight ?? null,
          meals: day.meals ?? null,
        })),
        included: dest.included.map((key) => ({ text: ITEMS[key][locale] })),
        excluded: dest.excluded.map((key) => ({ text: ITEMS[key][locale] })),
        bestPeriod: t.bestPeriod,
        seo: {
          metaTitle: truncate(`${t.title} | ${AGENCY}`, 70),
          metaDescription: truncate(t.summary, 165),
          shareImage: coverId,
          noIndex: false,
        },
      };
    }

    const doc = await createLocalized(strapi, UID.destination, shared, perLocale);
    ids[dest.slug] = doc.documentId;
    strapi.log.info(`[seed] Destination « ${dest.slug} » créée (5 langues)`);
  }
  return { ids, covers };
}

async function seedReviews(strapi, destinationIds) {
  const count = await strapi.db.query(UID.review).count();
  if (count > 0) return strapi.log.info('[seed] Avis déjà présents, ignorés');

  for (const review of REVIEWS) {
    const shared = {
      author: review.author,
      countryCode: review.countryCode,
      rating: review.rating,
      travelDate: review.travelDate,
      destination: destinationIds[review.destination],
    };
    const perLocale = Object.fromEntries(LOCALES.map((l) => [l, { title: review[l][0], text: review[l][1] }]));
    await createLocalized(strapi, UID.review, shared, perLocale);
  }
  strapi.log.info(`[seed] ${REVIEWS.length} avis créés (5 langues)`);
}

async function seedFaqs(strapi) {
  const count = await strapi.db.query(UID.faq).count();
  if (count > 0) return strapi.log.info('[seed] FAQ déjà présente, ignorée');

  for (const faq of FAQS) {
    const perLocale = Object.fromEntries(LOCALES.map((l) => [l, { question: faq[l][0], answer: faq[l][1] }]));
    await createLocalized(strapi, UID.faq, { category: faq.category, order: faq.order }, perLocale);
  }
  strapi.log.info(`[seed] ${FAQS.length} questions de FAQ créées (5 langues)`);
}

async function seedPages(strapi) {
  for (const page of PAGES) {
    const existing = await strapi.db.query(UID.page).findOne({ where: { slug: page.slug }, select: ['id'] });
    if (existing) {
      strapi.log.info(`[seed] Page « ${page.slug} » déjà présente, ignorée`);
      continue;
    }
    const perLocale = Object.fromEntries(
      LOCALES.map((l) => [
        l,
        {
          title: page[l].title,
          subtitle: page[l].subtitle,
          content: toBlocks(page[l].content),
          seo: {
            metaTitle: truncate(`${page[l].title} | ${AGENCY}`, 70),
            metaDescription: truncate(page[l].subtitle, 165),
            noIndex: false,
          },
        },
      ])
    );
    await createLocalized(strapi, UID.page, { slug: page.slug }, perLocale);
    strapi.log.info(`[seed] Page « ${page.slug} » créée (5 langues)`);
  }
}

async function seedSiteSettings(strapi, shareImageId) {
  const existing = await strapi.db.query(UID.siteSetting).findOne({ select: ['id'] });
  if (existing) return strapi.log.info('[seed] Paramètres du site déjà présents, ignorés');

  const perLocale = Object.fromEntries(
    LOCALES.map((l) => [
      l,
      { ...SITE_SETTINGS[l], defaultSeo: { ...SITE_SETTINGS[l].defaultSeo, shareImage: shareImageId, noIndex: false } },
    ])
  );
  await createLocalized(strapi, UID.siteSetting, SITE_SETTINGS.shared, perLocale, { draftAndPublish: false });
  strapi.log.info('[seed] Paramètres du site créés (valeurs d’exemple à remplacer dans l’admin)');
}

// ─── Main ────────────────────────────────────────────────
async function main() {
  // En production (image Docker), le code est déjà compilé dans dist/ et TypeScript n'est pas installé.
  const distDir = path.join(process.cwd(), 'dist');
  const appContext =
    process.env.NODE_ENV === 'production' && fs.existsSync(distDir)
      ? { appDir: process.cwd(), distDir }
      : await compileStrapi();
  const strapi = await createStrapi(appContext).load();

  try {
    if (FORCE) {
      for (const uid of [UID.review, UID.destination, UID.faq, UID.page, UID.siteSetting]) {
        const n = await wipe(strapi, uid);
        strapi.log.warn(`[seed] --force : ${n} document(s) supprimé(s) dans ${uid}`);
      }
    }

    const { ids, covers } = await seedDestinations(strapi);
    await seedReviews(strapi, ids);
    await seedFaqs(strapi);
    await seedPages(strapi);
    await seedSiteSettings(strapi, covers.marrakech);

    strapi.log.info('[seed] Terminé ✔');
  } finally {
    await strapi.destroy();
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('[seed] Échec :', error);
    process.exit(1);
  });
