import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const steps = [
  'Set your daily study hours',
  'Add your subjects',
  'Enable AI scheduling',
];

export default function Onboarding() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#05060f]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-cyan-300 mb-4">
          Welcome aboard 🚀
        </h1>

        <ul className="space-y-3 text-slate-300">
          {steps.map((s, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              ✓ {s}
            </motion.li>
          ))}
        </ul>

        <button
          onClick={() => router.replace('/')}
          className="mt-6 w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-black font-semibold"
        >
          Start using app
        </button>
      </motion.div>
    </div>
  );
}
