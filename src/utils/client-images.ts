import { portfolioClientsBase } from '@/config/portfolio';

/**
 * Utilidad para generar imágenes placeholder específicas por sector
 * Mientras conseguimos las imágenes reales de cada cliente
 */

const clientImageMappings = {
  'tagger-pet': 'https://picsum.photos/seed/taggerpet-petcare/800/600',
  'bee-consultoria': 'https://picsum.photos/seed/bee-fintech/800/600', 
  'domipet': 'https://picsum.photos/seed/domipet-ecommerce/800/600',
  'sivespa': 'https://picsum.photos/seed/sivespa-health/800/600',
  'solodomis': 'https://picsum.photos/seed/solodomis-marketing/800/600',
  'papas-paisas': 'https://picsum.photos/seed/papaspaisas-food/800/600'
};

export const getClientImage = (clientId: string): string => {
  return clientImageMappings[clientId as keyof typeof clientImageMappings] || 
         `https://picsum.photos/seed/${clientId}/800/600`;
};

// Función para actualizar dinámicamente las imágenes de clientes
export const updateClientImages = () => {
  return portfolioClientsBase.map(client => ({
    ...client,
    image: getClientImage(client.id)
  }));
};
