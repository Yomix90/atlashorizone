import { useTranslations } from 'next-intl';
import { Mail } from 'lucide-react';
import { ButtonLink, Container } from '@/components/ui/primitives';
import { WhatsAppIcon } from '@/components/layout/WhatsAppIcon';
import { whatsappLink } from '@/lib/site';

export function CtaBand({ whatsapp }: { whatsapp: string }) {
  const t = useTranslations('home.cta');
  return (
    <section className="py-12" aria-labelledby="cta-title">
      <Container>
        <div className="bg-zellige relative overflow-hidden rounded-[2rem] px-6 py-14 text-center text-white sm:px-12">
          <h2 id="cta-title" className="mx-auto max-w-2xl font-display text-3xl font-bold sm:text-4xl">{t('title')}</h2>
          <p className="mx-auto mt-4 max-w-xl text-majorelle-100">{t('subtitle')}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={whatsappLink(whatsapp, t('whatsappMessage'))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-emerald-700 px-7 font-semibold text-white hover:bg-emerald-800"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {t('whatsapp')}
            </a>
            <ButtonLink href="/contact" variant="light" size="lg">
              <Mail className="h-5 w-5" aria-hidden />
              {t('contact')}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
