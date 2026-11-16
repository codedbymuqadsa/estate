'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { List, Map as MapIcon, SearchX } from 'lucide-react';
import { LISTING_TYPES } from '@/lib/constants';
import { formatPrice } from '@/lib/formatters';
import { filterProperties, sortProperties, DEFAULT_FILTERS } from '@/lib/filters';
import { CITIES } from '@/data/locations';
import { usePropertyContext } from '@/context/PropertyContext';
import Select from '@/components/common/Select';
import Tabs from '@/components/common/Tabs';
import EmptyState from '@/components/common/EmptyState';
import { FavoriteButton } from './PropertyActions';
import PropertyMap from './PropertyMap';
import styles from './MapExplorer.module.scss';

export default function MapExplorer() {
  const { properties } = usePropertyContext();
  const [city, setCity] = useState('');
  const [type, setType] = useState('');
  const [activeId, setActiveId] = useState(null);
  const [mobileView, setMobileView] = useState('map'); // map | list
  const itemRefs = useRef({});

  const results = useMemo(
    () => sortProperties(filterProperties(properties, { ...DEFAULT_FILTERS, city, type }), 'recommended'),
    [properties, city, type]
  );

  // Drop the active selection if filters remove it.
  useEffect(() => {
    if (activeId && !results.some((p) => p.id === activeId)) setActiveId(null);
  }, [results, activeId]);

  const select = (id, { scroll = true } = {}) => {
    setActiveId(id);
    if (scroll) itemRefs.current[id]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  };

  return (
    <div className={styles.shell}>
      <aside className={`${styles.panel} ${mobileView === 'list' ? styles.show : ''}`} aria-label="Properties on the map">
        <div className={styles.filters}>
          <Select
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="All cities"
            options={CITIES.map((c) => ({ value: c.name, label: c.name }))}
          />
          <Tabs label="Listing type" value={type} onChange={setType} tabs={[{ value: '', label: 'All' }, ...LISTING_TYPES]} />
          <p className={styles.count} role="status" aria-live="polite">
            {results.length} {results.length === 1 ? 'property' : 'properties'} on the map
          </p>
        </div>

        {results.length === 0 ? (
          <div className={styles.empty}>
            <EmptyState icon={SearchX} title="Nothing here yet" text="Try another city or listing type." action={{ label: 'Reset', onClick: () => { setCity(''); setType(''); } }} />
          </div>
        ) : (
          <ul className={styles.list} role="list">
            {results.map((p) => (
              <li
                key={p.id}
                ref={(el) => (itemRefs.current[p.id] = el)}
                className={`${styles.item} ${p.id === activeId ? styles.active : ''}`}
              >
                <button
                  type="button"
                  className={styles.itemBtn}
                  onClick={() => {
                    select(p.id, { scroll: false });
                    setMobileView('map');
                  }}
                  aria-pressed={p.id === activeId}
                  aria-label={`Show ${p.title} on the map`}
                >
                  <span className={styles.thumb}>
                    <Image src={p.images[0].thumb} alt="" fill sizes="110px" />
                  </span>
                  <span className={styles.info}>
                    <strong>{formatPrice(p)}</strong>
                    <span className={styles.title}>{p.title}</span>
                    <span className={styles.where}>
                      {p.neighborhood}, {p.city}
                    </span>
                  </span>
                </button>
                <div className={styles.itemActions}>
                  <FavoriteButton property={p} variant="overlay" className={styles.fav} />
                  <Link href={`/properties/${p.slug}`} className={styles.view}>
                    Details
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </aside>

      <div className={`${styles.mapWrap} ${mobileView === 'map' ? styles.show : ''}`}>
        <PropertyMap properties={results} activeId={activeId} onSelect={(id) => select(id)} className={styles.map} />
      </div>

      <div className={styles.toggle} role="group" aria-label="Switch between map and list">
        <button type="button" aria-pressed={mobileView === 'map'} onClick={() => setMobileView('map')}>
          <MapIcon size={16} aria-hidden="true" /> Map
        </button>
        <button type="button" aria-pressed={mobileView === 'list'} onClick={() => setMobileView('list')}>
          <List size={16} aria-hidden="true" /> List
        </button>
      </div>
    </div>
  );
}
