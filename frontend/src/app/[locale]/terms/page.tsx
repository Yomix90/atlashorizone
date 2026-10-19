import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { StaticPageView, staticPageMetadata } from '@/components/StaticPageView';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return staticPageMetadata(locale, 'terms', '/terms');
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <StaticPageView locale={locale} slug="terms" />;
}
