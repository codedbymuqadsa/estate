'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeftRight, Heart, Trash2 } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useComparison } from '@/context/ComparisonContext';
import { usePropertyContext } from '@/context/PropertyContext';
import { useUI } from '@/context/UIContext';
import Button from '@/components/common/Button';
import Select from '@/components/common/Select';
import EmptyState from '@/components/common/EmptyState';
import LoadingSkeleton from '@/components/common/LoadingSkeleton';
import PropertyCard from './PropertyCard';
import styles from './SavedProperties.module.scss';

const SORTS = [
  { value: 'recent', label: 'Recently saved' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest listing' },
  { value: 'area-desc', label: 'Largest area' },
];

export default function SavedProperties({ compact = false }) {
  const { items, count, remove, clear, hydrated } = useWishlist();
  const { isInCompare, toggle: toggleCompare, count: compareCount } = useComparison();
  const { properties } = usePropertyContext();
  const { confirm, showToast } = useUI();
  const [sort, setSort] = useState('recent');

  const saved = useMemo(() => {
    const list = items
      .map((i) => ({ property: properties.find((p) => p.id === i.id), savedAt: i.savedAt }))
      .filter((x) => x.property);
    const by = {
      recent: (a, b) => new Date(b.savedAt) - new Date(a.savedAt),
      'price-asc': (a, b) => a.property.price - b.property.price,
      'price-desc': (a, b) => b.property.price - a.property.price,
      newest: (a, b) => new Date(b.property.dateAdded) - new Date(a.property.dateAdded),
      'area-desc': (a, b) => b.property.area - a.property.area,
    };
    return list.sort(by[sort]).map((x) => x.property);
  }, [items, properties, sort]);

  if (!hydrated) return <LoadingSkeleton count={3} />;

  if (saved.length === 0) {
    return (
      <EmptyState
        icon={Heart}
        title="No saved properties yet"
        text="Tap the heart on any listing to keep it here. Your shortlist is stored privately in this browser."
        action={{ label: 'Explore Properties', href: '/properties' }}
      />
    );
  }

  return (
    <div>
      <div className={styles.toolbar}>
        <p>
          <strong>{count}</strong> saved {count === 1 ? 'property' : 'properties'}
        </p>
        <div className={styles.tools}>
          <Select label="Sort saved properties" hideLabel value={sort} onChange={(e) => setSort(e.target.value)} options={SORTS} />
          <Button
            variant="ghost"
            size="sm"
            icon={Trash2}
            onClick={() =>
              confirm({
                title: 'Remove all saved properties?',
                message: `This removes all ${count} properties from your saved list. You can save them again at any time.`,
                confirmLabel: 'Remove all',
                danger: true,
                onConfirm: () => {
                  clear();
                  showToast('Saved list cleared.', { type: 'info' });
                },
              })
            }
          >
            Clear all
          </Button>
        </div>
      </div>

      <ul className={`${styles.grid} ${compact ? styles.compact : ''}`} role="list">
        {saved.map((p) => (
          <li key={p.id} className={styles.cell}>
            <PropertyCard property={p} />
            <div className={styles.rowActions}>
              <Button variant="outline" size="sm" icon={Trash2} onClick={() => remove(p)}>
                Remove
              </Button>
              <Button
                variant={isInCompare(p.id) ? 'secondary' : 'outline'}
                size="sm"
                icon={ArrowLeftRight}
                onClick={() => toggleCompare(p)}
                aria-pressed={isInCompare(p.id)}
              >
                {isInCompare(p.id) ? 'In comparison' : 'Compare'}
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {compareCount >= 2 && (
        <p className={styles.cta}>
          {compareCount} properties ready to compare. <Link href="/compare">Open comparison →</Link>
        </p>
      )}
    </div>
  );
}
