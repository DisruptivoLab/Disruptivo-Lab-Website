'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState, useRef, useCallback } from 'react';
import { Play, Pause, ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useVideoOptimization } from '@/hooks/use-video-optimization';
import { useModularTranslation } from '@/contexts/modular-translation-context';
import { useTheme } from '@/contexts/theme-context';
import { ContentLoading } from '@/components/ui/global-loading';

const HeroSlide = dynamic(() => import('@/components/slides/HeroSlide'), { ssr: false });
const AutomationSlide = dynamic(() => import('@/components/slides/AutomationSlide'), { ssr: false });
const ConsultingSlide = dynamic(() => import('@/components/slides/ConsultingSlide'), { ssr: false });
const ProductDevelopmentSlide = dynamic(() => import('@/components/slides/ProductDevelopmentSlide'), { ssr: false });
const AboutSection = dynamic(() => import('@/components/sections/AboutSection'));
const ValidatorAISection = dynamic(() => import('@/components/sections/ValidatorAISection'));
const ConversionSection = dynamic(() => import('@/components/sections/ConversionSection'));
const ParallaxVideoCTA = dynamic(() => import('@/components/sections/ParallaxVideoCTA'));

export default function HomePage() {
  const { loadModularTranslation, isLoading } = useModularTranslation();
  const { theme } = useTheme();

  useEffect(() => {
  loadModularTranslation('components/slides');
  loadModularTranslation('pages/home');
  }, [loadModularTranslation]);
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const slides = [
    { component: HeroSlide, name: 'hero' },
    { component: AutomationSlide, name: 'automation' },
    { component: ConsultingSlide, name: 'consulting' },
    { component: ProductDevelopmentSlide, name: 'product-development' }
  ];

  const totalSlides = slides.length;

  const {
    videoStates,
    handleVideoLoad,
    handleVideoError,
    registerVideoRef,
    getPreloadStrategy,
  } = useVideoOptimization({
    currentSlide,
    totalSlides,
    prefersReducedMotion
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  useEffect(() => {
    if (!isPlaying || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % totalSlides);
    }, 8000);

    return () => clearInterval(interval);
  }, [isPlaying, totalSlides, prefersReducedMotion]);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentSlide) return;
    
    setIsTransitioning(true);
    setCurrentSlide(index);
    
    setTimeout(() => setIsTransitioning(false), 1000);
  }, [currentSlide, isTransitioning]);

  const nextSlide = useCallback(() => {
    const nextIndex = (currentSlide + 1) % totalSlides;
    goToSlide(nextIndex);
  }, [currentSlide, totalSlides, goToSlide]);

  const prevSlide = useCallback(() => {
    const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(prevIndex);
  }, [currentSlide, totalSlides, goToSlide]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const translateYClasses = [
    'translate-y-0',
    '-translate-y-[100dvh]',
    '-translate-y-[200dvh]',
    '-translate-y-[300dvh]'
  ];

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 pointer-events-none opacity-100 transition-opacity duration-500">
          <ContentLoading />
        </div>
      )}
      
      <main
        ref={containerRef}
        className={cn(
          "relative h-[100dvh] w-full overflow-hidden transition-colors duration-300",
          theme === 'dark' ? 'bg-black' : 'bg-white'
        )}
      >
        <div
          className={cn(
            "absolute inset-0 w-full transition-transform duration-1000 ease-in-out h-[400dvh]",
            translateYClasses[currentSlide] || 'translate-y-0'
          )}
          style={{ willChange: 'transform' }}
        >
          {slides.map(({ component: SlideComponent, name }, index) => (
            <div key={name} className="h-[100dvh] w-full flex items-center">
              <div className="w-[98%] h-[98%] mx-auto my-auto flex items-center justify-center">
                <div className="w-full h-full rounded-2xl overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm">
                  <SlideComponent
                    isActive={currentSlide === index}
                    slideIndex={index}
                    onVideoLoad={handleVideoLoad}
                    onVideoError={handleVideoError}
                    prefersReducedMotion={prefersReducedMotion}
                    shouldLoadVideo={videoStates[index]?.shouldLoad || false}
                    preloadStrategy={getPreloadStrategy(index)}
                    registerVideoRef={registerVideoRef}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute inset-0 z-50 pointer-events-none">
          <div className="lg:hidden absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-3 pointer-events-auto">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300",
                  currentSlide === index
                    ? "bg-orange-500 scale-150 shadow-[0_0_15px_rgba(251,146,60,0.8)]"
                    : "bg-foreground/40"
                )}
                aria-label={`Ir al slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 pointer-events-auto">
            <div className="backdrop-blur-[6px] bg-card/20 border border-border/10 rounded-full px-3 py-1.5 lg:px-4 lg:py-2">
              <span className="text-foreground text-xs lg:text-sm font-medium">
                {currentSlide + 1} / {totalSlides}
              </span>
            </div>
            <button
              onClick={togglePlayPause}
              className="lg:hidden w-8 h-8 rounded-full backdrop-blur-[6px] bg-card/20 border border-border/10 flex items-center justify-center transition-all duration-300 active:scale-95"
              aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 text-foreground" />
              ) : (
                <Play className="w-3.5 h-3.5 text-foreground ml-0.5" />
              )}
            </button>
          </div>

          <div className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col gap-2 slide-controls-desktop pointer-events-auto">
            <button
              onClick={togglePlayPause}
              className="w-12 h-12 rounded-full backdrop-blur-[8px] backdrop-saturate-150 bg-card/10 border border-border/20 flex items-center justify-center hover:bg-card/20 transition-all duration-300 hover:scale-110"
              aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-foreground" />
              ) : (
                <Play className="w-5 h-5 text-foreground ml-0.5" />
              )}
            </button>

            <div className="flex flex-col gap-2">
              <button
                onClick={prevSlide}
                disabled={isTransitioning}
                className="w-10 h-10 rounded-full backdrop-blur-[8px] backdrop-saturate-150 bg-card/10 border border-border/20 flex items-center justify-center hover:bg-card/20 transition-all duration-300 hover:scale-110 disabled:opacity-50"
                aria-label="Slide anterior"
              >
                <ChevronUp className="w-4 h-4 text-foreground" />
              </button>

              <button
                onClick={nextSlide}
                disabled={isTransitioning}
                className="w-10 h-10 rounded-full backdrop-blur-[8px] backdrop-saturate-150 bg-card/10 border border-border/20 flex items-center justify-center hover:bg-card/20 transition-all duration-300 hover:scale-110 disabled:opacity-50"
                aria-label="Siguiente slide"
              >
                <ChevronDown className="w-4 h-4 text-foreground" />
              </button>
            </div>
          </div>
        </div>
      </main>

  <AboutSection />
  <ValidatorAISection />
  <ParallaxVideoCTA />
  <ConversionSection />
    </>
  );
}
