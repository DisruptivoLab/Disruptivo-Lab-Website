/**
 * Client Providers
 * Wrapper para providers que necesitan ejecutarse en el cliente
 */

'use client';

import { ThemeProvider } from '@/contexts/theme-context';
import { ModularTranslationProvider } from '@/contexts/modular-translation-context';
import { NavbarProvider } from '@/contexts/navbar-context';
import { ErrorBoundary } from '@/components/ui/error-boundary'; // Importar ErrorBoundary
import { Navigation } from '@/components/layout/navigation';
import Footer from '@/components/layout/footer';
// import { LanguageDetectionToast } from '@/components/ui/language-detection-toast';
import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';

interface ClientProvidersProps {
  children: React.ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Rutas inmersivas: sin Navigation ni Footer (p. ej., /services/[slug])
  const isImmersive = useMemo(() => {
    if (!pathname) return false;
    // Ocultar en admin y en detalles de servicio
    if (pathname.startsWith('/admin')) return true;
    return pathname.startsWith('/services/') && pathname !== '/services';
  }, [pathname]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ThemeProvider>
      <ModularTranslationProvider>
        <NavbarProvider>
          <ErrorBoundary> {/* Envolver con ErrorBoundary */}
            {!mounted ? (
              <div className="bg-[#121212] text-white min-h-screen flex items-center justify-center">
                <div className="text-2xl font-heading">Cargando...</div>
              </div>
            ) : (
              <>
                {/* Header global (oculto en páginas inmersivas) */}
                {!isImmersive && <Navigation />}

                {children}
                {/* Footer global (oculto en páginas inmersivas) */}
                {!isImmersive && <Footer />}
                {/* <LanguageDetectionToast /> */}
              </>
            )}
          </ErrorBoundary>
        </NavbarProvider>
      </ModularTranslationProvider>
    </ThemeProvider>
  );
}