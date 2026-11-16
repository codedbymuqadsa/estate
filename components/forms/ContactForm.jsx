'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Send } from 'lucide-react';
import { STORAGE_KEYS } from '@/lib/constants';
import { generateReference } from '@/lib/formatters';
import { rules } from '@/lib/validation';
import { useForm } from '@/hooks/useForm';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useUI } from '@/context/UIContext';
import { Input, Textarea } from '@/components/common/Input';
import Select from '@/components/common/Select';
import Button from '@/components/common/Button';
import styles from './Forms.module.scss';

const INQUIRY_TYPES = [
  { value: 'buying', label: 'Buying a property' },
  { value: 'renting', label: 'Renting a property' },
  { value: 'list', label: 'Listing my property' },
  { value: 'agent', label: 'Speaking with an agent' },
  { value: 'feedback', label: 'Feedback about ESTATE' },
  { value: 'other', label: 'Something else' },
];

const SCHEMA = {
  name: rules.name,
  email: rules.email,
  subject: rules.required('Subject'),
  type: rules.required('Inquiry type'),
  message: rules.message(15),
};

export default function ContactForm() {
  const params = useSearchParams();
  const [, setMessages] = useLocalStorage(STORAGE_KEYS.contact, []);
  const { showToast } = useUI();
  const [status, setStatus] = useState('idle');
  const [reference, setReference] = useState('');

  const topic = params.get('topic');
  const form = useForm(
    {
      name: '',
      email: '',
      subject: topic === 'list' ? 'I’d like to list a property' : '',
      type: topic === 'list' ? 'list' : '',
      message: '',
    },
    SCHEMA
  );

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.check()) {
      showToast('Please fix the highlighted fields.', { type: 'error' });
      return;
    }
    setStatus('sending');
    setTimeout(() => {
      const ref = generateReference('MSG');
      setMessages((list) => [{ id: ref, ...form.values, date: new Date().toISOString() }, ...list]);
      setReference(ref);
      setStatus('sent');
    }, 1000);
  };

  if (status === 'sent') {
    return (
      <div className={styles.success} role="status">
        <CheckCircle2 size={52} aria-hidden="true" />
        <h2>Message received</h2>
        <p>Thank you, {form.values.name.split(' ')[0]}. This demo form doesn’t send email, but your message has been saved in this browser.</p>
        <p className={styles.ref}>Reference: {reference}</p>
        <Button
          variant="outline"
          onClick={() => {
            form.reset({ name: '', email: '', subject: '', type: '', message: '' });
            setStatus('idle');
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={styles.form} aria-label="Contact form">
      <div className={styles.row}>
        <Input label="Full name" required autoComplete="name" {...form.bind('name')} />
        <Input label="Email" type="email" required autoComplete="email" {...form.bind('email')} />
      </div>
      <div className={styles.row}>
        <Input label="Subject" required {...form.bind('subject')} />
        <Select
          label="Inquiry type"
          placeholder="Select a type"
          options={INQUIRY_TYPES}
          value={form.values.type}
          onChange={(e) => form.setField('type', e.target.value)}
          error={form.errors.type}
        />
      </div>
      <Textarea label="Message" required rows={6} {...form.bind('message')} />
      <Button type="submit" size="lg" icon={Send} loading={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </Button>
      <p className={styles.note}>Demo form — messages are saved only in your browser.</p>
    </form>
  );
}
