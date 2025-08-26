import React from 'react';
import { MessageCircle, Workflow, Code2, Lightbulb, Funnel } from 'lucide-react';

export type ServiceTheme = {
  colors: [string, string];
  // Icono visual sugerido para el hero
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

// Mapa simple de slugs -> colores de marca + icono sugerido
// Ajusta libremente estos colores a la paleta definitiva.
export const SERVICE_THEMES: Record<string, ServiceTheme> = {
  'whatsapp-ia': {
    // Verde WhatsApp → verde profundo
    colors: ['#25D366', '#128C7E'],
    Icon: MessageCircle,
  },
  'automatizacion': {
    // Azul → violeta (automatización / flujos)
    colors: ['#3B82F6', '#8B5CF6'],
    Icon: Workflow,
  },
  'desarrollo-software': {
    // Naranja → rojo (energía / shipping)
    colors: ['#F97316', '#EF4444'],
    Icon: Code2,
  },
  'consultoria-integral': {
    // Dorado/ámbar → naranja suave (estrategia/insight)
    colors: ['#F59E0B', '#FB923C'],
    Icon: Lightbulb,
  },
  'embudo-ia': {
    // Verde menta → cian (optimización de conversión)
    colors: ['#10B981', '#06B6D4'],
    Icon: Funnel,
  },
};

export function getServiceTheme(slug?: string): ServiceTheme | null {
  if (!slug) return null;
  return SERVICE_THEMES[slug] ?? null;
}
