import { useId } from 'react';
import styles from './Input.module.scss';

function Field({ label, error, hint, required, id, children }) {
  return (
    <div className={`${styles.field} ${error ? styles.invalid : ''}`}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && (
            <span className={styles.req} aria-hidden="true">
              {' '}
              *
            </span>
          )}
        </label>
      )}
      {children}
      {hint && !error && <p className={styles.hint}>{hint}</p>}
      {error && (
        <p className={styles.error} id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function Input({ label, error, hint, required, className = '', ...props }) {
  const uid = useId();
  const id = props.id || uid;
  return (
    <Field label={label} error={error} hint={hint} required={required} id={id}>
      <input
        id={id}
        className={`${styles.control} ${className}`}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
    </Field>
  );
}

export function Textarea({ label, error, hint, required, rows = 4, className = '', ...props }) {
  const uid = useId();
  const id = props.id || uid;
  return (
    <Field label={label} error={error} hint={hint} required={required} id={id}>
      <textarea
        id={id}
        rows={rows}
        className={`${styles.control} ${styles.textarea} ${className}`}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
    </Field>
  );
}

export default Input;
