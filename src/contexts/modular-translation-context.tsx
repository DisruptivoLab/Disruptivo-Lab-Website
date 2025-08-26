/**
 * Modular Translation Context Provider
 * Sistema híbrido que soporta tanto archivos modulares como monolíticos
 * Implementa la nueva arquitectura de traducciones escalable
 */

'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';

// Enfoque simplificado: solo ES y EN por ahora (es = predeterminado)
const supportedLocales = ['es', 'en'] as const;

// Cache para traducciones modulares
const modularCache: Record<string, Record<string, unknown>> = {};

// Mapeo de códigos de idioma regionales a nuestros idiomas soportados
const languageMapping: Record<string, Locale> = {
  // Español (predeterminado)
  'es': 'es',
  'es-es': 'es',
  'es-mx': 'es',
  'es-ar': 'es',
  'es-co': 'es',
  'es-cl': 'es',
  'es-pe': 'es',

  // Inglés
  'en': 'en',
  'en-us': 'en',
  'en-gb': 'en',
  'en-ca': 'en',
  'en-au': 'en',
};

type Locale = typeof supportedLocales[number];
interface ModularTranslationContextType {
  locale: Locale;
  changeLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  isLoading: boolean;
  loadModularTranslation: (moduleName: string) => Promise<void>;
  // Obtiene valores crudos (arrays/objetos) sin convertir a string
  get: (key: string) => unknown;
}

const ModularTranslationContext = createContext<ModularTranslationContextType | undefined>(undefined);

interface ModularTranslationProviderProps {
  children: React.ReactNode;
}

/**
 * Carga dinámicamente un archivo de traducción modular
 */
const loadModularFile = async (moduleName: string, locale: Locale): Promise<Record<string, unknown> | null> => {
  const cacheKey = `${moduleName}-${locale}`;
  
  // Verificar cache primero
  if (modularCache[cacheKey]) {
    return modularCache[cacheKey];
  }
  
  try {
    // Importación dinámica basada en la ruta del módulo y el idioma
  const moduleData = await import(`@/locales/modular/${moduleName}/${locale}.json`);
    
    // Los módulos ES importados con `import()` a menudo tienen el contenido en `default`
    const data = moduleData.default || moduleData;
    modularCache[cacheKey] = data;
    return data;

  } catch {
    // Es normal que un módulo no exista para todos los idiomas, así que usamos un warning
  console.warn(`No se pudo cargar el archivo de módulo de traducción: locales/modular/${moduleName}/${locale}.json`);
    return null;
  }
};

/**
 * Obtiene un valor anidado de un objeto usando notación de puntos
 */
const getNestedValue = (obj: Record<string, unknown> | unknown, path: string): unknown => {
  return path.split('.').reduce((current: Record<string, unknown>, key) => current?.[key] as Record<string, unknown>, obj as Record<string, unknown>);
};

export function ModularTranslationProvider({ children }: ModularTranslationProviderProps) {
  const [locale, setLocale] = useState<Locale>('es');
  const [translations, setTranslations] = useState<Record<string, unknown>>({});
  const [loadedModules, setLoadedModules] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const previousModulesRef = useRef<Set<string>>(new Set());
  // Control de concurrencia para módulos de servicios (pages/services.*)
  const serviceLoadIdRef = useRef(0);

  const changeLocale = useCallback(async (newLocale: Locale, isInitialLoad = false) => {
    if (!isInitialLoad && newLocale === locale) return;

    console.log(`🔄 Cambiando idioma a: ${newLocale}`);
    setIsLoading(true);
    
    // 1. Obtener módulos únicos que estaban cargados (usar ref para evitar dependencia)
  const currentModules = Array.from(previousModulesRef.current).map((mod: string) => mod.replace(/-[a-z]{2}$/, ''));
    const uniqueModuleSet = [...new Set(currentModules)];
    
    // 2. Limpiar estado anterior
    setTranslations({});
    setLoadedModules(new Set());
    
    // 3. Cargar módulo esencial 'common'
    const commonModuleData = await loadModularFile('common', newLocale);
    let newTranslations: Record<string, unknown> = {};
    const newLoadedModules = new Set<string>();
    
    if (commonModuleData) {
      newTranslations = { ...newTranslations, ...commonModuleData };
      newLoadedModules.add(`common-${newLocale}`);
    }
    
    // 4. Recargar todos los módulos que estaban previamente cargados
    for (const moduleName of uniqueModuleSet) {
      if (moduleName !== 'common') { // Ya cargamos common arriba
        const moduleData = await loadModularFile(moduleName, newLocale);
        if (moduleData) {
          newTranslations = { ...newTranslations, ...moduleData };
          newLoadedModules.add(`${moduleName}-${newLocale}`);
        }
      }
    }
    
    // 5. Actualizar estado y ref
    setTranslations(newTranslations);
    setLoadedModules(newLoadedModules);
    previousModulesRef.current = newLoadedModules;
    setLocale(newLocale);
    localStorage.setItem('disruptivo-locale', newLocale);
    setIsLoading(false);
    
    console.log(`✅ Idioma cambiado a: ${newLocale} con módulos recargados:`, Array.from(newLoadedModules));
  }, [locale]); // Removimos loadedModules de las dependencias

  // Efecto para detectar el idioma inicial y cargar traducciones base
  useEffect(() => {
    const detectInitialLocale = (): Locale => {
      const savedLocale = localStorage.getItem('disruptivo-locale') as Locale;
      if (savedLocale && supportedLocales.includes(savedLocale)) {
        return savedLocale;
      }

      const browserLanguages = [navigator.language, ...navigator.languages];
      for (const lang of browserLanguages) {
        const normalizedLang = lang.toLowerCase();
        if (languageMapping[normalizedLang]) {
          return languageMapping[normalizedLang];
        }
        const langCode = normalizedLang.split('-')[0] as Locale;
        if (supportedLocales.includes(langCode)) {
          return langCode;
        }
      }
  return 'es';
    };

    const initialLocale = detectInitialLocale();
    console.log(`🌍 Idioma inicial detectado: ${initialLocale}`);
    changeLocale(initialLocale, true); // Cambia el idioma sin recargar la página
  }, [changeLocale]);

  // Función de traducción síncrona - 100% modular
  const t = (key: string, params?: Record<string, string | number>): string => {
    // Buscar en las traducciones modulares cargadas
    const value: unknown = getNestedValue(translations, key);
    
    // Si no se encuentra, devolver la clave como fallback
    let result: string = String(value || key);

    // Reemplazar parámetros si existen
    if (params && typeof result === 'string') {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        result = result.replace(new RegExp(`{${paramKey}}`, 'g'), String(paramValue));
      });
    }
    
    // Log para debugging en desarrollo
    if (!value && process.env.NODE_ENV === 'development') {
      console.warn(`🔍 Traducción no encontrada: ${key} (idioma: ${locale})`);
    }
    
    return String(result);
  };

  // Función para cargar y fusionar un módulo específico
  const loadAndMergeModule = async (moduleName: string, targetLocale: Locale = locale): Promise<void> => {
    const cacheKey = `${moduleName}-${targetLocale}`;
    
    // Si ya está cargado, no hacer nada
    if (loadedModules.has(cacheKey)) {
      return;
    }
    
    const isServiceModule = moduleName.startsWith('pages/services.');
    const currentId = isServiceModule ? ++serviceLoadIdRef.current : serviceLoadIdRef.current;

    // Si es módulo de servicio, limpiar inmediatamente antes de cargar
    if (isServiceModule) {
      const keysToClear = ['hero', 'pitch', 'definition', 'pains', 'outcomes', 'deliverables', 'steps', 'integrations', 'faqs'] as const;
      setTranslations(prev => {
        const cleaned: Record<string, unknown> = { ...(prev as Record<string, unknown>) };
        for (const k of keysToClear) {
          if (k in cleaned) delete cleaned[k];
        }
        return cleaned;
      });
    }

    const moduleData = await loadModularFile(moduleName, targetLocale);
    if (!moduleData) {
      return;
    }

    // Descartar cargas obsoletas de servicios (navegación rápida entre slugs)
    if (isServiceModule && currentId !== serviceLoadIdRef.current) {
      return;
    }

    setTranslations(prev => {
      let base = prev;
      // Para módulos de servicios, limpiar claves conflictivas antes de fusionar
      if (isServiceModule) {
        const keysToClear = ['hero', 'pitch', 'definition', 'pains', 'outcomes', 'deliverables', 'steps', 'integrations', 'faqs'] as const;
        const cleaned: Record<string, unknown> = { ...base } as Record<string, unknown>;
        for (const k of keysToClear) {
          if (k in cleaned) delete (cleaned as Record<string, unknown>)[k];
        }
        base = cleaned;
      }
      return { ...(base as Record<string, unknown>), ...(moduleData as Record<string, unknown>) };
    });

    setLoadedModules(prev => {
      const newSet = new Set(prev).add(cacheKey);
      previousModulesRef.current = newSet; // Mantener referencia actualizada
      return newSet;
    });
  };

  return (
    <ModularTranslationContext.Provider value={{ 
      locale, 
      changeLocale, 
      t,
      isLoading,
  loadModularTranslation: (moduleName: string) => loadAndMergeModule(moduleName, locale),
  get: (key: string) => getNestedValue(translations, key)
    }}>
      {children}
    </ModularTranslationContext.Provider>
  );
}

export function useModularTranslation() {
  const context = useContext(ModularTranslationContext);
  if (context === undefined) {
    throw new Error('useModularTranslation must be used within a ModularTranslationProvider');
  }
  return context;
}

// Hook de compatibilidad que mantiene la misma interfaz que el anterior
export function useTranslation() {
  const context = useModularTranslation();
  // Adaptación para mantener la compatibilidad con la firma anterior si es necesario
  return {
    ...context,
    loadModularTranslation: context.loadModularTranslation,
  };
}