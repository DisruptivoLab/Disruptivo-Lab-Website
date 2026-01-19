'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useModularTranslation } from '@/contexts/modular-translation-context';
import { MinimalistLink } from '@/components/ui/minimalist-link';
import { HeroTitle, Title, Subtitle, BodyText } from '@/components/ui/typography';
import { SectionLoading } from '@/components/ui/global-loading';
import { Sparkles, Search, TrendingUp, Rocket } from 'lucide-react';

export default function ValidatorAIPage() {
  const { t, loadModularTranslation, isLoading, get } = useModularTranslation();

  useEffect(() => {
    loadModularTranslation('pages/validator-ai');
  }, [loadModularTranslation]);

  if (isLoading) {
    return <SectionLoading />;
  }

  const expertiseItems = get('origin.expertise.items') as string[] || [];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="px-4 pt-60 mt-40 pb-12 md:px-8 md:pt-32 md:pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <HeroTitle className="text-foreground">
              {t('hero.title')}
            </HeroTitle>
            <Subtitle className="text-xl md:text-2xl text-foreground/90">
              {t('hero.subtitle')}
            </Subtitle>
            <BodyText className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('hero.description')}
            </BodyText>
          </motion.div>
        </div>
      </section>

      {/* Problem */}
      <section className="px-4 py-16 md:px-8 md:py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <Title className="text-foreground">{t('problem.title')}</Title>
              <Subtitle className="text-foreground/80">{t('problem.subtitle')}</Subtitle>
            </div>
            <BodyText className="text-muted-foreground">
              {t('problem.description')}
            </BodyText>
            <div className="border-l-4 border-red-600 pl-6 py-4 bg-red-500/5">
              <BodyText className="text-lg font-semibold text-foreground italic">
                {t('problem.quote')}
              </BodyText>
            </div>
            <BodyText className="text-muted-foreground">
              {t('problem.explanation')}
            </BodyText>
            <div className="text-center py-8">
              <div className="inline-block space-y-3">
                <div className="text-6xl font-bold text-red-600">
                  {t('problem.stat.number')}
                </div>
                <BodyText className="text-lg text-foreground">
                  {t('problem.stat.text')}
                </BodyText>
                <BodyText className="text-sm text-muted-foreground italic">
                  {t('problem.stat.source')}
                </BodyText>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technology */}
      <section className="px-4 py-16 md:px-8 md:py-24">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <Title className="text-foreground">{t('technology.title')}</Title>
              <Subtitle className="text-foreground/80">{t('technology.subtitle')}</Subtitle>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4 p-6 rounded-lg bg-muted/30 border border-border">
                <Sparkles className="w-10 h-10 text-red-600" />
                <Subtitle className="text-foreground">
                  {t('technology.features.gemini.title')}
                </Subtitle>
                <BodyText className="text-muted-foreground">
                  {t('technology.features.gemini.description')}
                </BodyText>
              </div>
              <div className="space-y-4 p-6 rounded-lg bg-muted/30 border border-border">
                <Search className="w-10 h-10 text-red-600" />
                <Subtitle className="text-foreground">
                  {t('technology.features.grounding.title')}
                </Subtitle>
                <BodyText className="text-muted-foreground">
                  {t('technology.features.grounding.description')}
                </BodyText>
              </div>
              <div className="space-y-4 p-6 rounded-lg bg-muted/30 border border-border">
                <TrendingUp className="w-10 h-10 text-red-600" />
                <Subtitle className="text-foreground">
                  {t('technology.features.financial.title')}
                </Subtitle>
                <BodyText className="text-muted-foreground">
                  {t('technology.features.financial.description')}
                </BodyText>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Origin */}
      <section className="px-4 py-16 md:px-8 md:py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-12"
          >
            <div className="space-y-4">
              <Title className="text-foreground">{t('origin.title')}</Title>
              <Subtitle className="text-foreground/80">{t('origin.subtitle')}</Subtitle>
            </div>
            <div className="space-y-6">
              <BodyText className="text-muted-foreground">
                {t('origin.description')}
              </BodyText>
              <BodyText className="text-muted-foreground">
                {t('origin.story')}
              </BodyText>
            </div>
            <div className="space-y-6">
              <Subtitle className="text-foreground">{t('origin.expertise.title')}</Subtitle>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {expertiseItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Rocket className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <BodyText className="text-muted-foreground">{item}</BodyText>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-4">
              <MinimalistLink 
                href="/" 
                size="lg"
                className="text-foreground"
              >
                {t('origin.cta')}
              </MinimalistLink>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 md:px-8 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-8"
          >
            <Title className="text-foreground">{t('cta.title')}</Title>
            <BodyText className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('cta.description')}
            </BodyText>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="#" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-foreground hover:opacity-80 transition-opacity"
              >
                {t('cta.primary')}
              </a>
              <MinimalistLink 
                href="/services" 
                size="lg"
                className="text-muted-foreground"
              >
                {t('cta.secondary')}
              </MinimalistLink>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
