'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeftRight, Plus, X } from 'lucide-react';
import { PROPERTY_TYPES } from '@/lib/constants';
import { formatArea, formatPrice } from '@/lib/formatters';
import { getAmenity } from '@/lib/amenityIcons';
import { useComparison } from '@/context/ComparisonContext';
import { usePropertyContext } from '@/context/PropertyContext';
import { useUI } from '@/context/UIContext';
import Button from '@/components/common/Button';
import EmptyState from '@/components/common/EmptyState';
import { Skeleton } from '@/components/common/LoadingSkeleton';
import styles from './PropertyComparison.module.scss';

const typeLabel = (p) => PROPERTY_TYPES.find((t) => t.value === p.propertyType)?.label;

/**
 * Row definitions. `raw` produces a comparable primitive, `render` the visible cell.
 * `best` marks which direction is "better" so the strongest value can be highlighted.
 */
const ROWS = [
  { key: 'price', label: 'Price', raw: (p) => p.price, render: (p) => formatPrice(p), best: 'min' },
  { key: 'location', label: 'Location', raw: (p) => `${p.neighborhood}, ${p.city}`, render: (p) => `${p.neighborhood}, ${p.city}` },
  { key: 'type', label: 'Property type', raw: typeLabel, render: typeLabel },
  { key: 'beds', label: 'Bedrooms', raw: (p) => p.bedrooms, render: (p) => (p.bedrooms === 0 ? 'Studio / n/a' : p.bedrooms), best: 'max' },
  { key: 'baths', label: 'Bathrooms', raw: (p) => p.bathrooms, render: (p) => p.bathrooms, best: 'max' },
  { key: 'area', label: 'Area', raw: (p) => p.area, render: (p) => formatArea(p.area), best: 'max' },
  { key: 'year', label: 'Year built', raw: (p) => p.yearBuilt || 0, render: (p) => p.yearBuilt || '—', best: 'max' },
  { key: 'parking', label: 'Parking', raw: (p) => p.parkingSpaces, render: (p) => (p.parkingSpaces ? `${p.parkingSpaces} space${p.parkingSpaces > 1 ? 's' : ''}` : 'None'), best: 'max' },
  { key: 'furnishing', label: 'Furnishing', raw: (p) => p.furnishing, render: (p) => p.furnishing },
  { key: 'amenities', label: 'Amenities', raw: (p) => [...p.amenities].sort().join('|'), render: null },
];

export default function PropertyComparison() {
  const { ids, remove, clear, hydrated, limit } = useComparison();
  const { properties } = usePropertyContext();
  const { confirm, showToast } = useUI();
  const [onlyDiffs, setOnlyDiffs] = useState(false);

  const items = useMemo(() => ids.map((id) => properties.find((p) => p.id === id)).filter(Boolean), [ids, properties]);

  const analysis = useMemo(() => {
    const out = {};
    ROWS.forEach((row) => {
      const values = items.map(row.raw);
      const differs = new Set(values.map(String)).size > 1;
      let bestIndex = new Set();
      if (differs && row.best) {
        const comparable = row.key !== 'price' || new Set(items.map((p) => p.priceUnit)).size === 1;
        if (comparable) {
          const nums = values.map(Number);
          const target = row.best === 'min' ? Math.min(...nums) : Math.max(...nums);
          bestIndex = new Set(nums.map((n, i) => (n === target ? i : -1)).filter((i) => i >= 0));
        }
      }
      out[row.key] = { differs, bestIndex };
    });
    // Amenities that not every compared property has
    const allAmenities = [...new Set(items.flatMap((p) => p.amenities))];
    out.sharedAmenities = new Set(allAmenities.filter((a) => items.every((p) => p.amenities.includes(a))));
    return out;
  }, [items]);

  if (!hydrated) {
    return (
      <div className="container" style={{ paddingBlock: 32 }}>
        <Skeleton height={420} radius={22} />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container" style={{ paddingBlock: 32 }}>
        <EmptyState
          icon={ArrowLeftRight}
          title="Nothing to compare yet"
          text={`Add up to ${limit} properties using the compare button on any listing, then come back to see them side by side.`}
          action={{ label: 'Explore Properties', href: '/properties' }}
          secondaryAction={{ label: 'View saved', href: '/saved' }}
        />
      </div>
    );
  }

  const rows = onlyDiffs ? ROWS.filter((r) => analysis[r.key].differs) : ROWS;

  return (
    <div className="container" style={{ paddingBlock: 32 }}>
      <div className={styles.bar}>
        <p>
          Comparing <strong>{items.length}</strong> of {limit} properties
        </p>
        <div className={styles.barActions}>
          <label className={styles.toggle}>
            <input type="checkbox" checked={onlyDiffs} onChange={(e) => setOnlyDiffs(e.target.checked)} />
            Show differences only
          </label>
          {items.length < limit && (
            <Button href="/properties" variant="outline" size="sm" icon={Plus}>
              Add property
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              confirm({
                title: 'Clear comparison?',
                message: 'This removes all properties from your comparison list.',
                confirmLabel: 'Clear all',
                danger: true,
                onConfirm: () => {
                  clear();
                  showToast('Comparison cleared.', { type: 'info' });
                },
              })
            }
          >
            Clear all
          </Button>
        </div>
      </div>

      <p className={styles.legend}>
        <span className={styles.swatchDiff} /> Differs between properties <span className={styles.swatchBest} /> Strongest value
      </p>

      <div className={styles.scroller} tabIndex={0} role="region" aria-label="Property comparison table (scrollable)">
        <table className={styles.table}>
          <caption className="visually-hidden">Side-by-side property comparison</caption>
          <thead>
            <tr>
              <th scope="col" className={styles.corner}>
                <span className="visually-hidden">Feature</span>
              </th>
              {items.map((p) => (
                <th scope="col" key={p.id} className={styles.head}>
                  <div className={styles.headCard}>
                    <button type="button" className={styles.remove} onClick={() => remove(p.id)} aria-label={`Remove ${p.title} from comparison`}>
                      <X size={16} />
                    </button>
                    <Link href={`/properties/${p.slug}`} className={styles.thumb}>
                      <Image src={p.images[0].thumb} alt={p.images[0].alt} fill sizes="260px" />
                    </Link>
                    <Link href={`/properties/${p.slug}`} className={styles.name}>
                      {p.title}
                    </Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const info = analysis[row.key];
              return (
                <tr key={row.key} className={info.differs ? styles.diff : ''}>
                  <th scope="row" className={styles.label}>
                    {row.label}
                    {info.differs && <span className="visually-hidden"> (differs)</span>}
                  </th>
                  {items.map((p, i) => (
                    <td key={p.id} className={info.bestIndex.has(i) ? styles.best : ''}>
                      {row.key === 'amenities' ? (
                        p.amenities.length ? (
                          <ul className={styles.chips} role="list">
                            {p.amenities.map((a) => {
                              const am = getAmenity(a);
                              return (
                                <li key={a} className={analysis.sharedAmenities.has(a) ? '' : styles.unique}>
                                  {am?.label}
                                </li>
                              );
                            })}
                          </ul>
                        ) : (
                          '—'
                        )
                      ) : (
                        row.render(p)
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
