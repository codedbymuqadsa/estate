'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const SYNC_EVENT = 'estate:storage-sync';

function readStorage(key, fallback) {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

/**
 * localStorage-backed state that is safe for SSR / hydration.
 *
 * - The first render always uses `initialValue`, so server and client markup match.
 * - The stored value is read after mount; `hydrated` flips to true when that is done.
 * - Every hook instance using the same key stays in sync within the tab (and across tabs).
 *
 * @returns {[any, (value: any | ((prev: any) => any)) => void, boolean]}
 */
export function useLocalStorage(key, initialValue) {
  const initialRef = useRef(initialValue);
  const [value, setValue] = useState(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setValue(readStorage(key, initialRef.current));
    setHydrated(true);

    const onSync = (event) => {
      if (event.detail?.key === key) setValue(readStorage(key, initialRef.current));
    };
    const onStorage = (event) => {
      if (event.key === key) setValue(readStorage(key, initialRef.current));
    };
    window.addEventListener(SYNC_EVENT, onSync);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener(SYNC_EVENT, onSync);
      window.removeEventListener('storage', onStorage);
    };
  }, [key]);

  const update = useCallback(
    (next) => {
      const current = readStorage(key, initialRef.current);
      const resolved = typeof next === 'function' ? next(current) : next;
      try {
        window.localStorage.setItem(key, JSON.stringify(resolved));
      } catch {
        // Storage may be full or blocked; keep in-memory state working regardless.
      }
      setValue(resolved);
      window.dispatchEvent(new CustomEvent(SYNC_EVENT, { detail: { key } }));
    },
    [key]
  );

  return [value, update, hydrated];
}
