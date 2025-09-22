import { NextResponse } from 'next/server';
import { WeatherService } from '@/lib/weather';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city') as any;
    const days = Number(searchParams.get('days') || 5);
    if (!city) {
      return NextResponse.json(
        { success: false, error: { message: 'city is required' } },
        { status: 400 }
      );
    }

    const ws = new WeatherService();
    const forecast = await ws.getForecast(city, days);
    return NextResponse.json({ success: true, data: { forecast } });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { message: error?.message || 'Internal error' } },
      { status: 500 }
    );
  }
}


