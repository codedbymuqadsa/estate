import styles from './LoadingSkeleton.module.scss';

export function Skeleton({ height = 16, width = '100%', radius = 8, className = '' }) {
  return <span className={`${styles.skeleton} ${className}`} style={{ height, width, borderRadius: radius }} aria-hidden="true" />;
}

export function PropertyCardSkeleton() {
  return (
    <div className={styles.card} aria-hidden="true">
      <Skeleton height={220} radius={0} />
      <div className={styles.body}>
        <Skeleton height={22} width="45%" />
        <Skeleton height={18} width="80%" />
        <Skeleton height={14} width="60%" />
        <Skeleton height={14} width="70%" />
      </div>
    </div>
  );
}

export default function LoadingSkeleton({ count = 6 }) {
  return (
    <div className={styles.grid} role="status" aria-label="Loading properties">
      {Array.from({ length: count }, (_, i) => (
        <PropertyCardSkeleton key={i} />
      ))}
    </div>
  );
}
