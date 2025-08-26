/**
 * Layout de Página Escalable
 * Componente base para todas las páginas internas con tipografía escalable
 */

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { HeroTitle, Title, Subtitle, BodyText, ScalableContainer } from '@/components/ui/typography';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  containerSpacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | 'full';
}

export function PageLayout({ 
  children, 
  className, 
  containerSpacing = 'lg',
  maxWidth = '6xl' 
}: PageLayoutProps) {
  const maxWidthClass = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    '6xl': 'max-w-6xl',
    full: 'max-w-full'
  }[maxWidth];

  return (
    <main className={cn(
      "min-h-screen pt-20 sm:pt-24 md:pt-28", // Espacio para navbar
      className
    )}>
      <ScalableContainer 
        spacing={containerSpacing}
        className={cn(
          "mx-auto",
          maxWidthClass
        )}
      >
        {children}
      </ScalableContainer>
    </main>
  );
}

// Componente de Hero para páginas internas
interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
}

export function PageHero({ title, subtitle, description, className }: PageHeroProps) {
  return (
    <ScalableContainer 
      spacing="xl" 
      gap="md"
      className={cn("text-center", className)}
    >
      <HeroTitle className="text-foreground">
        {title}
      </HeroTitle>
      
      {subtitle && (
        <Subtitle className="text-muted-foreground">
          {subtitle}
        </Subtitle>
      )}
      
      {description && (
        <BodyText className="text-muted-foreground max-w-3xl mx-auto">
          {description}
        </BodyText>
      )}
    </ScalableContainer>
  );
}

// Componente de Sección para páginas internas
interface PageSectionProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  gap?: 'xs' | 'sm' | 'md' | 'lg';
}

export function PageSection({ 
  title, 
  subtitle, 
  children, 
  className,
  spacing = 'lg',
  gap = 'md'
}: PageSectionProps) {
  return (
    <ScalableContainer 
      spacing={spacing}
      gap={gap}
      className={className}
    >
      {title && (
        <div className="text-center space-y-4">
          <Title className="text-foreground">
            {title}
          </Title>
          {subtitle && (
            <BodyText className="text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </BodyText>
          )}
        </div>
      )}
      
      {children}
    </ScalableContainer>
  );
}

// Grid escalable para contenido
interface ScalableGridProps {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

export function ScalableGrid({ 
  children, 
  columns = 3, 
  gap = 'md',
  className 
}: ScalableGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }[columns];

  const gapClass = {
    xs: 'gap-3 sm:gap-4 md:gap-6',
    sm: 'gap-4 sm:gap-6 md:gap-8',
    md: 'gap-6 sm:gap-8 md:gap-12',
    lg: 'gap-8 sm:gap-12 md:gap-16'
  }[gap];

  return (
    <div className={cn(
      "grid",
      gridCols,
      gapClass,
      className
    )}>
      {children}
    </div>
  );
}