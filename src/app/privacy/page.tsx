import type { Metadata } from 'next';
import { PageLayout, PageHero, PageSection } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Disruptivo Lab',
  description: 'Lee nuestra política de privacidad y el tratamiento de datos personales en Disruptivo Lab.',
  robots: { index: true, follow: true }
};

export default function PrivacyPage() {
  return (
    <PageLayout containerSpacing="lg" maxWidth="4xl">
      <PageHero title="Política de Privacidad" />
      <PageSection>
        <div className="prose prose-neutral dark:prose-invert max-w-none text-sm">
          <p>En Disruptivo Lab nos tomamos muy en serio la privacidad de tus datos. Esta página resume de forma clara cómo recopilamos, usamos y protegemos tu información.</p>
          <h3>Recopilación de datos</h3>
          <p>Podemos recopilar datos de contacto (como nombre y correo) cuando nos escribes o completas formularios de contacto.</p>
          <h3>Uso de la información</h3>
          <p>Utilizamos los datos exclusivamente para responder a tus mensajes, brindar soporte y mejorar nuestros servicios.</p>
          <h3>Tus derechos</h3>
          <p>Puedes solicitar acceso, rectificación o eliminación de tus datos escribiendo a hola@disruptivolab.com.</p>
        </div>
      </PageSection>
    </PageLayout>
  );
}
