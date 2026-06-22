import { create } from 'zustand';

export type Phase = 'boot' | 'lock' | 'desktop';
export type Theme = 'light' | 'dark';

interface SystemStore {
  phase: Phase;
  theme: Theme;
  startMenuOpen: boolean;
  bootKey: number; // bump to replay boot animation (fake "Restart")
  setPhase: (phase: Phase) => void;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  toggleStartMenu: () => void;
  closeStartMenu: () => void;
  restart: () => void;
}

const STORAGE_KEY = 'saios-theme';

function initialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return 'dark'; // default to dark per spec
}

function applyTheme(theme: Theme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  window.localStorage.setItem(STORAGE_KEY, theme);
}

const startTheme = initialTheme();
applyTheme(startTheme);

export const useSystemStore = create<SystemStore>((set, get) => ({
  phase: 'boot',
  theme: startTheme,
  startMenuOpen: false,
  bootKey: 0,

  setPhase: (phase) => set({ phase }),

  toggleTheme: () => {
    const next = get().theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    set({ theme: next });
  },

  setTheme: (theme) => {
    applyTheme(theme);
    set({ theme });
  },

  toggleStartMenu: () => set((s) => ({ startMenuOpen: !s.startMenuOpen })),
  closeStartMenu: () => set({ startMenuOpen: false }),

  restart: () =>
    set((s) => ({ phase: 'boot', startMenuOpen: false, bootKey: s.bootKey + 1 })),
}));
