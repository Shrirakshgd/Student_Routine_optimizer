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
  const [remember, setRemember] = useState(false);

  async function safeFetchJSON(res) {
    const text = await res.text();
    try { return text ? JSON.parse(text) : {}; } catch (parseErr) {
      throw new Error(`Server returned non-JSON response (status ${res.status}):\n\n${text.slice(0,2000)}`);
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErr('');
    setLoading(true);

    if (!email?.trim()) { setErr('Enter email'); setLoading(false); return; }
    if (!password?.trim()) { setErr('Enter password'); setLoading(false); return; }

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const body = await safeFetchJSON(res);
      if (!res.ok) throw new Error(body.error || body.message || `Status ${res.status}`);
      router.replace('/');
    } catch (e) {
      console.error('login error', e);
      setErr(e.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Login — Student Optimizer</title>
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-6">
        <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

          {/* Left: Illustration / Brand */}
          <div className="hidden md:flex items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 shadow-lg transform hover:scale-[1.01] transition-all">
            <div className="text-center text-white">
              <img src={HERO_IMAGE_BACKEND} alt="logo" className="w-28 h-28 rounded-full object-cover mx-auto mb-4 ring-4 ring-white/20" />
              <h2 className="text-2xl font-bold">Student Optimizer</h2>
              <p className="mt-2 text-sm opacity-90">Smart scheduling · Study reminders · Personalized tips</p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold">Welcome back</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Login to continue to your dashboard</p>
              </div>

              <div className="md:hidden">
                <img src={HERO_IMAGE_BACKEND} alt="logo" className="w-12 h-12 rounded-full object-cover" />
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">

              <label className="block">
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Email</span>
                <div className="mt-1 relative">
                  <svg className="w-5 h-5 absolute left-3 top-3 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@school.edu"
                    className="w-full pl-11 pr-3 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    aria-label="Email"
                  />
                </div>
              </label>

              <label className="block">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Password</span>
                  <a className="text-xs text-indigo-600 hover:underline" href="#">Forgot?</a>
                </div>
                <div className="mt-1 relative">
                  <svg className="w-5 h-5 absolute left-3 top-3 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="11" width="18" height="11" rx="2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 11V7a5 5 0 0 1 10 0v4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-3 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    aria-label="Password"
                  />
                </div>
              </label>

              {err && <div className="text-sm text-red-500 whitespace-pre-wrap">{err}</div>}

              <div className="flex items-center justify-between">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={remember} onChange={() => setRemember(!remember)} className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  <span className="text-gray-600 dark:text-gray-300">Remember me</span>
                </label>

                <div className="text-sm text-gray-500">New here? <button type="button" onClick={() => router.push('/register')} className="text-indigo-600 hover:underline">Create account</button></div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-md hover:shadow-lg focus:outline-none disabled:opacity-60 transition"
              >
                {loading ? (
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.25" fill="none"/><path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none"/></svg>
                ) : null}
                <span>{loading ? 'Logging in...' : 'Login'}</span>
              </button>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                <div className="text-xs text-gray-400">or continue with</div>
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button type="button" className="py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm flex items-center justify-center gap-2">Google</button>
                <button type="button" className="py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm flex items-center justify-center gap-2">GitHub</button>
              </div>

              <p className="text-xs text-gray-400 text-center">By continuing you agree to our <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy</a>.</p>

            </form>
          </div>

        </div>
      </div>
    </>
  );
}
