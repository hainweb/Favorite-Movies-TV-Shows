# 🎬 Favorite Movies & TV Shows Manager

A modern, full-featured React application for managing your personal collection of favorite movies and TV shows. Built with React, TypeScript, Vite, and TailwindCSS with a stunning cinema-inspired dark theme.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.3-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6.svg)
![Vite](https://img.shields.io/badge/Vite-6.0-646cff.svg)

## ✨ Features

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

## 🖥️ Screenshots

### Home Page with Infinite Scroll
![Home Page](docs/screenshots/home.png)

### Add/Edit Entry Modal
![Add Entry](docs/screenshots/add-entry.png)

### Authentication
![Login](docs/screenshots/login.png)

## 🚀 Tech Stack

### Frontend Framework
- **React 18.3** - UI library
- **TypeScript 5.6** - Type safety
- **Vite 6.0** - Build tool and dev server

### Styling
- **TailwindCSS 3.4** - Utility-first CSS
- **Shadcn UI** - High-quality React components
- **Lucide React** - Beautiful icons

### State Management & Data Fetching
- **TanStack Query (React Query) 5.62** - Server state management
- **Axios 1.7** - HTTP client

### Form Handling
- **React Hook Form 7.54** - Form state management
- **Zod 3.24** - Schema validation

### Routing
- **React Router DOM 7.1** - Client-side routing

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Backend API running (see [Backend Setup](#backend-setup))

### Clone the Repository
```bash
git clone https://github.com/yourusername/movies-tv-manager.git
cd movies-tv-manager
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
Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Run Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The app will be available at `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── api/                    # API client functions
│   ├── auth.ts            # Authentication endpoints
│   └── entries.ts         # Entries CRUD endpoints
├── components/            # Reusable components
│   ├── ui/               # Shadcn UI components
│   ├── DeleteModal.tsx   # Delete confirmation modal
│   ├── EntryCard.tsx     # Entry display card
│   ├── EntryForm.tsx     # Add/Edit form modal
│   ├── Navbar.tsx        # Navigation bar
│   └── SearchFilterBar.tsx # Search and filter controls
├── hooks/                # Custom React hooks
│   └── useEntries.ts     # React Query hooks for entries
├── pages/                # Page components
│   ├── Home.tsx          # Main page with infinite scroll
│   ├── Login.tsx         # Login page
│   └── Signup.tsx        # Signup page
├── types/                # TypeScript type definitions
│   └── entry.ts          # Entry type and schemas
├── lib/                  # Utilities
│   └── utils.ts          # Helper functions
├── App.tsx               # Root component with routing
├── main.tsx              # Application entry point
└── index.css             # Global styles and Tailwind config
```

## 🔌 Backend API

This frontend requires a backend API with the following endpoints:

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Create new user account |
| POST | `/api/auth/login` | Login and receive JWT token |

### Entries
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/entries` | Get paginated entries (supports search & filter) |
| POST | `/api/entries` | Create new entry |
| PUT | `/api/entries/:id` | Update existing entry |
| DELETE | `/api/entries/:id` | Delete entry |

### Upload
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/upload` | Upload poster image |

**Authentication:** All `/api/entries` and `/api/upload` endpoints require `Authorization: Bearer <token>` header.

### Example API Response

#### GET /api/entries?page=1&limit=20
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
      "poster": "https://example.com/posters/inception.jpg",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "totalPages": 5,
    "totalItems": 95
  }
}
```

## 🎨 Customization

### Theme Colors
Edit `src/index.css` to customize the color scheme:

```css
:root {
  --primary: 174 72% 56%;        /* Teal accent */
  --background: 222.2 84% 4.9%;  /* Dark background */
  --card: 222.2 84% 6%;          /* Card background */
  /* ... more variables */
}
```

### Component Styling
All components use Tailwind utility classes. Modify classes directly in component files or extend the Tailwind config in `tailwind.config.js`.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🛠️ Backend Setup

You'll need a compatible backend API. Example Node.js/Express setup:

```javascript
// Example backend structure
const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const app = express();

// Auth routes
app.post('/api/auth/signup', (req, res) => { /* ... */ });
app.post('/api/auth/login', (req, res) => { /* ... */ });

// Protected entry routes
app.get('/api/entries', authenticateToken, (req, res) => { /* ... */ });
app.post('/api/entries', authenticateToken, (req, res) => { /* ... */ });
app.put('/api/entries/:id', authenticateToken, (req, res) => { /* ... */ });
app.delete('/api/entries/:id', authenticateToken, (req, res) => { /* ... */ });

// Image upload
app.post('/api/upload', authenticateToken, upload.single('file'), (req, res) => { /* ... */ });
```

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

The optimized files will be in the `dist/` directory.

### Deploy to Vercel
```bash
vercel deploy
```

### Deploy to Netlify
```bash
netlify deploy --prod
```

### Environment Variables for Production
Make sure to set `VITE_API_BASE_URL` in your hosting platform's environment variables.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- [Shadcn UI](https://ui.shadcn.com/) - Amazing component library
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React Query](https://tanstack.com/query) - Powerful data synchronization
- [Lucide Icons](https://lucide.dev/) - Beautiful icon set

## 📧 Support

If you have any questions or run into issues, please open an issue on GitHub or contact me at your.email@example.com

---

⭐ **If you find this project helpful, please consider giving it a star!** ⭐