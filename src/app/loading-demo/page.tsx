'use client';

import { useState } from 'react';
import { 
  PulseLoading, 
  SpinLoading, 
  MorphLoading, 
  GlitchLoading, 
  QuantumLoading 
} from '@/components/ui/disruptivo-loading';
import { 
  BreatheLoading, 
  FloatLoading, 
  FadeLoading, 
  ScaleLoading 
} from '@/components/ui/lightweight-loading';

export default function LoadingDemoPage() {
  const [selectedSize, setSelectedSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'lightweight' | 'standard'>('all');

  const lightweightProposals = [
    {
      id: 'breathe',
      name: 'Breathe',
      component: BreatheLoading,
      weight: '⭐⭐⭐⭐⭐⭐',
      description: 'Respiración suave. Solo escala y opacidad mínimas.',
      performance: 'CPU: ~1%, Memory: <0.5MB',
      bestFor: 'Estados de carga universales, siempre visible',
      category: 'lightweight'
    },
    {
      id: 'float',
      name: 'Float',
      component: FloatLoading,
      weight: '⭐⭐⭐⭐⭐⭐',
      description: 'Flotación vertical sutil. Movimiento Y mínimo.',
      performance: 'CPU: ~1%, Memory: <0.5MB',
      bestFor: 'Elementos que necesitan sensación de liviandad',
      category: 'lightweight'
    },
    {
      id: 'fade',
      name: 'Fade',
      component: FadeLoading,
      weight: '⭐⭐⭐⭐⭐⭐',
      description: 'Desvanecimiento puro. Solo cambia opacidad.',
      performance: 'CPU: ~0.5%, Memory: <0.3MB',
      bestFor: 'Máximo rendimiento, mínimo consumo',
      category: 'lightweight'
    },
    {
      id: 'scale',
      name: 'Scale',
      component: ScaleLoading,
      weight: '⭐⭐⭐⭐⭐⭐',
      description: 'Escala mínima con opacidad del icono interno.',
      performance: 'CPU: ~1.5%, Memory: <0.7MB',
      bestFor: 'Cuando necesitas un poco más de vida visual',
      category: 'lightweight'
    }
  ];

  const proposals = [
    {
      id: 'pulse',
      name: 'Pulse Suave',
      component: PulseLoading,
      weight: '⭐⭐⭐⭐⭐',
      description: 'Ultra liviano. Animación sutil de pulso con rotación 3D mínima.',
      performance: 'CPU: ~2%, Memory: <1MB',
      bestFor: 'Loading de páginas, formularios, navegación',
      category: 'standard'
    },
    {
      id: 'spin',
      name: 'Spin Elegante',
      component: SpinLoading,
      weight: '⭐⭐⭐⭐',
      description: 'Muy liviano. Rotación suave con escala sutil.',
      performance: 'CPU: ~3%, Memory: <1MB',
      bestFor: 'Estados de carga cortos, botones, contenido dinámico',
      category: 'standard'
    },
    {
      id: 'morph',
      name: 'Morph Disruptivo',
      component: MorphLoading,
      weight: '⭐⭐⭐',
      description: 'Medio. Transformación compleja con skew y escala.',
      performance: 'CPU: ~8%, Memory: 1-2MB',
      bestFor: 'Transiciones de página, cambios de estado importantes',
      category: 'standard'
    },
    {
      id: 'glitch',
      name: 'Glitch Effect',
      component: GlitchLoading,
      weight: '⭐⭐',
      description: 'Pesado. Efectos de glitch con múltiples capas y filtros CSS.',
      performance: 'CPU: ~15%, Memory: 2-3MB',
      bestFor: 'Loading de servicios tech, demos interactivos',
      category: 'standard'
    },
    {
      id: 'quantum',
      name: 'Quantum Loading',
      component: QuantumLoading,
      weight: '⭐',
      description: 'Muy pesado. Partículas orbitales con blur y brightness dinámicos.',
      performance: 'CPU: ~20%, Memory: 3-5MB',
      bestFor: 'Loading de dashboards, procesos complejos de IA',
      category: 'standard'
    }
  ];

  const allProposals = [...lightweightProposals, ...proposals];
  
  const filteredProposals = selectedCategory === 'all' 
    ? allProposals 
    : allProposals.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Disruptivo Loading Components
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Todas las variantes de loading components usando el icono de Disruptivo Lab. 
            Desde ultra lightweight hasta efectos complejos con indicadores de peso y rendimiento.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-6">
          <div className="flex gap-2 p-1 bg-muted rounded-lg">
            {[
              { key: 'all', label: 'Todas las Variantes', count: allProposals.length },
              { key: 'lightweight', label: 'Ultra Lightweight', count: lightweightProposals.length },
              { key: 'standard', label: 'Estándar + Complejas', count: proposals.length }
            ].map(category => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key as 'all' | 'lightweight' | 'standard')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                  selectedCategory === category.key 
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {category.label}
                <span className="text-xs bg-muted-foreground/20 px-1.5 py-0.5 rounded-full">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Size Control */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2 p-1 bg-muted rounded-lg">
            {(['sm', 'md', 'lg', 'xl'] as const).map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedSize === size 
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {size.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de propuestas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProposals.map((proposal) => {
            const Component = proposal.component;
            const isLightweight = proposal.category === 'lightweight';
            
            return (
              <div 
                key={proposal.id}
                className={`backdrop-blur border rounded-xl p-6 hover:shadow-lg transition-all duration-300 ${
                  isLightweight 
                    ? 'bg-green-500/5 border-green-500/20' 
                    : 'bg-card/50'
                }`}
              >
                {/* Header de la propuesta */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{proposal.name}</h3>
                    {isLightweight && (
                      <span className="inline-block mt-1 px-2 py-0.5 bg-green-500/20 text-green-700 dark:text-green-300 text-xs font-medium rounded-full">
                        ULTRA LIGHTWEIGHT
                      </span>
                    )}
                  </div>
                  <span className="text-2xl" title={isLightweight ? "Ultra lightweight - 6 estrellas" : "Indicador de peso"}>
                    {proposal.weight}
                  </span>
                </div>

                {/* Loading component */}
                <div className="flex justify-center py-12 bg-muted/30 rounded-lg mb-6">
                  <Component size={selectedSize} />
                </div>

                {/* Descripción */}
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {proposal.description}
                  </p>
                  
                  {/* Performance metrics */}
                  <div className={`rounded-lg p-3 ${
                    isLightweight 
                      ? 'bg-green-500/5 border border-green-500/20' 
                      : 'bg-muted/50'
                  }`}>
                    <p className={`text-xs font-medium mb-1 ${
                      isLightweight 
                        ? 'text-green-700 dark:text-green-300' 
                        : 'text-muted-foreground'
                    }`}>
                      {isLightweight ? 'Performance Ultra:' : 'Performance Aproximado:'}
                    </p>
                    <p className={`text-xs font-mono ${
                      isLightweight 
                        ? 'text-green-600 dark:text-green-400' 
                        : ''
                    }`}>
                      {proposal.performance}
                    </p>
                  </div>

                  {/* Best for */}
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      Mejor para:
                    </p>
                    <p className="text-xs">
                      {proposal.bestFor}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparación visual lado a lado */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Comparación Visual</h2>
          <div className="bg-card/30 backdrop-blur border rounded-xl p-8">
            <div className="flex flex-wrap justify-center gap-8 items-center">
              {filteredProposals.map((proposal) => {
                const Component = proposal.component;
                const isLightweight = proposal.category === 'lightweight';
                return (
                  <div key={proposal.id} className="text-center">
                    <div className="mb-3">
                      <Component size="lg" showText={false} />
                    </div>
                    <p className="text-sm font-medium">{proposal.name}</p>
                    <p className="text-xs text-muted-foreground">{proposal.weight}</p>
                    {isLightweight && (
                      <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                        Ultra Light
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Resumen de categorías */}
        {selectedCategory === 'all' && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-8">Resumen de Categorías</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ultra Lightweight */}
              <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-4 flex items-center gap-2">
                  🚀 Ultra Lightweight
                  <span className="text-sm bg-green-500/20 px-2 py-0.5 rounded-full">
                    {lightweightProposals.length} variantes
                  </span>
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>CPU Usage:</span>
                    <span className="text-green-600 dark:text-green-400 font-mono">0.5% - 1.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Memory:</span>
                    <span className="text-green-600 dark:text-green-400 font-mono">&lt; 1MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Técnicas:</span>
                    <span className="text-green-600 dark:text-green-400">Opacity, Scale, Y</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ideal para:</span>
                    <span className="text-green-600 dark:text-green-400">Dispositivos móviles</span>
                  </div>
                </div>
              </div>

              {/* Standard + Complex */}
              <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-4 flex items-center gap-2">
                  ⚡ Estándar + Complejas
                  <span className="text-sm bg-blue-500/20 px-2 py-0.5 rounded-full">
                    {proposals.length} variantes
                  </span>
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>CPU Usage:</span>
                    <span className="text-blue-600 dark:text-blue-400 font-mono">2% - 20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Memory:</span>
                    <span className="text-blue-600 dark:text-blue-400 font-mono">1MB - 5MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Técnicas:</span>
                    <span className="text-blue-600 dark:text-blue-400">Rotate, Skew, Filters</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ideal para:</span>
                    <span className="text-blue-600 dark:text-blue-400">Efectos llamativos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Código de ejemplo */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Implementación</h2>
          <div className="bg-muted/50 rounded-xl p-6 font-mono text-sm">
            <pre className="text-muted-foreground">{`// Ultra Lightweight - Máximo rendimiento
import { BreatheLoading, FadeLoading } from '@/components/ui/lightweight-loading';

<BreatheLoading size="md" />
<FadeLoading size="sm" showText={false} />

// Estándar - Balance rendimiento/visual  
import { PulseLoading, SpinLoading } from '@/components/ui/disruptivo-loading';

<PulseLoading size="lg" text="Cargando contenido..." />
<SpinLoading size="md" />

// Complejas - Máximo impacto visual
import { GlitchLoading, QuantumLoading } from '@/components/ui/disruptivo-loading';

<GlitchLoading size="xl" />
<QuantumLoading size="lg" text="Procesando IA..." />`}</pre>
          </div>
        </div>

        {/* Recomendaciones */}
        <div className="mt-16 text-center p-6 bg-muted/30 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">💡 Recomendaciones de Uso</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 bg-green-500/10 rounded-lg">
              <p className="font-medium text-green-700 dark:text-green-300 mb-2">Para Móviles</p>
              <p className="text-green-600 dark:text-green-400">BreatheLoading o FadeLoading</p>
            </div>
            <div className="p-4 bg-blue-500/10 rounded-lg">
              <p className="font-medium text-blue-700 dark:text-blue-300 mb-2">Para Web</p>
              <p className="text-blue-600 dark:text-blue-400">PulseLoading o SpinLoading</p>
            </div>
            <div className="p-4 bg-purple-500/10 rounded-lg">
              <p className="font-medium text-purple-700 dark:text-purple-300 mb-2">Para Demos</p>
              <p className="text-purple-600 dark:text-purple-400">GlitchLoading o QuantumLoading</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
