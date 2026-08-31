'use client';

import { create } from 'zustand';

type Theme = 'dark' | 'light';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  initTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: 'dark',
  toggleTheme: () => {
    const nextTheme = get().theme === 'dark' ? 'light' : 'dark';
    get().setTheme(nextTheme);
  },
  setTheme: (theme: Theme) => {
    set({ theme });
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      if (theme === 'light') {
        root.classList.remove('dark');
        root.classList.add('light');
      } else {
        root.classList.remove('light');
        root.classList.add('dark');
      }
      localStorage.setItem('soboldents_theme', theme);
    }
  },
  initTheme: () => {
    if (typeof window !== 'undefined') {
      const savedTheme = (localStorage.getItem('soboldents_theme') as Theme) || 'dark';
      get().setTheme(savedTheme);
    }
  },
}));
