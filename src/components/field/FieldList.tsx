'use client';

import React, { useState } from 'react';
import { FieldCard, FieldCardProps } from './FieldCard';
import { ReservationModal } from '@/components/reservation/ReservationModal';

interface FieldListProps {
  fields: FieldCardProps['field'][];
}

export const FieldList: React.FC<FieldListProps> = ({ fields }) => {
  const [selectedField, setSelectedField] = useState<string | null>(null);

  const handleReserveClick = (fieldId: string) => {
    setSelectedField(fieldId);
  };

  const handleCloseModal = () => {
    setSelectedField(null);
  };

  if (!fields?.length) {
    return <p className="text-center text-gray-400">No fields found.</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {fields.map((field) => (
          <FieldCard key={field.id} field={field} onReserve={handleReserveClick} />
        ))}
      </div>
      {selectedField && (
        <ReservationModal
          fieldId={selectedField}
          isOpen={!!selectedField}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};


