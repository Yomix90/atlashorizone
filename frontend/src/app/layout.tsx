import type { ReactNode } from 'react';
import './globals.css';

/** Le document <html> est rendu par app/[locale]/layout.tsx (langue et sens d'écriture). */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
