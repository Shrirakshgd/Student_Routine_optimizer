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

  // Try to read settings from provider (wrapped in try so no crash)
  let settings = null;
  try {
    const ctx = useSettings();
    settings = ctx.settings;
  } catch (err) {
    // provider missing → fallback
    settings = null;
  }

  // Apply defaultDuration from SettingsModal
  useEffect(() => {
    if (settings && settings.defaultDuration) {
      setDurationMinutes(settings.defaultDuration);
    } else {
      // fallback to localStorage (old logic)
      try {
        const raw = localStorage.getItem("app_settings");
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed.defaultDuration) setDurationMinutes(parsed.defaultDuration);
        }
      } catch {}
    }
  }, [settings]);

  function resetForm() {
    setTitle("");
    setDurationMinutes(settings?.defaultDuration || 60);
    setDeadline("");
    setPriority("");
    setCategory("");
  }

  // Safe JSON parser
  async function safeParse(res) {
    const text = await res.text();
    try {
      return text ? JSON.parse(text) : {};
    } catch (err) {
      throw new Error(
        `Server returned non-JSON data (status ${res.status}):\n\n${text.slice(
          0,
          2000
        )}`
      );
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

      if (!res.ok) {
        throw new Error(json.error || json.message || `Status ${res.status}`);
      }

      resetForm();
      onCreated(json);
    } catch (err) {
      console.error("TaskForm create error:", err);
      setError(err.message || "Error creating task");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow text-gray-900 dark:text-gray-100">
      <h4 className="font-semibold mb-3">Create Task</h4>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Title */}
        <div>
          <label className="block text-sm">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What do you need to do?"
            className="mt-1 w-full border p-2 rounded dark:bg-gray-700"
          />
        </div>

        {/* Duration + Priority */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm">Duration (min)</label>
            <input
              type="number"
              min={5}
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(e.target.value)}
              className="mt-1 w-full border p-2 rounded dark:bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="mt-1 w-full border p-2 rounded dark:bg-gray-700"
            >
              <option value="">—</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Deadline */}
        <div>
          <label className="block text-sm">Deadline (optional)</label>
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="mt-1 w-full border p-2 rounded dark:bg-gray-700"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm">Category</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., Study, Exercise"
            className="mt-1 w-full border p-2 rounded dark:bg-gray-700"
          />
        </div>

        {error && (
          <div className="text-sm text-red-500 whitespace-pre-wrap">{error}</div>
        )}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            {loading ? "Saving..." : "Save Task"}
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="px-3 py-2 border rounded"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
