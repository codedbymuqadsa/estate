import Image from 'next/image';
import { Award, Building2, Globe2, Mail, MapPin, Phone, Star } from 'lucide-react';
import { getPropertiesByAgent } from '@/data/properties';
import { TESTIMONIALS } from '@/data/testimonials';
import { initials } from '@/lib/formatters';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';
import PropertyGrid from '@/components/property/PropertyGrid';
import InquiryForm from '@/components/forms/InquiryForm';
import styles from './AgentProfile.module.scss';

export default function AgentProfile({ agent }) {
  const listings = getPropertiesByAgent(agent.id);
  const testimonials = TESTIMONIALS.filter((t) => t.agentId === agent.id);

  return (
    <div className="container">
      <div className={styles.crumbs}>
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Agents', href: '/agents' }, { label: agent.name }]} />
      </div>

      <div className={styles.layout}>
        <div className={styles.main}>
          <header className={styles.hero}>
            <div className={styles.photo}>
              <Image src={agent.image} alt={`Portrait of ${agent.name}`} fill sizes="(max-width: 820px) 100vw, 320px" priority />
            </div>
            <div className={styles.intro}>
              <Badge variant="blue">{agent.city}</Badge>
              <h1 className={styles.name}>{agent.name}</h1>
              <p className={styles.role}>{agent.role}</p>
              <p className={styles.rating}>
                <Star size={16} fill="currentColor" aria-hidden="true" />
                <strong>{agent.rating}</strong>
                <span>{agent.reviews} demo reviews</span>
              </p>
              <ul className={styles.stats} role="list">
                <li><Award size={18} aria-hidden="true" /> <span><strong>{agent.experience}</strong> years experience</span></li>
                <li><Building2 size={18} aria-hidden="true" /> <span><strong>{listings.length}</strong> active listings</span></li>
                <li><Globe2 size={18} aria-hidden="true" /> <span>{agent.languages.join(', ')}</span></li>
              </ul>
              <div className={styles.cta}>
                <Button href={`tel:${agent.phone.replace(/[^+\d]/g, '')}`} icon={Phone}>Call</Button>
                <Button href={`mailto:${agent.email}`} variant="outline" icon={Mail}>Email</Button>
              </div>
            </div>
          </header>

          <section className={styles.section} aria-labelledby="about-h">
            <h2 id="about-h">About {agent.name.split(' ')[0]}</h2>
            <p className={styles.bio}>{agent.bio}</p>
            <div className={styles.cols}>
              <div>
                <h3>Areas served</h3>
                <ul className={styles.tags} role="list">
                  {agent.areas.map((a) => (
                    <li key={a}><MapPin size={13} aria-hidden="true" /> {a}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Specialties</h3>
                <ul className={styles.tags} role="list">
                  {agent.specialties.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
            <dl className={styles.contact}>
              <div><dt>Email</dt><dd><a href={`mailto:${agent.email}`}>{agent.email}</a></dd></div>
              <div><dt>Phone</dt><dd><a href={`tel:${agent.phone.replace(/[^+\d]/g, '')}`}>{agent.phone}</a></dd></div>
              <div><dt>Office</dt><dd>{agent.city}</dd></div>
            </dl>
          </section>

          <section className={styles.section} aria-labelledby="listings-h">
            <h2 id="listings-h">Listings by {agent.name.split(' ')[0]}</h2>
            {listings.length ? <PropertyGrid properties={listings} columns={2} /> : <p>No active listings right now.</p>}
          </section>

          <section className={styles.section} aria-labelledby="reviews-h">
            <h2 id="reviews-h">Client testimonials</h2>
            {testimonials.length ? (
              <ul className={styles.reviews} role="list">
                {testimonials.map((t) => (
                  <li key={t.id}>
                    <blockquote>“{t.quote}”</blockquote>
                    <p className={styles.by}>
                      <span className={styles.avatar} aria-hidden="true">{initials(t.name)}</span>
                      <span>
                        <strong>{t.name}</strong>
                        <small>{t.role}</small>
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No testimonials yet.</p>
            )}
            <p className={styles.disclaimer}>Testimonials and ratings are fictional and written for this demo.</p>
          </section>
        </div>

        <aside className={styles.side} id="contact" aria-label={`Contact ${agent.name}`}>
          <div className={styles.formCard}>
            <InquiryForm agent={agent} title={`Contact ${agent.name.split(' ')[0]}`} />
          </div>
        </aside>
      </div>
    </div>
  );
}
