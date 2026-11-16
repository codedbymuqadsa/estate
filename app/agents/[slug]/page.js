import { notFound } from 'next/navigation';
import { AGENTS } from '@/data/agents';
import AgentProfile from '@/components/agent/AgentProfile';

export function generateStaticParams() {
  return AGENTS.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }) {
  const agent = AGENTS.find((a) => a.slug === params.slug);
  if (!agent) return { title: 'Agent not found' };
  const description = `${agent.name}, ${agent.role} in ${agent.city}. ${agent.bio}`;
  return {
    title: agent.name,
    description,
    openGraph: { title: `${agent.name} | ESTATE`, description, images: [{ url: agent.image, alt: agent.name }] },
  };
}

export default function AgentPage({ params }) {
  const agent = AGENTS.find((a) => a.slug === params.slug);
  if (!agent) notFound();
  return <AgentProfile agent={agent} />;
}
