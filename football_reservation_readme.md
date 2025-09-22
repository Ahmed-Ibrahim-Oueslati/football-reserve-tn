# ⚽ Football Field Reservation App - Tunis

## 🎯 Project Overview

A web application for reserving football fields in the three major cities of Tunis (Tunis, Ariana, and Ben Arous), integrated with real-time weather data to help users make informed booking decisions.

## 🌟 Key Features

### Core Functionality
- **Field Browsing**: View available football fields across Tunis metropolitan area
- **Real-time Weather Integration**: Display weather forecasts for reservation dates using free weather API
- **Reservation System**: Book fields for specific dates and time slots
- **Calendar View**: Interactive calendar showing availability and weather conditions
- **User Authentication**: Secure user registration and login
- **Booking Management**: View, modify, and cancel reservations

### Enhanced Features
- **Weather-Based Recommendations**: Suggest optimal booking times based on weather
- **Field Filtering**: Filter by location, price, facilities, and weather conditions
- **Mobile-Responsive Design**: Optimized for mobile and desktop usage
- **Email Notifications**: Confirmation and reminder emails for bookings

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **State Management**: React Context + useReducer
- **Calendar**: React Big Calendar or FullCalendar
- **Charts**: Recharts for weather data visualization

### Backend
- **Runtime**: Node.js
- **Framework**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Email Service**: Nodemailer with SMTP

### External APIs
- **Weather API**: OpenWeatherMap (free tier)
- **Maps**: Google Maps API for field locations

### Development Tools
- **Language**: TypeScript
- **Linting**: ESLint + Prettier
- **Testing**: Jest + React Testing Library
- **Database Migrations**: Prisma
- **Deployment**: Vercel

## 📡 AI Integration Plan

### 🧱 Code Generation & Feature Development

**AI Usage Strategy:**
- **Component Scaffolding**: Use AI to generate React components with TypeScript interfaces
- **API Route Generation**: Create CRUD operations for reservations and field management
- **Database Schema Design**: Generate Prisma models and relations
- **Weather Integration Logic**: Build weather API integration with error handling

**Sample Prompts:**
```
"Generate a TypeScript React component for a football field card that displays field name, location, price, facilities, and current weather. Include proper TypeScript interfaces and Tailwind CSS styling."

"Create a Next.js API route for handling football field reservations with validation, conflict checking, and weather data integration using Prisma ORM."
```

### 🧪 Testing Strategy

**AI-Assisted Testing:**
- **Unit Tests**: Generate tests for utility functions (date validation, price calculations)
- **Component Tests**: Create React Testing Library tests for UI components
- **API Tests**: Generate integration tests for reservation endpoints
- **Weather API Mocking**: Create mock responses for weather service testing

**Sample Testing Prompts:**
```
"Generate comprehensive Jest tests for a reservation validation function that checks date availability, time conflicts, and weather conditions."

"Create React Testing Library tests for a field booking form component including user interactions, form validation, and weather display."
```

### 📊 Schema-Aware Development

**Database-First Approach:**
- **Prisma Schema**: Use AI to generate comprehensive database schema
- **Type Generation**: Leverage Prisma's TypeScript generation with AI optimization
- **API Documentation**: Generate OpenAPI specs for all endpoints
- **Weather API Integration**: Type-safe weather data handling

**Schema Integration Strategy:**
```prisma
// AI will help expand this base schema
model Field {
  id          String   @id @default(cuid())
  name        String
  city        City
  address     String
  pricePerHour Int
  facilities   String[]
  reservations Reservation[]
}

model Reservation {
  id          String   @id @default(cuid())
  fieldId     String
  userId      String
  date        DateTime
  startTime   DateTime
  endTime     DateTime
  weatherData Json?
}
```

## 🔧 Development Workflow & AI Tools

### Primary AI Tools
- **Cursor IDE**: Primary development environment with AI pair programming
- **GitHub Copilot**: Code completion and suggestion
- **CodeRabbit**: Automated PR reviews and code quality checks
- **ChatGPT/Claude**: Complex problem solving and architecture decisions

### Code Review Strategy
- **Automated Reviews**: CodeRabbit for pull request analysis
- **AI Commit Messages**: Generate descriptive, conventional commit messages
- **Documentation**: AI-assisted README updates and inline comments
- **Refactoring**: AI-guided code optimization and structure improvements

### Prompting Strategy

**Effective Prompt Patterns:**
1. **Context-Rich Prompts**: Include existing code, database schema, and requirements
2. **Iterative Refinement**: Build features incrementally with AI feedback
3. **Error-Driven Development**: Use AI to debug and resolve issues quickly
4. **Documentation-First**: Generate comprehensive docs alongside code

**Sample Development Prompts:**
```
"Given this Prisma schema [schema], generate a type-safe API handler for creating football field reservations that includes weather data fetching, conflict checking, and email notifications."

"Refactor this React component to improve performance and add proper error boundaries while maintaining the existing weather integration functionality."
```

## 📁 Project Structure

```
football-reservation-app/
├── README.md
├── TECHNICAL_SPEC.md
├── DEVELOPMENT_LOG.md
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── fields/
│   │   ├── reservations/
│   │   └── dashboard/
│   ├── components/
│   │   ├── ui/
│   │   ├── field/
│   │   ├── reservation/
│   │   └── weather/
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── weather.ts
│   │   └── utils.ts
│   ├── hooks/
│   ├── types/
│   └── styles/
├── prisma/
├── tests/
├── docs/
└── public/
```

## 📈 Development Phases

### Phase 1: Foundation (Days 1-2)
- [ ] Project setup and configuration
- [ ] Database schema design with Prisma
- [ ] Basic UI components with Shadcn/ui
- [ ] Weather API integration setup

### Phase 2: Core Features (Days 3-4)
- [ ] Field listing and detail pages
- [ ] User authentication system
- [ ] Basic reservation functionality
- [ ] Weather data integration

### Phase 3: Enhancement (Days 5-6)
- [ ] Advanced booking features
- [ ] Calendar integration
- [ ] Email notifications
- [ ] Mobile optimization

### Phase 4: Testing & Deployment (Day 7)
- [ ] Comprehensive testing suite
- [ ] Performance optimization
- [ ] Documentation completion
- [ ] Deployment to Vercel

## 🌍 Tunis Field Locations

### Initial Field Database
- **Tunis City**: 5 fields (Olympic complexes, local clubs)
- **Ariana**: 3 fields (suburban sports centers)
- **Ben Arous**: 2 fields (municipal facilities)

## 🎯 Success Metrics

- ✅ Functional field reservation system
- ✅ Real-time weather integration
- ✅ Mobile-responsive design
- ✅ 90%+ test coverage
- ✅ Comprehensive documentation
- ✅ Deployed and accessible application

## 🚀 Getting Started

See [DEVELOPMENT_SETUP.md](./DEVELOPMENT_SETUP.md) for detailed setup instructions and [TECHNICAL_SPEC.md](./TECHNICAL_SPEC.md) for architecture details.

---

*This project demonstrates AI-enhanced development practices while solving a real-world problem for football enthusiasts in Tunis.*