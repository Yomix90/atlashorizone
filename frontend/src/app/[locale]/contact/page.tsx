import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Container } from '@/components/ui/primitives';
import { ContactForm } from '@/components/forms/ContactForm';
import { MapView } from '@/components/map/MapView';
import { WhatsAppIcon } from '@/components/layout/WhatsAppIcon';
import { SOCIAL_LABELS, SocialIcon } from '@/components/layout/SocialIcon';
import { getSiteSettings } from '@/lib/strapi';
import { buildMetadata } from '@/lib/seo';
import { FALLBACK_AGENCY, whatsappLink } from '@/lib/site';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  const settings = await getSiteSettings(locale).catch(() => null);
  return buildMetadata({ locale, path: '/contact', title: t('metaTitle'), description: t('metaDescription'), siteName: settings?.agencyName ?? FALLBACK_AGENCY.name });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');
  const footer = await getTranslations('footer');
  const settings = await getSiteSettings(locale).catch(() => null);

  const phone = settings?.phone ?? FALLBACK_AGENCY.phone;
  const email = settings?.email ?? FALLBACK_AGENCY.email;
  const whatsapp = settings?.whatsappNumber ?? FALLBACK_AGENCY.whatsapp;

  return (
    <>
      <section className="bg-sand-100/60 pb-10 pt-14">
        <Container>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-terracotta-600">{t('eyebrow')}</p>
          <h1 className="font-display text-4xl font-bold sm:text-5xl">{t('title')}</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-soft">{t('subtitle')}</p>
        </Container>
      </section>

      <Container className="grid gap-10 py-12 lg:grid-cols-[1fr_380px]">
        <div>
          <h2 className="sr-only">{t('formTitle')}</h2>
          <ContactForm />
        </div>

        <aside className="space-y-4" aria-label={t('infoAria')}>
          <div className="grid gap-3">
            <a href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-card hover:ring-2 hover:ring-terracotta-200">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-terracotta-50 text-terracotta-600"><Phone className="h-5 w-5" aria-hidden /></span>
              <span><span className="block text-xs text-ink-soft">{t('call')}</span><span className="font-semibold" dir="ltr">{phone}</span></span>
            </a>
            <a href={whatsappLink(whatsapp, t('whatsappMessage'))} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-card hover:ring-2 hover:ring-emerald-200">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700"><WhatsAppIcon className="h-5 w-5" /></span>
              <span><span className="block text-xs text-ink-soft">{t('whatsapp')}</span><span className="font-semibold" dir="ltr">+{whatsapp}</span></span>
            </a>
            <a href={`mailto:${email}`} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-card hover:ring-2 hover:ring-majorelle-200">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-majorelle-50 text-majorelle-600"><Mail className="h-5 w-5" aria-hidden /></span>
              <span className="min-w-0"><span className="block text-xs text-ink-soft">{t('email')}</span><span className="block truncate font-semibold">{email}</span></span>
            </a>
          </div>

          {settings?.address && (
            <div className="rounded-2xl bg-white p-5 shadow-card">
              <h2 className="flex items-center gap-2 font-semibold"><MapPin className="h-4 w-4 text-terracotta-600" aria-hidden />{t('address')}</h2>
              <p className="mt-2 text-sm text-ink-soft">{settings.address}{settings.city ? `, ${settings.city}` : ''}</p>
            </div>
          )}

          {!!settings?.openingHours?.length && (
            <div className="rounded-2xl bg-white p-5 shadow-card">
              <h2 className="flex items-center gap-2 font-semibold"><Clock className="h-4 w-4 text-terracotta-600" aria-hidden />{footer('hours')}</h2>
              <dl className="mt-3 space-y-1.5 text-sm">
                {settings.openingHours.map((h) => (
                  <div key={h.id} className="flex justify-between gap-3">
                    <dt className="text-ink-soft">{h.label}</dt>
                    <dd className="font-semibold" dir="ltr">{h.closed ? footer('closed') : h.hours}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {!!settings?.socialLinks?.length && (
            <div className="rounded-2xl bg-white p-5 shadow-card">
              <h2 className="font-semibold">{footer('followUs')}</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {settings.socialLinks.map((s) => (
                  <li key={s.id}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-ink/10 px-3 py-2 text-sm font-medium hover:border-terracotta-400">
                      <SocialIcon platform={s.platform} className="h-4 w-4" />
                      {SOCIAL_LABELS[s.platform]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </Container>

      {settings?.latitude && settings?.longitude && (
        <Container>
          <MapView lat={settings.latitude} lng={settings.longitude} zoom={15} label={settings.agencyName} className="h-96" />
        </Container>
      )}
    </>
  );
}
