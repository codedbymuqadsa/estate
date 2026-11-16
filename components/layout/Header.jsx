'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeftRight, Heart, Menu } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';
import { useWishlist } from '@/context/WishlistContext';
import { useComparison } from '@/context/ComparisonContext';
import { useUI } from '@/context/UIContext';
import Button from '@/components/common/Button';
import MobileMenu from './MobileMenu';
import styles from './Header.module.scss';

export function isActive(pathname, href) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
}

function IconLink({ href, label, count, icon: Icon, active }) {
  return (
    <Link href={href} className={`${styles.iconLink} ${active ? styles.iconActive : ''}`} aria-label={`${label}${count ? `, ${count} items` : ''}`}>
      <Icon size={20} aria-hidden="true" />
      {count > 0 && <span className={styles.count}>{count}</span>}
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const { count: savedCount } = useWishlist();
  const { count: compareCount } = useComparison();
  const { setMenuOpen } = useUI();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} aria-label="ESTATE home">
          <span className={styles.logoMark} aria-hidden="true" />
          ESTATE
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.link} ${isActive(pathname, link.href) ? styles.active : ''}`}
              aria-current={isActive(pathname, link.href) ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <IconLink href="/saved" label="Saved properties" count={savedCount} icon={Heart} active={pathname === '/saved'} />
          <IconLink href="/compare" label="Compare properties" count={compareCount} icon={ArrowLeftRight} active={pathname === '/compare'} />
          <Link href="/dashboard" className={styles.dashboard}>
            Dashboard
          </Link>
          <Button href="/contact?topic=list" size="sm" className={styles.cta}>
            List a Property
          </Button>
          <button type="button" className={styles.burger} onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <Menu size={24} />
          </button>
        </div>
      </div>
      <MobileMenu savedCount={savedCount} compareCount={compareCount} />
    </header>
  );
}
