const express = require('express');
const { body } = require('express-validator');
const Contact = require('../models/Contact');
const validate = require('../middleware/validation');

const router = express.Router();

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('phone').trim().matches(/^[6-9]\d{9}$/).withMessage('Please enter a valid phone number'),
    body('message').trim().notEmpty().withMessage('Message is required')
  ],
  validate,
  async (req, res) => {
    try {
      const { name, phone, message } = req.body;

      const contact = new Contact({ name, phone, message });
      await contact.save();

      res.status(201).json({
        success: true,
        message: 'Message sent successfully'
      });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

module.exports = router;