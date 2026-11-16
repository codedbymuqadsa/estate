import { PROPERTIES } from '@/data/properties';
import { sortProperties } from '@/lib/filters';
import PropertyGrid from '@/components/property/PropertyGrid';
import SectionHeading from './SectionHeading';
import styles from './FeaturedProperties.module.scss';

export default function FeaturedProperties() {
  const featured = sortProperties(PROPERTIES.filter((p) => p.featured), 'newest').slice(0, 6);
  return (
    <section className={styles.section} aria-labelledby="featured-h">
      <div className="container">
        <SectionHeading
          id="featured-h"
          eyebrow="Featured properties"
          title="Hand-picked homes worth a closer look"
          linkHref="/properties"
          linkLabel="View all properties"
        />
        <PropertyGrid properties={featured} />
      </div>
    </section>
  );
}
