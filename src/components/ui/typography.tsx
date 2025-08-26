/**
 * Componentes de Tipografía Escalables
 * Sistema unificado de tipografía para toda la aplicación
 */

import { cn } from "@/lib/utils";
import { designTokens } from "@/constants/design-tokens";
import { ReactNode } from "react";

interface TypographyProps {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

// Título Hero (H1) - Para slides y páginas principales
export function HeroTitle({ children, className, as: Component = 'h1' }: TypographyProps) {
  return (
    <Component className={cn(
      "font-heading font-bold tracking-tight",
      designTokens.typography.scale.hero.mobile,
      designTokens.typography.scale.hero.tablet,
      designTokens.typography.scale.hero.desktop,
      className
    )}>
      {children}
    </Component>
  );
}

// Título Principal (H2) - Para secciones importantes
export function Title({ children, className, as: Component = 'h2' }: TypographyProps) {
  return (
    <Component className={cn(
      "font-heading font-bold tracking-tight",
      designTokens.typography.scale.title.mobile,
      designTokens.typography.scale.title.tablet,
      designTokens.typography.scale.title.desktop,
      className
    )}>
      {children}
    </Component>
  );
}

// Subtítulo (H3) - Para subsecciones
export function Subtitle({ children, className, as: Component = 'h3' }: TypographyProps) {
  return (
    <Component className={cn(
      "font-heading font-semibold tracking-tight text-balance overflow-hidden text-ellipsis whitespace-normal max-w-full",
      designTokens.typography.scale.subtitle.mobile,
      designTokens.typography.scale.subtitle.tablet,
      designTokens.typography.scale.subtitle.desktop,
      className
    )}>
      {children}
    </Component>
  );
}

// Texto de Cuerpo - Para párrafos y contenido general
export function BodyText({ children, className, as: Component = 'p' }: TypographyProps) {
  return (
    <Component className={cn(
      "font-body font-normal leading-normal text-balance overflow-hidden text-ellipsis whitespace-normal",
      designTokens.typography.scale.body.mobile,
      designTokens.typography.scale.body.tablet,
      designTokens.typography.scale.body.desktop,
      className
    )}>
      {children}
    </Component>
  );
}

// Texto Pequeño - Para captions, notas, etc.
export function Caption({ children, className, as: Component = 'span' }: TypographyProps) {
  return (
    <Component className={cn(
      "font-body font-normal",
      designTokens.typography.scale.caption.mobile,
      designTokens.typography.scale.caption.tablet,
      designTokens.typography.scale.caption.desktop,
      className
    )}>
      {children}
    </Component>
  );
}

// Texto de Botón - Para elementos interactivos
export function ButtonText({ children, className, as: Component = 'span' }: TypographyProps) {
  return (
    <Component className={cn(
      "font-heading font-medium tracking-tight text-[color:var(--c-content)]",
      designTokens.typography.scale.button.mobile,
      designTokens.typography.scale.button.tablet,
      designTokens.typography.scale.button.desktop,
      className
    )}>
      {children}
    </Component>
  );
}

// Contenedor con espaciado escalable
interface ContainerProps extends TypographyProps {
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  gap?: 'xs' | 'sm' | 'md' | 'lg';
}

export function ScalableContainer({ 
  children, 
  className, 
  spacing = 'md',
  gap = 'md',
  as: Component = 'div' 
}: ContainerProps) {
  const spacingClass = designTokens.spacing.scale[spacing];
  const gapClass = designTokens.spacing.scale[`gap${gap.charAt(0).toUpperCase() + gap.slice(1)}` as keyof typeof designTokens.spacing.scale];
  
  return (
    <Component className={cn(
      "flex flex-col",
      spacingClass,
      gapClass,
      className
    )}>
      {children}
    </Component>
  );
}

// Hook para obtener clases de tipografía
export function useTypographyClasses() {
  return {
    hero: cn(
      "font-heading font-bold tracking-tight",
      designTokens.typography.scale.hero.mobile,
      designTokens.typography.scale.hero.tablet,
      designTokens.typography.scale.hero.desktop
    ),
    title: cn(
      "font-heading font-bold tracking-tight",
      designTokens.typography.scale.title.mobile,
      designTokens.typography.scale.title.tablet,
      designTokens.typography.scale.title.desktop
    ),
    subtitle: cn(
      "font-heading font-semibold tracking-tight",
      designTokens.typography.scale.subtitle.mobile,
      designTokens.typography.scale.subtitle.tablet,
      designTokens.typography.scale.subtitle.desktop
    ),
    body: cn(
      "font-body font-normal leading-relaxed",
      designTokens.typography.scale.body.mobile,
      designTokens.typography.scale.body.tablet,
      designTokens.typography.scale.body.desktop
    ),
    caption: cn(
      "font-body font-normal",
      designTokens.typography.scale.caption.mobile,
      designTokens.typography.scale.caption.tablet,
      designTokens.typography.scale.caption.desktop
    ),
    button: cn(
      "font-heading font-medium tracking-tight",
      designTokens.typography.scale.button.mobile,
      designTokens.typography.scale.button.tablet,
      designTokens.typography.scale.button.desktop
    )
  };
}