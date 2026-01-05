// server/routes/moods.js
const express = require('express');
const router = express.Router();
const Mood = require('../models/Mood');
const jwt = require('jsonwebtoken');

// Middleware to check login
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (e) {
    res.status(400).json({ message: 'Token is not valid' });
  }
};

// @route   POST /api/moods
// @desc    Save today's mood
router.post('/', auth, async (req, res) => {
  try {
    const newMood = new Mood({
      user: req.user,
      mood: req.body.mood,
      note: req.body.note
    });
    const savedMood = await newMood.save();
    res.json(savedMood);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/moods
// @desc    Get user's mood history
router.get('/', auth, async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.user }).sort({ date: -1 });
    res.json(moods);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;