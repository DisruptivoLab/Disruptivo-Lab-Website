/**
 * LiquidGlassControl Component
 * Componente genérico para controles con efectos Liquid Glass (círculos, pequeños)
 */

'use client';

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface LiquidGlassControlProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const LiquidGlassControl = forwardRef<HTMLButtonElement, LiquidGlassControlProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-full",
          "backdrop-blur-[8px] backdrop-saturate-150",
          "[background-color:color-mix(in_srgb,var(--c-glass)_10%,transparent)]", // Fondo sutil
          "border border-[color:color-mix(in_srgb,var(--c-light)_10%,transparent)]", // Borde sutil
          "shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--c-light)_10%,transparent),inset_1.8px_3px_0px_-2px_color-mix(in_srgb,var(--c-light)_90%,transparent),inset_-2px_-2px_0px_-2px_color-mix(in_srgb,var(--c-light)_80%,transparent),inset_-3px_-8px_1px_-6px_color-mix(in_srgb,var(--c-light)_60%,transparent),inset_-0.3px_-1px_4px_0px_color-mix(in_srgb,var(--c-dark)_12%,transparent),inset_-1.5px_2.5px_0px_-2px_color-mix(in_srgb,var(--c-dark)_20%,transparent),inset_0px_3px_4px_-2px_color-mix(in_srgb,var(--c-dark)_20%,transparent),inset_2px_-6.5px_1px_-4px_color-mix(in_srgb,var(--c-dark)_10%,transparent),0px_1px_5px_0px_color-mix(in_srgb,var(--c-dark)_10%,transparent),0px_6px_16px_0px_color-mix(in_srgb,var(--c-dark)_8%,transparent)]", // Sombra compleja
          "transition-all duration-300 ease-in-out",
          "hover:scale-110 active:scale-95",
          "flex items-center justify-center",
          "text-foreground", // Color del texto adaptable al tema
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

LiquidGlassControl.displayName = "LiquidGlassControl";
