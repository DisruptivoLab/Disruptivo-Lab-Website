/**
 * Hook personalizado para traducciones
 * Proporciona una interfaz simple para acceder a las traducciones
 * Compatible con App Router de Next.js 14
 */

import { useMemo, useState, useEffect } from 'react';

// Importar todas las traducciones
import es from '@/locales/es.json';
import en from '@/locales/en.json';
import fr from '@/locales/fr.json';
import pt from '@/locales/pt.json';
import ja from '@/locales/ja.json';
import zh from '@/locales/zh.json';
import ko from '@/locales/ko.json';

const translations = {
  es,
  en,
  fr,
  pt,
  ja,
  zh,
  ko,
};

type NestedTranslationKey<T> = T extends object 
  ? { [K in keyof T]: T[K] extends object 
      ? `${string & K}.${NestedTranslationKey<T[K]>}` 
      : string & K 
    }[keyof T]
  : never;

type AllTranslationKeys = NestedTranslationKey<typeof es>;

export function useTranslation() {
  const [locale, setLocale] = useState<keyof typeof translations>('es');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Detectar idioma del navegador o usar guardado
    const savedLocale = localStorage.getItem('disruptivo-locale') as keyof typeof translations;
    const browserLocale = navigator.language.split('-')[0] as keyof typeof translations;
    const supportedLocale = translations[browserLocale] ? browserLocale : 'es';
    
    const initialLocale = savedLocale || supportedLocale;
    setLocale(initialLocale);
    setMounted(true);
  }, []);

  const changeLocale = (newLocale: keyof typeof translations) => {
    setLocale(newLocale);
    localStorage.setItem('disruptivo-locale', newLocale);
  };
  
  const t = useMemo(() => {
    return (key: AllTranslationKeys): string => {
      const keys = key.split('.');
      let value: string | object | undefined = translations[locale];
      
      for (const k of keys) {
        if (typeof value === 'object' && value !== null) {
          value = (value as Record<string, unknown>)[k] as string | object | undefined;
        } else {
          value = undefined; // Si no es un objeto, no podemos seguir la ruta
          break;
        }
      }
      
      // Fallback a español si no encuentra la traducción
      if (!value && locale !== 'es') {
        let fallbackValue: string | object | undefined = translations.es;
        for (const k of keys) {
          if (typeof fallbackValue === 'object' && fallbackValue !== null) {
            fallbackValue = (fallbackValue as Record<string, unknown>)[k] as string | object | undefined;
          } else {
            fallbackValue = undefined;
            break;
          }
        }
        value = fallbackValue;
      }
      
      return String(value || key);
    };
  }, [locale]);

  return {
    t,
    locale,
    changeLocale,
    isLoading: !mounted,
  };
}