'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { addDays, format } from 'date-fns';
import { ArrowLeft, ArrowRight, CalendarCheck, Check, Info, MapPin } from 'lucide-react';
import { STORAGE_KEYS, TIME_SLOTS } from '@/lib/constants';
import { formatDate, formatPrice, generateReference } from '@/lib/formatters';
import { rules } from '@/lib/validation';
import { useForm } from '@/hooks/useForm';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { usePropertyContext } from '@/context/PropertyContext';
import { useUI } from '@/context/UIContext';
import Button from '@/components/common/Button';
import Select from '@/components/common/Select';
import { Input, Textarea } from '@/components/common/Input';
import styles from './Forms.module.scss';

const STEPS = ['Property', 'Date', 'Time', 'Your details', 'Confirm'];

const SCHEMA = {
  name: rules.name,
  email: rules.email,
  phone: rules.phone,
  message: () => '',
};

export default function ScheduleVisitForm() {
  const searchParams = useSearchParams();
  const { properties, getAgent } = usePropertyContext();
  const { showToast } = useUI();
  const [, setVisits] = useLocalStorage(STORAGE_KEYS.visits, []);
  const [profile, , profileReady] = useLocalStorage(STORAGE_KEYS.profile, null);

  const initialSlug = searchParams.get('property');
  const [propertyId, setPropertyId] = useState(() => properties.find((p) => p.slug === initialSlug)?.id || properties[0].id);
  const [step, setStep] = useState(0);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [stepError, setStepError] = useState('');
  const [today, setToday] = useState('');
  const [status, setStatus] = useState('idle'); // idle | saving | done
  const [booking, setBooking] = useState(null);
  const headingRef = useRef(null);
  const prefilled = useRef(false);

  const form = useForm({ name: '', email: '', phone: '', message: '' }, SCHEMA);
  const property = useMemo(() => properties.find((p) => p.id === propertyId), [properties, propertyId]);
  const agent = property ? getAgent(property.agentId) : null;

  // "Today" is only known in the browser; computing it here avoids hydration mismatches.
  useEffect(() => setToday(format(new Date(), 'yyyy-MM-dd')), []);

  useEffect(() => {
    if (!profileReady || prefilled.current || !profile) return;
    prefilled.current = true;
    form.setValues((v) => ({ ...v, name: profile.name || '', email: profile.email || '', phone: profile.phone || '' }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileReady, profile]);

  // Move focus to the step heading for keyboard and screen reader users.
  useEffect(() => {
    headingRef.current?.focus();
  }, [step, status]);

  const quickDates = useMemo(
    () => (today ? Array.from({ length: 6 }, (_, i) => addDays(new Date(`${today}T00:00:00`), i + 1)) : []),
    [today]
  );

  const next = () => {
    setStepError('');
    if (step === 1) {
      if (!date) return setStepError('Please choose a date for your visit.');
      if (today && date < today) return setStepError('Visit dates cannot be in the past.');
    }
    if (step === 2 && !time) return setStepError('Please choose a time slot.');
    if (step === 3 && !form.check(['name', 'email', 'phone'])) return setStepError('Please fix the highlighted fields.');
    setStep((s) => s + 1);
  };

  const back = () => {
    setStepError('');
    setStep((s) => Math.max(0, s - 1));
  };

  const confirm = () => {
    setStatus('saving');
    setTimeout(() => {
      const record = {
        id: generateReference('VIS'),
        propertyId: property.id,
        propertySlug: property.slug,
        propertyTitle: property.title,
        propertyImage: property.images[0].thumb,
        location: `${property.neighborhood}, ${property.city}`,
        date,
        time,
        name: form.values.name.trim(),
        email: form.values.email.trim(),
        phone: form.values.phone.trim(),
        message: form.values.message.trim(),
        status: 'Scheduled (demo)',
        createdAt: new Date().toISOString(),
      };
      setVisits((list) => [record, ...list]);
      setBooking(record);
      setStatus('done');
      showToast('Demo visit scheduled and saved to your dashboard.');
    }, 1100);
  };

  const restart = () => {
    setStep(0);
    setDate('');
    setTime('');
    setBooking(null);
    setStatus('idle');
  };

  if (status === 'done' && booking) {
    return (
      <div className={styles.panel} role="status">
        <div className={styles.success}>
          <span className={styles.stepDot} style={{ width: 64, height: 64, background: '#3fa66a', color: '#fff' }}>
            <Check size={32} aria-hidden="true" />
          </span>
          <h2 tabIndex={-1} ref={headingRef} className={styles.panelTitle}>
            Visit scheduled (demo)
          </h2>
          <p>Your appointment is saved in this browser only. No real booking has been made and no one has been notified.</p>
          <p className={styles.ref}>Reference: {booking.id}</p>
        </div>
        <dl className={styles.summary}>
          <div><dt>Property</dt><dd>{booking.propertyTitle}</dd></div>
          <div><dt>Date</dt><dd>{formatDate(booking.date, 'EEEE, MMMM d, yyyy')}</dd></div>
          <div><dt>Time</dt><dd>{booking.time}</dd></div>
          <div><dt>Name</dt><dd>{booking.name}</dd></div>
          <div><dt>Email</dt><dd>{booking.email}</dd></div>
          <div><dt>Phone</dt><dd>{booking.phone}</dd></div>
        </dl>
        <div className={styles.nav}>
          <Button variant="outline" onClick={restart}>
            Schedule another visit
          </Button>
          <Button href="/dashboard/visits" iconRight={ArrowRight}>
            View my visits
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ol className={styles.stepper} aria-label="Booking progress">
        {STEPS.map((label, i) => (
          <li
            key={label}
            className={`${styles.step} ${i === step ? styles.stepCurrent : ''} ${i < step ? styles.stepDone : ''}`}
            aria-current={i === step ? 'step' : undefined}
          >
            <span className={styles.stepDot}>{i < step ? <Check size={16} aria-hidden="true" /> : i + 1}</span>
            <span className={styles.stepLabel}>{label}</span>
            <span className="visually-hidden">{i < step ? ' (completed)' : i === step ? ' (current)' : ''}</span>
          </li>
        ))}
      </ol>

      <div className={styles.panel}>
        <p className={styles.demoNote}>
          <Info size={18} aria-hidden="true" />
          <span>This is a demo scheduling experience. Appointments are stored in your browser only — no real booking is made.</span>
        </p>

        {step === 0 && (
          <section aria-labelledby="step-title">
            <h2 id="step-title" tabIndex={-1} ref={headingRef} className={styles.panelTitle}>Choose a property</h2>
            <p className={styles.panelText}>Which home would you like to see?</p>
            <Select
              label="Property"
              value={propertyId}
              onChange={(e) => setPropertyId(e.target.value)}
              options={properties.map((p) => ({ value: p.id, label: `${p.title} — ${p.neighborhood}, ${p.city}` }))}
            />
            {property && (
              <article className={styles.chosen} style={{ display: 'flex', gap: 16, marginTop: 20, alignItems: 'center' }}>
                <div style={{ position: 'relative', width: 120, height: 90, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
                  <Image src={property.images[0].thumb} alt={property.images[0].alt} fill sizes="120px" style={{ objectFit: 'cover' }} />
                </div>
                <div>
                  <h3>{property.title}</h3>
                  <p style={{ color: '#5f7066', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.875rem' }}>
                    <MapPin size={14} aria-hidden="true" /> {property.address}, {property.city}
                  </p>
                  <p style={{ fontWeight: 800, color: '#143326', marginTop: 4 }}>{formatPrice(property)}</p>
                  <Link href={`/properties/${property.slug}`} style={{ color: '#2e8b57', fontSize: '0.8125rem', fontWeight: 700 }}>
                    View listing
                  </Link>
                </div>
              </article>
            )}
          </section>
        )}

        {step === 1 && (
          <section aria-labelledby="step-title">
            <h2 id="step-title" tabIndex={-1} ref={headingRef} className={styles.panelTitle}>Pick a date</h2>
            <p className={styles.panelText}>Choose any date from tomorrow onwards. Past dates are not available.</p>
            <div className={styles.slots} style={{ marginBottom: 20 }}>
              {quickDates.map((d) => {
                const value = format(d, 'yyyy-MM-dd');
                return (
                  <button
                    type="button"
                    key={value}
                    className={`${styles.slot} ${date === value ? styles.slotOn : ''}`}
                    onClick={() => setDate(value)}
                    aria-pressed={date === value}
                  >
                    {format(d, 'EEE, MMM d')}
                  </button>
                );
              })}
            </div>
            <Input
              label="Or select another date"
              type="date"
              min={today || undefined}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              error={stepError && !date ? stepError : date && today && date < today ? 'Visit dates cannot be in the past.' : ''}
            />
          </section>
        )}

        {step === 2 && (
          <section aria-labelledby="step-title">
            <h2 id="step-title" tabIndex={-1} ref={headingRef} className={styles.panelTitle}>Choose a time</h2>
            <p className={styles.panelText}>Available slots on {formatDate(date, 'EEEE, MMMM d')}.</p>
            <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
              <legend className="visually-hidden">Time slot</legend>
              <div className={styles.slots}>
                {TIME_SLOTS.map((slot) => (
                  <label key={slot} className={`${styles.slot} ${time === slot ? styles.slotOn : ''}`}>
                    <input type="radio" name="time" value={slot} checked={time === slot} onChange={() => setTime(slot)} className="visually-hidden" />
                    {slot}
                  </label>
                ))}
              </div>
            </fieldset>
          </section>
        )}

        {step === 3 && (
          <section aria-labelledby="step-title">
            <h2 id="step-title" tabIndex={-1} ref={headingRef} className={styles.panelTitle}>Your details</h2>
            <p className={styles.panelText}>{agent ? `${agent.name} will be your demo host.` : 'Tell us how to reach you.'}</p>
            <div className={styles.form}>
              <Input label="Full name" required autoComplete="name" {...form.bind('name')} />
              <div className={styles.row}>
                <Input label="Email" type="email" required autoComplete="email" {...form.bind('email')} />
                <Input label="Phone" type="tel" required autoComplete="tel" {...form.bind('phone')} />
              </div>
              <Textarea label="Additional message" rows={3} placeholder="Anything we should know before the visit?" {...form.bind('message')} />
            </div>
          </section>
        )}

        {step === 4 && (
          <section aria-labelledby="step-title">
            <h2 id="step-title" tabIndex={-1} ref={headingRef} className={styles.panelTitle}>Review and confirm</h2>
            <p className={styles.panelText}>Check the details below, then confirm your demo visit.</p>
            <dl className={styles.summary}>
              <div><dt>Property</dt><dd>{property.title}</dd></div>
              <div><dt>Address</dt><dd>{property.address}, {property.city}</dd></div>
              <div><dt>Date</dt><dd>{formatDate(date, 'EEEE, MMMM d, yyyy')}</dd></div>
              <div><dt>Time</dt><dd>{time}</dd></div>
              <div><dt>Name</dt><dd>{form.values.name}</dd></div>
              <div><dt>Email</dt><dd>{form.values.email}</dd></div>
              <div><dt>Phone</dt><dd>{form.values.phone}</dd></div>
              {form.values.message && <div><dt>Message</dt><dd>{form.values.message}</dd></div>}
            </dl>
          </section>
        )}

        {stepError && step !== 1 && (
          <p role="alert" style={{ color: '#c8473d', fontWeight: 500, fontSize: '0.875rem', marginTop: 16 }}>
            {stepError}
          </p>
        )}

        <div className={styles.nav}>
          <Button variant="ghost" icon={ArrowLeft} onClick={back} disabled={step === 0 || status === 'saving'}>
            Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button iconRight={ArrowRight} onClick={next}>
              Continue
            </Button>
          ) : (
            <Button icon={CalendarCheck} onClick={confirm} loading={status === 'saving'}>
              {status === 'saving' ? 'Scheduling…' : 'Confirm demo visit'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
