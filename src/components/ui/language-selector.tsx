/**
 * Language Selector Component
 * Selector de idioma con banderas y dropdown animado
 */

'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { useModularTranslation } from '@/contexts/modular-translation-context';

const languages: Array<{ code: 'es' | 'en', name: string, flag: string }> = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇺🇸' }
];

export function LanguageSelector() {
  const { locale, changeLocale, t, loadModularTranslation } = useModularTranslation();

  useEffect(() => {
    loadModularTranslation('components/ui/language-selector');
  }, [loadModularTranslation]);
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  const changeLanguage = (newLocale: 'es' | 'en') => {
    changeLocale(newLocale);
    setIsOpen(false);
  };

  return (
    <>
      {/* Botón del selector */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 h-12 rounded-xl
                     backdrop-blur-[8px] backdrop-saturate-150 border
                     bg-white/15 border-white/20 hover:bg-white/25
                     hover:scale-105 transition-all duration-300 ease-in-out relative overflow-hidden"
          aria-label={t('language_selector.label')}
        >
          {/* Brillo interno sutil */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          
          <Globe className="w-4 h-4 relative z-10 text-white" />
          <span className="text-sm font-medium relative z-10 text-white">{currentLanguage.flag}</span>
          <ChevronDown 
            className={`w-4 h-4 transition-transform duration-200 relative z-10 text-white ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`} 
          />
        </button>
      </div>

      {/* Dropdown como portal fuera del navbar */}
      {isOpen && (
        <>
          {/* Overlay para cerrar */}
          <div 
            className="fixed inset-0 z-[100]" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown posicionado dinámicamente */}
          <div className="fixed top-24 right-4 md:right-8 lg:right-[12%] z-[101] min-w-[200px]
                         backdrop-blur-xl backdrop-saturate-150 border rounded-2xl overflow-hidden
                         shadow-2xl drop-shadow-xl animate-in slide-in-from-top-2 duration-200
                         bg-black/90 border-white/20">
            {/* Brillo interno del dropdown */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className={`w-full px-4 py-3 text-left flex items-center gap-3 relative z-10
                           transition-all duration-200
                           hover:bg-white/15 first:rounded-t-2xl last:rounded-b-2xl
                           ${locale === language.code 
                             ? 'bg-orange-500/20 border-l-4 border-orange-500' 
                             : ''
                           }`}
              >
                <span className="text-lg">{language.flag}</span>
                <span className="font-body text-sm font-medium text-white">
                  {language.name}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
}