import React, { useState } from 'react';
import axios from 'axios';

export default function Login({ setToken }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    const endpoint = isRegistering
      ? 'http://localhost:5050/api/auth/register'
      : 'http://localhost:5050/api/auth/login';

    try {
      const response = await axios.post(endpoint, { email, password });

      if (isRegistering) {
        alert('✅ Registered successfully. You can now login.');
        setIsRegistering(false);
        setEmail('');
        setPassword('');
        setError('');
      } else {
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token);
        setError('');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center text-indigo-800">
          {isRegistering ? 'Register' : 'Login'}
        </h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded hover:bg-indigo-700 transition"
        >
          {isRegistering ? 'Create Account' : 'Login'}
        </button>

        <p className="text-center text-sm text-gray-600">
          {isRegistering ? 'Already have an account?' : 'Don’t have an account?'}{' '}
          <button
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError('');
            }}
            className="text-indigo-700 underline font-medium"
          >
            {isRegistering ? 'Login' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
}
