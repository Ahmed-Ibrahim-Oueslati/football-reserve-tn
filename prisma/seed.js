const { PrismaClient, City, SurfaceType } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function main() {
  const fields = [
    {
      name: 'Stade El Menzah',
      description: 'Professional football stadium with excellent facilities',
      city: City.TUNIS,
      address: 'Avenue Habib Bourguiba, El Menzah, Tunis',
      latitude: 36.8468,
      longitude: 10.1892,
      pricePerHour: 15000,
      capacity: 22,
      surfaceType: SurfaceType.GRASS,
      facilities: ['parking', 'showers', 'lighting', 'changing_rooms'].join(','),
      images: ['/images/fields/el-menzah.jpg'].join(','),
    },
    {
      name: 'Complexe Sportif Ariana',
      description: 'Modern artificial turf field in Ariana',
      city: City.ARIANA,
      address: 'Avenue de la République, Ariana',
      latitude: 36.8625,
      longitude: 10.1955,
      pricePerHour: 12000,
      capacity: 14,
      surfaceType: SurfaceType.ARTIFICIAL_TURF,
      facilities: ['parking', 'lighting', 'cafeteria'].join(','),
      images: ['/images/fields/ariana-complex.jpg'].join(','),
    },
  ];

  for (const field of fields) {
    await prisma.field.create({
      data: {
        ...field,
        availability: {
          create: [
            ...Array.from({ length: 5 }, (_, i) => ({
              dayOfWeek: i + 1,
              openTime: '08:00',
              closeTime: '22:00',
            })),
            { dayOfWeek: 6, openTime: '06:00', closeTime: '23:00' },
            { dayOfWeek: 0, openTime: '06:00', closeTime: '23:00' },
          ],
        },
      },
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


