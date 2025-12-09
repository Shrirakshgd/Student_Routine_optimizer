import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { API_BASE, HERO_IMAGE_BACKEND } from '../components/api';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  async function safeFetchJSON(res) {
    const text = await res.text();
    try { return text ? JSON.parse(text) : {}; } catch (parseErr) {
      throw new Error(`Server returned non-JSON response (status ${res.status}):\n\n${text.slice(0,2000)}`);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErr('');
    setSuccess('');
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      setErr('Email and password required');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, email, password })
      });

      const body = await safeFetchJSON(res);
      if (!res.ok) throw new Error(body.error || body.message || `Status ${res.status}`);

      setSuccess('Registration successful — redirecting to login...');
      setTimeout(() => router.replace('/login'), 1200);
    } catch (error) {
      console.error('register error:', error);
      setErr(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head><title>Register — Student Optimizer</title></Head>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-6">
        <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

          <div className="hidden md:flex items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-red-500 via-rose-500 to-pink-600 shadow-lg">
            <div className="text-center text-white">
              <img src={HERO_IMAGE_BACKEND} alt="logo" className="w-28 h-28 rounded-full object-cover mx-auto mb-4 ring-4 ring-white/20" />
              <h2 className="text-2xl font-bold">Join Student Optimizer</h2>
              <p className="mt-2 text-sm opacity-90">Get personalized schedules, reminders & study tips.</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-10">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold">Create your account</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Start optimizing your study routine.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              <label className="block">
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Full name</span>
                <div className="mt-1 relative">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full pl-3 pr-3 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                    aria-label="Full name"
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Email</span>
                <div className="mt-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@school.edu"
                    className="w-full pl-3 pr-3 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                    aria-label="Email"
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Password</span>
                <div className="mt-1 relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Choose a secure password"
                    className="w-full pl-3 pr-3 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                    aria-label="Password"
                  />
                </div>
              </label>

              {err && <div className="text-sm text-red-500 whitespace-pre-wrap">{err}</div>}
              {success && <div className="text-sm text-red-600">{success}</div>}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 text-white font-medium shadow-md hover:shadow-lg focus:outline-none disabled:opacity-60 transition"
              >
                {loading ? (
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.25" fill="none"/><path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none"/></svg>
                ) : null}
                <span>{loading ? 'Registering…' : 'Create account'}</span>
              </button>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                <div className="text-xs text-gray-400">or sign up with</div>
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button type="button" className="py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm">Google</button>
                <button type="button" className="py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm">GitHub</button>
              </div>

              <p className="text-xs text-gray-400 text-center">Already have an account? <button type="button" onClick={() => router.push('/login')} className="text-red-600 hover:underline">Login</button></p>

            </form>
          </div>

        </div>
      </div>
    </>
  );
}
