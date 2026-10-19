import { useTranslations } from 'next-intl';
import { Compass } from 'lucide-react';
import { ButtonLink, Container } from '@/components/ui/primitives';

export default function NotFound() {
  const t = useTranslations('notFound');
  return (
    <Container className="flex flex-col items-center py-24 text-center">
      <Compass className="h-14 w-14 text-terracotta-500" aria-hidden />
      <p className="mt-6 font-display text-7xl font-bold text-sand-400">404</p>
      <h1 className="mt-2 font-display text-3xl font-bold">{t('title')}</h1>
      <p className="mt-3 max-w-md text-ink-soft">{t('text')}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/">{t('home')}</ButtonLink>
        <ButtonLink href="/destinations" variant="outline">{t('destinations')}</ButtonLink>
      </div>
    </Container>
  );
}
