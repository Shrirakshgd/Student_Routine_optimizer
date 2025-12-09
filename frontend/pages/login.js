// pages/login.js
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

      {/* Background Cyberpunk Grid */}
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">

        {/* Grid Lines */}
        <div className="absolute inset-0 cyber-grid opacity-20"></div>

        {/* Neon Flares */}
        <div className="absolute w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl animate-pulse-slow -top-20 -left-10"></div>
        <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slower bottom-0 right-0"></div>

        {/* Main Neon Card */}
        <div className="relative z-10 w-full max-w-md neon-border p-8 rounded-2xl shadow-lg bg-black/60 backdrop-blur-xl animate-fade-in-up">

          {/* Logo + Title */}
          <div className="flex items-center gap-4 mb-6">
            <img
              src={HERO_IMAGE_BACKEND}
              alt="logo"
              className="w-16 h-16 rounded-lg shadow-lg border border-cyan-400 animate-float"
            />
            <div>
              <h1 className="text-3xl font-bold text-cyan-300 drop-shadow-lg tracking-wider cyber-title">
                STUDENT OPTIMIZER
              </h1>
              <p className="text-fuchsia-400 text-xs opacity-80 tracking-wide">
                Adaptive learning intelligence
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-5">

            {/* Email */}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 text-cyan-200 bg-black/40 border border-cyan-600 rounded-lg
              focus:ring-2 focus:ring-fuchsia-500 outline-none cyber-input"
            />

            {/* Password */}
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

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-fuchsia-600 to-cyan-500
              text-black font-bold hover:opacity-90 transition transform hover:scale-[1.02] neon-btn"
            >
              {loading ? 'Authenticating…' : 'Login'}
            </button>

            {/* Register */}
            <button
              type="button"
              onClick={() => router.push('/register')}
              className="w-full py-3 rounded-lg border border-cyan-400 text-cyan-300 hover:bg-cyan-400/10 transition"
            >
              Register
            </button>

          </form>
        </div>

        {/* Animations + Cyberpunk Styles */}
        <style jsx>{`
          /* Floating Logo Animation */
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0px); }
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }

          /* Fade In Up */
          @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0px); }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.7s ease-out;
          }

          /* Background Pulsing */
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.4; }
          }
          .animate-pulse-slow {
            animation: pulse-slow 7s ease-in-out infinite;
          }

          @keyframes pulse-slower {
            0%, 100% { opacity: 0.15; }
            50% { opacity: 0.3; }
          }
          .animate-pulse-slower {
            animation: pulse-slower 11s ease-in-out infinite;
          }

          /* Shake on Error */
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-4px); }
            75% { transform: translateX(4px); }
          }
          .animate-shake {
            animation: shake 0.3s ease-in-out;
          }

          /* Cyberpunk Grid Background */
          .cyber-grid {
            background-image:
              linear-gradient(#0ff2 1px, transparent 1px),
              linear-gradient(90deg, #f0f2 1px, transparent 1px);
            background-size: 50px 50px;
          }

          /* Neon Card Border */
          .neon-border {
            border: 2px solid #0ff5;
            box-shadow: 0px 0px 20px #0ff4, inset 0 0 20px #0ff2;
          }

          /* Cyberpunk Inputs */
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
