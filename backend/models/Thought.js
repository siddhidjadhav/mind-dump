const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  transcription: { type: String, required: true },
  category: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Thought', thoughtSchema);
