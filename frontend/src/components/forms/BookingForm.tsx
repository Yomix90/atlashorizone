'use client';

import { useEffect, useMemo, useRef, useState, useTransition } from 'react';
import { useForm, useWatch, type FieldPath } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowLeft, ArrowRight, CalendarDays, Check, CircleCheck, LoaderCircle, Minus, Plus } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { submitBooking } from '@/lib/actions';
import { formatDate, formatPrice, type Option } from '@/lib/format';
import { ACCOMMODATIONS, computeQuote } from '@/lib/pricing';
import { bookingSchema, todayIso, type BookingValues } from '@/lib/schemas';
import { whatsappLink } from '@/lib/site';
import type { BookingDestinationOption, PricingSettings } from '@/lib/types';
import type { ReservationResult } from '@/lib/strapi';
import { Button, ButtonLink } from '@/components/ui/primitives';
import { WhatsAppIcon } from '@/components/layout/WhatsAppIcon';
import { Field, FieldError, FormAlert, Honeypot } from './fields';
import { Turnstile } from './Turnstile';

const STEPS: Array<{ key: 'trip' | 'options' | 'contact' | 'confirm'; fields: FieldPath<BookingValues>[] }> = [
  { key: 'trip', fields: ['destination', 'startDate', 'adults', 'children'] },
  { key: 'options', fields: ['transport', 'accommodation', 'privateGuide', 'guideLanguage'] },
  { key: 'contact', fields: ['fullName', 'email', 'phone', 'country', 'message'] },
  { key: 'confirm', fields: ['termsAccepted'] },
];

interface BookingFormProps {
  destinations: BookingDestinationOption[];
  pricing: PricingSettings;
  currency: string;
  whatsapp: string;
  /** documentId de la destination imposée (formulaire intégré à une fiche). */
  fixedDestinationId?: string;
  initial?: { destination?: string; startDate?: string; adults?: number; children?: number };
  compact?: boolean;
  /** Pays et langues traduits côté serveur (évite les écarts d'hydratation liés à Intl). */
  countries: Option[];
  guideLanguages: Option[];
}

export function BookingForm({ destinations, pricing, currency, whatsapp, fixedDestinationId, initial, compact = false, countries, guideLanguages }: BookingFormProps) {
  const t = useTranslations('booking');
  const tf = useTranslations('forms');
  const locale = useLocale();
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<ReservationResult | null>(null);
  const [alert, setAlert] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  const {
    register,
    control,
    handleSubmit,
    trigger,
    setValue,
    setError,
    getValues,
    formState: { errors },
  } = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    mode: 'onTouched',
    defaultValues: {
      destination: fixedDestinationId ?? initial?.destination ?? '',
      startDate: initial?.startDate ?? '',
      adults: initial?.adults ?? 2,
      children: initial?.children ?? 0,
      transport: true,
      accommodation: 'standard',
      privateGuide: false,
      guideLanguage: locale as BookingValues['guideLanguage'],
      fullName: '',
      email: '',
      phone: '',
      country: '',
      message: '',
      termsAccepted: false as unknown as true,
      company: '',
      turnstileToken: '',
    },
  });

  const values = useWatch({ control });
  const selected = useMemo(() => destinations.find((d) => d.documentId === values.destination), [destinations, values.destination]);
  const quote = selected
    ? computeQuote(
        {
          priceAdult: selected.priceAdult,
          priceChild: selected.priceChild,
          durationDays: selected.durationDays,
          adults: Number(values.adults) || 0,
          children: Number(values.children) || 0,
          transport: !!values.transport,
          accommodation: values.accommodation ?? 'none',
          privateGuide: !!values.privateGuide,
        },
        pricing
      )
    : null;

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step, result]);

  const next = async () => {
    const valid = await trigger(STEPS[step].fields);
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const onSubmit = (data: BookingValues) => {
    setAlert(null);
    startTransition(async () => {
      const res = await submitBooking(data, locale);
      if (res.ok) {
        setResult(res.data);
        return;
      }
      setAlert(res.error);
      if (res.fieldErrors) {
        let firstStep = STEPS.length - 1;
        for (const [field, code] of Object.entries(res.fieldErrors)) {
          setError(field as FieldPath<BookingValues>, { message: code });
          const idx = STEPS.findIndex((s) => s.fields.includes(field as FieldPath<BookingValues>));
          if (idx >= 0) firstStep = Math.min(firstStep, idx);
        }
        setStep(firstStep);
      }
    });
  };

  const fmt = (n: number) => formatPrice(n, currency, locale);
  const counter = (name: 'adults' | 'children', min: number) => {
    const value = Number(values[name]) || 0;
    return (
      <div className="flex h-12 items-center justify-between rounded-xl border border-ink/15 bg-white px-2">
        <button type="button" className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-sand-100 disabled:opacity-40" onClick={() => setValue(name, Math.max(min, value - 1), { shouldValidate: true })} disabled={value <= min} aria-label={t(`fields.${name}Decrease`)}>
          <Minus className="h-4 w-4" aria-hidden />
        </button>
        <input
          id={`booking-${name}`}
          type="number"
          inputMode="numeric"
          min={min}
          max={30}
          className="w-12 bg-transparent text-center font-semibold [appearance:textfield]"
          aria-invalid={errors[name] ? true : undefined}
          aria-describedby={errors[name] ? `booking-${name}-error` : undefined}
          {...register(name, { valueAsNumber: true })}
        />
        <button type="button" className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-sand-100 disabled:opacity-40" onClick={() => setValue(name, Math.min(30, value + 1), { shouldValidate: true })} disabled={value >= 30} aria-label={t(`fields.${name}Increase`)}>
          <Plus className="h-4 w-4" aria-hidden />
        </button>
      </div>
    );
  };

  // ─── Confirmation ─────────────────────────────────────
  if (result) {
    return (
      <div className="rounded-[var(--radius-card)] bg-white p-6 text-center shadow-card sm:p-10" aria-live="polite">
        <CircleCheck className="mx-auto h-14 w-14 text-emerald-700" aria-hidden />
        <h2 ref={headingRef} tabIndex={-1} className="mt-4 font-display text-2xl font-bold sm:text-3xl">{t('success.title')}</h2>
        <p className="mx-auto mt-3 max-w-lg text-ink-soft">{t('success.text', { email: getValues('email') })}</p>
        <dl className="mx-auto mt-6 grid max-w-md gap-3 rounded-2xl bg-sand-50 p-5 text-start text-sm">
          <div className="flex justify-between gap-4"><dt className="text-ink-soft">{t('summary.reference')}</dt><dd className="font-mono font-bold" dir="ltr">{result.reference}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-ink-soft">{t('summary.destination')}</dt><dd className="font-semibold">{selected?.title}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-ink-soft">{t('summary.dates')}</dt><dd className="font-semibold">{t('summary.dateRange', { start: formatDate(result.startDate, locale, 'medium'), end: formatDate(result.endDate, locale, 'medium') })}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-ink-soft">{t('summary.total')}</dt><dd className="font-bold text-terracotta-700">{fmt(result.totalPrice)}</dd></div>
        </dl>
        <p className="mt-4 text-xs text-ink-soft">{t('success.note')}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={whatsappLink(whatsapp, t('success.whatsappMessage', { reference: result.reference }))} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-emerald-700 px-5 text-sm font-semibold text-white hover:bg-emerald-800">
            <WhatsAppIcon className="h-5 w-5" />
            {t('success.whatsapp')}
          </a>
          <ButtonLink href="/destinations" variant="outline">{t('success.continue')}</ButtonLink>
        </div>
      </div>
    );
  }

  const current = STEPS[step];

  return (
    <div className={`grid gap-6 ${compact ? '' : 'lg:grid-cols-[1fr_340px]'}`}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative rounded-[var(--radius-card)] bg-white p-5 shadow-card sm:p-8" aria-labelledby="booking-step-title">
        {/* Étapes */}
        <ol className="mb-8 grid grid-cols-4 gap-2" aria-label={t('stepsAria')}>
          {STEPS.map((s, i) => (
            <li key={s.key} aria-current={i === step ? 'step' : undefined} className="flex flex-col gap-2">
              <span className={`h-1.5 rounded-full ${i <= step ? 'bg-terracotta-500' : 'bg-sand-200'}`} />
              <span className={`hidden text-xs font-semibold sm:block ${i === step ? 'text-terracotta-700' : 'text-ink-soft'}`}>
                {i < step && <Check className="me-1 inline h-3 w-3" aria-hidden />}
                {t(`steps.${s.key}`)}
              </span>
            </li>
          ))}
        </ol>

        <p className="text-xs font-semibold uppercase tracking-widest text-ink-soft">{t('stepCounter', { step: step + 1, total: STEPS.length })}</p>
        <h2 id="booking-step-title" ref={headingRef} tabIndex={-1} className="mt-1 mb-6 font-display text-2xl font-bold outline-none">
          {t(`steps.${current.key}`)}
        </h2>

        <Honeypot {...register('company')} />

        {/* Étape 1 : voyage */}
        <div hidden={current.key !== 'trip'} className="grid gap-5 sm:grid-cols-2">
          {fixedDestinationId ? (
            <div className="sm:col-span-2">
              <p className="text-sm font-semibold text-ink">{t('fields.destination')}</p>
              <p className="mt-1 rounded-xl bg-sand-50 px-4 py-3 font-semibold">{selected?.title}</p>
            </div>
          ) : (
            <div className="sm:col-span-2">
              <Field id="booking-destination" label={t('fields.destination')} error={errors.destination?.message} required>
                {(aria) => (
                  <select {...aria} {...register('destination')}>
                    <option value="">{t('fields.destinationPlaceholder')}</option>
                    {destinations.map((d) => (
                      <option key={d.documentId} value={d.documentId}>
                        {d.title} — {t('fields.daysShort', { count: d.durationDays })}
                      </option>
                    ))}
                  </select>
                )}
              </Field>
            </div>
          )}
          <Field id="booking-startDate" label={t('fields.startDate')} error={errors.startDate?.message} required hint={selected ? t('fields.durationHint', { count: selected.durationDays }) : undefined}>
            {(aria) => <input type="date" min={todayIso()} {...aria} {...register('startDate')} />}
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="booking-adults" className="mb-1.5 block text-sm font-semibold">{t('fields.adults')}</label>
              {counter('adults', 1)}
              <FieldError id="booking-adults-error" code={errors.adults?.message} />
            </div>
            <div>
              <label htmlFor="booking-children" className="mb-1.5 block text-sm font-semibold">{t('fields.children')}</label>
              {counter('children', 0)}
              <FieldError id="booking-children-error" code={errors.children?.message} />
            </div>
          </div>
        </div>

        {/* Étape 2 : options */}
        <div hidden={current.key !== 'options'} className="grid gap-5">
          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-ink/10 p-4 has-[:checked]:border-terracotta-400 has-[:checked]:bg-terracotta-50/50">
            <input type="checkbox" className="mt-1 h-5 w-5 accent-terracotta-600" {...register('transport')} />
            <span>
              <span className="block font-semibold">{t('fields.transport')}</span>
              <span className="text-sm text-ink-soft">{t('fields.transportHint', { price: fmt(pricing.transportPerPerson) })}</span>
            </span>
          </label>

          <fieldset>
            <legend className="mb-2 text-sm font-semibold">{t('fields.accommodation')}</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {ACCOMMODATIONS.map((level) => {
                const nightly = { none: 0, standard: pricing.accommodationStandardPerNight, superior: pricing.accommodationSuperiorPerNight, luxury: pricing.accommodationLuxuryPerNight }[level];
                return (
                  <label key={level} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-ink/10 p-4 has-[:checked]:border-terracotta-400 has-[:checked]:bg-terracotta-50/50">
                    <input type="radio" value={level} className="h-5 w-5 accent-terracotta-600" {...register('accommodation')} />
                    <span>
                      <span className="block font-semibold">{t(`accommodation.${level}`)}</span>
                      <span className="text-xs text-ink-soft">{level === 'none' ? t('accommodation.noneHint') : t('accommodation.perNight', { price: fmt(nightly) })}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-ink/10 p-4 has-[:checked]:border-terracotta-400 has-[:checked]:bg-terracotta-50/50">
            <input type="checkbox" className="mt-1 h-5 w-5 accent-terracotta-600" {...register('privateGuide')} />
            <span>
              <span className="block font-semibold">{t('fields.privateGuide')}</span>
              <span className="text-sm text-ink-soft">{t('fields.privateGuideHint', { price: fmt(pricing.privateGuidePerDay) })}</span>
            </span>
          </label>

          <Field id="booking-guideLanguage" label={t('fields.guideLanguage')} error={errors.guideLanguage?.message} required>
            {(aria) => (
              <select {...aria} {...register('guideLanguage')}>
                {guideLanguages.map((l) => (
                  <option key={l.value} value={l.value}>{l.label}</option>
                ))}
              </select>
            )}
          </Field>
        </div>

        {/* Étape 3 : coordonnées */}
        <div hidden={current.key !== 'contact'} className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field id="booking-fullName" label={t('fields.fullName')} error={errors.fullName?.message} required>
              {(aria) => <input type="text" autoComplete="name" {...aria} {...register('fullName')} />}
            </Field>
          </div>
          <Field id="booking-email" label={t('fields.email')} error={errors.email?.message} required>
            {(aria) => <input type="email" autoComplete="email" inputMode="email" dir="ltr" {...aria} {...register('email')} />}
          </Field>
          <Field id="booking-phone" label={t('fields.phone')} error={errors.phone?.message} required hint={t('fields.phoneHint')}>
            {(aria) => <input type="tel" autoComplete="tel" inputMode="tel" dir="ltr" {...aria} {...register('phone')} />}
          </Field>
          <div className="sm:col-span-2">
            <Field id="booking-country" label={t('fields.country')} error={errors.country?.message}>
              {(aria) => (
                <select {...aria} autoComplete="country" {...register('country')}>
                  <option value="">{t('fields.countryPlaceholder')}</option>
                  {countries.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              )}
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field id="booking-message" label={t('fields.message')} error={errors.message?.message} inputClassName="min-h-28 py-3">
              {(aria) => <textarea rows={4} maxLength={3000} placeholder={t('fields.messagePlaceholder')} {...aria} {...register('message')} />}
            </Field>
          </div>
        </div>

        {/* Étape 4 : récapitulatif */}
        {current.key === 'confirm' && (
          <div className="grid gap-5">
            <dl className="grid gap-2 rounded-2xl bg-sand-50 p-5 text-sm">
              <div className="flex justify-between gap-4"><dt className="text-ink-soft">{t('summary.destination')}</dt><dd className="text-end font-semibold">{selected?.title}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-ink-soft">{t('summary.startDate')}</dt><dd className="font-semibold">{values.startDate ? formatDate(values.startDate, locale) : '—'}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-ink-soft">{t('summary.travellers')}</dt><dd className="font-semibold">{t('summary.travellersValue', { adults: Number(values.adults) || 0, children: Number(values.children) || 0 })}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-ink-soft">{t('summary.contact')}</dt><dd className="text-end font-semibold">{values.fullName}<br /><span dir="ltr" className="font-normal">{values.email}</span></dd></div>
            </dl>

            <div>
              <label className="flex cursor-pointer items-start gap-3">
                <input type="checkbox" className="mt-0.5 h-5 w-5 accent-terracotta-600" aria-invalid={errors.termsAccepted ? true : undefined} aria-describedby={errors.termsAccepted ? 'booking-terms-error' : undefined} {...register('termsAccepted')} />
                <span className="text-sm">
                  {t.rich('fields.terms', {
                    terms: (chunks) => <Link href="/terms" target="_blank" className="font-semibold text-majorelle-600 underline">{chunks}</Link>,
                    privacy: (chunks) => <Link href="/privacy" target="_blank" className="font-semibold text-majorelle-600 underline">{chunks}</Link>,
                  })}
                </span>
              </label>
              <FieldError id="booking-terms-error" code={errors.termsAccepted?.message} />
            </div>

            <Turnstile onToken={(token) => setValue('turnstileToken', token)} />
            <FormAlert code={alert} />
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between gap-3 border-t border-ink/5 pt-6">
          {step > 0 ? (
            <Button type="button" variant="ghost" onClick={() => setStep((s) => s - 1)}>
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden />
              {tf('back')}
            </Button>
          ) : (
            <span />
          )}
          {step < STEPS.length - 1 ? (
            <Button type="button" onClick={next}>
              {tf('next')}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
            </Button>
          ) : (
            <Button type="submit" disabled={pending}>
              {pending ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden /> : <CalendarDays className="h-4 w-4" aria-hidden />}
              {pending ? tf('sending') : t('submit')}
            </Button>
          )}
        </div>
      </form>

      {/* Estimation du prix */}
      <aside aria-label={t('priceAria')} className={`h-fit rounded-[var(--radius-card)] bg-ink p-6 text-sand-100 ${compact ? '' : 'lg:sticky lg:top-24'}`}>
        <h3 className="font-display text-xl font-bold text-white">{t('price.title')}</h3>
        {quote && selected ? (
          <>
            <dl className="mt-5 space-y-2.5 text-sm">
              <div className="flex justify-between gap-3"><dt>{t('price.base', { adults: Number(values.adults) || 0, children: Number(values.children) || 0 })}</dt><dd>{fmt(quote.base)}</dd></div>
              {quote.transport > 0 && <div className="flex justify-between gap-3"><dt>{t('price.transport')}</dt><dd>{fmt(quote.transport)}</dd></div>}
              {quote.accommodation > 0 && <div className="flex justify-between gap-3"><dt>{t('price.accommodation', { nights: quote.nights })}</dt><dd>{fmt(quote.accommodation)}</dd></div>}
              {quote.guide > 0 && <div className="flex justify-between gap-3"><dt>{t('price.guide')}</dt><dd>{fmt(quote.guide)}</dd></div>}
            </dl>
            <div className="mt-5 flex items-end justify-between border-t border-white/15 pt-5">
              <span className="text-sm">{t('price.total')}</span>
              <span className="font-display text-3xl font-bold text-sand-300" aria-live="polite">{fmt(quote.total)}</span>
            </div>
            <p className="mt-4 text-xs text-sand-200">{t('price.note')}</p>
          </>
        ) : (
          <p className="mt-4 text-sm text-sand-200">{t('price.empty')}</p>
        )}
      </aside>
    </div>
  );
}
