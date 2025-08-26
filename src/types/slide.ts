/**
 * Tipos e interfaces comunes para el sistema de slides
 */

export interface SlideProps {
  isActive: boolean;
  slideIndex: number;
  onVideoLoad: (index: number) => void;
  onVideoError: (index: number) => void;
  prefersReducedMotion: boolean;
  shouldLoadVideo: boolean;
  preloadStrategy: 'none' | 'metadata' | 'auto';
  registerVideoRef: (index: number, ref: HTMLVideoElement | null) => void;
}

export interface VideoSlideProps extends SlideProps {
  videoSrc: string;
  fallbackGradient: string;
}