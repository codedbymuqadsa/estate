'use client';

import { useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { formatCompactPrice, formatPrice } from '@/lib/formatters';
import styles from './LeafletMap.module.scss';

const iconCache = new Map();

// Cached so unchanged markers keep the same icon object and react-leaflet skips re-rendering them.
function pinIcon(property, active) {
  const cacheKey = `${property.id}:${active}`;
  if (!iconCache.has(cacheKey)) iconCache.set(cacheKey, makeIcon(property, active));
  return iconCache.get(cacheKey);
}

function makeIcon(property, active) {
  return L.divIcon({
    className: styles.pinWrap,
    html: `<span class="${styles.pin} ${active ? styles.pinActive : ''}">${formatCompactPrice(property)}</span>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
}

function MapController({ properties, activeId, markerRefs, fit }) {
  const map = useMap();
  const lastFit = useRef('');

  // Fit all markers into view whenever the set of properties changes.
  useEffect(() => {
    if (!fit || properties.length === 0) return;
    const signature = properties.map((p) => p.id).join(',');
    if (signature === lastFit.current) return;
    lastFit.current = signature;
    if (properties.length === 1) {
      map.setView([properties[0].latitude, properties[0].longitude], 14);
    } else {
      map.fitBounds(properties.map((p) => [p.latitude, p.longitude]), { padding: [48, 48], maxZoom: 14 });
    }
  }, [properties, map, fit]);

  // Fly to and open the active marker.
  useEffect(() => {
    if (!activeId) return;
    const p = properties.find((x) => x.id === activeId);
    if (!p) return;
    map.flyTo([p.latitude, p.longitude], Math.max(map.getZoom(), 13), { duration: 0.6 });
    const marker = markerRefs.current[activeId];
    if (marker) setTimeout(() => marker.openPopup(), 350);
  }, [activeId, properties, map, markerRefs]);

  // Leaflet needs a nudge when its container changes size (e.g. mobile list/map toggle).
  useEffect(() => {
    const el = map.getContainer();
    const ro = new ResizeObserver(() => map.invalidateSize());
    ro.observe(el);
    return () => ro.disconnect();
  }, [map]);

  return null;
}

export default function LeafletMap({ properties, activeId, onSelect, popup = true, fit = true, zoom = 12, scrollWheelZoom = true }) {
  const markerRefs = useRef({});
  const center = useMemo(() => {
    const first = properties[0];
    return first ? [first.latitude, first.longitude] : [30, 0];
  }, [properties]);

  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={scrollWheelZoom} className={styles.map} worldCopyJump>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapController properties={properties} activeId={activeId} markerRefs={markerRefs} fit={fit} />
      {properties.map((p) => (
        <Marker
          key={p.id}
          position={[p.latitude, p.longitude]}
          icon={pinIcon(p, p.id === activeId)}
          ref={(m) => {
            if (m) markerRefs.current[p.id] = m;
          }}
          eventHandlers={{ click: () => onSelect?.(p.id) }}
          zIndexOffset={p.id === activeId ? 1000 : 0}
        >
          {popup && (
            <Popup className={styles.popup} minWidth={240} maxWidth={260} closeButton={false}>
              <div className={styles.card}>
                <div className={styles.thumb}>
                  <Image src={p.images[0].thumb} alt={p.images[0].alt} fill sizes="260px" />
                </div>
                <div className={styles.info}>
                  <p className={styles.price}>{formatPrice(p)}</p>
                  <p className={styles.title}>{p.title}</p>
                  <p className={styles.where}>
                    {p.neighborhood}, {p.city}
                  </p>
                  <Link href={`/properties/${p.slug}`} className={styles.link}>
                    View details →
                  </Link>
                </div>
              </div>
            </Popup>
          )}
        </Marker>
      ))}
    </MapContainer>
  );
}
