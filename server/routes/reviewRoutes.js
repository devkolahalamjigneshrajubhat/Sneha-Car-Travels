const express = require('express');
const { body } = require('express-validator');
const Review = require('../models/Review');
const validate = require('../middleware/validation');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find({ status: 'approved' }).sort({ createdAt: -1 }).limit(6);
    res.json({ success: true, count: reviews.length, reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('location').trim().notEmpty().withMessage('Location is required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('message').trim().notEmpty().withMessage('Message is required')
  ],
  validate,
  async (req, res) => {
    try {
      const { name, location, rating, message } = req.body;

      const review = new Review({
        name,
        location,
        rating,
        message
      });

      await review.save();

      res.status(201).json({
        success: true,
        message: 'Thank you for your review!',
        review
      });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

module.exports = router;