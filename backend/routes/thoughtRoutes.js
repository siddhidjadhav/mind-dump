// backend/routes/thoughtRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  saveThought,
  getUserThoughts,
  deleteThought
} = require('../controllers/thoughtController');

router.post('/thoughts', authMiddleware, saveThought);
router.get('/thoughts', authMiddleware, getUserThoughts);
router.delete('/thoughts/:id', authMiddleware, deleteThought);

module.exports = router; // ✅ Correct
