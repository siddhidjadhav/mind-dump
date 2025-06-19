const express = require('express');
const { saveThought, getUserThoughts } = require('../controllers/thoughtController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/thoughts', authMiddleware, saveThought);
router.get('/thoughts', authMiddleware, getUserThoughts);

module.exports = router;
