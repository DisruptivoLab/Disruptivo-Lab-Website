/**
 * Simple Theme Toggle
 * Toggle de tema profesional con iconos Lucide
 */

'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/theme-context';

export function SimpleThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center relative overflow-hidden
                 backdrop-blur-[8px] backdrop-saturate-150
                 transition-all duration-500 ease-out
                 hover:scale-110 active:scale-95
                 bg-white/8 dark:bg-white/6
                 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),inset_2px_4px_0px_-2px_rgba(255,255,255,0.85),inset_-2px_-2px_0px_-2px_rgba(255,255,255,0.75),inset_-4px_-10px_2px_-6px_rgba(255,255,255,0.55),inset_-0.5px_-1px_6px_0px_rgba(0,0,0,0.08),inset_-2px_3px_0px_-2px_rgba(0,0,0,0.15),inset_0px_4px_6px_-2px_rgba(0,0,0,0.15),inset_3px_-8px_2px_-4px_rgba(0,0,0,0.08),0px_2px_8px_0px_rgba(0,0,0,0.08),0px_8px_20px_0px_rgba(0,0,0,0.06)]"
      aria-label={`Cambiar a tema ${theme === 'dark' ? 'claro' : 'oscuro'}`}
    >
      {/* Iconos con transición suave y efecto más natural */}
      <Sun 
        className={`absolute w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 transition-all duration-500 ease-out text-dark dark:text-white ${
          theme === 'dark' ? 'rotate-180 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
        }`} 
      />
      <Moon 
        className={`absolute w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 transition-all duration-500 ease-out text-white dark:text-white ${
          theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-180 scale-0 opacity-0'
        }`} 
      />
    </button>
  );
}