/**
 * Liquid Glass Components & Loading System
 * Exportaciones centralizadas para componentes con efectos Liquid Glass y sistema de loading
 */

// Componentes base
export { GlassCard } from './glass-card';
export { FrostedButton } from './frosted-button';
export { SimpleGlassCard } from './simple-glass-card';
export { SimpleFrostedButton } from './simple-frosted-button';

// Componentes avanzados
export { LiquidCarousel } from './liquid-carousel';
export { LiquidSlider } from './liquid-slider';
export { LiquidAccordion } from './liquid-accordion';
export { LiquidInput } from './liquid-input';

// Sistema de Loading Disruptivo Lab
// FadeLoading elegido como estándar (Ultra lightweight - CPU ~0.5%, Memory <0.3MB)
export { 
  GlobalLoading, 
  PageLoading, 
  ContentLoading, 
  ButtonLoading, 
  SectionLoading 
} from './global-loading';

// Componentes de loading individuales (para casos específicos)
export { FadeLoading, BreatheLoading, FloatLoading, ScaleLoading } from './lightweight-loading';
export { LoadingSpinner } from './loading-spinner';

// Componentes de página
export { PageCTA, QuickContactCTA } from './page-cta';
export { MinimalistLink } from './minimalist-link';