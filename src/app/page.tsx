'use client';

import React from 'react';
import Link from 'next/link';
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
    <div>
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold">Find and Book Your Football Field</h1>
        <p className="text-xl text-gray-400 mt-4">The best fields in Tunis, just a few clicks away.</p>
        <Link href="/fields" className="mt-8 inline-block bg-green-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600 transition-colors">
            Explore Fields
        </Link>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Featured Fields</h2>
        {loading && <p className="text-gray-400">Loading fields...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && <FieldList fields={fields} />}

      </section>
    </div>
  );
}


