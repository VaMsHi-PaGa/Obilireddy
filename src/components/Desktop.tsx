import { useEffect } from 'react';
import { apps } from '../apps/registry';
import { useWindowStore } from '../store/windowStore';
import { useSystemStore } from '../store/systemStore';
import Wallpaper from './Wallpaper';
import DesktopIcons from './DesktopIcons';
import Window from './Window';
import Taskbar from './Taskbar';
import StartMenu from './StartMenu';

export default function Desktop() {
  const openWindow = useWindowStore((s) => s.openWindow);
  const anyOpen = useWindowStore((s) => Object.values(s.windows).some((w) => w.open));
  const closeStartMenu = useSystemStore((s) => s.closeStartMenu);

  // Open the Terminal once on first desktop reveal so the signature feature is visible.
  useEffect(() => {
    if (!anyOpen) openWindow('terminal');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Escape closes the Start menu.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeStartMenu();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeStartMenu]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Wallpaper />
      <DesktopIcons />

      {/* Window layer — pointer-events-none so empty areas don't block the
          desktop icons beneath; each window re-enables pointer events. */}
      <div className="pointer-events-none absolute inset-0 bottom-12">
        {apps.map((app) => (
          <Window key={app.id} meta={app} />
        ))}
      </div>

      <StartMenu />
      <Taskbar />
    </div>
  );
}
