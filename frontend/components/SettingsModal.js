// components/SettingsModal.jsx
import React, { useEffect, useState, createContext, useContext } from "react";
import { SETTINGS_IMAGE } from "../components/api";

const STORAGE_KEY = "app_settings";

const defaultSettings = {
  theme: "light",
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
    strategy: "deadline",
  },
  reminders: {
    dailySummary: false,
  },
  language: "en",
  hideCompletedTasks: false,
};

const SettingsContext = createContext();
export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings);
  const [loaded, setLoaded] = useState(false);

  // Load settings
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSettings((s) => ({ ...s, ...JSON.parse(raw) }));
    } catch {}
    setLoaded(true);
  }, []);

  // Save settings
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings, loaded]);

  // Apply theme
  useEffect(() => {
    const root = document.documentElement;
    const theme = settings.theme;

    if (theme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", prefersDark);
    } else {
      root.classList.toggle("dark", theme === "dark");
    }
  }, [settings.theme]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be inside SettingsProvider");
  return ctx;
}

function Section({ title, children }) {
  return (
    <div className="bg-white/10 dark:bg-gray-900/40 backdrop-blur-sm p-4 rounded-lg border border-white/10">
      <h4 className="font-semibold mb-3 text-white">{title}</h4>
      {children}
    </div>
  );
}

function Row({ label, children }) {
  return (
    <div className="mb-4">
      {label && <div className="text-sm text-blue-200 mb-1">{label}</div>}
      {children}
    </div>
  );
}

export default function SettingsModal({ open, onClose }) {
  const { settings, setSettings } = useSettings();
  const [local, setLocal] = useState(settings);

  useEffect(() => setLocal(settings), [open, settings]);

  const update = (path, value) => {
    setLocal((draft) => {
      const copy = structuredClone(draft);
      const keys = path.split(".");
      let ref = copy;
      for (let i = 0; i < keys.length - 1; i++) ref = ref[keys[i]];
      ref[keys.at(-1)] = value;
      return copy;
    });
  };

  const save = () => {
    setSettings(local);
    onClose();
  };

  const reset = () => setLocal(defaultSettings);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl bg-gradient-to-br from-blue-950 via-slate-900 to-black text-white rounded-xl shadow-2xl p-6 mx-4 border border-white/10">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <img src={SETTINGS_IMAGE} className="w-12 h-12 rounded-lg border border-blue-300 shadow" />
            <div>
              <h2 className="text-xl font-bold tracking-wide">Settings</h2>
              <p className="text-sm text-blue-300 opacity-80">
                Customize Student Optimizer
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={reset} className="px-3 py-1 rounded-lg border border-blue-300 text-blue-300">
              Reset
            </button>
            <button onClick={onClose} className="px-3 py-1 rounded-lg border border-gray-400 text-gray-200">
              Close
            </button>
            <button
              onClick={save}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg shadow"
            >
              Save
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto pr-2">

          {/* THEME */}
          <Section title="Theme">
            <Row label="Theme mode">
              <select
                value={local.theme}
                onChange={(e) => update("theme", e.target.value)}
                className="w-full p-2 rounded bg-white/10 border border-white/20"
              >
                <option value="system">System</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </Row>
          </Section>

          {/* DEFAULT DURATION */}
          <Section title="Default Task">
            <Row label="Default duration (minutes)">
              <input
                type="number"
                min="1"
                value={local.defaultDuration}
                onChange={(e) => update("defaultDuration", Number(e.target.value))}
                className="w-full p-2 rounded bg-white/10 border border-white/20"
              />
            </Row>

            <Row label="Auto-schedule on creation">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={local.autoschedule.enabled}
                  onChange={(e) => update("autoschedule.enabled", e.target.checked)}
                />
                Enable auto scheduling
              </div>
            </Row>

            <Row label="Strategy">
              <select
                value={local.autoschedule.strategy}
                onChange={(e) => update("autoschedule.strategy", e.target.value)}
                className="w-full p-2 rounded bg-white/10 border border-white/20"
              >
                <option value="deadline">Nearest deadline</option>
                <option value="priority">By priority</option>
              </select>
            </Row>
          </Section>

          {/* NOTIFICATIONS */}
          <Section title="Notifications">
            <Row>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={local.notifications.enabled}
                  onChange={(e) => update("notifications.enabled", e.target.checked)}
                />
                Enable notifications
              </div>
            </Row>

            <Row>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={local.notifications.desktop}
                  onChange={(e) => update("notifications.desktop", e.target.checked)}
                />
                Desktop notifications
              </div>
            </Row>

            <Row label="Reminder minutes before deadline">
              <input
                type="number"
                value={local.notifications.reminderMinutesBefore}
                onChange={(e) =>
                  update(
                    "notifications.reminderMinutesBefore",
                    Number(e.target.value)
                  )
                }
                className="w-full p-2 rounded bg-white/10 border border-white/20"
              />
            </Row>
          </Section>

          {/* FOCUS MODE */}
          <Section title="Focus Mode (Pomodoro)">
            <Row>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={local.focus.enabled}
                  onChange={(e) => update("focus.enabled", e.target.checked)}
                />
                Enable Focus Mode
              </div>
            </Row>

            <Row label="Session (minutes)">
              <input
                type="number"
                min="5"
                value={local.focus.sessionMinutes}
                onChange={(e) =>
                  update("focus.sessionMinutes", Number(e.target.value))
                }
                className="w-full p-2 rounded bg-white/10 border border-white/20"
              />
            </Row>

            <Row label="Break (minutes)">
              <input
                type="number"
                min="1"
                value={local.focus.breakMinutes}
                onChange={(e) =>
                  update("focus.breakMinutes", Number(e.target.value))
                }
                className="w-full p-2 rounded bg-white/10 border border-white/20"
              />
            </Row>

            <Row>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={local.focus.autoStartNext}
                  onChange={(e) => update("focus.autoStartNext", e.target.checked)}
                />
                Auto-start next session
              </div>
            </Row>
          </Section>

          {/* STUDY TIMES */}
          <Section title="Preferred Study Times">
            <Row label="Start Hour (0–23)">
              <input
                type="number"
                min="0"
                max="23"
                value={local.preferredStudy.startHour}
                onChange={(e) =>
                  update("preferredStudy.startHour", Number(e.target.value))
                }
                className="w-full p-2 rounded bg-white/10 border border-white/20"
              />
            </Row>

            <Row label="End Hour (0–23)">
              <input
                type="number"
                min="0"
                max="23"
                value={local.preferredStudy.endHour}
                onChange={(e) =>
                  update("preferredStudy.endHour", Number(e.target.value))
                }
                className="w-full p-2 rounded bg-white/10 border border-white/20"
              />
            </Row>
          </Section>

          {/* REMINDERS & LANGUAGE */}
          <Section title="Reminders & Language">
            <Row>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={local.reminders.dailySummary}
                  onChange={(e) =>
                    update("reminders.dailySummary", e.target.checked)
                  }
                />
                Daily summary email
              </div>
            </Row>

            <Row label="Language">
              <select
                value={local.language}
                onChange={(e) => update("language", e.target.value)}
                className="w-full p-2 rounded bg-white/10 border border-white/20"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="mr">Marathi</option>
                <option value="kn">Kannada</option>
                <option value="ta">Tamil</option>
              </select>
            </Row>
          </Section>

          {/* DATA EXPORT / DANGER ZONE */}
          <Section title="Data & Account">
            <Row>
              <button
                onClick={() => {
                  const blob = new Blob(
                    [JSON.stringify({ settings: local }, null, 2)],
                    { type: "application/json" }
                  );
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "student_optimizer_settings.json";
                  a.click();
                }}
                className="px-3 py-2 bg-white/10 rounded border border-white/20 hover:bg-white/20"
              >
                Export settings
              </button>
            </Row>

            <Row label="Import settings (JSON)">
              <input
                type="file"
                accept="application/json"
                className="w-full bg-white/10 border border-white/20 p-2 rounded"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (ev) => {
                    try {
                      const parsed = JSON.parse(ev.target.result);
                      if (parsed.settings) {
                        setLocal(parsed.settings);
                        alert("Settings imported. Press Save to apply.");
                      } else alert("Invalid settings JSON");
                    } catch {
                      alert("Invalid JSON file");
                    }
                  };
                  reader.readAsText(file);
                }}
              />
            </Row>

            <Row label="Account actions">
              <div className="flex gap-2">
                <button
                  onClick={() => (window.location.href = "/logout")}
                  className="px-3 py-2 border border-white/20 rounded hover:bg-white/10"
                >
                  Logout
                </button>

                <button
                  onClick={() => {
                    if (!confirm("Clear all settings in this browser?")) return;
                    localStorage.removeItem(STORAGE_KEY);
                    setSettings(defaultSettings);
                    setLocal(defaultSettings);
                  }}
                  className="px-3 py-2 border border-red-400 text-red-400 rounded hover:bg-red-400/10"
                >
                  Clear local settings
                </button>
              </div>
            </Row>
          </Section>
        </div>
      </div>
    </div>
  );
}
