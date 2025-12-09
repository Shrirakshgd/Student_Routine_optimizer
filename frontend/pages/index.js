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
  // make sure pages/_app.js wraps the app with <SettingsProvider>
  let settings = null;
  try {
    // useSettings will throw if not wrapped by provider — guard it so page still renders
    const ctx = useSettings();
    settings = ctx.settings;
  } catch (e) {
    // no provider — fallback
    settings = { theme: 'light', defaultDuration: 60 };
  }

  // local theme state is driven by settings.theme (SettingsProvider already toggles document class,
  // this effect keeps local theme in sync in case you want to use it here)
  useEffect(() => {
    if (!settings) return;
    const theme = settings.theme || 'system';
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else if (theme === 'light') document.documentElement.classList.remove('dark');
    else {
      // system
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

  // UNIVERSAL SAFE JSON PARSER
  async function safeJSON(res) {
    const text = await res.text();
    try {
      return text ? JSON.parse(text) : {};
    } catch (err) {
      console.warn('Non-JSON from server:', text.slice(0, 500));
      return {};
    }
  }

  // LOAD RECOMMENDATIONS
  async function loadRecs() {
    setLoadingRecs(true);
    try {
      const res = await fetch(`${API_BASE}/api/ai/recommendations/${userId}`);
      const json = await safeJSON(res);

      setRecs(json.recommendations || json.recs || []);
      setHourly(json.hourly || new Array(24).fill(0));
      setAvgSleepHours(json.avgSleepHours ?? null);
    } catch (err) {
      console.error('loadRecs error', err);
    } finally {
      setLoadingRecs(false);
    }
  }

  // LOAD ANALYTICS
  async function loadAnalytics() {
    setLoadingAnalytics(true);
    try {
      const res = await fetch(`${API_BASE}/api/analytics/daily/${userId}?days=14`);
      const json = await safeJSON(res);
      setDailyMap(json || {});
    } catch (err) {
      console.error('loadAnalytics error', err);
    } finally {
      setLoadingAnalytics(false);
    }
  }

  // LOAD NOTIFICATIONS
  async function loadNotifications() {
    try {
      const res = await fetch(`${API_BASE}/api/notifications?user_id=${userId}`);
      const json = await safeJSON(res);
      if (Array.isArray(json)) setNotifications(json);
      else setNotifications(json.rows || []);
    } catch (err) {
      console.error('loadNotifications error', err);
      setNotifications([]);
    }
  }

  useEffect(() => {
    loadRecs();
    loadAnalytics();
    loadNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  // RUN SCHEDULER
  async function runScheduler() {
    try {
      const res = await fetch(`${API_BASE}/api/schedule/run/${userId}`, { method: 'POST' });
      const json = await safeJSON(res);
      alert(`Auto-scheduled ${json.scheduledCount || 0} tasks`);
      setRefreshKey(k => k + 1);
    } catch (err) {
      console.error('runScheduler error', err);
      alert('Scheduler failed');
    }
  }

  const handleTaskCreated = () => setRefreshKey(k => k + 1);

  function toggleNotifs() {
    setShowNotifs(v => !v);
    if (!showNotifs) loadNotifications();
  }

  return (
    <>
      <Head>
        <title>AI Student Routine Optimizer</title>
      </Head>

      {/* Settings modal (from components) */}
      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
        {/* HEADER */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <img
              src={HERO_IMAGE_BACKEND}
              alt="logo"
              className="w-14 h-14 object-cover rounded-lg shadow"
            />
            <div>
              <h1 className="text-2xl font-bold">AI Student Routine Optimizer</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Smart scheduling + personalized recommendations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={toggleNotifs} className="px-3 py-2 border rounded">
              Notifications
            </button>

            {/* Settings opens modal */}
            <button onClick={() => setSettingsOpen(true)} className="px-3 py-2 border rounded">
              Settings
            </button>

            <button
              onClick={() => router.push('/logout')}
              className="px-3 py-2 border rounded text-red-600"
            >
              Logout
            </button>

            <button
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Create Task
            </button>
          </div>
        </header>

        {/* NOTIFICATIONS DROPDOWN */}
        {showNotifs && (
          <div className="absolute right-6 top-20 bg-white dark:bg-gray-800 shadow rounded p-4 w-80 z-50">
            <h4 className="font-semibold mb-2">Notifications</h4>
            {notifications.length === 0 ? (
              <p className="text-sm text-gray-500">No notifications</p>
            ) : (
              notifications.map(n => (
                <div key={n.id} className="border-b pb-2 mb-2">
                  <div className="text-sm">{n.title || n.body}</div>
                  <div className="text-xs text-gray-400">
                    {new Date(n.created_at).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* MAIN GRID */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 space-y-6">
            {/* RECOMMENDATIONS */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">
                Recommendations {loadingRecs && '(loading...)'}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {recs.length === 0 ? (
                  <p className="text-sm text-gray-500">No recommendations yet</p>
                ) : (
                  recs.map((r, i) => (
                    <div key={i} className="p-3 bg-indigo-50 dark:bg-indigo-900 text-indigo-700 rounded-lg shadow-sm">
                      {r}
                    </div>
                  ))
                )}
              </div>

              {/* HOURLY GRAPH */}
              <div className="mt-4">
                <div className="h-24 flex items-end gap-1">
                  {hourly.map((v, i) => {
                    const max = Math.max(...hourly, 1);
                    return <div key={i} title={`${i}:00 = ${v} pts`} className="w-1 bg-indigo-300" style={{ height: `${(v / max) * 100}%` }} />;
                  })}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Avg Sleep: {avgSleepHours ? avgSleepHours.toFixed(1) + ' hrs' : '-'}
                </div>
              </div>
            </div>

            {/* TASKS */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Tasks & Scheduling</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TaskForm userId={userId} onCreated={handleTaskCreated} />
                <TasksList userId={userId} refreshKey={refreshKey} />
              </div>
            </div>
          </section>

          {/* SIDEBAR */}
          <aside className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h4 className="font-semibold mb-3">Quick Actions</h4>
              <button onClick={runScheduler} className="text-indigo-600 block text-left">Auto-schedule pending tasks</button>
              <button onClick={loadRecs} className="text-indigo-600 block text-left mt-2">Refresh recommendations</button>
              <button onClick={() => alert('Export not implemented')} className="text-indigo-600 block text-left mt-2">Export logs</button>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h4 className="font-semibold mb-3">Weekly Activity</h4>
              {loadingAnalytics ? <p className="text-sm text-gray-500">Loading...</p> : <MiniBarChart data={dailyMap} />}
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h4 className="font-semibold mb-3">Tips</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <li>✓ Add deadlines for better scheduling</li>
                <li>✓ Log study sessions for better recommendations</li>
                <li>✓ Sleep logs improve your AI insights</li>
              </ul>
            </div>
          </aside>
        </main>

        <footer className="mt-10 text-center text-xs text-gray-500">Built with Next.js + Tailwind — Student Optimizer</footer>
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
