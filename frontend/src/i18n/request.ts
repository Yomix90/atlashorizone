import { hasLocale, type AbstractIntlMessages } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { defaultLocale, routing } from './routing';

type Messages = Record<string, unknown>;

/** Fusion profonde : les clés absentes d'une langue retombent sur le français. */
function deepMerge(base: Messages, override: Messages): Messages {
  const out: Messages = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const current = out[key];
    out[key] =
      value && typeof value === 'object' && !Array.isArray(value) && current && typeof current === 'object'
        ? deepMerge(current as Messages, value as Messages)
        : value;
  }
  return out;
}

async function loadMessages(locale: string): Promise<Messages> {
  try {
    return (await import(`../../messages/${locale}.json`)).default as Messages;
  } catch {
    return {};
  }
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : defaultLocale;

  const base = await loadMessages(defaultLocale);
  const messages = locale === defaultLocale ? base : deepMerge(base, await loadMessages(locale));

  return {
    locale,
    messages: messages as AbstractIntlMessages,
    timeZone: 'Africa/Casablanca',
  };
});
