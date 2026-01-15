'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/contexts/theme-context';
import { useModularTranslation } from '@/contexts/modular-translation-context';
import { HeroTitle, BodyText } from '@/components/ui/typography';
import { ContactModal } from '@/components/ui/contact-modal';
import { cn } from '@/lib/utils';

export default function ParallaxVideoCTA() {
  const { theme } = useTheme();
  const { t, locale, loadModularTranslation } = useModularTranslation();
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const playCountRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null); // Contenedor que escala y se desplaza
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showCue, setShowCue] = useState(true);
  const cueHiddenRef = useRef(false);

  // Cargar las traducciones del módulo cuando cambie el idioma
  useEffect(() => {
    loadModularTranslation('pages/home');
  }, [locale, loadModularTranslation]);

  // Detectar breakpoint para escalas distintas
  useEffect(() => {
    const compute = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  // Lazy play/pause based on intersection
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    let isVisible = false;
    const onIntersection: IntersectionObserverCallback = (entries) => {
      entries.forEach(async (entry) => {
        isVisible = entry.isIntersecting && entry.intersectionRatio > 0.25;
        try {
          if (isVisible) {
            // Reiniciar contador al entrar en vista
            playCountRef.current = 0;
            if (video.paused) {
              await video.play().catch(() => {});
            }
          } else {
            video.pause();
          }
        } catch {}
      });
    };

    const observer = new IntersectionObserver(onIntersection, {
      threshold: [0, 0.25, 0.5, 0.75, 1],
      rootMargin: '200px',
    });
    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Reduce motion respect
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches && videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  // Real parallax y escala: controlado por progreso dentro de una escena sticky
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const wrapper = wrapperRef.current;
    const currentTheme = theme;
    const currentIsMobile = isMobile;
    
    if (!section || !video || !wrapper) return;

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const viewportH = window.innerHeight || document.documentElement.clientHeight;
        const totalScrollable = rect.height - viewportH; // tramo sticky
        const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(totalScrollable, 1));
        const progress = scrolled / Math.max(totalScrollable, 1); // 0..1

        // Parallax: desplazar ligeramente el wrapper en Y alrededor del centro
        const amplitude = 100; // px (más suave)
        const parallaxY = (progress - 0.5) * 2 * amplitude; // -amp..+amp

        // Escalas por breakpoint
        const start = currentIsMobile ? 0.80 : 0.70;
        const mid = 1.00; // snap sutil en el centro
        const end = currentIsMobile ? 0.70 : 0.60;
        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
        const easeInOutSine = (t: number) => 0.5 - 0.5 * Math.cos(Math.PI * t);
        const scale = progress <= 0.5
          ? lerp(start, mid, easeInOutSine(progress / 0.5))
          : lerp(mid, end, easeInOutSine((progress - 0.5) / 0.5));

        wrapper.style.transform = `translateY(${parallaxY}px) scale(${scale})`;

        // Overlay dinamiza un poco el contraste (más intenso al inicio/fin)
        if (overlayRef.current) {
          const edgeIntensity = Math.max(0, Math.abs(progress - 0.5) * 2); // 0..1
          overlayRef.current.style.opacity = String(
            (currentTheme === 'dark' ? 0.5 : 0.4) + edgeIntensity * 0.1
          );
        }

        // Ocultar indicador de scroll cuando el usuario avanza un poco
        if (!cueHiddenRef.current && progress > 0.12) {
          cueHiddenRef.current = true;
          setShowCue(false);
        }
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [theme, isMobile]);

  // Fallback: ocultar el indicador tras unos segundos aunque no haya scroll
  useEffect(() => {
    const timer = window.setTimeout(() => setShowCue(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
  <section ref={sectionRef} className={cn('relative h-[240dvh]', theme === 'dark' ? 'bg-black' : 'bg-white')}>
      {/* Capa sticky con contenedor tipo slide */}
  <div className="sticky top-0 h-[100svh] md:h-[100dvh] flex items-center justify-center">
        <div className="w-[98%] h-[98%] mx-auto my-auto relative">
          {/* Capa que escala y se desplaza para parallax (aplicamos el radio y el ring aquí) */}
          <div
            ref={wrapperRef}
            className="absolute inset-0 will-change-transform rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 ring-1 ring-black/10 dark:ring-white/10 shadow-lg"
          >
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover rounded-2xl"
              src="https://firebasestorage.googleapis.com/v0/b/disruptivolabwebsite.firebasestorage.app/o/Disruptivo%20Lab%20Parallax.mp4?alt=media&token=5c5c1e85-fc44-4b21-97f5-a3bf33ac1624"
              muted
              playsInline
              preload="metadata"
              onEnded={() => {
                const video = videoRef.current;
                if (!video) return;
                if (playCountRef.current < 1) {
                  playCountRef.current += 1; // total 2 reproducciones
                  video.currentTime = 0;
                  video.play().catch(() => {});
                } else {
                  video.pause();
                }
              }}
            />
            {/* Overlay de contraste controlable */}
            <div
              ref={overlayRef}
              className={cn(
                'absolute inset-0 transition-opacity duration-300 pointer-events-none rounded-2xl',
                theme === 'dark' ? 'bg-black opacity-50' : 'bg-white opacity-40'
              )}
            />
          </div>

          {/* Content centrado dentro del contenedor, suavizado */}
          <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-center gap-4 px-6">
            <HeroTitle className={cn('leading-tight font-semibold', 'text-foreground/90')}>
              {t('parallaxCta.title')}
            </HeroTitle>
            <BodyText className={cn('max-w-2xl', 'text-foreground/80')}>
              {t('parallaxCta.subtitle')}
            </BodyText>
            <div>
              <button
                onClick={() => setOpen(true)}
                className={cn('font-poppins font-semibold underline underline-offset-4 text-lg md:text-xl hover:opacity-90 transition-opacity', 'text-foreground')}
              >
                {t('parallaxCta.cta')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador sutil de scroll (mouse) */}
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-500',
          showCue ? 'opacity-90' : 'opacity-0'
        )}
      >
        <div className="flex flex-col items-center gap-2 text-foreground/60">
          <div className="h-7 w-4 rounded-full border border-foreground/40 flex items-start justify-center p-[2px]">
            <div className="h-1 w-1 rounded-full bg-foreground/60 wheel-dot" />
          </div>
        </div>
        <style jsx>{`
          .wheel-dot { animation: wheel 1.6s ease-in-out infinite; }
          @media (prefers-reduced-motion: reduce) { .wheel-dot { animation: none; } }
          @keyframes wheel {
            0% { transform: translateY(0); opacity: .6; }
            50% { transform: translateY(4px); opacity: 1; }
            100% { transform: translateY(0); opacity: .6; }
          }
        `}</style>
      </div>

      <ContactModal isOpen={open} onClose={() => setOpen(false)} />
    </section>
  );
}
