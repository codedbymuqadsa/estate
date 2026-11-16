import { CalendarDays } from 'lucide-react';
import Button from '@/components/common/Button';
import AgentContactCard from '@/components/agent/AgentContactCard';
import InquiryForm from '@/components/forms/InquiryForm';
import styles from './PropertySidebar.module.scss';

export default function PropertySidebar({ property, agent }) {
  return (
    <aside className={styles.sidebar} aria-label="Contact and scheduling">
      <div className={styles.card}>
        <AgentContactCard agent={agent} />
      </div>
      <div className={styles.card}>
        <Button href={`/schedule-visit?property=${property.slug}`} icon={CalendarDays} fullWidth size="lg">
          Schedule a visit
        </Button>
        <p className={styles.hint}>Demo scheduling — pick a date and time in four quick steps.</p>
      </div>
      <div className={styles.card} id="inquiry">
        <InquiryForm property={property} title="Send an inquiry" />
      </div>
    </aside>
  );
}
