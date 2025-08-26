/**
 * Theme Context Provider
 * Maneja el estado global de temas (dark/light) con persistencia
 */

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

// Hook para detectar si estamos en homepage
function useIsHomepage() {
  const [isHomepage, setIsHomepage] = useState(false);
  
  useEffect(() => {
    const checkPath = () => {
      setIsHomepage(window.location.pathname === '/');
    };
    
    checkPath();
    
    // Escuchar cambios de ruta
    const handlePopState = () => checkPath();
    window.addEventListener('popstate', handlePopState);
    
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  
  return isHomepage;
}

export function ThemeProvider({ children, defaultTheme = 'dark' }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);
  const isHomepage = useIsHomepage();

  // Cargar tema desde localStorage al montar
  useEffect(() => {
    const savedTheme = localStorage.getItem('disruptivo-theme') as Theme;
    
    // Si no hay tema guardado, usar regla por defecto:
    // Homepage = dark, páginas internas = light
    if (!savedTheme) {
      const pageDefaultTheme = isHomepage ? 'dark' : 'light';
      setThemeState(pageDefaultTheme);
    } else {
      setThemeState(savedTheme);
    }
    
    setMounted(true);
  }, [isHomepage]);

  // Aplicar tema al documento
  useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    const body = document.body;
    
    // Limpiar clases anteriores
    root.classList.remove('light', 'dark');
  body.classList.remove('bg-white', 'bg-[#121212]', 'bg-black', 'text-black', 'text-white');
    
    // Aplicar nuevas clases
    root.classList.add(theme);
    
    if (theme === 'dark') {
      // Negro puro para que coincida con el final del gradiente del hero
      body.classList.add('bg-black', 'text-white');
    } else {
      body.classList.add('bg-white', 'text-black');
    }
    
    // Forzar re-render de componentes
    window.dispatchEvent(new CustomEvent('theme-change', { detail: theme }));
    
    // Guardar en localStorage
    localStorage.setItem('disruptivo-theme', theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setThemeState(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  // Evitar hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}