'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CalendarCheck, CalendarPlus, Clock, MapPin } from 'lucide-react';
import { STORAGE_KEYS } from '@/lib/constants';
import { formatDate } from '@/lib/formatters';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToday } from '@/hooks/useToday';
import { useUI } from '@/context/UIContext';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';
import EmptyState from '@/components/common/EmptyState';
import { Skeleton } from '@/components/common/LoadingSkeleton';
import DashboardHeading from './DashboardHeading';
import styles from './Lists.module.scss';

function statusOf(visit, today) {
  if (visit.status === 'Cancelled') return { label: 'Cancelled', variant: 'red' };
  if (today && visit.date < today) return { label: 'Past', variant: 'neutral' };
  return { label: 'Scheduled (demo)', variant: 'green' };
}

export default function VisitsList() {
  const [visits, setVisits, hydrated] = useLocalStorage(STORAGE_KEYS.visits, []);
  const today = useToday();
  const { confirm, showToast } = useUI();

  const cancel = (visit) =>
    confirm({
      title: 'Cancel this visit?',
      message: `Your demo visit to ${visit.propertyTitle} on ${formatDate(visit.date)} at ${visit.time} will be marked as cancelled.`,
      confirmLabel: 'Cancel visit',
      danger: true,
      onConfirm: () => {
        setVisits((list) => list.map((v) => (v.id === visit.id ? { ...v, status: 'Cancelled' } : v)));
        showToast('Visit cancelled.', { type: 'info' });
      },
    });

  return (
    <>
      <DashboardHeading title="Scheduled visits" text="Demo appointments saved in this browser. No real bookings are made.">
        <Button href="/schedule-visit" size="sm" icon={CalendarPlus}>
          Schedule a visit
        </Button>
      </DashboardHeading>

      {!hydrated ? (
        <Skeleton height={160} radius={22} />
      ) : visits.length === 0 ? (
        <EmptyState
          icon={CalendarCheck}
          title="No visits scheduled"
          text="Pick a property and a time to see how the demo scheduling flow works."
          action={{ label: 'Schedule a visit', href: '/schedule-visit' }}
        />
      ) : (
        <ul className={styles.list} role="list">
          {visits.map((v) => {
            const status = statusOf(v, today);
            const canCancel = status.label.startsWith('Scheduled');
            return (
              <li key={v.id} className={`${styles.item} ${styles.visit}`}>
                {v.propertyImage && (
                  <div className={styles.thumb}>
                    <Image src={v.propertyImage} alt="" fill sizes="160px" />
                  </div>
                )}
                <div className={styles.body}>
                  <div className={styles.top}>
                    <div>
                      <h2 className={styles.name}>
                        <Link href={`/properties/${v.propertySlug}`}>{v.propertyTitle}</Link>
                      </h2>
                      <p className={styles.meta}>
                        <MapPin size={13} aria-hidden="true" /> {v.location}
                      </p>
                    </div>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </div>
                  <p className={styles.when}>
                    <CalendarCheck size={16} aria-hidden="true" /> {formatDate(v.date, 'EEE, MMM d, yyyy')}
                    <Clock size={16} aria-hidden="true" /> {v.time}
                  </p>
                  <p className={styles.meta}>Ref {v.id}</p>
                  {canCancel && (
                    <div className={styles.actions}>
                      <Button variant="danger" size="sm" onClick={() => cancel(v)}>
                        Cancel visit
                      </Button>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
