const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const brandRoutes = require('./routes/brand');
const statsRoutes = require('./routes/stats');
const reviewRoutes = require('./routes/reviews');

const app = express();

// ── Middleware ──
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// ── Rate limiting: 30 requests per 15 min per IP ──
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

// ── Routes ──
app.use('/api/brand', brandRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/reviews', reviewRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }));

// ── MongoDB ──
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
