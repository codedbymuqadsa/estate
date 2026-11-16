import SectionHeading from './SectionHeading';
import styles from './HowItWorks.module.scss';

const STEPS = [
  { n: '01', title: 'Discover', text: 'Search by city, type, price and amenities, or explore the map to see what’s nearby.' },
  { n: '02', title: 'Compare', text: 'Add up to four properties to a side-by-side table that highlights real differences.' },
  { n: '03', title: 'Connect', text: 'Send an inquiry or talk to the listing agent to ask the questions that matter.' },
  { n: '04', title: 'Move In', text: 'Schedule a visit, decide with confidence and begin your next chapter.' },
];

export default function HowItWorks() {
  return (
    <section className={styles.section} aria-labelledby="how-h">
      <div className="container">
        <SectionHeading id="how-h" eyebrow="How it works" title="From first search to front door" align="center" />
        <ol className={styles.steps}>
          {STEPS.map((s) => (
            <li key={s.n} className={styles.step}>
              <span className={styles.num}>{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
