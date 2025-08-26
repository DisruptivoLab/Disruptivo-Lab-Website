'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useModularTranslation } from '@/contexts/modular-translation-context';
import { MinimalistLink } from '@/components/ui/minimalist-link';
import { HeroTitle, Title, Subtitle, BodyText } from '@/components/ui/typography';
import { SectionLoading } from '@/components/ui/global-loading';

export default function AboutPage() {
  const { t, loadModularTranslation, isLoading } = useModularTranslation();

  useEffect(() => {
    loadModularTranslation('pages/about');
  }, [loadModularTranslation]);

  // Mostrar loading mientras las traducciones se cargan
  if (isLoading) {
    return <SectionLoading />;
  }

  return (
    <div className="min-h-screen">
      <section className="px-4 pt-60 mt-40 pb-12 md:px-8 md:pt-32 md:pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <HeroTitle className="text-foreground">
              {t('hero.title')}
            </HeroTitle>
            <BodyText className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              {t('hero.subtitle')}
            </BodyText>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8 md:py-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <Title className="text-foreground">
              {t('essence.title')}
            </Title>
            <div className="space-y-6 text-muted-foreground">
              <BodyText>
                {t('essence.description')}
              </BodyText>
              <BodyText>
                {t('essence.additional')}
              </BodyText>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8 md:py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-12"
          >
            <Title className="text-foreground">
              {t('methodology.title')}
            </Title>
            <div className="space-y-12">
              <div className="space-y-4">
                <Subtitle className="text-foreground">
                  {t('methodology.approaches.intelligence.title')}
                </Subtitle>
                <BodyText className="text-muted-foreground">
                  {t('methodology.approaches.intelligence.description')}
                </BodyText>
              </div>
              <div className="space-y-4">
                <Subtitle className="text-foreground">
                  {t('methodology.approaches.velocity.title')}
                </Subtitle>
                <BodyText className="text-muted-foreground">
                  {t('methodology.approaches.velocity.description')}
                </BodyText>
              </div>
              <div className="space-y-4">
                <Subtitle className="text-foreground">
                  {t('methodology.approaches.impact.title')}
                </Subtitle>
                <BodyText className="text-muted-foreground">
                  {t('methodology.approaches.impact.description')}
                </BodyText>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8 md:py-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-12"
          >
            <Title className="text-foreground">
              {t('evolution.title')}
            </Title>
            <div className="space-y-8">
              <div className="border-l-2 border-border pl-6 space-y-3">
                <BodyText className="text-sm font-medium text-muted-foreground">
                  {t('evolution.milestones.foundation.period')}
                </BodyText>
                <Subtitle className="text-foreground">
                  {t('evolution.milestones.foundation.phase')}
                </Subtitle>
                <BodyText className="text-muted-foreground">
                  {t('evolution.milestones.foundation.achievement')}
                </BodyText>
              </div>
              <div className="border-l-2 border-border pl-6 space-y-3">
                <BodyText className="text-sm font-medium text-muted-foreground">
                  {t('evolution.milestones.specialization.period')}
                </BodyText>
                <Subtitle className="text-foreground">
                  {t('evolution.milestones.specialization.phase')}
                </Subtitle>
                <BodyText className="text-muted-foreground">
                  {t('evolution.milestones.specialization.achievement')}
                </BodyText>
              </div>
              <div className="border-l-2 border-border pl-6 space-y-3">
                <BodyText className="text-sm font-medium text-muted-foreground">
                  {t('evolution.milestones.transformation.period')}
                </BodyText>
                <Subtitle className="text-foreground">
                  {t('evolution.milestones.transformation.phase')}
                </Subtitle>
                <BodyText className="text-muted-foreground">
                  {t('evolution.milestones.transformation.achievement')}
                </BodyText>
              </div>
              <div className="border-l-2 border-emerald-500 pl-6 space-y-3">
                <BodyText className="text-sm font-medium text-emerald-600">
                  {t('evolution.milestones.disruption.period')}
                </BodyText>
                <Subtitle className="text-foreground">
                  {t('evolution.milestones.disruption.phase')}
                </Subtitle>
                <BodyText className="text-muted-foreground">
                  {t('evolution.milestones.disruption.achievement')}
                </BodyText>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8 md:py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-12"
          >
            <Title className="text-foreground">
              {t('benefits.title')}
            </Title>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Subtitle className="text-foreground">
                  {t('benefits.items.results.title')}
                </Subtitle>
                <BodyText className="text-muted-foreground">
                  {t('benefits.items.results.description')}
                </BodyText>
              </div>
              <div className="space-y-3">
                <Subtitle className="text-foreground">
                  {t('benefits.items.speed.title')}
                </Subtitle>
                <BodyText className="text-muted-foreground">
                  {t('benefits.items.speed.description')}
                </BodyText>
              </div>
              <div className="space-y-3">
                <Subtitle className="text-foreground">
                  {t('benefits.items.roi.title')}
                </Subtitle>
                <BodyText className="text-muted-foreground">
                  {t('benefits.items.roi.description')}
                </BodyText>
              </div>
              <div className="space-y-3">
                <Subtitle className="text-foreground">
                  {t('benefits.items.support.title')}
                </Subtitle>
                <BodyText className="text-muted-foreground">
                  {t('benefits.items.support.description')}
                </BodyText>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-8"
          >
            <Title className="text-foreground">
              {t('cta.title')}
            </Title>
            <BodyText className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('cta.description')}
            </BodyText>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <MinimalistLink 
                href="/services" 
                size="lg"
                className="text-foreground"
              >
                {t('cta.primary')}
              </MinimalistLink>
              <MinimalistLink 
                href="/portfolio" 
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
