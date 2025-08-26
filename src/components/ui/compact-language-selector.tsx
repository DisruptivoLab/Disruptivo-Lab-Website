/**
 * Compact Language Selector Component
 * Selector de idioma compacto para el navbar
 */

'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useModularTranslation } from '@/contexts/modular-translation-context';
import { useTheme } from '@/contexts/theme-context';
import { cn } from '@/lib/utils';

const languages: Array<{ code: 'es' | 'en', name: string, flag: string }> = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇺🇸' }
];

export function CompactLanguageSelector() {
  const { locale, changeLocale, loadModularTranslation } = useModularTranslation();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadModularTranslation('common');
  }, [loadModularTranslation]);

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  const changeLanguage = (newLocale: 'es' | 'en') => {
    changeLocale(newLocale);
    setIsOpen(false);
  };

  return (
    <>
      {/* Botón compacto */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center relative overflow-hidden",
            "backdrop-blur-[8px] backdrop-saturate-150 transition-all duration-500 ease-out hover:scale-110 active:scale-95",
            "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),inset_2px_4px_0px_-2px_rgba(255,255,255,0.85),inset_-2px_-2px_0px_-2px_rgba(255,255,255,0.75),inset_-4px_-10px_2px_-6px_rgba(255,255,255,0.55),inset_-0.5px_-1px_6px_0px_rgba(0,0,0,0.08),inset_-2px_3px_0px_-2px_rgba(0,0,0,0.15),inset_0px_4px_6px_-2px_rgba(0,0,0,0.15),inset_3px_-8px_2px_-4px_rgba(0,0,0,0.08),0px_2px_8px_0px_rgba(0,0,0,0.08),0px_8px_20px_0px_rgba(0,0,0,0.06)]",
            theme === 'dark' ? 'bg-white/8' : 'bg-black/8'
          )}
          aria-label="Seleccionar idioma"
        >
          <span className="text-sm sm:text-base md:text-lg relative z-10">{currentLanguage.flag}</span>
          <ChevronDown 
            className={cn(
              "absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 md:bottom-1.5 md:right-1.5 w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 transition-all duration-300",
              theme === 'dark' ? 'text-white/60' : 'text-black/60',
              isOpen ? 'rotate-180 scale-110' : 'rotate-0 scale-100'
            )} 
          />
        </button>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Overlay para cerrar */}
          <div 
            className="fixed inset-0 z-[100]" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown posicionado dinámicamente con diseño más natural */}
          <div className={cn(
            "absolute top-full right-0 mt-2 z-[101] min-w-[180px] sm:min-w-[220px] max-w-[240px] sm:max-w-[280px]",
            "backdrop-blur-[12px] backdrop-saturate-150 rounded-3xl overflow-hidden",
            "shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08)]",
            "border border-white/10 transform-gpu animate-in slide-in-from-top-2 duration-300 ease-out",
            "sm:right-0 right-[-50px]",
            theme === 'dark' ? 'bg-white/8' : 'bg-black/8'
          )}>
            {/* Brillo interno del dropdown más sutil */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/3 to-transparent pointer-events-none rounded-3xl" />
            {languages.map((language, index) => (
              <button
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 md:px-5 md:py-4 text-left flex items-center gap-3 sm:gap-4 relative z-10
                           transition-all duration-300 ease-out
                           hover:bg-white/12 hover:scale-[1.02] active:scale-[0.98]
                           ${index === 0 ? 'rounded-t-3xl' : ''}
                           ${index === languages.length - 1 ? 'rounded-b-3xl' : ''}
                           ${locale === language.code 
                             ? 'bg-orange-500/15 border-l-4 border-orange-400/80' 
                             : ''
                           }`}
              >
                <span className="text-base sm:text-lg md:text-xl">{language.flag}</span>
                <span className={cn(
                  "font-body text-xs sm:text-sm font-medium transition-colors duration-300",
                  theme === 'dark' ? 'text-white' : 'text-black'
                )}>
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