// Football Reserve TN - Type Definitions
// Comprehensive TypeScript interfaces and types

import type { 
  User, 
  Field, 
  Booking, 
  Payment, 
  Review,
  FieldType,
  FieldSurface,
  AmenityType,
  BookingStatus,
  PaymentStatus,
  UserRole 
} from '@prisma/client';

// ================================
// Extended Prisma Types
// ================================

export type UserWithBookings = User & {
  bookings: Booking[];
  _count: {
    bookings: number;
    reviews: number;
  };
};

export type FieldWithDetails = Field & {
  owner: Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>;
  amenities: { amenity: AmenityType; isActive: boolean }[];
  reviews: ReviewWithUser[];
  _count: {
    bookings: number;
    reviews: number;
  };
};

export type BookingWithDetails = Booking & {
  field: Pick<Field, 'id' | 'name' | 'address' | 'thumbnail'>;
  user: Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>;
  payments: Payment[];
};

export type ReviewWithUser = Review & {
  user: Pick<User, 'id' | 'firstName' | 'lastName' | 'avatar'>;
};

// ================================
// API Response Types
// ================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: PaginationInfo;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// ================================
// Field Search & Filter Types
// ================================

export interface FieldSearchParams {
  query?: string;
  city?: string;
  region?: string;
  fieldType?: FieldType;
  surface?: FieldSurface;
  minPrice?: number;
  maxPrice?: number;
  amenities?: AmenityType[];
  covered?: boolean;
  lighting?: boolean;
  rating?: number;
  availability?: {
    date: Date;
    startTime: string;
    endTime: string;
  };
  sortBy?: 'name' | 'price' | 'rating' | 'distance' | 'popularity';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface FieldAvailabilitySlot {
  date: string;
  startTime: string;
  endTime: string;
  available: boolean;
  price: number;
}

// ================================
// Booking Types
// ================================

export interface BookingRequest {
  fieldId: string;
  date: string;
  startTime: string;
  endTime: string;
  notes?: string;
}

export interface BookingConflict {
  hasConflict: boolean;
  conflictingBookings?: {
    id: string;
    startTime: Date;
    endTime: Date;
  }[];
}

export interface TimeSlot {
  time: string;
  available: boolean;
  price?: number;
}

export interface DayAvailability {
  date: string;
  slots: TimeSlot[];
  isFullyBooked: boolean;
  specialNote?: string;
}

// ================================
// Payment Types
// ================================

export interface PaymentIntent {
  clientSecret: string;
  amount: number;
  currency: string;
}

export interface PaymentConfirmation {
  paymentId: string;
  amount: number;
  status: PaymentStatus;
  receiptUrl?: string;
}

// ================================
// User Dashboard Types
// ================================

export interface DashboardStats {
  totalBookings: number;
  upcomingBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  totalSpent: number;
  favoriteFields: string[];
}

export interface FieldOwnerStats {
  totalFields: number;
  totalBookings: number;
  totalRevenue: number;
  averageRating: number;
  occupancyRate: number;
  monthlyBookings: { month: string; count: number; revenue: number }[];
}

// ================================
// Form Types
// ================================

export interface LoginForm {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

export interface ProfileUpdateForm {
  firstName: string;
  lastName: string;
  phone?: string;
  language: string;
  notifications: boolean;
}

export interface FieldForm {
  name: string;
  description: string;
  address: string;
  city: string;
  region: string;
  fieldType: FieldType;
  surface: FieldSurface;
  covered: boolean;
  lighting: boolean;
  pricePerHour: number;
  openingTime: string;
  closingTime: string;
  amenities: AmenityType[];
  images: File[];
}

export interface ReviewForm {
  rating: number;
  title?: string;
  comment?: string;
}

// ================================
// Component Props Types
// ================================

export interface FieldCardProps {
  field: FieldWithDetails;
  showBookButton?: boolean;
  showOwnerInfo?: boolean;
  className?: string;
}

export interface BookingCalendarProps {
  fieldId: string;
  selectedDate?: Date;
  onDateSelect: (date: Date) => void;
  onTimeSelect: (time: string) => void;
  minDate?: Date;
  maxDate?: Date;
}

export interface SearchFiltersProps {
  filters: FieldSearchParams;
  onFiltersChange: (filters: FieldSearchParams) => void;
  onReset: () => void;
  isLoading?: boolean;
}

// ================================
// Utility Types
// ================================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// ================================
// Error Types
// ================================

export interface AppError extends Error {
  code: string;
  statusCode: number;
  details?: Record<string, any>;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ApiError {
  message: string;
  code: string;
  statusCode: number;
  validation?: ValidationError[];
}

// ================================
// Configuration Types
// ================================

export interface AppConfig {
  app: {
    name: string;
    version: string;
    url: string;
    supportEmail: string;
  };
  features: {
    payments: boolean;
    reviews: boolean;
    notifications: boolean;
    maps: boolean;
  };
  limits: {
    maxImagesPerField: number;
    maxBookingDaysAhead: number;
    minBookingHours: number;
    maxBookingHours: number;
  };
}

// Re-export Prisma types
export type {
  User,
  Field,
  Booking,
  Payment,
  Review,
  FieldType,
  FieldSurface,
  AmenityType,
  BookingStatus,
  PaymentStatus,
  PaymentMethod,
  UserRole,
} from '@prisma/client';
