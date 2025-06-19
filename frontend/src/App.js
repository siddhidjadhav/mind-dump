import React, { useState, useEffect } from 'react';
import TextUpload from './components/TextUpload';
import ThoughtCard from './components/ThoughtCard';
import MicInput from './components/MicInput';
import Login from './components/Login';
import { categorizeText } from './utils/categorize';
import { motion } from 'framer-motion';
import { Mic, Type } from 'lucide-react';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [textInput, setTextInput] = useState('');
  const [thoughts, setThoughts] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showInputs, setShowInputs] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const fetchThoughts = async () => {
    const res = await fetch('http://localhost:5050/api/thoughts', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setThoughts(data);
  };

  const saveThought = async (thought) => {
    await fetch('http://localhost:5050/api/thoughts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(thought),
    });
  };

  useEffect(() => {
    if (token) fetchThoughts();
  }, [token]);

  const handleTextSubmit = async () => {
    if (!textInput.trim()) return alert("✍️ Please enter some text!");
    const newThought = {
      transcription: textInput,
      category: categorizeText(textInput),
      timestamp: new Date().toISOString()
    };
    setThoughts(prev => [newThought, ...prev]);
    await saveThought(newThought);
    setTextInput('');
    setShowInputs(false);
  };

  const handleMicSubmit = async (newThought) => {
    const categorizedThought = {
      ...newThought,
      transcription: newThought.content,
      category: categorizeText(newThought.content),
      timestamp: new Date().toISOString()
    };
    setThoughts(prev => [categorizedThought, ...prev]);
    await saveThought(categorizedThought);
    setShowInputs(false);
  };

  const handleDelete = (indexToDelete) => {
    setThoughts(prev => prev.filter((_, i) => i !== indexToDelete));
  };

  const groupedThoughts = thoughts.reduce((acc, thought, index) => {
    const category = thought.category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push({ ...thought, index });
    return acc;
  }, {});

  if (!token) return <Login setToken={setToken} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-white px-4 sm:px-8 md:px-16 py-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="relative text-center space-y-4">
          <button
            onClick={handleLogout}
            className="absolute top-0 right-0 mt-4 mr-4 text-sm text-indigo-600 underline"
          >
            Logout
          </button>
          <h1 className="text-5xl lg:text-6xl font-bold text-indigo-700 tracking-tight">🧠 Mind Dump</h1>
          <p className="text-xl text-slate-600 font-medium">
            Speak or type. We’ll organize it beautifully.
          </p>
        </header>

        {!showInputs && (
          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-10">
            <button
              onClick={() => setShowInputs('mic')}
              className="flex items-center gap-3 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 font-medium px-6 py-4 rounded-xl shadow text-lg border border-indigo-300 transition-all"
            >
              <Mic className="w-6 h-6" /> Use Microphone
            </button>
            <button
              onClick={() => setShowInputs('text')}
              className="flex items-center gap-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-medium px-6 py-4 rounded-xl shadow text-lg border border-emerald-300 transition-all"
            >
              <Type className="w-6 h-6" /> Type Text
            </button>
          </div>
        )}

        {showInputs && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-200 space-y-6"
          >
            <h2 className="text-2xl font-semibold text-gray-800">Add Your Thought</h2>
            {showInputs === 'mic' && <MicInput onSubmit={handleMicSubmit} setIsProcessing={setIsProcessing} />}
            {showInputs === 'text' && (
              <TextUpload
                textInput={textInput}
                setTextInput={setTextInput}
                handleTextSubmit={handleTextSubmit}
              />
            )}
            <div className="pt-4 text-center">
              <button
                onClick={() => setShowInputs(false)}
                className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium rounded-full shadow-sm"
              >
                ➕ Add Another Thought
              </button>
            </div>
          </motion.section>
        )}

        {isProcessing && (
          <div className="text-center text-blue-600 font-medium animate-pulse">
            ⏳ Processing your recording, please wait...
          </div>
        )}

        <section className="space-y-10">
          <h2 className="text-2xl font-semibold text-gray-800">🧾 Your Thoughts</h2>

          {Object.keys(groupedThoughts).length === 0 ? (
            <p className="text-center text-lg text-gray-500 mt-8">
              No thoughts yet. Try speaking or typing to get started!
            </p>
          ) : (
            Object.entries(groupedThoughts).map(([category, items]) => (
              <div key={category} className="space-y-4">
                <h3 className="text-xl font-semibold text-indigo-900 border-b pb-1 sticky top-0 bg-white/90 z-10">
                  {category.replace(/ > /g, ' → ')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((thought, index) => (
                    <motion.div
                      key={thought.index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ThoughtCard thought={thought} onDelete={() => handleDelete(thought.index)} />
                    </motion.div>
                  ))}
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
