import { ReactNode } from 'react';
import { ModularTranslationProvider } from '@/contexts/modular-translation-context';

interface AITranslationProviderProps {
  children: ReactNode;
}

export function AITranslationProvider({ children }: AITranslationProviderProps) {
  return (
    <ModularTranslationProvider>
      {children}
    </ModularTranslationProvider>
  );
}
