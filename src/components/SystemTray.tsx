import { Wifi, Volume2, Sun, Moon, CheckCircle2 } from 'lucide-react';
import { useClock, formatTime, formatDate } from '../hooks/useClock';
import { useSystemStore } from '../store/systemStore';

export default function SystemTray() {
  const now = useClock();
  const theme = useSystemStore((s) => s.theme);
  const toggleTheme = useSystemStore((s) => s.toggleTheme);

  return (
    <div className="flex items-center gap-1 pr-2 text-white">
      {/* Deployments status */}
      <span
        className="hidden items-center gap-1 rounded-win px-2 py-1 text-xs sm:flex"
        title="All deployments are green"
      >
        <CheckCircle2 size={14} className="text-green-400" />
        <span className="text-white/90">deployments: green</span>
      </span>

      <button
        onClick={toggleTheme}
        className="rounded-win p-2 transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/40"
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        title="Toggle theme"
      >
        {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
      </button>

      <div className="flex items-center gap-1 rounded-win px-2 py-1 transition hover:bg-white/15">
        <Wifi size={15} aria-label="Network connected" />
        <Volume2 size={15} aria-label="Volume" />
      </div>

      <div className="flex flex-col items-end rounded-win px-2 py-1 text-right text-[11px] leading-tight transition hover:bg-white/15">
        <span>{formatTime(now)}</span>
        <span>{formatDate(now)}</span>
      </div>
    </div>
  );
}
