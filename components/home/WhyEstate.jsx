import { BadgeCheck, Compass, Gem, ListChecks } from 'lucide-react';
import SectionHeading from './SectionHeading';
import styles from './WhyEstate.module.scss';

const ITEMS = [
  {
    icon: Gem,
    title: 'Curated Properties',
    text: 'Every listing in this demo is written and photographed to a consistent standard, so comparisons feel fair.',
  },
  {
    icon: BadgeCheck,
    title: 'Verified Listing Demo Labels',
    text: 'Listings carry demo labels to show how a verification badge would look. No real third-party verification takes place.',
  },
  {
    icon: Compass,
    title: 'Smart Discovery',
    text: 'Combine filters, keyword search and a live map to narrow hundreds of possibilities to a handful that fit.',
  },
  {
    icon: ListChecks,
    title: 'Personalized Shortlists',
    text: 'Save favourites, compare up to four homes side by side and revisit them any time. Stored privately in your browser.',
  },
];

export default function WhyEstate() {
  return (
    <section className={styles.section} aria-labelledby="why-h">
      <div className="container">
        <SectionHeading
          id="why-h"
          eyebrow="Why ESTATE"
          title="A calmer way to find a home"
          text="Tools designed to cut through the noise of property search."
          light
        />
        <ul className={styles.grid} role="list">
          {ITEMS.map(({ icon: Icon, title, text }) => (
            <li key={title} className={styles.item}>
              <span className={styles.icon}>
                <Icon size={26} aria-hidden="true" />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
