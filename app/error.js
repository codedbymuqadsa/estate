'use client';

import { TriangleAlert } from 'lucide-react';
import EmptyState from '@/components/common/EmptyState';

export default function Error({ reset }) {
  return (
    <div className="container" style={{ paddingBlock: 80, maxWidth: 760 }}>
      <EmptyState
        icon={TriangleAlert}
        title="Something went wrong."
        text="An unexpected error occurred while loading this page. Please try again."
        action={{ label: 'Try again', onClick: () => reset() }}
        secondaryAction={{ label: 'Back to home', href: '/' }}
      />
    </div>
  );
}
