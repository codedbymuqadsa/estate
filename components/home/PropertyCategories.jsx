import Image from 'next/image';
import Link from 'next/link';
import { PROPERTIES } from '@/data/properties';
import { img } from '@/lib/images';
import SectionHeading from './SectionHeading';
import styles from './PropertyCategories.module.scss';

const CATEGORIES = [
  { label: 'Apartments', href: '/properties?ptype=apartment', image: img('bld18', 900), match: (p) => p.propertyType === 'apartment' },
  { label: 'Houses', href: '/properties?ptype=house', image: img('ext24', 900), match: (p) => p.propertyType === 'house' },
  { label: 'Villas', href: '/properties?ptype=villa', image: img('ext28', 900), match: (p) => p.propertyType === 'villa' },
  { label: 'Penthouses', href: '/properties?ptype=penthouse', image: img('liv74', 900), match: (p) => p.propertyType === 'penthouse' },
  { label: 'Commercial', href: '/properties?type=commercial', image: img('off43', 900), match: (p) => p.listingType === 'commercial' },
  { label: 'Townhouses', href: '/properties?ptype=townhouse', image: img('bld73', 900), match: (p) => p.propertyType === 'townhouse' },
];

export default function PropertyCategories() {
  return (
    <section className={styles.section} aria-labelledby="cat-h">
      <div className="container">
        <SectionHeading id="cat-h" eyebrow="Browse by type" title="Explore by property type" />
        <ul className={styles.grid} role="list">
          {CATEGORIES.map((c) => {
            const count = PROPERTIES.filter(c.match).length;
            return (
              <li key={c.label}>
                <Link href={c.href} className={styles.tile}>
                  <Image src={c.image} alt="" fill sizes="(max-width: 600px) 50vw, (max-width: 1100px) 33vw, 16vw" className={styles.image} />
                  <span className={styles.shade} aria-hidden="true" />
                  <span className={styles.label}>
                    <strong>{c.label}</strong>
                    <small>{count} {count === 1 ? 'listing' : 'listings'}</small>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
