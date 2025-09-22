// Football Reserve TN - Application Configuration
// Centralized configuration management

import type { AppConfig } from '@/types';

export const appConfig: AppConfig = {
  app: {
    name: 'Football Reserve TN',
    version: '2.0.0',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    supportEmail: 'support@football-reserve-tn.com',
  },
  features: {
    payments: process.env.NODE_ENV === 'production',
    reviews: true,
    notifications: true,
    maps: !!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  },
  limits: {
    maxImagesPerField: 10,
    maxBookingDaysAhead: 30,
    minBookingHours: 1,
    maxBookingHours: 8,
  },
};

// Database configuration
export const dbConfig = {
  url: process.env.DATABASE_URL!,
  maxConnections: 100,
  connectionTimeout: 60000,
};

// Authentication configuration
export const authConfig = {
  secret: process.env.NEXTAUTH_SECRET!,
  maxAge: 30 * 24 * 60 * 60, // 30 days
  sessionUpdateAge: 24 * 60 * 60, // 24 hours
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
    error: '/auth/error',
  },
  providers: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
};

// Payment configuration
export const paymentConfig = {
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
    secretKey: process.env.STRIPE_SECRET_KEY!,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  },
  currency: 'TND',
  supportedMethods: ['card', 'bank_transfer'],
};

// Email configuration
export const emailConfig = {
  smtp: {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  },
  from: {
    name: 'Football Reserve TN',
    address: process.env.SMTP_FROM || 'noreply@football-reserve-tn.com',
  },
};

// File upload configuration
export const uploadConfig = {
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
  aws: {
    region: process.env.AWS_REGION || 'us-east-1',
    bucket: process.env.AWS_S3_BUCKET || 'football-reserve-uploads',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};

// Cache configuration
export const cacheConfig = {
  redis: {
    url: process.env.REDIS_URL,
    ttl: {
      default: 3600, // 1 hour
      fields: 1800, // 30 minutes
      availability: 300, // 5 minutes
      user: 3600, // 1 hour
    },
  },
};

// Validation schemas
export const validationConfig = {
  password: {
    minLength: 8,
    requireNumbers: true,
    requireSpecialChars: true,
    requireUppercase: true,
  },
  booking: {
    minAdvanceHours: 2,
    maxAdvanceDays: 30,
    minDurationMinutes: 60,
    maxDurationMinutes: 480,
  },
};

// Tunisia-specific configuration
export const tunisiaConfig = {
  regions: [
    'Tunis',
    'Ariana',
    'Ben Arous',
    'Manouba',
    'Nabeul',
    'Zaghouan',
    'Bizerte',
    'Béja',
    'Jendouba',
    'Le Kef',
    'Siliana',
    'Kairouan',
    'Kasserine',
    'Sidi Bouzid',
    'Sousse',
    'Monastir',
    'Mahdia',
    'Sfax',
    'Gabès',
    'Médenine',
    'Tataouine',
    'Gafsa',
    'Tozeur',
    'Kébili',
  ],
  timezone: 'Africa/Tunis',
  currency: 'TND',
  languages: ['ar', 'fr', 'en'],
  defaultLanguage: 'fr',
};

// Business hours configuration
export const businessConfig = {
  defaultOpeningHours: {
    start: '06:00',
    end: '23:00',
  },
  timeSlotDuration: 60, // minutes
  bookingWindow: {
    minHoursAhead: 2,
    maxDaysAhead: 30,
  },
  cancellation: {
    freeUntilHours: 24,
    refundPercentage: 90,
  },
};

// API configuration
export const apiConfig = {
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // requests per window
  },
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://football-reserve-tn.com'] 
      : ['http://localhost:3000'],
    credentials: true,
  },
  pagination: {
    defaultLimit: 20,
    maxLimit: 100,
  },
};
