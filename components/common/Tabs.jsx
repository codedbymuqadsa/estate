'use client';

import { useId, useRef } from 'react';
import styles from './Tabs.module.scss';

/**
 * Accessible tab list with arrow-key navigation.
 * Controlled: pass `value` and `onChange`. Render panels yourself using `panelProps(value)`.
 */
export default function Tabs({ tabs, value, onChange, label, variant = 'pill', className = '' }) {
  const uid = useId();
  const refs = useRef([]);

  const onKeyDown = (e, index) => {
    let next = index;
    if (e.key === 'ArrowRight') next = (index + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    else return;
    e.preventDefault();
    onChange(tabs[next].value);
    refs.current[next]?.focus();
  };

  return (
    <div role="tablist" aria-label={label} className={`${styles.list} ${styles[variant]} ${className}`}>
      {tabs.map((tab, i) => {
        const selected = tab.value === value;
        return (
          <button
            key={tab.value}
            ref={(el) => (refs.current[i] = el)}
            id={`${uid}-${tab.value}`}
            type="button"
            role="tab"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            className={`${styles.tab} ${selected ? styles.active : ''}`}
            onClick={() => onChange(tab.value)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            {tab.icon && <tab.icon size={16} aria-hidden="true" />}
            {tab.label}
            {typeof tab.count === 'number' && <span className={styles.count}>{tab.count}</span>}
          </button>
        );
      })}
    </div>
  );
}
