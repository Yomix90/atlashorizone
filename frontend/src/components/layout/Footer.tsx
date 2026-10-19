import { useTranslations } from 'next-intl';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/ui/primitives';
import { FALLBACK_AGENCY } from '@/lib/site';
import type { SiteSettings } from '@/lib/types';
import { LogoMark } from './Logo';
import { CookieSettingsButton } from './CookieSettingsButton';
import { SOCIAL_LABELS, SocialIcon } from './SocialIcon';

export function Footer({ settings }: { locale: string; settings: SiteSettings | null }) {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const agency = settings?.agencyName ?? FALLBACK_AGENCY.name;
  const phone = settings?.phone ?? FALLBACK_AGENCY.phone;
  const email = settings?.email ?? FALLBACK_AGENCY.email;

  return (
    <footer className="mt-24 bg-ink text-sand-100">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <LogoMark />
            <span className="font-display text-lg font-bold text-white">{agency}</span>
          </div>
          {settings?.tagline && <p className="mt-4 text-sm leading-relaxed text-sand-200">{settings.tagline}</p>}
          {!!settings?.socialLinks?.length && (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label={t('followUs')}>
              {settings.socialLinks.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={SOCIAL_LABELS[s.platform]}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-terracotta-500"
                  >
                    <SocialIcon platform={s.platform} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label={t('explore')}>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-sand-300">{t('explore')}</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link className="hover:text-white" href="/destinations">{nav('destinations')}</Link></li>
            <li><Link className="hover:text-white" href="/custom-tour">{nav('customTour')}</Link></li>
            <li><Link className="hover:text-white" href="/booking">{nav('book')}</Link></li>
            <li><Link className="hover:text-white" href="/faq">{nav('faq')}</Link></li>
            <li><Link className="hover:text-white" href="/about">{nav('about')}</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-sand-300">{t('contact')}</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {settings?.address && (
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                <span>{settings.address}{settings.city ? `, ${settings.city}` : ''}</span>
              </li>
            )}
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-white" dir="ltr">{phone}</a>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              <a href={`mailto:${email}`} className="break-all hover:text-white">{email}</a>
            </li>
          </ul>
        </div>

        {!!settings?.openingHours?.length && (
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-sand-300">{t('hours')}</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {settings.openingHours.map((h) => (
                <li key={h.id} className="flex items-start gap-2.5">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  <span>
                    <span className="font-semibold text-white">{h.label}</span>
                    <br />
                    <span dir="ltr">{h.closed ? t('closed') : h.hours}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-4 py-6 text-xs text-sand-200 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {t('copyright', { year: new Date().getFullYear(), agency })}
            {settings?.licenseNumber ? ` · ${settings.licenseNumber}` : ''}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li><Link className="hover:text-white" href="/terms">{nav('terms')}</Link></li>
            <li><Link className="hover:text-white" href="/privacy">{nav('privacy')}</Link></li>
            <li><Link className="hover:text-white" href="/legal-notice">{nav('legal')}</Link></li>
            <li><CookieSettingsButton /></li>
          </ul>
        </Container>
      </div>
    </footer>
  );
}
