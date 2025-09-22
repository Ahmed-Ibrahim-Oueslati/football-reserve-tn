// Football Reserve TN - API Route for Fields
// Handles CRUD operations for football fields

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { FieldSearchParams } from "@/types";
import { z } from "zod";

// GET: Fetch paginated and filtered fields
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const query = searchParams.get("query") || "";
    const city = searchParams.get("city") || "";
    const minPrice = searchParams.get("minPrice")
      ? parseFloat(searchParams.get("minPrice")!)
      : undefined;
    const maxPrice = searchParams.get("maxPrice")
      ? parseFloat(searchParams.get("maxPrice")!)
      : undefined;

    const whereClause: any = {
      isActive: true,
      name: {
        contains: query,
        mode: "insensitive",
      },
    };

    if (city) {
      whereClause.city = city;
    }

    if (minPrice !== undefined) {
      whereClause.pricePerHour = {
        ...whereClause.pricePerHour,
        gte: minPrice,
      };
    }

    if (maxPrice !== undefined) {
      whereClause.pricePerHour = {
        ...whereClause.pricePerHour,
        lte: maxPrice,
      };
    }

    const [fields, total] = await Promise.all([
      prisma.field.findMany({
        where: whereClause,
        include: {
          owner: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          _count: {
            select: {
              bookings: true,
              reviews: true,
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.field.count({
        where: whereClause,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: fields,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("API Error (GET /api/fields):", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch fields" },
      { status: 500 }
    );
  }
}

// POST: Create a new field (Admin/Field Owner only)
export async function POST(request: Request) {
  const session = await auth();
  if (!session || (session.user.role !== "FIELD_OWNER" && session.user.role !== "ADMIN")) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const fieldSchema = z.object({
      name: z.string().min(3),
      description: z.string().optional(),
      address: z.string().min(5),
      city: z.string().min(2),
      region: z.string().min(2),
      pricePerHour: z.number().positive(),
      fieldType: z.enum(["FOOTBALL_5", "FOOTBALL_7", "FOOTBALL_11"]),
      surface: z.enum(["GRASS", "ARTIFICIAL_GRASS", "CONCRETE", "CLAY"]),
      covered: z.boolean(),
      lighting: z.boolean(),
      openingTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
      closingTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
      amenities: z.array(z.string()),
    });

    const validatedData = fieldSchema.parse(body);

    const newField = await prisma.field.create({
      data: {
        ...validatedData,
        ownerId: session.user.id,
        slug: validatedData.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
      },
    });

    // Create default availability (Mon-Sun, 6 AM - 11 PM)
    const days = Array.from({ length: 7 }, (_, i) => i + 1);
    await prisma.fieldAvailability.createMany({
      data: days.map((day) => ({
        fieldId: newField.id,
        dayOfWeek: day,
        startTime: validatedData.openingTime,
        endTime: validatedData.closingTime,
      })),
    });

    return NextResponse.json({ success: true, data: newField }, { status: 201 });
  } catch (error) {
    console.error("API Error (POST /api/fields):", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Validation failed", validation: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to create field" },
      { status: 500 }
    );
  }
}