/**
 * Agents Slide Component
 * Segundo slide de la página de inicio - WhatsApp con IA
 */

'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { FrostedButton } from '@/components/ui';
import { HeroTitle, BodyText } from '@/components/ui/typography';
import { useModularTranslation } from '@/contexts/modular-translation-context';
import { SlideProps } from '@/types/slide';

export default function AgentsSlide({
  isActive,
  slideIndex,
  onVideoLoad,
  onVideoError,
  prefersReducedMotion,
  shouldLoadVideo,
  preloadStrategy,
  registerVideoRef
}: SlideProps) {
  const { t } = useModularTranslation();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
    onVideoLoad(slideIndex);
  };

  const handleVideoError = () => {
    setVideoError(true);
    onVideoError(slideIndex);
  };

  // Registrar referencia del video
  useEffect(() => {
    registerVideoRef(slideIndex, videoRef.current);
  }, [registerVideoRef, slideIndex]);

  if (!isActive) return null;

  return (
    <div className="h-screen w-full flex items-center justify-center relative">
      {/* Video Background */}
      <div className="absolute inset-0 -z-10">
        {/* Fallback gradient - visible while loading or on error */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-black transition-opacity duration-1000 ${videoLoaded && !videoError ? 'opacity-0' : 'opacity-100'
            }`}
        />

        {/* Video element - Solo renderizar si debe cargarse */}
        {shouldLoadVideo && (
          <video
            ref={videoRef}
            src="https://firebasestorage.googleapis.com/v0/b/disruptivolabwebsite.firebasestorage.app/o/Agentes%20Con%20Ia%20Para%20Tu%20Negocio.mp4?alt=media&token=5d062031-dfc8-47ae-8a9e-e96b522b8438"
            autoPlay={!prefersReducedMotion && isActive}
            loop
            muted
            playsInline
            preload={preloadStrategy}
            className={`h-full w-full object-cover transition-opacity duration-1000 ${videoLoaded && !videoError ? 'opacity-100' : 'opacity-0'
              }`}
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
          />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Loading indicator */}
        {!videoLoaded && !videoError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Content */}
      <motion.div
        className="container mx-auto flex flex-col items-center text-center px-4 z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <HeroTitle className="text-foreground drop-shadow-2xl mb-4 sm:mb-6">
            {t('agents.title')}
          </HeroTitle>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <BodyText className="max-w-3xl text-foreground drop-shadow-xl mb-6 sm:mb-8 px-4 sm:px-0">
            {t('agents.subtitle')}
          </BodyText>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <a href="https://wa.me/59171155700?text=Hola%20Disruptivo%20Lab,%20quiero%20saber%20m%C3%A1s%20sobre%20agentes%20con%20IA" target="_blank" rel="noopener noreferrer">
            <FrostedButton size="lg" variant="primary">
              {t('agents.cta')}
            </FrostedButton>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}