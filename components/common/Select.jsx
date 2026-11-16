import { useId } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './Select.module.scss';

/**
 * @param {{value: string, label: string}[]} options
 */
export default function Select({ label, options, placeholder, error, className = '', hideLabel = false, ...props }) {
  const uid = useId();
  const id = props.id || uid;
  return (
    <div className={`${styles.field} ${className}`}>
      {label && (
        <label htmlFor={id} className={hideLabel ? 'visually-hidden' : styles.label}>
          {label}
        </label>
      )}
      <div className={styles.wrap}>
        <select
          id={id}
          className={styles.select}
          aria-invalid={error ? true : undefined}
          {...props}
        >
          {placeholder !== undefined && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown size={16} className={styles.chevron} aria-hidden="true" />
      </div>
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
