'use client'; // This directive is necessary for using hooks like useState

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  // State hooks to store the values from the input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State for handling errors and loading status
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // This function will be called when the form is submitted
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Basic validation
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // --- API Call to the Go Backend ---
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle errors from the server (e.g., invalid credentials)
        throw new Error(data.error || 'Login failed');
      }

      // --- Handle Success ---
      // On successful login, store the JWT in the browser's localStorage.
      // This allows us to keep the user logged in.
      localStorage.setItem('token', data.token);

      // Redirect the user to their dashboard or main app page
      router.push('/dashboard'); // We'll create this page next

    } catch (err) {
      // --- Handle Errors ---
      setError((err instanceof Error) ? err.message : 'An unknown error occurred');
      console.error('Login failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your credentials to access your account
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Display error messages here */}
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </form>
        
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign up
          </a>
        </p>

      </div>
    </div>
  );
}
