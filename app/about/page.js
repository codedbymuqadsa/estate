import Image from 'next/image';
import { Eye, HeartHandshake, Lightbulb, Scale, Target } from 'lucide-react';
import { PROPERTIES } from '@/data/properties';
import { AGENTS } from '@/data/agents';
import { CITIES } from '@/data/locations';
import { ABOUT_IMAGE, img } from '@/lib/images';
import { initials } from '@/lib/formatters';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Button from '@/components/common/Button';
import HowItWorks from '@/components/home/HowItWorks';
import FinalCTA from '@/components/home/FinalCTA';
import styles from './page.module.scss';

export const metadata = {
  title: 'About',
  description: 'ESTATE is a premium property discovery platform concept. Learn about our story, mission, values and the people behind this demo.',
};

const VALUES = [
  { icon: Scale, title: 'Clarity', text: 'Plain language, honest numbers and layouts that make comparison effortless.' },
  { icon: HeartHandshake, title: 'Trust', text: 'We design for confidence: transparent labels, clear states and no dark patterns.' },
  { icon: Lightbulb, title: 'Craft', text: 'Details matter: from typography to the way a gallery swipes on a phone.' },
  { icon: Eye, title: 'Respect', text: 'Your shortlist is yours. In this demo, it never leaves your browser.' },
];

const TEAM = [
  { name: 'Amara Lindqvist', role: 'Founder & CEO' },
  { name: 'Theo Park', role: 'Head of Design' },
  { name: 'Rahim Siddiqui', role: 'Head of Engineering' },
  { name: 'Clara Ibáñez', role: 'Head of Partnerships' },
];

export default function AboutPage() {
  const stats = [
    { value: PROPERTIES.length, label: 'Demo listings' },
    { value: CITIES.length, label: 'Cities' },
    { value: AGENTS.length, label: 'Demo agents' },
    { value: '4', label: 'Properties to compare at once' },
  ];

  return (
    <>
      <section className={styles.hero}>
        <Image src={ABOUT_IMAGE} alt="" fill priority sizes="100vw" className={styles.heroImg} />
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>
          <Breadcrumbs light items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
          <p className={styles.eyebrow}>About ESTATE</p>
          <h1>Property search, reimagined with care.</h1>
          <p className={styles.heroText}>ESTATE is a concept for a premium digital marketplace, designed for buyers, renters and investors who value clarity.</p>
        </div>
      </section>

      <section className={`container ${styles.story}`} aria-labelledby="story-h">
        <div>
          <p className={styles.kicker}>Our story</p>
          <h2 id="story-h">We wanted house hunting to feel like discovery, not a chore.</h2>
        </div>
        <div className={styles.storyText}>
          <p>
            Most property portals bury great homes under clutter. ESTATE began as a question: what if searching for a home felt as considered as the
            homes themselves? We started with large photography, calm typography and tools that respect your time.
          </p>
          <p>
            ESTATE is a frontend portfolio demo. Every listing, agent and testimonial is fictional, and everything you save lives in your own
            browser. It exists to show what a thoughtful property experience can be.
          </p>
        </div>
      </section>

      <section className={styles.mv} aria-label="Mission and vision">
        <div className="container">
          <div className={styles.mvGrid}>
            <article>
              <Target size={28} aria-hidden="true" />
              <h2>Mission</h2>
              <p>Help people find a place that fits their life by making discovery clear, comparable and enjoyable.</p>
            </article>
            <article>
              <Eye size={28} aria-hidden="true" />
              <h2>Vision</h2>
              <p>A world where every property search starts with confidence, and ends with the right address.</p>
            </article>
          </div>
        </div>
      </section>

      <section className={`container ${styles.values}`} aria-labelledby="values-h">
        <p className={styles.kicker}>Core values</p>
        <h2 id="values-h">What guides the work</h2>
        <ul role="list" className={styles.valueGrid}>
          {VALUES.map(({ icon: Icon, title, text }) => (
            <li key={title}>
              <span className={styles.vIcon}><Icon size={24} aria-hidden="true" /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <HowItWorks />

      <section className={styles.stats} aria-label="ESTATE in numbers">
        <div className="container">
          <ul role="list">
            {stats.map((s) => (
              <li key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`container ${styles.team}`} aria-labelledby="team-h">
        <p className={styles.kicker}>The team</p>
        <h2 id="team-h">The people behind the demo</h2>
        <p className={styles.teamNote}>Fictional team members created for this portfolio project.</p>
        <ul role="list" className={styles.teamGrid}>
          {TEAM.map((m) => (
            <li key={m.name}>
              <span className={styles.avatar} aria-hidden="true">{initials(m.name)}</span>
              <h3>{m.name}</h3>
              <p>{m.role}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={`container ${styles.gallery}`} aria-hidden="true">
        {['ext13', 'liv74', 'ext28'].map((k) => (
          <div key={k} className={styles.shot}>
            <Image src={img(k, 900)} alt="" fill sizes="(max-width: 820px) 100vw, 33vw" />
          </div>
        ))}
      </section>

      <FinalCTA />
      <div className="container" style={{ textAlign: 'center', marginTop: -24 }}>
        <Button href="/contact" variant="outline">
          Get in touch
        </Button>
      </div>
    </>
  );
}
