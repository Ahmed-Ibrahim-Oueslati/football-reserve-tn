// Football Reserve TN - Server Actions for Fields
// Functions to fetch field data from the database for use in Server Components

import { prisma } from "@/lib/prisma";
import { FieldWithDetails } from "@/types";

export async function getFields(params: {
  query?: string;
  city?: string;
  page?: number;
  limit?: number;
}) {
  const { query, city, page = 1, limit = 20 } = params;

  const whereClause: any = {
    isActive: true,
  };

  if (query) {
    whereClause.name = {
      contains: query,
      mode: "insensitive",
    };
  }

  if (city) {
    whereClause.city = city;
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
            email: true,
          },
        },
        amenities: true,
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

  return {
    fields: fields as FieldWithDetails[],
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
}

export async function getFieldBySlug(slug: string) {
  const field = await prisma.field.findUnique({
    where: { slug },
    include: {
      owner: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
      amenities: true,
      reviews: {
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: true,
            },
          },
        },
        where: {
          isActive: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      _count: {
        select: {
          bookings: true,
          reviews: true,
        },
      },
    },
  });

  return field as FieldWithDetails | null;
}