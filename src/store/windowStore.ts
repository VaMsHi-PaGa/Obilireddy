import { create } from 'zustand';

export type AppId =
  | 'about'
  | 'projects'
  | 'skills'
  | 'experience'
  | 'certifications'
  | 'terminal'
  | 'pipeline'
  | 'contact';

export interface WindowState {
  id: AppId;
  open: boolean;
  minimized: boolean;
  maximized: boolean;
  z: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface WindowStore {
  windows: Record<AppId, WindowState>;
  focusedId: AppId | null;
  topZ: number;
  openWindow: (id: AppId) => void;
  closeWindow: (id: AppId) => void;
  minimizeWindow: (id: AppId) => void;
  toggleMaximize: (id: AppId) => void;
  focusWindow: (id: AppId) => void;
  /** Toggle from taskbar: open/focus, or minimize if already focused. */
  taskbarToggle: (id: AppId) => void;
  setBounds: (id: AppId, bounds: Partial<Pick<WindowState, 'x' | 'y' | 'width' | 'height'>>) => void;
  closeAll: () => void;
}

const BASE_Z = 10;

// Default geometry per app, with a cascade so opening several apps doesn't stack them.
const defaults: Record<AppId, { width: number; height: number }> = {
  about: { width: 720, height: 520 },
  projects: { width: 820, height: 560 },
  skills: { width: 720, height: 560 },
  experience: { width: 820, height: 560 },
  certifications: { width: 680, height: 480 },
  terminal: { width: 760, height: 480 },
  pipeline: { width: 720, height: 420 },
  contact: { width: 640, height: 560 },
};

const order: AppId[] = [
  'about',
  'projects',
  'skills',
  'experience',
  'certifications',
  'terminal',
  'pipeline',
  'contact',
];

function makeInitial(): Record<AppId, WindowState> {
  const result = {} as Record<AppId, WindowState>;
  order.forEach((id, i) => {
    const d = defaults[id];
    result[id] = {
      id,
      open: false,
      minimized: false,
      maximized: false,
      z: BASE_Z,
      // Cascade windows from a sensible starting position.
      x: 80 + i * 28,
      y: 60 + i * 24,
      width: d.width,
      height: d.height,
    };
  });
  return result;
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: makeInitial(),
  focusedId: null,
  topZ: BASE_Z,

  openWindow: (id) =>
    set((state) => {
      const nextZ = state.topZ + 1;
      return {
        topZ: nextZ,
        focusedId: id,
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], open: true, minimized: false, z: nextZ },
        },
      };
    }),

  closeWindow: (id) =>
    set((state) => ({
      focusedId: state.focusedId === id ? null : state.focusedId,
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], open: false, minimized: false, maximized: false },
      },
    })),

  minimizeWindow: (id) =>
    set((state) => ({
      focusedId: state.focusedId === id ? null : state.focusedId,
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], minimized: true },
      },
    })),

  toggleMaximize: (id) =>
    set((state) => {
      const nextZ = state.topZ + 1;
      return {
        topZ: nextZ,
        focusedId: id,
        windows: {
          ...state.windows,
          [id]: {
            ...state.windows[id],
            maximized: !state.windows[id].maximized,
            minimized: false,
            z: nextZ,
          },
        },
      };
    }),

  focusWindow: (id) =>
    set((state) => {
      if (state.focusedId === id && !state.windows[id].minimized) return state;
      const nextZ = state.topZ + 1;
      return {
        topZ: nextZ,
        focusedId: id,
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], minimized: false, z: nextZ },
        },
      };
    }),

  taskbarToggle: (id) => {
    const state = get();
    const w = state.windows[id];
    if (!w.open) {
      state.openWindow(id);
    } else if (w.minimized) {
      state.focusWindow(id);
    } else if (state.focusedId === id) {
      state.minimizeWindow(id);
    } else {
      state.focusWindow(id);
    }
  },

  setBounds: (id, bounds) =>
    set((state) => ({
      windows: { ...state.windows, [id]: { ...state.windows[id], ...bounds } },
    })),

  closeAll: () => set({ windows: makeInitial(), focusedId: null, topZ: BASE_Z }),
}));
