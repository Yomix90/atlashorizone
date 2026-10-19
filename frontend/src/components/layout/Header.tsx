'use client';

import { Suspense, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, Phone, X } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';
import { ButtonLink } from '@/components/ui/primitives';
import { LanguageSwitcher } from './LanguageSwitcher';
import { LogoMark } from './Logo';

const NAV = [
  { href: '/', key: 'home' },
  { href: '/destinations', key: 'destinations' },
  { href: '/custom-tour', key: 'customTour' },
  { href: '/about', key: 'about' },
  { href: '/contact', key: 'contact' },
] as const;

export function Header({ phone, agencyName }: { phone: string; agencyName: string }) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className={`sticky top-0 z-40 transition-shadow ${scrolled ? 'bg-cream/95 shadow-sm backdrop-blur' : 'bg-cream'}`}>
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label={t('homeAria', { agency: agencyName })}>
          <LogoMark />
          <span className="font-display text-lg font-bold leading-tight text-ink sm:whitespace-nowrap">{agencyName}</span>
        </Link>

        <nav aria-label={t('mainNav')} className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${isActive(item.href) ? 'bg-sand-100 text-terracotta-700' : 'text-ink hover:bg-sand-100'}`}
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <a href={`tel:${phone.replace(/\s/g, '')}`} className="hidden h-10 items-center gap-2 whitespace-nowrap rounded-full px-3 text-sm font-semibold text-ink hover:bg-sand-100 2xl:inline-flex">
            <Phone className="h-4 w-4" aria-hidden />
            <span dir="ltr">{phone}</span>
          </a>
          <Suspense fallback={null}>
            <LanguageSwitcher />
          </Suspense>
          <span className="hidden sm:block">
            <ButtonLink href="/booking" size="sm">
              {t('book')}
            </ButtonLink>
          </span>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-sand-100 xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t('closeMenu') : t('openMenu')}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 top-18 bottom-0 z-40 overflow-y-auto bg-cream px-4 pb-10 pt-4 xl:hidden">
          <nav aria-label={t('mainNav')}>
            <ul className="space-y-1">
              {NAV.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={`block rounded-2xl px-4 py-3 text-lg font-semibold ${isActive(item.href) ? 'bg-sand-100 text-terracotta-700' : 'text-ink'}`}
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-6 grid gap-3">
            <ButtonLink href="/booking" size="lg">
              {t('book')}
            </ButtonLink>
            <a href={`tel:${phone.replace(/\s/g, '')}`} className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-ink/15 bg-white font-semibold">
              <Phone className="h-4 w-4" aria-hidden />
              <span dir="ltr">{phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
