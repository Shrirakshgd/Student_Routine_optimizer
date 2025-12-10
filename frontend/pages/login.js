import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { API_BASE, HERO_IMAGE_BACKEND } from '../components/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  async function safeFetchJSON(res) {
    const text = await res.text();
    try { return text ? JSON.parse(text) : {}; }
    catch { throw new Error(`Server non-JSON (status ${res.status}):\n${text}`); }
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErr('');
    setLoading(true);

    if (!email.trim()) return setErr('Enter email'), setLoading(false);
    if (!password.trim()) return setErr('Enter password'), setLoading(false);

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const body = await safeFetchJSON(res);
      if (!res.ok) throw new Error(body.error || body.message);

      router.replace('/');
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head><title>Login — Student Optimizer</title></Head>

      {/* Background */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-slate-900 to-black px-4">

        {/* Card */}
        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8">

          {/* Logo + Title */}
          <div className="flex flex-col items-center mb-8 text-center">
            <img
              src={HERO_IMAGE_BACKEND}
              alt="Logo"
              className="w-20 h-20 rounded-xl shadow-md border border-blue-300"
            />
            <h1 className="text-3xl font-bold text-white mt-4 tracking-wide">
              Student Optimizer
            </h1>
            <p className="text-blue-300 text-sm mt-1 opacity-80">
              Smart Task & Routine Manager
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 
                focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 
                focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Error */}
            {err && (
              <div className="text-red-300 bg-red-500/20 border border-red-400/30 p-2 rounded-lg text-sm">
                {err}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold 
              transition shadow-lg hover:shadow-blue-500/30 disabled:opacity-50"
            >
              {loading ? 'Logging in…' : 'Login'}
            </button>

            {/* Register Button */}
            <button
              type="button"
              onClick={() => router.push('/register')}
              className="w-full py-3 rounded-lg border border-blue-300 text-blue-300 
              hover:bg-blue-300/20 transition font-medium"
            >
              Create Account
            </button>

          </form>
        </div>
      </div>
    </>
  );
}
