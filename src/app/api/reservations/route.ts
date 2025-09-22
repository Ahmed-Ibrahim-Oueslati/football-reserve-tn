import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany({
      include: { field: true, user: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, data: { reservations } });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { message: error?.message || 'Internal error' } },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fieldId, userId, date, startTime, endTime, notes } = body;

    if (!fieldId || !userId || !date || !startTime || !endTime) {
      return NextResponse.json(
        { success: false, error: { message: 'Missing required fields' } },
        { status: 400 }
      );
    }

    const start = new Date(`${date}T${startTime}:00.000Z`);
    const end = new Date(`${date}T${endTime}:00.000Z`);

    const conflict = await prisma.reservation.findFirst({
      where: {
        fieldId,
        date: new Date(date),
        OR: [
          { startTime: { lt: end }, endTime: { gt: start } },
        ],
      },
    });
    if (conflict) {
      return NextResponse.json(
        { success: false, error: { message: 'Time slot conflict' } },
        { status: 409 }
      );
    }

    const totalPrice = 0; // Placeholder; compute later
    const reservation = await prisma.reservation.create({
      data: {
        fieldId,
        userId,
        date: new Date(date),
        startTime: start,
        endTime: end,
        totalPrice,
        notes,
      },
    });

    return NextResponse.json({ success: true, data: { reservation } }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { message: error?.message || 'Internal error' } },
      { status: 500 }
    );
  }
}


