'use client';

import { useMemo, useState } from 'react';
import { Search, SearchX } from 'lucide-react';
import { AGENTS, SPECIALTIES } from '@/data/agents';
import { CITIES } from '@/data/locations';
import { PROPERTIES } from '@/data/properties';
import { useDebounce } from '@/hooks/useDebounce';
import Select from '@/components/common/Select';
import EmptyState from '@/components/common/EmptyState';
import AgentCard from './AgentCard';
import styles from './AgentDirectory.module.scss';

const EXPERIENCE = [
  { value: '', label: 'Any experience' },
  { value: '5', label: '5+ years' },
  { value: '10', label: '10+ years' },
  { value: '15', label: '15+ years' },
];

const SORTS = [
  { value: 'rating', label: 'Top rated' },
  { value: 'experience', label: 'Most experienced' },
  { value: 'listings', label: 'Most listings' },
  { value: 'name', label: 'Name A–Z' },
];

export default function AgentDirectory() {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [experience, setExperience] = useState('');
  const [sort, setSort] = useState('rating');
  const q = useDebounce(query, 250).trim().toLowerCase();

  const listingCount = useMemo(
    () => Object.fromEntries(AGENTS.map((a) => [a.id, PROPERTIES.filter((p) => p.agentId === a.id).length])),
    []
  );

  const results = useMemo(() => {
    const list = AGENTS.filter((a) => {
      if (city && a.city !== city) return false;
      if (specialty && !a.specialties.includes(specialty)) return false;
      if (experience && a.experience < Number(experience)) return false;
      if (q && !`${a.name} ${a.role} ${a.city} ${a.areas.join(' ')} ${a.specialties.join(' ')}`.toLowerCase().includes(q)) return false;
      return true;
    });
    const by = {
      rating: (a, b) => b.rating - a.rating || b.reviews - a.reviews,
      experience: (a, b) => b.experience - a.experience,
      listings: (a, b) => listingCount[b.id] - listingCount[a.id],
      name: (a, b) => a.name.localeCompare(b.name),
    };
    return [...list].sort(by[sort]);
  }, [q, city, specialty, experience, sort, listingCount]);

  const reset = () => {
    setQuery('');
    setCity('');
    setSpecialty('');
    setExperience('');
  };

  return (
    <div className="container" style={{ paddingBlock: 32 }}>
      <form className={styles.filters} role="search" aria-label="Filter agents" onSubmit={(e) => e.preventDefault()}>
        <div className={styles.search}>
          <Search size={18} aria-hidden="true" />
          <label htmlFor="agent-search" className="visually-hidden">
            Search agents
          </label>
          <input id="agent-search" type="search" placeholder="Search by name, area or specialty" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <Select label="Location" hideLabel value={city} onChange={(e) => setCity(e.target.value)} placeholder="All locations" options={CITIES.map((c) => ({ value: c.name, label: c.name }))} />
        <Select label="Specialty" hideLabel value={specialty} onChange={(e) => setSpecialty(e.target.value)} placeholder="All specialties" options={SPECIALTIES.map((s) => ({ value: s, label: s }))} />
        <Select label="Experience" hideLabel value={experience} onChange={(e) => setExperience(e.target.value)} options={EXPERIENCE} />
        <Select label="Sort agents" hideLabel value={sort} onChange={(e) => setSort(e.target.value)} options={SORTS} />
      </form>

      <p className={styles.count} role="status" aria-live="polite">
        {results.length} {results.length === 1 ? 'agent' : 'agents'}
      </p>

      {results.length === 0 ? (
        <EmptyState icon={SearchX} title="No agents match" text="Try a different location, specialty or search term." action={{ label: 'Reset filters', onClick: reset }} />
      ) : (
        <ul className={styles.grid} role="list">
          {results.map((a) => (
            <li key={a.id}>
              <AgentCard agent={a} detailed />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
