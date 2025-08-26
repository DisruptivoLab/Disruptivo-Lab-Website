/**
 * LiquidCarousel Component
 * Carrusel horizontal tipo App Store/Play Store con efectos Liquid Glass
 * Mobile-first con soporte touch y scroll suave
 */

'use client';

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";

interface LiquidCarouselProps {
  children: React.ReactNode[];
  className?: string;
  itemClassName?: string;
  showArrows?: boolean;
  autoScroll?: boolean;
  scrollInterval?: number;
  gap?: 'sm' | 'md' | 'lg';
}

export function LiquidCarousel({
  children,
  className,
  itemClassName,
  showArrows = true,
  autoScroll = false,
  scrollInterval = 5000,
  gap = 'md'
}: LiquidCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);

  const gapClasses = {
    sm: 'gap-3',
    md: 'gap-4',
    lg: 'gap-6'
  };

  const checkScrollability = useCallback(() => {
    if (!scrollRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  }, []);

  // Scroll suave hacia la izquierda
  const scrollLeft = useCallback(() => {
    if (!scrollRef.current || isScrolling) return;
    
    setIsScrolling(true);
    const scrollAmount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
    
    setTimeout(() => setIsScrolling(false), 300);
  }, [isScrolling]);

  // Scroll suave hacia la derecha
  const scrollRight = useCallback(() => {
    if (!scrollRef.current || isScrolling) return;
    
    setIsScrolling(true);
    const scrollAmount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
    
    setTimeout(() => setIsScrolling(false), 300);
  }, [isScrolling]);

  // Auto scroll
  useEffect(() => {
    if (!autoScroll) return;
    
    const interval = setInterval(() => {
      if (!scrollRef.current) return;
      
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      
      if (scrollLeft >= scrollWidth - clientWidth - 1) {
        // Volver al inicio
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollRight();
      }
    }, scrollInterval);

    return () => clearInterval(interval);
  }, [autoScroll, scrollInterval, scrollRight]);

  // Event listeners
  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    scrollElement.addEventListener('scroll', checkScrollability);
    checkScrollability(); // Check inicial

    return () => {
      scrollElement.removeEventListener('scroll', checkScrollability);
    };
  }, [children, checkScrollability]);

  return (
    <div className={cn("relative group", className)}>
      {/* Botón izquierdo */}
      {showArrows && canScrollLeft && (
        <button
          onClick={scrollLeft}
          className={cn(
            "absolute left-2 top-1/2 -translate-y-1/2 z-20",
            "w-10 h-10 rounded-full",
            "backdrop-blur-[8px] backdrop-saturate-150 border",
            "flex items-center justify-center",
            "transition-all duration-300 ease-in-out",
            "hover:scale-105 active:scale-95",
            "opacity-0 group-hover:opacity-100",
            "md:opacity-100", // Siempre visible en desktop
            // Tema oscuro
            "dark:bg-white/15 dark:border-white/20 dark:hover:bg-white/25",
            // Tema claro
            "light:bg-black/15 light:border-black/20 light:hover:bg-black/25"
          )}
          aria-label="Scroll left"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent rounded-full" />
          <ChevronLeft className="w-5 h-5 relative z-10 dark:text-white light:text-black" />
        </button>
      )}

      {/* Botón derecho */}
      {showArrows && canScrollRight && (
        <button
          onClick={scrollRight}
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 z-20",
            "w-10 h-10 rounded-full",
            "backdrop-blur-[8px] backdrop-saturate-150 border",
            "flex items-center justify-center",
            "transition-all duration-300 ease-in-out",
            "hover:scale-105 active:scale-95",
            "opacity-0 group-hover:opacity-100",
            "md:opacity-100", // Siempre visible en desktop
            // Tema oscuro
            "dark:bg-white/15 dark:border-white/20 dark:hover:bg-white/25",
            // Tema claro
            "light:bg-black/15 light:border-black/20 light:hover:bg-black/25"
          )}
          aria-label="Scroll right"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent rounded-full" />
          <ChevronRight className="w-5 h-5 relative z-10 dark:text-white light:text-black" />
        </button>
      )}

      {/* Container del carrusel */}
      <div
        ref={scrollRef}
        className={cn(
          "flex overflow-x-auto scrollbar-hide",
          "scroll-smooth snap-x snap-mandatory",
          "pb-2", // Espacio para sombras
          gapClasses[gap]
        )}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className={cn(
              "flex-shrink-0 snap-start",
              "w-[280px] sm:w-[320px] md:w-[360px]", // Responsive widths
              itemClassName
            )}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Gradientes de fade en los bordes */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/20 to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/20 to-transparent pointer-events-none z-10" />
    </div>
  );
}