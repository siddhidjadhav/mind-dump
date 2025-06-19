const { spawn } = require('child_process');

const analyzeText = (text) => {
  return new Promise((resolve, reject) => {
    const python = spawn('python3', ['categorize_text.py', text]);

    let output = '';
    python.stdout.on('data', (data) => {
      output += data.toString();
    });

    python.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    python.on('close', (code) => {
      if (code !== 0) {
        reject('NLP categorization failed.');
      } else {
        resolve(JSON.parse(output));
      }
    });
  });
};

module.exports = { analyzeText };
