import Button from './Button';
import styles from './EmptyState.module.scss';

export default function EmptyState({ icon: Icon, title, text, action, secondaryAction }) {
  return (
    <div className={styles.empty}>
      {Icon && (
        <div className={styles.icon}>
          <Icon size={30} aria-hidden="true" />
        </div>
      )}
      <h2 className={styles.title}>{title}</h2>
      {text && <p className={styles.text}>{text}</p>}
      {(action || secondaryAction) && (
        <div className={styles.actions}>
          {action && (
            <Button href={action.href} onClick={action.onClick}>
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button variant="outline" href={secondaryAction.href} onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
