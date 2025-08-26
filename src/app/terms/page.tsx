import type { Metadata } from 'next';
import { PageLayout, PageHero, PageSection } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Disruptivo Lab',
  description: 'Conoce los términos y condiciones de uso del sitio y servicios de Disruptivo Lab.',
  robots: { index: true, follow: true }
};

export default function TermsPage() {
  return (
    <PageLayout containerSpacing="lg" maxWidth="4xl">
      <PageHero title="Términos y Condiciones" />
      <PageSection>
        <div className="prose prose-neutral dark:prose-invert max-w-none text-sm">
          <p>Bienvenido a Disruptivo Lab. Al acceder y utilizar este sitio aceptas estos términos y condiciones.</p>
          <h3>Uso del sitio</h3>
          <p>Te comprometes a utilizar el sitio de forma lícita y respetuosa, sin vulnerar derechos de terceros.</p>
          <h3>Propiedad intelectual</h3>
          <p>Los contenidos, marcas y logotipos son propiedad de sus respectivos titulares y están protegidos por la ley.</p>
          <h3>Limitación de responsabilidad</h3>
          <p>El sitio se ofrece “tal cual”. No nos hacemos responsables por daños derivados del uso del sitio.</p>
        </div>
      </PageSection>
    </PageLayout>
  );
}
