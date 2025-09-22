import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  fieldId: z.string().min(1),
  date: z.string().min(1),
  startTime: z.string().regex(/^\d{2}:\d{2}$/),
  endTime: z.string().regex(/^\d{2}:\d{2}$/),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface ReservationFormProps {
  fieldId: string;
  onSuccess?: () => void;
}

export const ReservationForm: React.FC<ReservationFormProps> = ({ fieldId, onSuccess }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { fieldId },
  });

  const onSubmit = async (values: FormValues) => {
    const res = await fetch('/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    if (res.ok) {
      onSuccess?.();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <input type="hidden" {...register('fieldId')} />
      <div>
        <label className="block text-sm">Date</label>
        <input className="border rounded px-2 py-1 w-full" type="date" {...register('date')} />
        {errors.date && <p className="text-xs text-red-600">Invalid date</p>}
      </div>
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-sm">Start Time</label>
          <input className="border rounded px-2 py-1 w-full" type="time" {...register('startTime')} />
          {errors.startTime && <p className="text-xs text-red-600">Invalid time</p>}
        </div>
        <div className="flex-1">
          <label className="block text-sm">End Time</label>
          <input className="border rounded px-2 py-1 w-full" type="time" {...register('endTime')} />
          {errors.endTime && <p className="text-xs text-red-600">Invalid time</p>}
        </div>
      </div>
      <div>
        <label className="block text-sm">Notes</label>
        <textarea className="border rounded px-2 py-1 w-full" rows={3} {...register('notes')} />
      </div>
      <button disabled={isSubmitting} className="px-3 py-2 bg-black text-white rounded">Reserve</button>
    </form>
  );
};


