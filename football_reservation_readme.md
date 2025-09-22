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

### Backend
- **Runtime**: Node.js
- **Framework**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM (Production) / SQLite (Local Development)
- **Authentication**: NextAuth.js
- **Email Service**: Nodemailer with SMTP

## 🚀 Getting Started

### Local Development Setup

To get the application running locally, follow these steps. The setup now uses a local SQLite database to ensure it works out of the box without needing a remote database connection.

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Initialize the Database:**
    This command will create the local SQLite database file and set up the required tables.
    ```bash
    npx prisma db push
    ```

3.  **Seed the Database:**
    This command will populate the database with initial data (e.g., football fields).
    ```bash
    npx prisma db seed
    ```

4.  **Run the Development Server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

See [DEVELOPMENT_SETUP.md](./DEVELOPMENT_SETUP.md) for detailed setup instructions and [TECHNICAL_SPEC.md](./TECHNICAL_SPEC.md) for architecture details.

---

*This project demonstrates AI-enhanced development practices while solving a real-world problem for football enthusiasts in Tunis.*