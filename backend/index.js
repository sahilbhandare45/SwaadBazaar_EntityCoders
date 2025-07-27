// backend/index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// --- Import Routes ---
const authRoutes = require('./routes/authRoutes');
// Import the new dashboard routes which will be protected by the middleware.
const dashboardRoutes = require('./routes/dashboardRoutes'); 

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Set up middleware
app.use(cors());
app.use(express.json());

// --- Define API Routes ---
// Public routes for authentication (login, register)
app.use('/api/auth', authRoutes);

// Protected routes for the dashboard. 
// The 'protect' middleware is applied inside dashboardRoutes.js
app.use('/api/dashboard', dashboardRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
