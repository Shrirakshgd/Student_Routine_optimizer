import { motion } from 'framer-motion';
import { HERO_IMAGE_BACKEND } from './api';

export default function AuthLayout({ title, subtitle, children, rightSlot }) {
  return (
    <div className="min-h-screen flex bg-[#05060f] relative overflow-hidden">

      {/* Ambient background */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-600/20 blur-3xl rounded-full" />

      {/* Left (Form) */}
      <div className="flex-1 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
        >
          <div className="flex flex-col items-center mb-8 text-center">
            <img
              src={HERO_IMAGE_BACKEND}
              className="w-20 h-20 rounded-xl border border-cyan-400/40 shadow-lg"
            />
            <h1 className="text-3xl font-bold text-cyan-300 mt-4">
              {title}
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              {subtitle}
            </p>
          </div>

          {children}
        </motion.div>
      </div>

      {/* Right (Illustration / Onboarding / Tips) */}
      <div className="hidden lg:flex flex-1 items-center justify-center">
        {rightSlot}
      </div>
    </div>
  );
}
