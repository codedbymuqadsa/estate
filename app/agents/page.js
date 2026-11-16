import PageHeader from '@/components/layout/PageHeader';
import AgentDirectory from '@/components/agent/AgentDirectory';

export const metadata = {
  title: 'Our Agents',
  description: 'Meet the fictional ESTATE demo agents. Filter by location, specialty and experience.',
};

export default function AgentsPage() {
  return (
    <>
      <PageHeader
        title="Meet the agents."
        subtitle="Local experts across six cities. All agents are fictional demo profiles."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Agents' }]}
      />
      <AgentDirectory />
    </>
  );
}
