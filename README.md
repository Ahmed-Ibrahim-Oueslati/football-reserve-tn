# ⚽ Football Reserve TN

A modern, responsive football field reservation system built for Tunisia. This application allows users to browse available football fields, make reservations, and manage bookings with real-time availability updates.

![Football Reserve TN](./docs/screenshots/homepage.png)

## ✨ Features Implemented

### Core Features
- 🏟️ **Field Management**: Browse and search football fields by location, price, and amenities
- 📅 **Real-time Booking**: Interactive calendar with live availability updates
- 👤 **User Authentication**: Secure login/signup with NextAuth.js
- 💳 **Payment Integration**: Secure payment processing (Stripe integration ready)
- 📱 **Responsive Design**: Mobile-first design with Tailwind CSS
- 🌍 **Multi-language Support**: Arabic, French, and English localization

### Advanced Features
- 🔔 **Real-time Notifications**: Instant booking confirmations and updates
- 📊 **Analytics Dashboard**: Booking statistics and field utilization metrics
- 🗺️ **Interactive Maps**: Google Maps integration for field locations
- ⭐ **Review System**: User ratings and reviews for fields
- 📧 **Email Notifications**: Automated booking confirmations and reminders

## 🛠️ Technologies Used

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Radix UI** - Accessible component primitives

### Backend & Database
- **Prisma ORM** - Database toolkit and query builder
- **PostgreSQL** - Production database
- **NextAuth.js** - Authentication library
- **Zod** - Schema validation

### Development & Testing
- **Jest** - Testing framework
- **Testing Library** - Component testing utilities
- **ESLint & Prettier** - Code formatting and linting
- **Husky** - Git hooks for code quality

### DevOps
- **Docker** - Containerization
- **Vercel** - Deployment platform
- **GitHub Actions** - CI/CD pipeline

## 🚀 Quick Start

### Prerequisites
- Node.js 18.17.0 or higher
- npm 9.0.0 or higher
- PostgreSQL database
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ahmed-Ibrahim-Oueslati/football-reserve-tn.git
   cd football-reserve-tn
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/football_reserve"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   GOOGLE_MAPS_API_KEY="your-google-maps-key"
   STRIPE_PUBLISHABLE_KEY="your-stripe-public-key"
   STRIPE_SECRET_KEY="your-stripe-secret-key"
   ```

4. **Database Setup**
   ```bash
   npm run db:generate
   npm run db:push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Docker Setup (Alternative)

```bash
docker-compose up -d
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── fields/        # Field management endpoints
│   │   ├── bookings/      # Booking management endpoints
│   │   └── payments/      # Payment processing endpoints
│   ├── (auth)/           # Authentication pages
│   ├── dashboard/        # User dashboard
│   ├── fields/           # Field listing and details
│   └── bookings/         # Booking management
├── components/            # Reusable UI components
│   ├── ui/               # Basic UI components (buttons, inputs, etc.)
│   ├── forms/            # Form components
│   ├── layout/           # Layout components (header, footer, etc.)
│   └── features/         # Feature-specific components
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries and configurations
├── types/                # TypeScript type definitions
└── utils/                # Helper functions
```

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🔧 Development Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server

# Code Quality
npm run lint            # Run ESLint with auto-fix
npm run lint:check      # Check linting without fixes
npm run format          # Format code with Prettier
npm run type-check      # Run TypeScript type checking

# Database
npm run db:generate     # Generate Prisma client
npm run db:push         # Push schema changes to database
npm run db:migrate      # Run database migrations
npm run db:studio       # Open Prisma Studio
```

## 🤖 AI Usage Notes

This project was developed with extensive AI assistance using the following tools and approaches:

### AI Tools Used
- **GitHub Copilot** - Code completion and suggestion
- **ChatGPT/Claude** - Architecture planning and problem-solving
- **Cursor IDE** - AI-powered code editing and refactoring
- **CodeRabbit** - AI-powered code reviews

### AI-Assisted Development Areas
- **API Endpoint Generation** - Used AI to generate REST API endpoints from OpenAPI specifications
- **Component Scaffolding** - AI-generated React components with TypeScript interfaces
- **Test Generation** - Automated test case generation for components and API routes
- **Documentation** - AI-assisted README and inline code documentation
- **Bug Fixing** - AI-powered debugging and error resolution
- **Code Reviews** - Automated code quality suggestions and improvements

### Prompting Strategies Used
- **Context-Aware Prompting** - Provided full file context for better code suggestions
- **Incremental Development** - Used AI for step-by-step feature implementation
- **Test-Driven Development** - AI-generated tests before implementation
- **Documentation-First** - Used AI to generate comprehensive documentation

## 📸 Screenshots

### Homepage
![Homepage](./docs/screenshots/homepage.png)

### Field Booking Interface
![Booking Interface](./docs/screenshots/booking-interface.png)

### User Dashboard
![Dashboard](./docs/screenshots/dashboard.png)

## 🚀 Deployment

### Vercel Deployment
1. Fork this repository
2. Connect to Vercel
3. Add environment variables
4. Deploy

### Docker Deployment
```bash
docker build -t football-reserve-tn .
docker run -p 3000:3000 football-reserve-tn
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Commit Convention
This project follows [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test additions or modifications
- `chore:` - Maintenance tasks

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

Ahmed Ibrahim Oueslati - [your-email@example.com](mailto:your-email@example.com)

Project Link: [https://github.com/Ahmed-Ibrahim-Oueslati/football-reserve-tn](https://github.com/Ahmed-Ibrahim-Oueslati/football-reserve-tn)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first approach
- Prisma team for the excellent ORM
- All contributors and supporters of this project
- AI tools that accelerated development process