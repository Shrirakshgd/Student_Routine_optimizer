// pages/index.js
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';

import SettingsModal, { useSettings } from '../components/SettingsModal';
import TaskForm from '../components/TaskForm';
import TasksList from '../components/TasksList';
import MiniBarChart from '../components/MiniBarChart';
import { API_BASE, HERO_IMAGE_BACKEND } from '../components/api';

/* ================= DASHBOARD ================= */

export default function Dashboard({ currentUser }) {
  const router = useRouter();
  const userId = currentUser?.id || 1;

  const [settingsOpen, setSettingsOpen] = useState(false);

  let settings;
  try {
    settings = useSettings().settings;
  } catch {
    settings = { theme: 'dark' };
  }

  useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.theme === 'dark');
  }, [settings.theme]);

  const [refreshKey, setRefreshKey] = useState(0);

  const [recs, setRecs] = useState([]);
  const [hourly, setHourly] = useState(new Array(24).fill(0));
  const [avgSleepHours, setAvgSleepHours] = useState(null);
  const [dailyMap, setDailyMap] = useState({});
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [showNotifs, setShowNotifs] = useState(false);

  async function safeJSON(res) {
    try {
      return await res.json();
    } catch {
      return {};
    }
  }

  async function loadRecs() {
    const res = await fetch(`${API_BASE}/api/ai/recommendations/${userId}`);
    const json = await safeJSON(res);
    setRecs(json.recommendations || []);
    setHourly(json.hourly || new Array(24).fill(0));
    setAvgSleepHours(json.avgSleepHours ?? null);
  }

  async function loadAnalytics() {
    setLoadingAnalytics(true);
    const res = await fetch(`${API_BASE}/api/analytics/daily/${userId}?days=14`);
    setDailyMap(await safeJSON(res));
    setLoadingAnalytics(false);
  }

  async function loadNotifications() {
    const res = await fetch(`${API_BASE}/api/notifications?user_id=${userId}`);
    const json = await safeJSON(res);
    setNotifications(Array.isArray(json) ? json : json.rows || []);
  }

  useEffect(() => {
    loadRecs();
    loadAnalytics();
    loadNotifications();
  }, [refreshKey]);

  function toggleNotifs() {
    setShowNotifs(v => !v);
    if (!showNotifs) loadNotifications();
  }

  return (
    <>
      <Head>
        <title>AI Student Routine Optimizer</title>
      </Head>

      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-[#05060f] text-slate-100"
      >
        {/* HEADER */}
        <header className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-cyan-500/20">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative">
            <div className="flex gap-4 items-center">
              <img
                src={HERO_IMAGE_BACKEND}
                className="w-12 h-12 rounded-xl shadow-md"
              />
              <div>
                <h1 className="text-xl font-semibold text-cyan-300">
                  AI Routine Optimizer
                </h1>
                <p className="text-xs text-slate-400">
                  Smart scheduling & insights
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <HeaderButton label="Notifications" onClick={toggleNotifs} />
              <HeaderButton label="Settings" onClick={() => setSettingsOpen(true)} />
              <HeaderButton
                label="Logout"
                danger
                onClick={() => router.push('/logout')}
              />
            </div>

            {/* Notifications */}
            <AnimatePresence>
              {showNotifs && (
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="absolute right-6 top-16 w-80 rounded-xl bg-[#0b1220]/95
                  border border-cyan-600/30 shadow-xl p-4 z-50"
                >
                  <h4 className="text-cyan-200 font-semibold mb-2">
                    Notifications
                  </h4>
                  {notifications.length === 0 ? (
                    <p className="text-sm text-slate-400">No notifications</p>
                  ) : (
                    notifications.map(n => (
                      <div
                        key={n.id}
                        className="border-b border-slate-700 py-2 last:border-none"
                      >
                        <div className="text-sm">{n.title || n.body}</div>
                        <div className="text-xs text-slate-400">
                          {new Date(n.created_at).toLocaleString()}
                        </div>
                      </div>
                    ))
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* MAIN */}
        <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">

          {/* AI INSIGHTS */}
          <section className="grid md:grid-cols-3 gap-6">
            <GlassCard className="md:col-span-2">
              <h2 className="section-title">AI Insights</h2>

              <motion.div
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.07 } } }}
                className="grid sm:grid-cols-2 gap-4 mt-4"
              >
                {recs.map((r, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      show: { opacity: 1, y: 0 },
                    }}
                    className="insight-card"
                  >
                    {r}
                  </motion.div>
                ))}
              </motion.div>

              <div className="mt-6">
                <MiniChart hourly={hourly} />
                <p className="text-xs mt-2 text-slate-400">
                  Avg Sleep: {avgSleepHours?.toFixed(1) || '--'} hrs
                </p>
              </div>
            </GlassCard>

            <GlassCard>
              <h2 className="section-title">Quick Actions</h2>
              <button onClick={loadRecs} className="action-btn">
                Refresh AI Insights
              </button>
            </GlassCard>
          </section>

          {/* TASKS */}
          <section className="grid md:grid-cols-2 gap-6">
            <GlassCard>
              <h2 className="section-title">Create Task</h2>
              <TaskForm
                userId={userId}
                onCreated={() => setRefreshKey(k => k + 1)}
              />
            </GlassCard>

            <GlassCard>
              <h2 className="section-title">Your Tasks</h2>
              <TasksList userId={userId} refreshKey={refreshKey} />
            </GlassCard>
          </section>

          {/* ANALYTICS */}
          <section className="grid md:grid-cols-3 gap-6">
            <GlassCard className="md:col-span-2">
              <h2 className="section-title">Weekly Activity</h2>
              {loadingAnalytics ? (
                <p className="text-sm text-slate-400">Loading…</p>
              ) : (
                <MiniBarChart data={dailyMap} />
              )}
            </GlassCard>

            <GlassCard>
              <h2 className="section-title">Study Tips</h2>
              <ul className="text-sm space-y-2 text-slate-300">
                <li>• Sleep consistency boosts focus</li>
                <li>• Add deadlines for smarter planning</li>
                <li>• Track sessions daily</li>
              </ul>
            </GlassCard>
          </section>
        </main>

        <footer className="text-center text-xs text-slate-500 py-6">
          Built with Next.js • Tailwind • Framer Motion
        </footer>
      </motion.div>
    </>
  );
}

/* ================= UI HELPERS ================= */

function HeaderButton({ label, onClick, danger }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-3 py-1.5 rounded-md border text-sm transition ${
        danger
          ? 'border-red-500/40 text-red-400 hover:bg-red-500/10'
          : 'border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10'
      }`}
    >
      {label}
    </motion.button>
  );
}

function GlassCard({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl p-6 bg-white/5 border border-white/10
      backdrop-blur-xl shadow-lg ${className}`}
    >
      {children}
    </motion.div>
  );
}

function MiniChart({ hourly }) {
  const max = Math.max(...hourly, 1);
  return (
    <div className="flex items-end gap-1 h-24">
      {hourly.map((v, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${(v / max) * 100}%` }}
          transition={{ duration: 0.5, delay: i * 0.015 }}
          className="w-1 rounded-t"
          style={{
            background: 'linear-gradient(180deg,#38bdf8,#7c3aed)',
          }}
        />
      ))}
    </div>
  );
}

/* ================= AUTH ================= */

import jwt from 'jsonwebtoken';
import cookie from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

export async function getServerSideProps({ req }) {
  const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
  const token = cookies.token;

  if (!token)
    return { redirect: { destination: '/login', permanent: false } };

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return {
      props: { currentUser: { id: payload.id, email: payload.email } },
    };
  } catch {
    return { redirect: { destination: '/login', permanent: false } };
  }
}
