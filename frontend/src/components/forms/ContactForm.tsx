'use client';

import { useState, useTransition } from 'react';
import { useForm, type FieldPath } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { CircleCheck, LoaderCircle, Send } from 'lucide-react';
import { submitContact } from '@/lib/actions';
import { contactSchema, type ContactValues } from '@/lib/schemas';
import { Button } from '@/components/ui/primitives';
import { Field, FormAlert, Honeypot } from './fields';
import { Turnstile } from './Turnstile';

export function ContactForm() {
  const t = useTranslations('contact.form');
  const tf = useTranslations('forms');
  const locale = useLocale();
  const [sent, setSent] = useState(false);
  const [alert, setAlert] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const { register, handleSubmit, setValue, setError, reset, formState: { errors } } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    mode: 'onTouched',
    defaultValues: { name: '', email: '', phone: '', subject: '', message: '', company: '', turnstileToken: '' },
  });

  const onSubmit = (data: ContactValues) => {
    setAlert(null);
    startTransition(async () => {
      const res = await submitContact(data, locale);
      if (res.ok) {
        setSent(true);
        reset();
        return;
      }
      setAlert(res.error);
      for (const [field, code] of Object.entries(res.fieldErrors ?? {})) setError(field as FieldPath<ContactValues>, { message: code });
    });
  };

  if (sent) {
    return (
      <div role="status" className="rounded-[var(--radius-card)] bg-white p-8 text-center shadow-card">
        <CircleCheck className="mx-auto h-12 w-12 text-emerald-700" aria-hidden />
        <h2 className="mt-4 font-display text-2xl font-bold">{t('successTitle')}</h2>
        <p className="mt-2 text-ink-soft">{t('successText')}</p>
        <Button variant="outline" className="mt-6" onClick={() => setSent(false)}>{t('another')}</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative grid gap-5 rounded-[var(--radius-card)] bg-white p-6 shadow-card sm:grid-cols-2 sm:p-8">
      <Honeypot {...register('company')} />
      <Field id="contact-name" label={t('name')} error={errors.name?.message} required>
        {(aria) => <input type="text" autoComplete="name" {...aria} {...register('name')} />}
      </Field>
      <Field id="contact-email" label={t('email')} error={errors.email?.message} required>
        {(aria) => <input type="email" autoComplete="email" dir="ltr" {...aria} {...register('email')} />}
      </Field>
      <Field id="contact-phone" label={t('phone')} error={errors.phone?.message}>
        {(aria) => <input type="tel" autoComplete="tel" dir="ltr" {...aria} {...register('phone')} />}
      </Field>
      <Field id="contact-subject" label={t('subject')} error={errors.subject?.message}>
        {(aria) => <input type="text" {...aria} {...register('subject')} />}
      </Field>
      <div className="sm:col-span-2">
        <Field id="contact-message" label={t('message')} error={errors.message?.message} required inputClassName="min-h-36 py-3">
          {(aria) => <textarea rows={6} maxLength={5000} {...aria} {...register('message')} />}
        </Field>
      </div>
      <div className="sm:col-span-2">
        <Turnstile onToken={(token) => setValue('turnstileToken', token)} />
      </div>
      <div className="sm:col-span-2"><FormAlert code={alert} /></div>
      <p className="text-xs text-ink-soft sm:col-span-2">{t('privacy')}</p>
      <div className="sm:col-span-2">
        <Button type="submit" disabled={pending} size="lg">
          {pending ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden /> : <Send className="h-4 w-4 rtl:-scale-x-100" aria-hidden />}
          {pending ? tf('sending') : t('submit')}
        </Button>
      </div>
    </form>
  );
}
