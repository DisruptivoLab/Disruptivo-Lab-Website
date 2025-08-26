'use client';

import { useModularTranslation } from '@/contexts/modular-translation-context';
import { PageLoading } from '@/components/ui/global-loading';

/**
 * Componente que muestra loading global cuando el sistema de traducciones está cargando
 */
export function AppLoading() {
  const { isLoading } = useModularTranslation();

  // Solo mostrar loading si las traducciones están cargando inicialmente
  if (!isLoading) return null;

  return <PageLoading />;
}
