type City = 'TUNIS' | 'ARIANA' | 'BEN_AROUS';

type CurrentWeather = {
  temperature: number;
  windSpeed: number;
  humidity?: number;
  precipitation?: number;
};

type HourlyForecastPoint = {
  time: string;
  temperature?: number;
  precipitationProbability?: number;
  windSpeed?: number;
};

const CITY_COORDINATES: Record<City, { lat: number; lon: number }> = {
  TUNIS: { lat: 36.8065, lon: 10.1815 },
  ARIANA: { lat: 36.8625, lon: 10.1955 },
  BEN_AROUS: { lat: 36.7545, lon: 10.2301 },
};

export class WeatherService {
  private baseUrl = 'https://api.open-meteo.com/v1/forecast';
  private apiKey = process.env.OPEN_METEO_API_KEY || '';

  async getCurrentWeather(city: City): Promise<CurrentWeather> {
    const { lat, lon } = CITY_COORDINATES[city];
    const params = new URLSearchParams({
      latitude: String(lat),
      longitude: String(lon),
      current: 'temperature_2m,wind_speed_10m,relative_humidity_2m,precipitation',
      timezone: 'auto',
    });
    if (this.apiKey) params.set('apikey', this.apiKey);
    const url = `${this.baseUrl}?${params.toString()}`;
    const response = await fetch(url, { cache: 'no-store' });
    const data = await response.json();
    const cur = data.current || {};
    return {
      temperature: cur.temperature_2m,
      windSpeed: cur.wind_speed_10m,
      humidity: cur.relative_humidity_2m,
      precipitation: cur.precipitation,
    };
  }

  async getForecast(city: City, days = 5): Promise<HourlyForecastPoint[]> {
    const { lat, lon } = CITY_COORDINATES[city];
    const params = new URLSearchParams({
      latitude: String(lat),
      longitude: String(lon),
      hourly: 'temperature_2m,precipitation_probability,wind_speed_10m',
      forecast_days: String(days),
      timezone: 'auto',
    });
    if (this.apiKey) params.set('apikey', this.apiKey);
    const url = `${this.baseUrl}?${params.toString()}`;
    const response = await fetch(url, { cache: 'no-store' });
    const data = await response.json();
    const times: string[] = data.hourly?.time || [];
    const temps: number[] = data.hourly?.temperature_2m || [];
    const pops: number[] = data.hourly?.precipitation_probability || [];
    const winds: number[] = data.hourly?.wind_speed_10m || [];

    return times.map((t, idx) => ({
      time: t,
      temperature: temps[idx],
      precipitationProbability: pops[idx],
      windSpeed: winds[idx],
    }));
  }
}


