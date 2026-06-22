import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useSystemStore } from '../store/systemStore';
import { useClock, formatTime } from '../hooks/useClock';
import { contact, lockTagline } from '../data/resume';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import Wallpaper from './Wallpaper';

export default function LockScreen() {
  const setPhase = useSystemStore((s) => s.setPhase);
  const now = useClock();
  const reduced = usePrefersReducedMotion();

  const signIn = () => setPhase('desktop');

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={signIn}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && signIn()}
      aria-label="Sign in to saiOS"
    >
      <Wallpaper />
      <div className="absolute inset-0 bg-black/30" />

      {/* Clock */}
      <motion.div
        className="relative mb-auto mt-[18vh] text-center text-white"
        initial={reduced ? false : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="text-7xl font-light tracking-tight [text-shadow:0_2px_12px_rgba(0,0,0,0.4)]">
          {formatTime(now)}
        </div>
        <div className="mt-1 text-lg opacity-90">
          {now.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long' })}
        </div>
      </motion.div>

      {/* User card */}
      <motion.div
        className="relative mb-[20vh] flex flex-col items-center gap-3 text-center text-white"
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-accent text-3xl font-semibold shadow-winfocus">
          SO
        </span>
        <div>
          <p className="text-xl font-medium">{contact.name}</p>
          <p className="text-sm opacity-80">{contact.title}</p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            signIn();
          }}
          className="mt-2 flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-sm font-medium backdrop-blur transition hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white"
        >
          Sign in <ArrowRight size={16} />
        </button>

        {/* Easter-egg tagline */}
        <p className="mt-4 max-w-xs text-xs italic opacity-75">“{lockTagline}”</p>
        <p className="text-[11px] opacity-60">Press Enter or click anywhere</p>
      </motion.div>
    </motion.div>
  );
}
