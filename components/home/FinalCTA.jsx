import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { img } from '@/lib/images';
import Button from '@/components/common/Button';
import styles from './FinalCTA.module.scss';

export default function FinalCTA() {
  return (
    <section className={styles.section} aria-labelledby="cta-h">
      <div className="container">
        <div className={styles.card}>
          <Image src={img('ext8', 1800)} alt="" fill sizes="100vw" className={styles.image} />
          <div className={styles.overlay} aria-hidden="true" />
          <div className={styles.content}>
            <h2 id="cta-h">The right space changes everything.</h2>
            <p>Browse the full collection, save what you love and take the first step toward your next address.</p>
            <Button href="/properties" variant="champagne" size="lg" iconRight={ArrowRight}>
              Explore Properties
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
