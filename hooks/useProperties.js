'use client';

import { useMemo } from 'react';
import { usePropertyContext } from '@/context/PropertyContext';
import { filterProperties, sortProperties } from '@/lib/filters';

/**
 * Derives filtered + sorted properties from a filters object.
 * Nothing is stored: the result is recomputed only when inputs change.
 */
export function useProperties(filters) {
  const { properties } = usePropertyContext();
  return useMemo(() => {
    if (!filters) return properties;
    return sortProperties(filterProperties(properties, filters), filters.sort);
  }, [properties, filters]);
}
