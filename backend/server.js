require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const multer = require('multer');
const authRoutes = require('./routes/authRoutes');
const thoughtRoutes = require('./routes/thoughtRoutes');
const { transcribeAudio } = require('./services/transcription');
const { analyzeText } = require('./services/nlp');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("🟢 Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB error:", err));

const upload = multer({ dest: 'uploads/' });

app.use('/api/auth', authRoutes);
app.use('/api', thoughtRoutes);

app.post('/api/upload', upload.single('audio'), async (req, res) => {
  try {
    const transcription = await transcribeAudio(req.file.path);
    const analysis = await analyzeText(transcription);
    res.json({ transcription, analysis });
  } catch (err) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
