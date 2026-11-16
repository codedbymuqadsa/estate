'use client';

import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import InquiryForm from '@/components/forms/InquiryForm';

/** Opens a dialog containing the agent inquiry form. */
export default function ContactAgentButton({ agent, variant = 'outline', size = 'sm', label = 'Contact', fullWidth = false }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant={variant} size={size} icon={MessageSquare} onClick={() => setOpen(true)} fullWidth={fullWidth}>
        {label}
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title={`Contact ${agent.name}`} size="sm">
        <InquiryForm agent={agent} title="Send a message" />
      </Modal>
    </>
  );
}
