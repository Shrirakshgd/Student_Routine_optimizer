// components/TasksList.js
import { useEffect, useState } from "react";
import { API_BASE } from "./api";
import { useSettings } from "./SettingsModal";

export default function TasksList({ userId = 1, refreshKey = 0 }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  let settings = null;
  try {
    settings = useSettings().settings;
  } catch {
    settings = null;
  }

  async function safeJSON(res) {
    const text = await res.text();
    try {
      return text ? JSON.parse(text) : {};
    } catch {
      return {};
    }
  }

  async function fetchTasks() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/api/tasks/user/${userId}`);
      const json = await safeJSON(res);

      if (!res.ok) throw new Error(json.error || json.message);
      setTasks(json || []);
    } catch (err) {
      setError(err.message);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, [userId, refreshKey]);

  async function handleDelete(id) {
    if (!confirm("Delete this task?")) return;

    try {
      const res = await fetch(`${API_BASE}/api/tasks/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const body = await safeJSON(res);
        throw new Error(body.error || "Delete failed");
      }

      setTasks((t) => t.filter((x) => x.id !== id));
    } catch (err) {
      alert(err.message);
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
      alert(err.message);
    }
  }

  const hideCompleted = settings?.hideCompletedTasks;
  const visibleTasks = hideCompleted
    ? tasks.filter((t) => t.status !== "done")
    : tasks;

  // ---------------------------
  // BLUE PROFESSIONAL UI
  // ---------------------------

  return (
    <div className="bg-white/10 dark:bg-gray-900/40 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-lg">
      
      <h4 className="text-xl font-semibold text-white mb-4 tracking-wide">
        Your Tasks
      </h4>

      {loading && (
        <div className="text-blue-300 text-sm">Loading tasks...</div>
      )}

      {error && (
        <div className="text-red-300 bg-red-500/20 p-2 rounded text-sm border border-red-400/20">
          {error}
        </div>
      )}

      {!loading && visibleTasks.length === 0 && (
        <div className="text-blue-200/70 text-sm">No tasks yet</div>
      )}

      <ul className="mt-3 space-y-3">
        {visibleTasks.map((t) => {
          const isDone = t.status === "done";

          return (
            <li
              key={t.id}
              className="
                p-4 rounded-lg border border-white/10 
                bg-white-5 dark:bg-gray-900/50 
                hover:bg-white-10 hover:border-blue-400-30 
                transition-all shadow 
                flex justify-between items-start gap-3
              "
            >
              {/* Left side: Title + Meta */}
              <div className="flex items-start gap-3">

                {/* Status Toggle Button */}
                <button
                  onClick={() => markDone(t)}
                  title={isDone ? "Mark as pending" : "Mark as done"}
                  className={`
                    w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold
                    border transition-all shadow 
                    ${isDone 
                      ? "bg-green-500 border-green-400 text-white hover:bg-green-600"
                      : "bg-white/10 dark:bg-gray-800 border-white/20 text-blue-300 hover:border-blue-400 hover:text-blue-200"}
                  `}
                >
                  ✓
                </button>

                {/* Text content */}
                <div>
                  <div
                    className={`font-semibold text-white ${
                      isDone ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {t.title}
                  </div>

                  <div className="text-xs text-blue-200/70 mt-1">
                    {t.category && <span>{t.category} • </span>}
                    {t.priority && (
                      <span className="capitalize">Priority: {t.priority} • </span>
                    )}
                    {t.duration_minutes && (
                      <span>{t.duration_minutes} min • </span>
                    )}
                    {t.deadline && (
                      <span>Due: {new Date(t.deadline).toLocaleString()}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(t.id)}
                className="
                  px-3 py-1 rounded-lg border text-red-300 border-red-400/40 
                  hover:bg-red-500/20 transition text-sm
                "
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
