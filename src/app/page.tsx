'use client';

import React from 'react';
import { FieldList } from '@/components/field/FieldList';

type Field = {
  id: string;
  name: string;
  city: string;
  address: string;
  pricePerHour: number;
  facilities?: string[];
  images?: string[];
};

export default function HomePage() {
  const [fields, setFields] = React.useState<Field[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/fields');
        const data = await res.json();
        if (data?.success) {
          setFields(data.data.fields || []);
        } else {
          setError(data?.error?.message || 'Failed to load fields');
        }
      } catch (e: any) {
        setError(e?.message || 'Failed to load fields');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const onReserve = (fieldId: string) => {
    alert(`Reserve clicked for field: ${fieldId}`);
  };

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Football Fields</h1>
      {loading && <p className="text-sm text-gray-600">Loading…</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {!loading && !error && <FieldList fields={fields} onReserve={onReserve} />}
    </main>
  );
}


