import Image from 'next/image';
import Link from 'next/link';
import { Briefcase, Building2, MapPin } from 'lucide-react';
import { PROPERTIES } from '@/data/properties';
import Button from '@/components/common/Button';
import ContactAgentButton from './ContactAgentButton';
import styles from './AgentCard.module.scss';

/**
 * @param {{ agent: object, detailed?: boolean }} props
 * `detailed` adds the biography, experience and a contact action (used in the directory).
 */
export default function AgentCard({ agent, detailed = false }) {
  const listings = PROPERTIES.filter((p) => p.agentId === agent.id).length;
  const href = `/agents/${agent.slug}`;

  return (
    <article className={styles.card}>
      <Link href={href} className={styles.photo} tabIndex={-1} aria-hidden="true">
        <Image src={agent.image} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 25vw" />
      </Link>
      <div className={styles.body}>
        <h3 className={styles.name}>
          <Link href={href}>{agent.name}</Link>
        </h3>
        <p className={styles.role}>{agent.role}</p>
        <ul className={styles.meta} role="list">
          <li>
            <MapPin size={15} aria-hidden="true" /> {agent.city}
          </li>
          <li>
            <Building2 size={15} aria-hidden="true" /> {listings} {listings === 1 ? 'listing' : 'listings'}
          </li>
          {detailed && (
            <li>
              <Briefcase size={15} aria-hidden="true" /> {agent.experience} yrs experience
            </li>
          )}
        </ul>
        {detailed && <p className={styles.bio}>{agent.bio}</p>}
        {detailed ? (
          <div className={styles.actions}>
            <Button href={href} size="sm" variant="dark">
              View Profile
            </Button>
            <ContactAgentButton agent={agent} />
          </div>
        ) : (
          <Link href={href} className={styles.link}>
            View Profile →
          </Link>
        )}
      </div>
    </article>
  );
}
