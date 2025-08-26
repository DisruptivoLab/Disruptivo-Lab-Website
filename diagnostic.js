console.log('🔍 DIAGNÓSTICO DE TRADUCCIONES - About Page');
console.log('===============================================');

// Verificar que los archivos JSON se puedan importar
async function diagnosticarTraducciones() {
  try {
    console.log('\n📂 Probando importación de archivos JSON:');
    
    // Probar importación directa
    const esModule = await import('./src/locales/modular/pages/about/es.json', { assert: { type: 'json' } }).catch(
      () => require('./src/locales/modular/pages/about/es.json')
    );
    console.log('✅ ES JSON:', esModule ? 'Cargado correctamente' : 'Error');
    if (esModule?.default || esModule) {
      const data = esModule.default || esModule;
      console.log('   - hero.title:', data.hero?.title || 'NO ENCONTRADO');
      console.log('   - cta.title:', data.cta?.title || 'NO ENCONTRADO');
    }
    
    const enModule = await import('./src/locales/modular/pages/about/en.json', { assert: { type: 'json' } }).catch(
      () => require('./src/locales/modular/pages/about/en.json')
    );
    console.log('✅ EN JSON:', enModule ? 'Cargado correctamente' : 'Error');
    if (enModule?.default || enModule) {
      const data = enModule.default || enModule;
      console.log('   - hero.title:', data.hero?.title || 'NO ENCONTRADO');
      console.log('   - cta.title:', data.cta?.title || 'NO ENCONTRADO');
    }
    
  } catch (error) {
    console.error('❌ Error durante diagnóstico:', error.message);
  }
}

diagnosticarTraducciones();
