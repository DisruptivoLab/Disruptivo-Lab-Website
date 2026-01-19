'use client';

import { motion } from 'framer-motion';
import { useModularTranslation } from '@/contexts/modular-translation-context';
import { MinimalistLink } from '@/components/ui/minimalist-link';
import { Title, Subtitle, BodyText } from '@/components/ui/typography';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/theme-context';

export default function ValidatorAISection() {
  const { t } = useModularTranslation();
  const { theme } = useTheme();

  return (
    <section className={cn(
      "py-16 md:py-24 px-4 md:px-8",
      theme === 'dark' ? 'bg-gradient-to-b from-black via-red-950/5 to-black' : 'bg-gradient-to-b from-white via-red-50/30 to-white'
    )}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={cn(
            "relative rounded-2xl p-8 md:p-12 border overflow-hidden",
            theme === 'dark' 
              ? 'bg-gradient-to-br from-red-950/20 via-black/50 to-black/50 border-red-900/30' 
              : 'bg-gradient-to-br from-red-50/50 via-white/80 to-white/80 border-red-200/50'
          )}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl" />
          
          <div className="relative space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-600/20">
              <Sparkles className="w-4 h-4 text-red-600" />
              <span className="text-xs font-semibold text-red-600">{t('validatorAI.badge')}</span>
            </div>

            <div className="space-y-3">
              <Title className="text-foreground">{t('validatorAI.title')}</Title>
              <Subtitle className="text-foreground/80">{t('validatorAI.subtitle')}</Subtitle>
            </div>

            <BodyText className="text-muted-foreground max-w-2xl">
              {t('validatorAI.description')}
            </BodyText>

            <div className="pt-4">
              <MinimalistLink 
                href="/validator-ai" 
                size="lg"
                className="text-foreground"
              >
                {t('validatorAI.cta')}
              </MinimalistLink>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
