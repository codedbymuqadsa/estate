'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeftRight, Heart, LayoutDashboard, X } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';
import { useUI } from '@/context/UIContext';
import Button from '@/components/common/Button';
import styles from './MobileMenu.module.scss';

export default function MobileMenu({ savedCount, compareCount }) {
  const { menuOpen, setMenuOpen } = useUI();
  const pathname = usePathname();
  const panelRef = useRef(null);

  // Close whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, setMenuOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    document.body.classList.add('no-scroll');
    panelRef.current?.querySelector('a, button')?.focus();
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('no-scroll');
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen, setMenuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <div className={`${styles.root} ${menuOpen ? styles.open : ''}`} aria-hidden={!menuOpen}>
      <div className={styles.backdrop} onClick={close} />
      <aside ref={panelRef} className={styles.panel} role="dialog" aria-modal="true" aria-label="Main menu">
        <div className={styles.top}>
          <span className={styles.brand}>ESTATE</span>
          <button type="button" onClick={close} className={styles.close} aria-label="Close menu">
            <X size={24} />
          </button>
        </div>

        <nav aria-label="Mobile">
          {NAV_LINKS.map((link) => {
            const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
            return (
              <Link key={link.href} href={link.href} className={`${styles.link} ${active ? styles.active : ''}`} aria-current={active ? 'page' : undefined}>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.shortcuts}>
          <Link href="/saved" className={styles.shortcut}>
            <Heart size={18} aria-hidden="true" /> Saved <span>{savedCount}</span>
          </Link>
          <Link href="/compare" className={styles.shortcut}>
            <ArrowLeftRight size={18} aria-hidden="true" /> Compare <span>{compareCount}</span>
          </Link>
          <Link href="/dashboard" className={styles.shortcut}>
            <LayoutDashboard size={18} aria-hidden="true" /> Dashboard
          </Link>
        </div>

        <Button href="/contact?topic=list" fullWidth size="lg">
          List a Property
        </Button>
      </aside>
    </div>
  );
}
