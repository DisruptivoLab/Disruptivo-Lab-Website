/**
 * Simple Glass Card Component
 * Implementación correcta de Liquid Glass según principios de Apple
 */

import { cn } from "@/lib/utils";

interface SimpleGlassCardProps {
  variant?: 'light' | 'medium' | 'heavy';
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function SimpleGlassCard({ 
  variant = 'medium', 
  children, 
  className,
  hover = false 
}: SimpleGlassCardProps) {
  const baseClasses = "relative overflow-hidden transition-all duration-300 ease-in-out min-h-[180px]";
  
  // Glass Cards: Solo vidrio puro que reacciona al fondo (SIN colores propios)
  const variantClasses = {
    light: cn(
      // Solo transparencia y blur - reacciona al video de fondo
      'backdrop-blur-sm backdrop-saturate-150',
      '[background-color:color-mix(in_srgb,var(--c-glass)_12%,transparent)]',
    ),
    medium: cn(
      // Ejemplo de tu guía: bg-white/10 backdrop-blur-lg backdrop-saturate-150
      'backdrop-blur-[8px] backdrop-saturate-150',
      '[background-color:color-mix(in_srgb,var(--c-glass)_15%,transparent)]',
    ),
    heavy: cn(
      'backdrop-blur-xl backdrop-saturate-180',
      '[background-color:color-mix(in_srgb,var(--c-glass)_20%,transparent)]',
    ),
  };
  
  // Bordes según tu guía: border border-white/20
  const borderClasses = cn(
    'border rounded-2xl shadow-xl drop-shadow-lg',
    'border-white/20 dark:border-white/20'
  );
  
  const hoverClasses = hover 
    ? cn(
        // Siguiendo tu guía: hover:scale-105
        "hover:scale-105 transition-all duration-300 ease-in-out",
        "hover:shadow-2xl hover:shadow-orange-500/20",
        "hover:bg-white/15 hover:border-white/30 dark:hover:bg-white/15 dark:hover:border-white/30"
      )
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
      {/* Brillo interno muy sutil para simular refracción del vidrio */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground/3 to-transparent pointer-events-none" />
      {children}
    </div>
  );
}