module.exports = [
"[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("styled-jsx/style.js", () => require("styled-jsx/style.js"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/react-dom [external] (react-dom, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react-dom", () => require("react-dom"));

module.exports = mod;
}),
"[project]/frontend/components/TaskForm.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/TaskForm.js
__turbopack_context__.s([
    "default",
    ()=>TaskForm
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/api.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$SettingsModal$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/SettingsModal.js [ssr] (ecmascript)");
;
;
;
;
function TaskForm({ userId = 1, onCreated = ()=>{} }) {
    const [title, setTitle] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [durationMinutes, setDurationMinutes] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(60);
    const [deadline, setDeadline] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [priority, setPriority] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [category, setCategory] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    let settings = null;
    try {
        settings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$SettingsModal$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useSettings"])().settings;
    } catch  {
        settings = null;
    }
    // Load default duration
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
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
        } catch  {}
    }, [
        settings
    ]);
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
        } catch  {
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
                category: category || null
            };
            const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["API_BASE"]}/api/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(payload)
            });
            const json = await safeParse(res);
            if (!res.ok) throw new Error(json.error || json.message);
            resetForm();
            onCreated(json);
        } catch (err) {
            setError(err.message);
        } finally{
            setLoading(false);
        }
    }
    // -------------------------
    // UI DESIGN — BLUE THEME
    // -------------------------
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "bg-white/10 dark:bg-gray-900/40 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                className: "text-xl font-semibold text-white mb-4 tracking-wide",
                children: "Create New Task"
            }, void 0, false, {
                fileName: "[project]/frontend/components/TaskForm.js",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                className: "text-blue-200 text-sm",
                                children: "Task Title"
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/TaskForm.js",
                                lineNumber: 111,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                value: title,
                                onChange: (e)=>setTitle(e.target.value),
                                placeholder: "What do you need to do?",
                                className: "mt-1 w-full p-2 bg-white/10 text-white placeholder-gray-300 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/TaskForm.js",
                                lineNumber: 112,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/components/TaskForm.js",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                        className: "text-blue-200 text-sm",
                                        children: "Duration (minutes)"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/TaskForm.js",
                                        lineNumber: 123,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        min: 5,
                                        value: durationMinutes,
                                        onChange: (e)=>setDurationMinutes(e.target.value),
                                        className: "mt-1 w-full p-2 bg-white/10 text-white border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/TaskForm.js",
                                        lineNumber: 124,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/TaskForm.js",
                                lineNumber: 122,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                        className: "text-blue-200 text-sm",
                                        children: "Priority"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/TaskForm.js",
                                        lineNumber: 134,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                        value: priority,
                                        onChange: (e)=>setPriority(e.target.value),
                                        className: "mt-1 w-full p-2 bg-white/10 text-white border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                value: "",
                                                className: "text-black",
                                                children: "None"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/TaskForm.js",
                                                lineNumber: 140,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                value: "high",
                                                className: "text-black",
                                                children: "High"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/TaskForm.js",
                                                lineNumber: 141,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                value: "medium",
                                                className: "text-black",
                                                children: "Medium"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/TaskForm.js",
                                                lineNumber: 142,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                value: "low",
                                                className: "text-black",
                                                children: "Low"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/TaskForm.js",
                                                lineNumber: 143,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/components/TaskForm.js",
                                        lineNumber: 135,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/TaskForm.js",
                                lineNumber: 133,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/components/TaskForm.js",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                className: "text-blue-200 text-sm",
                                children: "Deadline (optional)"
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/TaskForm.js",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                type: "datetime-local",
                                value: deadline,
                                onChange: (e)=>setDeadline(e.target.value),
                                className: "mt-1 w-full p-2 bg-white/10 text-white border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/TaskForm.js",
                                lineNumber: 151,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/components/TaskForm.js",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                className: "text-blue-200 text-sm",
                                children: "Category"
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/TaskForm.js",
                                lineNumber: 161,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                value: category,
                                onChange: (e)=>setCategory(e.target.value),
                                placeholder: "e.g., Study, Exercise",
                                className: "mt-1 w-full p-2 bg-white/10 text-white placeholder-gray-300 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/TaskForm.js",
                                lineNumber: 162,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/components/TaskForm.js",
                        lineNumber: 160,
                        columnNumber: 9
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "text-red-300 bg-red-500/20 border border-red-400/20 p-2 rounded-lg text-sm",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/TaskForm.js",
                        lineNumber: 172,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "flex gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: loading,
                                className: "px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg shadow hover:shadow-blue-500/30 text-white font-medium disabled:opacity-50",
                                children: loading ? "Saving..." : "Save Task"
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/TaskForm.js",
                                lineNumber: 179,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: resetForm,
                                className: "px-4 py-2 border border-white/20 text-white rounded-lg hover:bg-white/10",
                                children: "Reset"
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/TaskForm.js",
                                lineNumber: 187,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/components/TaskForm.js",
                        lineNumber: 178,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/TaskForm.js",
                lineNumber: 107,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/components/TaskForm.js",
        lineNumber: 100,
        columnNumber: 5
    }, this);
}
}),
"[project]/frontend/components/TasksList.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/TasksList.js
__turbopack_context__.s([
    "default",
    ()=>TasksList
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/api.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$SettingsModal$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/SettingsModal.js [ssr] (ecmascript)");
;
;
;
;
function TasksList({ userId = 1, refreshKey = 0 }) {
    const [tasks, setTasks] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    let settings = null;
    try {
        settings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$SettingsModal$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useSettings"])().settings;
    } catch  {
        settings = null;
    }
    async function safeJSON(res) {
        const text = await res.text();
        try {
            return text ? JSON.parse(text) : {};
        } catch  {
            return {};
        }
    }
    async function fetchTasks() {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["API_BASE"]}/api/tasks/user/${userId}`);
            const json = await safeJSON(res);
            if (!res.ok) throw new Error(json.error || json.message);
            setTasks(json || []);
        } catch (err) {
            setError(err.message);
            setTasks([]);
        } finally{
            setLoading(false);
        }
    }
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        fetchTasks();
    }, [
        userId,
        refreshKey
    ]);
    async function handleDelete(id) {
        if (!confirm("Delete this task?")) return;
        try {
            const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["API_BASE"]}/api/tasks/${id}`, {
                method: "DELETE",
                credentials: "include"
            });
            if (!res.ok) {
                const body = await safeJSON(res);
                throw new Error(body.error || "Delete failed");
            }
            setTasks((t)=>t.filter((x)=>x.id !== id));
        } catch (err) {
            alert(err.message);
        }
    }
    async function markDone(task) {
        try {
            const newStatus = task.status === "done" ? "pending" : "done";
            const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["API_BASE"]}/api/tasks/${task.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    status: newStatus
                })
            });
            const json = await safeJSON(res);
            if (!res.ok) throw new Error(json.error || "Update failed");
            setTasks((arr)=>arr.map((t)=>t.id === task.id ? json : t));
        } catch (err) {
            alert(err.message);
        }
    }
    const hideCompleted = settings?.hideCompletedTasks;
    const visibleTasks = hideCompleted ? tasks.filter((t)=>t.status !== "done") : tasks;
    // ---------------------------
    // BLUE PROFESSIONAL UI
    // ---------------------------
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "bg-white/10 dark:bg-gray-900/40 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                className: "text-xl font-semibold text-white mb-4 tracking-wide",
                children: "Your Tasks"
            }, void 0, false, {
                fileName: "[project]/frontend/components/TasksList.js",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "text-blue-300 text-sm",
                children: "Loading tasks..."
            }, void 0, false, {
                fileName: "[project]/frontend/components/TasksList.js",
                lineNumber: 106,
                columnNumber: 9
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "text-red-300 bg-red-500/20 p-2 rounded text-sm border border-red-400/20",
                children: error
            }, void 0, false, {
                fileName: "[project]/frontend/components/TasksList.js",
                lineNumber: 110,
                columnNumber: 9
            }, this),
            !loading && visibleTasks.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "text-blue-200/70 text-sm",
                children: "No tasks yet"
            }, void 0, false, {
                fileName: "[project]/frontend/components/TasksList.js",
                lineNumber: 116,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                className: "mt-3 space-y-3",
                children: visibleTasks.map((t)=>{
                    const isDone = t.status === "done";
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                        className: "   p-4 rounded-lg border border-white/10    bg-white-5 dark:bg-gray-900/50    hover:bg-white-10 hover:border-blue-400-30    transition-all shadow    flex justify-between items-start gap-3   ",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex items-start gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: ()=>markDone(t),
                                        title: isDone ? "Mark as pending" : "Mark as done",
                                        className: `
                    w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold
                    border transition-all shadow 
                    ${isDone ? "bg-green-500 border-green-400 text-white hover:bg-green-600" : "bg-white/10 dark:bg-gray-800 border-white/20 text-blue-300 hover:border-blue-400 hover:text-blue-200"}
                  `,
                                        children: "✓"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/components/TasksList.js",
                                        lineNumber: 138,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: `font-semibold text-white ${isDone ? "line-through text-gray-400" : ""}`,
                                                children: t.title
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/components/TasksList.js",
                                                lineNumber: 154,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-blue-200/70 mt-1",
                                                children: [
                                                    t.category && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            t.category,
                                                            " • "
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend/components/TasksList.js",
                                                        lineNumber: 163,
                                                        columnNumber: 36
                                                    }, this),
                                                    t.priority && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: "capitalize",
                                                        children: [
                                                            "Priority: ",
                                                            t.priority,
                                                            " • "
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend/components/TasksList.js",
                                                        lineNumber: 165,
                                                        columnNumber: 23
                                                    }, this),
                                                    t.duration_minutes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            t.duration_minutes,
                                                            " min • "
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend/components/TasksList.js",
                                                        lineNumber: 168,
                                                        columnNumber: 23
                                                    }, this),
                                                    t.deadline && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "Due: ",
                                                            new Date(t.deadline).toLocaleString()
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend/components/TasksList.js",
                                                        lineNumber: 171,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/components/TasksList.js",
                                                lineNumber: 162,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/components/TasksList.js",
                                        lineNumber: 153,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/TasksList.js",
                                lineNumber: 135,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleDelete(t.id),
                                className: "   px-3 py-1 rounded-lg border text-red-300 border-red-400/40    hover:bg-red-500/20 transition text-sm   ",
                                children: "Delete"
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/TasksList.js",
                                lineNumber: 178,
                                columnNumber: 15
                            }, this)
                        ]
                    }, t.id, true, {
                        fileName: "[project]/frontend/components/TasksList.js",
                        lineNumber: 124,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/frontend/components/TasksList.js",
                lineNumber: 119,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/components/TasksList.js",
        lineNumber: 99,
        columnNumber: 5
    }, this);
}
}),
"[project]/frontend/components/MiniBarChart.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/MiniBarChart.js
__turbopack_context__.s([
    "default",
    ()=>MiniBarChart
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$SettingsModal$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/SettingsModal.js [ssr] (ecmascript)");
;
;
;
function MiniBarChart({ data = {} }) {
    // 1. Access settings safely
    let settings = null;
    try {
        const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$SettingsModal$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useSettings"])();
        settings = ctx.settings;
    } catch  {}
    // 2. Prepare chart data
    const labels = Object.keys(data).sort();
    const values = labels.map((k)=>Number(data[k] || 0));
    const max = Math.max(...values, 1);
    // 3. Theme colors
    const barColor = settings?.theme === "dark" ? "bg-blue-400 hover:bg-blue-300" : "bg-blue-600 hover:bg-blue-500";
    const placeholderColor = settings?.theme === "dark" ? "bg-slate-700" : "bg-slate-200";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "w-full h-24 flex items-end gap-1",
        children: [
            labels.length === 0 && Array.from({
                length: 7
            }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "flex-1 h-full flex items-end",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: `${placeholderColor} w-full rounded-md transition-all`,
                        style: {
                            height: `${(i + 2) * 10}%`
                        }
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/MiniBarChart.js",
                        lineNumber: 39,
                        columnNumber: 13
                    }, this)
                }, i, false, {
                    fileName: "[project]/frontend/components/MiniBarChart.js",
                    lineNumber: 38,
                    columnNumber: 11
                }, this)),
            labels.map((label, idx)=>{
                const v = values[idx];
                const heightPct = v / max * 100;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "flex-1 h-full flex items-end",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        title: `${label}: ${v}`,
                        className: `${barColor} w-full rounded-md shadow-sm transition-all duration-300`,
                        style: {
                            height: `${heightPct}%`
                        }
                    }, void 0, false, {
                        fileName: "[project]/frontend/components/MiniBarChart.js",
                        lineNumber: 53,
                        columnNumber: 13
                    }, this)
                }, label, false, {
                    fileName: "[project]/frontend/components/MiniBarChart.js",
                    lineNumber: 52,
                    columnNumber: 11
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/components/MiniBarChart.js",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
}),
"[externals]/jsonwebtoken [external] (jsonwebtoken, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("jsonwebtoken", () => require("jsonwebtoken"));

module.exports = mod;
}),
"[externals]/cookie [external] (cookie, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("cookie", () => require("cookie"));

module.exports = mod;
}),
"[project]/frontend/pages/index.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// pages/index.js
__turbopack_context__.s([
    "default",
    ()=>Dashboard,
    "getServerSideProps",
    ()=>getServerSideProps
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$SettingsModal$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/SettingsModal.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$TaskForm$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/TaskForm.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$TasksList$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/TasksList.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$MiniBarChart$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/MiniBarChart.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/api.js [ssr] (ecmascript)");
// ================ Server-side auth protection ================
var __TURBOPACK__imported__module__$5b$externals$5d2f$jsonwebtoken__$5b$external$5d$__$28$jsonwebtoken$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/jsonwebtoken [external] (jsonwebtoken, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$cookie__$5b$external$5d$__$28$cookie$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/cookie [external] (cookie, cjs)");
;
;
;
;
;
;
;
;
;
;
function Dashboard({ currentUser }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const userId = currentUser?.id || 1;
    // open/close settings modal (local UI state)
    const [settingsOpen, setSettingsOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // get global settings (from SettingsProvider)
    let settings = null;
    try {
        const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$SettingsModal$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useSettings"])();
        settings = ctx.settings;
    } catch (e) {
        settings = {
            theme: 'dark',
            defaultDuration: 60
        };
    }
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!settings) return;
        const theme = settings.theme || 'system';
        if (theme === 'dark') document.documentElement.classList.add('dark');
        else if (theme === 'light') document.documentElement.classList.remove('dark');
        else {
            const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.classList.toggle('dark', isDark);
        }
    }, [
        settings?.theme
    ]);
    const [refreshKey, setRefreshKey] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    // recommendations
    const [recs, setRecs] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [hourly, setHourly] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(new Array(24).fill(0));
    const [avgSleepHours, setAvgSleepHours] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [loadingRecs, setLoadingRecs] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // analytics
    const [dailyMap, setDailyMap] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({});
    const [loadingAnalytics, setLoadingAnalytics] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // notifications
    const [notifications, setNotifications] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [showNotifs, setShowNotifs] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    async function safeJSON(res) {
        const text = await res.text();
        try {
            return text ? JSON.parse(text) : {};
        } catch (err) {
            console.warn('Non-JSON from server:', text.slice(0, 500));
            return {};
        }
    }
    function HeaderButton({ label, onClick, danger = false }) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
            onClick: onClick,
            className: `px-3 py-1.5 rounded-md border text-sm transition
        ${danger ? 'border-red-500/40 text-red-400 hover:bg-red-500/10' : 'border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10'}`,
            children: label
        }, void 0, false, {
            fileName: "[project]/frontend/pages/index.js",
            lineNumber: 63,
            columnNumber: 5
        }, this);
    }
    function GlassCard({ children, className = '' }) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: `rounded-2xl p-6 bg-white/5 backdrop-blur-xl border border-white/10 ${className}`,
            children: children
        }, void 0, false, {
            fileName: "[project]/frontend/pages/index.js",
            lineNumber: 79,
            columnNumber: 5
        }, this);
    }
    async function loadRecs() {
        setLoadingRecs(true);
        try {
            const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["API_BASE"]}/api/ai/recommendations/${userId}`);
            const json = await safeJSON(res);
            setRecs(json.recommendations || json.recs || []);
            setHourly(json.hourly || new Array(24).fill(0));
            setAvgSleepHours(json.avgSleepHours ?? null);
        } catch (err) {
            console.error('loadRecs error', err);
        } finally{
            setLoadingRecs(false);
        }
    }
    async function loadAnalytics() {
        setLoadingAnalytics(true);
        try {
            const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["API_BASE"]}/api/analytics/daily/${userId}?days=14`);
            const json = await safeJSON(res);
            setDailyMap(json || {});
        } catch (err) {
            console.error('loadAnalytics error', err);
        } finally{
            setLoadingAnalytics(false);
        }
    }
    async function loadNotifications() {
        try {
            const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["API_BASE"]}/api/notifications?user_id=${userId}`);
            const json = await safeJSON(res);
            if (Array.isArray(json)) setNotifications(json);
            else setNotifications(json.rows || []);
        } catch (err) {
            console.error('loadNotifications error', err);
            setNotifications([]);
        }
    }
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        loadRecs();
        loadAnalytics();
        loadNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        refreshKey
    ]);
    async function runScheduler() {
        try {
            const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["API_BASE"]}/api/schedule/run/${userId}`, {
                method: 'POST'
            });
            const json = await safeJSON(res);
            alert(`Auto-scheduled ${json.scheduledCount || 0} tasks`);
            setRefreshKey((k)=>k + 1);
        } catch (err) {
            console.error('runScheduler error', err);
            alert('Scheduler failed');
        }
    }
    const handleTaskCreated = ()=>setRefreshKey((k)=>k + 1);
    function toggleNotifs() {
        setShowNotifs((v)=>!v);
        if (!showNotifs) loadNotifications();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                    children: "Student Routine Optimizer"
                }, void 0, false, {
                    fileName: "[project]/frontend/pages/index.js",
                    lineNumber: 142,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/pages/index.js",
                lineNumber: 141,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$SettingsModal$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                open: settingsOpen,
                onClose: ()=>setSettingsOpen(false)
            }, void 0, false, {
                fileName: "[project]/frontend/pages/index.js",
                lineNumber: 145,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "jsx-633215b4c75ad86c" + " " + "min-h-screen bg-[#05060f] text-slate-100",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
                        className: "jsx-633215b4c75ad86c" + " " + "sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-cyan-500/20",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "jsx-633215b4c75ad86c" + " " + "max-w-7xl mx-auto flex items-center justify-between px-6 py-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "jsx-633215b4c75ad86c" + " " + "flex items-center gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                            src: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["HERO_IMAGE_BACKEND"],
                                            className: "jsx-633215b4c75ad86c" + " " + "w-12 h-12 rounded-xl shadow-glow"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/pages/index.js",
                                            lineNumber: 153,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "jsx-633215b4c75ad86c",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                                    className: "jsx-633215b4c75ad86c" + " " + "text-xl font-bold text-cyan-300",
                                                    children: "AI Routine Optimizer"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/pages/index.js",
                                                    lineNumber: 155,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: "jsx-633215b4c75ad86c" + " " + "text-xs text-slate-400",
                                                    children: "Plan smarter. Study better."
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/pages/index.js",
                                                    lineNumber: 156,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/pages/index.js",
                                            lineNumber: 154,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/pages/index.js",
                                    lineNumber: 152,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "jsx-633215b4c75ad86c" + " " + "flex gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(HeaderButton, {
                                            onClick: toggleNotifs,
                                            label: "Notifications",
                                            className: "jsx-633215b4c75ad86c"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/pages/index.js",
                                            lineNumber: 161,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(HeaderButton, {
                                            onClick: ()=>setSettingsOpen(true),
                                            label: "Settings",
                                            className: "jsx-633215b4c75ad86c"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/pages/index.js",
                                            lineNumber: 162,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(HeaderButton, {
                                            danger: true,
                                            onClick: ()=>router.push('/logout'),
                                            label: "Logout",
                                            className: "jsx-633215b4c75ad86c"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/pages/index.js",
                                            lineNumber: 163,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/pages/index.js",
                                    lineNumber: 160,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/pages/index.js",
                            lineNumber: 151,
                            columnNumber: 9
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/pages/index.js",
                        lineNumber: 150,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                        className: "jsx-633215b4c75ad86c" + " " + "max-w-7xl mx-auto px-6 py-10 space-y-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                                className: "jsx-633215b4c75ad86c" + " " + "grid md:grid-cols-3 gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(GlassCard, {
                                        className: "jsx-633215b4c75ad86c" + " " + "md:col-span-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                                className: "jsx-633215b4c75ad86c" + " " + "section-title",
                                                children: "AI Insights"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/pages/index.js",
                                                lineNumber: 174,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-633215b4c75ad86c" + " " + "grid sm:grid-cols-2 gap-4 mt-4",
                                                children: recs.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: "jsx-633215b4c75ad86c" + " " + "text-slate-400 text-sm",
                                                    children: "No insights yet"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/pages/index.js",
                                                    lineNumber: 178,
                                                    columnNumber: 17
                                                }, this) : recs.map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "jsx-633215b4c75ad86c" + " " + "insight-card",
                                                        children: r
                                                    }, i, false, {
                                                        fileName: "[project]/frontend/pages/index.js",
                                                        lineNumber: 181,
                                                        columnNumber: 19
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/pages/index.js",
                                                lineNumber: 176,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-633215b4c75ad86c" + " " + "mt-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(MiniChart, {
                                                        hourly: hourly
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/pages/index.js",
                                                        lineNumber: 187,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        className: "jsx-633215b4c75ad86c" + " " + "text-xs mt-2 text-slate-400",
                                                        children: [
                                                            "Avg Sleep: ",
                                                            avgSleepHours ? `${avgSleepHours.toFixed(1)} hrs` : '--'
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend/pages/index.js",
                                                        lineNumber: 188,
                                                        columnNumber: 15
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/pages/index.js",
                                                lineNumber: 186,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/pages/index.js",
                                        lineNumber: 173,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(GlassCard, {
                                        className: "jsx-633215b4c75ad86c",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                                className: "jsx-633215b4c75ad86c" + " " + "section-title",
                                                children: "Quick Actions"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/pages/index.js",
                                                lineNumber: 195,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: runScheduler,
                                                className: "jsx-633215b4c75ad86c" + " " + "action-btn",
                                                children: "Auto-schedule tasks"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/pages/index.js",
                                                lineNumber: 196,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: loadRecs,
                                                className: "jsx-633215b4c75ad86c" + " " + "action-btn",
                                                children: "Refresh insights"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/pages/index.js",
                                                lineNumber: 197,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                className: "jsx-633215b4c75ad86c" + " " + "action-btn disabled",
                                                children: "Export (soon)"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/pages/index.js",
                                                lineNumber: 198,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/pages/index.js",
                                        lineNumber: 194,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/pages/index.js",
                                lineNumber: 172,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                                className: "jsx-633215b4c75ad86c" + " " + "grid md:grid-cols-2 gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(GlassCard, {
                                        className: "jsx-633215b4c75ad86c",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                                className: "jsx-633215b4c75ad86c" + " " + "section-title",
                                                children: "Create Task"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/pages/index.js",
                                                lineNumber: 205,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$TaskForm$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                userId: userId,
                                                onCreated: handleTaskCreated
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/pages/index.js",
                                                lineNumber: 206,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/pages/index.js",
                                        lineNumber: 204,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(GlassCard, {
                                        className: "jsx-633215b4c75ad86c",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                                className: "jsx-633215b4c75ad86c" + " " + "section-title",
                                                children: "Your Tasks"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/pages/index.js",
                                                lineNumber: 210,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$TasksList$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                userId: userId,
                                                refreshKey: refreshKey
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/pages/index.js",
                                                lineNumber: 211,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/pages/index.js",
                                        lineNumber: 209,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/pages/index.js",
                                lineNumber: 203,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                                className: "jsx-633215b4c75ad86c" + " " + "grid md:grid-cols-3 gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(GlassCard, {
                                        className: "jsx-633215b4c75ad86c" + " " + "md:col-span-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                                className: "jsx-633215b4c75ad86c" + " " + "section-title",
                                                children: "Weekly Activity"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/pages/index.js",
                                                lineNumber: 218,
                                                columnNumber: 13
                                            }, this),
                                            loadingAnalytics ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "jsx-633215b4c75ad86c" + " " + "text-sm text-slate-400",
                                                children: "Loading…"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/pages/index.js",
                                                lineNumber: 220,
                                                columnNumber: 15
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$MiniBarChart$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                data: dailyMap
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/pages/index.js",
                                                lineNumber: 222,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/pages/index.js",
                                        lineNumber: 217,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(GlassCard, {
                                        className: "jsx-633215b4c75ad86c",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                                className: "jsx-633215b4c75ad86c" + " " + "section-title",
                                                children: "Study Tips"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/pages/index.js",
                                                lineNumber: 227,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                                                className: "jsx-633215b4c75ad86c" + " " + "space-y-2 text-sm text-slate-300",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                        className: "jsx-633215b4c75ad86c",
                                                        children: "• Add deadlines for better AI planning"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/pages/index.js",
                                                        lineNumber: 229,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                        className: "jsx-633215b4c75ad86c",
                                                        children: "• Track sessions for accurate insights"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/pages/index.js",
                                                        lineNumber: 230,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                        className: "jsx-633215b4c75ad86c",
                                                        children: "• Sleep data improves recommendations"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/pages/index.js",
                                                        lineNumber: 231,
                                                        columnNumber: 15
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/pages/index.js",
                                                lineNumber: 228,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/pages/index.js",
                                        lineNumber: 226,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/pages/index.js",
                                lineNumber: 216,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/pages/index.js",
                        lineNumber: 169,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("footer", {
                        className: "jsx-633215b4c75ad86c" + " " + "text-center text-xs text-slate-500 py-6",
                        children: "Built with Next.js • Tailwind • AI Engine"
                    }, void 0, false, {
                        fileName: "[project]/frontend/pages/index.js",
                        lineNumber: 237,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__["default"], {
                        id: "633215b4c75ad86c",
                        children: ".section-title.jsx-633215b4c75ad86c{color:#7dd3fc;margin-bottom:.75rem;font-size:1.1rem;font-weight:600}.shadow-glow.jsx-633215b4c75ad86c{box-shadow:0 0 25px #38bdf859}.insight-card.jsx-633215b4c75ad86c{background:linear-gradient(135deg,#0b1220,#070b16);border:1px solid #7c3aed4d;border-radius:.75rem;padding:.75rem;font-size:.85rem}.action-btn.jsx-633215b4c75ad86c{text-align:left;background:#0f172a99;border:1px solid #38bdf840;border-radius:.6rem;width:100%;margin-top:.5rem;padding:.6rem}.action-btn.jsx-633215b4c75ad86c:hover{background:#38bdf814}.disabled.jsx-633215b4c75ad86c{opacity:.4;pointer-events:none}"
                    }, void 0, false, void 0, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/pages/index.js",
                lineNumber: 147,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true);
}
;
;
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";
async function getServerSideProps(context) {
    const { req } = context;
    const cookies = req.headers.cookie ? __TURBOPACK__imported__module__$5b$externals$5d2f$cookie__$5b$external$5d$__$28$cookie$2c$__cjs$29$__["default"].parse(req.headers.cookie) : {};
    const token = cookies.token;
    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        };
    }
    try {
        const payload = __TURBOPACK__imported__module__$5b$externals$5d2f$jsonwebtoken__$5b$external$5d$__$28$jsonwebtoken$2c$__cjs$29$__["default"].verify(token, JWT_SECRET);
        return {
            props: {
                currentUser: {
                    id: payload.id,
                    email: payload.email
                }
            }
        };
    } catch (err) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        };
    }
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__571d033c._.js.map