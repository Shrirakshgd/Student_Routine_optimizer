module.exports = [
"[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react/jsx-dev-runtime", () => require("react/jsx-dev-runtime"));

module.exports = mod;
}),
"[externals]/react [external] (react, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react", () => require("react"));

module.exports = mod;
}),
"[project]/frontend/components/api.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "API_BASE",
    ()=>API_BASE,
    "HERO_IMAGE_BACKEND",
    ()=>HERO_IMAGE_BACKEND,
    "SETTINGS_IMAGE",
    ()=>SETTINGS_IMAGE
]);
const API_BASE = 'http://localhost:4000';
const HERO_IMAGE_BACKEND = 'http://localhost:4000/static/hero.jpg';
const SETTINGS_IMAGE = `http://localhost:4000/static/settings.jpg`;
}),
"[project]/frontend/components/SettingsModal.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/SettingsModal.jsx
__turbopack_context__.s([
    "SettingsProvider",
    ()=>SettingsProvider,
    "default",
    ()=>SettingsModal,
    "useSettings",
    ()=>useSettings
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/api.js [ssr] (ecmascript)");
;
;
;
const STORAGE_KEY = "app_settings";
const defaultSettings = {
    theme: "light",
    defaultDuration: 60,
    notifications: {
        enabled: false,
        desktop: false,
        sound: false,
        reminderMinutesBefore: 10
    },
    focus: {
        enabled: false,
        sessionMinutes: 25,
        breakMinutes: 5,
        autoStartNext: false
    },
    preferredStudy: {
        startHour: 18,
        endHour: 21
    },
    autoschedule: {
        enabled: false,
        strategy: "deadline"
    },
    reminders: {
        dailySummary: false
    },
    language: "en",
    hideCompletedTasks: false
};
const SettingsContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["createContext"])();
function SettingsProvider({ children }) {
    const [settings, setSettings] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(defaultSettings);
    const [loaded, setLoaded] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // Load settings
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) setSettings((s)=>({
                    ...s,
                    ...JSON.parse(raw)
                }));
        } catch  {}
        setLoaded(true);
    }, []);
    // Save settings
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!loaded) return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }, [
        settings,
        loaded
    ]);
    // Apply theme
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const root = document.documentElement;
        const theme = settings.theme;
        if (theme === "system") {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            root.classList.toggle("dark", prefersDark);
        } else {
            root.classList.toggle("dark", theme === "dark");
        }
    }, [
        settings.theme
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(SettingsContext.Provider, {
        value: {
            settings,
            setSettings
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/frontend/components/SettingsModal.js",
        lineNumber: 71,
        columnNumber: 5
    }, this);
}
function useSettings() {
    const ctx = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useContext"])(SettingsContext);
    if (!ctx) throw new Error("useSettings must be inside SettingsProvider");
    return ctx;
}
function Section({ title, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "bg-white/10 dark:bg-gray-900/40 backdrop-blur-sm p-4 rounded-lg border border-white/10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                className: "font-semibold mb-3 text-white",
                children: title
            }, void 0, false, {
                fileName: "[project]/frontend/components/SettingsModal.js",
                lineNumber: 86,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/components/SettingsModal.js",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
function Row({ label, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "mb-4",
        children: [
            label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "text-sm text-blue-200 mb-1",
                children: label
            }, void 0, false, {
                fileName: "[project]/frontend/components/SettingsModal.js",
                lineNumber: 95,
                columnNumber: 17
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/components/SettingsModal.js",
        lineNumber: 94,
        columnNumber: 5
    }, this);
}
function SettingsModal({ open, onClose }) {
    const { settings, setSettings } = useSettings();
    const [local, setLocal] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(settings);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>setLocal(settings), [
        open,
        settings
    ]);
    const update = (path, value)=>{
        setLocal((draft)=>{
            const copy = structuredClone(draft);
            const keys = path.split(".");
            let ref = copy;
            for(let i = 0; i < keys.length - 1; i++)ref = ref[keys[i]];
            ref[keys.at(-1)] = value;
            return copy;
        });
    };
    const save = ()=>{
        setSettings(local);
        onClose();
    };
    const reset = ()=>setLocal(defaultSettings);
    if (!open) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/50 backdrop-blur-sm",
                onClick: onClose
            }, void 0, false, {
                fileName: "[project]/frontend/components/SettingsModal.js",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "relative w-full max-w-4xl bg-gradient-to-br from-blue-950 via-slate-900 to-black text-white rounded-xl shadow-2xl p-6 mx-4 border border-white/10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                        src: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["SETTINGS_IMAGE"],
                                        className: "w-12 h-12 rounded-lg border border-blue-300 shadow"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/SettingsModal.js",
                                        lineNumber: 141,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                                className: "text-xl font-bold tracking-wide",
                                                children: "Settings"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/SettingsModal.js",
                                                lineNumber: 143,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-blue-300 opacity-80",
                                                children: "Customize Student Optimizer"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/SettingsModal.js",
                                                lineNumber: 144,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/components/SettingsModal.js",
                                        lineNumber: 142,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/SettingsModal.js",
                                lineNumber: 140,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: reset,
                                        className: "px-3 py-1 rounded-lg border border-blue-300 text-blue-300",
                                        children: "Reset"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/SettingsModal.js",
                                        lineNumber: 151,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: onClose,
                                        className: "px-3 py-1 rounded-lg border border-gray-400 text-gray-200",
                                        children: "Close"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/SettingsModal.js",
                                        lineNumber: 154,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: save,
                                        className: "px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg shadow",
                                        children: "Save"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/SettingsModal.js",
                                        lineNumber: 157,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/SettingsModal.js",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/components/SettingsModal.js",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto pr-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Section, {
                                title: "Theme",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Row, {
                                    label: "Theme mode",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                        value: local.theme,
                                        onChange: (e)=>update("theme", e.target.value),
                                        className: "w-full p-2 rounded bg-white/10 border border-white/20",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                value: "system",
                                                children: "System"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/SettingsModal.js",
                                                lineNumber: 177,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                value: "light",
                                                children: "Light"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/SettingsModal.js",
                                                lineNumber: 178,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                value: "dark",
                                                children: "Dark"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/SettingsModal.js",
                                                lineNumber: 179,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/components/SettingsModal.js",
                                        lineNumber: 172,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/frontend/components/SettingsModal.js",
                                    lineNumber: 171,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/SettingsModal.js",
                                lineNumber: 170,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Section, {
                                title: "Default Task",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Row, {
                                        label: "Default duration (minutes)",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            min: "1",
                                            value: local.defaultDuration,
                                            onChange: (e)=>update("defaultDuration", Number(e.target.value)),
                                            className: "w-full p-2 rounded bg-white/10 border border-white/20"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/SettingsModal.js",
                                            lineNumber: 187,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/SettingsModal.js",
                                        lineNumber: 186,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Row, {
                                        label: "Auto-schedule on creation",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: local.autoschedule.enabled,
                                                    onChange: (e)=>update("autoschedule.enabled", e.target.checked)
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/SettingsModal.js",
                                                    lineNumber: 198,
                                                    columnNumber: 17
                                                }, this),
                                                "Enable auto scheduling"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/components/SettingsModal.js",
                                            lineNumber: 197,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/SettingsModal.js",
                                        lineNumber: 196,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Row, {
                                        label: "Strategy",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                            value: local.autoschedule.strategy,
                                            onChange: (e)=>update("autoschedule.strategy", e.target.value),
                                            className: "w-full p-2 rounded bg-white/10 border border-white/20",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "deadline",
                                                    children: "Nearest deadline"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/SettingsModal.js",
                                                    lineNumber: 213,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "priority",
                                                    children: "By priority"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/SettingsModal.js",
                                                    lineNumber: 214,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/components/SettingsModal.js",
                                            lineNumber: 208,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/SettingsModal.js",
                                        lineNumber: 207,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/SettingsModal.js",
                                lineNumber: 185,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Section, {
                                title: "Notifications",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Row, {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: local.notifications.enabled,
                                                    onChange: (e)=>update("notifications.enabled", e.target.checked)
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/SettingsModal.js",
                                                    lineNumber: 223,
                                                    columnNumber: 17
                                                }, this),
                                                "Enable notifications"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/components/SettingsModal.js",
                                            lineNumber: 222,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/SettingsModal.js",
                                        lineNumber: 221,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Row, {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: local.notifications.desktop,
                                                    onChange: (e)=>update("notifications.desktop", e.target.checked)
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/SettingsModal.js",
                                                    lineNumber: 234,
                                                    columnNumber: 17
                                                }, this),
                                                "Desktop notifications"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/components/SettingsModal.js",
                                            lineNumber: 233,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/SettingsModal.js",
                                        lineNumber: 232,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Row, {
                                        label: "Reminder minutes before deadline",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            value: local.notifications.reminderMinutesBefore,
                                            onChange: (e)=>update("notifications.reminderMinutesBefore", Number(e.target.value)),
                                            className: "w-full p-2 rounded bg-white/10 border border-white/20"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/SettingsModal.js",
                                            lineNumber: 244,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/SettingsModal.js",
                                        lineNumber: 243,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/SettingsModal.js",
                                lineNumber: 220,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Section, {
                                title: "Focus Mode (Pomodoro)",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Row, {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: local.focus.enabled,
                                                    onChange: (e)=>update("focus.enabled", e.target.checked)
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/SettingsModal.js",
                                                    lineNumber: 262,
                                                    columnNumber: 17
                                                }, this),
                                                "Enable Focus Mode"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/components/SettingsModal.js",
                                            lineNumber: 261,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/SettingsModal.js",
                                        lineNumber: 260,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Row, {
                                        label: "Session (minutes)",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            min: "5",
                                            value: local.focus.sessionMinutes,
                                            onChange: (e)=>update("focus.sessionMinutes", Number(e.target.value)),
                                            className: "w-full p-2 rounded bg-white/10 border border-white/20"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/SettingsModal.js",
                                            lineNumber: 272,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/SettingsModal.js",
                                        lineNumber: 271,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Row, {
                                        label: "Break (minutes)",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            min: "1",
                                            value: local.focus.breakMinutes,
                                            onChange: (e)=>update("focus.breakMinutes", Number(e.target.value)),
                                            className: "w-full p-2 rounded bg-white/10 border border-white/20"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/SettingsModal.js",
                                            lineNumber: 284,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/SettingsModal.js",
                                        lineNumber: 283,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Row, {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: local.focus.autoStartNext,
                                                    onChange: (e)=>update("focus.autoStartNext", e.target.checked)
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/SettingsModal.js",
                                                    lineNumber: 297,
                                                    columnNumber: 17
                                                }, this),
                                                "Auto-start next session"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/components/SettingsModal.js",
                                            lineNumber: 296,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/SettingsModal.js",
                                        lineNumber: 295,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/SettingsModal.js",
                                lineNumber: 259,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Section, {
                                title: "Preferred Study Times",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Row, {
                                        label: "Start Hour (0–23)",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            min: "0",
                                            max: "23",
                                            value: local.preferredStudy.startHour,
                                            onChange: (e)=>update("preferredStudy.startHour", Number(e.target.value)),
                                            className: "w-full p-2 rounded bg-white/10 border border-white/20"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/SettingsModal.js",
                                            lineNumber: 310,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/SettingsModal.js",
                                        lineNumber: 309,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Row, {
                                        label: "End Hour (0–23)",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            min: "0",
                                            max: "23",
                                            value: local.preferredStudy.endHour,
                                            onChange: (e)=>update("preferredStudy.endHour", Number(e.target.value)),
                                            className: "w-full p-2 rounded bg-white/10 border border-white/20"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/SettingsModal.js",
                                            lineNumber: 323,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/SettingsModal.js",
                                        lineNumber: 322,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/SettingsModal.js",
                                lineNumber: 308,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Section, {
                                title: "Reminders & Language",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Row, {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: local.reminders.dailySummary,
                                                    onChange: (e)=>update("reminders.dailySummary", e.target.checked)
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/SettingsModal.js",
                                                    lineNumber: 340,
                                                    columnNumber: 17
                                                }, this),
                                                "Daily summary email"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/components/SettingsModal.js",
                                            lineNumber: 339,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/SettingsModal.js",
                                        lineNumber: 338,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Row, {
                                        label: "Language",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                            value: local.language,
                                            onChange: (e)=>update("language", e.target.value),
                                            className: "w-full p-2 rounded bg-white/10 border border-white/20",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "en",
                                                    children: "English"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/SettingsModal.js",
                                                    lineNumber: 357,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "hi",
                                                    children: "Hindi"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/SettingsModal.js",
                                                    lineNumber: 358,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "mr",
                                                    children: "Marathi"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/SettingsModal.js",
                                                    lineNumber: 359,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "kn",
                                                    children: "Kannada"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/SettingsModal.js",
                                                    lineNumber: 360,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "ta",
                                                    children: "Tamil"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/SettingsModal.js",
                                                    lineNumber: 361,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/components/SettingsModal.js",
                                            lineNumber: 352,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/SettingsModal.js",
                                        lineNumber: 351,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/SettingsModal.js",
                                lineNumber: 337,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Section, {
                                title: "Data & Account",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Row, {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                const blob = new Blob([
                                                    JSON.stringify({
                                                        settings: local
                                                    }, null, 2)
                                                ], {
                                                    type: "application/json"
                                                });
                                                const url = URL.createObjectURL(blob);
                                                const a = document.createElement("a");
                                                a.href = url;
                                                a.download = "student_optimizer_settings.json";
                                                a.click();
                                            },
                                            className: "px-3 py-2 bg-white/10 rounded border border-white/20 hover:bg-white/20",
                                            children: "Export settings"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/SettingsModal.js",
                                            lineNumber: 369,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/SettingsModal.js",
                                        lineNumber: 368,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Row, {
                                        label: "Import settings (JSON)",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            type: "file",
                                            accept: "application/json",
                                            className: "w-full bg-white/10 border border-white/20 p-2 rounded",
                                            onChange: (e)=>{
                                                const file = e.target.files?.[0];
                                                if (!file) return;
                                                const reader = new FileReader();
                                                reader.onload = (ev)=>{
                                                    try {
                                                        const parsed = JSON.parse(ev.target.result);
                                                        if (parsed.settings) {
                                                            setLocal(parsed.settings);
                                                            alert("Settings imported. Press Save to apply.");
                                                        } else alert("Invalid settings JSON");
                                                    } catch  {
                                                        alert("Invalid JSON file");
                                                    }
                                                };
                                                reader.readAsText(file);
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/components/SettingsModal.js",
                                            lineNumber: 388,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/SettingsModal.js",
                                        lineNumber: 387,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Row, {
                                        label: "Account actions",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "flex gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>window.location.href = "/logout",
                                                    className: "px-3 py-2 border border-white/20 rounded hover:bg-white/10",
                                                    children: "Logout"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/SettingsModal.js",
                                                    lineNumber: 414,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        if (!confirm("Clear all settings in this browser?")) return;
                                                        localStorage.removeItem(STORAGE_KEY);
                                                        setSettings(defaultSettings);
                                                        setLocal(defaultSettings);
                                                    },
                                                    className: "px-3 py-2 border border-red-400 text-red-400 rounded hover:bg-red-400/10",
                                                    children: "Clear local settings"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/components/SettingsModal.js",
                                                    lineNumber: 421,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/components/SettingsModal.js",
                                            lineNumber: 413,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/SettingsModal.js",
                                        lineNumber: 412,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/SettingsModal.js",
                                lineNumber: 367,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/components/SettingsModal.js",
                        lineNumber: 167,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/SettingsModal.js",
                lineNumber: 136,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/components/SettingsModal.js",
        lineNumber: 128,
        columnNumber: 5
    }, this);
}
}),
"[project]/frontend/pages/_app.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// pages/_app.js
__turbopack_context__.s([
    "default",
    ()=>MyApp
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$SettingsModal$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/SettingsModal.js [ssr] (ecmascript)");
;
;
;
function MyApp({ Component, pageProps }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$SettingsModal$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["SettingsProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Component, {
            ...pageProps
        }, void 0, false, {
            fileName: "[project]/frontend/pages/_app.js",
            lineNumber: 8,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/frontend/pages/_app.js",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ebe48dfc._.js.map