'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { LISTING_TYPES, PRICE_PRESETS, PROPERTY_TYPES } from '@/lib/constants';
import { CITIES } from '@/data/locations';
import Tabs from '@/components/common/Tabs';
import Select from '@/components/common/Select';
import Button from '@/components/common/Button';
import styles from './SearchPanel.module.scss';

const TYPES_BY_TAB = {
  buy: ['apartment', 'house', 'villa', 'penthouse', 'townhouse', 'land'],
  rent: ['apartment', 'house', 'villa', 'penthouse', 'townhouse'],
  commercial: ['office'],
};

/** Hero search: builds a /properties URL from the chosen criteria. */
export default function SearchPanel() {
  const router = useRouter();
  const [tab, setTab] = useState('buy');
  const [city, setCity] = useState('');
  const [ptype, setPtype] = useState('');
  const [priceIdx, setPriceIdx] = useState('0');

  const changeTab = (next) => {
    setTab(next);
    setPtype('');
    setPriceIdx('0');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const preset = PRICE_PRESETS[tab][Number(priceIdx)];
    const params = new URLSearchParams({ type: tab });
    if (city) params.set('city', city);
    if (ptype) params.set('ptype', ptype);
    if (preset?.min) params.set('min', preset.min);
    if (preset?.max) params.set('max', preset.max);
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className={styles.panel}>
      <Tabs variant="glass" label="Search type" value={tab} onChange={changeTab} tabs={LISTING_TYPES} />
      <form onSubmit={onSubmit} className={styles.form} aria-label="Property search">
        <Select
          label="Location"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Any city"
          options={CITIES.map((c) => ({ value: c.name, label: `${c.name}, ${c.country}` }))}
        />
        <Select
          label="Property type"
          value={ptype}
          onChange={(e) => setPtype(e.target.value)}
          placeholder="Any type"
          options={PROPERTY_TYPES.filter((t) => TYPES_BY_TAB[tab].includes(t.value)).map((t) => ({ value: t.value, label: t.label }))}
        />
        <Select
          label={tab === 'buy' ? 'Price range' : 'Monthly price'}
          value={priceIdx}
          onChange={(e) => setPriceIdx(e.target.value)}
          options={PRICE_PRESETS[tab].map((p, i) => ({ value: String(i), label: p.label }))}
        />
        <Button type="submit" size="lg" icon={Search} className={styles.submit}>
          Search Properties
        </Button>
      </form>
    </div>
  );
}
