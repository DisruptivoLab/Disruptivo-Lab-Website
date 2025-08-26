/**
 * FrostedButton Component
 * Botón con efectos Liquid Glass y microinteracciones adaptativo a temas
 */

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { ButtonText } from "@/components/ui/typography";

interface FrostedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const FrostedButton = forwardRef<HTMLButtonElement, FrostedButtonProps>(
  ({ variant = 'primary', size = 'md', children, className, ...props }, ref) => {
    const baseClasses = "relative font-medium rounded-full border-0 transition-all duration-500 ease-out overflow-hidden";
    
  const getVariantClasses = () => {
      switch (variant) {
        case 'primary':
          return cn(
            'backdrop-blur-[8px] backdrop-saturate-150',
            'bg-orange-500/15 font-bold',
            'hover:bg-orange-500/25 hover:shadow-[0_8px_32px_rgba(251,146,60,0.3)]',
            'active:scale-95',
            'shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),inset_2px_4px_0px_-2px_rgba(255,255,255,0.85),inset_-2px_-2px_0px_-2px_rgba(255,255,255,0.75),inset_-4px_-10px_2px_-6px_rgba(255,255,255,0.55),inset_-0.5px_-1px_6px_0px_rgba(0,0,0,0.08),inset_-2px_3px_0px_-2px_rgba(0,0,0,0.15),inset_0px_4px_6px_-2px_rgba(0,0,0,0.15),inset_3px_-8px_2px_-4px_rgba(0,0,0,0.08),0px_2px_8px_0px_rgba(0,0,0,0.08),0px_8px_20px_0px_rgba(0,0,0,0.06)]'
          );
        case 'secondary':
          return cn(
            'backdrop-blur-[8px] backdrop-saturate-150',
            'bg-white/8 dark:bg-white/6',
            'hover:bg-white/12 dark:hover:bg-white/10',
            'active:scale-95',
            'shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),inset_2px_4px_0px_-2px_rgba(255,255,255,0.85),inset_-2px_-2px_0px_-2px_rgba(255,255,255,0.75),inset_-4px_-10px_2px_-6px_rgba(255,255,255,0.55),inset_-0.5px_-1px_6px_0px_rgba(0,0,0,0.08),inset_-2px_3px_0px_-2px_rgba(0,0,0,0.15),inset_0px_4px_6px_-2px_rgba(0,0,0,0.15),inset_3px_-8px_2px_-4px_rgba(0,0,0,0.08),0px_2px_8px_0px_rgba(0,0,0,0.08),0px_8px_20px_0px_rgba(0,0,0,0.06)]'
          );
        case 'ghost':
          return cn(
            'bg-transparent border-transparent',
            'hover:bg-white/8 dark:hover:bg-white/6',
            'hover:backdrop-blur-[8px] hover:backdrop-saturate-150',
            'hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),0px_2px_8px_0px_rgba(0,0,0,0.08)]',
            'active:scale-95'
          );
        case 'glass':
          // Variante Liquid Glass neutra (sin color)
          return cn(
            'backdrop-blur-[12px] backdrop-saturate-150',
            'bg-white/10 dark:bg-white/6',
            'active:scale-95',
            // Borde/relieve interno para efecto vidrio
            'shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14),inset_2px_4px_0px_-2px_rgba(255,255,255,0.85),inset_-2px_-2px_0px_-2px_rgba(255,255,255,0.55),inset_-6px_-14px_8px_-8px_rgba(0,0,0,0.10),0px_4px_22px_rgba(0,0,0,0.08)]'
          );
        default:
          return '';
      }
    };
    
    const sizeClasses = {
      sm: "px-4 py-2 text-xs sm:px-6 sm:py-2.5 sm:text-sm",
      md: "px-5 py-2.5 text-sm sm:px-8 sm:py-3 sm:text-base",
      lg: "px-6 py-3 text-sm sm:px-10 sm:py-4 sm:text-base md:px-12 md:py-5 md:text-lg"
    };
    
    const hoverEffects = "hover:scale-105 active:scale-95";

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          getVariantClasses(),
          sizeClasses[size],
          hoverEffects,
          className
        )}
        {...props}
      >
        {/* Brillo interno */}
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/10 to-transparent pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300" />
        
        <ButtonText className="relative z-10">
          {children}
        </ButtonText>
      </button>
    );
  }
);

FrostedButton.displayName = "FrostedButton";