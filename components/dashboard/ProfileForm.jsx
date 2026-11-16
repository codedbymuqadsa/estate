'use client';

import { useEffect, useRef, useState } from 'react';
import { Save } from 'lucide-react';
import { STORAGE_KEYS } from '@/lib/constants';
import { CITIES } from '@/data/locations';
import { rules } from '@/lib/validation';
import { useForm } from '@/hooks/useForm';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useUI } from '@/context/UIContext';
import { Input } from '@/components/common/Input';
import Select from '@/components/common/Select';
import Button from '@/components/common/Button';
import { Skeleton } from '@/components/common/LoadingSkeleton';
import DashboardHeading from './DashboardHeading';
import styles from './ProfileForm.module.scss';

const SCHEMA = {
  name: rules.name,
  email: rules.email,
  phone: rules.phoneOptional,
};

export default function ProfileForm() {
  const [profile, setProfile, hydrated] = useLocalStorage(STORAGE_KEYS.profile, null);
  const { showToast } = useUI();
  const form = useForm({ name: '', email: '', phone: '', location: '' }, SCHEMA);
  const [saving, setSaving] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    if (!hydrated || loaded.current) return;
    loaded.current = true;
    if (profile) form.setValues({ name: profile.name || '', email: profile.email || '', phone: profile.phone || '', location: profile.location || '' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, profile]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.check()) {
      showToast('Please fix the highlighted fields.', { type: 'error' });
      return;
    }
    setSaving(true);
    setTimeout(() => {
      setProfile({ ...form.values, name: form.values.name.trim(), email: form.values.email.trim(), phone: form.values.phone.trim() });
      setSaving(false);
      showToast('Profile saved in this browser.');
    }, 500);
  };

  return (
    <>
      <DashboardHeading title="Profile" text="Used to pre-fill forms across the demo. Stored only in this browser." />
      {!hydrated ? (
        <Skeleton height={320} radius={22} />
      ) : (
        <form onSubmit={onSubmit} noValidate className={styles.form} aria-label="Profile">
          <Input label="Full name" required autoComplete="name" {...form.bind('name')} />
          <div className={styles.row}>
            <Input label="Email" type="email" required autoComplete="email" {...form.bind('email')} />
            <Input label="Phone" type="tel" autoComplete="tel" {...form.bind('phone')} />
          </div>
          <Select
            label="Preferred location"
            placeholder="No preference"
            options={CITIES.map((c) => ({ value: c.name, label: c.name }))}
            value={form.values.location}
            onChange={(e) => form.setField('location', e.target.value)}
          />
          <div>
            <Button type="submit" icon={Save} loading={saving}>
              Save profile
            </Button>
          </div>
        </form>
      )}
    </>
  );
}
