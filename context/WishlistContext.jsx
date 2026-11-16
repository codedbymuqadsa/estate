'use client';

import { createContext, useCallback, useContext, useMemo } from 'react';
import { STORAGE_KEYS } from '@/lib/constants';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useUI } from '@/context/UIContext';

const WishlistContext = createContext(null);

/** Wishlist entries are `{ id, savedAt }` so saved properties can be sorted by date. */
export function WishlistProvider({ children }) {
  const [items, setItems, hydrated] = useLocalStorage(STORAGE_KEYS.wishlist, []);
  const { showToast } = useUI();

  const ids = useMemo(() => new Set(items.map((i) => i.id)), [items]);
  const isSaved = useCallback((id) => ids.has(id), [ids]);

  const toggle = useCallback(
    (property) => {
      const saved = ids.has(property.id);
      setItems((list) =>
        saved ? list.filter((i) => i.id !== property.id) : [{ id: property.id, savedAt: new Date().toISOString() }, ...list]
      );
      showToast(saved ? `Removed “${property.title}” from saved` : `Saved “${property.title}”`, {
        type: saved ? 'info' : 'success',
      });
    },
    [ids, setItems, showToast]
  );

  const remove = useCallback(
    (property) => {
      setItems((list) => list.filter((i) => i.id !== property.id));
      showToast(`Removed “${property.title}” from saved`, { type: 'info' });
    },
    [setItems, showToast]
  );

  const clear = useCallback(() => setItems([]), [setItems]);

  const value = useMemo(
    () => ({ items, count: items.length, isSaved, toggle, remove, clear, hydrated }),
    [items, isSaved, toggle, remove, clear, hydrated]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
