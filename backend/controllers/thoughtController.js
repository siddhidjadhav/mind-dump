const Thought = require('../models/Thought');
const { categorizeText } = require('../utils/categorize');

exports.saveThought = async (req, res) => {
  try {
    console.log("👤 userId from token:", req.userId); // 🧪 Debug here
    const { transcription, timestamp } = req.body;

    const category = categorizeText(transcription);
    const thought = new Thought({
      user: req.userId,
      transcription,
      category,
      timestamp,
    });

    await thought.save();
    res.status(201).json(thought);
  } catch (err) {
    console.error('Error saving thought:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getUserThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find({ user: req.userId }).sort({ timestamp: -1 });
    res.status(200).json(thoughts);
  } catch (err) {
    console.error('Error fetching thoughts:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!thought) {
      return res.status(404).json({ error: 'Thought not found or unauthorized' });
    }

    res.status(200).json({ message: 'Thought deleted successfully' });
  } catch (err) {
    console.error('Error deleting thought:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
