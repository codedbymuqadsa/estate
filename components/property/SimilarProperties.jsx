import { getSimilarProperties } from '@/data/properties';
import PropertyGrid from './PropertyGrid';
import styles from './SimilarProperties.module.scss';

/** Picks related listings by city, property type, listing type and price proximity. */
export default function SimilarProperties({ property }) {
  const similar = getSimilarProperties(property, 3);
  if (!similar.length) return null;
  return (
    <section className={styles.section} aria-labelledby="similar-h">
      <div className="container">
        <h2 id="similar-h" className={styles.title}>Similar properties</h2>
        <p className={styles.sub}>Matched on location, type and price.</p>
        <PropertyGrid properties={similar} />
      </div>
    </section>
  );
}
