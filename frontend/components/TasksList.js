// components/TasksList.js
import { useEffect, useState } from "react";
import { API_BASE } from "./api";
import { useSettings } from "./SettingsModal";

/**
 * Props:
 *  - userId
 *  - refreshKey (to refetch when parent updates)
 */
export default function TasksList({ userId = 1, refreshKey = 0 }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Try to read settings (graceful if provider missing)
  let settings = null;
  try {
    const ctx = useSettings();
    settings = ctx.settings;
  } catch (e) {
    settings = null;
  }

  async function safeJSON(res) {
    const text = await res.text();
    try {
      return text ? JSON.parse(text) : {};
    } catch (err) {
      console.warn("Non-JSON from server:", text.slice(0, 500));
      return {};
    }
  }

  async function fetchTasks() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/tasks/user/${userId}`);
      const json = await safeJSON(res);
      if (!res.ok) throw new Error(json.error || json.message || `Status ${res.status}`);
      setTasks(json || []);
    } catch (err) {
      console.error("TasksList fetch error:", err);
      setError(err.message || "Error fetching tasks");
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, refreshKey]);

  async function handleDelete(id) {
    if (!confirm("Delete this task?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/tasks/${id}`, { method: "DELETE", credentials: "include" });
      if (!res.ok) {
        const body = await safeJSON(res);
        throw new Error(body.error || "Delete failed");
      }
      setTasks((t) => t.filter((x) => x.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert(err.message || "Failed to delete");
    }
  }

  async function markDone(task) {
    try {
      const newStatus = task.status === "done" ? "pending" : "done";
      const res = await fetch(`${API_BASE}/api/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await safeJSON(res);
      if (!res.ok) throw new Error(json.error || "Update failed");
      setTasks((arr) => arr.map((t) => (t.id === task.id ? json : t)));
    } catch (err) {
      console.error("Update error:", err);
      alert(err.message || "Failed to update task");
    }
  }

  // Optional: hide completed if setting says so (example)
  const hideCompleted = settings && settings.hideCompletedTasks;

  const visibleTasks = hideCompleted ? tasks.filter(t => t.status !== 'done') : tasks;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow dark:shadow-none text-gray-900 dark:text-gray-100">
      <h4 className="font-semibold mb-3">Your Tasks</h4>

      {loading && <div className="text-sm text-gray-500 dark:text-gray-400">Loading...</div>}
      {error && <div className="text-sm text-red-500">{error}</div>}

      {!loading && visibleTasks.length === 0 && (
        <div className="text-sm text-gray-500 dark:text-gray-400">No tasks yet</div>
      )}

      <ul className="divide-y divide-gray-100 dark:divide-gray-700 mt-2">
        {visibleTasks.map((t) => (
          <li key={t.id} className="py-3 flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => markDone(t)}
                  className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs ${
                    t.status === "done"
                      ? "bg-green-500 text-white"
                      : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  }`}
                  title={t.status === "done" ? "Mark pending" : "Mark done"}
                >
                  ✓
                </button>
                <div>
                  <div className={`font-medium ${t.status === "done" ? "line-through text-gray-400 dark:text-gray-500" : ""}`}>
                    {t.title}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {t.category ? `${t.category} • ` : ""}
                    {t.priority ? `Priority: ${t.priority} • ` : ""}
                    {t.duration_minutes ? `${t.duration_minutes} min • ` : ""}
                    {t.deadline ? `Due: ${new Date(t.deadline).toLocaleString()}` : ""}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDelete(t.id)}
                className="text-sm px-2 py-1 border rounded text-red-600 dark:text-red-400"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
