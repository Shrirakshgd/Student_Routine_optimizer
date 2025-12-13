// pages/login.js
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { API_BASE, HERO_IMAGE_BACKEND } from '../components/api';

/* ================= PAGE ================= */

export default function LoginPage() {
  const router = useRouter();

  const [theme, setTheme] = useState('dark');
  const isDark = theme === 'dark';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);

  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  /* SAFE JSON */
  async function safeFetchJSON(res) {
    const contentType = res.headers.get('content-type') || '';
    const text = await res.text();

    if (!contentType.includes('application/json')) {
      throw new Error('Server returned invalid response');
    }
    return text ? JSON.parse(text) : {};
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErr('');
    setLoading(true);

    if (!email || !password) {
      setErr('Email and password are required');
      setLoading(false);
      return;
    }

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
      <Head>
        <title>Login — Student Optimizer</title>
      </Head>

      <div
        className={`min-h-screen flex items-center justify-center relative overflow-hidden px-4 transition-colors duration-500 ${
          isDark ? 'bg-[#05060f]' : 'bg-slate-100'
        }`}
      >
        {/* Ambient glow */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-600/20 blur-3xl rounded-full" />

        {/* Theme Toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          className="absolute top-6 right-6 text-sm px-3 py-1 rounded-full border border-cyan-400/40 text-cyan-400"
        >
          {isDark ? 'Light mode' : 'Dark mode'}
        </motion.button>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className={`relative w-full max-w-md backdrop-blur-xl rounded-2xl shadow-2xl p-8 border ${
            isDark
              ? 'bg-white/5 border-white/10 text-white'
              : 'bg-white border-slate-300 text-slate-900'
          }`}
        >
          {/* Header */}
          <div className="flex flex-col items-center mb-8 text-center">
            <img
              src={HERO_IMAGE_BACKEND}
              className="w-20 h-20 rounded-xl border border-cyan-400/40 shadow-lg"
            />
            <h1 className="text-3xl font-bold mt-4 text-cyan-400">
              Welcome Back
            </h1>
            <p className="text-sm opacity-70">
              Log in to continue your journey
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="input"
            />

            {/* Password with toggle */}
            <div className="relative">
              <input
                type={showPwd ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="input pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPwd(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Error */}
            <AnimatePresence>
              {err && (
                <motion.div
                  initial={{ x: 0, opacity: 0 }}
                  animate={{ x: [-6, 6, -4, 4, 0], opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-red-300 bg-red-500/20 border border-red-400/30 p-2 rounded-lg text-sm"
                >
                  {err}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-black font-semibold"
            >
              {loading ? (
                <div className="h-5 w-24 mx-auto rounded bg-white/30 animate-pulse" />
              ) : (
                'Login'
              )}
            </button>

            {/* Register */}
            <button
              type="button"
              onClick={() => router.push('/register')}
              className="w-full py-3 rounded-lg border border-cyan-400/40 text-cyan-400 hover:bg-cyan-400/10"
            >
              Create new account
            </button>
          </form>
        </motion.div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 0.75rem;
          border-radius: 0.5rem;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: inherit;
          outline: none;
        }
        .input:focus {
          border-color: #22d3ee;
        }
      `}</style>
    </>
  );
}
