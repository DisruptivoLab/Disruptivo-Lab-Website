/**
 * Simple Frosted Button Component
 * Implementación correcta de Liquid Glass según principios de Apple
 */

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface SimpleFrostedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const SimpleFrostedButton = forwardRef<HTMLButtonElement, SimpleFrostedButtonProps>(
  ({ variant = 'primary', size = 'md', children, className, ...props }, ref) => {
    const baseClasses = cn(
      "relative font-medium rounded-2xl border overflow-hidden",
      "transition-all duration-300 ease-in-out",
      "shadow-xl drop-shadow-lg"
    );
    
    const getVariantClasses = () => {
      switch (variant) {
        case 'primary':
          return cn(
            // Siguiendo tu guía exacta: bg-white/10 backdrop-blur-[8px] backdrop-saturate-150
            'backdrop-blur-[8px] backdrop-saturate-150',
            'dark:bg-white/10 light:bg-black/10',
            // Gradiente sutil como en tu ejemplo
            'bg-gradient-to-br from-orange-500/20 to-red-500/10',
            // Borde sutil según tu guía
            'border border-orange-500/30',
            'dark:text-white light:text-black',
            // Hover según tu guía: hover:scale-105, active:scale-95
            'hover:scale-105 active:scale-95',
            'hover:shadow-2xl hover:shadow-orange-500/20'
          );
        case 'secondary':
          return cn(
            // Botón secundario: más sutil, casi como glass card pero con interactividad
            'backdrop-blur-[8px] backdrop-saturate-150',
            'dark:bg-white/10 light:bg-black/10',
            // Gradiente muy sutil para botones secundarios
            'dark:bg-gradient-to-br dark:from-white/8 dark:to-white/3',
            'light:bg-gradient-to-br light:from-black/8 light:to-black/3',
            // Borde según tu guía: border border-white/20
            'border dark:border-white/20 light:border-black/20',
            'dark:text-white light:text-black',
            // Hover según tu guía
            'hover:scale-105 active:scale-95',
            'hover:shadow-lg'
          );
        case 'ghost':
          return cn(
            'bg-transparent border-transparent',
            'dark:text-white light:text-black',
            // Hover con efecto esmerilado según tu guía
            'hover:backdrop-blur-[8px] hover:backdrop-saturate-150',
            'dark:hover:bg-white/10 dark:hover:border-white/20',
            'light:hover:bg-black/10 light:hover:border-black/20',
            'hover:scale-105 active:scale-95',
            'hover:shadow-lg'
          );
        default:
          return '';
      }
    };
    
    const sizeClasses = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg"
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          getVariantClasses(),
          sizeClasses[size],
          "hover:scale-105",
          className
        )}
        {...props}
      >
        {/* Brillo interno sutil para simular refracción */}
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/10 to-transparent pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300" />
        
        <span className="relative z-10 font-heading">
          {children}
        </span>
      </button>
    );
  }
);

SimpleFrostedButton.displayName = "SimpleFrostedButton";