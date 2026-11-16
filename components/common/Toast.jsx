'use client';

import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import styles from './Toast.module.scss';

const ICONS = { success: CheckCircle2, error: AlertCircle, info: Info };

export default function ToastViewport({ toasts, onDismiss }) {
  return (
    <div className={styles.viewport} role="region" aria-label="Notifications" aria-live="polite">
      {toasts.map((t) => {
        const Icon = ICONS[t.type] || Info;
        return (
          <div key={t.id} className={`${styles.toast} ${styles[t.type]}`} role={t.type === 'error' ? 'alert' : 'status'}>
            <Icon size={20} className={styles.icon} aria-hidden="true" />
            <p>{t.message}</p>
            <button type="button" onClick={() => onDismiss(t.id)} aria-label="Dismiss notification" className={styles.close}>
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
