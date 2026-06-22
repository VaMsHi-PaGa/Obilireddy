import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSystemStore } from '../store/systemStore';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const POST_LINES = [
  'saiOS BIOS v11.0 — initializing…',
  'CPU: Cloud-Native vCPU  ·  MEM: OK',
  'Mounting /azure … ok',
  'Loading terraform state … ok',
  'Starting ansible-runner … ok',
  'CI/CD pipelines: ✅ green',
  'Launching saiOS desktop environment…',
];

export default function Boot() {
  const setPhase = useSystemStore((s) => s.setPhase);
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(0);

  // If reduced motion, skip straight through quickly.
  useEffect(() => {
    if (reduced) {
      const t = window.setTimeout(() => setPhase('lock'), 400);
      return () => window.clearTimeout(t);
    }
    let line = 0;
    const lineTimer = window.setInterval(() => {
      line += 1;
      setVisible(line);
      if (line >= POST_LINES.length) {
        window.clearInterval(lineTimer);
        window.setTimeout(() => setPhase('lock'), 500);
      }
    }, 260);
    return () => window.clearInterval(lineTimer);
  }, [reduced, setPhase]);

  return (
    <button
      className="fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center bg-black p-8 text-left"
      onClick={() => setPhase('lock')}
      aria-label="Skip boot sequence"
    >
      {/* Logo */}
      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 grid grid-cols-2 gap-1"
      >
        {['#0067C0', '#3a8fd6', '#3a8fd6', '#0067C0'].map((c, i) => (
          <motion.span
            key={i}
            className="h-7 w-7 rounded-sm"
            style={{ backgroundColor: c }}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 * i }}
          />
        ))}
      </motion.div>

      <motion.h1
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6 font-mono text-2xl font-semibold tracking-widest text-white"
      >
        saiOS
      </motion.h1>

      {/* POST lines */}
      <div className="h-40 w-full max-w-md font-mono text-xs text-green-400/90">
        {POST_LINES.slice(0, visible).map((l) => (
          <div key={l}>{l}</div>
        ))}
      </div>

      {/* Spinner */}
      {!reduced && (
        <motion.div
          className="mt-4 h-6 w-6 rounded-full border-2 border-white/20 border-t-white"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
        />
      )}

      <span className="absolute bottom-6 text-xs text-zinc-500">Click anywhere to skip</span>
    </button>
  );
}
