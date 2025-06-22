import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Play, Send, X } from 'lucide-react';

const MicInput = ({ onSubmit, setIsProcessing }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [audioBlob, setAudioBlob] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const recognitionRef = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      audioChunks.current = [];

      recorder.ondataavailable = (e) => audioChunks.current.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(audioChunks.current, { type: 'audio/webm' });
        setAudioBlob(blob);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);

      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) return alert("Speech recognition not supported in this browser.");

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let finalTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          finalTranscript += event.results[i][0].transcript;
        }
        setTranscription(finalTranscript.trim());
      };

      recognition.onerror = (event) => console.error('Speech recognition error:', event);
      recognition.start();
      recognitionRef.current = recognition;
    } catch (err) {
      console.error("Microphone access error:", err);
      alert("Microphone access denied or not available.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
    if (recognitionRef.current) recognitionRef.current.stop();
    setIsRecording(false);
  };

  const playAudio = () => {
    if (audioBlob) {
      const audio = new Audio(URL.createObjectURL(audioBlob));
      audio.play();
      setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
    }
  };

const handleSubmit = async () => {
  if (!transcription.trim()) return alert("No text captured from mic.");
  try {
    setIsProcessing(true);
    await onSubmit({ content: transcription });
    setTranscription('');
  } catch (error) {
    console.error('Error submitting mic input:', error);
    alert('Failed to submit. Check connection or backend.');
  } finally {
    setIsProcessing(false);
  }
};

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <motion.div
        className={`relative w-full max-w-md aspect-square rounded-3xl flex items-center justify-center ${
          isRecording ? 'bg-red-100 animate-pulse' : 'bg-slate-100'
        } border border-slate-200 shadow-lg`}
        animate={isRecording ? { scale: [1, 1.05, 1], opacity: [1, 0.9, 1] } : {}}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        <motion.button
          onClick={isRecording ? stopRecording : startRecording}
          className="p-6 bg-gradient-to-r from-pink-500 to-red-500 rounded-full shadow-md hover:scale-110 transition-transform"
          whileTap={{ scale: 0.95 }}
        >
          {isRecording ? <MicOff className="w-10 h-10 text-white" /> : <Mic className="w-10 h-10 text-white" />}
        </motion.button>
        <button
          onClick={stopRecording}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          <X className="w-6 h-6" />
        </button>
      </motion.div>

      <p className="text-slate-600 text-center text-lg font-medium">
        {isRecording ? '🎙️ Recording... Speak now' : 'Tap the mic to start speaking'}
      </p>

      <AnimatePresence>
        {!isRecording && transcription && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-xl bg-white border border-slate-200 rounded-xl p-6 shadow space-y-6"
          >
            <div className="flex items-center justify-between">
              <span className="text-slate-700 font-medium">🎧 Recording Ready</span>
              {audioBlob && (
                <button
                  onClick={playAudio}
                  className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition"
                >
                  <Play className="w-4 h-4" />
                  <span>Preview</span>
                </button>
              )}
            </div>

            <p className="text-slate-600 italic bg-slate-50 p-4 rounded-xl border text-sm whitespace-pre-wrap">
              "{transcription}"
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-xl flex justify-center items-center gap-2 shadow-md hover:shadow-lg"
            >
              <Send className="w-5 h-5" />
              Save Thought
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MicInput;
