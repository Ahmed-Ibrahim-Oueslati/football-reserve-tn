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
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "type-check": "tsc --noEmit",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

## 🧪 Testing Configuration

### Jest Setup

Create `jest.config.js`:

```javascript
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/app/layout.tsx',
    '!src/app/globals.css',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

module.exports = createJestConfig(customJestConfig);
```

Create `jest.setup.js`:

```javascript
import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}));

// Mock Prisma client
jest.mock('./src/lib/prisma', () => ({
  field: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  reservation: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
}));

// Mock Weather API
global.fetch = jest.fn();
```

## 🚀 AI-Enhanced Development Workflow

### 1. Cursor IDE Configuration

Create `.cursor-prompt` file:

```
You are working on a football field reservation app for Tunis with weather integration.

Tech Stack:
- Next.js 14 with App Router
- TypeScript
- Prisma with PostgreSQL  
- Tailwind CSS + Shadcn/ui
- NextAuth.js
- OpenWeatherMap API

Key Features:
- Field browsing and booking
- Weather-based recommendations
- User authentication
- Email notifications
- Mobile-responsive design

Database Schema:
- User, Field, Reservation, WeatherCache models
- Fields in Tunis, Ariana, Ben Arous cities
- Weather integration for booking decisions

When generating code:
1. Use TypeScript with proper typing
2. Follow Next.js 14 App Router patterns
3. Include error handling and loading states
4. Use Prisma for database operations
5. Implement responsive design with Tailwind
6. Add proper validation with Zod
7. Include weather data in booking logic
```

### 2. AI Prompting Templates

**Component Generation:**
```
Generate a React component for [component name] that:
- Uses TypeScript interfaces
- Follows the existing design system
- Includes proper error handling
- Is mobile-responsive
- Integrates with our Prisma schema
- Context: [provide relevant context]
```

**API Route Generation:**
```
Create a Next.js API route for [endpoint] that:
- Handles [HTTP methods]
- Validates input with Zod
- Uses Prisma for database operations
- Includes proper error handling
- Returns typed responses
- Context: [provide schema/business logic]
```

**Database Operations:**
```
Write Prisma queries for [operation] that:
- Handle the relationship between [models]
- Include proper error handling
- Use transactions where necessary
- Optimize for performance
- Context: [provide schema and requirements]
```

## 🔧 Development Best Practices

### Code Organization

```typescript
// src/lib/validations.ts - Zod schemas
export const createReservationSchema = z.object({
  fieldId: z.string().cuid(),
  date: z.string().date(),
  startTime: z.string().regex(/^\d{2}:\d{2}$/),
  endTime: z.string().regex(/^\d{2}:\d{2}$/),
  notes: z.string().optional(),
});

// src/types/index.ts - TypeScript interfaces
export interface FieldWithAvailability extends Field {
  availability: FieldAvailability[];
  currentWeather?: WeatherData;
}

// src/hooks/use-fields.ts - Custom hooks
export function useFields(filters: FieldFilters) {
  return useQuery({
    queryKey: ['fields', filters],
    queryFn: () => fetchFields(filters),
  });
}
```

### Error Handling

```typescript
// src/lib/errors.ts
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code: string = 'INTERNAL_ERROR'
  ) {
    super(message);
    this.name = 'AppError';
  }
}

// Usage in API routes
export async function POST(request: Request) {
  try {
    // ... business logic
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.statusCode }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Performance Optimization

```typescript
// src/lib/cache.ts - Redis-like caching
export class CacheService {
  private cache = new Map<string, { data: any; expires: number }>();

  set(key: string, data: any, ttl: number = 3600) {
    this.cache.set(key, {
      data,
      expires: Date.now() + ttl * 1000,
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item || item.expires < Date.now()) {
      this.cache.delete(key);
      return null;
    }
    return item.data;
  }
}
```

## 📋 Development Checklist

### Phase 1: Setup ✅
- [ ] Project initialization
- [ ] Database setup and seeding
- [ ] Weather API configuration
- [ ] Basic UI components
- [ ] Authentication setup

### Phase 2: Core Features
- [ ] Field listing page
- [ ] Field detail page with weather
- [ ] User registration/login
- [ ] Reservation form
- [ ] Calendar integration

### Phase 3: Advanced Features
- [ ] User dashboard
- [ ] Email notifications
- [ ] Weather-based recommendations
- [ ] Mobile optimization
- [ ] Search and filtering

### Phase 4: Testing & Deployment
- [ ] Unit tests (90% coverage)
- [ ] Integration tests
- [ ] E2E tests
- [ ] Performance optimization
- [ ] Production deployment

## 🚨 Common Issues & Solutions

### Database Connection Issues
```bash
# Reset database
npm run db:reset

# Check connection
npx prisma db pull
```

### Weather API Rate Limiting
```typescript
// Implement caching in weather service
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes
```

### TypeScript Errors
```bash
# Regenerate Prisma types
npx prisma generate

# Type check
npm run type-check
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [OpenWeatherMap API Documentation](https://openweathermap.org/api)
- [Shadcn/ui Documentation](https://ui.shadcn.com)

---

*Ready to start building! Use AI tools throughout the development process to accelerate feature development while maintaining code quality.*
    "