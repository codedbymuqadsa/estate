'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CalendarCheck, Heart, Inbox, LayoutDashboard, UserRound, Info } from 'lucide-react';
import styles from './DashboardShell.module.scss';

const LINKS = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/dashboard/saved', label: 'Saved Properties', icon: Heart },
  { href: '/dashboard/inquiries', label: 'My Inquiries', icon: Inbox },
  { href: '/dashboard/visits', label: 'Scheduled Visits', icon: CalendarCheck },
  { href: '/dashboard/profile', label: 'Profile', icon: UserRound },
];

export default function DashboardShell({ children }) {
  const pathname = usePathname();
  return (
    <div className="container">
      <p className={styles.demo}>
        <Info size={16} aria-hidden="true" />
        <span>
          <strong>Demo dashboard.</strong> There is no sign-in. Everything here is stored in this browser’s local storage and is not synced to any account or device.
        </span>
      </p>
      <div className={styles.layout}>
        <nav className={styles.sidebar} aria-label="Dashboard">
          <p className={styles.title}>My ESTATE</p>
          <ul role="list">
            {LINKS.map(({ href, label, icon: Icon, exact }) => {
              const active = exact ? pathname === href : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link href={href} className={`${styles.link} ${active ? styles.active : ''}`} aria-current={active ? 'page' : undefined}>
                    <Icon size={18} aria-hidden="true" />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
