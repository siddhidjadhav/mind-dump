const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  transcription: String,
  category: String,
  timestamp: Date
});

module.exports = mongoose.model('Thought', thoughtSchema);
