// components/MiniBarChart.js
import React from "react";
import { useSettings } from "./SettingsModal";

/**
 * Props:
 *  - data: object mapping YYYY-MM-DD -> number (minutes)
 */
export default function MiniBarChart({ data = {} }) {
  // read settings (graceful)
  let settings = null;
  try {
    const ctx = useSettings();
    settings = ctx.settings;
  } catch (e) {
    settings = null;
  }

  // convert data to ordered array (last 7 days)
  const labels = Object.keys(data).sort();
  const values = labels.map((k) => Number(data[k] || 0));
  const max = Math.max(...values, 1);

  // color adjustments based on theme/settings
  const barBaseClass = settings && settings.theme === "dark" ? "bg-indigo-500" : "bg-indigo-300";

  return (
    <div className="w-full h-24 flex items-end gap-1">
      {labels.length === 0 && (
        // show placeholder columns if no data
        Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex-1 h-full flex items-end">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-sm" style={{ height: `${(i + 1) * 8}%` }} />
          </div>
        ))
      )}

      {labels.map((l, idx) => {
        const v = values[idx];
        const heightPct = (v / max) * 100;
        return (
          <div key={l} className="flex-1 h-full flex items-end">
            <div
              title={`${l}: ${v.toFixed ? v.toFixed(0) : v}`}
              className={`${barBaseClass} rounded-sm w-full`}
              style={{ height: `${heightPct}%` }}
            />
          </div>
        );
      })}
    </div>
  );
}
