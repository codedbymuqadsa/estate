'use client';

import { ArrowLeftRight, Check, Heart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useComparison } from '@/context/ComparisonContext';
import styles from './PropertyActions.module.scss';

export function FavoriteButton({ property, variant = 'overlay', className = '' }) {
  const { isSaved, toggle } = useWishlist();
  const saved = isSaved(property.id);
  const label = saved ? `Remove ${property.title} from saved` : `Save ${property.title}`;

  return (
    <button
      type="button"
      className={`${styles.btn} ${styles[variant]} ${saved ? styles.saved : ''} ${className}`}
      onClick={() => toggle(property)}
      aria-pressed={saved}
      aria-label={label}
      title={saved ? 'Saved' : 'Save'}
    >
      <Heart size={18} fill={saved ? 'currentColor' : 'none'} aria-hidden="true" />
      {variant === 'labelled' && <span>{saved ? 'Saved' : 'Save'}</span>}
    </button>
  );
}

export function CompareButton({ property, variant = 'overlay', className = '' }) {
  const { isInCompare, toggle } = useComparison();
  const active = isInCompare(property.id);
  const label = active ? `Remove ${property.title} from comparison` : `Compare ${property.title}`;

  return (
    <button
      type="button"
      className={`${styles.btn} ${styles[variant]} ${active ? styles.active : ''} ${className}`}
      onClick={() => toggle(property)}
      aria-pressed={active}
      aria-label={label}
      title={active ? 'In comparison' : 'Compare'}
    >
      {active ? <Check size={18} aria-hidden="true" /> : <ArrowLeftRight size={18} aria-hidden="true" />}
      {variant === 'labelled' && <span>{active ? 'Comparing' : 'Compare'}</span>}
    </button>
  );
}
