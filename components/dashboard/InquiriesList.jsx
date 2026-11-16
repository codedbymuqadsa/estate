'use client';

import Link from 'next/link';
import { Inbox, Trash2 } from 'lucide-react';
import { STORAGE_KEYS } from '@/lib/constants';
import { formatDate } from '@/lib/formatters';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useUI } from '@/context/UIContext';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';
import EmptyState from '@/components/common/EmptyState';
import { Skeleton } from '@/components/common/LoadingSkeleton';
import DashboardHeading from './DashboardHeading';
import styles from './Lists.module.scss';

export default function InquiriesList() {
  const [inquiries, setInquiries, hydrated] = useLocalStorage(STORAGE_KEYS.inquiries, []);
  const { confirm, showToast } = useUI();

  const removeOne = (inq) =>
    confirm({
      title: 'Delete this inquiry?',
      message: 'This only removes it from your browser. The demo inquiry was never sent anywhere.',
      confirmLabel: 'Delete',
      danger: true,
      onConfirm: () => {
        setInquiries((list) => list.filter((x) => x.id !== inq.id));
        showToast('Inquiry deleted.', { type: 'info' });
      },
    });

  return (
    <>
      <DashboardHeading title="My inquiries" text="Messages you’ve sent from property and agent pages (demo data, stored locally)." />
      {!hydrated ? (
        <Skeleton height={140} radius={22} />
      ) : inquiries.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="No inquiries yet"
          text="When you send an inquiry from a property or agent page, it will appear here."
          action={{ label: 'Explore Properties', href: '/properties' }}
        />
      ) : (
        <ul className={styles.list} role="list">
          {inquiries.map((inq) => (
            <li key={inq.id} className={styles.item}>
              <div className={styles.top}>
                <div>
                  <h2 className={styles.name}>
                    {inq.propertySlug ? (
                      <Link href={`/properties/${inq.propertySlug}`}>{inq.propertyTitle}</Link>
                    ) : (
                      `General inquiry${inq.agentName ? ` · ${inq.agentName}` : ''}`
                    )}
                  </h2>
                  <p className={styles.meta}>
                    {formatDate(inq.date, 'MMM d, yyyy · h:mm a')} · Ref {inq.id}
                  </p>
                </div>
                <Badge variant="blue">{inq.status}</Badge>
              </div>
              <p className={styles.message}>{inq.message}</p>
              <div className={styles.actions}>
                <Button variant="ghost" size="sm" icon={Trash2} onClick={() => removeOne(inq)}>
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
