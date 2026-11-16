import styles from './Badge.module.scss';

export default function Badge({ variant = 'neutral', icon: Icon, children, className = '' }) {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${className}`}>
      {Icon && <Icon size={12} aria-hidden="true" />}
      {children}
    </span>
  );
}
