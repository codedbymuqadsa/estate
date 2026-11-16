'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { EMAIL_RE } from '@/lib/formatters';
import { STORAGE_KEYS } from '@/lib/constants';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useUI } from '@/context/UIContext';
import styles from './Newsletter.module.scss';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [, setSubscribers] = useLocalStorage(STORAGE_KEYS.newsletter, []);
  const { showToast } = useUI();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError('Enter a valid email address.');
      return;
    }
    setError('');
    setSubscribers((list) => (list.includes(email.trim()) ? list : [...list, email.trim()]));
    setEmail('');
    showToast('Thanks! You’re on the demo list. (No email is actually sent.)');
  };

  return (
    <form onSubmit={onSubmit} noValidate className={styles.form}>
      <label htmlFor="newsletter-email" className="visually-hidden">
        Email address
      </label>
      <div className={styles.row}>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? 'newsletter-error' : undefined}
        />
        <button type="submit" aria-label="Subscribe to newsletter">
          <ArrowRight size={18} />
        </button>
      </div>
      {error && (
        <p id="newsletter-error" role="alert" className={styles.error}>
          {error}
        </p>
      )}
    </form>
  );
}
