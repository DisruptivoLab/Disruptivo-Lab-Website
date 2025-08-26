/**
 * Tokens de Diseño para Disruptivo Lab
 * Basado en los principios de Liquid Glass y la identidad de marca
 */

export const designTokens = {
  colors: {
    // Colores adaptativos por tema
    dark: {
      background: '#121212',
      text: '#FFFFFF',
      accent: '#FF4500',
      gray: {
        100: '#1a1a1a',
        200: '#2a2a2a',
        300: '#3a3a3a'
      }
    },
    light: {
      background: '#FFFFFF',
      text: '#121212',
      accent: '#FF4500',
      gray: {
        100: '#f5f5f5',
        200: '#e5e5e5',
        300: '#d4d4d4'
      }
    }
  },
  typography: {
    fonts: {
      heading: 'JetBrains Mono',
      body: 'Poppins'
    },
    weights: {
      regular: 400,
      medium: 500,
      bold: 700
    },
    // Sistema de tipografía escalable
    scale: {
      // Títulos principales (H1)
      hero: {
        mobile: 'text-2xl sm:text-3xl font-bold',
        tablet: 'md:text-5xl',
        desktop: 'lg:text-6xl xl:text-7xl'
      },
      // Títulos secundarios (H2)
      title: {
        mobile: 'text-xl sm:text-2xl font-bold',
        tablet: 'md:text-4xl',
        desktop: 'lg:text-5xl xl:text-6xl'
      },
      // Títulos terciarios (H3)
      subtitle: {
        mobile: 'text-base sm:text-lg font-semibold',
        tablet: 'md:text-xl',
        desktop: 'lg:text-2xl xl:text-3xl'
      },
      // Texto de cuerpo
      body: {
        mobile: 'text-sm sm:text-base',
        tablet: 'md:text-lg',
        desktop: 'lg:text-xl'
      },
      // Texto pequeño
      caption: {
        mobile: 'text-xs sm:text-sm',
        tablet: 'md:text-base',
        desktop: 'lg:text-lg'
      },
      // Botones
      button: {
        mobile: 'text-sm sm:text-base font-medium',
        tablet: 'md:text-lg',
        desktop: 'lg:text-xl'
      }
    }
  },
  spacing: {
    // Sistema de espaciado escalable
    scale: {
      // Márgenes y padding
      xs: 'p-2 sm:p-3 md:p-4',
      sm: 'p-3 sm:p-4 md:p-6',
      md: 'p-4 sm:p-6 md:p-8',
      lg: 'p-6 sm:p-8 md:p-12',
      xl: 'p-8 sm:p-12 md:p-16',
      
      // Gaps
      gapXs: 'gap-2 sm:gap-3 md:gap-4',
      gapSm: 'gap-3 sm:gap-4 md:gap-6',
      gapMd: 'gap-4 sm:gap-6 md:gap-8',
      gapLg: 'gap-6 sm:gap-8 md:gap-12',
      
      // Márgenes verticales
      marginY: {
        xs: 'my-2 sm:my-3 md:my-4',
        sm: 'my-3 sm:my-4 md:my-6',
        md: 'my-4 sm:my-6 md:my-8',
        lg: 'my-6 sm:my-8 md:my-12'
      }
    }
  },
  liquidGlass: {
    // Efectos adaptativos por tema
    dark: {
      frosted: {
        light: 'bg-white/4 backdrop-blur-[6px] backdrop-saturate-150',
        medium: 'bg-white/6 backdrop-blur-[8px] backdrop-saturate-150', 
        heavy: 'bg-white/8 backdrop-blur-[12px] backdrop-saturate-180'
      },
      gradients: {
        subtle: 'bg-gradient-to-br from-white/10 to-white/5',
        accent: 'bg-gradient-to-br from-orange-500/20 to-red-500/10',
        depth: 'bg-gradient-to-b from-white/15 via-white/10 to-white/5'
      },
      borders: {
        glass: 'border border-white/20 rounded-3xl',
        pill: 'border border-white/20 rounded-full',
        subtle: 'border border-white/10 rounded-2xl',
        natural: 'border border-white/15 rounded-[2rem]'
      }
    },
    light: {
      frosted: {
        light: 'bg-black/4 backdrop-blur-[6px] backdrop-saturate-150',
        medium: 'bg-black/6 backdrop-blur-[8px] backdrop-saturate-150', 
        heavy: 'bg-black/8 backdrop-blur-[12px] backdrop-saturate-180'
      },
      gradients: {
        subtle: 'bg-gradient-to-br from-black/10 to-black/5',
        accent: 'bg-gradient-to-br from-orange-500/20 to-red-500/10',
        depth: 'bg-gradient-to-b from-black/15 via-black/10 to-black/5'
      },
      borders: {
        glass: 'border border-black/20 rounded-3xl',
        pill: 'border border-black/20 rounded-full',
        subtle: 'border border-black/10 rounded-2xl',
        natural: 'border border-black/15 rounded-[2rem]'
      }
    },
    // Sombras y transiciones (comunes)
    shadows: {
      glass: 'shadow-xl drop-shadow-lg',
      inner: 'shadow-inner',
      glow: 'shadow-2xl shadow-orange-500/20',
      natural: 'shadow-2xl shadow-black/10 drop-shadow-xl'
    },
    transitions: {
      smooth: 'transition-all duration-300 ease-in-out',
      elastic: 'transition-all duration-500 ease-out',
      quick: 'transition-all duration-200 ease-in-out',
      organic: 'transition-all duration-400 cubic-bezier(0.4, 0, 0.2, 1)'
    },
    // Nuevos tokens para diseño natural
    natural: {
      radius: {
        sm: 'rounded-xl',
        md: 'rounded-2xl', 
        lg: 'rounded-3xl',
        xl: 'rounded-[2rem]',
        pill: 'rounded-full'
      },
      padding: {
        pill: 'px-8 py-4',
        natural: 'px-6 py-3',
        generous: 'px-10 py-5'
      },
      spacing: {
        organic: 'gap-6',
        flowing: 'gap-8',
        natural: 'gap-4'
      }
    }
  }
} as const;

export type DesignTokens = typeof designTokens;