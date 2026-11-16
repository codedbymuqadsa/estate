'use client';

import dynamic from 'next/dynamic';
import styles from './PropertyMap.module.scss';

// Leaflet touches `window`, so it must never render on the server.
const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className={styles.loading} role="status">
      Loading map…
    </div>
  ),
});

/**
 * Client wrapper around the Leaflet map.
 * Pass a `className` to size the container (the map fills it).
 */
export default function PropertyMap({ className = '', ...props }) {
  return (
    <div className={`${styles.frame} ${className}`}>
      <LeafletMap {...props} />
    </div>
  );
}
