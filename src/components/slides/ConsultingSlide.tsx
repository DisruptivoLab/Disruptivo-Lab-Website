'use client';

import { motion } from 'framer-motion';
import { FrostedButton } from '@/components/ui';
import { HeroTitle, BodyText } from '@/components/ui/typography';
import { useModularTranslation } from '@/contexts/modular-translation-context';
import { useTheme } from '@/contexts/theme-context';
import Link from 'next/link';

import { SlideProps } from '@/types/slide';

export default function ConsultingSlide({
  isActive,
}: SlideProps) {
  const { t } = useModularTranslation();
  const { theme } = useTheme();

  if (!isActive) return null;

  return (
    <div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-red-600 via-red-500 to-red-700">
      {/* Fondo Disruptivo Animado */}
      <div className="absolute inset-0">
        {/* Mesh Gradient Base */}
        <div className="absolute inset-0 opacity-80 disruptive-mesh-bg" />
        
        {/* Círculos Flotantes Dinámicos */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-red-400/20 rounded-full blur-xl animate-pulse disruptive-float-1" />
        <div className="absolute top-40 right-32 w-24 h-24 bg-red-300/25 rounded-full blur-lg disruptive-float-2" />
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-red-500/15 rounded-full blur-2xl disruptive-pulse-1" />
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-red-400/20 rounded-full blur-xl disruptive-float-3" />
        
        {/* Ondas Geométricas */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-red-400/10 to-transparent transform rotate-12 disruptive-pulse-2" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-red-500/10 to-transparent transform -rotate-12 disruptive-pulse-3" />
        </div>
      </div>

      {/* Overlay dinámico según el tema para mejor contraste */}
      <div className={`absolute inset-0 transition-colors duration-500 ${
        theme === 'dark' 
          ? 'bg-black/30' 
          : 'bg-white/25'
      }`} />
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
            {t('consulting.title')}
          </HeroTitle>
        </motion.div>
        
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <BodyText className="max-w-3xl text-foreground drop-shadow-xl mb-6 sm:mb-8 px-4 sm:px-0">
            {t('consulting.subtitle')}
          </BodyText>
        </motion.div>
        
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <Link href="/services/consultoria-integral">
            <FrostedButton size="lg" variant="primary">
              {t('consulting.cta')}
            </FrostedButton>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
