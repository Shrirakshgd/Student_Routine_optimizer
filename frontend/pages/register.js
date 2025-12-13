// pages/register.js
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { API_BASE, HERO_IMAGE_BACKEND } from '../components/api';

/* ================= HELPERS ================= */

function getPasswordStrength(password) {
  let score = 0;
  if (password.length >= 6) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const strengthColors = [
  'bg-red-500',
  'bg-orange-500',
  'bg-yellow-500',
  'bg-cyan-500',
  'bg-green-500',
];

const strengthText = ['Very weak', 'Weak', 'Okay', 'Strong', 'Very strong'];

/* ================= PAGE ================= */

export default function RegisterPage() {
  const router = useRouter();

  const [theme, setTheme] = useState('dark');
  const isDark = theme === 'dark';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);

  const [err, setErr] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const strength = getPasswordStrength(password);

  async function safeFetchJSON(res) {
    const text = await res.text();
    try {
      return text ? JSON.parse(text) : {};
    } catch {
      throw new Error(`Server error (${res.status})`);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErr('');
    setSuccess('');
    setLoading(true);

    if (!name || !email || !password) {
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

      setSuccess('Account created! Verify your email.');
      setTimeout(() => router.replace('/verify-email'), 1200);
    } catch (e) {
      setErr(e.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Register — Student Optimizer</title>
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
              Create Account
            </h1>
            <p className="text-sm opacity-70">
              Join the AI-powered study system
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="input"
            />

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

            {/* Password Strength */}
            {password && (
              <div>
                <div className="h-2 w-full bg-slate-700/40 rounded overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(strength / 4) * 100}%` }}
                    className={`h-full ${strengthColors[strength]}`}
                  />
                </div>
                <p className="text-xs mt-1 opacity-70">
                  Strength: {strengthText[strength]}
                </p>
              </div>
            )}

            {/* Error Shake */}
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

            {/* Success */}
            {success && (
              <div className="text-green-300 bg-green-500/20 border border-green-400/30 p-2 rounded-lg text-sm">
                {success}
              </div>
            )}

            {/* Submit / Loading */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-black font-semibold"
            >
              {loading ? (
                <div className="h-5 w-24 mx-auto rounded bg-white/30 animate-pulse" />
              ) : (
                'Register'
              )}
            </button>

            {/* OAuth Divider */}
            <div className="flex items-center gap-2">
              <div className="flex-1 h-px bg-slate-700" />
              <span className="text-xs text-slate-400">OR</span>
              <div className="flex-1 h-px bg-slate-700" />
            </div>

            {/* OAuth UI */}
            <button type="button" className="oauth-btn">
              <img src="/google.svg" className="w-5 h-5" />
              Continue with Google
            </button>

            <button type="button" className="oauth-btn">
              <img src="/github.svg" className="w-5 h-5" />
              Continue with GitHub
            </button>

            {/* Login */}
            <button
              type="button"
              onClick={() => router.push('/login')}
              className="w-full py-3 rounded-lg border border-cyan-400/40 text-cyan-400 hover:bg-cyan-400/10"
            >
              Already have an account? Login
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
        .oauth-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.05);
          color: inherit;
        }
        .oauth-btn:hover {
          background: rgba(255,255,255,0.1);
        }
      `}</style>
    </>
  );
}
