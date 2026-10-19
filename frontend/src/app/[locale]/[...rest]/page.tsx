import { notFound } from 'next/navigation';

/** Toute URL inconnue sous /{locale}/… affiche la page 404 traduite. */
export default function CatchAll() {
  notFound();
}
