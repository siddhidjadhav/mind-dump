require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const thoughtRoutes = require('./routes/thoughtRoutes');
const authRoutes = require('./routes/authRoutes'); // If using auth

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', thoughtRoutes);
app.use('/api/auth', authRoutes); // Optional auth routes

// ✅ Root route (for health check or "Cannot GET /" fix)
app.get('/', (req, res) => {
  res.send('🧠 Mind Dump backend is running!');
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
