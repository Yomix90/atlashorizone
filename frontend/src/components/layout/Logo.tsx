/** Logo provisoire : arche marocaine stylisée + nom de l'agence (remplaçable par le logo Strapi). */
export function LogoMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="#c2552d" />
      <path d="M11 32V19a9 9 0 0 1 18 0v13" fill="none" stroke="#fbf7f0" strokeWidth="3" strokeLinecap="round" />
      <path d="M16 32v-9a4 4 0 0 1 8 0v9" fill="#2741a8" />
      <circle cx="20" cy="9" r="2" fill="#e8c98a" />
    </svg>
  );
}
