'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface DisruptivoLoadingProps {
  className?: string;
  variant?: 'pulse' | 'spin' | 'morph' | 'glitch' | 'quantum';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  text?: string;
}

// SVG optimizado del icono sin fondo blanco
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

export function DisruptivoLoading({ 
  className, 
  variant = 'pulse', 
  size = 'md',
  showText = true,
  text = 'Cargando...'
}: DisruptivoLoadingProps) {
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
    // PROPUESTA 1: Pulse Suave (Peso: ⭐⭐⭐⭐⭐ - Ultra liviano)
    pulse: {
      container: {
        animate: {
          scale: [1, 1.05, 1],
          opacity: [0.8, 1, 0.8]
        },
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      },
      icon: {
        animate: {
          rotateY: [0, 5, 0, -5, 0]
        },
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    },

    // PROPUESTA 2: Spin Elegante (Peso: ⭐⭐⭐⭐ - Muy liviano)
    spin: {
      container: {
        animate: {
          rotate: 360
        },
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }
      },
      icon: {
        animate: {
          scale: [1, 1.1, 1]
        },
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    },

    // PROPUESTA 3: Morph Disruptivo (Peso: ⭐⭐⭐ - Medio)
    morph: {
      container: {
        animate: {
          scale: [1, 1.2, 0.9, 1],
          rotate: [0, 90, 180, 270, 360]
        },
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }
      },
      icon: {
        animate: {
          skewX: [0, 5, -5, 0],
          skewY: [0, -3, 3, 0]
        },
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    },

    // PROPUESTA 4: Glitch Effect (Peso: ⭐⭐ - Pesado por efectos)
    glitch: {
      container: {
        animate: {
          x: [0, -2, 2, 0],
          y: [0, 1, -1, 0],
          scale: [1, 1.02, 0.98, 1]
        },
        transition: {
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut"
        }
      },
      icon: {
        animate: {
          filter: [
            'hue-rotate(0deg) saturate(1)',
            'hue-rotate(90deg) saturate(1.2)',
            'hue-rotate(180deg) saturate(0.8)',
            'hue-rotate(270deg) saturate(1.1)',
            'hue-rotate(360deg) saturate(1)'
          ]
        },
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }
      }
    },

    // PROPUESTA 5: Quantum Loading (Peso: ⭐ - Muy pesado por partículas)
    quantum: {
      container: {
        animate: {
          scale: [1, 1.15, 1],
          rotate: [0, 180, 360]
        },
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      },
      icon: {
        animate: {
          opacity: [0.7, 1, 0.7],
          filter: [
            'brightness(1) blur(0px)',
            'brightness(1.3) blur(0.5px)',
            'brightness(1) blur(0px)'
          ]
        },
        transition: {
          duration: 1.5,
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
        <motion.div
          animate={currentVariant.icon.animate}
          transition={currentVariant.icon.transition as any}
          className="w-full h-full"
        >
          <DisruptivoIcon className="w-full h-full text-foreground dark:text-white" />
        </motion.div>

        {/* Efectos adicionales para variants específicos */}
        {variant === 'quantum' && (
          <>
            {/* Partículas orbitales */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#de3e1f] rounded-full"
                animate={{
                  rotate: [0, 360],
                  x: [20, -20],
                  y: [20, -20]
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.3
                }}
                style={{
                  transformOrigin: '0 0'
                }}
              />
            ))}
          </>
        )}

        {variant === 'glitch' && (
          <>
            {/* Efectos de glitch con pseudo-elementos */}
            <motion.div
              className="absolute inset-0 w-full h-full"
              animate={{
                opacity: [0, 0.3, 0],
                x: [-1, 1, 0]
              }}
              transition={{
                duration: 0.4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <DisruptivoIcon className="w-full h-full text-red-500 dark:text-red-400 mix-blend-multiply" />
            </motion.div>
            <motion.div
              className="absolute inset-0 w-full h-full"
              animate={{
                opacity: [0, 0.2, 0],
                x: [1, -1, 0]
              }}
              transition={{
                duration: 0.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.1
              }}
            >
              <DisruptivoIcon className="w-full h-full text-blue-500 dark:text-blue-400 mix-blend-multiply" />
            </motion.div>
          </>
        )}
      </motion.div>

      {showText && (
        <motion.p
          className={cn(
            "font-medium text-muted-foreground select-none",
            textSizeClasses[size]
          )}
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
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

// Componentes específicos para cada propuesta
export const PulseLoading = (props: Omit<DisruptivoLoadingProps, 'variant'>) => (
  <DisruptivoLoading {...props} variant="pulse" />
);

export const SpinLoading = (props: Omit<DisruptivoLoadingProps, 'variant'>) => (
  <DisruptivoLoading {...props} variant="spin" />
);

export const MorphLoading = (props: Omit<DisruptivoLoadingProps, 'variant'>) => (
  <DisruptivoLoading {...props} variant="morph" />
);

export const GlitchLoading = (props: Omit<DisruptivoLoadingProps, 'variant'>) => (
  <DisruptivoLoading {...props} variant="glitch" />
);

export const QuantumLoading = (props: Omit<DisruptivoLoadingProps, 'variant'>) => (
  <DisruptivoLoading {...props} variant="quantum" />
);
