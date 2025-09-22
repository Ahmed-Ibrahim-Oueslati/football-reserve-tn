import React from 'react';

export interface FieldCardProps {
  field: {
    id: string;
    name: string;
    city: string;
    address: string;
    pricePerHour: number;
    facilities?: string[];
    images?: string[];
  };
  weather?: {
    temperature?: number;
    condition?: string;
    icon?: string;
  };
  onReserve?: (fieldId: string) => void;
}

export const FieldCard: React.FC<FieldCardProps> = ({ field, weather, onReserve }) => {
  return (
    <div className="border rounded-md p-4 flex gap-4">
      <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={field.images?.[0] || '/images/placeholder.png'}
          alt={field.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{field.name}</h3>
        <p className="text-sm text-gray-600">{field.city} • {field.address}</p>
        <p className="mt-1 text-sm">{(field.pricePerHour / 1000).toFixed(0)} TND / hour</p>
        {weather && (
          <div className="mt-2 text-sm text-gray-700 flex items-center gap-2">
            {weather.icon && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={`https://openweathermap.org/img/wn/${weather.icon}.png`} alt="weather" />
            )}
            <span>{weather.temperature ?? '-'}°C</span>
            <span>•</span>
            <span>{weather.condition ?? '—'}</span>
          </div>
        )}
        <div className="mt-3 flex gap-2 flex-wrap">
          {field.facilities?.slice(0, 4).map((f) => (
            <span key={f} className="text-xs px-2 py-1 bg-gray-100 rounded">{f}</span>
          ))}
        </div>
      </div>
      {onReserve && (
        <button
          className="self-start px-3 py-2 bg-black text-white rounded hover:opacity-90"
          onClick={() => onReserve(field.id)}
        >
          Book Now
        </button>
      )}
    </div>
  );
};


