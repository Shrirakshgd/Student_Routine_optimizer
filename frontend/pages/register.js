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
    try { return text ? JSON.parse(text) : {}; }
    catch { throw new Error(`Server non-JSON (status ${res.status}):\n${text}`); }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErr('');
    setSuccess('');
    setLoading(true);

    if (!email.trim() || !password.trim() || !name.trim()) {
      setErr('All fields are required');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, email, password }),
      });

      const body = await safeFetchJSON(res);
      if (!res.ok) throw new Error(body.error || body.message);

      setSuccess('Registration successful — redirecting...');
      setTimeout(() => router.replace('/login'), 1200);
    } catch (error) {
      setErr(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head><title>Register — Student Optimizer</title></Head>

      {/* Background */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-slate-900 to-black px-4">

        {/* Card */}
        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8">

          {/* Header */}
          <div className="flex flex-col items-center mb-8 text-center">
            <img
              src={HERO_IMAGE_BACKEND}
              alt="Logo"
              className="w-20 h-20 rounded-xl shadow-md border border-blue-300"
            />
            <h1 className="text-3xl font-bold text-white mt-4 tracking-wide">
              Create Account
            </h1>
            <p className="text-blue-300 text-sm mt-1 opacity-80">
              Join the Student Optimizer Platform
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 
              focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {/* Email */}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 
              focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {/* Password */}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 
              focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {/* Error */}
            {err && (
              <div className="text-red-300 bg-red-500/20 border border-red-400/30 p-2 rounded-lg text-sm">
                {err}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="text-green-300 bg-green-500/20 border border-green-400/30 p-2 rounded-lg text-sm">
                {success}
              </div>
            )}

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold
              transition shadow-lg hover:shadow-blue-500/30 disabled:opacity-50"
            >
              {loading ? 'Registering…' : 'Register'}
            </button>

            {/* Login Redirect */}
            <button
              type="button"
              onClick={() => router.push('/login')}
              className="w-full py-3 rounded-lg border border-blue-300 text-blue-300 
              hover:bg-blue-300/20 transition font-medium"
            >
              Already have an account? Login
            </button>

          </form>
        </div>
      </div>
    </>
  );
}
