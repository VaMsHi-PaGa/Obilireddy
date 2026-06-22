import { FileText } from 'lucide-react';
import { apps } from '../apps/registry';
import { useWindowStore } from '../store/windowStore';

export default function DesktopIcons() {
  const openWindow = useWindowStore((s) => s.openWindow);
  const desktopApps = apps.filter((a) => a.onDesktop);
  const resumeUrl = `${import.meta.env.BASE_URL}resume.pdf`;

  return (
    <div className="absolute left-3 top-3 z-0 grid grid-flow-col grid-rows-[repeat(7,auto)] gap-1">
      {desktopApps.map((app) => {
        const Icon = app.icon;
        return (
          <button
            key={app.id}
            onDoubleClick={() => openWindow(app.id)}
            onClick={(e) => {
              if (e.detail === 0) openWindow(app.id); // keyboard activation
            }}
            onKeyDown={(e) => e.key === 'Enter' && openWindow(app.id)}
            className="flex w-20 flex-col items-center gap-1 rounded-win p-2 text-center transition hover:bg-white/15 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
            title={`Open ${app.title}`}
          >
            <span
              className="flex h-9 w-9 items-center justify-center rounded-win shadow-md"
              style={{ backgroundColor: `${app.color}` }}
            >
              <Icon size={20} className="text-white" />
            </span>
            <span className="text-[11px] font-medium text-white drop-shadow [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">
              {app.alias}
            </span>
          </button>
        );
      })}

      {/* Resume.pdf desktop file */}
      <a
        href={resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-20 flex-col items-center gap-1 rounded-win p-2 text-center transition hover:bg-white/15 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
        title="Open Resume.pdf"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-win bg-red-600 shadow-md">
          <FileText size={20} className="text-white" />
        </span>
        <span className="text-[11px] font-medium text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">
          Resume.pdf
        </span>
      </a>
    </div>
  );
}
