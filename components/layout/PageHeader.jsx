import Breadcrumbs from '@/components/common/Breadcrumbs';
import styles from './PageHeader.module.scss';

/** Shared page intro block: breadcrumbs, eyebrow, display title and subtitle. */
export default function PageHeader({ title, subtitle, eyebrow, breadcrumbs, children }) {
  return (
    <section className={styles.header}>
      <div className="container">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {children && <div className={styles.extra}>{children}</div>}
      </div>
    </section>
  );
}
