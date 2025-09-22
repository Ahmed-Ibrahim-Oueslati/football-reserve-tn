// Football Reserve TN - API Route for Bookings
// Handles booking creation, retrieval, and updates

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// GET: Fetch user's bookings
export async function GET(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") as any;

    const whereClause: any = {
      userId: session.user.id,
    };

    if (status) {
      whereClause.status = status;
    }

    const bookings = await prisma.booking.findMany({
      where: whereClause,
      include: {
        field: {
          select: {
            id: true,
            name: true,
            address: true,
            thumbnail: true,
          },
        },
        payments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ success: true, data: bookings });
  } catch (error) {
    console.error("API Error (GET /api/bookings):", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

// POST: Create a new booking
export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const bookingSchema = z.object({
      fieldId: z.string(),
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
      endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
      notes: z.string().optional(),
    });

    const validatedData = bookingSchema.parse(body);

    // Check for booking conflicts
    const startDateTime = new Date(`${validatedData.date}T${validatedData.startTime}:00Z`);
    const endDateTime = new Date(`${validatedData.date}T${validatedData.endTime}:00Z`);

    const conflictingBooking = await prisma.booking.findFirst({
      where: {
        fieldId: validatedData.fieldId,
        status: {
          in: ["PENDING", "CONFIRMED"],
        },
        startTime: {
          lt: endDateTime,
        },
        endTime: {
          gt: startDateTime,
        },
      },
    });

    if (conflictingBooking) {
      return NextResponse.json(
        { success: false, error: "This time slot is already booked." },
        { status: 409 }
      );
    }

    // Calculate total amount
    const durationInHours = (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60 * 60);
    const field = await prisma.field.findUnique({
      where: { id: validatedData.fieldId },
      select: { pricePerHour: true },
    });

    if (!field) {
      return NextResponse.json({ success: false, error: "Field not found" }, { status: 404 });
    }

    const totalAmount = parseFloat((field.pricePerHour * durationInHours).toFixed(2));

    // Create the booking
    const newBooking = await prisma.booking.create({
      data: {
        ...validatedData,
        userId: session.user.id,
        startTime: startDateTime,
        endTime: endDateTime,
        totalAmount,
        status: "PENDING",
      },
    });

    return NextResponse.json({ success: true, data: newBooking }, { status: 201 });
  } catch (error) {
    console.error("API Error (POST /api/bookings):", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Validation failed", validation: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to create booking" },
      { status: 500 }
    );
  }
}