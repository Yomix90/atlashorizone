'use client';

import { useState, useTransition } from 'react';
import { useForm, type FieldPath } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { CircleCheck, LoaderCircle, Sparkles } from 'lucide-react';
import { submitCustomTrip } from '@/lib/actions';
import { BUDGETS, INTERESTS, customTripSchema, todayIso, type CustomTripValues } from '@/lib/schemas';
import { Button } from '@/components/ui/primitives';
import { Field, FieldError, FormAlert, Honeypot } from './fields';
import { Turnstile } from './Turnstile';

export function CustomTripForm({ currency }: { currency: string }) {
  const t = useTranslations('customTour.form');
  const tf = useTranslations('forms');
  const locale = useLocale();
  const [sent, setSent] = useState(false);
  const [alert, setAlert] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const { register, handleSubmit, setValue, setError, formState: { errors } } = useForm<CustomTripValues>({
    resolver: zodResolver(customTripSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '', email: '', phone: '', startDate: '', durationDays: 7, adults: 2, children: 0,
      budget: '1000-2000', accommodation: 'superior', interests: [], message: '', company: '', turnstileToken: '',
    },
  });

  const onSubmit = (data: CustomTripValues) => {
    setAlert(null);
    startTransition(async () => {
      const res = await submitCustomTrip(data, locale);
      if (res.ok) {
        setSent(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      setAlert(res.error);
      for (const [field, code] of Object.entries(res.fieldErrors ?? {})) setError(field as FieldPath<CustomTripValues>, { message: code });
    });
  };

  if (sent) {
    return (
      <div role="status" className="rounded-[var(--radius-card)] bg-white p-8 text-center shadow-card">
        <CircleCheck className="mx-auto h-12 w-12 text-emerald-700" aria-hidden />
        <h2 className="mt-4 font-display text-2xl font-bold">{t('successTitle')}</h2>
        <p className="mt-2 text-ink-soft">{t('successText')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative grid gap-6 rounded-[var(--radius-card)] bg-white p-6 shadow-card sm:p-8">
      <Honeypot {...register('company')} />

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-4 font-display text-xl font-bold">{t('tripSection')}</legend>
        <Field id="ct-startDate" label={t('startDate')} error={errors.startDate?.message} hint={t('startDateHint')}>
          {(aria) => <input type="date" min={todayIso()} {...aria} {...register('startDate')} />}
        </Field>
        <Field id="ct-duration" label={t('duration')} error={errors.durationDays?.message} required>
          {(aria) => <input type="number" min={1} max={30} inputMode="numeric" {...aria} {...register('durationDays', { valueAsNumber: true })} />}
        </Field>
        <Field id="ct-adults" label={t('adults')} error={errors.adults?.message} required>
          {(aria) => <input type="number" min={1} max={30} inputMode="numeric" {...aria} {...register('adults', { valueAsNumber: true })} />}
        </Field>
        <Field id="ct-children" label={t('children')} error={errors.children?.message} required>
          {(aria) => <input type="number" min={0} max={30} inputMode="numeric" {...aria} {...register('children', { valueAsNumber: true })} />}
        </Field>
        <Field id="ct-budget" label={t('budget', { currency })} error={errors.budget?.message} required>
          {(aria) => (
            <select {...aria} {...register('budget')}>
              {BUDGETS.map((b) => <option key={b} value={b}>{t(`budgets.${b}`)}</option>)}
            </select>
          )}
        </Field>
        <Field id="ct-accommodation" label={t('accommodation')} error={errors.accommodation?.message} required>
          {(aria) => (
            <select {...aria} {...register('accommodation')}>
              {(['standard', 'superior', 'luxury'] as const).map((a) => <option key={a} value={a}>{t(`accommodations.${a}`)}</option>)}
            </select>
          )}
        </Field>
      </fieldset>

      <fieldset aria-describedby={errors.interests ? 'ct-interests-error' : undefined}>
        <legend className="mb-3 text-sm font-semibold">{t('interests')} <span className="text-terracotta-600" aria-hidden>*</span></legend>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((i) => (
            <label key={i} className="cursor-pointer rounded-full border border-ink/15 px-4 py-2 text-sm font-medium has-[:checked]:border-terracotta-500 has-[:checked]:bg-terracotta-50 has-[:checked]:text-terracotta-800 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-majorelle-500">
              <input type="checkbox" value={i} className="sr-only" {...register('interests')} />
              {t(`interestOptions.${i}`)}
            </label>
          ))}
        </div>
        <FieldError id="ct-interests-error" code={errors.interests?.message} />
      </fieldset>

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-4 font-display text-xl font-bold">{t('contactSection')}</legend>
        <div className="sm:col-span-2">
          <Field id="ct-name" label={t('name')} error={errors.name?.message} required>
            {(aria) => <input type="text" autoComplete="name" {...aria} {...register('name')} />}
          </Field>
        </div>
        <Field id="ct-email" label={t('email')} error={errors.email?.message} required>
          {(aria) => <input type="email" autoComplete="email" dir="ltr" {...aria} {...register('email')} />}
        </Field>
        <Field id="ct-phone" label={t('phone')} error={errors.phone?.message}>
          {(aria) => <input type="tel" autoComplete="tel" dir="ltr" {...aria} {...register('phone')} />}
        </Field>
        <div className="sm:col-span-2">
          <Field id="ct-message" label={t('message')} error={errors.message?.message} required inputClassName="min-h-36 py-3">
            {(aria) => <textarea rows={6} maxLength={5000} placeholder={t('messagePlaceholder')} {...aria} {...register('message')} />}
          </Field>
        </div>
      </fieldset>

      <Turnstile onToken={(token) => setValue('turnstileToken', token)} />
      <FormAlert code={alert} />
      <div>
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden /> : <Sparkles className="h-4 w-4" aria-hidden />}
          {pending ? tf('sending') : t('submit')}
        </Button>
      </div>
    </form>
  );
}
