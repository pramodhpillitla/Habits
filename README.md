<div align="center">
  <h1>🎯 Habit Due</h1>
  <p>
    <strong>A robust, full-stack Progressive Web Application (PWA) for cultivating routines and tracking daily habits.</strong>
  </p>
  
  [![React](https://img.shields.io/badge/React-19.x-blue.svg)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
  [![Express](https://img.shields.io/badge/Express-5.x-lightgrey.svg)](https://expressjs.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248.svg)](https://www.mongodb.com/)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC.svg)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
</div>

<br />

## 📖 Overview

**Habit Due** is a comprehensive, production-ready habit tracking platform engineered with the MERN stack (MongoDB, Express, React, Node.js). Designed with a mobile-first philosophy and progressive web app (PWA) capabilities, it allows users to establish, monitor, and analyze their daily routines seamlessly across devices.

At its core, this application emphasizes **performance, security, and exceptional user experience**, leveraging modern web development patterns and state-of-the-art libraries.

---

## ✨ Key Features

- 🔐 **Secure Authentication System:** Enterprise-grade security using JWTs, HTTP-only cookies, password hashing (bcrypt), and intelligent token blacklisting.
- 📊 **Advanced Analytics:** Real-time dashboards featuring consistency tracking, historical data visualization, and habit completion metrics.
- 📱 **Progressive Web App (PWA):** Installable on iOS/Android and desktops, featuring offline asset caching and a native app-like experience.
- 🛡️ **Robust Security Posture:** Hardened backend utilizing `helmet` for HTTP headers, `express-rate-limit` for DDOS protection, and `zod` for rigorous schema validation.
- 🎨 **Modern UI/UX:** A responsive, accessible, and beautiful interface powered by React 19, Tailwind CSS v4, and Lucide icons.

---

## 🏗️ Architecture & Tech Stack

### Frontend (Client)
- **Framework:** React 19 + Vite (for lightning-fast HMR and optimized builds)
- **Routing:** React Router v7
- **Styling:** Tailwind CSS v4
- **State & UI Feedback:** React Hot Toast for non-blocking notifications
- **Icons:** Lucide React
- **PWA:** `vite-plugin-pwa` for manifest generation and service worker management

### Backend (Server)
- **Runtime:** Node.js
- **Framework:** Express.js (v5.x)
- **Database:** MongoDB (via Mongoose ORM)
- **Validation:** Zod (Type-safe schema validation)
- **Security:** Helmet, CORS, Express Rate Limit, Cookie Parser
- **Authentication:** JSON Web Tokens (JWT) + bcrypt

---

## 🚀 Getting Started

### Prerequisites
Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster)
- [Git](https://git-scm.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/habits-app.git
cd habits-app
```

### 2. Backend Setup
```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Start the development server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window and navigate to the frontend directory:
```bash
cd Frontend
npm install
```

Create a `.env` file in the `Frontend` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## 🌐 Deployment Guidelines

The architecture is explicitly designed for seamless CI/CD. 

### Backend Deployment (Render / Heroku / AWS)
1. Ensure the `NODE_ENV` is set to `production`.
2. Configure environment variables (especially `MONGO_URI`, `JWT_SECRET`, and `CLIENT_URL`).
3. The server uses `npm start` (which executes `node server.js`) to boot in production environments.

### Frontend Deployment (Vercel / Netlify)
1. Set the Build Command to `npm run build` and Output Directory to `dist`.
2. Inject the `VITE_API_URL` environment variable pointing to your deployed backend URL.
3. Ensure to configure rewrite rules for SPA routing if not using Vercel.

*(For detailed, step-by-step deployment instructions on Render & Vercel, refer to our Deployment Guide)*

---

## 📂 Project Structure

```text
Habits/
├── Backend/                 # Express API
│   ├── src/
│   │   ├── config/          # Database & environment configurations
│   │   ├── controllers/     # Request handlers (Habits, Auth, Analytics)
│   │   ├── middleware/      # Auth checks, validation, rate limiters
│   │   ├── models/          # Mongoose schemas (Habit, User, Token)
│   │   ├── routes/          # Express router definitions
│   │   ├── services/        # Business logic abstraction
│   │   └── app.js           # Express app instance initialization
│   ├── server.js            # Server entry point
│   └── package.json
│
└── Frontend/                # React SPA
    ├── src/
    │   ├── assets/          # Static files & PWA icons
    │   ├── components/      # Reusable UI components (Analytics, Dashboard)
    │   ├── constants/       # Global constants
    │   ├── pages/           # Route views (Analytics, Manage, Auth)
    │   ├── utils/           # API fetch wrappers, date formatters
    │   ├── App.jsx          # Root component & Routing
    │   └── main.jsx         # React DOM renderer
    ├── vite.config.js       # Vite & PWA configuration
    └── package.json
```

---

## 🤝 Contributing

Contributions are always welcome. To contribute:
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---
<div align="center">
  <i>Engineered with excellence. Built for consistency.</i>
</div>
