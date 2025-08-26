/**
 * LiquidSlider Component
 * Slider con efectos Liquid Glass, touch-friendly y mobile-first
 */

'use client';

import { cn } from "@/lib/utils";
import { useState, useRef, useEffect, useCallback } from "react";

interface LiquidSliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  className?: string;
  disabled?: boolean;
  showValue?: boolean;
  label?: string;
  variant?: 'default' | 'accent';
}

export function LiquidSlider({
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue = min,
  onChange,
  className,
  disabled = false,
  showValue = true,
  label,
  variant = 'default'
}: LiquidSliderProps) {
  const [internalValue, setInternalValue] = useState(value ?? defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const currentValue = value ?? internalValue;
  const percentage = ((currentValue - min) / (max - min)) * 100;

  // Actualizar valor interno cuando cambia el prop value
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const calculateValue = useCallback((clientX: number) => {
    if (!sliderRef.current) return currentValue;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const rawValue = min + percentage * (max - min);
    const steppedValue = Math.round(rawValue / step) * step;
    
    return Math.max(min, Math.min(max, steppedValue));
  }, [currentValue, min, max, step]);

  // Manejar cambio de valor
  const handleValueChange = useCallback((newValue: number) => {
    if (disabled) return;
    
    setInternalValue(newValue);
    onChange?.(newValue);
  }, [disabled, onChange]);

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    
    e.preventDefault();
    setIsDragging(true);
    const newValue = calculateValue(e.clientX);
    handleValueChange(newValue);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || disabled) return;
    
    const newValue = calculateValue(e.clientX);
    handleValueChange(newValue);
  }, [isDragging, disabled, calculateValue, handleValueChange]);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging || disabled) return;
    
    e.preventDefault();
    const touch = e.touches[0];
    const newValue = calculateValue(touch.clientX);
    handleValueChange(newValue);
  }, [isDragging, disabled, calculateValue, handleValueChange]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled) return;
    
    e.preventDefault();
    const touch = e.touches[0];
    const newValue = calculateValue(touch.clientX);
    handleValueChange(newValue);
    setIsDragging(true);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleTouchMove]);

  const trackClasses = cn(
    "relative h-2 rounded-full cursor-pointer",
    "backdrop-blur-sm backdrop-saturate-150 border",
    "transition-all duration-200 ease-in-out",
    // Tema oscuro
    "dark:bg-white/10 dark:border-white/20",
    // Tema claro
    "light:bg-black/10 light:border-black/20",
    disabled ? "opacity-50 cursor-not-allowed" : "dark:hover:bg-white/15 light:hover:bg-black/15"
  );

  const fillClasses = cn(
    "absolute left-0 top-0 h-full rounded-full",
    "transition-all duration-200 ease-in-out",
    variant === 'accent' 
      ? "bg-gradient-to-r from-orange-500/60 to-red-500/40" 
      : "dark:bg-gradient-to-r dark:from-white/30 dark:to-white/20 light:bg-gradient-to-r light:from-black/30 light:to-black/20"
  );

  const thumbClasses = cn(
    "absolute top-1/2 -translate-y-1/2 -translate-x-1/2",
    "w-6 h-6 rounded-full cursor-grab",
    "backdrop-blur-[8px] backdrop-saturate-150 border-2",
    "transition-all duration-200 ease-in-out shadow-lg drop-shadow-lg",
    // Tema oscuro
    "dark:bg-white/20 dark:border-white/30 dark:hover:bg-white/30",
    // Tema claro
    "light:bg-black/20 light:border-black/30 light:hover:bg-black/30",
    "hover:scale-110",
    isDragging ? "scale-110 cursor-grabbing" : "",
    disabled ? "opacity-50 cursor-not-allowed" : ""
  );

  return (
    <div className={cn("w-full space-y-3", className)}>
      {/* Label y valor */}
      {(label || showValue) && (
        <div className="flex justify-between items-center">
          {label && (
            <label className="text-sm font-medium font-heading dark:text-white light:text-black">
              {label}
            </label>
          )}
          {showValue && (
            <span className="text-sm font-mono dark:text-white/70 light:text-black/70">
              {currentValue}
            </span>
          )}
        </div>
      )}

      {/* Slider */}
      <div
        ref={sliderRef}
        className={trackClasses}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Brillo interno del track */}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/5 to-transparent rounded-full" />
        
        {/* Fill */}
        <div
          className={fillClasses}
          style={{ width: `${percentage}%` }}
        >
          {/* Brillo interno del fill */}
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/10 to-transparent rounded-full" />
        </div>

        {/* Thumb */}
        <div
          ref={thumbRef}
          className={thumbClasses}
          style={{ left: `${percentage}%` }}
        >
          {/* Brillo interno del thumb */}
          <div className="absolute inset-0 bg-gradient-to-br from-foreground/20 to-transparent rounded-full" />
        </div>
      </div>

      {/* Indicadores de min/max */}
      <div className="flex justify-between text-xs font-mono dark:text-white/50 light:text-black/50">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}