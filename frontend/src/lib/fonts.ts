import { Cairo, DM_Sans, Playfair_Display } from 'next/font/google';

/** Polices auto-hébergées par next/font (aucune requête vers Google côté visiteur). */
export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

export const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
});

export const fontVariables = `${playfair.variable} ${dmSans.variable} ${cairo.variable}`;
