import { Metadata } from 'next';
import { generateHreflangMetadata } from './hreflang-metadata';

interface PageMetadataConfig {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  pathname: string;
}

export function generatePageMetadata(config: PageMetadataConfig): Metadata {
  const { title, description, keywords, ogImage, pathname } = config;
  const fullTitle = `${title} | Disruptivo Lab`;
  const image = ogImage || 'https://disruptivo.app/media/Identidad/iconotipo_disrptivo_Lab.png';

  return {
    title: fullTitle,
    description,
    keywords,
    alternates: generateHreflangMetadata(pathname),
    openGraph: {
      title: fullTitle,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      type: 'website',
      url: `https://disruptivo.app${pathname}`,
      siteName: 'Disruptivo Lab',
      locale: 'es_ES'
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image]
    }
  };
}

export const PAGE_METADATA = {
  services: {
    title: 'Servicios de IA y Automatización',
    description: 'Transformamos tu negocio con IA: WhatsApp IA, Automatización, Desarrollo Software, Consultoría Integral y Embudos IA. Resultados medibles en 30 días.',
    keywords: ['servicios IA', 'automatización empresarial', 'desarrollo software', 'consultoría digital', 'WhatsApp IA'],
    pathname: '/services'
  },
  about: {
    title: 'Sobre Disruptivo Lab - Innovación Radical',
    description: 'Agencia de innovación tecnológica especializada en IA. Metodología disruptiva, resultados reales. Transformamos ideas en futuros digitales desde 2020.',
    keywords: ['agencia IA', 'innovación tecnológica', 'transformación digital', 'disruptivo lab'],
    pathname: '/about'
  },
  method: {
    title: 'Metodología Disruptiva - Proceso de Trabajo',
    description: 'Descubre nuestra metodología ágil de 4 fases: Descubrimiento, Diseño, Desarrollo y Despliegue. Entrega en sprints de 2 semanas con resultados medibles.',
    keywords: ['metodología ágil', 'proceso desarrollo', 'sprints', 'entrega continua'],
    pathname: '/method'
  },
  portfolio: {
    title: 'Portfolio - Casos de Éxito',
    description: 'Proyectos reales de IA y automatización. +50 empresas transformadas, +200% ROI promedio. Ve cómo ayudamos a negocios como el tuyo.',
    keywords: ['casos de éxito', 'portfolio IA', 'proyectos automatización', 'testimonios clientes'],
    pathname: '/portfolio'
  },
  blog: {
    title: 'Blog - IA, Automatización y Tecnología',
    description: 'Artículos sobre inteligencia artificial, automatización empresarial, desarrollo software y tendencias tech. Guías prácticas y casos de uso reales.',
    keywords: ['blog IA', 'artículos automatización', 'guías tecnología', 'tendencias IA'],
    pathname: '/blog'
  },
  validatorAI: {
    title: 'Validator AI - Valida tu Idea de Negocio con IA',
    description: 'Herramienta gratuita de IA para validar ideas de negocio. Análisis de mercado, competencia y viabilidad en minutos. Powered by Google Gemini.',
    keywords: ['validar idea negocio', 'análisis mercado IA', 'viabilidad startup', 'validator AI'],
    pathname: '/validator-ai'
  }
} as const;
