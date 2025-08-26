'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/contexts/theme-context';
import { useModularTranslation } from '@/contexts/modular-translation-context';
import { MinimalistLink, GlassCard } from '@/components/ui';
import { ContactModal } from '@/components/ui/contact-modal';
import { FrostedButton } from '@/components/ui/frosted-button';
import { HeroTitle, BodyText } from '@/components/ui/typography';
import { generateWhatsAppLink } from '@/config/contact';
import { cn } from '@/lib/utils';

export default function ConversionSection() {
  const { theme } = useTheme();
  const { t, get, locale, loadModularTranslation } = useModularTranslation();

  const rotateWords = (get('conversion.rotate') as string[]) || [];
  const valueProps = (get('conversion.valueProps') as Array<{ title: string; desc: string }>) || [];

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Cargar las traducciones del módulo cuando cambie el idioma
  useEffect(() => {
    loadModularTranslation('pages/home');
  }, [locale, loadModularTranslation]);

  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (!rotateWords.length) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % rotateWords.length), 2500);
    return () => clearInterval(id);
  }, [rotateWords.length]);

  const waLink = generateWhatsAppLink(locale as any);

  return (
    <section className={`py-16 md:py-24 lg:py-28 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      {/* Carrusel de palabras - Todo el ancho */}
      {rotateWords.length > 0 && (
        <div className="relative left-1/2 -translate-x-1/2 w-full max-w-[100vw] mb-28 md:mb-32 lg:mb-40">
          <div className="overflow-hidden py-6">
            <div className="flex animate-scroll-left gap-8 md:gap-12">
              {[...rotateWords, ...rotateWords, ...rotateWords].map((word, i) => (
                <Link
                  href="/services"
                  key={`${word}-${i}`}
                  className={cn(
                    'select-none whitespace-nowrap font-poppins font-bold text-2xl md:text-4xl lg:text-5xl',
                    'tracking-tight text-foreground/70 transition-all duration-300 hover:text-foreground',
                    'px-8 cursor-pointer'
                  )}
                >
                  {word}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="w-[98%] mx-auto">
        {/* Value props - Carrusel de Flip Cards estilo Google */}
        {valueProps.length > 0 && (
          <div className="relative mb-24 md:mb-28 lg:mb-40">
            {/* Full-bleed: el carrusel ocupa el ancho del viewport, independiente del padding del contenedor */}
            <div className="w-screen -ml-[calc(50vw-50%)]">
              <div 
                  className="overflow-x-auto overflow-y-visible py-4 google-carousel snap-x snap-mandatory [scroll-padding-left:1rem] md:[scroll-padding-left:1.5rem] lg:[scroll-padding-left:2rem] [scroll-padding-right:1rem] md:[scroll-padding-right:1.5rem] lg:[scroll-padding-right:2rem]"
                >
                  <div className="flex gap-6 md:gap-8">
                    {/* Spacers finos para que el snap no corte la primera/última card en los bordes */}
                    <div className="shrink-0 w-4 md:w-6 lg:w-8" aria-hidden="true" />
                    {valueProps.map((vp, i) => (
                    <div 
                      key={i} 
                      className="snap-start shrink-0 w-[85vw] sm:w-[70vw] md:w-[300px] lg:w-[350px] xl:w-[380px] h-[400px] md:h-[450px] lg:h-[480px]"
                    >
                      {/* Mapeo estático por orden a los slugs de servicios */}
                      <FlipCard 
                        valueProp={vp} 
                        index={i} 
                        slug={[
                          'whatsapp-ia',
                          'automatizacion',
                          'desarrollo-software',
                          'consultoria-integral',
                          'embudo-ia'
                        ][i]}
                      />
                    </div>
                  ))}
                    <div className="shrink-0 w-4 md:w-6 lg:w-8" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Título principal - Debajo de las cards */}
        <div className="max-w-4xl">
          <HeroTitle className="text-foreground text-3xl md:text-4xl lg:text-5xl leading-tight">
            {t('conversion.title')}
          </HeroTitle>
          <div className="mt-4 mb-8">
            <BodyText className="text-foreground/80">
              {t('conversion.subtitle')}
            </BodyText>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-6">
          <button 
            onClick={() => setIsContactModalOpen(true)}
            className="font-sans font-semibold tracking-tight text-foreground underline decoration-current underline-offset-8 decoration-2 transition-opacity duration-200 hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 rounded-sm text-2xl md:text-3xl lg:text-4xl"
          >
            {t('conversion.cta.primary')}
          </button>
          <button 
            onClick={() => setIsContactModalOpen(true)}
            className="font-sans font-semibold tracking-tight text-foreground underline decoration-current underline-offset-8 decoration-2 transition-opacity duration-200 hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 rounded-sm text-2xl md:text-3xl lg:text-4xl"
          >
            {t('conversion.cta.secondary')}
          </button>
        </div>

        {/* Contact Modal */}
        <ContactModal 
          isOpen={isContactModalOpen} 
          onClose={() => setIsContactModalOpen(false)} 
        />
      </div>
    </section>
  );
}

// Iconos SVG personalizados
const AIIcon = () => (
  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor" opacity="0.3"/>
    <path d="M8 2L8.5 6L12 6.5L8.5 7L8 11L7.5 7L4 6.5L7.5 6L8 2Z" fill="currentColor"/>
    <path d="M16 13L16.5 17L20 17.5L16.5 18L16 22L15.5 18L12 17.5L15.5 17L16 13Z" fill="currentColor"/>
  </svg>
);

const AutomationIcon = () => (
  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8 17l-2-2 6-6 2 2-6 6z" fill="currentColor" opacity="0.3"/>
    <path d="M14.5 7.5L16 9L12 13L11 12L14.5 7.5Z" fill="currentColor"/>
    <circle cx="12" cy="12" r="2" fill="currentColor"/>
  </svg>
);

const DataIcon = () => (
  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="18" height="2" rx="1" fill="currentColor" opacity="0.3"/>
    <rect x="3" y="8" width="18" height="2" rx="1" fill="currentColor" opacity="0.5"/>
    <rect x="3" y="12" width="18" height="2" rx="1" fill="currentColor" opacity="0.7"/>
    <rect x="3" y="16" width="12" height="2" rx="1" fill="currentColor"/>
    <path d="M17 15L19 17L23 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Nuevo icono para Consultoría Integral
const ConsultingIcon = () => (
  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Brújula simple */}
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" opacity="0.4" />
    <path d="M12 7l2.5 5.5L7 15l5-2.5L12 7z" fill="currentColor" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

// Icono de Target para Ventas con IA
const TargetIcon = () => (
  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" opacity="0.35" />
    <circle cx="12" cy="12" r="5.5" stroke="currentColor" strokeWidth="2" opacity="0.6" />
    <circle cx="12" cy="12" r="2.5" fill="currentColor" />
    <path d="M19 5l-4 1 3 3 1-4z" fill="currentColor" opacity="0.8" />
  </svg>
);

// Componente FlipCard
interface FlipCardProps {
  valueProp: { title: string; desc: string };
  index: number;
  slug?: string; // slug del servicio al que navega
}

const FlipCard = ({ valueProp, index, slug }: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const getIcon = () => {
    switch (index) {
      case 0: return <AIIcon />;
      case 1: return <AutomationIcon />;
      case 2: return <DataIcon />;
  case 3: return <ConsultingIcon />;
  case 4: return <TargetIcon />;
      default: return <AIIcon />;
    }
  };

  // Colores unificados con el tema del slug de servicios (usa variables CSS)
  const themeClass = slug ? `service-theme-${slug}` : 'service-theme-default';

  return (
    <div className="group h-full w-full">
      <div
        className={cn(
          "relative w-full h-full cursor-pointer transition-transform duration-700 ease-in-out",
          "[transform-style:preserve-3d]",
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        )}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Frente de la card */}
        <div className={cn(
          "absolute inset-0 rounded-2xl [backface-visibility:hidden]",
          "backdrop-blur-[12px] backdrop-saturate-150",
          "bg-transparent service-card-surface",
          "border border-white/10",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(255,255,255,0.05),0_10px_30px_rgba(0,0,0,0.1)]",
          "hover:shadow-2xl",
          "transition-all duration-500 group-hover:brightness-110",
          themeClass
        )}>
          <div className="relative p-6 md:p-8 lg:p-10 h-full flex flex-col">
            {/* Icono */}
            <div className={cn("mb-8 md:mb-10", 'service-card-accent')}>
              {getIcon()}
            </div>
            
            {/* Título */}
            <h3 className="text-foreground font-bold text-xl md:text-2xl lg:text-3xl mb-6 leading-tight">
              {valueProp.title}
            </h3>
            
            {/* Spacer */}
            <div className="flex-1" />
            
            {/* Botón "Más" en esquina inferior derecha */}
            <div className="flex justify-end mt-8">
              <button 
                className={cn(
                  "w-10 h-10 rounded-full backdrop-blur-[8px]",
                  "bg-white/10 border border-white/20",
                  "flex items-center justify-center",
                  "hover:bg-white/20 hover:scale-110",
                  "transition-all duration-300",
                  'service-card-accent'
                )}
                aria-label="Abrir servicio"
                title="Abrir servicio"
                onClick={(e) => {
                  e.stopPropagation();
                  if (slug) {
                    // Full reload para coherencia con navegación de servicios
                    window.location.assign(`/services/${slug}`);
                  } else {
                    window.location.assign('/services');
                  }
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Reverso de la card */}
        <div className={cn(
          "absolute inset-0 rounded-2xl [backface-visibility:hidden] [transform:rotateY(180deg)]",
          "backdrop-blur-[12px] backdrop-saturate-150",
          "bg-transparent service-card-surface",
          "border border-white/10",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(255,255,255,0.05),0_10px_30px_rgba(0,0,0,0.1)]"
        , themeClass)}>
          <div className="relative p-6 md:p-8 lg:p-10 h-full flex flex-col justify-between">
            {/* Descripción del servicio */}
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-foreground/90 leading-relaxed text-sm md:text-base lg:text-lg">
                {valueProp.desc}
              </p>
            </div>
            
            {/* Botón Descubrir - va a servicios */}
            <div className="flex justify-center mt-8">
              <FrostedButton 
                variant="primary" 
                size="md"
                onClick={(e) => {
                  e.stopPropagation();
                  if (slug) {
                    window.location.assign(`/services/${slug}`);
                  } else {
                    window.location.assign('/services');
                  }
                }}
              >
                Descubrir
              </FrostedButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
