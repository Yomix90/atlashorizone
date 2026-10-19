'use client';

import type { ComponentProps, ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { CircleAlert } from 'lucide-react';

const baseInput =
  'w-full rounded-xl border bg-white px-4 text-sm text-ink placeholder:text-ink-soft/60 focus:border-majorelle-500 disabled:bg-sand-50';

/** Message d'erreur traduit à partir du code renvoyé par zod ou le serveur. */
export function FieldError({ id, code }: { id: string; code?: string }) {
  const t = useTranslations('errors');
  if (!code) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-center gap-1.5 text-sm text-terracotta-700">
      <CircleAlert className="h-4 w-4 shrink-0" aria-hidden />
      {t.has(code as never) ? t(code as never) : t('invalid')}
    </p>
  );
}

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: (aria: { id: string; 'aria-invalid'?: boolean; 'aria-describedby'?: string; className: string }) => ReactNode;
  inputClassName?: string;
}

/** Champ accessible : label associé, aria-invalid, aria-describedby vers l'aide et l'erreur. */
export function Field({ id, label, error, hint, required, children, inputClassName = 'h-12' }: FieldProps) {
  const t = useTranslations('forms');
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
        {required ? <span className="text-terracotta-600" aria-hidden> *</span> : <span className="ms-1 text-xs font-normal text-ink-soft">({t('optional')})</span>}
      </label>
      {children({
        id,
        'aria-invalid': error ? true : undefined,
        'aria-describedby': describedBy,
        className: `${baseInput} ${inputClassName} ${error ? 'border-terracotta-500' : 'border-ink/15'}`,
      })}
      {hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-ink-soft">
          {hint}
        </p>
      )}
      <FieldError id={`${id}-error`} code={error} />
    </div>
  );
}

/** Pot de miel invisible pour les robots (laissé vide par les humains). */
export function Honeypot(props: ComponentProps<'input'>) {
  const t = useTranslations('forms');
  return (
    <div aria-hidden="true" className="absolute -start-[9999px] h-px w-px overflow-hidden">
      <label>
        {t('honeypot')}
        <input type="text" tabIndex={-1} autoComplete="off" {...props} />
      </label>
    </div>
  );
}

/** Bandeau d'erreur global de formulaire. */
export function FormAlert({ code }: { code?: string | null }) {
  const t = useTranslations('forms.alerts');
  if (!code) return null;
  return (
    <div role="alert" className="flex items-start gap-2 rounded-2xl border border-terracotta-200 bg-terracotta-50 p-4 text-sm text-terracotta-800">
      <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      {t.has(code as never) ? t(code as never) : t('server')}
    </div>
  );
}
