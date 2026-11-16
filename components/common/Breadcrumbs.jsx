import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import styles from './Breadcrumbs.module.scss';

/** @param {{label: string, href?: string}[]} items  Last item is the current page. */
export default function Breadcrumbs({ items, light = false }) {
  return (
    <nav aria-label="Breadcrumb" className={`${styles.nav} ${light ? styles.light : ''}`}>
      <ol className={styles.list}>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label} className={styles.item}>
              {last || !item.href ? (
                <span aria-current={last ? 'page' : undefined}>{item.label}</span>
              ) : (
                <Link href={item.href}>{item.label}</Link>
              )}
              {!last && <ChevronRight size={14} aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
