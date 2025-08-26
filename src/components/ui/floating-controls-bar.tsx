"use client";

import { cn } from '@/lib/utils';
import { LanguageModalTrigger } from './language-modal-trigger';
import { SimpleThemeToggle } from './simple-theme-toggle';
import { FrostedButton } from './frosted-button';
import { useModularTranslation } from '@/contexts/modular-translation-context';
import { useEffect } from 'react';
import { Phone } from 'lucide-react';

type FloatingControlsBarProps = {
  onContact: () => void;
  className?: string;
};

export function FloatingControlsBar({ onContact, className }: FloatingControlsBarProps) {
  const { t, get, loadModularTranslation } = useModularTranslation();

  useEffect(() => {
    // Cargamos módulos necesarios para el texto del CTA (cacheados si ya están)
    loadModularTranslation('components/modals/contact');
    loadModularTranslation('pages/services-common');
  }, [loadModularTranslation]);

  // Resolver etiqueta del CTA evitando el fallback de t() que devuelve la clave
  const ctaLabel =
    (get('cta.button') as string) || // services-common
    (get('servicesLanding.ctaBlock.primary') as string) || // landing
    (t('cta.contact') as string) || // common
    'Hablemos';

  return (
    <div
      className={cn(
        'fixed left-1/2 -translate-x-1/2 bottom-4 md:bottom-6 z-50',
        'px-3 md:px-4 py-2 md:py-2.5 rounded-full flex items-center gap-2 md:gap-3',
        'w-[90vw] md:w-[30vw] max-w-[680px] pb-[env(safe-area-inset-bottom)]',
        className
      )}
      role="toolbar"
      aria-label="Controles de página"
    >
      {/* Idioma */}
      <div className="shrink-0">
        <LanguageModalTrigger />
      </div>

      {/* CTA centrado tipo pill con texto + icono (estilo glass igual al toggle) */}
      <div className="flex-1 px-1">
  <FrostedButton
          variant="glass"
          size="md"
          onClick={onContact}
          className={
            // Fuerzo paridad con toggle: blur 8, bg neutral y stack de sombras del toggle
            'w-full backdrop-blur-[8px] bg-white/8 dark:bg-white/6 ' +
            'shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),inset_2px_4px_0px_-2px_rgba(255,255,255,0.85),inset_-2px_-2px_0px_-2px_rgba(255,255,255,0.75),inset_-4px_-10px_2px_-6px_rgba(255,255,255,0.55),inset_-0.5px_-1px_6px_0px_rgba(0,0,0,0.08),inset_-2px_3px_0px_-2px_rgba(0,0,0,0.15),inset_0px_4px_6px_-2px_rgba(0,0,0,0.15),inset_3px_-8px_2px_-4px_rgba(0,0,0,0.08),0px_2px_8px_0px_rgba(0,0,0,0.08),0px_8px_20px_0px_rgba(0,0,0,0.06)] '
          }
          aria-label={ctaLabel}
          title={ctaLabel}
        >
          <span className="flex items-center justify-center gap-2">
            <Phone className="w-4.5 h-4.5 md:w-5 md:h-5" strokeWidth={2.2} />
            <span>{ctaLabel}</span>
          </span>
        </FrostedButton>
      </div>

      {/* Tema */}
      <div className="shrink-0">
        <SimpleThemeToggle />
      </div>
    </div>
  );
}
