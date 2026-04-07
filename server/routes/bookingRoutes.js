const express = require('express');
const { body } = require('express-validator');
const Booking = require('../models/Booking');
const validate = require('../middleware/validation');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({ success: true, count: bookings.length, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('phone').trim().matches(/^[6-9]\d{9}$/).withMessage('Please enter a valid phone number'),
    body('pickupLocation').trim().notEmpty().withMessage('Pickup location is required'),
    body('dropLocation').trim().notEmpty().withMessage('Drop location is required'),
    body('date').trim().notEmpty().withMessage('Travel date is required')
  ],
  validate,
  async (req, res) => {
    try {
      const { name, phone, pickupLocation, dropLocation, date, message } = req.body;

      const booking = new Booking({
        name,
        phone,
        pickupLocation,
        dropLocation,
        date,
        message: message || ''
      });

      await booking.save();

      res.status(201).json({
        success: true,
        message: 'Booking submitted successfully',
        booking
      });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

module.exports = router;