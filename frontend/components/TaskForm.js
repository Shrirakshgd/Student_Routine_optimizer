// components/TaskForm.js
import { useEffect, useState } from "react";
import { API_BASE } from "./api";
import { useSettings } from "./SettingsModal";

export default function TaskForm({ userId = 1, onCreated = () => {} }) {
  const [title, setTitle] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  let settings = null;
  try {
    settings = useSettings().settings;
  } catch {
    settings = null;
  }

  // Load default duration
  useEffect(() => {
    if (settings?.defaultDuration) {
      setDurationMinutes(settings.defaultDuration);
      return;
    }

    try {
      const raw = localStorage.getItem("app_settings");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.defaultDuration) setDurationMinutes(parsed.defaultDuration);
      }
    } catch {}
  }, [settings]);

  function resetForm() {
    setTitle("");
    setDurationMinutes(settings?.defaultDuration || 60);
    setDeadline("");
    setPriority("");
    setCategory("");
  }

  async function safeParse(res) {
    const text = await res.text();
    try {
      return text ? JSON.parse(text) : {};
    } catch {
      throw new Error(`Invalid JSON response:\n${text}`);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Please enter a title.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        user_id: userId,
        title: title.trim(),
        duration_minutes: Number(durationMinutes),
        deadline: deadline ? new Date(deadline).toISOString() : null,
        priority: priority || null,
        category: category || null,
      };

      const res = await fetch(`${API_BASE}/api/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const json = await safeParse(res);
      if (!res.ok) throw new Error(json.error || json.message);

      resetForm();
      onCreated(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // -------------------------
  // UI DESIGN — BLUE THEME
  // -------------------------

  return (
    <div className="bg-white/10 dark:bg-gray-900/40 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-lg">
      
      {/* Title */}
      <h4 className="text-xl font-semibold text-white mb-4 tracking-wide">
        Create New Task
      </h4>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Task Title */}
        <div>
          <label className="text-blue-200 text-sm">Task Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What do you need to do?"
            className="mt-1 w-full p-2 bg-white/10 text-white placeholder-gray-300 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Duration & Priority */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-blue-200 text-sm">Duration (minutes)</label>
            <input
              type="number"
              min={5}
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(e.target.value)}
              className="mt-1 w-full p-2 bg-white/10 text-white border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="text-blue-200 text-sm">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="mt-1 w-full p-2 bg-white/10 text-white border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="" className="text-black">None</option>
              <option value="high" className="text-black">High</option>
              <option value="medium" className="text-black">Medium</option>
              <option value="low" className="text-black">Low</option>
            </select>
          </div>
        </div>

        {/* Deadline */}
        <div>
          <label className="text-blue-200 text-sm">Deadline (optional)</label>
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="mt-1 w-full p-2 bg-white/10 text-white border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Category */}
        <div>
          <label className="text-blue-200 text-sm">Category</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., Study, Exercise"
            className="mt-1 w-full p-2 bg-white/10 text-white placeholder-gray-300 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-300 bg-red-500/20 border border-red-400/20 p-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg shadow hover:shadow-blue-500/30 text-white font-medium disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Task"}
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 border border-white/20 text-white rounded-lg hover:bg-white/10"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
