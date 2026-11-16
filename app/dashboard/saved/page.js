import DashboardHeading from '@/components/dashboard/DashboardHeading';
import SavedProperties from '@/components/property/SavedProperties';

export const metadata = { title: 'Saved Properties' };

export default function DashboardSavedPage() {
  return (
    <>
      <DashboardHeading title="Saved properties" text="Your shortlist, stored privately in this browser." />
      <SavedProperties compact />
    </>
  );
}
