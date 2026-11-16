import Image from 'next/image';
import Link from 'next/link';
import { Bath, BedDouble, MapPin, Maximize2, ArrowUpRight } from 'lucide-react';
import { formatArea, formatPrice } from '@/lib/formatters';
import Badge from '@/components/common/Badge';
import { CompareButton, FavoriteButton } from './PropertyActions';
import styles from './PropertyCard.module.scss';

const LISTING_LABEL = { buy: 'For Sale', rent: 'For Rent', commercial: 'Commercial' };

export function PropertyMeta({ property, className = '' }) {
  const { bedrooms, bathrooms, area, propertyType } = property;
  const hasBeds = !['office', 'land'].includes(propertyType);
  return (
    <ul className={`${styles.meta} ${className}`} role="list">
      {hasBeds && (
        <li>
          <BedDouble size={16} aria-hidden="true" />
          {bedrooms === 0 ? 'Studio' : `${bedrooms} bd`}
        </li>
      )}
      {propertyType !== 'land' && (
        <li>
          <Bath size={16} aria-hidden="true" />
          {bathrooms} ba
        </li>
      )}
      <li>
        <Maximize2 size={15} aria-hidden="true" />
        {formatArea(area)}
      </li>
    </ul>
  );
}

/**
 * @param {{ property: object, layout?: 'grid' | 'list', priority?: boolean, sizes?: string }} props
 */
export default function PropertyCard({ property, layout = 'grid', priority = false, sizes }) {
  const href = `/properties/${property.slug}`;
  const cover = property.images[0];

  return (
    <article className={`${styles.card} ${layout === 'list' ? styles.list : ''}`}>
      <div className={styles.media}>
        <Link href={href} tabIndex={-1} aria-hidden="true" className={styles.imageLink}>
          <Image
            src={cover.src}
            alt=""
            fill
            sizes={sizes || (layout === 'list' ? '(max-width: 820px) 100vw, 380px' : '(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 33vw')}
            className={styles.image}
            priority={priority}
          />
        </Link>
        <div className={styles.badges}>
          <Badge variant={property.listingType === 'rent' ? 'green' : 'glass'}>{LISTING_LABEL[property.listingType]}</Badge>
          {property.featured && <Badge variant="champagne">Featured</Badge>}
        </div>
        <div className={styles.actions}>
          <FavoriteButton property={property} />
          <CompareButton property={property} />
        </div>
      </div>

      <div className={styles.body}>
        <p className={styles.price}>{formatPrice(property)}</p>
        <h3 className={styles.title}>
          <Link href={href}>{property.title}</Link>
        </h3>
        <p className={styles.location}>
          <MapPin size={15} aria-hidden="true" />
          {property.neighborhood}, {property.city}
        </p>
        <PropertyMeta property={property} />
        {layout === 'list' && <p className={styles.excerpt}>{property.description.overview}</p>}
        <Link href={href} className={styles.details} aria-label={`View details for ${property.title}`}>
          View Details <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
