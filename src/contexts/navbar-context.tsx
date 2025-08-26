/**
 * Navbar Context
 * Contexto para compartir el estado del navbar con otros componentes
 */

'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useScroll } from '@/hooks/use-scroll';

interface NavbarContextType {
  isScrolled: boolean;
  scrollY: number;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export function NavbarProvider({ children }: { children: ReactNode }) {
  const { isScrolled, scrollY } = useScroll(50);

  return (
    <NavbarContext.Provider value={{ isScrolled, scrollY }}>
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbar() {
  const context = useContext(NavbarContext);
  if (context === undefined) {
    throw new Error('useNavbar must be used within a NavbarProvider');
  }
  return context;
}