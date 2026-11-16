'use client';

import Modal from './Modal';
import Button from './Button';

/**
 * @param {{title: string, message: string, confirmLabel?: string, danger?: boolean, onConfirm: () => void} | null} state
 */
export default function ConfirmDialog({ state, onClose }) {
  const handleConfirm = () => {
    state?.onConfirm?.();
    onClose();
  };

  return (
    <Modal
      open={Boolean(state)}
      onClose={onClose}
      title={state?.title}
      size="sm"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant={state?.danger ? 'dark' : 'primary'} onClick={handleConfirm}>
            {state?.confirmLabel || 'Confirm'}
          </Button>
        </>
      }
    >
      <p>{state?.message}</p>
    </Modal>
  );
}
