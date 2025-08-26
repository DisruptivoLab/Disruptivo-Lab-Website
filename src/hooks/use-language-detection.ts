/**
 * Hook para manejar la detección automática de idioma
 */

'use client';

import { useState, useEffect } from 'react';
import { useModularTranslation } from '@/contexts/modular-translation-context';

export function useLanguageDetection() {
  const { locale, loadModularTranslation } = useModularTranslation();

  useEffect(() => {
    loadModularTranslation('components/ui/language-detection');
  }, [loadModularTranslation]);
  const [wasAutoDetected, setWasAutoDetected] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null);

  useEffect(() => {
    // Verificar si el idioma fue detectado automáticamente
    const savedLocale = localStorage.getItem('disruptivo-locale');
    
    if (!savedLocale) {
      // Si no hay idioma guardado, significa que fue detectado automáticamente
      setWasAutoDetected(true);
      setDetectedLanguage(locale);
      
      // Mostrar notificación por 5 segundos
      const timer = setTimeout(() => {
        setWasAutoDetected(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [locale]);

  const dismissNotification = () => {
    setWasAutoDetected(false);
  };

  return {
    wasAutoDetected,
    detectedLanguage,
    dismissNotification
  };
}