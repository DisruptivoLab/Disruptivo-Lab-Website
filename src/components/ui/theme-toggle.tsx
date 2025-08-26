/**
 * ThemeToggle Component
 * Botón para cambiar entre tema claro y oscuro con efectos Liquid Glass
 */

'use client';

import { useTheme } from '@/contexts/theme-context';
import { FrostedButton } from '@/components/ui';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-[8px] animate-pulse" />
    );
  }

  return (
    <FrostedButton
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="relative p-2 w-10 h-10"
      aria-label={`Cambiar a tema ${theme === 'dark' ? 'claro' : 'oscuro'}`}
    >
      <Sun 
        className={`absolute inset-0 m-auto h-4 w-4 transition-all duration-300 ${
          theme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'
        }`} 
      />
      <Moon 
        className={`absolute inset-0 m-auto h-4 w-4 transition-all duration-300 ${
          theme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'
        }`} 
      />
    </FrostedButton>
  );
}