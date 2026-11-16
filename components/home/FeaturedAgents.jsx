import { AGENTS } from '@/data/agents';
import AgentCard from '@/components/agent/AgentCard';
import SectionHeading from './SectionHeading';
import styles from './FeaturedAgents.module.scss';

const FEATURED_IDS = ['a1', 'a3', 'a4', 'a7'];

export default function FeaturedAgents() {
  const agents = FEATURED_IDS.map((id) => AGENTS.find((a) => a.id === id));
  return (
    <section className={styles.section} aria-labelledby="agents-h">
      <div className="container">
        <SectionHeading
          id="agents-h"
          eyebrow="Featured agents"
          title="Local experts, ready to help"
          linkHref="/agents"
          linkLabel="Meet all agents"
        />
        <ul className={styles.grid} role="list">
          {agents.map((a) => (
            <li key={a.id}>
              <AgentCard agent={a} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
