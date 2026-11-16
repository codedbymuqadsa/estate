import PropertyCard from './PropertyCard';
import styles from './PropertyGrid.module.scss';

export default function PropertyGrid({ properties, layout = 'grid', columns = 3, priorityCount = 0 }) {
  return (
    <ul
      role="list"
      className={`${styles.grid} ${layout === 'list' ? styles.list : styles[`cols${columns}`]}`}
    >
      {properties.map((p, i) => (
        <li key={p.id}>
          <PropertyCard property={p} layout={layout} priority={i < priorityCount} />
        </li>
      ))}
    </ul>
  );
}
