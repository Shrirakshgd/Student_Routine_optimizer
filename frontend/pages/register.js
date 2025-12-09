// pages/register.js
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
    catch {
      throw new Error(`Server non-JSON (status ${res.status}):\n${text}`);
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

      if (!res.ok) {
        throw new Error(body.error || body.message);
      }

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

      {/* Cyberpunk Background */}
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
        
        {/* Grid */}
        <div className="absolute inset-0 cyber-grid opacity-20"></div>

        {/* Neon Pulses */}
        <div className="absolute w-[450px] h-[450px] bg-fuchsia-600/20 rounded-full blur-3xl animate-pulse-slow -top-24 -left-10"></div>
        <div className="absolute w-[550px] h-[550px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slower bottom-0 right-0"></div>

        {/* Neon Card */}
        <div className="relative z-10 max-w-md w-full neon-border p-8 rounded-2xl bg-black/60 backdrop-blur-xl shadow-xl animate-fade-in-up">

          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <img
              src={HERO_IMAGE_BACKEND}
              alt="logo"
              className="w-16 h-16 rounded-lg border border-cyan-400 shadow-lg animate-float"
            />
            <div>
              <h1 className="text-3xl font-bold text-cyan-300 drop-shadow-lg tracking-wider cyber-title">
                REGISTER
              </h1>
              <div className="text-xs text-fuchsia-400 opacity-80 tracking-wide">
                Create your account
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full p-3 text-cyan-200 bg-black/40 border border-cyan-600 rounded-lg
              focus:ring-2 focus:ring-fuchsia-500 outline-none cyber-input"
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 text-cyan-200 bg-black/40 border border-cyan-600 rounded-lg
              focus:ring-2 focus:ring-fuchsia-500 outline-none cyber-input"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 text-cyan-200 bg-black/40 border border-cyan-600 rounded-lg
              focus:ring-2 focus:ring-fuchsia-500 outline-none cyber-input"
            />

            {err && (
              <div className="text-sm text-red-400 bg-red-500/10 p-2 rounded-lg animate-shake">
                {err}
              </div>
            )}

            {success && (
              <div className="text-sm text-green-400 bg-green-500/10 p-2 rounded-lg animate-fade-in-up">
                {success}
              </div>
            )}

            {/* Buttons */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-fuchsia-600 to-cyan-500
              text-black font-bold hover:opacity-90 transition transform hover:scale-[1.02] neon-btn"
            >
              {loading ? 'Registering…' : 'Register'}
            </button>

            <button
              type="button"
              onClick={() => router.push('/login')}
              className="w-full py-3 rounded-lg border border-cyan-400 text-cyan-300 hover:bg-cyan-400/10 transition"
            >
              Login
            </button>
          </form>
        </div>

        {/* Animations & Styling */}
        <style jsx>{`
          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0); }
          }
          .animate-float { animation: float 4s ease-in-out infinite; }

          @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up { animation: fade-in-up 0.7s ease-out; }

          @keyframes pulse-slow {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.4; }
          }
          .animate-pulse-slow { animation: pulse-slow 7s infinite; }

          @keyframes pulse-slower {
            0%, 100% { opacity: 0.15; }
            50% { opacity: 0.3; }
          }
          .animate-pulse-slower { animation: pulse-slower 11s infinite; }

          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-4px); }
            75% { transform: translateX(4px); }
          }
          .animate-shake { animation: shake 0.3s ease-in-out; }

          .cyber-grid {
            background-image:
              linear-gradient(#0ff2 1px, transparent 1px),
              linear-gradient(90deg, #f0f2 1px, transparent 1px);
            background-size: 50px 50px;
          }

          .neon-border {
            border: 2px solid #0ff5;
            box-shadow: 0 0 20px #0ff4, inset 0 0 20px #0ff2;
          }

          .cyber-input {
            box-shadow: inset 0 0 8px #0ff3;
          }

          .neon-btn {
            box-shadow: 0 0 12px #f0f, 0 0 30px #0ff;
          }

          .cyber-title {
            text-shadow: 0 0 8px #0ff, 0 0 20px #00eaff, 0 0 40px #0ff;
          }
        `}</style>
      </div>
    </>
  );
}
