import PageHeader from '@/components/layout/PageHeader';
import SavedProperties from '@/components/property/SavedProperties';

export const metadata = {
  title: 'Saved Properties',
  description: 'Your saved ESTATE listings, stored privately in this browser.',
};

export default function SavedPage() {
  return (
    <>
      <PageHeader
        title="Saved."
        subtitle="Your shortlist of favourite properties, kept in this browser."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Saved' }]}
      />
      <div className="container" style={{ paddingBlock: 32 }}>
        <SavedProperties />
      </div>
    </>
  );
}
