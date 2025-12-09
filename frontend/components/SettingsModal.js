// components/SettingsModal.jsx
import React, { useEffect, useState, createContext, useContext } from 'react';
import { SETTINGS_IMAGE } from '../components/api';

const STORAGE_KEY = 'app_settings';

const defaultSettings = {
  theme: 'light', // 'light' | 'dark' | 'system'
  defaultDuration: 60,
  notifications: {
    enabled: false,
    desktop: false,
    sound: false,
    reminderMinutesBefore: 10,
  },
  focus: {
    enabled: false,
    sessionMinutes: 25,
    breakMinutes: 5,
    autoStartNext: false,
  },
  preferredStudy: {
    startHour: 18,
    endHour: 21,
  },
  autoschedule: {
    enabled: false,
    strategy: 'deadline',
  },
  reminders: {
    dailySummary: false,
  },
  language: 'en',
  // example extra flag used by TaskList
  hideCompletedTasks: false,
};

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setSettings((s) => ({ ...s, ...parsed }));
      }
    } catch (e) {
      console.warn('Failed to read app settings', e);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save settings', e);
    }
  }, [settings, loaded]);

  useEffect(() => {
    const apply = () => {
      const theme = settings.theme;
      const root = document.documentElement;
      if (theme === 'system') {
        const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.classList.toggle('dark', isDark);
      } else if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };
    apply();
  }, [settings.theme]);

  const value = { settings, setSettings };
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used inside SettingsProvider');
  return ctx;
}

function Row({ children, className = '' }) {
  return <div className={`mb-3 ${className}`}>{children}</div>;
}

function Label({ children }) {
  return <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">{children}</div>;
}

export default function SettingsModal({ open, onClose }) {
  const { settings, setSettings } = useSettings();
  const [local, setLocal] = useState(settings);

  useEffect(() => setLocal(settings), [open, settings]);

  function update(path, value) {
    setLocal((s) => {
      const copy = JSON.parse(JSON.stringify(s));
      const parts = path.split('.');
      let cur = copy;
      for (let i = 0; i < parts.length - 1; i++) {
        const p = parts[i];
        cur[p] = cur[p] || {};
        cur = cur[p];
      }
      cur[parts[parts.length - 1]] = value;
      return copy;
    });
  }

  function save() {
    setSettings(local);
    onClose && onClose();
  }

  function reset() {
    setLocal(defaultSettings);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mx-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img src={SETTINGS_IMAGE} alt="logo" className="w-12 h-12 rounded" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Settings</h3>
              <div className="text-xs text-gray-500 dark:text-gray-400">Customize your Student Optimizer experience</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={reset} className="px-3 py-1 border rounded text-sm">Reset</button>
            <button onClick={onClose} className="px-3 py-1 border rounded text-sm">Close</button>
            <button onClick={save} className="px-4 py-2 bg-indigo-600 text-white rounded">Save</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[70vh] overflow-auto pr-2">
          {/* Theme */}
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded">
            <h4 className="font-semibold mb-2">Theme</h4>
            <Row>
              <Label>Theme mode</Label>
              <select value={local.theme} onChange={(e) => update('theme', e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700">
                <option value="system">System (follow OS)</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </Row>
          </div>

          {/* Default duration & autoschedule */}
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded">
            <h4 className="font-semibold mb-2">Default Task</h4>
            <Row>
              <Label>Default task duration (minutes)</Label>
              <input type="number" min={1} value={local.defaultDuration} onChange={(e) => update('defaultDuration', Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-700" />
            </Row>
            <Row>
              <Label>Auto-schedule on creation</Label>
              <div className="flex items-center gap-2">
                <input id="autoschedule" type="checkbox" checked={local.autoschedule.enabled} onChange={(e) => update('autoschedule.enabled', e.target.checked)} />
                <label htmlFor="autoschedule">Enable auto scheduling</label>
              </div>
              <div className="mt-2">
                <Label>Autoschedule strategy</Label>
                <select value={local.autoschedule.strategy} onChange={(e) => update('autoschedule.strategy', e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700">
                  <option value="deadline">By nearest deadline</option>
                  <option value="priority">By priority</option>
                </select>
              </div>
            </Row>
          </div>

          {/* Notifications */}
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded">
            <h4 className="font-semibold mb-2">Notifications</h4>
            <Row>
              <Label>Enable notifications</Label>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={local.notifications.enabled} onChange={(e) => update('notifications.enabled', e.target.checked)} />
                <span>Enabled</span>
              </div>
            </Row>
            <Row>
              <Label>Desktop notifications</Label>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={local.notifications.desktop} onChange={(e) => update('notifications.desktop', e.target.checked)} />
                <span>Allow desktop</span>
              </div>
            </Row>
            <Row>
              <Label>Reminder minutes before deadline</Label>
              <input type="number" min={0} value={local.notifications.reminderMinutesBefore} onChange={(e) => update('notifications.reminderMinutesBefore', Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-700" />
            </Row>
          </div>

          {/* Focus Mode */}
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded">
            <h4 className="font-semibold mb-2">Focus Mode (Pomodoro)</h4>
            <Row>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={local.focus.enabled} onChange={(e) => update('focus.enabled', e.target.checked)} />
                <span>Enable Focus Mode</span>
              </div>
            </Row>
            <Row>
              <Label>Session (minutes)</Label>
              <input type="number" min={5} value={local.focus.sessionMinutes} onChange={(e) => update('focus.sessionMinutes', Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-700" />
            </Row>
            <Row>
              <Label>Break (minutes)</Label>
              <input type="number" min={1} value={local.focus.breakMinutes} onChange={(e) => update('focus.breakMinutes', Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-700" />
            </Row>
            <Row>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={local.focus.autoStartNext} onChange={(e) => update('focus.autoStartNext', e.target.checked)} />
                <span>Auto-start next session</span>
              </div>
            </Row>
          </div>

          {/* Preferred Study */}
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded">
            <h4 className="font-semibold mb-2">Preferred Study Times</h4>
            <Row>
              <Label>Start Hour (0-23)</Label>
              <input type="number" min={0} max={23} value={local.preferredStudy.startHour} onChange={(e) => update('preferredStudy.startHour', Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-700" />
            </Row>
            <Row>
              <Label>End Hour (0-23)</Label>
              <input type="number" min={0} max={23} value={local.preferredStudy.endHour} onChange={(e) => update('preferredStudy.endHour', Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-700" />
            </Row>
          </div>

          {/* Reminders & Language */}
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded">
            <h4 className="font-semibold mb-2">Reminders & Language</h4>
            <Row>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={local.reminders.dailySummary} onChange={(e) => update('reminders.dailySummary', e.target.checked)} />
                <span>Daily summary email (if enabled)</span>
              </div>
            </Row>
            <Row>
              <Label>Language</Label>
              <select value={local.language} onChange={(e) => update('language', e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700">
                <option value="en">English</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="mr">मराठी (Marathi)</option>
                <option value="kn">ಕನ್ನಡ (Kannada)</option>
                <option value="ta">தமிழ் (Tamil)</option>
              </select>
            </Row>
          </div>

          {/* Data & Account */}
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded">
            <h4 className="font-semibold mb-2">Data & Account</h4>
            <Row>
              <button onClick={() => {
                const payload = { settings: local };
                const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'student_optimizer_settings.json';
                a.click();
                URL.revokeObjectURL(url);
              }} className="px-3 py-2 bg-white border rounded">Export settings</button>
            </Row>

            <Row>
              <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Import settings (JSON)</label>
              <input type="file" accept="application/json" onChange={(e) => {
                const f = e.target.files && e.target.files[0];
                if (!f) return;
                const reader = new FileReader();
                reader.onload = (ev) => {
                  try {
                    const parsed = JSON.parse(ev.target.result);
                    if (parsed && parsed.settings) {
                      setLocal(parsed.settings);
                      alert('Imported settings. Press Save to apply.');
                    } else {
                      alert('File does not contain settings');
                    }
                  } catch (err) {
                    alert('Invalid JSON');
                  }
                };
                reader.readAsText(f);
              }} className="w-full" />
            </Row>

            <Row>
              <Label>Account actions</Label>
              <div className="flex gap-2">
                <button onClick={() => { window.location.href = '/logout'; }} className="px-3 py-2 border rounded text-sm">Logout</button>
                <button onClick={() => {
                  if (!confirm('This will clear all settings from this browser. Continue?')) return;
                  localStorage.removeItem(STORAGE_KEY);
                  setLocal(defaultSettings);
                  setSettings(defaultSettings);
                }} className="px-3 py-2 border rounded text-sm text-red-600">Clear local settings</button>
              </div>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}