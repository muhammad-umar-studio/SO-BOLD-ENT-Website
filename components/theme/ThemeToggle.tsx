'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { useThemeStore } from '@/lib/store/themeStore';

export default function ThemeToggle() {
  const { theme, toggleTheme, initTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    initTheme();
    setMounted(true);
  }, [initTheme]);

  if (!mounted) {
    return (
      <div className="w-16 h-8 rounded-full bg-surface-container-low border border-surface-variant animate-pulse" />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
      title={`Current: ${isDark ? 'Dark Mode' : 'Light Mode'} — Click to Toggle`}
      className="relative flex items-center w-[72px] h-9 p-1 rounded-full bg-surface-container-low border border-surface-variant hover:border-primary/60 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-inner overflow-hidden group cursor-pointer"
    >
      {/* Background Animated Gradient Aura */}
      <motion.div
        className="absolute inset-0 opacity-20 pointer-events-none"
        animate={{
          background: isDark
            ? 'radial-gradient(circle at 25% 50%, #6366f1, transparent 70%)'
            : 'radial-gradient(circle at 75% 50%, #f59e0b, transparent 70%)',
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Background Micro Icons */}
      <div className="absolute inset-0 px-2.5 flex items-center justify-between pointer-events-none text-silver-leaf/40">
        <Moon className={`w-3.5 h-3.5 transition-opacity duration-300 ${isDark ? 'opacity-20' : 'opacity-80'}`} />
        <Sun className={`w-3.5 h-3.5 transition-opacity duration-300 ${isDark ? 'opacity-80' : 'opacity-20'}`} />
      </div>

      {/* Sliding Animated Knob */}
      <motion.div
        className="relative z-10 flex items-center justify-center w-7 h-7 rounded-full shadow-md backdrop-blur-sm"
        layout
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 32,
        }}
        style={{
          x: isDark ? 0 : 34,
          backgroundColor: isDark ? '#ffffff' : '#0a0a0a',
          color: isDark ? '#000000' : '#ffffff',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-center justify-center"
            >
              <Moon className="w-4 h-4 fill-current text-black" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-center justify-center"
            >
              <Sun className="w-4 h-4 text-amber-400 fill-amber-400 animate-spin-slow" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ambient Ring Glow */}
        <span
          className={`absolute -inset-1 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-300 blur-sm ${
            isDark ? 'bg-indigo-400' : 'bg-amber-400'
          }`}
        />
      </motion.div>
    </button>
  );
}
