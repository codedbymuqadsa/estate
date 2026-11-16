import { PAGE_SIZE } from './constants';

export const DEFAULT_FILTERS = {
  type: '',
  ptype: '',
  city: '',
  hood: '',
  min: '',
  max: '',
  beds: '',
  baths: '',
  amin: '',
  amax: '',
  amen: [],
  q: '',
  sort: 'recommended',
  view: 'grid',
  page: 1,
};

const num = (v) => (v === '' || v == null || Number.isNaN(Number(v)) ? null : Number(v));

/** Reads a URLSearchParams-like object into a normalised filters object. */
export function parseFilters(params) {
  const get = (k) => params.get(k) || '';
  return {
    type: get('type'),
    ptype: get('ptype'),
    city: get('city'),
    hood: get('hood'),
    min: get('min'),
    max: get('max'),
    beds: get('beds'),
    baths: get('baths'),
    amin: get('amin'),
    amax: get('amax'),
    amen: get('amen') ? get('amen').split(',').filter(Boolean) : [],
    q: get('q'),
    sort: get('sort') || DEFAULT_FILTERS.sort,
    view: get('view') === 'list' ? 'list' : 'grid',
    page: Math.max(1, parseInt(get('page'), 10) || 1),
  };
}

/** Serialises filters, omitting defaults so URLs stay clean. */
export function filtersToQuery(filters) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      if (value.length) params.set(key, value.join(','));
    } else if (value !== '' && value != null && value !== DEFAULT_FILTERS[key]) {
      params.set(key, String(value));
    }
  });
  return params.toString();
}

export function filterProperties(properties, f) {
  const min = num(f.min);
  const max = num(f.max);
  const amin = num(f.amin);
  const amax = num(f.amax);
  const beds = num(f.beds);
  const baths = num(f.baths);
  const q = f.q.trim().toLowerCase();

  return properties.filter((p) => {
    if (f.type && p.listingType !== f.type) return false;
    if (f.ptype && p.propertyType !== f.ptype) return false;
    if (f.city && p.city !== f.city) return false;
    if (f.hood && p.neighborhood !== f.hood) return false;
    if (min !== null && p.price < min) return false;
    if (max !== null && p.price > max) return false;
    if (beds !== null && p.bedrooms < beds) return false;
    if (baths !== null && p.bathrooms < baths) return false;
    if (amin !== null && p.area < amin) return false;
    if (amax !== null && p.area > amax) return false;
    if (f.amen.length && !f.amen.every((a) => p.amenities.includes(a))) return false;
    if (q) {
      const hay = `${p.title} ${p.city} ${p.neighborhood} ${p.address} ${p.propertyType} ${p.subtype}`.toLowerCase();
      if (!q.split(/\s+/).every((word) => hay.includes(word))) return false;
    }
    return true;
  });
}

export function sortProperties(list, sort) {
  const copy = [...list];
  switch (sort) {
    case 'price-asc':
      return copy.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return copy.sort((a, b) => b.price - a.price);
    case 'newest':
      return copy.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    case 'area-desc':
      return copy.sort((a, b) => b.area - a.area);
    default:
      // Recommended: featured first, then newest.
      return copy.sort(
        (a, b) => Number(b.featured) - Number(a.featured) || new Date(b.dateAdded) - new Date(a.dateAdded)
      );
  }
}

export function paginate(list, page, size = PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(list.length / size));
  const current = Math.min(page, totalPages);
  return { items: list.slice((current - 1) * size, current * size), page: current, totalPages };
}

export function countActiveFilters(f) {
  const keys = ['type', 'ptype', 'city', 'hood', 'min', 'max', 'beds', 'baths', 'amin', 'amax', 'q'];
  return keys.filter((k) => f[k] !== '').length + f.amen.length;
}
