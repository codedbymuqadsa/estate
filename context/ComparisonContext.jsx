'use client';

import { createContext, useCallback, useContext, useMemo } from 'react';
import { COMPARE_LIMIT, STORAGE_KEYS } from '@/lib/constants';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useUI } from '@/context/UIContext';

const ComparisonContext = createContext(null);

export function ComparisonProvider({ children }) {
  const [ids, setIds, hydrated] = useLocalStorage(STORAGE_KEYS.compare, []);
  const { showToast } = useUI();

  const isInCompare = useCallback((id) => ids.includes(id), [ids]);

  const toggle = useCallback(
    (property) => {
      if (ids.includes(property.id)) {
        setIds((list) => list.filter((x) => x !== property.id));
        showToast(`Removed “${property.title}” from comparison`, { type: 'info' });
      } else if (ids.length >= COMPARE_LIMIT) {
        showToast(`You can compare up to ${COMPARE_LIMIT} properties. Remove one to add another.`, { type: 'error' });
      } else {
        setIds((list) => [...list, property.id]);
        showToast(`Added “${property.title}” to comparison`);
      }
    },
    [ids, setIds, showToast]
  );

  const remove = useCallback(
    (id) => setIds((list) => list.filter((x) => x !== id)),
    [setIds]
  );
  const clear = useCallback(() => setIds([]), [setIds]);

  const value = useMemo(
    () => ({ ids, count: ids.length, limit: COMPARE_LIMIT, isInCompare, toggle, remove, clear, hydrated }),
    [ids, isInCompare, toggle, remove, clear, hydrated]
  );

  return <ComparisonContext.Provider value={value}>{children}</ComparisonContext.Provider>;
}

export function useComparison() {
  const ctx = useContext(ComparisonContext);
  if (!ctx) throw new Error('useComparison must be used within ComparisonProvider');
  return ctx;
}
