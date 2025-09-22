# 🚀 Development Setup Guide

## Prerequisites

Before starting development, ensure you have the following installed:

- **Node.js** (v18.17.0 or later)
- **npm** or **yarn** package manager
- **PostgreSQL** (v14 or later)
- **Git** for version control
- **VS Code** or **Cursor** IDE (recommended for AI integration)

## 🛠️ Initial Setup

### 1. Project Initialization

```bash
# Create Next.js project with TypeScript
npx create-next-app@latest football-reservation-app --typescript --tailwind --eslint --app

# Navigate to project directory
cd football-reservation-app

# Install additional dependencies
npm install prisma @prisma/client next-auth @auth/prisma-adapter
npm install @hookform/resolvers react-hook-form zod
npm install @radix-ui/react-dialog @radix-ui/react-calendar
npm install lucide-react date-fns axios
npm install nodemailer @types/nodemailer

# Install development dependencies
npm install -D @types/node prisma jest @testing-library/react @testing-library/jest-dom
npm install -D eslint-config-prettier prettier
```

### 2. Environment Configuration

Create `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/football_reservation"
DIRECT_URL="postgresql://username:password@localhost:5432/football_reservation"

# Weather API
OPENWEATHER_API_KEY="your-openweather-api-key"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key"

# Email Configuration (optional for development)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Map API (optional)
GOOGLE_MAPS_API_KEY="your-google-maps-api-key"
```

### 3. Database Setup

```bash
# Initialize Prisma
npx prisma init

# Generate Prisma client
npx prisma generate

# Create and run initial migration
npx prisma migrate dev --name init

# Seed database with initial data
npx prisma db seed
```

## 📁 Project Structure Setup

```
football-reservation-app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── fields/
│   │   │   ├── reservations/
│   │   │   └── weather/
│   │   ├── dashboard/
│   │   ├── fields/
│   │   │   └── [id]/
│   │   ├── reservations/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/                 # Shadcn/ui components
│   │   ├── field/
│   │   ├── reservation/
│   │   ├── weather/
│   │   └── layout/
│   ├── lib/
│   │   ├── auth.ts
│   │   ├── prisma.ts
│   │   ├── weather.ts
│   │   ├── utils.ts
│   │   └── validations.ts
│   ├── hooks/
│   │   ├── use-fields.ts
│   │   ├── use-weather.ts
│   │   └── use-reservations.ts
│   ├── types/
│   │   ├── auth.ts
│   │   ├── field.ts
│   │   ├── reservation.ts
│   │   └── weather.ts
│   └── styles/
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
├── tests/
│   ├── __mocks__/
│   ├── unit/
│   ├── integration/
│   └── components/
├── docs/
├── public/
│   └── images/
├── .env
├── .env.example
├── .gitignore
├── README.md
├── TECHNICAL_SPEC.md
├── package.json
└── tailwind.config.js
```

## 🎨 UI Components Setup

### Install Shadcn/ui

```bash
# Initialize Shadcn/ui
npx shadcn-ui@latest init

# Install required components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add form
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add calendar
npx shadcn-ui@latest add card
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add select
npx shadcn-ui@latest add table
npx shadcn-ui@latest add toast
```

### Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'football-green': '#4ade80',
        'field-brown': '#92400e',
        'weather-blue': '#3b82f6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

## 🗄️ Database Seed Data

Create `prisma/seed.ts`:

```typescript
import { PrismaClient, City, SurfaceType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed football fields data for Tunis
  const fields = [
    {
      name: 'Stade El Menzah',
      description: 'Professional football stadium with excellent facilities',
      city: City.TUNIS,
      address: 'Avenue Habib Bourguiba, El Menzah, Tunis',
      latitude: 36.8468,
      longitude: 10.1892,
      pricePerHour: 15000, // 15 TND
      capacity: 22,
      surfaceType: SurfaceType.GRASS,
      facilities: ['parking', 'showers', 'lighting', 'changing_rooms'],
      images: ['/images/fields/el-menzah.jpg'],
    },
    {
      name: 'Complexe Sportif Ariana',
      description: 'Modern artificial turf field in Ariana',
      city: City.ARIANA,
      address: 'Avenue de la République, Ariana',
      latitude: 36.8625,
      longitude: 10.1955,
      pricePerHour: 12000, // 12 TND
      capacity: 14,
      surfaceType: SurfaceType.ARTIFICIAL_TURF,
      facilities: ['parking', 'lighting', 'cafeteria'],
      images: ['/images/fields/ariana-complex.jpg'],
    },
    // Add more fields for Ben Arous and other areas
  ];

  for (const field of fields) {
    await prisma.field.create({
      data: {
        ...field,
        availability: {
          create: [
            // Monday to Friday: 8 AM - 10 PM
            ...Array.from({ length: 5 }, (_, i) => ({
              dayOfWeek: i + 1,
              openTime: '08:00',
              closeTime: '22:00',
            })),
            // Saturday and Sunday: 6 AM - 11 PM
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
```

## 🌤️ Weather API Setup

### OpenWeatherMap API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Create a free account
3. Generate an API key
4. Add it to your `.env` file

### Weather Service Configuration

Create `src/lib/weather.ts`:

```typescript
import { City } from '@prisma/client';

interface WeatherResponse {
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  pop?: number; // Probability of precipitation
}

const CITY_COORDINATES = {
  TUNIS: { lat: 36.8065, lon: 10.1815 },
  ARIANA: { lat: 36.8625, lon: 10.1955 },
  BEN_AROUS: { lat: 36.7545, lon: 10.2301 },
};

export class WeatherService {
  private apiKey: string;
  private baseUrl = 'https://api.openweathermap.org/data/2.5';

  constructor() {
    this.apiKey = process.env.OPENWEATHER_API_KEY!;
  }

  async getCurrentWeather(city: City): Promise<WeatherResponse> {
    const { lat, lon } = CITY_COORDINATES[city];
    const url = `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    
    const response = await fetch(url);
    return response.json();
  }

  async getForecast(city: City, days = 5): Promise<WeatherResponse[]> {
    const { lat, lon } = CITY_COORDINATES[city];
    const url = `${this.baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    return data.list.slice(0, days * 8); // 8 forecasts per day (3-hour intervals)
  }
}
```

## 🔧 Development Scripts

Add these scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:reset": "prisma migrate reset",
    "db:seed": "prisma db seed",
    "db:studio": "prisma studio",
    "generate": "prisma generate",
    "