import Image from 'next/image';
import { HERO_IMAGE } from '@/lib/images';
import SearchPanel from './SearchPanel';
import styles from './Hero.module.scss';

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <Image src={HERO_IMAGE} alt="A modern white villa with a swimming pool at golden hour" fill priority sizes="100vw" className={styles.image} />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <p className={styles.eyebrow}>Find a place. Discover a lifestyle.</p>
        <h1 id="hero-title" className={styles.title}>
          Your next chapter starts with the right address.
        </h1>
        <p className={styles.text}>Explore exceptional homes, discover inspiring spaces, and find a property that feels like yours.</p>
        <SearchPanel />
      </div>
    </section>
  );
}
