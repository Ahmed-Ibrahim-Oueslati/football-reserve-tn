import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city') as any | null;
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    const fields = await prisma.field.findMany({
      where: {
        ...(city ? { city } : {}),
        ...(minPrice || maxPrice
          ? {
              pricePerHour: {
                gte: minPrice ? Number(minPrice) : undefined,
                lte: maxPrice ? Number(maxPrice) : undefined,
              },
            }
          : {}),
        isActive: true,
      },
      include: { availability: true },
      orderBy: { name: 'asc' },
    });

    return NextResponse.json({ success: true, data: { fields } });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { message: error?.message || 'Internal error' } },
      { status: 500 }
    );
  }
}


