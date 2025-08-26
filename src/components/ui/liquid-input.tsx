/**
 * LiquidInput Component
 * Input con efectos Liquid Glass, estados focus/error y mobile-first
 */

'use client';

import { cn } from "@/lib/utils";
import { forwardRef, useState } from "react";
import { Eye, EyeOff, AlertCircle, Check } from "lucide-react";

interface LiquidInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
  variant?: 'default' | 'filled';
  inputSize?: 'sm' | 'md' | 'lg';
  showPasswordToggle?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const LiquidInput = forwardRef<HTMLInputElement, LiquidInputProps>(
  ({
    label,
    error,
    success,
    helperText,
    variant = 'default',
    inputSize = 'md',
    showPasswordToggle = false,
    leftIcon,
    rightIcon,
    type = 'text',
    className,
    disabled,
    ...props
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue);

    const inputType = showPasswordToggle && type === 'password' 
      ? (showPassword ? 'text' : 'password')
      : type;

    const sizeClasses = {
      sm: 'h-10 px-3 text-sm',
      md: 'h-12 px-4 text-base',
      lg: 'h-14 px-5 text-lg'
    };

    const containerClasses = cn(
      "relative transition-all duration-300 ease-in-out",
      className
    );

    const inputWrapperClasses = cn(
      "relative overflow-hidden rounded-2xl transition-all duration-300 ease-in-out",
      "backdrop-blur-lg backdrop-saturate-150",
      // Base styles - tema oscuro
      variant === 'filled' 
        ? "dark:bg-white/15 light:bg-black/15" 
        : "dark:bg-white/10 light:bg-black/10",
      // Border states
      error 
        ? "border-2 border-red-500/50" 
        : success 
        ? "border-2 border-green-500/50"
        : isFocused 
        ? "border-2 border-orange-500/50" 
        : "border dark:border-white/20 light:border-black/20",
      // Hover states
      !disabled && !error && !success && "dark:hover:border-white/30 dark:hover:bg-white/15 light:hover:border-black/30 light:hover:bg-black/15",
      // Disabled state
      disabled && "opacity-50 cursor-not-allowed"
    );

    const inputClasses = cn(
      "w-full bg-transparent outline-none transition-all duration-200 ease-in-out",
      "font-body relative z-10",
      // Tema oscuro y claro
      "dark:text-white dark:placeholder:text-white/50",
      "light:text-black light:placeholder:text-black/50",
      sizeClasses[inputSize],
      leftIcon && "pl-12",
      (rightIcon || showPasswordToggle || error || success) && "pr-12",
      disabled && "cursor-not-allowed"
    );

    const labelClasses = cn(
      "absolute left-4 transition-all duration-300 ease-in-out pointer-events-none",
      "font-heading font-medium z-10",
      // Label positioning
      isFocused || hasValue
        ? "top-2 text-xs transform -translate-y-0"
        : inputSize === 'sm'
        ? "top-2.5 text-sm"
        : inputSize === 'md'
        ? "top-3 text-base"
        : "top-4 text-lg",
      // Label colors
      error 
        ? "text-red-400" 
        : success 
        ? "text-green-400"
        : isFocused 
        ? "text-orange-400" 
        : "dark:text-white/70 light:text-black/70",
      leftIcon && "left-12"
    );

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length > 0);
      props.onChange?.(e);
    };

    return (
      <div className={containerClasses}>
        {/* Input wrapper */}
        <div className={inputWrapperClasses}>
          {/* Brillo interno */}
          <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent pointer-events-none" />
          
          {/* Left icon */}
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 dark:text-white/70 light:text-black/70">
              {leftIcon}
            </div>
          )}

          {/* Label flotante */}
          {label && (
            <label className={labelClasses}>
              {label}
            </label>
          )}

          {/* Input */}
          <input
            ref={ref}
            type={inputType}
            className={inputClasses}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            disabled={disabled}
            {...props}
          />

          {/* Right icons */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 z-10">
            {/* Error icon */}
            {error && (
              <AlertCircle className="w-5 h-5 text-red-400" />
            )}
            
            {/* Success icon */}
            {success && (
              <Check className="w-5 h-5 text-green-400" />
            )}
            
            {/* Custom right icon */}
            {rightIcon && !error && !success && (
              <div className="dark:text-white/70 light:text-black/70">
                {rightIcon}
              </div>
            )}
            
            {/* Password toggle */}
            {showPasswordToggle && type === 'password' && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="transition-colors duration-200 dark:text-white/70 dark:hover:text-white light:text-black/70 light:hover:text-black"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Helper text, error, or success message */}
        {(error || success || helperText) && (
          <div className="mt-2 px-1">
            {error && (
              <p className="text-sm text-red-400 font-body flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </p>
            )}
            {success && !error && (
              <p className="text-sm text-green-400 font-body flex items-center gap-2">
                <Check className="w-4 h-4 flex-shrink-0" />
                {success}
              </p>
            )}
            {helperText && !error && !success && (
              <p className="text-sm font-body dark:text-white/50 light:text-black/50">
                {helperText}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

LiquidInput.displayName = "LiquidInput";