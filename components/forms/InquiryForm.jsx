'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { STORAGE_KEYS } from '@/lib/constants';
import { generateReference } from '@/lib/formatters';
import { rules } from '@/lib/validation';
import { useForm } from '@/hooks/useForm';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useUI } from '@/context/UIContext';
import { Input, Textarea } from '@/components/common/Input';
import Button from '@/components/common/Button';
import styles from './Forms.module.scss';

const SCHEMA = {
  name: rules.name,
  email: rules.email,
  phone: rules.phone,
  message: rules.message(10),
};

/**
 * Inquiry form for a property or an agent. Saves a demo inquiry in localStorage.
 * @param {{ property?: object, agent?: object, title?: string }} props
 */
export default function InquiryForm({ property, agent, title = 'Request information' }) {
  const [, setInquiries] = useLocalStorage(STORAGE_KEYS.inquiries, []);
  const [profile, , profileReady] = useLocalStorage(STORAGE_KEYS.profile, null);
  const { showToast } = useUI();
  const [status, setStatus] = useState('idle'); // idle | sending | sent
  const [reference, setReference] = useState('');
  const prefilled = useRef(false);

  const defaultMessage = property
    ? `Hello, I’m interested in ${property.title} in ${property.neighborhood}. Could you share more details and available viewing times?`
    : agent
      ? `Hello ${agent.name.split(' ')[0]}, I’d like to talk about a property search. `
      : '';

  const form = useForm({ name: '', email: '', phone: '', message: defaultMessage }, SCHEMA);

  // Pre-fill contact details from the demo profile once localStorage is readable.
  useEffect(() => {
    if (!profileReady || prefilled.current || !profile) return;
    prefilled.current = true;
    form.setValues((v) => ({
      ...v,
      name: v.name || profile.name || '',
      email: v.email || profile.email || '',
      phone: v.phone || profile.phone || '',
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileReady, profile]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.check()) {
      showToast('Please fix the highlighted fields.', { type: 'error' });
      return;
    }
    setStatus('sending');
    setTimeout(() => {
      const ref = generateReference('INQ');
      setInquiries((list) => [
        {
          id: ref,
          propertyId: property?.id || null,
          propertySlug: property?.slug || null,
          propertyTitle: property?.title || null,
          agentId: agent?.id || property?.agentId || null,
          agentName: agent?.name || null,
          name: form.values.name.trim(),
          email: form.values.email.trim(),
          phone: form.values.phone.trim(),
          message: form.values.message.trim(),
          date: new Date().toISOString(),
          status: 'Received (demo)',
        },
        ...list,
      ]);
      setReference(ref);
      setStatus('sent');
      showToast('Inquiry saved to your demo dashboard.');
    }, 900);
  };

  if (status === 'sent') {
    return (
      <div className={styles.success} role="status">
        <CheckCircle2 size={44} aria-hidden="true" />
        <h3>Inquiry sent</h3>
        <p>
          Thanks, {form.values.name.split(' ')[0]}. This is a demo, so nothing was actually sent — your inquiry is stored in this browser
          and appears in your dashboard.
        </p>
        <p className={styles.ref}>Reference: {reference}</p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            form.reset({ ...form.values, message: defaultMessage });
            setStatus('idle');
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={styles.form} aria-label={title}>
      <h3 className={styles.formTitle}>{title}</h3>
      <Input label="Full name" required autoComplete="name" {...form.bind('name')} />
      <Input label="Email" type="email" required autoComplete="email" {...form.bind('email')} />
      <Input label="Phone" type="tel" required autoComplete="tel" placeholder="+1 555 010 2040" {...form.bind('phone')} />
      <Textarea label="Message" required rows={4} {...form.bind('message')} />
      <Button type="submit" fullWidth icon={Send} loading={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send inquiry'}
      </Button>
      <p className={styles.note}>Demo form — your details are stored only in this browser.</p>
    </form>
  );
}
