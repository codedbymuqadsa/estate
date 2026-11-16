import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import styles from './Button.module.scss';

/**
 * Polymorphic button: renders a Next <Link> for internal hrefs,
 * an <a> for external/mailto/tel hrefs, and a <button> otherwise.
 */
export default function Button({
  href,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconRight: IconRight,
  fullWidth = false,
  loading = false,
  className = '',
  children,
  type = 'button',
  ...rest
}) {
  const classes = [styles.button, styles[variant], styles[size], fullWidth && styles.full, className]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {loading ? <Loader2 size={18} className={styles.spin} aria-hidden="true" /> : Icon && <Icon size={18} aria-hidden="true" />}
      {children && <span>{children}</span>}
      {IconRight && !loading && <IconRight size={18} aria-hidden="true" />}
    </>
  );

  if (href) {
    const external = /^(https?:|mailto:|tel:)/.test(href);
    if (external) {
      return (
        <a href={href} className={classes} {...rest}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={loading || rest.disabled} aria-busy={loading || undefined} {...rest}>
      {content}
    </button>
  );
}
