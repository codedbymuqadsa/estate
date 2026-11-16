import { format, parseISO, isValid } from 'date-fns';

export function formatPrice(property) {
  if (!property) return '';
  const amount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: property.currency || 'USD',
    maximumFractionDigits: 0,
  }).format(property.price);
  return property.priceUnit ? `${amount}/mo` : amount;
}

export function formatCompactPrice(property) {
  const n = property.price;
  let s;
  if (n >= 1_000_000) s = `$${parseFloat((n / 1_000_000).toFixed(2))}M`;
  else if (n >= 1000) s = `$${Math.round(n / 1000)}K`;
  else s = `$${n}`;
  return property.priceUnit ? `${s}/mo` : s;
}

export function formatArea(area) {
  return `${new Intl.NumberFormat('en-US').format(area)} sq ft`;
}

export function formatDate(value, pattern = 'MMM d, yyyy') {
  if (!value) return '';
  const date = typeof value === 'string' ? parseISO(value) : value;
  return isValid(date) ? format(date, pattern) : '';
}

export function formatNumber(n) {
  return new Intl.NumberFormat('en-US').format(n);
}

export function generateReference(prefix = 'EST') {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `${prefix}-${new Date().getFullYear()}-${rand}`;
}

export function slugify(str) {
  return String(str)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function initials(name) {
  return String(name)
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const PHONE_RE = /^[+()\-\s\d]{7,20}$/;
