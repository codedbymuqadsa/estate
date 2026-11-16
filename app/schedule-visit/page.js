import { Suspense } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import ScheduleVisitForm from '@/components/forms/ScheduleVisitForm';
import { Skeleton } from '@/components/common/LoadingSkeleton';

export const metadata = {
  title: 'Schedule a Visit',
  description: 'Schedule a demo property visit in five steps. Appointments are stored in your browser only.',
};

export default function ScheduleVisitPage() {
  return (
    <>
      <PageHeader
        title="Schedule a visit."
        subtitle="Choose a property, a date and a time. This is a demo experience, so nothing is actually booked."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Schedule a visit' }]}
      />
      <div className="container" style={{ paddingBlock: 32, maxWidth: 860 }}>
        <Suspense fallback={<Skeleton height={420} radius={22} />}>
          <ScheduleVisitForm />
        </Suspense>
      </div>
    </>
  );
}
