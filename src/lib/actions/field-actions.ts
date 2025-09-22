import { Prisma, PrismaClient } from '@prisma/client';
import { FieldSearchParams, PaginationInfo } from '@/types';

const prisma = new PrismaClient();

export async function getFields(searchParams: FieldSearchParams) {
  const { query, city, maxPrice, amenities, sortBy, sortOrder, page = 1, limit = 9 } = searchParams;

  const where: Prisma.FieldWhereInput = {};

  if (query) {
    where.OR = [
      { name: { contains: query, mode: 'insensitive' } },
      { address: { contains: query, mode: 'insensitive' } },
    ];
  }

  if (city) {
    where.city = city;
  }

  if (maxPrice) {
    where.pricePerHour = { lte: Number(maxPrice) * 1000 };
  }

  if (amenities && amenities.length > 0) {
    where.facilities = {
      hasSome: amenities,
    };
  }

  const orderBy: Prisma.FieldOrderByWithRelationInput = {};
  if (sortBy) {
    orderBy[sortBy] = sortOrder || 'asc';
  }

  const total = await prisma.field.count({ where });
  const fields = await prisma.field.findMany({
    where,
    orderBy,
    skip: (page - 1) * limit,
    take: limit,
  });

  const totalPages = Math.ceil(total / limit);

  const pagination: PaginationInfo = {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };

  return {
    fields,
    pagination,
  };
}
