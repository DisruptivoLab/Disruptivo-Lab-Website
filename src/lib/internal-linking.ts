/**
 * Keywords long-tail para internal linking automático
 * Mapea keywords a URLs de destino
 */

export const internalLinkingKeywords: Record<string, { url: string; title: string }> = {
  // Servicios principales
  'automatización WhatsApp': {
    url: '/services/whatsapp-ia',
    title: 'Automatización de WhatsApp con IA'
  },
  'chatbot inteligente': {
    url: '/services/whatsapp-ia',
    title: 'Chatbots Inteligentes con IA'
  },
  'desarrollo de software': {
    url: '/services/desarrollo-software',
    title: 'Desarrollo de Software con IA'
  },
  'consultoría digital': {
    url: '/services/consultoria-integral',
    title: 'Consultoría Digital e IA'
  },
  'automatización empresarial': {
    url: '/services/automatizacion',
    title: 'Automatización Empresarial'
  },
  'embudo de ventas': {
    url: '/services/embudo-ia',
    title: 'Embudo de Ventas con IA'
  },

  // Keywords long-tail
  'cómo implementar IA': {
    url: '/blog',
    title: 'Guías de Implementación de IA'
  },
  'agentes IA': {
    url: '/blog',
    title: 'Artículos sobre Agentes de IA'
  },
  'transformación digital': {
    url: '/about',
    title: 'Transformación Digital con Disruptivo Lab'
  },
  'inteligencia artificial': {
    url: '/blog',
    title: 'Blog de Inteligencia Artificial'
  },

  // Páginas importantes
  'metodología disruptiva': {
    url: '/method',
    title: 'Nuestra Metodología'
  },
  'portafolio': {
    url: '/portfolio',
    title: 'Casos de Éxito'
  },
  'validator ai': {
    url: '/validator-ai',
    title: 'Validator AI - Validación de Ideas'
  }
};

/**
 * Agrega enlaces internos automáticamente al contenido HTML
 * Solo enlaza la primera ocurrencia de cada keyword
 */
export function addInternalLinks(htmlContent: string): string {
  let content = htmlContent;
  const linkedKeywords = new Set<string>();

  // Ordenar keywords por longitud (más largas primero) para evitar conflictos
  const sortedKeywords = Object.keys(internalLinkingKeywords).sort((a, b) => b.length - a.length);

  for (const keyword of sortedKeywords) {
    if (linkedKeywords.has(keyword)) continue;

    const { url, title } = internalLinkingKeywords[keyword];
    
    // Regex para encontrar keyword fuera de tags HTML y enlaces existentes
    const regex = new RegExp(
      `(?<!<[^>]*)(${keyword})(?![^<]*>)(?![^<]*<\\/a>)`,
      'gi'
    );

    // Solo reemplazar la primera ocurrencia
    let replaced = false;
    content = content.replace(regex, (match) => {
      if (replaced) return match;
      replaced = true;
      linkedKeywords.add(keyword);
      return `<a href="${url}" class="internal-link" title="${title}">${match}</a>`;
    });
  }

  return content;
}

/**
 * Obtiene posts relacionados por keywords compartidas
 */
export function getRelatedPostsByKeywords(
  currentPostContent: string,
  allPosts: Array<{ slug: string; title: string; content: string }>
): Array<{ slug: string; title: string; score: number }> {
  const keywords = Object.keys(internalLinkingKeywords);
  const currentKeywords = keywords.filter(k => 
    currentPostContent.toLowerCase().includes(k.toLowerCase())
  );

  const relatedPosts = allPosts
    .map(post => {
      const matchingKeywords = currentKeywords.filter(k =>
        post.content.toLowerCase().includes(k.toLowerCase())
      );
      return {
        slug: post.slug,
        title: post.title,
        score: matchingKeywords.length
      };
    })
    .filter(post => post.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return relatedPosts;
}
