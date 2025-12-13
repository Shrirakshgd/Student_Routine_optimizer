import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

export default function VerifyEmail() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#05060f]">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center"
      >
        <h1 className="text-2xl font-bold text-cyan-300">
          Verify your email
        </h1>
        <p className="text-slate-400 mt-2">
          We’ve sent a verification link to your email.
        </p>

        <button
          onClick={() => router.push('/login')}
          className="mt-6 px-6 py-2 rounded-lg bg-cyan-500 text-black font-semibold"
        >
          Go to Login
        </button>
      </motion.div>
    </div>
  );
}
