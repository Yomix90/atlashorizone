'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { TriangleAlert } from 'lucide-react';
import { Button, ButtonLink, Container } from '@/components/ui/primitives';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations('errorPage');
  useEffect(() => console.error(error), [error]);
  return (
    <Container className="flex flex-col items-center py-24 text-center">
      <TriangleAlert className="h-14 w-14 text-terracotta-500" aria-hidden />
      <h1 className="mt-6 font-display text-3xl font-bold">{t('title')}</h1>
      <p className="mt-3 max-w-md text-ink-soft">{t('text')}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button onClick={reset}>{t('retry')}</Button>
        <ButtonLink href="/" variant="outline">{t('home')}</ButtonLink>
      </div>
    </Container>
  );
}
