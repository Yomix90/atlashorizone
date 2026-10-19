'use client';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

// Marqueur en CSS (évite les chemins d'images Leaflet cassés par le bundler).
const markerIcon = L.divIcon({
  className: '',
  html: '<span style="display:block;width:28px;height:28px;border-radius:50% 50% 50% 0;background:#c2552d;border:3px solid #fff;transform:rotate(-45deg);box-shadow:0 2px 6px rgba(0,0,0,.35)"></span>',
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -28],
});

export default function LeafletMap({ lat, lng, label, zoom = 9 }: { lat: number; lng: number; label: string; zoom?: number }) {
  return (
    <MapContainer center={[lat, lng]} zoom={zoom} scrollWheelZoom={false} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]} icon={markerIcon}>
        <Popup>{label}</Popup>
      </Marker>
    </MapContainer>
  );
}
