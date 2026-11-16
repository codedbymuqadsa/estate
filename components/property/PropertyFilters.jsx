'use client';

import { useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { AMENITIES, BATHROOM_OPTIONS, BEDROOM_OPTIONS, PROPERTY_TYPES } from '@/lib/constants';
import { CITIES, getNeighborhoodsByCity } from '@/data/locations';
import Button from '@/components/common/Button';
import Select from '@/components/common/Select';
import { Input } from '@/components/common/Input';
import styles from './PropertyFilters.module.scss';

function PillGroup({ legend, options, value, onChange }) {
  return (
    <fieldset className={styles.group}>
      <legend className={styles.legend}>{legend}</legend>
      <div className={styles.pills}>
        {options.map((o) => (
          <label key={o.value || 'any'} className={`${styles.pill} ${value === o.value ? styles.pillOn : ''}`}>
            <input
              type="radio"
              name={legend}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="visually-hidden"
            />
            {o.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/**
 * Filter form with a local draft. The parent remounts it (via `key`) whenever the
 * applied filters change from elsewhere, so the draft never drifts out of sync.
 */
export default function PropertyFilters({ applied, onApply, onClear, onClose }) {
  const [draft, setDraft] = useState(applied);
  const set = (patch) => setDraft((d) => ({ ...d, ...patch }));

  const neighborhoods = useMemo(() => (draft.city ? getNeighborhoodsByCity(draft.city) : []), [draft.city]);

  const toggleAmenity = (value) =>
    set({ amen: draft.amen.includes(value) ? draft.amen.filter((a) => a !== value) : [...draft.amen, value] });

  const submit = (e) => {
    e.preventDefault();
    onApply(draft);
  };

  const priceUnit = draft.type === 'rent' ? 'per month' : draft.type === 'commercial' ? 'per month for leases' : 'USD';

  return (
    <form onSubmit={submit} className={styles.form} aria-label="Property filters">
      <div className={styles.head}>
        <h2 className={styles.title}>Filters</h2>
        {onClose && (
          <button type="button" onClick={onClose} className={styles.closeBtn} aria-label="Close filters">
            <X size={22} />
          </button>
        )}
      </div>

      <div className={styles.scroll}>
        <Select
          label="Property type"
          value={draft.ptype}
          onChange={(e) => set({ ptype: e.target.value })}
          placeholder="All types"
          options={PROPERTY_TYPES.map((t) => ({ value: t.value, label: t.label }))}
        />

        <Select
          label="City"
          value={draft.city}
          onChange={(e) => set({ city: e.target.value, hood: '' })}
          placeholder="All cities"
          options={CITIES.map((c) => ({ value: c.name, label: c.name }))}
        />

        <Select
          label="Neighborhood"
          value={draft.hood}
          onChange={(e) => set({ hood: e.target.value })}
          placeholder={draft.city ? 'All neighborhoods' : 'Select a city first'}
          disabled={!draft.city}
          options={neighborhoods.map((n) => ({ value: n, label: n }))}
        />

        <fieldset className={styles.group}>
          <legend className={styles.legend}>Price range ({priceUnit})</legend>
          <div className={styles.pair}>
            <Input label="Min" type="number" min="0" inputMode="numeric" placeholder="No min" value={draft.min} onChange={(e) => set({ min: e.target.value })} />
            <Input label="Max" type="number" min="0" inputMode="numeric" placeholder="No max" value={draft.max} onChange={(e) => set({ max: e.target.value })} />
          </div>
        </fieldset>

        <PillGroup legend="Bedrooms" options={BEDROOM_OPTIONS} value={draft.beds} onChange={(v) => set({ beds: v })} />
        <PillGroup legend="Bathrooms" options={BATHROOM_OPTIONS} value={draft.baths} onChange={(v) => set({ baths: v })} />

        <fieldset className={styles.group}>
          <legend className={styles.legend}>Area (sq ft)</legend>
          <div className={styles.pair}>
            <Input label="Min" type="number" min="0" inputMode="numeric" placeholder="No min" value={draft.amin} onChange={(e) => set({ amin: e.target.value })} />
            <Input label="Max" type="number" min="0" inputMode="numeric" placeholder="No max" value={draft.amax} onChange={(e) => set({ amax: e.target.value })} />
          </div>
        </fieldset>

        <fieldset className={styles.group}>
          <legend className={styles.legend}>Amenities</legend>
          <div className={styles.checks}>
            {AMENITIES.map((a) => (
              <label key={a.value} className={styles.check}>
                <input type="checkbox" checked={draft.amen.includes(a.value)} onChange={() => toggleAmenity(a.value)} />
                <span>{a.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className={styles.footer}>
        <Button variant="ghost" onClick={onClear}>
          Clear all
        </Button>
        <Button type="submit" fullWidth>
          Apply filters
        </Button>
      </div>
    </form>
  );
}
