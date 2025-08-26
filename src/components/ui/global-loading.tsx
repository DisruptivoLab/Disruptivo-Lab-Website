'use client';

import { FadeLoading } from './lightweight-loading';
import { cn } from '@/lib/utils';

interface GlobalLoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  showText?: boolean;
  className?: string;
  fullScreen?: boolean;
}

/**
 * Componente de loading global optimizado para Disruptivo Lab
 * 
 * Utiliza FadeLoading (Ultra lightweight - CPU ~0.5%, Memory <0.3MB)
 * La opción más eficiente para uso en toda la aplicación.
 * 
 * @param size - Tamaño del loading: sm, md, lg, xl
 * @param text - Texto personalizado (default: "Cargando...")
 * @param showText - Mostrar texto o solo icono
 * @param className - Clases CSS adicionales
 * @param fullScreen - Mostrar en pantalla completa con overlay
 */
export function GlobalLoading({
  size = 'md',
  text = 'Cargando...',
  showText = true,
  className,
  fullScreen = false
}: GlobalLoadingProps) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <FadeLoading 
          size={size} 
          text={text} 
          showText={showText}
        />
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-center p-8", className)}>
      <FadeLoading 
        size={size} 
        text={text} 
        showText={showText}
      />
    </div>
  );
}

// Variantes pre-configuradas para casos específicos
export function PageLoading() {
  return <GlobalLoading size="lg" text="Cargando página..." fullScreen />;
}

export function ContentLoading() {
  return <GlobalLoading size="md" text="Cargando contenido..." />;
}

export function ButtonLoading() {
  return <GlobalLoading size="sm" showText={false} className="p-2" />;
}

export function SectionLoading() {
  return <GlobalLoading size="lg" text="Cargando..." className="min-h-[30vh]" />;
}
