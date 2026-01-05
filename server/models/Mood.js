// server/models/Mood.js
const mongoose = require('mongoose');

const MoodSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  mood: { type: String, required: true }, // e.g., "Happy", "Sad", "Neutral"
  note: { type: String }, // Optional daily note
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Mood', MoodSchema);