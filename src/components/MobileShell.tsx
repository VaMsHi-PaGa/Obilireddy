import { Suspense, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Sun, Moon, FileText } from 'lucide-react';
import { apps, type AppMeta } from '../apps/registry';
import { useClock, formatTime } from '../hooks/useClock';
import { useSystemStore } from '../store/systemStore';
import { contact, lockTagline } from '../data/resume';
import Wallpaper from './Wallpaper';

/**
 * Phone-style fallback: a home screen of the same "apps" that open as
 * full-screen sheets. All content is reachable; nothing overflows horizontally.
 */
export default function MobileShell() {
  const [active, setActive] = useState<AppMeta | null>(null);
  const now = useClock();
  const theme = useSystemStore((s) => s.theme);
  const toggleTheme = useSystemStore((s) => s.toggleTheme);
  const resumeUrl = `${import.meta.env.BASE_URL}resume.pdf`;

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden">
      <Wallpaper />

      {/* Status bar */}
      <div className="relative flex items-center justify-between px-5 pt-3 text-xs font-medium text-white">
        <span>{formatTime(now)}</span>
        <span>saiOS</span>
        <button onClick={toggleTheme} aria-label="Toggle theme" className="p-1">
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>

      {/* Home header */}
      <div className="relative px-6 pt-8 text-center text-white">
        <span className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-accent text-2xl font-semibold shadow-winfocus">
          SO
        </span>
        <h1 className="text-xl font-semibold [text-shadow:0_1px_4px_rgba(0,0,0,0.4)]">
          {contact.name}
        </h1>
        <p className="text-sm opacity-90">{contact.title}</p>
        <p className="mx-auto mt-2 max-w-[16rem] text-[11px] italic opacity-75">“{lockTagline}”</p>
      </div>

      {/* App grid */}
      <div className="relative mt-8 grid grid-cols-4 gap-x-3 gap-y-5 px-6">
        {apps.map((app) => {
          const Icon = app.icon;
          return (
            <button
              key={app.id}
              onClick={() => setActive(app)}
              className="flex flex-col items-center gap-1.5 focus:outline-none"
            >
              <span
                className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg transition active:scale-90"
                style={{ backgroundColor: app.color }}
              >
                <Icon size={26} className="text-white" />
              </span>
              <span className="text-[10px] font-medium text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">
                {app.alias}
              </span>
            </button>
          );
        })}

        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1.5"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 shadow-lg active:scale-90">
            <FileText size={26} className="text-white" />
          </span>
          <span className="text-[10px] font-medium text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">
            Resume
          </span>
        </a>
      </div>

      {/* Full-screen app sheet */}
      <AnimatePresence>
        {active && (
          <motion.div
            key={active.id}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 360, damping: 36 }}
            className="absolute inset-0 z-50 flex flex-col bg-white dark:bg-zinc-900"
          >
            <header className="flex h-12 shrink-0 items-center gap-2 border-b border-zinc-200 bg-zinc-100 px-3 dark:border-zinc-700 dark:bg-zinc-800">
              <button
                onClick={() => setActive(null)}
                className="flex items-center gap-1 rounded-win px-2 py-1 text-sm font-medium text-accent-600 dark:text-accent-400"
                aria-label="Back to home"
              >
                <ChevronLeft size={18} /> Home
              </button>
              <span className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-200">
                {(() => {
                  const Icon = active.icon;
                  return <Icon size={16} style={{ color: active.color }} />;
                })()}
                {active.title}
              </span>
            </header>
            <div className="min-h-0 flex-1 overflow-hidden">
              <Suspense
                fallback={
                  <div className="flex h-full items-center justify-center text-xs text-zinc-400">
                    Loading…
                  </div>
                }
              >
                <active.component />
              </Suspense>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
