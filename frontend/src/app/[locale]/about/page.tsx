import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { StaticPageView, staticPageMetadata } from '@/components/StaticPageView';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return staticPageMetadata(locale, 'about', '/about');
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <StaticPageView locale={locale} slug="about" />;
}
