/**
 * Toast de Detección de Idioma
 * Muestra una notificación cuando se detecta automáticamente el idioma del dispositivo
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Globe, X, Check } from 'lucide-react';
import { useLanguageDetection } from '@/hooks/use-language-detection';
import { useModularTranslation } from '@/contexts/modular-translation-context';
import { useEffect } from 'react';

const languageNames: Record<string, string> = {
  es: 'Español',
  en: 'English',
  fr: 'Français',
  pt: 'Português',
  ja: '日本語',
  zh: '中文',
  ko: '한국어',
};

export function LanguageDetectionToast() {
  const { wasAutoDetected, detectedLanguage, dismissNotification } = useLanguageDetection();
  const { t, loadModularTranslation } = useModularTranslation();

  useEffect(() => {
    loadModularTranslation('components/ui/language-detection');
  }, [loadModularTranslation]);

  if (!wasAutoDetected || !detectedLanguage) return null;

  const languageName = languageNames[detectedLanguage] || detectedLanguage;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-4 right-4 z-[200] max-w-sm"
        initial={{ opacity: 0, x: 100, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 100, scale: 0.8 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        <div className="bg-background/95 backdrop-blur-lg border border-border rounded-2xl p-4 shadow-2xl">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-full flex-shrink-0">
              <Globe className="w-4 h-4 text-primary" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-foreground">
                  {t('language_detection.title')}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t('language_detection.message', { language: languageName })}
              </p>
            </div>
            
            <button
              onClick={dismissNotification}
              className="p-1 hover:bg-muted rounded-full transition-colors flex-shrink-0"
              aria-label={t('language_detection.close')}
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}