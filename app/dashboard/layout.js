import DashboardShell from '@/components/dashboard/DashboardShell';

export const metadata = {
  title: { default: 'Dashboard', template: '%s | Dashboard | ESTATE' },
  description: 'Your demo ESTATE dashboard. Data is stored in this browser only.',
  robots: { index: false },
};

export default function DashboardLayout({ children }) {
  return <DashboardShell>{children}</DashboardShell>;
}
