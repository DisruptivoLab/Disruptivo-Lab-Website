import type { Metadata } from 'next';
import { PageLayout, PageHero, PageSection } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Política de Cookies | Disruptivo Lab',
  description: 'Consulta nuestra política de cookies y cómo gestionarlas al navegar en este sitio.',
  robots: { index: true, follow: true }
};

export default function CookiesPage() {
  return (
    <PageLayout containerSpacing="lg" maxWidth="4xl">
      <PageHero title="Política de Cookies" />
      <PageSection>
        <div className="prose prose-neutral dark:prose-invert max-w-none text-sm">
          <p>Este sitio utiliza cookies para mejorar tu experiencia de navegación. Puedes gestionar o desactivar las cookies desde la configuración de tu navegador.</p>
          <h3>¿Qué son las cookies?</h3>
          <p>Son pequeños archivos que se almacenan en tu dispositivo para recordar tus preferencias y entender cómo utilizas el sitio.</p>
          <h3>Tipos de cookies que usamos</h3>
          <p>Cookies esenciales para el funcionamiento del sitio y cookies analíticas de uso anónimo.</p>
        </div>
      </PageSection>
    </PageLayout>
  );
}
