/**
 * Modern Hamburger Menu Component
 * Menú hamburguesa moderno con animaciones suaves
 */

'use client';

import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/theme-context";

interface HamburgerMenuProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export function HamburgerMenu({ isOpen, onClick, className }: HamburgerMenuProps) {
  const { theme } = useTheme();
  
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex flex-col justify-center items-center rounded-full",
        "focus:outline-none focus:ring-2 focus:ring-orange-400/50",
        "transition-all duration-500 ease-out",
        "hover:scale-110 active:scale-95 hover:bg-white/25 dark:hover:bg-white/15",
        // Liquid Glass background más sutil
        "backdrop-blur-[8px] backdrop-saturate-150",
        "bg-white/20 dark:bg-white/15 border border-white/30 dark:border-white/20",
        "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15),inset_2px_4px_0px_-2px_rgba(255,255,255,0.9),inset_-2px_-2px_0px_-2px_rgba(255,255,255,0.8),inset_-4px_-10px_2px_-6px_rgba(255,255,255,0.6),inset_-0.5px_-1px_6px_0px_rgba(0,0,0,0.1),inset_-2px_3px_0px_-2px_rgba(0,0,0,0.2),inset_0px_4px_6px_-2px_rgba(0,0,0,0.2),inset_3px_-8px_2px_-4px_rgba(0,0,0,0.1),0px_2px_8px_0px_rgba(0,0,0,0.1),0px_8px_20px_0px_rgba(0,0,0,0.08)]",
        className
      )}
      aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
    >
      {/* Línea superior */}
      <span
        className={cn(
          "block absolute h-0.5 w-3.5 sm:w-4 md:w-5 rounded-full",
          theme === 'dark' ? 'bg-white' : 'bg-black',
          "transition-all duration-500 ease-out",
          "shadow-sm drop-shadow-sm",
          isOpen 
            ? "rotate-45 translate-y-0" 
            : "-translate-y-1 sm:-translate-y-1.5"
        )}
      />
      
      {/* Línea media */}
      <span
        className={cn(
          "block absolute h-0.5 w-3.5 sm:w-4 md:w-5 rounded-full",
          theme === 'dark' ? 'bg-white' : 'bg-black',
          "transition-all duration-500 ease-out",
          "shadow-sm drop-shadow-sm",
          
          isOpen 
            ? "opacity-0 scale-0 rotate-180" 
            : "opacity-100 scale-100 rotate-0"
        )}
      />
      
      {/* Línea inferior */}
      <span
        className={cn(
          "block absolute h-0.5 w-3.5 sm:w-4 md:w-5 rounded-full",
          theme === 'dark' ? 'bg-white' : 'bg-black',
          "transition-all duration-500 ease-out",
          "shadow-sm drop-shadow-sm",
          isOpen 
            ? "-rotate-45 translate-y-0" 
            : "translate-y-1 sm:translate-y-1.5"
        )}
      />
    </button>
  );
}