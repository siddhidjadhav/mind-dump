import React, { useState } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

export default function Login({ setToken }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const allowedDomains = ['gmail.com', 'yahoo.com', 'rediffmail.com'];

  const isValidDomain = (email) => {
    const domain = email.split('@')[1];
    return allowedDomains.includes(domain);
  };

  const handleSubmit = async () => {
    setError('');
    setSuccessMsg('');

    if (!isValidDomain(email)) {
      setError('Email must end with @gmail.com, @yahoo.com, or @rediffmail.com');
      return;
    }

    if (isRegistering && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const endpoint = isRegistering
      ? 'http://localhost:5050/api/auth/register'
      : 'http://localhost:5050/api/auth/login';

    try {
      setLoading(true);
      const response = await axios.post(endpoint, { email, password });

      if (isRegistering) {
        setSuccessMsg('🎉 Registered successfully! You can now login.');
        setIsRegistering(false);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token);
        setSuccessMsg('✅ Login successful!');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-50 flex items-center justify-center px-4 py-10 font-sans">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left side - Logo and intro */}
        <div className="md:w-1/2 bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-8 flex flex-col justify-center items-center gap-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3448/3448590.png"
            alt="Mind Dump Logo"
            className="w-32 h-32 drop-shadow-xl animate-bounce-slow"
          />
          <h2 className="text-3xl font-bold text-center">Mind Dump</h2>
          <p className="text-sm text-center opacity-90">
            Organize your mind with just a thought — voice or text.
          </p>
        </div>

        {/* Right side - Form */}
        <div className="md:w-1/2 p-10 sm:p-14 space-y-6 bg-white">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            {isRegistering ? 'Create an Account' : 'Welcome Back 👋'}
          </h2>

          {error && (
            <div className="text-red-500 text-sm text-center bg-red-100 border border-red-300 px-3 py-2 rounded">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="text-green-600 text-sm text-center bg-green-100 border border-green-300 px-3 py-2 rounded">
              {successMsg}
            </div>
          )}

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {isRegistering && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isRegistering ? 'Create Account' : 'Login'}
          </button>

          <p className="text-sm text-center text-gray-600">
            {isRegistering ? 'Already have an account?' : 'Don’t have an account?'}{' '}
            <button
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError('');
                setSuccessMsg('');
              }}
              className="text-indigo-600 underline font-medium hover:text-indigo-800 transition"
            >
              {isRegistering ? 'Login' : 'Register'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
