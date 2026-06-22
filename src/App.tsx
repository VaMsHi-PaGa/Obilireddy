import { AnimatePresence, motion } from 'framer-motion';
import { useSystemStore } from './store/systemStore';
import { useIsMobile } from './hooks/useMediaQuery';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import Boot from './components/Boot';
import LockScreen from './components/LockScreen';
import Desktop from './components/Desktop';
import MobileShell from './components/MobileShell';

export default function App() {
  const phase = useSystemStore((s) => s.phase);
  const bootKey = useSystemStore((s) => s.bootKey);
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();

  return (
    <main className="h-[100dvh] w-screen overflow-hidden bg-black font-sans text-zinc-900 antialiased dark:text-zinc-100">
      <AnimatePresence mode="wait">
        {phase === 'boot' && <Boot key={`boot-${bootKey}`} />}
        {phase === 'lock' && <LockScreen key="lock" />}
        {phase === 'desktop' && (
          <motion.div
            key="desktop"
            className="h-full w-full"
            initial={reduced ? false : { opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            {isMobile ? <MobileShell /> : <Desktop />}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
