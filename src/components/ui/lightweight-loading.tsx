'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface LightweightLoadingProps {
  className?: string;
  variant?: 'breathe' | 'float' | 'fade' | 'scale';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  text?: string;
}

// SVG optimizado del icono sin fondo blanco (misma versión)
const DisruptivoIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 375 375"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Rectángulo superior */}
    <rect x="177.5" y="65" width="30" height="134" fill="currentColor" />
    
    {/* Semicírculo grande negro */}
    <path
      d="M207.6 107.2C157 107.2 116.1 148.4 116.1 199.1C116.1 249.9 157 291.1 207.6 291.1Z"
      fill="currentColor"
    />
    
    {/* Semicírculo blanco interior */}
    <path
      d="M199.9 122.7C157.7 122.7 123.6 156.8 123.6 199C123.6 241.1 157.7 275.3 199.9 275.3Z"
      fill="var(--loading-bg, white)"
    />
    
    {/* Rectángulo pequeño blanco */}
    <rect x="186.2" y="75.9" width="13.7" height="56.1" fill="var(--loading-bg, white)" />
    
    {/* Cuarto de círculo negro */}
    <path
      d="M207 278.3V188.3H117C117 238 157.3 278.3 207 278.3Z"
      fill="currentColor"
    />
    
    {/* Rombo rojo característico */}
    <path
      d="M156 239.8L207.5 188.3L259.2 240L207.7 291.6L156 239.8Z"
      fill="#de3e1f"
    />
  </svg>
);

export function LightweightLoading({ 
  className, 
  variant = 'breathe', 
  size = 'md',
  showText = true,
  text = 'Cargando...'
}: LightweightLoadingProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  };

  const variants = {
    // VARIANTE 1: Breathe - Respiración suave (Peso: ⭐⭐⭐⭐⭐⭐ - Ultra ultra liviano)
    breathe: {
      container: {
        animate: {
          scale: [1, 1.03, 1],
          opacity: [0.9, 1, 0.9]
        },
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      },
      icon: {
        animate: undefined,
        transition: undefined
      }
    },

    // VARIANTE 2: Float - Flotación vertical (Peso: ⭐⭐⭐⭐⭐⭐ - Ultra ultra liviano)
    float: {
      container: {
        animate: {
          y: [0, -3, 0],
          opacity: [0.85, 1, 0.85]
        },
        transition: {
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }
      },
      icon: {
        animate: undefined,
        transition: undefined
      }
    },

    // VARIANTE 3: Fade - Desvanecimiento gradual (Peso: ⭐⭐⭐⭐⭐⭐ - Ultra ultra liviano)
    fade: {
      container: {
        animate: {
          opacity: [0.4, 1, 0.4]
        },
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      },
      icon: {
        animate: undefined,
        transition: undefined
      }
    },

    // VARIANTE 4: Scale - Escala mínima (Peso: ⭐⭐⭐⭐⭐⭐ - Ultra ultra liviano)
    scale: {
      container: {
        animate: {
          scale: [0.98, 1.02, 0.98]
        },
        transition: {
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut"
        }
      },
      icon: {
        animate: {
          opacity: [0.8, 1, 0.8]
        },
        transition: {
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    }
  };

  const currentVariant = variants[variant];

  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <motion.div
        className={cn(
          "relative flex items-center justify-center",
          sizeClasses[size]
        )}
        animate={currentVariant.container.animate}
        transition={currentVariant.container.transition as any}
        style={{
          '--loading-bg': 'var(--background)',
        } as any}
      >
        {currentVariant.icon.animate ? (
          <motion.div
            animate={currentVariant.icon.animate}
            transition={currentVariant.icon.transition as any}
            className="w-full h-full"
          >
            <DisruptivoIcon className="w-full h-full text-foreground dark:text-white" />
          </motion.div>
        ) : (
          <div className="w-full h-full">
            <DisruptivoIcon className="w-full h-full text-foreground dark:text-white" />
          </div>
        )}
      </motion.div>

      {showText && (
        <motion.p
          className={cn(
            "font-medium text-muted-foreground select-none",
            textSizeClasses[size]
          )}
          animate={{
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}

// Componentes específicos para cada variante lightweight
export const BreatheLoading = (props: Omit<LightweightLoadingProps, 'variant'>) => (
  <LightweightLoading {...props} variant="breathe" />
);

export const FloatLoading = (props: Omit<LightweightLoadingProps, 'variant'>) => (
  <LightweightLoading {...props} variant="float" />
);

export const FadeLoading = (props: Omit<LightweightLoadingProps, 'variant'>) => (
  <LightweightLoading {...props} variant="fade" />
);

export const ScaleLoading = (props: Omit<LightweightLoadingProps, 'variant'>) => (
  <LightweightLoading {...props} variant="scale" />
);
