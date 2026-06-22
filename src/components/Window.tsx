import { Suspense, useRef } from 'react';
import { Rnd } from 'react-rnd';
import { motion } from 'framer-motion';
import { Minus, Square, X, Copy } from 'lucide-react';
import { useWindowStore } from '../store/windowStore';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import type { AppMeta } from '../apps/registry';

const TASKBAR_H = 48;

export default function Window({ meta }: { meta: AppMeta }) {
  const reduced = usePrefersReducedMotion();
  const win = useWindowStore((s) => s.windows[meta.id]);
  const focusedId = useWindowStore((s) => s.focusedId);
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const closeWindow = useWindowStore((s) => s.closeWindow);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
  const toggleMaximize = useWindowStore((s) => s.toggleMaximize);
  const setBounds = useWindowStore((s) => s.setBounds);
  const dragStart = useRef<{ x: number; y: number } | null>(null);

  if (!win.open) return null;

  const focused = focusedId === meta.id;
  const Icon = meta.icon;
  const Content = meta.component;

  // Maximized windows fill the viewport above the taskbar.
  const size = win.maximized
    ? { width: window.innerWidth, height: window.innerHeight - TASKBAR_H }
    : { width: win.width, height: win.height };
  const position = win.maximized ? { x: 0, y: 0 } : { x: win.x, y: win.y };

  return (
    <Rnd
      size={size}
      position={position}
      bounds="parent"
      dragHandleClassName="win-drag-handle"
      enableResizing={!win.maximized}
      disableDragging={win.maximized}
      minWidth={320}
      minHeight={220}
      style={{
        zIndex: win.z,
        display: win.minimized ? 'none' : 'flex',
      }}
      onDragStart={() => {
        focusWindow(meta.id);
        dragStart.current = { x: win.x, y: win.y };
      }}
      onDragStop={(_e, d) => setBounds(meta.id, { x: d.x, y: d.y })}
      onResizeStop={(_e, _dir, ref, _delta, pos) =>
        setBounds(meta.id, {
          width: ref.offsetWidth,
          height: ref.offsetHeight,
          x: pos.x,
          y: pos.y,
        })
      }
      onMouseDown={() => focusWindow(meta.id)}
    >
      <motion.div
        role="dialog"
        aria-label={meta.title}
        initial={reduced ? false : { opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        className={`flex h-full w-full flex-col overflow-hidden border bg-white dark:bg-zinc-900 ${
          win.maximized ? 'rounded-none' : 'rounded-winlg'
        } ${
          focused
            ? 'border-accent/40 shadow-winfocus'
            : 'border-zinc-200 shadow-win dark:border-zinc-700'
        }`}
      >
        {/* Title bar */}
        <div
          className="win-drag-handle flex h-9 shrink-0 items-center justify-between bg-zinc-100/90 pl-3 dark:bg-zinc-800/90"
          onDoubleClick={() => toggleMaximize(meta.id)}
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <Icon size={15} style={{ color: meta.color }} className="shrink-0" />
            <span className="truncate text-xs font-medium text-zinc-700 dark:text-zinc-200">
              {meta.title}
            </span>
          </div>
          <div className="flex h-full items-center">
            <button
              onClick={() => minimizeWindow(meta.id)}
              className="flex h-full w-11 items-center justify-center text-zinc-600 transition hover:bg-zinc-200 dark:text-zinc-300 dark:hover:bg-zinc-700"
              aria-label={`Minimize ${meta.title}`}
            >
              <Minus size={15} />
            </button>
            <button
              onClick={() => toggleMaximize(meta.id)}
              className="flex h-full w-11 items-center justify-center text-zinc-600 transition hover:bg-zinc-200 dark:text-zinc-300 dark:hover:bg-zinc-700"
              aria-label={win.maximized ? `Restore ${meta.title}` : `Maximize ${meta.title}`}
            >
              {win.maximized ? <Copy size={12} /> : <Square size={12} />}
            </button>
            <button
              onClick={() => closeWindow(meta.id)}
              className="flex h-full w-11 items-center justify-center text-zinc-600 transition hover:bg-red-600 hover:text-white dark:text-zinc-300"
              aria-label={`Close ${meta.title}`}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="min-h-0 flex-1 overflow-hidden">
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center text-xs text-zinc-400">
                Loading…
              </div>
            }
          >
            <Content />
          </Suspense>
        </div>
      </motion.div>
    </Rnd>
  );
}
