import Image from 'next/image';
import Link from 'next/link';
import { Phone, Star } from 'lucide-react';
import Button from '@/components/common/Button';
import styles from './AgentContactCard.module.scss';

/** Compact agent card used in the property sidebar. Ratings are fictional demo data. */
export default function AgentContactCard({ agent }) {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.photo}>
          <Image src={agent.image} alt={`Portrait of ${agent.name}`} fill sizes="72px" />
        </div>
        <div>
          <p className={styles.label}>Listing agent</p>
          <h3 className={styles.name}>{agent.name}</h3>
          <p className={styles.role}>{agent.role}</p>
          <p className={styles.rating}>
            <Star size={14} fill="currentColor" aria-hidden="true" />
            <strong>{agent.rating}</strong> <span>({agent.reviews} demo reviews)</span>
          </p>
        </div>
      </div>
      <div className={styles.actions}>
        <Button href={`tel:${agent.phone.replace(/[^+\d]/g, '')}`} variant="outline" size="sm" icon={Phone} fullWidth>
          {agent.phone}
        </Button>
        <Link href={`/agents/${agent.slug}`} className={styles.profile}>
          View agent profile →
        </Link>
      </div>
    </div>
  );
}
