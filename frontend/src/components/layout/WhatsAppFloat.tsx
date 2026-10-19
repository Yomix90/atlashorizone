import { useTranslations } from 'next-intl';
import { whatsappLink } from '@/lib/site';
import { WhatsAppIcon } from './WhatsAppIcon';

/** Bouton WhatsApp flottant, présent sur toutes les pages (côté « fin » : droite en LTR, gauche en RTL). */
export function WhatsAppFloat({ number }: { number: string }) {
  const t = useTranslations('whatsapp');
  return (
    <a
      href={whatsappLink(number, t('defaultMessage'))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('aria')}
      className="fixed bottom-5 end-5 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-700 text-white shadow-lg transition-transform hover:scale-105 hover:bg-emerald-800 sm:bottom-6 sm:end-6"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
