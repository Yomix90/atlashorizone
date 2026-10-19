import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';
import { Button } from '@strapi/design-system';
import { Download } from '@strapi/icons';
import { useFetchClient, useNotification } from '@strapi/strapi/admin';

const RESERVATION_UID = 'api::reservation.reservation';

/** Bouton « Exporter en CSV » affiché dans la liste des réservations du Content Manager. */
export const ExportReservationsButton = () => {
  const { pathname } = useLocation();
  const { formatMessage } = useIntl();
  const { get } = useFetchClient();
  const { toggleNotification } = useNotification();
  const [loading, setLoading] = useState(false);

  if (!pathname.includes(RESERVATION_UID)) return null;

  const handleExport = async () => {
    setLoading(true);
    try {
      const { data } = await get<Blob>('/reservation-export/csv', { responseType: 'blob' } as any);
      const url = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = `reservations-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch {
      toggleNotification({
        type: 'danger',
        message: formatMessage({ id: 'reservation-export.error', defaultMessage: 'Export failed' }),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="secondary" startIcon={<Download />} loading={loading} onClick={handleExport}>
      {formatMessage({ id: 'reservation-export.button', defaultMessage: 'Export CSV' })}
    </Button>
  );
};
