import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { SITE, PROPERTY_TYPES } from '@/lib/constants';
import Newsletter from './Newsletter';
import styles from './Footer.module.scss';

const SOCIALS = [
  { label: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  { label: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
  { label: 'X (Twitter)', icon: Twitter, href: 'https://x.com' },
  { label: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
];

export default function Footer() {
  const categories = PROPERTY_TYPES.filter((t) => t.value !== 'land').map((t) => ({
    label: t.plural,
    href: `/properties?ptype=${t.value}`,
  }));

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <p className={styles.logo}>ESTATE</p>
            <p className={styles.tagline}>{SITE.tagline}</p>
            <p className={styles.small}>A premium property discovery demo. All listings, agents and prices are fictional.</p>
            <ul className={styles.socials} role="list">
              {SOCIALS.map(({ label, icon: Icon, href }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                    <Icon size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Explore" className={styles.col}>
            <h2 className={styles.heading}>Explore</h2>
            <ul role="list">
              <li><Link href="/properties">All Properties</Link></li>
              <li><Link href="/map">Map Search</Link></li>
              <li><Link href="/agents">Our Agents</Link></li>
              <li><Link href="/saved">Saved Properties</Link></li>
              <li><Link href="/compare">Compare</Link></li>
              <li><Link href="/schedule-visit">Schedule a Visit</Link></li>
            </ul>
          </nav>

          <nav aria-label="Property categories" className={styles.col}>
            <h2 className={styles.heading}>Categories</h2>
            <ul role="list">
              {categories.map((c) => (
                <li key={c.href}><Link href={c.href}>{c.label}</Link></li>
              ))}
            </ul>
          </nav>

          <div className={styles.col}>
            <h2 className={styles.heading}>Contact</h2>
            <ul role="list" className={styles.contact}>
              <li><MapPin size={16} aria-hidden="true" /> {SITE.address}</li>
              <li><Phone size={16} aria-hidden="true" /> <a href={`tel:${SITE.phone.replace(/[^+\d]/g, '')}`}>{SITE.phone}</a></li>
              <li><Mail size={16} aria-hidden="true" /> <a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            </ul>
          </div>

          <div className={`${styles.col} ${styles.news}`}>
            <h2 className={styles.heading}>Newsletter</h2>
            <p className={styles.small}>New listings and market notes, once a month. Demo form — nothing is sent.</p>
            <Newsletter />
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} ESTATE. A frontend portfolio demo.</p>
          <ul role="list" className={styles.legal}>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/dashboard">Dashboard</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
