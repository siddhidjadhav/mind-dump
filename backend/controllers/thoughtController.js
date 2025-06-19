const Thought = require('../models/Thought');

exports.saveThought = async (req, res) => {
  try {
    const { transcription, category } = req.body;
    const userId = req.userId;

    const newThought = await Thought.create({ userId, transcription, category });
    res.status(201).json({ message: 'Thought saved', thought: newThought });
  } catch (err) {
    console.error('Save thought error:', err);
    res.status(500).json({ error: 'Failed to save thought' });
  }
};

exports.getUserThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find({ userId: req.userId }).sort({ timestamp: -1 });
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch thoughts' });
  }
};
