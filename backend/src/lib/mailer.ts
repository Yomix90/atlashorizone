import type { Core } from '@strapi/strapi';
import { UID, isSupportedLocale, type SupportedLocale } from './constants';
import { EMAIL_MESSAGES, type EmailMessages } from './email-messages';

const BRAND = { terracotta: '#C2552D', majorelle: '#2741A8', sand: '#E8C98A', cream: '#FBF7F0', ink: '#2B2522' };

const escapeHtml = (value: unknown) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

/** Remplace {var} ; en mode HTML, chaque valeur est échappée. */
const format = (template: string, vars: Record<string, unknown>, html = true) =>
  template.replace(/\{(\w+)\}/g, (_, key) => (html ? escapeHtml(vars[key]) : String(vars[key] ?? '')));

const toLocale = (value: unknown): SupportedLocale => (isSupportedLocale(value) ? value : 'fr');
const agencyLocale = () => toLocale(process.env.AGENCY_EMAIL_LOCALE);

const formatDate = (isoDate: string | null | undefined, locale: SupportedLocale) =>
  isoDate
    ? new Intl.DateTimeFormat(locale === 'ar' ? 'ar-MA' : locale, { dateStyle: 'long', timeZone: 'UTC' }).format(
        new Date(`${isoDate}T00:00:00Z`)
      )
    : '—';

const formatPrice = (amount: unknown, currency: string, locale: SupportedLocale) =>
  new Intl.NumberFormat(locale === 'ar' ? 'ar-MA' : locale, { style: 'currency', currency }).format(Number(amount) || 0);

interface Settings {
  agencyName: string;
  email: string;
  whatsappNumber: string;
  notificationEmail?: string | null;
}

async function getSettings(strapi: Core.Strapi, locale: SupportedLocale): Promise<Settings> {
  const settings =
    (await strapi.documents(UID.siteSetting).findFirst({ locale })) ??
    (await strapi.documents(UID.siteSetting).findFirst({}));
  return {
    agencyName: settings?.agencyName || 'Atlas Horizons Voyages',
    email: settings?.email || process.env.EMAIL_REPLY_TO || 'contact@example-agence.ma',
    whatsappNumber: settings?.whatsappNumber ? `+${settings.whatsappNumber}` : '',
    notificationEmail: (settings as any)?.notificationEmail || settings?.email,
  };
}

function rowsHtml(rows: Array<[string, string]>, dir: 'ltr' | 'rtl') {
  const align = dir === 'rtl' ? 'right' : 'left';
  return rows
    .map(
      ([label, value]) => `<tr>
        <td style="padding:8px 12px;border-bottom:1px solid #eee3d3;color:#7a6a5c;font-size:14px;text-align:${align};vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee3d3;color:${BRAND.ink};font-size:14px;font-weight:600;text-align:${align};white-space:pre-line">${escapeHtml(value)}</td>
      </tr>`
    )
    .join('');
}

/** Gabarit HTML commun, compatible clients mail (tables + styles en ligne), RTL pour l'arabe. */
function layout({
  m,
  agency,
  title,
  paragraphs,
  rows,
  note,
  cta,
}: {
  m: EmailMessages;
  agency: string;
  title: string;
  paragraphs: string[];
  rows?: Array<[string, string]>;
  note?: string;
  cta?: { label: string; url: string };
}) {
  const align = m.dir === 'rtl' ? 'right' : 'left';
  return `<!doctype html>
<html dir="${m.dir}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title></head>
<body style="margin:0;padding:0;background:${BRAND.cream};font-family:Segoe UI,Tahoma,Arial,sans-serif;color:${BRAND.ink}">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.cream};padding:24px 12px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden" dir="${m.dir}">
        <tr><td style="background:${BRAND.terracotta};padding:22px 28px;color:#ffffff;font-size:20px;font-weight:700;text-align:${align}">${escapeHtml(agency)}</td></tr>
        <tr><td style="height:4px;background:${BRAND.majorelle}"></td></tr>
        <tr><td style="padding:28px;text-align:${align}">
          <h1 style="margin:0 0 16px;font-size:20px;color:${BRAND.majorelle}">${escapeHtml(title)}</h1>
          ${paragraphs.map((p) => `<p style="margin:0 0 14px;font-size:15px;line-height:1.6">${p}</p>`).join('')}
          ${rows?.length ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:18px 0;border:1px solid #eee3d3;border-radius:8px">${rowsHtml(rows, m.dir)}</table>` : ''}
          ${note ? `<p style="margin:0 0 14px;padding:12px 14px;background:#fbf1e2;border-radius:8px;font-size:13px;line-height:1.5;color:#6b5546">${note}</p>` : ''}
          ${cta ? `<p style="margin:20px 0"><a href="${escapeHtml(cta.url)}" style="display:inline-block;background:${BRAND.majorelle};color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:8px;font-weight:600">${escapeHtml(cta.label)}</a></p>` : ''}
        </td></tr>
        <tr><td style="padding:18px 28px;background:#f6efe4;font-size:12px;color:#8a7a6c;text-align:${align}">${escapeHtml(m.footer.automatic)}</td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

const textVersion = (title: string, paragraphs: string[], rows: Array<[string, string]> = []) =>
  [title, '', ...paragraphs.map((p) => p.replace(/<[^>]+>/g, '')), '', ...rows.map(([k, v]) => `${k} : ${v}`)].join('\n');

async function send(strapi: Core.Strapi, options: { to: string; replyTo?: string; subject: string; html: string; text: string }) {
  await strapi.plugin('email').service('email').send(options);
}

const adminUrl = (documentId: string, uid: string) =>
  `${(process.env.PUBLIC_URL || 'http://localhost:1337').replace(/\/$/, '')}/admin/content-manager/collection-types/${uid}/${documentId}`;

/** Email de confirmation au client (dans sa langue) + notification à l'agence. */
export async function sendReservationEmails(strapi: Core.Strapi, documentId: string) {
  const reservation: any = await strapi.documents(UID.reservation).findOne({
    documentId,
    populate: { destination: { fields: ['title'] } },
  });
  if (!reservation) return;

  const locale = toLocale(reservation.customerLocale);
  const m = EMAIL_MESSAGES[locale];
  const settings = await getSettings(strapi, locale);

  let destinationTitle = reservation.destination?.title ?? '—';
  if (reservation.destination?.documentId) {
    const localized = await strapi.documents(UID.destination).findOne({
      documentId: reservation.destination.documentId,
      locale,
      fields: ['title'],
    });
    if (localized?.title) destinationTitle = localized.title;
  }

  const buildRows = (msg: EmailMessages, loc: SupportedLocale): Array<[string, string]> => {
    const travellers = [format(msg.reservation.adults, { count: reservation.adults }, false)];
    if (reservation.children > 0) travellers.push(format(msg.reservation.children, { count: reservation.children }, false));
    const rows: Array<[string, string]> = [
      [msg.reservation.reference, reservation.reference],
      [msg.reservation.destination, destinationTitle],
      [
        msg.reservation.dates,
        format(
          msg.reservation.dateRange,
          { start: formatDate(reservation.startDate, loc), end: formatDate(reservation.endDate ?? reservation.startDate, loc) },
          false
        ),
      ],
      [msg.reservation.travellers, travellers.join(' · ')],
      [msg.reservation.transport, reservation.transport ? msg.yes : msg.no],
      [msg.reservation.accommodationLabel, msg.accommodation[reservation.accommodation as keyof EmailMessages['accommodation']] ?? '—'],
      [msg.reservation.privateGuide, reservation.privateGuide ? msg.yes : msg.no],
      [msg.reservation.guideLanguage, msg.languages[toLocale(reservation.guideLanguage)]],
    ];
    if (reservation.message) rows.push([msg.reservation.yourMessage, reservation.message]);
    rows.push([msg.reservation.total, formatPrice(reservation.totalPrice, reservation.currency || 'EUR', loc)]);
    return rows;
  };

  // 1) Client
  const vars = { name: reservation.fullName, reference: reservation.reference, agency: settings.agencyName, whatsapp: settings.whatsappNumber };
  const customerRows = buildRows(m, locale);
  const customerParagraphs = [
    format(m.reservation.greeting, vars),
    escapeHtml(m.reservation.intro),
    escapeHtml(m.reservation.nextSteps),
    settings.whatsappNumber ? format(m.footer.questions, vars) : '',
    format(m.footer.signature, vars),
  ].filter(Boolean);
  await send(strapi, {
    to: reservation.email,
    replyTo: settings.email,
    subject: format(m.reservation.subject, vars, false),
    html: layout({
      m,
      agency: settings.agencyName,
      title: m.reservation.summaryTitle,
      paragraphs: customerParagraphs,
      rows: customerRows,
      note: escapeHtml(m.reservation.estimateNote),
    }),
    text: textVersion(m.reservation.summaryTitle, customerParagraphs, customerRows),
  });

  // 2) Agence
  if (settings.notificationEmail) {
    const aLocale = agencyLocale();
    const a = EMAIL_MESSAGES[aLocale];
    const agencyRows: Array<[string, string]> = [
      [a.agency.customer, reservation.fullName],
      [a.agency.email, reservation.email],
      [a.agency.phone, reservation.phone],
      [a.agency.country, reservation.country || '—'],
      [a.agency.customerLanguage, a.languages[locale]],
      ...buildRows(a, aLocale),
    ];
    const subject = format(a.agency.reservationSubject, { reference: reservation.reference, destination: destinationTitle }, false);
    await send(strapi, {
      to: settings.notificationEmail,
      replyTo: reservation.email,
      subject,
      html: layout({
        m: a,
        agency: settings.agencyName,
        title: subject,
        paragraphs: [escapeHtml(a.agency.reservationIntro)],
        rows: agencyRows,
        cta: { label: a.agency.openInAdmin, url: adminUrl(reservation.documentId, UID.reservation) },
      }),
      text: textVersion(subject, [a.agency.reservationIntro], agencyRows),
    });
  }
}

/** Accusé de réception au client + notification à l'agence (contact ou circuit sur mesure). */
export async function sendContactEmails(strapi: Core.Strapi, documentId: string) {
  const message: any = await strapi.documents(UID.contactMessage).findOne({ documentId });
  if (!message) return;

  const locale = toLocale(message.customerLocale);
  const m = EMAIL_MESSAGES[locale];
  const settings = await getSettings(strapi, locale);
  const isCustomTrip = message.kind === 'custom_trip';
  const vars = { name: message.name, agency: settings.agencyName, whatsapp: settings.whatsappNumber };

  const customerParagraphs = [
    format(m.contact.greeting, vars),
    escapeHtml(isCustomTrip ? m.contact.customTripIntro : m.contact.intro),
    settings.whatsappNumber ? format(m.footer.questions, vars) : '',
    format(m.footer.signature, vars),
  ].filter(Boolean);
  const customerRows: Array<[string, string]> = [[m.contact.yourMessage, message.message]];
  const customerSubject = format(isCustomTrip ? m.contact.customTripSubject : m.contact.subject, vars, false);

  await send(strapi, {
    to: message.email,
    replyTo: settings.email,
    subject: customerSubject,
    html: layout({ m, agency: settings.agencyName, title: customerSubject, paragraphs: customerParagraphs, rows: customerRows }),
    text: textVersion(customerSubject, customerParagraphs, customerRows),
  });

  if (settings.notificationEmail) {
    const a = EMAIL_MESSAGES[agencyLocale()];
    const details = message.tripDetails && typeof message.tripDetails === 'object'
      ? Object.entries(message.tripDetails)
          .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : String(v)}`)
          .join('\n')
      : '';
    const agencyRows: Array<[string, string]> = [
      [a.agency.customer, message.name],
      [a.agency.email, message.email],
      [a.agency.phone, message.phone || '—'],
      [a.agency.customerLanguage, a.languages[locale]],
      [a.agency.subject, message.subject || '—'],
      [a.contact.yourMessage, message.message],
    ];
    if (details) agencyRows.push([a.agency.details, details]);
    const subject = format(isCustomTrip ? a.agency.customTripSubject : a.agency.contactSubject, { name: message.name }, false);

    await send(strapi, {
      to: settings.notificationEmail,
      replyTo: message.email,
      subject,
      html: layout({
        m: a,
        agency: settings.agencyName,
        title: subject,
        paragraphs: [escapeHtml(a.agency.contactIntro)],
        rows: agencyRows,
        cta: { label: a.agency.openInAdmin, url: adminUrl(message.documentId, UID.contactMessage) },
      }),
      text: textVersion(subject, [a.agency.contactIntro], agencyRows),
    });
  }
}
