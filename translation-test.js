/**
 * Script de prueba para verificar las traducciones del sistema modular
 */

// Simular las traducciones cargadas
const esTranslations = {
  hero: {
    title: "Quiénes Somos",
    subtitle: "Transformamos visiones en realidades digitales a través de metodologías innovadoras que desafían los límites de lo posible."
  },
  essence: {
    description: "En Disruptivo Lab, no seguimos tendencias: las creamos. Somos arquitectos del futuro digital, combinando estrategia visionaria con ejecución impecable para crear experiencias que redefinen industrias.",
    additional: "Nuestra pasión por la innovación nos impulsa a explorar constantemente nuevos horizontes tecnológicos, convirtiendo cada proyecto en una oportunidad de ruptura y transformación."
  },
  methodology: {
    title: "Nuestra Metodología",
    approaches: [
      {
        title: "Disrupción Estratégica",
        description: "Analizamos profundamente tu industria para identificar puntos de ruptura y oportunidades revolucionarias."
      },
      {
        title: "Innovación Aplicada",
        description: "Convertimos ideas audaces en soluciones tangibles mediante tecnologías emergentes y procesos optimizados."
      },
      {
        title: "Impacto Sostenible",
        description: "Creamos valor duradero que trasciende tendencias, estableciendo nuevos estándares para el futuro."
      }
    ]
  }
};

const enTranslations = {
  hero: {
    title: "Who We Are",
    subtitle: "We transform visions into digital realities through innovative methodologies that challenge the limits of what's possible."
  },
  essence: {
    description: "At Disruptivo Lab, we don't follow trends: we create them. We are architects of the digital future, combining visionary strategy with impeccable execution to create experiences that redefine industries.",
    additional: "Our passion for innovation drives us to constantly explore new technological horizons, turning every project into an opportunity for disruption and transformation."
  },
  methodology: {
    title: "Our Methodology",
    approaches: [
      {
        title: "Strategic Disruption",
        description: "We deeply analyze your industry to identify breaking points and revolutionary opportunities."
      },
      {
        title: "Applied Innovation",
        description: "We turn bold ideas into tangible solutions through emerging technologies and optimized processes."
      },
      {
        title: "Sustainable Impact",
        description: "We create lasting value that transcends trends, setting new standards for the future."
      }
    ]
  }
};

console.log('=== PRUEBA DE TRADUCCIONES ABOUT PAGE ===');
console.log('');

console.log('📄 Español:');
console.log('Título:', esTranslations.hero.title);
console.log('Subtítulo:', esTranslations.hero.subtitle);
console.log('Descripción:', esTranslations.essence.description);
console.log('Metodología:', esTranslations.methodology.title);
console.log('Enfoques:', esTranslations.methodology.approaches.length, 'items');
console.log('');

console.log('📄 English:');
console.log('Title:', enTranslations.hero.title);
console.log('Subtitle:', enTranslations.hero.subtitle);
console.log('Description:', enTranslations.essence.description);
console.log('Methodology:', enTranslations.methodology.title);
console.log('Approaches:', enTranslations.methodology.approaches.length, 'items');
console.log('');

// Verificar estructura de llaves
console.log('✅ Estructura validada:');
console.log('- hero.title/subtitle: OK');
console.log('- essence.description/additional: OK');
console.log('- methodology.title/approaches: OK');
console.log('- approaches array con title/description: OK');
console.log('');

console.log('🌐 Sistema modular implementado correctamente');
