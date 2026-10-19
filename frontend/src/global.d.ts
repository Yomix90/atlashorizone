import type messages from '../messages/fr.json';

/** Typage strict des clés de traduction : une clé absente de fr.json est une erreur TypeScript. */
declare module 'next-intl' {
  interface AppConfig {
    Messages: typeof messages;
  }
}
