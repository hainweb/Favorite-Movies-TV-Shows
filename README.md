# 🎬 Favorite Movies & TV Shows Manager

A modern, full-stack application for managing your personal collection of favorite movies and TV shows. Built with React, TypeScript, Vite, TailwindCSS on the frontend and Node.js, Express, Prisma ORM with MySQL on the backend.


![React](https://img.shields.io/badge/React-18.3-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6.svg)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933.svg)
![Express](https://img.shields.io/badge/Express-4.x-000000.svg)
![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748.svg)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1.svg)

## ✨ Features

### Frontend
- 🔐 **JWT Authentication** - Secure login/signup with token-based authentication
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- ♾️ **Infinite Scrolling** - Smooth lazy loading as you scroll
- 🔍 **Search & Filter** - Find entries by title or type (Movie/TV Show)
- 🖼️ **Poster Upload** - Upload and preview poster images
- ✏️ **CRUD Operations** - Add, edit, delete entries with modals
- 🎨 **Modern UI** - Cinema-inspired dark theme with smooth animations
- ⚡ **Optimized Performance** - React Query caching and optimistic updates
- 🛡️ **Form Validation** - Zod schema validation with React Hook Form
- 🔄 **Protected Routes** - Automatic redirection for authenticated routes

### Backend
- 🗄️ **RESTful API** - Clean, organized API endpoints
- 🔒 **JWT Authentication** - Secure user authentication and authorization
- 📊 **Prisma ORM** - Type-safe database queries with MySQL
- 📁 **File Uploads** - Image upload handling with Multer
- ✅ **Input Validation** - Request validation using Joi/Zod
- 🛡️ **Error Handling** - Centralized error handling middleware
- 🔐 **Protected Routes** - Middleware-based route protection
- 📝 **Request Logging** - Comprehensive API request logging
- 🏗️ **Modular Architecture** - Clean separation of concerns

## 🖥️ Screenshots

### Home Page with Infinite Scroll
![Home Page](docs/screenshots/home.png)

### Add/Edit Entry Modal
![Add Entry](docs/screenshots/add-entry.png)

### Authentication
![Login](docs/screenshots/login.png)

## 🚀 Tech Stack

### Frontend
- **React 18.3** - UI library
- **TypeScript 5.6** - Type safety
- **Vite 6.0** - Build tool and dev server
- **TailwindCSS 3.4** - Utility-first CSS
- **Shadcn UI** - High-quality React components
- **TanStack Query (React Query) 5.62** - Server state management
- **Axios 1.7** - HTTP client
- **React Hook Form 7.54** - Form state management
- **Zod 3.24** - Schema validation
- **React Router DOM 7.1** - Client-side routing
- **Lucide React** - Beautiful icons

### Backend
- **Node.js 18+** - JavaScript runtime
- **Express 4.x** - Web application framework
- **Prisma 5.x** - Next-generation ORM
- **MySQL 8.0** - Relational database
- **JWT (jsonwebtoken)** - Authentication tokens
- **Bcrypt** - Password hashing
- **Multer** - File upload middleware
- **Joi/Zod** - Input validation
- **Cors** - Cross-origin resource sharing
- **Dotenv** - Environment configuration

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- MySQL 8.0+ database server
- Git

### Clone the Repository
```bash
git clone https://github.com/hainweb/Favorite-Movies-TV-Shows.git
cd movies-tv-manager
```

---

## 🎨 Frontend Setup

### Navigate to Frontend Directory
```bash
cd frontend
```

### Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### Environment Configuration
Create a `.env` file in the `frontend` directory:

```env
VITE_API_BASE_URL=http://localhost:5000
```

### Run Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The frontend will be available at `http://localhost:8080`

### Frontend Project Structure

```
frontend/
├── src/
│   ├── api/                    # API client functions
│   │   ├── auth.ts            # Authentication endpoints
│   │   └── entries.ts         # Entries CRUD endpoints
│   ├── components/            # Reusable components
│   │   ├── ui/               # Shadcn UI components
│   │   ├── DeleteModal.tsx   # Delete confirmation modal
│   │   ├── EntryCard.tsx     # Entry display card
│   │   ├── EntryForm.tsx     # Add/Edit form modal
│   │   ├── Navbar.tsx        # Navigation bar
│   │   └── SearchFilterBar.tsx # Search and filter controls
│   ├── hooks/                # Custom React hooks
│   │   └── useEntries.ts     # React Query hooks for entries
│   ├── pages/                # Page components
│   │   ├── Home.tsx          # Main page with infinite scroll
│   │   ├── Login.tsx         # Login page
│   │   └── Signup.tsx        # Signup page
│   ├── types/                # TypeScript type definitions
│   │   └── entry.ts          # Entry type and schemas
│   ├── lib/                  # Utilities
│   │   └── utils.ts          # Helper functions
│   ├── App.tsx               # Root component with routing
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles and Tailwind config
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

---

## 🔧 Backend Setup

### Navigate to Backend Directory
```bash
cd backend
```

### Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### Environment Configuration
Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DATABASE_URL="mysql://username:password@localhost:3306/movies_db"

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# File Upload Configuration
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
```

### Database Setup

#### Create MySQL Database
```sql
CREATE DATABASE movies_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### Initialize Prisma
```bash
npx prisma generate
npx prisma migrate dev --name init
```

#### Seed Database (Optional)
```bash
npm run seed
```

### Run Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The backend API will be available at `http://localhost:5000`

### Backend Project Structure

```
backend/
├── src/
│   ├── config/                # Application configuration
│   │   ├── database.js       # Database connection setup
│   │   └── env.js            # Environment variable management
│   ├── controllers/          # Request handlers
│   │   ├── authController.js # Authentication logic
│   │   ├── entryController.js # Entry CRUD operations
│   │   └── uploadController.js # File upload handling
│   ├── services/             # Business logic layer
│   │   ├── authService.js    # Authentication business logic
│   │   ├── entryService.js   # Entry business logic
│   │   └── uploadService.js  # Upload business logic
│   ├── routes/               # API route definitions
│   │   ├── authRoutes.js     # Authentication routes
│   │   ├── entryRoutes.js    # Entry routes
│   │   └── uploadRoutes.js   # Upload routes
│   ├── middlewares/          # Express middlewares
│   │   ├── auth.js           # JWT authentication middleware
│   │   ├── errorHandler.js   # Centralized error handling
│   │   ├── logger.js         # Request logging
│   │   └── upload.js         # Multer upload configuration
│   ├── validations/          # Input validation schemas
│   │   ├── authValidation.js # Auth input validation
│   │   └── entryValidation.js # Entry input validation
│   ├── utils/                # Utility functions
│   │   ├── jwt.js            # JWT helper functions
│   │   └── helpers.js        # General helpers
│   └── server.js             # Application entry point
├── prisma/
│   ├── schema.prisma         # Prisma schema definition
│   ├── migrations/           # Database migrations
│   └── seed.js               # Database seeding script
├── uploads/                  # Uploaded files directory
├── .env                      # Environment variables
├── package.json
└── nodemon.json
```

### Backend Architecture

The backend follows a **modular, layered architecture** ensuring scalability, maintainability, and clean code separation:

#### **1. Configuration Layer** (`config/`)
- Handles application configuration
- Manages database connections
- Processes environment variables
- Centralizes app-wide settings

#### **2. Route Layer** (`routes/`)
- Defines all API endpoints
- Maps routes to controller functions
- Applies route-specific middleware
- Groups related endpoints logically

#### **3. Middleware Layer** (`middlewares/`)
- **Authentication**: JWT token verification
- **Authorization**: Role-based access control
- **Error Handling**: Centralized error processing
- **Request Logging**: API activity tracking
- **File Upload**: Multer configuration for image uploads
- **Validation**: Request data validation

#### **4. Controller Layer** (`controllers/`)
- Handles HTTP request/response
- Validates request data
- Calls appropriate service functions
- Returns formatted responses
- Manages HTTP status codes

#### **5. Service Layer** (`services/`)
- Contains core business logic
- Communicates with Prisma for database operations
- Performs data transformations
- Handles complex computations
- Separates database operations from controllers

#### **6. Validation Layer** (`validations/`)
- Input validation using Joi or Zod
- Schema definitions for all endpoints
- Ensures data integrity
- Provides clear validation error messages

#### **7. Database Layer** (`prisma/`)
- Prisma schema definitions
- Database migrations
- Model relationships
- Seeding scripts

#### **8. Utilities** (`utils/`)
- JWT token generation/verification
- Helper functions
- Common operations
- Shared utilities

### Key Backend Features

#### **JWT Authentication Flow**
1. User registers/logs in via `/api/auth/signup` or `/api/auth/login`
2. Server validates credentials and generates JWT token
3. Token sent to client and stored in localStorage
4. Client includes token in `Authorization: Bearer <token>` header
5. Protected routes verify token via auth middleware
6. Token contains user ID and expires after configured time

#### **Error Handling**
- Centralized error handling middleware
- Custom error classes for different error types
- Consistent error response format
- Detailed logging for debugging
- Production-safe error messages

#### **File Upload Process**
1. Client uploads file via `/api/upload` endpoint
2. Multer middleware processes multipart/form-data
3. File validation (size, type, format)
4. File saved to `uploads/` directory with unique name
5. File URL returned to client
6. URL stored in database with entry record

#### **Database Operations**
- All database queries through Prisma ORM
- Type-safe database operations
- Automatic query optimization
- Transaction support for complex operations
- Migration-based schema management

---

## 🔌 API Documentation

### Base URL
```
http://localhost:5000
```

### Authentication Endpoints

#### **Signup**
```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (201 Created):**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### **Login**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "user": {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Entry Endpoints (Protected)

> **Note:** All entry endpoints require `Authorization: Bearer <token>` header

#### **Get All Entries (Paginated)**
```http
GET /api/entries?page=1&limit=20&search=Inception&type=Movie
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "1",
      "title": "Inception",
      "type": "Movie",
      "director": "Christopher Nolan",
      "year": "2010",
      "duration": "148 min",
      "budget": "$160 million",
      "location": "Various",
      "poster": "http://localhost:5000/uploads/inception.jpg",
      "userId": "1",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "totalPages": 5,
    "totalItems": 95
  }
}
```

#### **Create Entry**
```http
POST /api/entries
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Inception",
  "type": "Movie",
  "director": "Christopher Nolan",
  "year": "2010",
  "duration": "148 min",
  "budget": "$160 million",
  "location": "Various",
  "poster": "http://localhost:5000/uploads/inception.jpg"
}
```

**Response (201 Created):**
```json
{
  "message": "Entry created successfully",
  "entry": {
    "id": "1",
    "title": "Inception",
    "type": "Movie",
    "director": "Christopher Nolan",
    "year": "2010",
    "duration": "148 min",
    "budget": "$160 million",
    "location": "Various",
    "poster": "http://localhost:5000/uploads/inception.jpg",
    "userId": "1",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

#### **Update Entry**
```http
PUT /api/entries/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Inception (Updated)",
  "director": "Christopher Nolan"
}
```

**Response (200 OK):**
```json
{
  "message": "Entry updated successfully",
  "entry": {
    "id": "1",
    "title": "Inception (Updated)",
    "type": "Movie",
    "director": "Christopher Nolan",
    "year": "2010",
    "duration": "148 min",
    "budget": "$160 million",
    "location": "Various",
    "poster": "http://localhost:5000/uploads/inception.jpg",
    "userId": "1",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T12:45:00Z"
  }
}
```

#### **Delete Entry**
```http
DELETE /api/entries/:id
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "message": "Entry deleted successfully"
}
```

### Upload Endpoint (Protected)

#### **Upload Poster Image**
```http
POST /api/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: [binary image data]
```

**Response (200 OK):**
```json
{
  "url": "http://localhost:5000/uploads/1234567890-inception.jpg"
}
```

### Error Responses

#### **Validation Error (400)**
```json
{
  "error": "Validation Error",
  "message": "Invalid input data",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

#### **Unauthorized (401)**
```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

#### **Forbidden (403)**
```json
{
  "error": "Forbidden",
  "message": "You don't have permission to access this resource"
}
```

#### **Not Found (404)**
```json
{
  "error": "Not Found",
  "message": "Entry not found"
}
```

#### **Server Error (500)**
```json
{
  "error": "Internal Server Error",
  "message": "Something went wrong on the server"
}
```

---

## 🗄️ Database Schema

### Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  password  String
  entries   Entry[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}

model Entry {
  id        String   @id @default(uuid())
  title     String
  type      String   // "Movie" or "TV Show"
  director  String?
  budget    String?
  location  String?
  duration  String?
  year      String?
  poster    String?
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([userId])
  @@index([type])
  @@map("entries")
}
```

### Database Relationships
- **User** has many **Entries** (One-to-Many)
- **Entry** belongs to one **User**
- Cascade delete: Deleting a user deletes all their entries

---

## 🎨 Customization

### Frontend Theme Colors
Edit `frontend/src/index.css` to customize the color scheme:

```css
:root {
  --primary: 174 72% 56%;        /* Teal accent */
  --background: 222.2 84% 4.9%;  /* Dark background */
  --card: 222.2 84% 6%;          /* Card background */
  /* ... more variables */
}
```

---

## 🔧 Available Scripts

### Frontend Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend Scripts
```bash
npm run dev              # Start development server with nodemon
npm start                # Start production server
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio (DB GUI)
npm run seed             # Seed database with sample data
```


---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards
- Follow ESLint configuration for JavaScript/TypeScript
- Use Prettier for code formatting
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation for new features

---

## 🐛 Troubleshooting

### Common Issues

#### **Frontend can't connect to backend**
- Verify `VITE_API_BASE_URL` in frontend `.env`
- Check backend is running on correct port
- Ensure CORS is configured properly

#### **Database connection failed**
- Verify MySQL is running: `sudo systemctl status mysql`
- Check `DATABASE_URL` in backend `.env`
- Ensure database exists: `CREATE DATABASE movies_db;`

#### **JWT token errors**
- Clear localStorage in browser
- Verify `JWT_SECRET` is set in backend `.env`
- Check token hasn't expired

#### **File upload fails**
- Verify `uploads/` directory exists and has write permissions
- Check `MAX_FILE_SIZE` setting
- Ensure file type is allowed (jpg, png, gif)


---


## 🙏 Acknowledgments

### Frontend
- [Shadcn UI](https://ui.shadcn.com/) - Amazing component library
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React Query](https://tanstack.com/query) - Powerful data synchronization
- [Lucide Icons](https://lucide.dev/) - Beautiful icon set

### Backend
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [Express](https://expressjs.com/) - Fast, unopinionated web framework
- [JWT](https://jwt.io/) - JSON Web Token standard


---



⭐ **If you find this project helpful, please consider giving it a star!** ⭐

