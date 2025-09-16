/**
 * Configuración del Portafolio - Disruptivo Lab
 * Sistema modular para gestionar casos de éxito de clientes con soporte i18n
 */

export interface PortfolioClient {
  id: string;
  name: string; // Se mantiene igual en todos los idiomas
  website?: string;
  image: string;
  year: string;
  // Los siguientes campos se obtienen de i18n
  // title, description, category, tags, industry
}

// Datos base de los clientes (sin contenido traducible)
export const portfolioClientsBase: PortfolioClient[] = [
  {
    id: 'tagger-pet',
    name: 'TAGGER PET',
    website: 'https://taggerpet.com',
    image: '/media/clients/taggerpet.svg',
    year: '2024'
  },
  {
    id: 'bee-consultoria',
    name: 'BEE CONSULTORÍA',
    image: '/media/clients/beeconsultoria.svg',
    year: '2024'
  },
  {
    id: 'domipet',
    name: 'DOMIPET',
    website: 'https://www.domipet.com',
    image: '/media/clients/domipet.svg',
    year: '2024'
  },
  {
    id: 'solodomis',
    name: 'SOLODOMIS',
    image: '/media/clients/solodomis.svg',
    year: '2024'
  },
  {
    id: 'papas-paisas',
    name: 'PAPAS PAISAS',
    image: '/media/clients/papaspaisas.svg',
    year: '2024'
  }
];

// Interface para cliente con datos de i18n combinados
export interface LocalizedPortfolioClient extends PortfolioClient {
  title: string;
  description: string;
  category: string;
  industry: string;
  tags: string[];
}

// Helper para combinar datos base con traducciones
export const getLocalizedClient = (
  clientBase: PortfolioClient, 
  translations: any
): LocalizedPortfolioClient => {
  // Verificar que existan las traducciones de clientes
  if (!translations?.clients) {
    console.warn('No se encontraron traducciones de clientes');
    return {
      ...clientBase,
      title: '',
      description: '',
      category: '',
      industry: '',
      tags: []
    };
  }

  const clientTranslations = translations.clients[clientBase.id];
  
  if (!clientTranslations) {
    console.warn(`No se encontraron traducciones para el cliente: ${clientBase.id}`);
    return {
      ...clientBase,
      title: '',
      description: '',
      category: '',
      industry: '',
      tags: []
    };
  }
  
  return {
    ...clientBase,
    title: clientTranslations?.title || '',
    description: clientTranslations?.description || '',
    category: clientTranslations?.category || '',
    industry: clientTranslations?.industry || '',
    tags: clientTranslations?.tags || []
  };
};

// Helper para obtener todas las categorías localizadas
export const getLocalizedCategories = (translations: any): string[] => {
  if (!translations?.clients) {
    return ['All']; // Fallback básico
  }
  
  const categories = new Set<string>();
  
  portfolioClientsBase.forEach(client => {
    const clientTranslations = translations.clients[client.id];
    if (clientTranslations?.category) {
      categories.add(clientTranslations.category);
    }
  });
  
  return [translations.filterAll || 'All', ...Array.from(categories)];
};

// Helper para obtener cliente por ID
export const getClientById = (id: string): PortfolioClient | undefined => {
  return portfolioClientsBase.find(client => client.id === id);
};
