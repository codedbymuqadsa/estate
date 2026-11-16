import { Suspense } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import PropertyBrowser from '@/components/property/PropertyBrowser';
import LoadingSkeleton from '@/components/common/LoadingSkeleton';

export const metadata = {
  title: 'Explore Properties',
  description: 'Search apartments, houses, villas, penthouses and commercial spaces across six cities. Filter by price, bedrooms, area and amenities.',
};

export default function PropertiesPage() {
  return (
    <>
      <PageHeader
        title="Find your place."
        subtitle="Explore properties that match your lifestyle and ambitions."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Properties' }]}
      />
      <Suspense
        fallback={
          <div className="container" style={{ paddingBlock: 32 }}>
            <LoadingSkeleton count={6} />
          </div>
        }
      >
        <PropertyBrowser />
      </Suspense>
    </>
  );
}
