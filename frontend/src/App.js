import React, { useState, useEffect } from 'react';
import TextUpload from './components/TextUpload';
import ThoughtCard from './components/ThoughtCard';
import MicInput from './components/MicInput';
import Login from './components/Login';
import { categorizeText } from './utils/categorize';
import { motion } from 'framer-motion';
import { Mic, Type, LogOut } from 'lucide-react';
import axios from 'axios';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [textInput, setTextInput] = useState('');
  const [thoughts, setThoughts] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showInputs, setShowInputs] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const fetchThoughts = async () => {
    try {
      const res = await axios.get('http://localhost:5050/api/thoughts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setThoughts(res.data);
    } catch (err) {
      console.error('Failed to fetch thoughts:', err);
    }
  };

  useEffect(() => {
    if (token) fetchThoughts();
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [token]);

  const handleTextSubmit = async () => {
    if (!textInput.trim()) return alert("✍️ Please enter some text!");
    const newThought = {
      transcription: textInput,
      category: categorizeText(textInput),
      timestamp: new Date().toISOString()
    };
    try {
      const res = await axios.post(
        'http://localhost:5050/api/thoughts',
        newThought,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setThoughts(prev => [res.data, ...prev]);
      setTextInput('');
      setShowInputs(false);
    } catch (err) {
      console.error('Failed to save thought:', err);
      alert('❌ Failed to save thought. Check server.');
    }
  };

  const handleMicSubmit = async (newThought) => {
    const categorizedThought = {
      transcription: newThought.content,
      category: categorizeText(newThought.content),
      timestamp: new Date().toISOString()
    };
    try {
      const res = await axios.post(
        'http://localhost:5050/api/thoughts',
        categorizedThought,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setThoughts(prev => [res.data, ...prev]);
      setShowInputs(false);
    } catch (err) {
      console.error('Failed to save mic thought:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/api/thoughts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setThoughts(prev => prev.filter((thought) => thought._id !== id));
    } catch (err) {
      console.error('Failed to delete thought:', err);
    }
  };

  const groupedThoughts = thoughts.reduce((acc, thought) => {
    const category = thought.category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(thought);
    return acc;
  }, {});

  if (!token) return <Login setToken={setToken} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-white font-sans">
      {scrolled && (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur border-b border-gray-200 shadow-sm px-4 sm:px-8 md:px-16 py-3 flex items-center justify-between">
          <span className="text-indigo-700 font-bold text-xl">🧠 Mind Dump</span>
          <div className="flex gap-4">
            <button
              onClick={() => setShowInputs('mic')}
              className="flex items-center gap-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 px-4 py-2 rounded-full border border-indigo-300 text-sm font-medium"
            >
              <Mic className="w-4 h-4" /> Mic
            </button>
            <button
              onClick={() => setShowInputs('text')}
              className="flex items-center gap-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 px-4 py-2 rounded-full border border-emerald-300 text-sm font-medium"
            >
              <Type className="w-4 h-4" /> Text
            </button>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white text-indigo-600 border border-indigo-300 rounded-full px-4 py-2 text-sm font-medium hover:bg-indigo-50"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </nav>
      )}

      <div className={`pt-${scrolled ? '24' : '10'} px-4 sm:px-8 md:px-16 max-w-6xl mx-auto space-y-12 pb-40`}>
        {!scrolled && (
        <header className="relative text-center space-y-4 mt-8">
          <button
            onClick={handleLogout}
            className="absolute top-0 right-0 flex items-center gap-2 bg-white text-indigo-600 border border-indigo-300 rounded-full px-4 py-2 text-sm font-medium hover:bg-indigo-50"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
          <h1 className="text-5xl lg:text-6xl font-bold text-indigo-700 tracking-tight">🧠 Mind Dump</h1>
          <p className="text-xl text-slate-600 font-medium">
            Speak or type. We’ll organize it beautifully.
          </p>
        </header>

        )}

        {!showInputs && !scrolled && (
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
            className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-200 space-y-6 relative"
          >
            <button
              onClick={() => setShowInputs(false)}
              className="absolute top-4 right-4 text-xl font-bold text-gray-400 hover:text-red-500"
            >
              ×
            </button>

            <h2 className="text-2xl font-semibold text-gray-800">Add Your Thought</h2>
            {showInputs === 'mic' && <MicInput onSubmit={handleMicSubmit} setIsProcessing={setIsProcessing} />}
            {showInputs === 'text' && (
              <TextUpload
                textInput={textInput}
                setTextInput={setTextInput}
                handleTextSubmit={handleTextSubmit}
              />
            )}
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
                  {items.map((thought) => (
                    <motion.div
                      key={thought._id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ThoughtCard
                        thought={thought}
                        onDelete={() => {
                          if (thought._id) handleDelete(thought._id);
                          else console.error('No ID found in thought:', thought);
                        }}
                      />
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
