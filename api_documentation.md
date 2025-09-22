# 🔌 API Documentation - Football Field Reservation System

## 📚 API Overview

Base URL: `https://your-domain.com/api`
Authentication: JWT tokens via NextAuth.js
Content-Type: `application/json`

## 🔐 Authentication

### Login
```http
POST /api/auth/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```

### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "phone": "+216 12 345 678"
}
```

## ⚽ Fields API

### Get All Fields
```http
GET /api/fields?city=TUNIS&date=2024-12-25&minPrice=5000&maxPrice=20000&facilities=parking,lighting
```

**Query Parameters:**
- `city` (optional): `TUNIS` | `ARIANA` | `BEN_AROUS`
- `date` (optional): ISO date string for availability check
- `minPrice` (optional): Minimum price per hour in millimes
- `maxPrice` (optional): Maximum price per hour in millimes
- `facilities` (optional): Comma-separated list of required facilities
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**
```json
{
  "success": true,
  "data": {
    "fields": [
      {
        "id": "field_123",
        "name": "Stade El Menzah",
        "description": "Professional football stadium",
        "city": "TUNIS",
        "address": "Avenue Habib Bourguiba, El Menzah",
        "latitude": 36.8468,
        "longitude": 10.1892,
        "pricePerHour": 15000,
        "capacity": 22,
        "surfaceType": "GRASS",
        "facilities": ["parking", "showers", "lighting"],
        "images": ["/images/fields/el-menzah.jpg"],
        "currentWeather": {
          "temperature": 24,
          "condition": "clear",
          "humidity": 65,
          "windSpeed": 12,
          "playabilityScore": 95
        },
        "availability": [
          {
            "dayOfWeek": 1,
            "openTime": "08:00",
            "closeTime": "22:00"
          }
        ]
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 8,
      "totalPages": 1
    }
  }
}
```

### Get Field Details
```http
GET /api/fields/[id]?date=2024-12-25
```

**Response:**
```json
{
  "success": true,
  "data": {
    "field": {
      "id": "field_123",
      "name": "Stade El Menzah",
      // ... field details
    },
    "availableSlots": [
      {
        "startTime": "08:00",
        "endTime": "10:00",
        "isAvailable": true,
        "price": 15000
      },
      {
        "startTime": "10:00",
        "endTime": "12:00",
        "isAvailable": false,
        "reservedBy": "John Doe"
      }
    ],
    "weatherForecast": [
      {
        "time": "2024-12-25T08:00:00Z",
        "temperature": 22,
        "condition": "partly_cloudy",
        "precipitationProbability": 20,
        "playabilityScore": 85
      }
    ]
  }
}
```

## 📅 Reservations API

### Create Reservation
```http
POST /api/reservations
Authorization: Bearer [jwt_token]
Content-Type: application/json

{
  "fieldId": "field_123",
  "date": "2024-12-25",
  "startTime": "14:00",
  "endTime": "16:00",
  "notes": "Team practice session"
}
```

5. **Send Confirmation Email**
```http
POST /api/notifications/reservation-confirmation
{
  "reservationId": "res_456",
  "includeWeatherInfo": true
}
```

## 📱 WebSocket Events (Real-time Updates)

### Connection
```javascript
const socket = io('/api/socket', {
  auth: {
    token: jwt_token
  }
});
```

### Events

#### Field Availability Updates
```javascript
// Subscribe to field updates
socket.emit('subscribe_field', { fieldId: 'field_123' });

// Receive availability updates
socket.on('field_availability_changed', (data) => {
  console.log('Availability updated:', data);
});
```

#### Weather Updates
```javascript
// Subscribe to weather updates for a city
socket.emit('subscribe_weather', { city: 'TUNIS' });

// Receive weather updates
socket.on('weather_updated', (data) => {
  console.log('Weather update:', data);
});
```

#### Reservation Status Changes
```javascript
// Receive reservation updates
socket.on('reservation_status_changed', (data) => {
  console.log('Reservation updated:', data);
});
```

## 🧪 Testing Endpoints

### Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "version": "1.0.0",
    "timestamp": "2024-12-20T10:30:00Z",
    "services": {
      "database": "connected",
      "weather_api": "operational",
      "email_service": "operational"
    }
  }
}
```

### Database Status
```http
GET /api/admin/database/status
Authorization: Bearer [admin_jwt_token]
```

### Weather API Status
```http
GET /api/weather/status
```

**Response:**
```json
{
  "success": true,
  "data": {
    "provider": "OpenWeatherMap",
    "status": "operational",
    "lastUpdate": "2024-12-20T10:25:00Z",
    "requestsToday": 245,
    "dailyLimit": 1000,
    "cities": ["TUNIS", "ARIANA", "BEN_AROUS"]
  }
}
```

## 📊 Data Models & Schemas

### Field Model
```typescript
interface Field {
  id: string;
  name: string;
  description?: string;
  city: 'TUNIS' | 'ARIANA' | 'BEN_AROUS';
  address: string;
  latitude: number;
  longitude: number;
  pricePerHour: number; // in millimes
  capacity: number;
  surfaceType: 'GRASS' | 'ARTIFICIAL_TURF' | 'CONCRETE' | 'INDOOR';
  facilities: string[];
  images: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
```

### Reservation Model
```typescript
interface Reservation {
  id: string;
  fieldId: string;
  userId: string;
  date: string; // ISO date
  startTime: string; // ISO datetime
  endTime: string; // ISO datetime
  totalPrice: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  weatherData?: WeatherSnapshot;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
```

### Weather Data Model
```typescript
interface WeatherData {
  temperature: number; // Celsius
  humidity: number; // Percentage
  condition: 'clear' | 'cloudy' | 'rain' | 'storm' | 'snow' | 'fog';
  description: string;
  windSpeed: number; // km/h
  windDirection: string; // Cardinal direction
  precipitationProbability: number; // Percentage
  precipitationAmount?: number; // mm
  playabilityScore: number; // 0-100
  icon: string; // Weather icon code
}
```

### User Model
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'USER' | 'ADMIN';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
```

## 🔧 API Integration Examples

### JavaScript/TypeScript Client
```typescript
class FootballReservationAPI {
  private baseURL: string;
  private token?: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  setAuthToken(token: string) {
    this.token = token;
  }

  async getFields(params: {
    city?: string;
    date?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<ApiResponse<FieldsData>> {
    const url = new URL(`${this.baseURL}/api/fields`);
    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.append(key, value.toString());
    });

    const response = await fetch(url.toString());
    return response.json();
  }

  async createReservation(data: {
    fieldId: string;
    date: string;
    startTime: string;
    endTime: string;
    notes?: string;
  }): Promise<ApiResponse<ReservationData>> {
    const response = await fetch(`${this.baseURL}/api/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async getWeatherForecast(city: string, days: number = 5): Promise<ApiResponse<WeatherForecastData>> {
    const response = await fetch(
      `${this.baseURL}/api/weather/forecast?city=${city}&days=${days}`
    );
    return response.json();
  }
}

// Usage example
const api = new FootballReservationAPI('https://your-domain.com');
api.setAuthToken(userJwtToken);

const fields = await api.getFields({ city: 'TUNIS', date: '2024-12-25' });
const weather = await api.getWeatherForecast('TUNIS');
```

### Python Client Example
```python
import requests
from typing import Optional, Dict, Any

class FootballReservationAPI:
    def __init__(self, base_url: str):
        self.base_url = base_url
        self.session = requests.Session()
    
    def set_auth_token(self, token: str):
        self.session.headers.update({'Authorization': f'Bearer {token}'})
    
    def get_fields(self, city: Optional[str] = None, 
                   date: Optional[str] = None) -> Dict[str, Any]:
        params = {}
        if city:
            params['city'] = city
        if date:
            params['date'] = date
            
        response = self.session.get(f'{self.base_url}/api/fields', params=params)
        return response.json()
    
    def create_reservation(self, field_id: str, date: str, 
                          start_time: str, end_time: str, 
                          notes: Optional[str] = None) -> Dict[str, Any]:
        data = {
            'fieldId': field_id,
            'date': date,
            'startTime': start_time,
            'endTime': end_time
        }
        if notes:
            data['notes'] = notes
            
        response = self.session.post(f'{self.base_url}/api/reservations', json=data)
        return response.json()

# Usage
api = FootballReservationAPI('https://your-domain.com')
api.set_auth_token(user_jwt_token)

fields = api.get_fields(city='TUNIS', date='2024-12-25')
reservation = api.create_reservation(
    field_id='field_123',
    date='2024-12-25',
    start_time='14:00',
    end_time='16:00',
    notes='Team practice'
)
```

## 🛡️ Security Considerations

### API Security Headers
```http
Content-Security-Policy: default-src 'self'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### Input Validation
All API endpoints implement:
- Request body size limits (1MB max)
- Input sanitization and validation
- SQL injection prevention via Prisma ORM
- XSS protection on all text inputs
- Rate limiting per endpoint

### Authentication Security
- JWT tokens expire after 24 hours
- Refresh tokens expire after 30 days
- Password hashing using bcrypt (12 rounds)
- Account lockout after 5 failed attempts
- Session invalidation on password change

## 📈 Performance Metrics

### Response Time Targets
- Field listing: < 200ms
- Field details: < 300ms
- Reservation creation: < 500ms
- Weather data: < 150ms (cached), < 1000ms (fresh)
- Search with filters: < 400ms

### Caching Strategy
- Weather data: 10 minutes TTL
- Field availability: 5 minutes TTL
- Static field data: 1 hour TTL
- User session data: 24 hours TTL

## 🔄 API Versioning

Current version: **v1**

Future versions will maintain backward compatibility:
- `/api/v1/fields` (current)
- `/api/v2/fields` (future)

### Breaking Changes Policy
- Major version updates for breaking changes
- 6 months deprecation notice
- Migration guides provided
- Parallel version support during transition

---

*This API documentation serves as the complete reference for integrating with the Football Field Reservation System. For additional examples and implementation details, refer to the technical specification and development setup guides.*",
  "endTime": "16:00",
  "notes": "Birthday party match"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "reservation": {
      "id": "res_456",
      "fieldId": "field_123",
      "userId": "user_789",
      "date": "2024-12-25T00:00:00Z",
      "startTime": "2024-12-25T14:00:00Z",
      "endTime": "2024-12-25T16:00:00Z",
      "totalPrice": 30000,
      "status": "CONFIRMED",
      "weatherData": {
        "temperature": 25,
        "condition": "sunny",
        "playabilityScore": 98
      },
      "createdAt": "2024-12-20T10:30:00Z"
    }
  }
}
```

### Get User Reservations
```http
GET /api/reservations?status=CONFIRMED&page=1&limit=5
Authorization: Bearer [jwt_token]
```

**Query Parameters:**
- `status` (optional): `PENDING` | `CONFIRMED` | `CANCELLED` | `COMPLETED`
- `startDate` (optional): Filter reservations from this date
- `endDate` (optional): Filter reservations until this date
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response:**
```json
{
  "success": true,
  "data": {
    "reservations": [
      {
        "id": "res_456",
        "field": {
          "id": "field_123",
          "name": "Stade El Menzah",
          "city": "TUNIS",
          "address": "Avenue Habib Bourguiba, El Menzah"
        },
        "date": "2024-12-25T00:00:00Z",
        "startTime": "2024-12-25T14:00:00Z",
        "endTime": "2024-12-25T16:00:00Z",
        "totalPrice": 30000,
        "status": "CONFIRMED",
        "weatherData": {
          "temperature": 25,
          "condition": "sunny",
          "playabilityScore": 98
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 5,
      "total": 12,
      "totalPages": 3
    }
  }
}
```

### Update Reservation
```http
PUT /api/reservations/[id]
Authorization: Bearer [jwt_token]
Content-Type: application/json

{
  "notes": "Updated match details",
  "status": "CANCELLED"
}
```

### Cancel Reservation
```http
DELETE /api/reservations/[id]
Authorization: Bearer [jwt_token]
```

**Response:**
```json
{
  "success": true,
  "message": "Reservation cancelled successfully",
  "data": {
    "refundAmount": 25000,
    "refundReason": "Weather-based cancellation"
  }
}
```

## 🌤️ Weather API

### Get Current Weather
```http
GET /api/weather/current?city=TUNIS
```

**Response:**
```json
{
  "success": true,
  "data": {
    "city": "TUNIS",
    "current": {
      "temperature": 24,
      "humidity": 65,
      "condition": "clear",
      "description": "Clear sky",
      "windSpeed": 12,
      "windDirection": "NW",
      "playabilityScore": 95,
      "icon": "01d"
    },
    "lastUpdated": "2024-12-20T10:00:00Z"
  }
}
```

### Get Weather Forecast
```http
GET /api/weather/forecast?city=TUNIS&days=5
```

**Response:**
```json
{
  "success": true,
  "data": {
    "city": "TUNIS",
    "forecast": [
      {
        "date": "2024-12-25",
        "hourly": [
          {
            "time": "08:00",
            "temperature": 22,
            "condition": "partly_cloudy",
            "precipitationProbability": 20,
            "playabilityScore": 85
          },
          {
            "time": "14:00",
            "temperature": 26,
            "condition": "sunny",
            "precipitationProbability": 5,
            "playabilityScore": 98
          }
        ],
        "daily": {
          "minTemp": 18,
          "maxTemp": 28,
          "condition": "sunny",
          "averagePlayabilityScore": 92
        }
      }
    ]
  }
}
```

## 📊 Analytics API (Admin Only)

### Get Booking Statistics
```http
GET /api/admin/analytics/bookings?startDate=2024-12-01&endDate=2024-12-31
Authorization: Bearer [admin_jwt_token]
```

### Get Popular Fields
```http
GET /api/admin/analytics/fields/popular?limit=5
Authorization: Bearer [admin_jwt_token]
```

### Get Weather Impact Report
```http
GET /api/admin/analytics/weather-impact?month=2024-12
Authorization: Bearer [admin_jwt_token]
```

## 🔧 Utility APIs

### Check Field Availability
```http
POST /api/fields/[id]/check-availability
Content-Type: application/json

{
  "date": "2024-12-25",
  "startTime": "14:00",
  "endTime": "16:00"
}
```

### Get Playability Score
```http
GET /api/weather/playability?city=TUNIS&date=2024-12-25&time=14:00
```

**Response:**
```json
{
  "success": true,
  "data": {
    "playabilityScore": 85,
    "factors": {
      "temperature": 8, // Score out of 10
      "precipitation": 9,
      "wind": 7,
      "visibility": 10
    },
    "recommendation": "Good conditions for football",
    "warnings": []
  }
}
```

## 📧 Notification API

### Send Reservation Confirmation
```http
POST /api/notifications/reservation-confirmation
Authorization: Bearer [jwt_token]
Content-Type: application/json

{
  "reservationId": "res_456",
  "emailTemplate": "confirmation",
  "includeWeatherInfo": true
}
```

## ❌ Error Responses

All API endpoints follow a consistent error response format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "startTime",
        "message": "Start time must be in HH:mm format"
      }
    ]
  },
  "timestamp": "2024-12-20T10:30:00Z"
}
```

### Common Error Codes
- `VALIDATION_ERROR`: Input validation failed
- `UNAUTHORIZED`: Invalid or missing authentication
- `FORBIDDEN`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `CONFLICT`: Resource conflict (e.g., double booking)
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `WEATHER_API_ERROR`: External weather service error
- `DATABASE_ERROR`: Database operation failed

## 🔐 Rate Limiting

- **General API calls**: 100 requests per minute per IP
- **Weather API calls**: 20 requests per minute per user
- **Reservation creation**: 10 requests per hour per user
- **Authentication attempts**: 5 attempts per 15 minutes per IP

## 📝 Request/Response Examples

### Complete Booking Flow Example

1. **Search Fields**
```http
GET /api/fields?city=TUNIS&date=2024-12-25&facilities=parking
```

2. **Check Weather**
```http
GET /api/weather/forecast?city=TUNIS&days=1
```

3. **Check Availability**
```http
POST /api/fields/field_123/check-availability
{
  "date": "2024-12-25",
  "startTime": "14:00",
  "endTime": "16:00"
}
```

4. **Create Reservation**
```http
POST /api/reservations
{
  "fieldId": "field_123",
  "date": "2024-12-25",
  "startTime": "14:00