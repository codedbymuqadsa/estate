'use client';

import { MapPin, Share2 } from 'lucide-react';
import { formatPrice } from '@/lib/formatters';
import { useUI } from '@/context/UIContext';
import Badge from '@/components/common/Badge';
import { CompareButton, FavoriteButton } from './PropertyActions';
import styles from './PropertyHeader.module.scss';

const LISTING_LABEL = { buy: 'For Sale', rent: 'For Rent', commercial: 'Commercial' };

export default function PropertyHeader({ property }) {
  const { showToast } = useUI();

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: property.title, text: `${property.title} on ESTATE`, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      showToast('Link copied to clipboard.');
    } catch (err) {
      if (err?.name !== 'AbortError') showToast('Could not share this link. Copy it from the address bar.', { type: 'error' });
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.main}>
        <div className={styles.badges}>
          <Badge variant={property.listingType === 'rent' ? 'green' : 'navy'}>{LISTING_LABEL[property.listingType]}</Badge>
          <Badge variant="neutral">{property.subtype}</Badge>
          {property.featured && <Badge variant="champagne">Featured</Badge>}
        </div>
        <h1 className={styles.title}>{property.title}</h1>
        <p className={styles.location}>
          <MapPin size={16} aria-hidden="true" />
          {property.address}, {property.neighborhood}, {property.city}
        </p>
      </div>
      <div className={styles.side}>
        <p className={styles.price}>{formatPrice(property)}</p>
        <div className={styles.actions}>
          <FavoriteButton property={property} variant="labelled" />
          <CompareButton property={property} variant="labelled" />
          <button type="button" onClick={share} className={styles.share}>
            <Share2 size={18} aria-hidden="true" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </header>
  );
}
