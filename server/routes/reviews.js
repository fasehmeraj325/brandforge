const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

const isAdmin = (req, res, next) => {
  const secret = req.headers['x-admin-secret'] || req.query.secret;
  if (secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// GET /api/reviews — fetch approved reviews (public)
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find({ approved: true })
      .sort({ createdAt: -1 })
      .limit(20)
      .select('-__v');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// GET /api/reviews/admin — fetch all reviews (admin)
router.get('/admin', isAdmin, async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }).select('-__v');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// POST /api/reviews — submit a review (public)
router.post('/', async (req, res) => {
  try {
    const { name, role, rating, message } = req.body;
    if (!name || !message || !rating) {
      return res.status(400).json({ error: 'Name, rating and message are required' });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }
    const review = new Review({ name, role, rating, message });
    await review.save();
    res.json({ success: true, review });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit review' });
  }
});

// PATCH /api/reviews/:id/approve — toggle approval (admin)
router.patch('/:id/approve', isAdmin, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review not found' });
    review.approved = !review.approved;
    await review.save();
    res.json({ success: true, approved: review.approved });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update review' });
  }
});

// DELETE /api/reviews/:id (admin)
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

module.exports = router;
