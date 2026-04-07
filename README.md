# Sneha Car Travels - MERN Stack Website

Best Car Travels in Vijayawada - A full-stack car rental business website built with MERN stack.

## Project Structure

```
sneha-car-travels/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.jsx       # Main App component
│   │   ├── main.jsx      # Entry point
│   │   └── index.css     # Global styles
│   ├── public/           # Static assets
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── server/               # Node.js Backend
    ├── models/           # MongoDB models
    ├── routes/           # API routes
    ├── middleware/      # Custom middleware
    ├── index.js         # Server entry point
    ├── .env            # Environment variables
    └── package.json
```

## Features

- **Frontend**: React + Tailwind CSS + Framer Motion animations
- **Backend**: Node.js + Express + MongoDB
- **WhatsApp Integration**: Direct booking via WhatsApp
- **SEO Optimized**: Meta tags, Open Graph, JSON-LD
- **Responsive**: Mobile-first design
- **Booking System**: Form with validation + API storage

## Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

## Setup Instructions

### 1. Backend Setup

```bash
cd server
npm install
```

Update `.env` file with your MongoDB URI:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:5173
```

Start the backend:
```bash
npm run dev    # Development mode
# OR
npm start      # Production mode
```

### 2. Frontend Setup

```bash
cd client
npm install
```

Start the frontend:
```bash
npm run dev    # Development (http://localhost:5173)
# OR
npm run build  # Production build
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/bookings` | Create booking |
| GET | `/api/bookings` | Get all bookings |
| POST | `/api/contact` | Submit contact form |

## Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import project in Vercel
3. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`

### Backend (Render)
1. Push server code to GitHub
2. Create Web Service in Render
3. Set environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas URI
   - `PORT`: 5000

### Database (MongoDB Atlas)
1. Create free cluster
2. Create database user
3. Get connection string
4. Add to backend `.env`

## Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/sneha-car-travels
CORS_ORIGIN=https://your-frontend.vercel.app
```

## WhatsApp Configuration

Update the WhatsApp link in components:
- `Hero.jsx`
- `Services.jsx`
- `WhyChooseUs.jsx`
- `Contact.jsx`
- `Footer.jsx`

Link format: `https://wa.me/918143844844?text=Your message`

## Technologies Used

- **Frontend**: React 18, Tailwind CSS 3, Framer Motion 10, React Hot Toast
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB
- **Build Tools**: Vite

## License

Private - All rights reserved

## Contact

- Phone: +91 81438 44844
- Location: Bhavanipuram, Vijayawada