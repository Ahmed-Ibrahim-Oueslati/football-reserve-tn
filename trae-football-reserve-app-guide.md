# Football Reserve TN - Complete Setup Guide for AI Agent

## Project Overview
This is a Next.js football field reservation system for Tunisia that needs to be fixed from 404 errors and made fully functional.

## Current Issues to Fix
- **404 Not Found Errors**: Pages/routes are not working properly
- Missing or incorrectly configured routing
- Potential missing components or pages

## Required Project Structure

### Essential Files and Directories
```
football-reserve-tn/
├── app/                          # App Router (Next.js 13+)
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Global styles
│   ├── booking/
│   │   └── page.tsx             # Booking page
│   ├── fields/
│   │   ├── page.tsx             # Fields listing
│   │   └── [id]/
│   │       └── page.tsx         # Individual field details
│   ├── profile/
│   │   └── page.tsx             # User profile
│   └── api/                     # API routes
│       ├── fields/
│       │   └── route.ts         # Fields API
│       ├── bookings/
│       │   └── route.ts         # Bookings API
│       └── auth/
│           └── route.ts         # Authentication API
├── components/                   # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── FieldCard.tsx
│   ├── BookingForm.tsx
│   └── ui/                      # UI components
├── lib/                         # Utilities and configurations
│   ├── utils.ts
│   ├── db.ts                    # Database connection
│   └── auth.ts                  # Authentication logic
├── types/                       # TypeScript types
│   └── index.ts
├── public/                      # Static assets
│   ├── images/
│   └── icons/
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

## Core Components to Create

### 1. Root Layout (app/layout.tsx)
```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Football Reserve TN - Book Your Field',
  description: 'Reserve football fields across Tunisia',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
```

### 2. Home Page (app/page.tsx)
```typescript
import Link from 'next/link'
import FieldCard from '@/components/FieldCard'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Football Reserve TN</h1>
        <p className="text-xl text-gray-600 mb-8">
          Find and book the best football fields across Tunisia
        </p>
        <Link 
          href="/fields"
          className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Browse Fields
        </Link>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Featured Fields</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Featured fields will be loaded here */}
        </div>
      </section>
    </div>
  )
}
```

### 3. Fields Listing Page (app/fields/page.tsx)
```typescript
import FieldCard from '@/components/FieldCard'

export default function FieldsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Available Football Fields</h1>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search fields..."
          className="w-full md:w-auto px-4 py-2 border rounded-lg"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Fields will be mapped here */}
      </div>
    </div>
  )
}
```

### 4. Field Details Page (app/fields/[id]/page.tsx)
```typescript
import BookingForm from '@/components/BookingForm'

export default function FieldDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img 
            src="/images/field-placeholder.jpg" 
            alt="Field"
            className="w-full h-64 object-cover rounded-lg"
          />
          <h1 className="text-3xl font-bold mt-4">Field Name</h1>
          <p className="text-gray-600 mt-2">Field description and details</p>
        </div>
        
        <div>
          <BookingForm fieldId={params.id} />
        </div>
      </div>
    </div>
  )
}
```

### 5. Booking Page (app/booking/page.tsx)
```typescript
export default function BookingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Book Your Field</h1>
      
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow">
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Field</label>
              <select className="w-full px-3 py-2 border rounded-lg">
                <option>Select a field</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Date</label>
              <input type="date" className="w-full px-3 py-2 border rounded-lg" />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Time</label>
              <select className="w-full px-3 py-2 border rounded-lg">
                <option>Select time slot</option>
              </select>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Book Field
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
```

## Essential Components

### Header Component (components/Header.tsx)
```typescript
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-green-600 text-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Football Reserve TN
        </Link>
        
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="/" className="hover:text-green-200">Home</Link></li>
            <li><Link href="/fields" className="hover:text-green-200">Fields</Link></li>
            <li><Link href="/booking" className="hover:text-green-200">Book</Link></li>
            <li><Link href="/profile" className="hover:text-green-200">Profile</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
```

### Field Card Component (components/FieldCard.tsx)
```typescript
import Link from 'next/link'

interface FieldCardProps {
  id: string
  name: string
  location: string
  price: number
  image?: string
}

export default function FieldCard({ id, name, location, price, image }: FieldCardProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <img 
        src={image || '/images/field-placeholder.jpg'} 
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 mb-2">{location}</p>
        <p className="text-green-600 font-bold mb-4">{price} DT/hour</p>
        <Link 
          href={`/fields/${id}`}
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors inline-block text-center"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}
```

## Configuration Files

### Next.js Config (next.config.js)
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
```

### TypeScript Config (tsconfig.json)
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Package.json Dependencies
```json
{
  "name": "football-reserve-tn",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.0.0",
    "react": "^18",
    "react-dom": "^18",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.0.1",
    "postcss": "^8",
    "typescript": "^5"
  }
}
```

## Common 404 Error Fixes

### 1. Incorrect File Structure
- Ensure all pages are in the `app/` directory (not `pages/`)
- Each route needs a `page.tsx` file
- Dynamic routes use `[param]/page.tsx` format

### 2. Missing Layout Files
- Root `layout.tsx` is required in `app/`
- Each route segment can have its own `layout.tsx`

### 3. Import Path Issues
- Use `@/` prefix for absolute imports
- Ensure `baseUrl` and `paths` are configured in `tsconfig.json`

### 4. API Routes
- API routes should be in `app/api/` directory
- Use `route.ts` files (not `index.ts`)

## Testing Checklist

After implementation, verify:
- [ ] Home page loads at `/`
- [ ] Fields page loads at `/fields`
- [ ] Individual field pages load at `/fields/[id]`
- [ ] Booking page loads at `/booking`
- [ ] All navigation links work
- [ ] No 404 errors on any route
- [ ] Components render properly
- [ ] Styling is applied correctly

## Additional Features to Implement

1. **Authentication**: User login/signup
2. **Database Integration**: Store fields and bookings
3. **Payment System**: Handle field reservations
4. **Admin Panel**: Manage fields and bookings
5. **Reviews System**: User feedback on fields
6. **Search & Filters**: Enhanced field discovery
7. **Mobile Responsiveness**: Optimize for mobile devices

## Deployment Instructions

1. Build the project: `npm run build`
2. Test production build: `npm start`
3. Deploy to Vercel or similar platform
4. Configure environment variables
5. Set up database and API endpoints

This guide should provide everything needed to create a fully functional football field reservation system without 404 errors.