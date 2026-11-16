import { X } from 'lucide-react';
import styles from './FilterChip.module.scss';

export default function FilterChip({ label, onRemove }) {
  return (
    <span className={styles.chip}>
      {label}
      <button type="button" onClick={onRemove} aria-label={`Remove filter: ${label}`} className={styles.remove}>
        <X size={14} />
      </button>
    </span>
  );
}
