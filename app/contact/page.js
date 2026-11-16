import { Suspense } from 'react';
import { Clock, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { SITE } from '@/lib/constants';
import PageHeader from '@/components/layout/PageHeader';
import ContactForm from '@/components/forms/ContactForm';
import { Skeleton } from '@/components/common/LoadingSkeleton';
import styles from './page.module.scss';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with the ESTATE team. This is a demo contact form; messages are stored in your browser only.',
};

const SOCIALS = [
  { label: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  { label: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
  { label: 'X (Twitter)', icon: Twitter, href: 'https://x.com' },
  { label: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Let’s talk."
        subtitle="Questions about buying, renting or listing? Send us a message and we’ll point you in the right direction."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />
      <div className={`container ${styles.layout}`}>
        <div className={styles.formCard}>
          <h2 className={styles.h}>Send a message</h2>
          <Suspense fallback={<Skeleton height={420} radius={14} />}>
            <ContactForm />
          </Suspense>
        </div>

        <aside className={styles.info} aria-label="Contact details">
          <ul role="list" className={styles.details}>
            <li>
              <span className={styles.icon}><Mail size={20} aria-hidden="true" /></span>
              <div>
                <h3>Email</h3>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </div>
            </li>
            <li>
              <span className={styles.icon}><Phone size={20} aria-hidden="true" /></span>
              <div>
                <h3>Phone</h3>
                <a href={`tel:${SITE.phone.replace(/[^+\d]/g, '')}`}>{SITE.phone}</a>
              </div>
            </li>
            <li>
              <span className={styles.icon}><MapPin size={20} aria-hidden="true" /></span>
              <div>
                <h3>Address</h3>
                <p>{SITE.address}</p>
              </div>
            </li>
            <li>
              <span className={styles.icon}><Clock size={20} aria-hidden="true" /></span>
              <div>
                <h3>Office hours</h3>
                <p>Monday – Friday, 9:00 AM – 6:00 PM</p>
                <p>Saturday, 10:00 AM – 2:00 PM</p>
              </div>
            </li>
          </ul>

          <div className={styles.social}>
            <h3>Follow along</h3>
            <ul role="list">
              {SOCIALS.map(({ label, icon: Icon, href }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                    <Icon size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <p className={styles.note}>ESTATE is a demo project: the address, phone number and email above are placeholders, and no messages are delivered.</p>
        </aside>
      </div>
    </>
  );
}
