import Link from 'next/link';
import styles from './SectionHeading.module.scss';

/** Shared heading for homepage sections: eyebrow, display title, optional text and link. */
export default function SectionHeading({ eyebrow, title, text, linkHref, linkLabel, align = 'left', light = false, id }) {
  return (
    <div className={`${styles.wrap} ${align === 'center' ? styles.center : ''} ${light ? styles.light : ''}`}>
      <div>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h2 id={id} className={styles.title}>
          {title}
        </h2>
        {text && <p className={styles.text}>{text}</p>}
      </div>
      {linkHref && (
        <Link href={linkHref} className={styles.link}>
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}
