'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { PageCTA } from '@/components/ui';
import { HeroTitle, Title, BodyText } from '@/components/ui/typography';
import { useModularTranslation } from '@/contexts/modular-translation-context';
import { 
  Search, 
  Lightbulb, 
  Palette, 
  Code, 
  Rocket, 
  ArrowRight, 
  CheckCircle,
} from 'lucide-react';

// Datos del método
const methodSteps = [
  {
    id: 1,
    icon: Search,
    key: 'discovery',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    icon: Lightbulb,
    key: 'strategy',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 3,
    icon: Palette,
    key: 'design',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 4,
    icon: Code,
    key: 'development',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 5,
    icon: Rocket,
    key: 'launch',
    color: 'from-indigo-500 to-purple-500'
  }
];

// Línea vertical de progreso con conectores (desktop/tablet)
function MethodTimeline({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  const progress = totalSteps > 1 ? currentStep / (totalSteps - 1) : 0;
  const stepsArray = Array.from({ length: totalSteps });
  return (
    <div className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex">
      <div className="relative h-[70vh] w-1 rounded-full border border-white/5 bg-foreground/5 backdrop-blur-[2px] backdrop-saturate-150 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_24px_rgba(0,0,0,0.12)]">
        {/* Relleno de progreso */}
        <motion.div
          className="absolute left-0 top-0 w-full rounded-full origin-top bg-gradient-to-b from-primary to-primary/30"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: Math.min(1, Math.max(0, progress)) }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />

        {/* Conectores/nodos */}
        <div className="absolute inset-0 flex flex-col justify-between py-2">
          {stepsArray.map((_, i) => {
            const isCompleted = i < currentStep;
            const isActive = i === currentStep;
            return (
              <div key={i} className="relative flex items-center justify-center">
                <div
                  className={
                    `h-3.5 w-3.5 rounded-full border border-white/20 backdrop-blur-[2px] ` +
                    (isCompleted ? 'bg-primary shadow-[0_0_10px_rgba(255,69,0,0.5)]' : isActive ? 'bg-primary/70' : 'bg-background/40')
                  }
                  aria-label={`Paso ${i + 1}${isActive ? ' (actual)' : isCompleted ? ' (completado)' : ''}`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Componente de progreso interactivo
function MethodProgress({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4">
      <div className="rounded-full px-4 py-2 lg:px-6 lg:py-3 w-full border border-border/20 backdrop-blur-[6px] backdrop-saturate-150 backdrop-brightness-110 bg-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_4px_12px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-center gap-2 lg:gap-3">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div key={index} className="flex items-center">
              <motion.div
                className={`w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full transition-all duration-300 ${
                  index < currentStep 
                    ? 'bg-primary shadow-[0_0_12px_rgba(251,146,60,0.4)]' 
                    : index === currentStep 
                    ? 'bg-primary/60' 
                    : 'bg-foreground/20'
                }`}
                animate={{
                  scale: index === currentStep ? 1.2 : 1,
                }}
              />
              {index < totalSteps - 1 && (
                <div className={`w-3 lg:w-6 h-0.5 mx-1 lg:mx-2 transition-all duration-300 ${
                  index < currentStep ? 'bg-primary' : 'bg-foreground/20'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Componente de paso interactivo
function InteractiveMethodStep({ 
  step, 
  isActive, 
  isCompleted 
}: { 
  step: typeof methodSteps[0]; 
  index: number; 
  isActive: boolean;
  isCompleted: boolean;
}) {
  const { t } = useModularTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  const [isHovered, setIsHovered] = useState(false);

  const IconComponent = step.icon;

  return (
    <motion.div
      ref={ref}
  className="min-h-screen flex items-center justify-center p-4 sm:p-8 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-w-0">
        
        {/* Lado izquierdo - Visual interactivo */}
        <motion.div
          className="relative w-full flex justify-center"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="relative aspect-square w-full max-w-xs sm:max-w-sm md:max-w-md">
            {/* Círculo de fondo animado */}
            <motion.div
              className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color} opacity-20`}
              animate={{
                scale: isHovered ? 1.05 : 1,
                rotate: isActive ? 360 : 0,
              }}
              transition={{ 
                scale: { type: "spring", stiffness: 300 },
                rotate: { duration: 20, repeat: Infinity, ease: "linear" }
              }}
            />

            {/* (Anillo movido dentro del círculo principal) */}
            
            {/* Círculo principal */}
            <motion.div
              className="absolute inset-6 sm:inset-8 rounded-full overflow-hidden border border-black/10 dark:border-white/10 flex items-center justify-center backdrop-blur-[2px] backdrop-saturate-200 backdrop-brightness-[1.05] dark:backdrop-brightness-125 bg-transparent shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),inset_0_-20px_40px_rgba(0,0,0,0.08),0_20px_40px_rgba(0,0,0,0.08)]"
              animate={{
                y: isHovered ? -10 : 0,
                boxShadow: isHovered 
                  ? "0 20px 40px rgba(0,0,0,0.1)" 
                  : "0 10px 20px rgba(0,0,0,0.05)"
              }}
            >
              {/* Anillo conic interno (recortado por el círculo) */}
              <motion.div
                className="absolute inset-0 rounded-full opacity-50 dark:opacity-45 blur-[1px] mix-blend-multiply dark:mix-blend-soft-light bg-[conic-gradient(from_0deg,rgba(255,69,0,0.45),rgba(99,102,241,0.45),rgba(34,197,94,0.45),rgba(255,69,0,0.45))] [mask-image:radial-gradient(farthest-side,transparent_calc(100%_-_10px),#000_calc(100%_-_10px))] [-webkit-mask-image:radial-gradient(farthest-side,transparent_calc(100%_-_10px),#000_calc(100%_-_10px))] pointer-events-none"
                animate={{ rotate: isActive ? 360 : 0 }}
                transition={{ duration: 24, ease: 'linear', repeat: Infinity }}
                aria-hidden
              />
              {/* Borde de vidrio (highlight) */}
              <div className="pointer-events-none absolute inset-0 rounded-full" aria-hidden>
                {/* highlight superior: más sutil en light, más notorio en dark */}
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(120%_100%_at_50%_-10%,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_60%)] dark:bg-[radial-gradient(120%_100%_at_50%_-10%,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_60%)]" />
                {/* sombra interna inferior para dar profundidad en ambos temas */}
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(100%_80%_at_50%_120%,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0)_60%)] dark:bg-[radial-gradient(100%_80%_at_50%_120%,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0)_60%)]" />
              </div>
              {/* Borde fino para dar lectura al anillo */}
              <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-black/10 dark:ring-white/10 mix-blend-multiply dark:mix-blend-overlay" aria-hidden />
              {/* Contenido: número del paso centrado y el ícono pequeño */}
              <div className="relative flex flex-col items-center justify-center">
                <span className="font-extrabold text-5xl sm:text-6xl md:text-7xl text-foreground/80 leading-none select-none">
                  {step.id}
                </span>
                <IconComponent className={`mt-2 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-br ${step.color} bg-clip-text text-transparent`} />
              </div>
            </motion.div>
            
            {/* Conector visual lateral entre pasos (sólo decorativo en cada sección) */}
            <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[-6rem] h-20 w-px bg-gradient-to-b from-foreground/10 to-transparent hidden lg:block" aria-hidden />
            
            {/* Indicador de completado */}
            <AnimatePresence>
              {isCompleted && (
                <motion.div
                  className="absolute -bottom-2 sm:-bottom-4 left-1/2 transform -translate-x-1/2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Lado derecho - Contenido */}
        <motion.div
          className="space-y-6"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="space-y-4">
            <Title className="text-foreground">
              {t(`${step.key}.title`)}
            </Title>
            
            <BodyText className="text-muted-foreground text-lg leading-relaxed">
              {t(`${step.key}.description`)}
            </BodyText>
          </div>

          {/* Lista de beneficios */}
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-3"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <BodyText className="text-muted-foreground">
                  {t(`${step.key}.benefits.${i}`)}
                </BodyText>
              </motion.div>
            ))}
          </div>


        </motion.div>
      </div>
    </motion.div>
  );
}

export default function MethodPage() {
  const { t, loadModularTranslation } = useModularTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cargar las traducciones al montar el componente
  useEffect(() => {
    loadModularTranslation('pages/method');
  }, [loadModularTranslation]);

  // Función para ir al primer paso
  const scrollToFirstStep = () => {
    const windowHeight = window.innerHeight;
    window.scrollTo({
      top: windowHeight,
      behavior: 'smooth'
    });
  };

  // Detectar el paso actual basado en el scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const stepHeight = windowHeight;
      const currentStepIndex = Math.floor((scrollY - windowHeight) / stepHeight);
      
      setCurrentStep(Math.max(0, Math.min(currentStepIndex, methodSteps.length - 1)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative">
  {/* Timeline vertical con conectores */}
  <MethodTimeline currentStep={currentStep} totalSteps={methodSteps.length} />
      {/* Progreso fijo */}
      <MethodProgress currentStep={currentStep} totalSteps={methodSteps.length} />

      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Fondo animado */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
        
        <motion.div
          className="relative z-10 text-center max-w-4xl mx-auto px-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <HeroTitle className="text-foreground mb-6">
              {t('hero.title')}
            </HeroTitle>
          </motion.div>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <BodyText className="text-muted-foreground text-xl mb-8 max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </BodyText>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.button
              onClick={scrollToFirstStep}
              className="group cursor-pointer p-4 rounded-full hover:bg-primary/10 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="animate-bounce group-hover:animate-none"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowRight className="w-8 h-8 text-primary rotate-90 group-hover:text-primary/80 transition-colors duration-300" />
              </motion.div>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Pasos del método */}
      {methodSteps.map((step, index) => (
        <InteractiveMethodStep
          key={step.id}
          step={step}
          index={index}
          isActive={currentStep === index}
          isCompleted={currentStep > index}
        />
      ))}

      {/* CTA Final */}
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-muted/20 to-background">
        <motion.div
          className="max-w-4xl mx-auto px-4 text-center"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <PageCTA 
            variant="centered"
            title={t('cta.title')}
            description={t('cta.description')}
          />
        </motion.div>
      </div>
    </div>
  );
}
