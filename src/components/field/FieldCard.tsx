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
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={field.images?.[0] || '/images/placeholder.png'}
          alt={field.name}
          className="w-full h-48 object-cover"
        />
        {weather && (
          <div className="absolute top-2 right-2 bg-gray-900 bg-opacity-75 rounded-full p-2 flex items-center space-x-2">
            {weather.icon && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={`https://openweathermap.org/img/wn/${weather.icon}.png`} alt="weather" className="w-6 h-6" />
            )}
            <span className="text-white font-semibold">{weather.temperature ?? '-'}°C</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white">{field.name}</h3>
        <p className="text-gray-400 mt-1">{field.city} • {field.address}</p>
        <p className="mt-4 text-xl font-semibold text-green-400">{(field.pricePerHour / 1000).toFixed(0)} TND / hour</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {field.facilities?.slice(0, 4).map((f) => (
            <span key={f} className="text-xs px-3 py-1 bg-gray-700 text-gray-300 rounded-full">{f}</span>
          ))}
        </div>
        {onReserve && (
          <button
            className="mt-6 w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-colors"
            onClick={() => onReserve(field.id)}
          >
            Book Now
          </button>
        )}
      </div>
    </div>
  );
};


