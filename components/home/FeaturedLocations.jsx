import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { CITIES } from '@/data/locations';
import { PROPERTIES } from '@/data/properties';
import SectionHeading from './SectionHeading';
import styles from './FeaturedLocations.module.scss';

export default function FeaturedLocations() {
  const counts = PROPERTIES.reduce((acc, p) => ({ ...acc, [p.city]: (acc[p.city] || 0) + 1 }), {});

  return (
    <section className={styles.section} aria-labelledby="locations-h">
      <div className="container">
        <SectionHeading
          id="locations-h"
          eyebrow="Popular locations"
          title="Explore the world’s most livable cities"
          text="Six cities, each with its own character. Start where you’d like to live."
          linkHref="/properties"
          linkLabel="All properties"
        />
        <ul className={styles.grid} role="list">
          {CITIES.map((city) => (
            <li key={city.slug}>
              <Link href={`/properties?city=${encodeURIComponent(city.name)}`} className={styles.tile}>
                <Image src={city.image} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 33vw" className={styles.image} />
                <span className={styles.shade} aria-hidden="true" />
                <span className={styles.content}>
                  <span className={styles.count}>
                    {counts[city.name] || 0} {counts[city.name] === 1 ? 'listing' : 'listings'}
                  </span>
                  <span className={styles.name}>{city.name}</span>
                  <span className={styles.blurb}>{city.blurb}</span>
                </span>
                <span className={styles.arrow} aria-hidden="true">
                  <ArrowUpRight size={20} />
                </span>
                <span className="visually-hidden">Explore properties in {city.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
