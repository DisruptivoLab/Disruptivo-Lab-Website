/**
 * Contact Button Component
 * Botón de contacto compacto con estilo Liquid Glass
 */

'use client';

import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { useTheme } from '@/contexts/theme-context';
import { useModularTranslation } from '@/contexts/modular-translation-context';
import { cn } from '@/lib/utils';
import { ContactModal } from './contact-modal';

export function ContactButton() {
  const { theme } = useTheme();
  const { t, loadModularTranslation } = useModularTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadModularTranslation('components/modals/contact');
  }, [loadModularTranslation]);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={cn(
          "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center relative overflow-hidden",
          "backdrop-blur-[8px] backdrop-saturate-150 transition-all duration-500 ease-out hover:scale-110 active:scale-95",
          "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),inset_2px_4px_0px_-2px_rgba(255,255,255,0.85),inset_-2px_-2px_0px_-2px_rgba(255,255,255,0.75),inset_-4px_-10px_2px_-6px_rgba(255,255,255,0.55),inset_-0.5px_-1px_6px_0px_rgba(0,0,0,0.08),inset_-2px_3px_0px_-2px_rgba(0,0,0,0.15),inset_0px_4px_6px_-2px_rgba(0,0,0,0.15),inset_3px_-8px_2px_-4px_rgba(0,0,0,0.08),0px_2px_8px_0px_rgba(0,0,0,0.08),0px_8px_20px_0px_rgba(0,0,0,0.06)]",
          theme === 'dark' ? 'bg-white/8 hover:bg-white/15' : 'bg-black/8 hover:bg-black/15'
        )}
        aria-label={t('title')}
      >
        <Phone 
          className={cn(
            "w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 transition-colors duration-300",
            theme === 'dark' ? 'text-white' : 'text-black'
          )} 
        />
      </button>

      <ContactModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}