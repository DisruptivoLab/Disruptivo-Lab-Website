'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useModularTranslation } from '@/contexts/modular-translation-context';
import { MinimalistLink } from '@/components/ui/minimalist-link';
import { Title, BodyText } from '@/components/ui/typography';
import { Sparkles, ExternalLink, X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/theme-context';

export default function ValidatorAISection() {
  const { t } = useModularTranslation();
  const { theme } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      ref={ref}
      className={cn(
        "py-32 md:py-40 px-4 md:px-8 relative overflow-hidden",
        theme === 'dark' ? 'bg-black' : 'bg-white'
      )}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-600/5 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center space-y-12"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/10 border border-red-600/20">
            <Sparkles className="w-4 h-4 text-red-600" />
            <span className="text-sm font-semibold text-red-600">{t('validatorAI.badge')}</span>
          </div>

          {/* Title */}
          <Title className="text-foreground text-4xl md:text-5xl">{t('validatorAI.title')}</Title>

          {/* Visual Chart */}
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Main Stat */}
            <div className="text-center space-y-2">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-8xl md:text-9xl font-bold text-red-600"
              >
                {t('validatorAI.stat')}
              </motion.div>
              <BodyText className="text-xl md:text-2xl text-foreground/80">
                {t('validatorAI.statLabel')}
              </BodyText>
            </div>

            {/* Fail Bar */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm font-medium">
                <div className="flex items-center gap-2">
                  <X className="w-5 h-5 text-red-600" />
                  <span className="text-foreground">{t('validatorAI.chartFail')}</span>
                </div>
                <span className="text-xl font-bold text-red-600">90%</span>
              </div>
              <div className="h-12 bg-foreground/5 rounded-lg overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "90%" } : {}}
                  transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-red-600 to-red-500 relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </motion.div>
              </div>
            </div>

            {/* Success Bar */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm font-medium">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-foreground">{t('validatorAI.chartSuccess')}</span>
                </div>
                <span className="text-xl font-bold text-green-600">10%</span>
              </div>
              <div className="h-12 bg-foreground/5 rounded-lg overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "10%" } : {}}
                  transition={{ duration: 1.5, delay: 0.9, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-green-600 to-green-500 relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 }}
          >
            <BodyText className="text-xl md:text-2xl text-foreground/90 max-w-2xl mx-auto">
              {t('validatorAI.description')}
            </BodyText>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6"
          >
            <MinimalistLink 
              href="/validator-ai" 
              size="lg"
              className="text-foreground"
            >
              {t('validatorAI.ctaLearn')}
            </MinimalistLink>
            <a
              href="https://validator.disruptivo.app/"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold rounded-lg transition-all hover:scale-105 shadow-xl",
                theme === 'dark'
                  ? 'bg-red-600 text-white hover:bg-red-700 shadow-red-600/30'
                  : 'bg-red-600 text-white hover:bg-red-700 shadow-red-600/30'
              )}
            >
              {t('validatorAI.ctaTool')}
              <ExternalLink className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
