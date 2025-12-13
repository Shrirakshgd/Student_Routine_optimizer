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
"[project]/frontend/pages/register.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// pages/register.js
__turbopack_context__.s([
    "default",
    ()=>RegisterPage
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
/* ================= HELPERS ================= */ function getPasswordStrength(password) {
    let score = 0;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
}
const strengthColors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-cyan-500',
    'bg-green-500'
];
const strengthText = [
    'Very weak',
    'Weak',
    'Okay',
    'Strong',
    'Very strong'
];
function RegisterPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('dark');
    const isDark = theme === 'dark';
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [showPwd, setShowPwd] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [err, setErr] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const strength = getPasswordStrength(password);
    async function safeFetchJSON(res) {
        const text = await res.text();
        try {
            return text ? JSON.parse(text) : {};
        } catch  {
            throw new Error(`Server error (${res.status})`);
        }
    }
    async function handleSubmit(e) {
        e.preventDefault();
        setErr('');
        setSuccess('');
        setLoading(true);
        if (!name || !email || !password) {
            setErr('All fields are required');
            setLoading(false);
            return;
        }
        try {
            const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["API_BASE"]}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });
            const body = await safeFetchJSON(res);
            if (!res.ok) throw new Error(body.error || body.message);
            setSuccess('Account created! Verify your email.');
            setTimeout(()=>router.replace('/verify-email'), 1200);
        } catch (e) {
            setErr(e.message || 'Registration failed');
        } finally{
            setLoading(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                    className: "jsx-4155558823e50ad9",
                    children: "Register — Student Optimizer"
                }, void 0, false, {
                    fileName: "[project]/frontend/pages/register.js",
                    lineNumber: 93,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/pages/register.js",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "jsx-4155558823e50ad9" + " " + `min-h-screen flex items-center justify-center relative overflow-hidden px-4 transition-colors duration-500 ${isDark ? 'bg-[#05060f]' : 'bg-slate-100'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-4155558823e50ad9" + " " + "absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full"
                    }, void 0, false, {
                        fileName: "[project]/frontend/pages/register.js",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-4155558823e50ad9" + " " + "absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-600/20 blur-3xl rounded-full"
                    }, void 0, false, {
                        fileName: "[project]/frontend/pages/register.js",
                        lineNumber: 103,
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
                        fileName: "[project]/frontend/pages/register.js",
                        lineNumber: 106,
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
                                className: "jsx-4155558823e50ad9" + " " + "flex flex-col items-center mb-8 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                        src: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["HERO_IMAGE_BACKEND"],
                                        className: "jsx-4155558823e50ad9" + " " + "w-20 h-20 rounded-xl border border-cyan-400/40 shadow-lg"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/pages/register.js",
                                        lineNumber: 127,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                        className: "jsx-4155558823e50ad9" + " " + "text-3xl font-bold mt-4 text-cyan-400",
                                        children: "Create Account"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/pages/register.js",
                                        lineNumber: 131,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "jsx-4155558823e50ad9" + " " + "text-sm opacity-70",
                                        children: "Join the AI-powered study system"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/pages/register.js",
                                        lineNumber: 134,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/pages/register.js",
                                lineNumber: 126,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                                onSubmit: handleSubmit,
                                className: "jsx-4155558823e50ad9" + " " + "space-y-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        value: name,
                                        onChange: (e)=>setName(e.target.value),
                                        placeholder: "Full Name",
                                        className: "jsx-4155558823e50ad9" + " " + "input"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/pages/register.js",
                                        lineNumber: 142,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        value: email,
                                        onChange: (e)=>setEmail(e.target.value),
                                        placeholder: "Email Address",
                                        className: "jsx-4155558823e50ad9" + " " + "input"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/pages/register.js",
                                        lineNumber: 149,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-4155558823e50ad9" + " " + "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                type: showPwd ? 'text' : 'password',
                                                value: password,
                                                onChange: (e)=>setPassword(e.target.value),
                                                placeholder: "Password",
                                                className: "jsx-4155558823e50ad9" + " " + "input pr-10"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/pages/register.js",
                                                lineNumber: 158,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setShowPwd((v)=>!v),
                                                className: "jsx-4155558823e50ad9" + " " + "absolute right-3 top-1/2 -translate-y-1/2 text-slate-400",
                                                children: showPwd ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/pages/register.js",
                                                    lineNumber: 170,
                                                    columnNumber: 28
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/pages/register.js",
                                                    lineNumber: 170,
                                                    columnNumber: 51
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/pages/register.js",
                                                lineNumber: 165,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/pages/register.js",
                                        lineNumber: 157,
                                        columnNumber: 13
                                    }, this),
                                    password && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-4155558823e50ad9",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-4155558823e50ad9" + " " + "h-2 w-full bg-slate-700/40 rounded overflow-hidden",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                                                    initial: {
                                                        width: 0
                                                    },
                                                    animate: {
                                                        width: `${strength / 4 * 100}%`
                                                    },
                                                    className: `h-full ${strengthColors[strength]}`
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/pages/register.js",
                                                    lineNumber: 178,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/pages/register.js",
                                                lineNumber: 177,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "jsx-4155558823e50ad9" + " " + "text-xs mt-1 opacity-70",
                                                children: [
                                                    "Strength: ",
                                                    strengthText[strength]
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/pages/register.js",
                                                lineNumber: 184,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/pages/register.js",
                                        lineNumber: 176,
                                        columnNumber: 15
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
                                            fileName: "[project]/frontend/pages/register.js",
                                            lineNumber: 193,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/pages/register.js",
                                        lineNumber: 191,
                                        columnNumber: 13
                                    }, this),
                                    success && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-4155558823e50ad9" + " " + "text-green-300 bg-green-500/20 border border-green-400/30 p-2 rounded-lg text-sm",
                                        children: success
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/pages/register.js",
                                        lineNumber: 206,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        disabled: loading,
                                        className: "jsx-4155558823e50ad9" + " " + "w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-black font-semibold",
                                        children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "jsx-4155558823e50ad9" + " " + "h-5 w-24 mx-auto rounded bg-white/30 animate-pulse"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/pages/register.js",
                                            lineNumber: 218,
                                            columnNumber: 17
                                        }, this) : 'Register'
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/pages/register.js",
                                        lineNumber: 212,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-4155558823e50ad9" + " " + "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-4155558823e50ad9" + " " + "flex-1 h-px bg-slate-700"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/pages/register.js",
                                                lineNumber: 226,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "jsx-4155558823e50ad9" + " " + "text-xs text-slate-400",
                                                children: "OR"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/pages/register.js",
                                                lineNumber: 227,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-4155558823e50ad9" + " " + "flex-1 h-px bg-slate-700"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/pages/register.js",
                                                lineNumber: 228,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/pages/register.js",
                                        lineNumber: 225,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "jsx-4155558823e50ad9" + " " + "oauth-btn",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                src: "/google.svg",
                                                className: "jsx-4155558823e50ad9" + " " + "w-5 h-5"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/pages/register.js",
                                                lineNumber: 233,
                                                columnNumber: 15
                                            }, this),
                                            "Continue with Google"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/pages/register.js",
                                        lineNumber: 232,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "jsx-4155558823e50ad9" + " " + "oauth-btn",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                src: "/github.svg",
                                                className: "jsx-4155558823e50ad9" + " " + "w-5 h-5"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/pages/register.js",
                                                lineNumber: 238,
                                                columnNumber: 15
                                            }, this),
                                            "Continue with GitHub"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/pages/register.js",
                                        lineNumber: 237,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>router.push('/login'),
                                        className: "jsx-4155558823e50ad9" + " " + "w-full py-3 rounded-lg border border-cyan-400/40 text-cyan-400 hover:bg-cyan-400/10",
                                        children: "Already have an account? Login"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/pages/register.js",
                                        lineNumber: 243,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/pages/register.js",
                                lineNumber: 140,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/pages/register.js",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/pages/register.js",
                lineNumber: 96,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__["default"], {
                id: "4155558823e50ad9",
                children: ".input.jsx-4155558823e50ad9{width:100%;color:inherit;background:#ffffff1a;border:1px solid #fff3;border-radius:.5rem;outline:none;padding:.75rem}.input.jsx-4155558823e50ad9:focus{border-color:#22d3ee}.oauth-btn.jsx-4155558823e50ad9{width:100%;color:inherit;background:#ffffff0d;border:1px solid #fff3;border-radius:.5rem;justify-content:center;align-items:center;gap:.5rem;padding:.75rem;display:flex}.oauth-btn.jsx-4155558823e50ad9:hover{background:#ffffff1a}"
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

//# sourceMappingURL=%5Broot-of-the-server%5D__abbc0167._.js.map