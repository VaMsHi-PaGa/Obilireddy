import { motion, AnimatePresence } from 'framer-motion';
import { Power, RotateCcw, Lock, FileText } from 'lucide-react';
import { apps } from '../apps/registry';
import { useWindowStore } from '../store/windowStore';
import { useSystemStore } from '../store/systemStore';
import { contact } from '../data/resume';

export default function StartMenu() {
  const open = useSystemStore((s) => s.startMenuOpen);
  const closeStartMenu = useSystemStore((s) => s.closeStartMenu);
  const restart = useSystemStore((s) => s.restart);
  const setPhase = useSystemStore((s) => s.setPhase);
  const openWindow = useWindowStore((s) => s.openWindow);
  const resumeUrl = `${import.meta.env.BASE_URL}resume.pdf`;

  const launch = (id: Parameters<typeof openWindow>[0]) => {
    openWindow(id);
    closeStartMenu();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Click-away backdrop */}
          <div
            className="fixed inset-0 z-30"
            onClick={closeStartMenu}
            aria-hidden="true"
          />
          <motion.div
            role="menu"
            aria-label="Start menu"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            className="fixed bottom-[56px] left-1/2 z-40 w-[min(560px,92vw)] -translate-x-1/2 rounded-winlg border border-white/20 bg-white/80 p-5 shadow-winfocus backdrop-blur-acrylic dark:border-white/10 dark:bg-zinc-900/80"
          >
            <p className="mb-3 px-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Pinned
            </p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {apps.map((app) => {
                const Icon = app.icon;
                return (
                  <button
                    key={app.id}
                    onClick={() => launch(app.id)}
                    className="flex flex-col items-center gap-1.5 rounded-win p-3 text-center transition hover:bg-black/5 focus:bg-black/5 focus:outline-none focus:ring-2 focus:ring-accent dark:hover:bg-white/10 dark:focus:bg-white/10"
                  >
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-win shadow-sm"
                      style={{ backgroundColor: app.color }}
                    >
                      <Icon size={20} className="text-white" />
                    </span>
                    <span className="text-[11px] font-medium text-zinc-700 dark:text-zinc-200">
                      {app.alias}
                    </span>
                  </button>
                );
              })}
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeStartMenu}
                className="flex flex-col items-center gap-1.5 rounded-win p-3 text-center transition hover:bg-black/5 focus:bg-black/5 focus:outline-none focus:ring-2 focus:ring-accent dark:hover:bg-white/10"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-win bg-red-600 shadow-sm">
                  <FileText size={20} className="text-white" />
                </span>
                <span className="text-[11px] font-medium text-zinc-700 dark:text-zinc-200">
                  Resume.pdf
                </span>
              </a>
            </div>

            {/* Footer: user + power */}
            <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-3 dark:border-white/10">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-semibold text-white">
                  SO
                </span>
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                  {contact.name.split(' ')[0]}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    closeStartMenu();
                    setPhase('lock');
                  }}
                  className="rounded-win p-2 text-zinc-600 transition hover:bg-black/5 dark:text-zinc-300 dark:hover:bg-white/10"
                  title="Lock"
                  aria-label="Lock"
                >
                  <Lock size={16} />
                </button>
                <button
                  onClick={restart}
                  className="rounded-win p-2 text-zinc-600 transition hover:bg-black/5 dark:text-zinc-300 dark:hover:bg-white/10"
                  title="Restart (replays boot)"
                  aria-label="Restart"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  onClick={restart}
                  className="rounded-win p-2 text-zinc-600 transition hover:bg-black/5 dark:text-zinc-300 dark:hover:bg-white/10"
                  title="Power"
                  aria-label="Power"
                >
                  <Power size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
