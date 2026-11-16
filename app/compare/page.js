import PageHeader from '@/components/layout/PageHeader';
import PropertyComparison from '@/components/property/PropertyComparison';

export const metadata = {
  title: 'Compare Properties',
  description: 'Compare up to four properties side by side and see the differences in price, size, amenities and more.',
};

export default function ComparePage() {
  return (
    <>
      <PageHeader
        title="Compare."
        subtitle="Put up to four properties side by side and see what really sets them apart."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Compare' }]}
      />
      <PropertyComparison />
    </>
  );
}
