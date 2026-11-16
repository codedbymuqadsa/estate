'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { LayoutGrid, List, Search, SlidersHorizontal, SearchX, X } from 'lucide-react';
import { AMENITIES, LISTING_TYPES, PROPERTY_TYPES, SORT_OPTIONS, PAGE_SIZE } from '@/lib/constants';
import { DEFAULT_FILTERS, countActiveFilters, filterProperties, filtersToQuery, paginate, parseFilters } from '@/lib/filters';
import { formatNumber } from '@/lib/formatters';
import { useProperties } from '@/hooks/useProperties';
import { useDebounce } from '@/hooks/useDebounce';
import { usePropertyContext } from '@/context/PropertyContext';
import Tabs from '@/components/common/Tabs';
import Select from '@/components/common/Select';
import FilterChip from '@/components/common/FilterChip';
import Pagination from '@/components/common/Pagination';
import EmptyState from '@/components/common/EmptyState';
import PropertyFilters from './PropertyFilters';
import PropertyGrid from './PropertyGrid';
import styles from './PropertyBrowser.module.scss';

function KeywordSearch({ initial, onSearch }) {
  const [value, setValue] = useState(initial);
  const debounced = useDebounce(value, 350);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    onSearch(debounced);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  return (
    <div className={styles.search}>
      <Search size={18} aria-hidden="true" />
      <label htmlFor="keyword" className="visually-hidden">
        Search by keyword
      </label>
      <input
        id="keyword"
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search by title, city or neighborhood"
      />
    </div>
  );
}

function priceChip(min, max) {
  const f = (n) => `$${formatNumber(Number(n))}`;
  if (min && max) return `${f(min)} – ${f(max)}`;
  if (min) return `From ${f(min)}`;
  return `Up to ${f(max)}`;
}

export default function PropertyBrowser() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { properties } = usePropertyContext();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [resetToken, setResetToken] = useState(0);
  const resultsRef = useRef(null);

  const queryString = searchParams.toString();
  const filters = useMemo(() => parseFilters(new URLSearchParams(queryString)), [queryString]);
  const results = useProperties(filters);
  const { items, page, totalPages } = useMemo(() => paginate(results, filters.page), [results, filters.page]);
  const activeCount = countActiveFilters(filters);

  const navigate = useCallback(
    (next) => {
      const qs = filtersToQuery(next);
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname]
  );

  const update = useCallback(
    (patch, { keepPage = false } = {}) => navigate({ ...filters, ...patch, page: keepPage ? patch.page ?? filters.page : 1 }),
    [filters, navigate]
  );

  const clearAll = () => {
    navigate({ ...DEFAULT_FILTERS, sort: filters.sort, view: filters.view });
    setResetToken((t) => t + 1);
    setDrawerOpen(false);
  };

  const applyDraft = (draft) => {
    navigate({ ...filters, ...draft, q: filters.q, sort: filters.sort, view: filters.view, page: 1 });
    setDrawerOpen(false);
  };

  const goToPage = (p) => {
    update({ page: p }, { keepPage: true });
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Lock body scroll while the mobile drawer is open; close on Escape.
  useEffect(() => {
    if (!drawerOpen) return undefined;
    document.body.classList.add('no-scroll');
    const onKey = (e) => e.key === 'Escape' && setDrawerOpen(false);
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('no-scroll');
      document.removeEventListener('keydown', onKey);
    };
  }, [drawerOpen]);

  const chips = [];
  if (filters.q) chips.push({ key: 'q', label: `“${filters.q}”`, remove: () => { update({ q: '' }); setResetToken((t) => t + 1); } });
  if (filters.ptype) chips.push({ key: 'ptype', label: PROPERTY_TYPES.find((t) => t.value === filters.ptype)?.label || filters.ptype, remove: () => update({ ptype: '' }) });
  if (filters.city) chips.push({ key: 'city', label: filters.city, remove: () => update({ city: '', hood: '' }) });
  if (filters.hood) chips.push({ key: 'hood', label: filters.hood, remove: () => update({ hood: '' }) });
  if (filters.min || filters.max) chips.push({ key: 'price', label: priceChip(filters.min, filters.max), remove: () => update({ min: '', max: '' }) });
  if (filters.beds) chips.push({ key: 'beds', label: `${filters.beds}+ beds`, remove: () => update({ beds: '' }) });
  if (filters.baths) chips.push({ key: 'baths', label: `${filters.baths}+ baths`, remove: () => update({ baths: '' }) });
  if (filters.amin || filters.amax) {
    const label = filters.amin && filters.amax ? `${formatNumber(Number(filters.amin))}–${formatNumber(Number(filters.amax))} sq ft` : filters.amin ? `${formatNumber(Number(filters.amin))}+ sq ft` : `Up to ${formatNumber(Number(filters.amax))} sq ft`;
    chips.push({ key: 'area', label, remove: () => update({ amin: '', amax: '' }) });
  }
  filters.amen.forEach((a) =>
    chips.push({ key: `amen-${a}`, label: AMENITIES.find((x) => x.value === a)?.label || a, remove: () => update({ amen: filters.amen.filter((x) => x !== a) }) })
  );

  // Per-tab counts reflect every active filter except the listing type itself.
  const typeCounts = useMemo(() => {
    const pool = filterProperties(properties, { ...filters, type: '' });
    const counts = { '': pool.length };
    LISTING_TYPES.forEach((t) => {
      counts[t.value] = pool.filter((p) => p.listingType === t.value).length;
    });
    return counts;
  }, [properties, filters]);

  const from = results.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, results.length);

  return (
    <div className={`container ${styles.layout}`}>
      <div className={`${styles.drawer} ${drawerOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.backdrop} onClick={() => setDrawerOpen(false)} />
        <aside className={styles.sidebar} aria-label="Filters">
          <PropertyFilters
            key={queryString}
            applied={filters}
            onApply={applyDraft}
            onClear={clearAll}
            onClose={() => setDrawerOpen(false)}
          />
        </aside>
      </div>

      <section className={styles.results} ref={resultsRef} aria-label="Search results">
        <div className={styles.topbar}>
          <KeywordSearch key={resetToken} initial={filters.q} onSearch={(q) => q !== filters.q && update({ q })} />
          <button type="button" className={styles.filterBtn} onClick={() => setDrawerOpen(true)}>
            <SlidersHorizontal size={18} aria-hidden="true" />
            Filters{activeCount > 0 && <span className={styles.badge}>{activeCount}</span>}
          </button>
        </div>

        <div className={styles.tabsRow}>
          <Tabs
            label="Listing type"
            value={filters.type}
            onChange={(v) => update({ type: v })}
            tabs={[{ value: '', label: 'All' }, ...LISTING_TYPES].map((t) => ({ ...t, count: typeCounts[t.value] }))}
          />
        </div>

        {chips.length > 0 && (
          <div className={styles.chips} aria-label="Active filters">
            {chips.map((c) => (
              <FilterChip key={c.key} label={c.label} onRemove={c.remove} />
            ))}
            <button type="button" className={styles.clear} onClick={clearAll}>
              <X size={14} aria-hidden="true" /> Clear all
            </button>
          </div>
        )}

        <div className={styles.toolbar}>
          <p className={styles.count} role="status" aria-live="polite">
            {results.length === 0 ? (
              'No properties found'
            ) : (
              <>
                Showing <strong>{from}–{to}</strong> of <strong>{results.length}</strong> {results.length === 1 ? 'property' : 'properties'}
              </>
            )}
          </p>
          <div className={styles.controls}>
            <Select
              label="Sort by"
              hideLabel
              value={filters.sort}
              onChange={(e) => update({ sort: e.target.value }, { keepPage: false })}
              options={SORT_OPTIONS}
              className={styles.sort}
            />
            <div className={styles.view} role="group" aria-label="Layout">
              <button type="button" onClick={() => update({ view: 'grid' }, { keepPage: true })} aria-pressed={filters.view === 'grid'} aria-label="Grid view">
                <LayoutGrid size={18} />
              </button>
              <button type="button" onClick={() => update({ view: 'list' }, { keepPage: true })} aria-pressed={filters.view === 'list'} aria-label="List view">
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {results.length === 0 ? (
          <EmptyState
            icon={SearchX}
            title="No properties match your search"
            text="Try removing a filter, widening your price range or searching a different city."
            action={{ label: 'Clear all filters', onClick: clearAll }}
          />
        ) : (
          <>
            <PropertyGrid properties={items} layout={filters.view} columns={2} priorityCount={2} />
            <Pagination page={page} totalPages={totalPages} onChange={goToPage} />
          </>
        )}
      </section>
    </div>
  );
}
