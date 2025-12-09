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
"[project]/frontend/pages/login.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

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
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/api.js [ssr] (ecmascript)");
;
;
;
;
;
;
function LoginPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [err, setErr] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    async function safeFetchJSON(res) {
        const text = await res.text();
        try {
            return text ? JSON.parse(text) : {};
        } catch  {
            throw new Error(`Server non-JSON (status ${res.status}):\n${text}`);
        }
    }
    async function onSubmit(e) {
        e.preventDefault();
        setErr('');
        setLoading(true);
        if (!email.trim()) return setErr('Enter email'), setLoading(false);
        if (!password.trim()) return setErr('Enter password'), setLoading(false);
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
                    children: "Login — Student Optimizer"
                }, void 0, false, {
                    fileName: "[project]/frontend/pages/login.js",
                    lineNumber: 49,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/pages/login.js",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "jsx-5a0741487f66703d" + " " + "min-h-screen flex items-center justify-center relative overflow-hidden bg-black",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-5a0741487f66703d" + " " + "absolute inset-0 cyber-grid opacity-20"
                    }, void 0, false, {
                        fileName: "[project]/frontend/pages/login.js",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-5a0741487f66703d" + " " + "absolute w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl animate-pulse-slow -top-20 -left-10"
                    }, void 0, false, {
                        fileName: "[project]/frontend/pages/login.js",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-5a0741487f66703d" + " " + "absolute w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slower bottom-0 right-0"
                    }, void 0, false, {
                        fileName: "[project]/frontend/pages/login.js",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-5a0741487f66703d" + " " + "relative z-10 w-full max-w-md neon-border p-8 rounded-2xl shadow-lg bg-black/60 backdrop-blur-xl animate-fade-in-up",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-5a0741487f66703d" + " " + "flex items-center gap-4 mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                        src: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["HERO_IMAGE_BACKEND"],
                                        alt: "logo",
                                        className: "jsx-5a0741487f66703d" + " " + "w-16 h-16 rounded-lg shadow-lg border border-cyan-400 animate-float"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/pages/login.js",
                                        lineNumber: 66,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-5a0741487f66703d",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                                className: "jsx-5a0741487f66703d" + " " + "text-3xl font-bold text-cyan-300 drop-shadow-lg tracking-wider cyber-title",
                                                children: "STUDENT OPTIMIZER"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/pages/login.js",
                                                lineNumber: 72,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "jsx-5a0741487f66703d" + " " + "text-fuchsia-400 text-xs opacity-80 tracking-wide",
                                                children: "Adaptive learning intelligence"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/pages/login.js",
                                                lineNumber: 75,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/pages/login.js",
                                        lineNumber: 71,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/pages/login.js",
                                lineNumber: 65,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                                onSubmit: onSubmit,
                                className: "jsx-5a0741487f66703d" + " " + "space-y-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        value: email,
                                        onChange: (e)=>setEmail(e.target.value),
                                        placeholder: "Email",
                                        className: "jsx-5a0741487f66703d" + " " + "w-full p-3 text-cyan-200 bg-black/40 border border-cyan-600 rounded-lg
              focus:ring-2 focus:ring-fuchsia-500 outline-none cyber-input"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/pages/login.js",
                                        lineNumber: 85,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        type: "password",
                                        value: password,
                                        onChange: (e)=>setPassword(e.target.value),
                                        placeholder: "Password",
                                        className: "jsx-5a0741487f66703d" + " " + "w-full p-3 text-cyan-200 bg-black/40 border border-cyan-600 rounded-lg
              focus:ring-2 focus:ring-fuchsia-500 outline-none cyber-input"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/pages/login.js",
                                        lineNumber: 94,
                                        columnNumber: 13
                                    }, this),
                                    err && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-5a0741487f66703d" + " " + "text-sm text-red-400 bg-red-500/10 p-2 rounded-lg animate-shake",
                                        children: err
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/pages/login.js",
                                        lineNumber: 104,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        disabled: loading,
                                        className: "jsx-5a0741487f66703d" + " " + "w-full py-3 rounded-lg bg-gradient-to-r from-fuchsia-600 to-cyan-500
              text-black font-bold hover:opacity-90 transition transform hover:scale-[1.02] neon-btn",
                                        children: loading ? 'Authenticating…' : 'Login'
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/pages/login.js",
                                        lineNumber: 110,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>router.push('/register'),
                                        className: "jsx-5a0741487f66703d" + " " + "w-full py-3 rounded-lg border border-cyan-400 text-cyan-300 hover:bg-cyan-400/10 transition",
                                        children: "Register"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/pages/login.js",
                                        lineNumber: 120,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/pages/login.js",
                                lineNumber: 82,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/pages/login.js",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__["default"], {
                        id: "5a0741487f66703d",
                        children: "@keyframes float{0%{transform:translateY(0)}50%{transform:translateY(-8px)}to{transform:translateY(0)}}.animate-float.jsx-5a0741487f66703d{animation:4s ease-in-out infinite float}@keyframes fade-in-up{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}.animate-fade-in-up.jsx-5a0741487f66703d{animation:.7s ease-out fade-in-up}@keyframes pulse-slow{0%,to{opacity:.2}50%{opacity:.4}}.animate-pulse-slow.jsx-5a0741487f66703d{animation:7s ease-in-out infinite pulse-slow}@keyframes pulse-slower{0%,to{opacity:.15}50%{opacity:.3}}.animate-pulse-slower.jsx-5a0741487f66703d{animation:11s ease-in-out infinite pulse-slower}@keyframes shake{0%,to{transform:translate(0)}25%{transform:translate(-4px)}75%{transform:translate(4px)}}.animate-shake.jsx-5a0741487f66703d{animation:.3s ease-in-out shake}.cyber-grid.jsx-5a0741487f66703d{background-image:linear-gradient(#0ff2 1px,#0000 1px),linear-gradient(90deg,#f0f2 1px,#0000 1px);background-size:50px 50px}.neon-border.jsx-5a0741487f66703d{border:2px solid #0ff5;box-shadow:0 0 20px #0ff4,inset 0 0 20px #0ff2}.cyber-input.jsx-5a0741487f66703d{box-shadow:inset 0 0 8px #0ff3}.neon-btn.jsx-5a0741487f66703d{box-shadow:0 0 12px #f0f,0 0 30px #0ff}.cyber-title.jsx-5a0741487f66703d{text-shadow:0 0 8px #0ff,0 0 20px #00eaff,0 0 40px #0ff}"
                    }, void 0, false, void 0, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/pages/login.js",
                lineNumber: 52,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b9054973._.js.map