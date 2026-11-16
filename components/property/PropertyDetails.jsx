import { Armchair, Calendar, Car, Check, Home, Maximize2, Bath, BedDouble, Tag } from 'lucide-react';
import { PROPERTY_TYPES } from '@/lib/constants';
import { formatArea, formatPrice } from '@/lib/formatters';
import { getAmenity } from '@/lib/amenityIcons';
import PropertyMap from './PropertyMap';
import styles from './PropertyDetails.module.scss';

function Stat({ icon: Icon, label, value }) {
  return (
    <div className={styles.stat}>
      <Icon size={20} aria-hidden="true" />
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

export default function PropertyDetails({ property: p }) {
  const typeLabel = PROPERTY_TYPES.find((t) => t.value === p.propertyType)?.label;
  const hasBeds = !['office', 'land'].includes(p.propertyType);
  const amenities = p.amenities.map(getAmenity).filter(Boolean);

  return (
    <div className={styles.wrap}>
      <section aria-labelledby="overview-h" className={styles.section}>
        <h2 id="overview-h" className={styles.h}>Overview</h2>
        <dl className={styles.stats}>
          <Stat icon={Tag} label={p.priceUnit ? 'Monthly price' : 'Price'} value={formatPrice(p)} />
          {hasBeds && <Stat icon={BedDouble} label="Bedrooms" value={p.bedrooms === 0 ? 'Studio' : p.bedrooms} />}
          {p.propertyType !== 'land' && <Stat icon={Bath} label={p.propertyType === 'office' ? 'Washrooms' : 'Bathrooms'} value={p.bathrooms} />}
          <Stat icon={Maximize2} label="Area" value={formatArea(p.area)} />
          <Stat icon={Home} label="Property type" value={typeLabel} />
          <Stat icon={Calendar} label="Year built" value={p.yearBuilt || 'Not built'} />
          <Stat icon={Car} label="Parking" value={p.parkingSpaces ? `${p.parkingSpaces} space${p.parkingSpaces > 1 ? 's' : ''}` : 'None'} />
          <Stat icon={Armchair} label="Furnishing" value={p.furnishing} />
        </dl>
      </section>

      <section aria-labelledby="desc-h" className={styles.section}>
        <h2 id="desc-h" className={styles.h}>Description</h2>
        <p className={styles.lead}>{p.description.overview}</p>

        <h3 className={styles.sub}>Key features</h3>
        <ul className={styles.features} role="list">
          {p.description.keyFeatures.map((f) => (
            <li key={f}>
              <Check size={16} aria-hidden="true" /> {f}
            </li>
          ))}
        </ul>

        <div className={styles.cols}>
          <div>
            <h3 className={styles.sub}>Interior</h3>
            <p>{p.description.interior}</p>
          </div>
          <div>
            <h3 className={styles.sub}>Exterior</h3>
            <p>{p.description.exterior}</p>
          </div>
        </div>

        <h3 className={styles.sub}>The neighborhood</h3>
        <p>{p.description.neighborhood}</p>
      </section>

      <section aria-labelledby="amen-h" className={styles.section}>
        <h2 id="amen-h" className={styles.h}>Amenities</h2>
        {amenities.length ? (
          <ul className={styles.amenities} role="list">
            {amenities.map(({ value, label, Icon }) => (
              <li key={value}>
                <span className={styles.amenIcon}><Icon size={20} aria-hidden="true" /></span>
                {label}
              </li>
            ))}
          </ul>
        ) : (
          <p>No listed amenities for this property.</p>
        )}
      </section>

      <section aria-labelledby="loc-h" className={styles.section}>
        <h2 id="loc-h" className={styles.h}>Location</h2>
        <p className={styles.address}>
          {p.address}, {p.neighborhood}, {p.city}
        </p>
        <PropertyMap properties={[p]} popup={false} className={styles.map} zoom={14} scrollWheelZoom={false} />
        <p className={styles.mapNote}>Map positions are approximate and for demonstration only.</p>
        <h3 className={styles.sub}>Nearby</h3>
        <ul className={styles.nearby} role="list">
          {p.nearby.map((n) => (
            <li key={n.name}>
              <span>
                <strong>{n.name}</strong>
                <small>{n.kind}</small>
              </span>
              <span className={styles.dist}>{n.distance}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
