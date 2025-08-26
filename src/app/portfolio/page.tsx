'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SimpleGlassCard, SimpleFrostedButton } from '@/components/ui';
import { X, ExternalLink, Calendar, Tag } from 'lucide-react';
import Image from 'next/image';
import Masonry from 'react-masonry-css';
import { portfolioClientsBase, getLocalizedClient, getLocalizedCategories, type LocalizedPortfolioClient } from '@/config/portfolio';
import { useModularTranslation } from '@/contexts/modular-translation-context';
import { useTheme } from '@/contexts/theme-context';
import { SectionLoading } from '@/components/ui/global-loading';

export default function PortfolioPage() {
  const { loadModularTranslation, t, get, locale } = useModularTranslation();
  const { theme } = useTheme();
  const [selectedClient, setSelectedClient] = useState<LocalizedPortfolioClient | null>(null);
  const [filter, setFilter] = useState<string>('Todos'); // Valor por defecto
  const [localizedClients, setLocalizedClients] = useState<LocalizedPortfolioClient[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isTranslationsLoaded, setIsTranslationsLoaded] = useState(false);

  // Cargar traducciones del portafolio
  useEffect(() => {
    const loadPortfolioTranslations = async () => {
      try {
        await loadModularTranslation('pages/portfolio');
        setIsTranslationsLoaded(true);
      } catch (error) {
        console.error('Error loading portfolio translations:', error);
        setIsTranslationsLoaded(true); // Continuar aunque falle
      }
    };

    loadPortfolioTranslations();
  }, [loadModularTranslation]);

  // Cargar datos base inmediatamente (sin traducciones)
  useEffect(() => {
    if (localizedClients.length === 0) {
      // Crear clientes con datos base (fallback)
      const baseClientes = portfolioClientsBase.map(client => ({
        ...client,
        title: client.name,
        description: 'Descripción no disponible',
        category: 'Otros',
        industry: 'General',
        tags: []
      }));
      setLocalizedClients(baseClientes);
      setCategories(['Todos', 'Otros']);
    }
  }, [localizedClients.length]);

  // Actualizar datos localizados cuando las traducciones cambien
  useEffect(() => {
    if (isTranslationsLoaded) {
      // Obtener traducciones completas
      const clientsTranslations = get('clients');
      const filterAllTranslation = get('filterAll');
      
      console.log('Traducciones de clientes disponibles:', clientsTranslations);
      
      // Solo proceder si tenemos las traducciones de clientes
      if (clientsTranslations && typeof clientsTranslations === 'object') {
        const allTranslations = {
          clients: clientsTranslations,
          filterAll: filterAllTranslation
        };
        
        // Crear clientes localizados
        const localized = portfolioClientsBase.map(client => 
          getLocalizedClient(client, allTranslations)
        );
        setLocalizedClients(localized);
        
        // Crear categorías localizadas
        const localizedCategories = getLocalizedCategories(allTranslations);
        setCategories(localizedCategories);
        
        // Actualizar filtro inicial si las traducciones están disponibles
        const filterAllText = t('filterAll') || 'Todos';
        if (filter === 'Todos' && filterAllText !== 'Todos') {
          setFilter(filterAllText);
        }
      } else {
        console.warn('Las traducciones de clientes no están disponibles aún');
      }
    }
  }, [isTranslationsLoaded, get, t, filter]);

  // Mostrar loading mientras las traducciones se cargan
  if (!isTranslationsLoaded) {
    return <SectionLoading />;
  }

  // Filtrar clientes por categoría
  const filteredClients = localizedClients.filter(client => {
    const filterAllText = t('filterAll') || 'Todos';
    // Si no hay filtro definido o es "Todos", mostrar todos los proyectos
    if (!filter || filter === filterAllText || filter === 'Todos' || filter === 'All') {
      return true;
    }
    return client.category === filter;
  });

  return (
    <div className="min-h-screen pt-28 pb-16 px-4">
      <div className="container mx-auto text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-heading font-bold text-foreground"
        >
          {t('title') || 'Nuestro Portafolio'}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl font-body text-muted-foreground mt-4 max-w-2xl mx-auto"
        >
          {t('subtitle') || 'Casos de éxito donde la innovación y la tecnología se encuentran para crear resultados reales.'}
        </motion.p>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 my-8 px-4">
          {categories.map(category => (
            <SimpleFrostedButton 
              key={category}
              onClick={() => setFilter(category)}
              variant={filter === category ? 'primary' : 'secondary'}
              size="sm"
              className="px-4 py-2 text-sm whitespace-nowrap"
            >
              {category}
            </SimpleFrostedButton>
          ))}
        </div>

        <Masonry
          breakpointCols={{
            default: 3,
            1280: 2,  // xl breakpoint  
            768: 1    // md breakpoint
          }}
          className="my-masonry-grid mt-8"
          columnClassName="my-masonry-grid_column"
        >
          {filteredClients.map(client => (
            <motion.div 
              key={client.id} 
              onClick={() => setSelectedClient(client)}
              className="mb-8 cursor-pointer group"
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SimpleGlassCard variant="medium" hover className="p-0 overflow-hidden">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image 
                    src={client.image} 
                    alt={`Proyecto ${client.name}`} 
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  
                  {/* Etiquetas flotantes */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className="px-2 py-1 rounded-full backdrop-blur-[8px] backdrop-saturate-150 bg-white/20 border border-white/30">
                      <span className="text-xs font-heading text-white font-medium">{client.year}</span>
                    </div>
                    <div className="px-2 py-1 rounded-full backdrop-blur-[8px] backdrop-saturate-150 bg-primary/20 border border-primary/40">
                      <span className="text-xs font-heading text-white font-medium">{client.industry}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-heading text-lg font-bold text-foreground mb-1">{client.name}</h3>
                      <p className="font-body text-primary text-sm font-medium uppercase tracking-wider">{client.category}</p>
                    </div>
                    {client.website && (
                      <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    )}
                  </div>
                  <p className="font-body text-muted-foreground text-sm mb-4 line-clamp-2">{client.title}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {client.tags.slice(0, 3).map((tag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 text-xs font-body bg-muted/20 text-muted-foreground rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {client.tags.length > 3 && (
                      <span className="px-2 py-1 text-xs font-body bg-primary/10 text-primary rounded-full">
                        +{client.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </SimpleGlassCard>
            </motion.div>
          ))}
        </Masonry>        {/* Modal */}
        <AnimatePresence>
          {selectedClient && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`fixed inset-0 backdrop-blur-xl backdrop-saturate-[1.8] z-50 flex items-center justify-center p-4 ${
                theme === 'dark' ? 'bg-black/60' : 'bg-black/40'
              }`}
              onClick={() => setSelectedClient(null)}
            >
              <motion.div 
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="w-full max-w-4xl max-h-[90vh] overflow-hidden"
              >
                <div className={`relative overflow-hidden rounded-2xl border shadow-xl backdrop-blur-xl backdrop-saturate-150 ${
                  theme === 'dark' 
                    ? 'bg-black/40 border-white/20' 
                    : 'bg-white/90 border-white/30'
                }`}>
                  <div className="grid lg:grid-cols-2 min-h-[500px]">
                    {/* Imagen */}
                    <div className="relative aspect-[4/3] lg:aspect-auto">
                      <Image 
                        src={selectedClient.image} 
                        alt={`Proyecto ${selectedClient.name}`} 
                        fill
                        className="object-cover" 
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      {/* Overlay con tags */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                        {selectedClient.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 text-sm font-heading backdrop-blur-[8px] backdrop-saturate-150 bg-white/20 text-white border border-white/30 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Contenido */}
                    <div className="p-6 md:p-8 flex flex-col max-h-[500px] lg:max-h-none overflow-y-auto">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">{selectedClient.name}</h2>
                          <p className="font-body text-primary text-sm uppercase tracking-wider font-medium mb-1">{selectedClient.category}</p>
                          <h3 className="font-heading text-lg text-muted-foreground font-medium">{selectedClient.title}</h3>
                        </div>
                        <button 
                          onClick={() => setSelectedClient(null)} 
                          className={`ml-4 p-2 rounded-full backdrop-blur-[8px] backdrop-saturate-150 transition-all duration-300 hover:scale-105 border flex-shrink-0 ${
                            theme === 'dark' 
                              ? 'bg-white/10 hover:bg-white/20 border-white/20 text-white' 
                              : 'bg-black/10 hover:bg-black/20 border-black/20 text-black'
                          }`}
                          title={t('modal.closeButton') || 'Cerrar modal'}
                          aria-label={t('modal.closeButton') || 'Cerrar modal'}
                        >
                          <X className="w-6 h-6" />
                        </button>
                      </div>

                      {/* Metadatos */}
                      <div className="flex items-center gap-6 mb-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span className="font-body">{selectedClient.year}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4" />
                          <span className="font-body">{selectedClient.industry}</span>
                        </div>
                      </div>

                      {/* Descripción */}
                      <div className="flex-1 mb-6">
                        <p className="font-body text-muted-foreground leading-relaxed">{selectedClient.description}</p>
                      </div>

                      {/* Acciones */}
                      <div className={`flex gap-4 pt-4 border-t ${
                        theme === 'dark' ? 'border-white/10' : 'border-black/10'
                      }`}>
                        {selectedClient.website && (
                          <a 
                            href={selectedClient.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-[8px] backdrop-saturate-150 bg-primary/20 hover:bg-primary/30 text-primary hover:text-primary border border-primary/40 transition-all duration-300 hover:scale-105 font-heading text-sm font-medium"
                          >
                            <ExternalLink className="w-4 h-4" />
                            {t('modal.visitSite') || 'Visitar sitio'}
                          </a>
                        )}
                        <SimpleFrostedButton 
                          variant="secondary" 
                          size="sm"
                          onClick={() => setSelectedClient(null)}
                          className="px-4 py-2"
                        >
                          {t('modal.close') || 'Cerrar'}
                        </SimpleFrostedButton>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
