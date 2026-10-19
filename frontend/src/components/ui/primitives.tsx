import type { ComponentProps, ReactNode } from 'react';
import { Star } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

const VARIANTS = {
  primary: 'bg-terracotta-600 text-white hover:bg-terracotta-700 shadow-sm',
  secondary: 'bg-majorelle-600 text-white hover:bg-majorelle-700 shadow-sm',
  outline: 'border border-ink/15 bg-white text-ink hover:border-terracotta-400 hover:text-terracotta-700',
  light: 'bg-white/95 text-ink hover:bg-white shadow-sm',
  whatsapp: 'bg-emerald-700 text-white hover:bg-emerald-800 shadow-sm',
  ghost: 'text-ink hover:bg-sand-100',
} as const;

const SIZES = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-13 px-7 text-base',
} as const;

export type ButtonVariant = keyof typeof VARIANTS;

export const buttonClass = (variant: ButtonVariant = 'primary', size: keyof typeof SIZES = 'md', extra = '') =>
  `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${VARIANTS[variant]} ${SIZES[size]} ${extra}`;

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ComponentProps<'button'> & { variant?: ButtonVariant; size?: keyof typeof SIZES }) {
  return <button className={buttonClass(variant, size, className)} {...props} />;
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant; size?: keyof typeof SIZES }) {
  return <Link className={buttonClass(variant, size, className)} {...props} />;
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'center', id }: { eyebrow?: string; title: string; subtitle?: string; align?: 'center' | 'start'; id?: string }) {
  return (
    <div className={`mb-10 max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-terracotta-600">{eyebrow}</p>}
      <h2 id={id} className="font-display text-3xl font-bold text-ink sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-lg text-ink-soft">{subtitle}</p>}
    </div>
  );
}

export function RatingStars({ value, label, size = 16 }: { value: number; label: string; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={label}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          aria-hidden
          width={size}
          height={size}
          className={i <= Math.round(value) ? 'fill-sand-400 text-sand-400' : 'fill-sand-200 text-sand-200'}
        />
      ))}
    </span>
  );
}

export function Badge({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink shadow-sm ${className}`}>{children}</span>;
}
