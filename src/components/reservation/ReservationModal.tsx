'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { ReservationForm } from './ReservationForm';

interface ReservationModalProps {
  fieldId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ReservationModal({ fieldId, isOpen, onClose }: ReservationModalProps) {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSuccess = () => {
    setIsSuccess(true);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isSuccess ? 'Success!' : 'Book Your Slot'}>
      {isSuccess ? (
        <div>
          <p className="text-green-400">Your reservation has been successfully made!</p>
          <button onClick={onClose} className="mt-4 w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
            Close
          </button>
        </div>
      ) : (
        <ReservationForm fieldId={fieldId} onSuccess={handleSuccess} />
      )}
    </Modal>
  );
}
