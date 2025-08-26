"use client";

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useModularTranslation } from '@/contexts/modular-translation-context';
import { cn } from '@/lib/utils';
import { Globe, X } from 'lucide-react';

const languages: Array<{ code: 'es' | 'en'; name: string; flag: string }> = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
];

export function LanguageModalTrigger({ className }: { className?: string }) {
  const { locale, changeLocale, loadModularTranslation } = useModularTranslation();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    loadModularTranslation('common');
    setMounted(true);
  }, [loadModularTranslation]);

  const current = languages.find((l) => l.code === locale) || languages[0];

  const onSelect = (code: 'es' | 'en') => {
    if (code !== locale) changeLocale(code);
    setOpen(false);
  };

  // Lock scroll while modal open
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    const body = document.body;
    if (open) {
      root.classList.add('overflow-hidden');
      body.classList.add('overflow-hidden');
    } else {
      root.classList.remove('overflow-hidden');
      body.classList.remove('overflow-hidden');
    }
    return () => {
      root.classList.remove('overflow-hidden');
      body.classList.remove('overflow-hidden');
    };
  }, [open, mounted]);

  return (
    <>
      {/* Trigger with exact glass classes like theme toggle */}
      <button
        type="button"
        className={cn(
          'w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center relative overflow-hidden',
          'backdrop-blur-[8px] backdrop-saturate-150',
          'transition-all duration-500 ease-out',
          'hover:scale-110 active:scale-95',
          'bg-white/8 dark:bg-white/6',
          'shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),inset_2px_4px_0px_-2px_rgba(255,255,255,0.85),inset_-2px_-2px_0px_-2px_rgba(255,255,255,0.75),inset_-4px_-10px_2px_-6px_rgba(255,255,255,0.55),inset_-0.5px_-1px_6px_0px_rgba(0,0,0,0.08),inset_-2px_3px_0px_-2px_rgba(0,0,0,0.15),inset_0px_4px_6px_-2px_rgba(0,0,0,0.15),inset_3px_-8px_2px_-4px_rgba(0,0,0,0.08),0px_2px_8px_0px_rgba(0,0,0,0.08),0px_8px_20px_0px_rgba(0,0,0,0.06)]',
          className,
        )}
        aria-label="Seleccionar idioma"
        onClick={() => setOpen(true)}
      >
        <span className="relative z-10 text-[11px] sm:text-xs md:text-sm font-semibold tracking-wide">
          {String(locale).toUpperCase()}
        </span>
        <Globe className="absolute right-1 bottom-1 w-3.5 h-3.5 text-foreground/50" />
      </button>

      {/* Modal rendered in portal to avoid stacking context issues */}
      {mounted && open &&
        createPortal(
          <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4">
            {/* Backdrop */}
            <button
              className="absolute inset-0 bg-black/50 dark:bg-black/60 backdrop-blur-sm"
              aria-label="Cerrar"
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <div
              role="dialog"
              aria-modal="true"
              className={cn(
                'relative w-full max-w-sm sm:max-w-md rounded-3xl overflow-hidden border',
                'backdrop-blur-[14px] backdrop-saturate-150',
                'bg-white/70 text-black border-black/10 dark:bg-white/10 dark:text-white dark:border-white/10',
                'shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14),0px_8px_32px_rgba(0,0,0,0.2)]',
                // leave room for bottom bar on mobile
                'mb-[calc(env(safe-area-inset-bottom)+96px)] sm:mb-0'
              )}
            >
              <button
                className="absolute top-3 right-3 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                autoFocus
              >
                <X className="w-5 h-5" />
              </button>
              <div className="p-5 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3">Idioma / Language</h3>
                <div className="grid grid-cols-2 gap-3">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => onSelect(l.code)}
                      className={cn(
                        'rounded-2xl px-4 py-3 text-left flex items-center gap-3 transition-all duration-200 hover:scale-[1.02] active:scale-95',
                        'backdrop-blur-sm',
                        l.code === locale
                          ? 'bg-orange-500/20 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)]'
                          : 'bg-black/5 hover:bg-black/7 dark:bg-white/8 dark:hover:bg-white/12',
                      )}
                    >
                      <span className="text-xl">{l.flag}</span>
                      <span className="text-sm font-medium">{l.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
