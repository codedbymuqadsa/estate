'use client';

import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import ToastViewport from '@/components/common/Toast';
import ConfirmDialog from '@/components/common/ConfirmDialog';

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [confirmState, setConfirmState] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const idRef = useRef(0);

  const dismissToast = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message, { type = 'success', duration = 3800 } = {}) => {
      const id = ++idRef.current;
      setToasts((list) => [...list.slice(-3), { id, message, type }]);
      if (duration) setTimeout(() => dismissToast(id), duration);
      return id;
    },
    [dismissToast]
  );

  /** Opens a confirmation dialog. `onConfirm` runs only if the user accepts. */
  const confirm = useCallback((options) => setConfirmState(options), []);
  const closeConfirm = useCallback(() => setConfirmState(null), []);

  const value = useMemo(
    () => ({ showToast, dismissToast, confirm, menuOpen, setMenuOpen }),
    [showToast, dismissToast, confirm, menuOpen]
  );

  return (
    <UIContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismissToast} />
      <ConfirmDialog state={confirmState} onClose={closeConfirm} />
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used within UIProvider');
  return ctx;
}
