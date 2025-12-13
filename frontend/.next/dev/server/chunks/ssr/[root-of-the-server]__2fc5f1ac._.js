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
"[externals]/framer-motion [external] (framer-motion, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("framer-motion");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/frontend/pages/login.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// pages/login.js
__turbopack_context__.s([
    "default",
    ()=>LoginPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/framer-motion [external] (framer-motion, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/eye.js [ssr] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/eye-off.js [ssr] (ecmascript) <export default as EyeOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/api.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
function LoginPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('dark');
    const isDark = theme === 'dark';
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [showPwd, setShowPwd] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [err, setErr] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    /* SAFE JSON */ async function safeFetchJSON(res) {
        const contentType = res.headers.get('content-type') || '';
        const text = await res.text();
        if (!contentType.includes('application/json')) {
            throw new Error('Server returned invalid response');
        }
        return text ? JSON.parse(text) : {};
    }
    async function handleSubmit(e) {
        e.preventDefault();
        setErr('');
        setLoading(true);
        if (!email || !password) {
            setErr('Email and password are required');
            setLoading(false);
            return;
        }
        try {
            const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["API_BASE"]}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    email,
                    password
                })
            });
            const body = await safeFetchJSON(res);
            if (!res.ok) throw new Error(body.error || body.message);
            router.replace('/');
        } catch (e) {
            setErr(e.message);
        } finally{
            setLoading(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                    className: "jsx-b7e618f2df8fc6e5",
                    children: "Login — Student Optimizer"
                }, void 0, false, {
                    fileName: "[project]/frontend/pages/login.js",
                    lineNumber: 68,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/pages/login.js",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "jsx-b7e618f2df8fc6e5" + " " + `min-h-screen flex items-center justify-center relative overflow-hidden px-4 transition-colors duration-500 ${isDark ? 'bg-[#05060f]' : 'bg-slate-100'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-b7e618f2df8fc6e5" + " " + "absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full"
                    }, void 0, false, {
                        fileName: "[project]/frontend/pages/login.js",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-b7e618f2df8fc6e5" + " " + "absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-600/20 blur-3xl rounded-full"
                    }, void 0, false, {
                        fileName: "[project]/frontend/pages/login.js",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].button, {
                        whileTap: {
                            scale: 0.9
                        },
                        onClick: ()=>setTheme(isDark ? 'light' : 'dark'),
                        className: "absolute top-6 right-6 text-sm px-3 py-1 rounded-full border border-cyan-400/40 text-cyan-400",
                        children: isDark ? 'Light mode' : 'Dark mode'
                    }, void 0, false, {
                        fileName: "[project]/frontend/pages/login.js",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: 30,
                            scale: 0.95
                        },
                        animate: {
                            opacity: 1,
                            y: 0,
                            scale: 1
                        },
                        transition: {
                            duration: 0.6
                        },
                        className: `relative w-full max-w-md backdrop-blur-xl rounded-2xl shadow-2xl p-8 border ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-b7e618f2df8fc6e5" + " " + "flex flex-col items-center mb-8 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                        src: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["HERO_IMAGE_BACKEND"],
                                        className: "jsx-b7e618f2df8fc6e5" + " " + "w-20 h-20 rounded-xl border border-cyan-400/40 shadow-lg"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/pages/login.js",
                                        lineNumber: 102,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                        className: "jsx-b7e618f2df8fc6e5" + " " + "text-3xl font-bold mt-4 text-cyan-400",
                                        children: "Welcome Back"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/pages/login.js",
                                        lineNumber: 106,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "jsx-b7e618f2df8fc6e5" + " " + "text-sm opacity-70",
                                        children: "Log in to continue your journey"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/pages/login.js",
                                        lineNumber: 109,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/pages/login.js",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                                onSubmit: handleSubmit,
                                className: "jsx-b7e618f2df8fc6e5" + " " + "space-y-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        value: email,
                                        onChange: (e)=>setEmail(e.target.value),
                                        placeholder: "Email Address",
                                        className: "jsx-b7e618f2df8fc6e5" + " " + "input"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/pages/login.js",
                                        lineNumber: 117,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-b7e618f2df8fc6e5" + " " + "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                type: showPwd ? 'text' : 'password',
                                                value: password,
                                                onChange: (e)=>setPassword(e.target.value),
                                                placeholder: "Password",
                                                className: "jsx-b7e618f2df8fc6e5" + " " + "input pr-10"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/pages/login.js",
                                                lineNumber: 126,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setShowPwd((v)=>!v),
                                                className: "jsx-b7e618f2df8fc6e5" + " " + "absolute right-3 top-1/2 -translate-y-1/2 text-slate-400",
                                                children: showPwd ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/pages/login.js",
                                                    lineNumber: 138,
                                                    columnNumber: 28
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/pages/login.js",
                                                    lineNumber: 138,
                                                    columnNumber: 51
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/pages/login.js",
                                                lineNumber: 133,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/pages/login.js",
                                        lineNumber: 125,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["AnimatePresence"], {
                                        children: err && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                                            initial: {
                                                x: 0,
                                                opacity: 0
                                            },
                                            animate: {
                                                x: [
                                                    -6,
                                                    6,
                                                    -4,
                                                    4,
                                                    0
                                                ],
                                                opacity: 1
                                            },
                                            exit: {
                                                opacity: 0
                                            },
                                            className: "text-red-300 bg-red-500/20 border border-red-400/30 p-2 rounded-lg text-sm",
                                            children: err
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/pages/login.js",
                                            lineNumber: 145,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/pages/login.js",
                                        lineNumber: 143,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        disabled: loading,
                                        className: "jsx-b7e618f2df8fc6e5" + " " + "w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-black font-semibold",
                                        children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "jsx-b7e618f2df8fc6e5" + " " + "h-5 w-24 mx-auto rounded bg-white/30 animate-pulse"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/pages/login.js",
                                            lineNumber: 163,
                                            columnNumber: 17
                                        }, this) : 'Login'
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/pages/login.js",
                                        lineNumber: 157,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>router.push('/register'),
                                        className: "jsx-b7e618f2df8fc6e5" + " " + "w-full py-3 rounded-lg border border-cyan-400/40 text-cyan-400 hover:bg-cyan-400/10",
                                        children: "Create new account"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/pages/login.js",
                                        lineNumber: 170,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/pages/login.js",
                                lineNumber: 115,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/pages/login.js",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/pages/login.js",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__["default"], {
                id: "b7e618f2df8fc6e5",
                children: ".input.jsx-b7e618f2df8fc6e5{width:100%;color:inherit;background:#ffffff1a;border:1px solid #fff3;border-radius:.5rem;outline:none;padding:.75rem}.input.jsx-b7e618f2df8fc6e5:focus{border-color:#22d3ee}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2fc5f1ac._.js.map