/**
 * GlassCard Component
 * Componente base con efectos Liquid Glass reutilizable y adaptativo a temas
 */

import { cn } from "@/lib/utils";

interface GlassCardProps {
  variant?: 'light' | 'medium' | 'heavy';
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({
  variant = 'medium',
  children,
  className,
  hover = false
}: GlassCardProps) {
  const baseClasses = "relative overflow-hidden transition-all duration-500 ease-out min-h-[180px]";

  // Clases adaptativas con diseño más natural
  const variantClasses = {
    light: cn(
      'backdrop-blur-[6px] backdrop-saturate-150',
      '[background-color:color-mix(in_srgb,var(--c-glass)_6%,transparent)] dark:[background-color:color-mix(in_srgb,var(--c-glass)_4%,transparent)]',
      'shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),0px_2px_8px_0px_rgba(0,0,0,0.06)]'
    ),
    medium: cn(
      'backdrop-blur-[8px] backdrop-saturate-150',
      '[background-color:color-mix(in_srgb,var(--c-glass)_8%,transparent)] dark:[background-color:color-mix(in_srgb,var(--c-glass)_6%,transparent)]',
      'shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),inset_2px_4px_0px_-2px_rgba(255,255,255,0.85),inset_-2px_-2px_0px_-2px_rgba(255,255,255,0.75),inset_-4px_-10px_2px_-6px_rgba(255,255,255,0.55),inset_-0.5px_-1px_6px_0px_rgba(0,0,0,0.08),inset_-2px_3px_0px_-2px_rgba(0,0,0,0.15),inset_0px_4px_6px_-2px_rgba(0,0,0,0.15),inset_3px_-8px_2px_-4px_rgba(0,0,0,0.08),0px_2px_8px_0px_rgba(0,0,0,0.08),0px_8px_20px_0px_rgba(0,0,0,0.06)]'
    ),
    heavy: cn(
      'backdrop-blur-[12px] backdrop-saturate-180',
      '[background-color:color-mix(in_srgb,var(--c-glass)_12%,transparent)] dark:[background-color:color-mix(in_srgb,var(--c-glass)_8%,transparent)]',
      'shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12),inset_3px_6px_0px_-2px_rgba(255,255,255,0.9),inset_-3px_-3px_0px_-2px_rgba(255,255,255,0.8),inset_-6px_-12px_3px_-6px_rgba(255,255,255,0.6),inset_-1px_-2px_8px_0px_rgba(0,0,0,0.12),inset_-3px_4px_0px_-2px_rgba(0,0,0,0.2),inset_0px_6px_8px_-2px_rgba(0,0,0,0.2),inset_4px_-10px_3px_-4px_rgba(0,0,0,0.12),0px_4px_12px_0px_rgba(0,0,0,0.12),0px_12px_24px_0px_rgba(0,0,0,0.08)]'
    ),
  };

  const borderClasses = "rounded-3xl";

  const hoverClasses = hover
    ? "hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(251,146,60,0.15)] hover:-translate-y-2"
    : "";

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        borderClasses,
        hoverClasses,
        "text-foreground", // Añadido para forzar el color del texto
        className
      )}
    >
      {/* Brillo interno más sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/3 to-transparent pointer-events-none rounded-3xl" />
      {children}
    </div>
  );
}