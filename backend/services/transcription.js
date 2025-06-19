const { spawn } = require('child_process');
const fs = require('fs');

const transcribeAudio = (filePath) => {
  return new Promise((resolve, reject) => {
    const path = require('path');
    const scriptPath = path.join(__dirname, '..', 'whisper_transcribe.py');
    const python = spawn('python3', [scriptPath, filePath]);


    let transcription = '';
    python.stdout.on('data', (data) => {
      transcription += data.toString();
    });

    python.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    python.on('close', (code) => {
      fs.unlinkSync(filePath); // Clean up
      if (code !== 0) {
        reject('Transcription failed.');
      } else {
        resolve(transcription.trim());
      }
    });
  });
};

module.exports = { transcribeAudio };
