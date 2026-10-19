import type { StrapiApp } from '@strapi/strapi/admin';
import { ExportReservationsButton } from './components/ExportReservationsButton';

const translations: Record<string, Record<string, string>> = {
  en: { 'reservation-export.button': 'Export CSV', 'reservation-export.error': 'CSV export failed' },
  fr: { 'reservation-export.button': 'Exporter en CSV', 'reservation-export.error': "L'export CSV a échoué" },
  es: { 'reservation-export.button': 'Exportar CSV', 'reservation-export.error': 'Error en la exportación CSV' },
  de: { 'reservation-export.button': 'Als CSV exportieren', 'reservation-export.error': 'CSV-Export fehlgeschlagen' },
  ar: { 'reservation-export.button': 'تصدير CSV', 'reservation-export.error': 'فشل تصدير CSV' },
};

export default {
  config: {
    // Langues de l'interface d'administration (l'anglais est toujours disponible).
    locales: ['fr', 'es', 'de', 'ar'],
    translations,
  },
  bootstrap(app: StrapiApp) {
    app.getPlugin('content-manager').injectComponent('listView', 'actions', {
      name: 'export-reservations-csv',
      Component: ExportReservationsButton,
    });
  },
};
