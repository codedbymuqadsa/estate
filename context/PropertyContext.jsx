'use client';

import { createContext, useCallback, useContext, useMemo } from 'react';
import { PROPERTIES } from '@/data/properties';
import { AGENTS } from '@/data/agents';
import { STORAGE_KEYS } from '@/lib/constants';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const PropertyContext = createContext(null);
const RECENT_LIMIT = 8;

export function PropertyProvider({ children }) {
  const [recentIds, setRecentIds, hydrated] = useLocalStorage(STORAGE_KEYS.recent, []);

  const getProperty = useCallback((id) => PROPERTIES.find((p) => p.id === id), []);
  const getAgent = useCallback((id) => AGENTS.find((a) => a.id === id), []);

  const trackView = useCallback(
    (id) => {
      setRecentIds((ids) => [id, ...ids.filter((x) => x !== id)].slice(0, RECENT_LIMIT));
    },
    [setRecentIds]
  );

  const recentlyViewed = useMemo(
    () => recentIds.map((id) => PROPERTIES.find((p) => p.id === id)).filter(Boolean),
    [recentIds]
  );

  const value = useMemo(
    () => ({ properties: PROPERTIES, agents: AGENTS, getProperty, getAgent, trackView, recentlyViewed, hydrated }),
    [getProperty, getAgent, trackView, recentlyViewed, hydrated]
  );

  return <PropertyContext.Provider value={value}>{children}</PropertyContext.Provider>;
}

export function usePropertyContext() {
  const ctx = useContext(PropertyContext);
  if (!ctx) throw new Error('usePropertyContext must be used within PropertyProvider');
  return ctx;
}
