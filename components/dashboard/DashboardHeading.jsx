import styles from './DashboardHeading.module.scss';

export default function DashboardHeading({ title, text, children }) {
  return (
    <div className={styles.wrap}>
      <div>
        <h1 className={styles.title}>{title}</h1>
        {text && <p className={styles.text}>{text}</p>}
      </div>
      {children}
    </div>
  );
}
