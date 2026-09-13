# Real-Time Chat Application

A modern, full-stack real-time chat application built with React and Express.js. Features real-time messaging, user authentication, profile management, and online status tracking.

## Features

- **Real-Time Messaging** - Instant message delivery using WebSocket (Socket.io)
- **User Authentication** - Secure JWT-based authentication with bcrypt password hashing
- **User Profiles** - User registration, login, and profile management
- **Avatar Upload** - Upload and store profile pictures via Cloudinary
- **Conversation Management** - Create and manage conversations with other users
- **Online Status** - Real-time presence tracking
- **Message History** - Persistent message storage in MongoDB
- **Responsive Design** - Mobile-friendly UI with Tailwind CSS
- **Search Functionality** - Find and filter conversations
- **Analytics** - User activity tracking and analytics

## Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - React component library
- **Socket.io Client** - Real-time communication
- **Axios** - HTTP client
- **Zustand** - State management
- **React Router** - Client-side routing
- **React Hot Toast** - Toast notifications
- **Framer Motion** - Animation library

### Backend
- **Express.js** - Web framework
- **Socket.io** - WebSocket library for real-time communication
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Redis** - Caching and session management
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Cloudinary** - Cloud image storage
- **Multer** - File upload handling
- **Zod** - Schema validation

## Project Structure

```
chat_app_react/
├── client/                          # React frontend
│   ├── src/
│   │   ├── components/             # Reusable React components
│   │   │   ├── drawer/            # Drawer UI component
│   │   │   ├── messages/          # Message-related components
│   │   │   ├── sidebar/           # Sidebar and conversation list
│   │   │   ├── skeletons/         # Loading skeleton components
│   │   │   └── users/             # User profile components
│   │   ├── pages/                 # Page components
│   │   │   ├── home/              # Main chat page
│   │   │   ├── login/             # Login page
│   │   │   └── signup/            # Signup page
│   │   ├── context/               # React context API
│   │   │   ├── AuthContext.jsx    # Authentication state
│   │   │   └── SocketContext.jsx  # WebSocket connection
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── utils/                 # Utility functions
│   │   ├── zustand/               # Zustand state management
│   │   ├── App.jsx                # Main App component
│   │   └── main.jsx               # React entry point
│   ├── vite.config.js             # Vite configuration
│   ├── tailwind.config.js          # Tailwind CSS config
│   └── package.json               # Frontend dependencies
│
├── server/                          # Express backend
│   ├── controllers/               # Request handlers
│   │   ├── auth.controller.js     # Authentication logic
│   │   ├── message.controller.js  # Message logic
│   │   └── user.controller.js     # User logic
│   ├── routes/                    # API routes
│   │   ├── auth.js                # Auth endpoints
│   │   ├── message.routes.js      # Message endpoints
│   │   └── user.js                # User endpoints
│   ├── models/                    # MongoDB schemas
│   │   ├── users.js              # User model
│   │   ├── messages.js           # Message model
│   │   └── conversation.js       # Conversation model
│   ├── middleware/               # Express middleware
│   │   ├── protectRoute.js       # Auth guard
│   │   └── upload.js             # File upload handling
│   ├── socket/                   # Socket.io handlers
│   │   └── socket.js             # WebSocket configuration
│   ├── config/                   # Configuration
│   │   ├── env.js                # Environment variables
│   │   └── cloudinary/           # Cloudinary setup
│   ├── db/                       # Database
│   │   └── connectToMongoDB.js   # MongoDB connection
│   ├── utils/                    # Utility functions
│   │   ├── token.js              # JWT utilities
│   │   ├── redisClient.js        # Redis client
│   │   └── errorHandler.js       # Error handling
│   ├── server.js                 # Express server setup
│   └── package.json              # Backend dependencies
│
├── quick-test.sh                   # Quick test script
└── README.md                       # This file
```

## Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas)
- **Redis** (for caching and sessions)
- **Cloudinary Account** (for image uploads)

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd chat_app_react
```

### 2. Install dependencies

**Frontend:**
```bash
cd client
npm install
```

**Backend:**
```bash
cd ../server
npm install
```

## Environment Variables

### Server Configuration

Create a `.env` file in the `server` directory with the following variables:

```env
# Server
NODE_ENV=development
PORT=5001
CLIENT_URL=http://localhost:5173

# MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

See `server/env.example` for reference.

## Running the Application

### Development Mode

**Terminal 1 - Start Redis:**
```bash
redis-server
```

**Terminal 2 - Start Backend:**
```bash
cd server
npm run dev
```

The server will run on `http://localhost:5001`

**Terminal 3 - Start Frontend:**
```bash
cd client
npm run dev
```

The client will run on `http://localhost:5173`

### Production Build

**Build the frontend:**
```bash
cd client
npm run build
```

**Start the backend:**
```bash
cd server
npm start
```

## Available Scripts

### Frontend (`client/`)

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend (`server/`)

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run start:redis` - Start Redis server

## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /login` - User login
- `POST /signup` - User registration
- `POST /logout` - User logout

### Message Routes (`/api/messages`)
- `GET /conversations` - Get all user conversations
- `GET /:id` - Get messages from a conversation
- `POST /send/:id` - Send a message to a conversation

### User Routes (`/api/users`)
- `GET /` - Get all users
- `PUT /edit` - Update user profile
- `POST /avatar` - Upload avatar

## Architecture Highlights

### Real-Time Communication
- Socket.io enables real-time message delivery and presence tracking
- Socket events handle message sending, receiving, and user status updates

### Authentication & Security
- JWT tokens stored in HTTP-only cookies
- Passwords hashed using bcryptjs
- Protected routes with middleware authentication

### Database
- MongoDB stores users, conversations, and messages
- Mongoose ODM for schema validation
- Redis caches frequently accessed data

### File Storage
- Cloudinary integration for secure image uploads
- Avatar images stored in the cloud

### State Management
- Zustand for lightweight global state
- React Context API for auth and socket state

## Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

For issues, questions, or suggestions, please create an issue in the repository.
