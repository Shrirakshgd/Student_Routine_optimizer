// pages/index.js
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import SettingsModal, { useSettings } from '../components/SettingsModal';

import TaskForm from '../components/TaskForm';
import TasksList from '../components/TasksList';
import MiniBarChart from '../components/MiniBarChart';
import { API_BASE, HERO_IMAGE_BACKEND } from '../components/api';

export default function Dashboard({ currentUser }) {
  const router = useRouter();
  const userId = currentUser?.id || 1;

  // open/close settings modal (local UI state)
  const [settingsOpen, setSettingsOpen] = useState(false);

  // get global settings (from SettingsProvider)
  let settings = null;
  try {
    const ctx = useSettings();
    settings = ctx.settings;
  } catch (e) {
    settings = { theme: 'dark', defaultDuration: 60 };
  }

  useEffect(() => {
    if (!settings) return;
    const theme = settings.theme || 'system';
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else if (theme === 'light') document.documentElement.classList.remove('dark');
    else {
      const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', isDark);
    }
  }, [settings?.theme]);

  const [refreshKey, setRefreshKey] = useState(0);

  // recommendations
  const [recs, setRecs] = useState([]);
  const [hourly, setHourly] = useState(new Array(24).fill(0));
  const [avgSleepHours, setAvgSleepHours] = useState(null);
  const [loadingRecs, setLoadingRecs] = useState(false);

  // analytics
  const [dailyMap, setDailyMap] = useState({});
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);

  // notifications
  const [notifications, setNotifications] = useState([]);
  const [showNotifs, setShowNotifs] = useState(false);

  async function safeJSON(res) {
    const text = await res.text();
    try { return text ? JSON.parse(text) : {}; }
    catch (err) { console.warn('Non-JSON from server:', text.slice(0, 500)); return {}; }
  }

  async function loadRecs() {
    setLoadingRecs(true);
    try {
      const res = await fetch(`${API_BASE}/api/ai/recommendations/${userId}`);
      const json = await safeJSON(res);
      setRecs(json.recommendations || json.recs || []);
      setHourly(json.hourly || new Array(24).fill(0));
      setAvgSleepHours(json.avgSleepHours ?? null);
    } catch (err) { console.error('loadRecs error', err); }
    finally { setLoadingRecs(false); }
  }

  async function loadAnalytics() {
    setLoadingAnalytics(true);
    try {
      const res = await fetch(`${API_BASE}/api/analytics/daily/${userId}?days=14`);
      const json = await safeJSON(res);
      setDailyMap(json || {});
    } catch (err) { console.error('loadAnalytics error', err); }
    finally { setLoadingAnalytics(false); }
  }

  async function loadNotifications() {
    try {
      const res = await fetch(`${API_BASE}/api/notifications?user_id=${userId}`);
      const json = await safeJSON(res);
      if (Array.isArray(json)) setNotifications(json);
      else setNotifications(json.rows || []);
    } catch (err) { console.error('loadNotifications error', err); setNotifications([]); }
  }

  useEffect(() => {
    loadRecs();
    loadAnalytics();
    loadNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  async function runScheduler() {
    try {
      const res = await fetch(`${API_BASE}/api/schedule/run/${userId}`, { method: 'POST' });
      const json = await safeJSON(res);
      alert(`Auto-scheduled ${json.scheduledCount || 0} tasks`);
      setRefreshKey(k => k + 1);
    } catch (err) { console.error('runScheduler error', err); alert('Scheduler failed'); }
  }

  const handleTaskCreated = () => setRefreshKey(k => k + 1);

  function toggleNotifs() { setShowNotifs(v => !v); if (!showNotifs) loadNotifications(); }

  return (
    <>
      <Head>
        <title>AI Student Routine Optimizer</title>
      </Head>

      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />

      {/* Cyberpunk page container */}
      <div className="min-h-screen relative overflow-hidden bg-black text-slate-100 p-6">

        {/* Neon grid background */}
        <div className="absolute inset-0 -z-10 cyber-grid opacity-20"></div>
        <div className="absolute -z-20 inset-0 bg-gradient-to-br from-[#070617] via-[#071026] to-[#0a0011]"></div>

        {/* top neon flares */}
        <div className="absolute -left-40 -top-20 w-96 h-96 rounded-full blur-3xl bg-pink-600/20 animate-pulse-slow"></div>
        <div className="absolute right-10 top-10 w-72 h-72 rounded-full blur-3xl bg-cyan-500/20 animate-pulse-slower"></div>

        {/* HEADER */}
        <header className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex items-center gap-4">
            <img src={HERO_IMAGE_BACKEND} alt="logo" className="w-14 h-14 rounded-lg shadow-neon" />
            <div>
              <h1 className="text-2xl font-extrabold tracking-wide text-cyan-300 neon-text">AI Student Routine Optimizer</h1>
              <p className="text-sm text-fuchsia-300/70">Smart scheduling + personalized recommendations</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={toggleNotifs} className="px-3 py-2 border border-cyan-600 rounded hover:bg-cyan-600/5 transition">Notifications</button>
            <button onClick={() => setSettingsOpen(true)} className="px-3 py-2 border border-fuchsia-500 rounded hover:bg-fuchsia-500/5 transition">Settings</button>
            <button onClick={() => router.push('/logout')} className="px-3 py-2 border border-red-500 rounded text-red-400 hover:bg-red-500/6 transition">Logout</button>
            <button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} className="px-4 py-2 rounded-lg bg-gradient-to-r from-fuchsia-600 to-cyan-500 text-black font-semibold shadow-neon">Create Task</button>
          </div>
        </header>

        {/* NOTIFICATIONS */}
        {showNotifs && (
          <div className="absolute right-6 top-20 bg-[#07101a]/80 border border-cyan-600 rounded p-4 w-80 z-50 backdrop-blur-md">
            <h4 className="font-semibold text-cyan-200 mb-2">Notifications</h4>
            {notifications.length === 0 ? (
              <p className="text-sm text-slate-400">No notifications</p>
            ) : (
              notifications.map(n => (
                <div key={n.id} className="border-b border-slate-800 pb-2 mb-2">
                  <div className="text-sm text-slate-100">{n.title || n.body}</div>
                  <div className="text-xs text-slate-400">{new Date(n.created_at).toLocaleString()}</div>
                </div>
              ))
            )}
          </div>
        )}

        {/* MAIN GRID */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">

          <section className="lg:col-span-2 space-y-6">

            {/* RECOMMENDATIONS */}
            <div className="p-6 rounded-xl bg-[#041018]/60 border border-cyan-600 neon-panel">
              <h3 className="text-lg font-semibold mb-2 text-cyan-200">Recommendations {loadingRecs && '(loading...)'}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {recs.length === 0 ? (
                  <p className="text-sm text-slate-400">No recommendations yet</p>
                ) : (
                  recs.map((r, i) => (
                    <div key={i} className="p-3 bg-[#061826]/60 border border-fuchsia-600 rounded-lg shadow-inner-neon text-fuchsia-100">
                      {r}
                    </div>
                  ))
                )}
              </div>

              <div className="mt-4">
                <div className="h-24 flex items-end gap-1">
                  {hourly.map((v, i) => {
                    const max = Math.max(...hourly, 1);
                    return <div key={i} title={`${i}:00 = ${v} pts`} className="w-1 rounded-t" style={{ background: 'linear-gradient(180deg,#8be5ff,#7c3cff)', height: `${(v / max) * 100}%` }} />;
                  })}
                </div>
                <div className="text-xs text-slate-400 mt-1">Avg Sleep: {avgSleepHours ? avgSleepHours.toFixed(1) + ' hrs' : '-'}</div>
              </div>
            </div>

            {/* TASKS & SCHEDULING */}
            <div className="p-6 rounded-xl bg-[#041018]/60 border border-cyan-600 neon-panel">
              <h3 className="text-lg font-semibold mb-4 text-cyan-200">Tasks & Scheduling</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-[#021018]/40 border border-fuchsia-700 rounded-lg">
                  <TaskForm userId={userId} onCreated={handleTaskCreated} />
                </div>

                <div className="p-4 bg-[#021018]/40 border border-fuchsia-700 rounded-lg">
                  <TasksList userId={userId} refreshKey={refreshKey} />
                </div>
              </div>
            </div>

          </section>

          {/* SIDEBAR */}
          <aside className="space-y-6">

            <div className="p-6 rounded-xl bg-[#041018]/60 border border-cyan-600 neon-panel">
              <h4 className="font-semibold mb-3 text-cyan-200">Quick Actions</h4>
              <button onClick={runScheduler} className="w-full text-left py-2 px-3 rounded hover:bg-[#0b2030]/50">Auto-schedule pending tasks</button>
              <button onClick={loadRecs} className="w-full text-left py-2 px-3 rounded hover:bg-[#0b2030]/50">Refresh recommendations</button>
              <button onClick={() => alert('Export not implemented')} className="w-full text-left py-2 px-3 rounded hover:bg-[#0b2030]/50">Export logs</button>
            </div>

            <div className="p-6 rounded-xl bg-[#041018]/60 border border-cyan-600 neon-panel">
              <h4 className="font-semibold mb-3 text-cyan-200">Weekly Activity</h4>
              <div>{loadingAnalytics ? <p className="text-sm text-slate-400">Loading...</p> : <MiniBarChart data={dailyMap} />}</div>
            </div>

            <div className="p-6 rounded-xl bg-[#041018]/60 border border-cyan-600 neon-panel">
              <h4 className="font-semibold mb-3 text-cyan-200">Tips</h4>
              <ul className="text-sm text-slate-300 space-y-2">
                <li>✓ Add deadlines for better scheduling</li>
                <li>✓ Log study sessions for better recommendations</li>
                <li>✓ Sleep logs improve your AI insights</li>
              </ul>
            </div>

          </aside>
        </main>

        <footer className="mt-10 text-center text-xs text-slate-500 relative z-10">Built with Next.js + Tailwind — Student Optimizer</footer>

        {/* Page CSS (neon effects) */}
        <style jsx>{`
          .cyber-grid {
            background-image: linear-gradient(#08f7ff11 1px, transparent 1px), linear-gradient(90deg, #ff2dfc11 1px, transparent 1px);
            background-size: 48px 48px;
            transform: translateZ(0);
          }

          .shadow-neon { box-shadow: 0 6px 30px #0ff2; border: 1px solid rgba(12,255,255,0.12); }

          .neon-text { text-shadow: 0 0 8px rgba(12,255,255,0.12), 0 0 24px rgba(124,60,255,0.06); }

          .shadow-neon { box-shadow: 0 8px 40px rgba(124,60,255,0.08); }

          .neon-panel {
            box-shadow: inset 0 0 40px rgba(0,255,255,0.02), 0 6px 30px rgba(2,6,23,0.6);
            backdrop-filter: blur(6px);
          }

          .shadow-inner-neon { box-shadow: inset 0 0 20px rgba(255,0,255,0.04); }

          .shadow-neon { box-shadow: 0 8px 40px rgba(124,60,255,0.06); }

          .animate-pulse-slow { animation: pulse-slow 7s ease-in-out infinite; }
          .animate-pulse-slower { animation: pulse-slower 11s ease-in-out infinite; }

          @keyframes pulse-slow { 0%,100% { transform: scale(1); opacity: 0.18 } 50% { transform: scale(1.07); opacity: 0.35 } }
          @keyframes pulse-slower { 0%,100% { transform: scale(1); opacity: 0.12 } 50% { transform: scale(1.12); opacity: 0.28 } }

          .shadow-neon:hover { transform: translateY(-2px); transition: transform .2s ease; }

          /* small responsive tweaks */
          @media (max-width: 768px) {
            .cyber-grid { background-size: 36px 36px; }
          }
        `}</style>
      </div>
    </>
  );
}

// ================ Server-side auth protection ================
import jwt from "jsonwebtoken";
import cookie from "cookie";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

export async function getServerSideProps(context) {
  const { req } = context;
  const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
  const token = cookies.token;

  if (!token) {
    return { redirect: { destination: '/login', permanent: false } };
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return {
      props: {
        currentUser: {
          id: payload.id,
          email: payload.email,
        },
      },
    };
  } catch (err) {
    return { redirect: { destination: '/login', permanent: false } };
  }
}
