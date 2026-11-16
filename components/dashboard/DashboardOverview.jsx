'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { CalendarCheck, Heart, Inbox } from 'lucide-react';
import { STORAGE_KEYS } from '@/lib/constants';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToday } from '@/hooks/useToday';
import { useWishlist } from '@/context/WishlistContext';
import { usePropertyContext } from '@/context/PropertyContext';
import { Skeleton } from '@/components/common/LoadingSkeleton';
import PropertyGrid from '@/components/property/PropertyGrid';
import Button from '@/components/common/Button';
import DashboardHeading from './DashboardHeading';
import styles from './DashboardOverview.module.scss';

const SavedByCityChart = dynamic(() => import('./SavedByCityChart'), { ssr: false, loading: () => <Skeleton height={220} radius={14} /> });

function Stat({ icon: Icon, label, value, href }) {
  return (
    <Link href={href} className={styles.stat}>
      <span className={styles.statIcon}>
        <Icon size={22} aria-hidden="true" />
      </span>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </Link>
  );
}

export default function DashboardOverview() {
  const { items, count: savedCount } = useWishlist();
  const { properties, recentlyViewed } = usePropertyContext();
  const [inquiries] = useLocalStorage(STORAGE_KEYS.inquiries, []);
  const [visits] = useLocalStorage(STORAGE_KEYS.visits, []);
  const [profile] = useLocalStorage(STORAGE_KEYS.profile, null);
  const today = useToday();

  const upcoming = visits.filter((v) => v.status !== 'Cancelled' && (!today || v.date >= today)).length;

  const byCity = useMemo(() => {
    const counts = {};
    items.forEach((i) => {
      const p = properties.find((x) => x.id === i.id);
      if (p) counts[p.city] = (counts[p.city] || 0) + 1;
    });
    return Object.entries(counts).map(([city, count]) => ({ city, count }));
  }, [items, properties]);

  return (
    <>
      <DashboardHeading
        title={profile?.name ? `Welcome back, ${profile.name.split(' ')[0]}` : 'Welcome to your dashboard'}
        text="A quick look at your saved homes, inquiries and upcoming visits."
      />

      <div className={styles.stats}>
        <Stat icon={Heart} label="Saved properties" value={savedCount} href="/dashboard/saved" />
        <Stat icon={Inbox} label="Active inquiries" value={inquiries.length} href="/dashboard/inquiries" />
        <Stat icon={CalendarCheck} label="Upcoming visits" value={upcoming} href="/dashboard/visits" />
      </div>

      {byCity.length > 0 && (
        <section className={styles.card} aria-labelledby="chart-h">
          <h2 id="chart-h" className={styles.h}>Saved properties by city</h2>
          <SavedByCityChart data={byCity} />
        </section>
      )}

      <section className={styles.recent} aria-labelledby="recent-h">
        <h2 id="recent-h" className={styles.h}>Recently viewed</h2>
        {recentlyViewed.length ? (
          <PropertyGrid properties={recentlyViewed.slice(0, 6)} columns={2} />
        ) : (
          <div className={styles.empty}>
            <p>Properties you open will appear here.</p>
            <Button href="/properties" size="sm">
              Explore Properties
            </Button>
          </div>
        )}
      </section>
    </>
  );
}
