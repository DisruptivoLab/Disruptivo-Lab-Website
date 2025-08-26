"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Title } from '@/components/ui/typography';
import { MinimalistLink } from '@/components/ui';
import { useModularTranslation } from '@/contexts/modular-translation-context';
import { ChevronLeft, ChevronRight, ShieldCheck, Clock, Handshake } from 'lucide-react';
import { FrostedButton } from '@/components/ui/frosted-button';
import { useRouter } from 'next/navigation';
import { ContactModal } from '@/components/ui/contact-modal';

type Card = { slug: string; title: string; desc?: string; video: string };

export default function ServicesPage() {
  const { t, get, loadModularTranslation } = useModularTranslation();
  const router = useRouter();
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [idx, setIdx] = useState(0);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    loadModularTranslation('pages/services-landing');
  }, [loadModularTranslation]);

  const cards: Card[] = useMemo(() => {
    // Videos provisionales del repositorio (puedes reemplazarlos luego)
    const videos = [
  '/media/Identidad/agentes_con_ia_para_tu_negocio.mp4',
  // Con espacios URL-encoded para mayor compatibilidad
  '/media/Identidad/automatiza%20con%20disruptivo%20lab.mp4',
  '/media/Identidad/disruptivo_lab_parallax.mp4',
  '/media/Identidad/disruptivo_lab_parallax2.mp4',
  '/media/Identidad/agentes_con_ia_para_tu_negocio.mp4',
    ];
    const list = (get('servicesLanding.cards') as Array<{ slug: string; title: string; desc?: string }>) ?? [];
    return list.slice(0, 5).map((c, i) => ({ ...c, video: videos[i % videos.length] }));
  }, [get]);

  const scrollTo = (newIndex: number) => {
    const clamped = Math.max(0, Math.min(cards.length - 1, newIndex));
    setIdx(clamped);
    const el = itemRefs.current[clamped];
    el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  // Ajuste inicial para centrar el primer elemento
  useEffect(() => {
    const id = setTimeout(() => scrollTo(0), 50);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-[100svh] pt-20 md:pt-24">
      <div className="container mx-auto px-4 py-7">
        <div className="text-center mb-6 md:mb-8">
          <Title>{t('servicesLanding.title') ?? 'Servicios'}</Title>
        </div>
      </div>

      {/* Carrusel a todo el ancho */}
      <section className="relative w-screen overflow-hidden">
        {/* Flechas */}
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-2 md:px-4">
          <button
            aria-label="Anterior"
            onClick={() => scrollTo(idx - 1)}
            className="pointer-events-auto rounded-full p-2 md:p-3 bg-white/60 dark:bg-black/40 backdrop-blur border border-black/10 dark:border-white/10 hover:bg-white/80 dark:hover:bg-black/60 transition ms-3"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Siguiente"
            onClick={() => scrollTo(idx + 1)}
            className="pointer-events-auto rounded-full p-2 md:p-3 bg-white/60 dark:bg-black/40 backdrop-blur border border-black/10 dark:border-white/10 hover:bg-white/80 dark:hover:bg-black/60 transition me-3"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div
          ref={scrollerRef}
          className="flex w-screen gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar px-4 md:px-6"
        >
          {cards.map((card, i) => (
            <div
              key={card.slug}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              role="link"
              tabIndex={0}
              aria-label={`${t('servicesLanding.cta') ?? 'Ver servicio'}: ${card.title}`}
              onClick={() => router.push(`/services/${card.slug}`)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') router.push(`/services/${card.slug}`);
              }}
              className="relative snap-start shrink-0 cursor-pointer h-[70vh] w-[90vw] sm:w-[90vw] md:w-[90vw] lg:w-[70vw] rounded-[28px] overflow-hidden group"
            >
              {/* Video background (lazy) */}
              <LazyBgVideo src={card.video} className="absolute inset-0 h-full w-full object-cover pointer-events-none" />

              {/* Filtro por tema para legibilidad */}
              <div className="absolute inset-0 bg-white/20 dark:bg-black/30 pointer-events-none" />

              {/* Gradiente inferior para contraste de texto */}
              <div className="absolute inset-x-0 bottom-0 h-40 md:h-44 bg-gradient-to-t from-white/90 via-white/70 to-transparent dark:from-black/80 dark:via-black/70 pointer-events-none" />

              {/* Contenido */}
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <h3 className="text-2xl md:text-3xl font-semibold drop-shadow-sm">
                  {card.title}
                </h3>
                {card.desc ? (
                  <p className="mt-1 text-sm md:text-base text-foreground/80 max-w-[60ch]">
                    {card.desc}
                  </p>
                ) : null}
                <div className="mt-2">
                  <MinimalistLink href={`/services/${card.slug}`} size="xl">
                    {t('servicesLanding.cta')}
                  </MinimalistLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEO paragraph */}
      <section className="container mx-auto px-4 py-40">
        <p className="max-w-3xl mx-auto text-center text-sm md:text-base text-muted-foreground">
          {t('servicesLanding.seo')}
        </p>
      </section>

      {/* Why us / Proceso animado */}
      <AnimatedProcessSection get={get} t={t} />

      {/* CTA Full-Bleed que rompe la grilla container */}
      <FullBleedCTA
        t={t}
        onContact={() => setIsContactOpen(true)}
      />

      {/* Modal de contacto */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </main>
  );
}

// Sección de proceso animado (evoca timeline con progreso en scroll)
function AnimatedProcessSection({
  get,
  t,
}: {
  get: (key: string) => unknown;
  t: (key: string) => string;
}) {
  const items = (get('servicesLanding.usp.items') as Array<{ key: string; title: string; desc: string }>) ?? [];
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 0.9', 'end 0.2'] });
  const fillScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="container mx-auto px-4 pb-40">
      <div className="text-center mb-10 py-40">
        <Title>{t('servicesLanding.usp.title') ?? '¿Por qué nosotros?'}</Title>
      </div>

      <div ref={sectionRef} className="relative max-w-4xl mx-auto">
        {/* Rail base */}
        <div className="pointer-events-none absolute left-4 md:left-6 top-0 bottom-0 w-px bg-foreground/15" />
        {/* Rail de progreso */}
        <motion.div
          className="pointer-events-none absolute left-[15px] md:left-[23px] top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b from-orange-400 via-red-500 to-pink-500"
          style={{ scaleY: fillScale, transformOrigin: 'top' }}
        />

        <ul role="list" className="space-y-10 md:space-y-14 pl-12 md:pl-20">
          {items.slice(0, 3).map((item, i) => {
            const Icon = i === 0 ? ShieldCheck : i === 1 ? Clock : Handshake;
            return (
              <li key={item?.key ?? i} role="listitem" className="relative">
                {/* Nodo/dot */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ type: 'spring', stiffness: 140, damping: 18 }}
                  className="absolute -left-[2.15rem] md:-left-[3.15rem] top-1.5 h-4 w-4 rounded-full bg-gradient-to-br from-orange-400 to-red-500 ring-4 ring-background shadow-[0_0_0_2px_rgba(0,0,0,0.06)]"
                />

                {/* Línea decorativa sutil detrás de cada item, solo para profundidad */}
                <div className="absolute -left-[2.05rem] md:-left-[3.05rem] top-1.5 h-4 w-4 rounded-full bg-white/5 dark:bg-white/10 blur-2xl" />

                {/* Contenido del paso */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="group"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 shrink-0">
                      <div className="h-11 w-11 rounded-xl grid place-items-center border border-white/15 bg-white/10 dark:bg-white/5 backdrop-blur">
                        <Icon className="h-5 w-5 text-foreground" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-semibold leading-tight">
                        <span className="mr-2 text-foreground/50">{String(i + 1).padStart(2, '0')}</span>
                        {item?.title}
                      </h3>
                      <p className="mt-1.5 text-sm md:text-base text-foreground/75 max-w-prose">
                        {item?.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

// CTA Full-Bleed con video y bordes diagonales
function FullBleedCTA({
  t,
  onContact,
}: {
  t: (key: string) => string;
  onContact: () => void;
}) {
  return (
    <section className="relative w-screen my-40 rounded-3xl">
      {/* Capa de fondo full-bleed */}
      <div
        className="relative w-[100vw] min-h-[100svh] grid items-center overflow-hidden rounded-3xl [clip-path:polygon(0_2.5rem,100%_0,100%_calc(100%-2.5rem),0_100%)]"
      >
  {/* Video background (lazy) */}
  <LazyBgVideo src="/media/Identidad/disruptivo_lab_parallax2.mp4" className="absolute inset-0 h-full w-full object-cover mx-auto rounded-3xl pointer-events-none" />

        {/* Overlays por tema y gradiente para legibilidad */}
        <div className="absolute inset-0 bg-white/20 dark:bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-background/10" />

        {/* Contenido centrado */}
        <div className="relative z-10 px-5 sm:px-8 md:px-12 lg:px-16 py-16 md:py-24">
          <div className="max-w-5xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl font-bold leading-tight"
            >
              {t('servicesLanding.ctaBlock.title')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-3 text-base md:text-lg text-foreground/85 max-w-3xl mx-auto"
            >
              {t('servicesLanding.ctaBlock.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <FrostedButton variant="primary" size="lg" onClick={onContact}>
                {t('servicesLanding.ctaBlock.primary')}
              </FrostedButton>
              <MinimalistLink href="/method" size="lg">
                {t('servicesLanding.ctaBlock.secondary')}
              </MinimalistLink>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Video de fondo con lazy load, accesible y sin bloquear render
function LazyBgVideo({ src, className, poster }: { src: string; className?: string; poster?: string }) {
  // Observamos un contenedor siempre presente para activar el video
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [active, setActive] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    // Respeta preferencias de movimiento reducido
    const mq = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    if (mq?.matches) {
      setReduced(true);
      return;
    }
    const node = containerRef.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      setActive(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(true);
          }
        }
      },
      { rootMargin: '200px 0px', threshold: 0.05 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (el && active && !reduced) {
      el.play?.().catch(() => {});
    }
  }, [active, reduced]);

  return (
    <div ref={containerRef} className={className} aria-hidden="true" role="presentation">
      {reduced || !active ? (
        // Placeholder skeleton (sin imágenes) para antes de activar o si reduce motion
        <>
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-white/5 dark:from-white/10 dark:to-white/5" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/0 to-black/10 dark:to-black/30" />
          <div className="absolute inset-0 animate-pulse bg-white/5 dark:bg-white/5" />
        </>
      ) : (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          playsInline
          muted
          loop
          preload={active ? 'metadata' : 'none'}
          autoPlay={active}
          tabIndex={-1}
          {...(poster ? { poster } : {})}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}