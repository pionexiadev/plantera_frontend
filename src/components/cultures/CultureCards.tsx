
import React from 'react';
import { Culture } from '@/types/culture';
import { CultureFieldCard } from './CultureFieldCard';

interface CultureCardsProps {
  fields: Culture[];
  onStatusChange: (id: number, status: Culture['statut']) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, field: Culture) => void;
}


export function CultureCards({ fields, onStatusChange, onDelete, onEdit }: CultureCardsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {fields.map((field) => (
        <CultureFieldCard
          key={field.id}
          field={field}
          onStatusChange={(status) => onStatusChange(Number(field.id), status)}
          onDelete={() => onDelete(Number(field.id))}
          onEdit={() => onEdit(Number(field.id), field)}
        />

      ))}
    </div>
  );
}
