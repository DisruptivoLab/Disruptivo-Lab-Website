/**
 * useScroll Hook
 * Hook personalizado para detectar el estado de scroll
 */

'use client';

import { useState, useEffect } from 'react';

export function useScroll(threshold: number = 50) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > threshold);
    };

    // Llamar inmediatamente para obtener el estado inicial
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return { isScrolled, scrollY };
}