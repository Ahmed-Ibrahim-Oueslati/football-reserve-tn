'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { FieldSearchParams } from '@/types';

export function SearchFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { register, handleSubmit, watch } = useForm<FieldSearchParams>({
    defaultValues: {
      query: searchParams.get('query') || '',
      city: searchParams.get('city') || '',
      maxPrice: Number(searchParams.get('maxPrice')) || undefined,
      amenities: searchParams.get('amenities')?.split(',') as any || [],
      sortBy: (searchParams.get('sortBy') as any) || 'name',
    },
  });

  const onSubmit = (data: FieldSearchParams) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        params.set(key, String(value));
      } else {
        params.delete(key);
      }
    });
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Filters</h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="query" className="block text-sm font-medium text-gray-300">Search</label>
          <input type="text" id="query" {...register('query')} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-300">City</label>
          <select id="city" {...register('city')} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">
            <option value="">All</option>
            <option value="Tunis">Tunis</option>
            <option value="Ariana">Ariana</option>
            <option value="Ben Arous">Ben Arous</option>
          </select>
        </div>
        <div>
          <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-300">Max Price (TND)</label>
          <input type="number" id="maxPrice" {...register('maxPrice')} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Amenities</label>
          <div className="mt-2 space-y-2">
            {['Locker Room', 'Cafe', 'Parking', 'Showers'].map(amenity => (
              <div key={amenity} className="flex items-center">
                <input id={amenity} type="checkbox" value={amenity} {...register('amenities')} className="h-4 w-4 bg-gray-700 border-gray-600 rounded text-green-500 focus:ring-green-500" />
                <label htmlFor={amenity} className="ml-3 text-sm text-gray-300">{amenity}</label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="sortBy" className="block text-sm font-medium text-gray-300">Sort by</label>
          <select id="sortBy" {...register('sortBy')} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>
      <button type="submit" className="mt-6 w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">Apply Filters</button>
    </form>
  );
}
