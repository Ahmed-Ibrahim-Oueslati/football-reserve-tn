give me the steps to do this with an ai ide : 🧪 Capstone Part 2: Development & Implementation
This is where you bring your project to life using AI as your assistant—not your autopilot.
🎯 Goal
Build a functional, complete project while applying the AI planning strategy you created. You’ll use your IDE, AI tools, and context-aware prompting techniques to accelerate development.
🛠️ What You’ll Do
1. Build Core Features Implement the features outlined in your plan. Let AI help with:
   * Scaffolding boilerplate or logic
   * Writing tests
   * Writing docstrings and comments
   * Fixing bugs or errors
2. Review and Iterate Use AI-powered IDE assistants (e.g., CodeRabbit, Cursor, Zed) to:
   * Suggest code improvements
   * Generate changelogs
   * Review code before commits or PRs
   * Rewrite unclear logic or comments
3. Use Version Control Thoughtfully
   * Commit frequently with clear messages
   * Label or describe which parts were AI-generated
   * Optionally submit one PR using AI-generated summaries
4. Final Touches
   * Clean up any redundant code
   * Add README instructions, usage examples, and screenshots
   * Add a short reflection on how AI supported or challenged you
Tasks
0. Capstone Development
mandatory
Deliverable:
1. Push your full project to your GitHub repository created in the planning phase.
2. Your repo must include:
   * 📁 A functional codebase, clearly structured (e.g., /src, /components, /api, /docs)
   * 📄 An updated README.md with:
      * Setup and run instructions
      * Features implemented
      * Technologies used
      * Notes on AI usage (tools and contexts)
   * 📌 A reflection.md with:
      * A 500-word reflection on how AI impacted your build process
      * What worked well, what felt limiting, and what you learned about prompting, reviewing, and iterating
3. ✅ Commit Guidelines:
   * Use AI to generate commit messages where possible (e.g., CodeRabbit or IDE support)
   * Keep commits focused and well-labeled (e.g., feat: add vote-on-poll logic)
4. 🧠 AI Workflows You Should Show Evidence Of:
   * Prompting AI to generate endpoint clients from API Spec document (API-aware AI)
   * Using in-IDE AI to scaffold features, tests, and documentation
   * Performing AI-powered code reviews before pushing (e.g., with CodeRabbit)
   * Revising README or docstrings with suggestions from your assistant
5. 📸 Optional Enhancements:
   * Include screenshots of your editor showing AI interactions
   * Add a short demo video or link

🚀 Step-by-Step Guide: Capstone Part 2 Development with AI IDE
Here's your complete roadmap for building the football field reservation app using AI-enhanced development:

🎯 Phase 1: Project Setup & Foundation (Day 1)
Step 1: Repository Creation
bash
# Create and clone your repository
git clone https://github.com/yourusername/tunis-football-reservation.git
cd tunis-football-reservation

# Initialize Next.js project with AI assistance
🤖 AI Prompt for Cursor:

"Set up a Next.js 14 project with TypeScript, Tailwind CSS, and the following dependencies for a football field reservation app with weather integration:
- @prisma/client and prisma
- next-auth
- @hookform/resolvers and react-hook-form
- zod for validation
- axios for API calls
- @radix-ui components for shadcn/ui

Create the initial folder structure following Next.js 13+ app router conventions."
Step 2: Database Schema Design
🤖 AI Prompt for Cursor:

"Generate a Prisma schema for a football field reservation system with the following models:
- User (id, name, email, phone, role, createdAt, updatedAt)
- Field (id, name, description, city enum[TUNIS, ARIANA, BEN_AROUS], address, lat, lng, pricePerHour, capacity, surfaceType, facilities array, images array, isActive)
- Reservation (id, fieldId, userId, date, startTime, endTime, totalPrice, status enum, weatherData json, notes)
- FieldAvailability (id, fieldId, dayOfWeek, openTime, closeTime)
- WeatherCache (id, city, date, weatherData json, expiresAt)

Include proper relationships and indexes for performance."
Step 3: Environment Setup
🤖 AI Prompt:

"Create a complete .env.example file with all required environment variables for:
- PostgreSQL database connection
- NextAuth configuration
- OpenWeatherMap API key
- SMTP email settings
- Google Maps API (optional)

Also create a comprehensive .gitignore file for Next.js with additional entries for our specific dependencies."
📝 Commit Message (AI-Generated):

bash
git add .
git commit -m "feat: initial project setup with Next.js, Prisma schema, and environment configuration

- Configure Next.js 14 with TypeScript and Tailwind CSS
- Add Prisma schema for fields, reservations, and weather data
- Set up environment variables and database configuration
- Initialize project structure with app router conventions"
🏗️ Phase 2: Core Feature Development (Days 2-4)
Step 4: Database Operations & API Routes
🤖 AI Prompt for API Generation:

"Generate Next.js 14 API routes with the following specifications:

1. GET /api/fields - List fields with optional filters (city, date, facilities)
2. GET /api/fields/[id] - Get field details with availability slots
3. POST /api/reservations - Create new reservation with validation
4. GET /api/reservations - Get user reservations with filtering
5. GET /api/weather/forecast - Get weather forecast for specific city and date

Each route should:
- Use proper TypeScript interfaces
- Include Zod validation for request bodies
- Handle errors with appropriate HTTP status codes
- Use Prisma for database operations
- Include proper authentication checks where needed
- Return consistent JSON response format

Context: Using Prisma with PostgreSQL, NextAuth for authentication, OpenWeatherMap API for weather data."
📊 Track AI Usage: Document in development log:

Routes generated: 5/5 with AI assistance
Time saved: ~4 hours of boilerplate coding
Manual adjustments needed: Minor validation tweaks
Step 5: Weather Service Integration
🤖 AI Prompt:

"Create a comprehensive weather service class for integrating with OpenWeatherMap API:

Features needed:
- Get current weather for Tunis, Ariana, Ben Arous
- Get 5-day weather forecast with hourly data
- Calculate playability score (0-100) based on temperature, precipitation, wind
- Cache weather data for 10 minutes to avoid API limits
- Handle API errors gracefully with fallback data
- Transform API response to our internal WeatherData interface

Include proper TypeScript types and error handling. Use the city coordinates:
- TUNIS: lat=36.8065, lon=10.1815
- ARIANA: lat=36.8625, lon=10.1955  
- BEN_AROUS: lat=36.7545, lon=10.2301"
Step 6: Frontend Components Generation
🤖 AI Prompt for Component Scaffolding:

"Generate a complete set of React components for the football field reservation app:

1. FieldCard - Display field info with weather data and booking button
2. FieldList - Grid of field cards with filtering and pagination
3. ReservationForm - Form for booking a field with date/time selection
4. WeatherWidget - Display current weather and forecast
5. CalendarView - Show field availability with weather overlay
6. UserDashboard - Display user's reservations and booking history

Requirements:
- Use TypeScript with proper interfaces
- Style with Tailwind CSS following modern design patterns
- Include loading states and error handling
- Make components mobile-responsive
- Use React hooks for state management
- Include proper accessibility attributes
- Follow shadcn/ui design system

Context: Next.js 14 with app router, using Prisma types, integrating with weather API."
📝 AI-Generated Commit:

bash
git add .
git commit -m "feat: implement weather service and core UI components

- Add WeatherService class with OpenWeatherMap integration
- Create playability scoring algorithm for field conditions
- Generate FieldCard, FieldList, and ReservationForm components
- Implement responsive design with Tailwind CSS
- Add proper TypeScript interfaces and error handling
- Include loading states and accessibility features"
🧪 Phase 3: Testing & Quality Assurance (Day 5)
Step 7: AI-Generated Test Suite
🤖 AI Prompt for Testing:

"Generate a comprehensive test suite for the football field reservation system:

1. Unit tests for:
   - Weather service functions (API calls, playability scoring)
   - Utility functions (date validation, price calculation)
   - Prisma database operations
   
2. Integration tests for:
   - API routes (/api/fields, /api/reservations, /api/weather)
   - Authentication flows with NextAuth
   - Database operations with test data
   
3. Component tests for:
   - FieldCard rendering with different weather conditions
   - ReservationForm validation and submission
   - WeatherWidget data display
   
4. E2E test scenarios:
   - Complete booking flow from field search to confirmation
   - User registration and authentication
   - Weather-based field recommendations

Use Jest and React Testing Library. Include proper mocks for:
- OpenWeatherMap API responses
- Prisma database calls  
- NextAuth sessions
- Email service calls

Each test should have descriptive names and cover both happy path and error scenarios."
🔍 CodeRabbit Integration:

Set up CodeRabbit for automated PR reviews
Configure it to check test coverage (target: 80%+)
Enable security vulnerability scanning
Set up conventional commit message validation
Step 8: Performance & Security Review
🤖 AI Prompt for Optimization:

"Review and optimize the football field reservation app for:

1. Performance improvements:
   - Database query optimization with proper indexes
   - API response caching strategies
   - Image optimization for field photos
   - Bundle size optimization with code splitting

2. Security enhancements:
   - Input validation and sanitization
   - Rate limiting for API endpoints
   - CSRF protection verification
   - SQL injection prevention audit

3. Code quality improvements:
   - Remove unused imports and variables
   - Improve error handling consistency
   - Add proper TypeScript strict mode compliance
   - Optimize component re-rendering

Provide specific code improvements and explain the reasoning for each change."
🎨 Phase 4: UI/UX Polish & Documentation (Day 6)
Step 9: Enhanced User Experience
🤖 AI Prompt for UI Enhancement:

"Enhance the user interface for the football field reservation app with:

1. Advanced features:
   - Field search with autocomplete
   - Interactive map view with field markers
   - Weather-based field recommendations
   - Real-time availability updates
   - Mobile-first responsive design improvements

2. User experience improvements:
   - Loading skeletons for better perceived performance
   - Toast notifications for user feedback
   - Form validation with helpful error messages
   - Keyboard navigation support
   - Dark mode toggle option

3. Visual enhancements:
   - Weather condition icons and animations
   - Field image galleries with lightbox
   - Booking confirmation animations
   - Progress indicators for multi-step forms
   - Professional color scheme for sports theme

Use modern CSS animations, micro-interactions, and ensure accessibility compliance."
Step 10: Documentation Generation
🤖 AI Prompt for Documentation:

"Generate comprehensive documentation for the football field reservation project:

1. Update README.md with:
   - Clear installation and setup instructions
   - Feature list with screenshots
   - API documentation with example requests
   - Technologies used and architecture overview
   - Environment variables explanation
   - Deployment instructions

2. Create additional documentation:
   - API_REFERENCE.md with all endpoint details
   - DEPLOYMENT.md with step-by-step deployment guide
   - CONTRIBUTING.md with development guidelines
   - CHANGELOG.md with version history

3. Code documentation:
   - JSDoc comments for all functions and components
   - Inline comments explaining complex business logic
   - Type definitions with descriptive comments
   - README files for major directories

Include code examples, screenshots, and clear explanations for non-technical users."
🚀 Phase 5: Deployment & Final Polish (Day 7)
Step 11: Production Deployment
🤖 AI Prompt for Deployment:

"Set up production deployment for the football field reservation app:

1. Vercel configuration:
   - Configure build settings and environment variables
   - Set up custom domain if available
   - Configure serverless function settings
   - Set up automatic deployments from main branch

2. Database deployment:
   - Set up production PostgreSQL database (Railway/Supabase)
   - Configure connection pooling and security
   - Run production migrations safely
   - Set up database backups

3. Environment optimization:
   - Configure production environment variables
   - Set up monitoring and error tracking
   - Configure email service for production
   - Test all integrations in production environment

4. Performance monitoring:
   - Set up Vercel Analytics
   - Configure Core Web Vitals monitoring
   - Set up error reporting with Sentry
   - Create health check endpoints

Provide step-by-step deployment instructions and troubleshooting guide."
Step 12: Final Code Review & Reflection
🤖 CodeRabbit Final Review:

Run comprehensive code review using CodeRabbit
Generate final commit messages and PR descriptions
Create release notes with AI assistance
Generate CHANGELOG.md with all features implemented
📝 Create reflection.md:

🤖 AI Prompt for Reflection Template:

"Help me structure a 500-word reflection on using AI tools for this football field reservation project. Include sections for:

1. AI tools effectiveness (Cursor IDE, GitHub Copilot, CodeRabbit)
2. Development speed improvements and time savings
3. Code quality impact and learning benefits
4. Challenges faced and how AI helped solve them
5. Prompting strategies that worked best
6. Areas where manual intervention was needed
7. Overall impact on the development experience
8. Lessons learned for future AI-assisted projects

Provide a template structure I can fill in with my specific experiences."
📋 AI Workflow Evidence Checklist
✅ Required Evidence to Include:
API-Aware AI Usage:
Screenshots of generating API client from Prisma schema
Examples of type-safe database operations generated from schema
Weather API integration generated from OpenAPI documentation
In-IDE AI Scaffolding:
Screenshots of Cursor generating components
Examples of AI-generated test suites
Documentation generation examples
AI-Powered Code Reviews:
CodeRabbit PR review screenshots
AI-generated commit messages
Code improvement suggestions implemented
AI-Enhanced Documentation:
Before/after examples of AI-improved README sections
AI-generated API documentation
Automated changelog generation
📸 Optional Enhancements:
Development Screenshots:
Cursor AI chat conversations
CodeRabbit review suggestions
AI-generated code snippets
Demo Video:
2-3 minute walkthrough of the application
Highlight weather integration features
Show booking flow from start to finish
🎯 Success Metrics to Track:
Development Speed: Compare estimated vs actual development time
Code Quality: Track test coverage, linting issues, security vulnerabilities
AI Contribution: Percentage of code generated vs manually written
Feature Completion: All planned features implemented and tested
Documentation Quality: Comprehensive guides and examples provided
This step-by-step approach ensures you demonstrate intentional AI usage while building a production-quality application that showcases modern development practices enhanced by AI tools.