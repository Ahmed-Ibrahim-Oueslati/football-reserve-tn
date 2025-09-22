import React from 'react';
import { FieldCard, FieldCardProps } from './FieldCard';

interface FieldListProps {
  fields: FieldCardProps['field'][];
  onReserve?: (fieldId: string) => void;
}

export const FieldList: React.FC<FieldListProps> = ({ fields, onReserve }) => {
  if (!fields?.length) {
    return <p className="text-sm text-gray-600">No fields found.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {fields.map((field) => (
        <FieldCard key={field.id} field={field} onReserve={onReserve} />)
      )}
    </div>
  );
};


