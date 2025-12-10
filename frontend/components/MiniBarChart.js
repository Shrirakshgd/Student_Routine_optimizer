// components/MiniBarChart.js
import React from "react";
import { useSettings } from "./SettingsModal";

/**
 * Props:
 *  - data: { "YYYY-MM-DD": number }
 */
export default function MiniBarChart({ data = {} }) {
  // 1. Access settings safely
  let settings = null;
  try {
    const ctx = useSettings();
    settings = ctx.settings;
  } catch {}

  // 2. Prepare chart data
  const labels = Object.keys(data).sort();
  const values = labels.map((k) => Number(data[k] || 0));
  const max = Math.max(...values, 1);

  // 3. Theme colors
  const barColor =
    settings?.theme === "dark"
      ? "bg-blue-400 hover:bg-blue-300"
      : "bg-blue-600 hover:bg-blue-500";

  const placeholderColor =
    settings?.theme === "dark"
      ? "bg-slate-700"
      : "bg-slate-200";

  return (
    <div className="w-full h-24 flex items-end gap-1">
      {/* If no data, show placeholder bars */}
      {labels.length === 0 &&
        Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex-1 h-full flex items-end">
            <div
              className={`${placeholderColor} w-full rounded-md transition-all`}
              style={{ height: `${(i + 2) * 10}%` }}
            />
          </div>
        ))}

      {/* Actual bars */}
      {labels.map((label, idx) => {
        const v = values[idx];
        const heightPct = (v / max) * 100;

        return (
          <div key={label} className="flex-1 h-full flex items-end">
            <div
              title={`${label}: ${v}`}
              className={`${barColor} w-full rounded-md shadow-sm transition-all duration-300`}
              style={{ height: `${heightPct}%` }}
            />
          </div>
        );
      })}
    </div>
  );
}
