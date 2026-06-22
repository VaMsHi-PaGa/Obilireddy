import { Grid3x3, Search } from 'lucide-react';
import { apps } from '../apps/registry';
import { useWindowStore } from '../store/windowStore';
import { useSystemStore } from '../store/systemStore';
import SystemTray from './SystemTray';

export default function Taskbar() {
  const windows = useWindowStore((s) => s.windows);
  const focusedId = useWindowStore((s) => s.focusedId);
  const taskbarToggle = useWindowStore((s) => s.taskbarToggle);
  const toggleStartMenu = useSystemStore((s) => s.toggleStartMenu);
  const startMenuOpen = useSystemStore((s) => s.startMenuOpen);

  return (
    <div className="absolute inset-x-0 bottom-0 z-30 flex h-12 items-center justify-between border-t border-white/10 bg-zinc-100/70 px-2 shadow-tray backdrop-blur-acrylic dark:bg-zinc-900/70">
      {/* Left spacer keeps center group centered */}
      <div className="hidden w-40 sm:block" />

      {/* Center: Start + pinned/open apps */}
      <div className="flex items-center gap-1">
        <button
          onClick={toggleStartMenu}
          aria-label="Start"
          aria-expanded={startMenuOpen}
          className={`flex h-9 w-9 items-center justify-center rounded-win transition hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-accent dark:hover:bg-white/10 ${
            startMenuOpen ? 'bg-black/5 dark:bg-white/10' : ''
          }`}
          title="Start"
        >
          <Grid3x3 size={18} className="text-accent-500" />
        </button>

        <button
          className="hidden h-9 w-9 items-center justify-center rounded-win text-zinc-600 transition hover:bg-black/5 dark:text-zinc-300 dark:hover:bg-white/10 sm:flex"
          aria-label="Search"
          title="Search"
          onClick={toggleStartMenu}
        >
          <Search size={16} />
        </button>

        {apps.map((app) => {
          const w = windows[app.id];
          const Icon = app.icon;
          const isActive = focusedId === app.id && !w.minimized;
          return (
            <button
              key={app.id}
              onClick={() => taskbarToggle(app.id)}
              className="group relative flex h-9 w-9 items-center justify-center rounded-win transition hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-accent dark:hover:bg-white/10"
              aria-label={app.title}
              title={app.title}
            >
              <Icon size={18} style={{ color: app.color }} />
              {/* Open indicator */}
              {w.open && (
                <span
                  className={`absolute -bottom-0.5 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-accent-500 transition-all ${
                    isActive ? 'w-4' : 'w-1.5'
                  }`}
                />
              )}
              {/* Tooltip */}
              <span className="pointer-events-none absolute bottom-11 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-800 px-2 py-1 text-[11px] text-white opacity-0 shadow transition group-hover:opacity-100">
                {app.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Right: system tray */}
      <div className="flex w-auto justify-end sm:w-40">
        <SystemTray />
      </div>
    </div>
  );
}
