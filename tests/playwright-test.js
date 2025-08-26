const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Configuración
const BASE_URL = 'http://localhost:3000';
const SCREENSHOTS_DIR = './screenshots';

// Páginas a auditar
const PAGES = [
  { name: 'home', url: '/', description: 'Página de inicio con slides' },
  { name: 'method', url: '/method', description: 'Metodología de trabajo' },
  { name: 'services', url: '/services', description: 'Servicios y ROI calculator' },
  { name: 'portfolio', url: '/portfolio', description: 'Portafolio de proyectos' },
  { name: 'about', url: '/about', description: 'Acerca de nosotros' },
];

// Tamaños de pantalla para testing responsive
const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 667, description: 'iPhone SE' },
  { name: 'tablet', width: 768, height: 1024, description: 'iPad' },
  { name: 'desktop', width: 1920, height: 1080, description: 'Desktop Full HD' },
];

async function createScreenshotsDir() {
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  }
}

async function auditPage(page, pageName, pageUrl, viewportName) {
  const timestamp = new Date().toISOString().slice(0, 16).replace(/[:-]/g, '');
  
  try {
    // Navegar a la página
    console.log(`📄 Auditando: ${pageName} (${viewportName}) - ${pageUrl}`);
    await page.goto(`${BASE_URL}${pageUrl}`, { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    // Esperar un poco para que las animaciones se carguen
    await page.waitForTimeout(2000);
    
    // Capturar en ambos temas (light y dark)
    const screenshotBasePath = path.join(SCREENSHOTS_DIR, `${pageName}-${viewportName}-${timestamp}`);
    
    // Screenshot tema actual (light por defecto)
    await page.screenshot({ 
      path: `${screenshotBasePath}-light.png`, 
      fullPage: true,
      quality: 90 
    });
    
    // Cambiar a tema oscuro y capturar
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.waitForTimeout(500); // Esperar transición de tema
    await page.screenshot({ 
      path: `${screenshotBasePath}-dark.png`, 
      fullPage: true,
      quality: 90 
    });
    
    // Volver a tema claro
    await page.emulateMedia({ colorScheme: 'light' });
    
    // Información básica de la página
    const title = await page.title();
    const url = page.url();
    
    // Revisar elementos Liquid Glass y efectos
    const glassAudit = await page.evaluate(() => {
      const glassElements = {
        backdropBlur: document.querySelectorAll('[class*="backdrop-blur"]').length,
        glassCards: document.querySelectorAll('.glass-card, [class*="glass-card"]').length,
        glassPills: document.querySelectorAll('.glass-pill, [class*="glass-pill"]').length,
        glassDropdowns: document.querySelectorAll('.glass-dropdown').length,
        glassSidebar: document.querySelectorAll('.glass-sidebar').length,
        backgroundOpacity: document.querySelectorAll('[class*="bg-white/"], [class*="bg-black/"]').length,
        borderOpacity: document.querySelectorAll('[class*="border-white/"], [class*="border-black/"]').length
      };
      
      return {
        total: Object.values(glassElements).reduce((a, b) => a + b, 0),
        breakdown: glassElements
      };
    });
    
    // Revisar errores de consola
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    return {
      page: pageName,
      viewport: viewportName,
      title,
      url,
      screenshotPaths: {
        light: `${screenshotBasePath}-light.png`,
        dark: `${screenshotBasePath}-dark.png`
      },
      glassAudit,
      errors: errors.slice(0, 5), // Solo primeros 5 errores
      timestamp
    };
    
  } catch (error) {
    console.error(`❌ Error auditando ${pageName}:`, error.message);
    return {
      page: pageName,
      viewport: viewportName,
      error: error.message,
      timestamp
    };
  }
}

async function generateReport(results) {
  const reportPath = path.join(SCREENSHOTS_DIR, `audit-report-${Date.now()}.md`);
  
  let report = `# 🔍 Auditoría Visual - Disruptivo Lab\n\n`;
  report += `**Fecha:** ${new Date().toLocaleString('es-ES')}\n`;
  report += `**Páginas auditadas:** ${PAGES.length}\n`;
  report += `**Viewports:** ${VIEWPORTS.length}\n`;
  report += `**Total screenshots:** ${results.length}\n\n`;
  
  // Resumen por página
  report += `## 📊 Resumen por Página\n\n`;
  PAGES.forEach(page => {
    const pageResults = results.filter(r => r.page === page.name);
    report += `### ${page.name.toUpperCase()} - ${page.description}\n`;
    report += `- **URL:** \`${page.url}\`\n`;
    
    pageResults.forEach(result => {
      if (result.error) {
        report += `- ❌ **${result.viewport}:** Error - ${result.error}\n`;
      } else {
        const glassTotal = result.glassAudit.total;
        report += `- ✅ **${result.viewport}:** OK - ${glassTotal} elementos Glass total\n`;
        report += `  - 🔄 Backdrop Blur: ${result.glassAudit.breakdown.backdropBlur}\n`;
        report += `  - 🎴 Glass Cards: ${result.glassAudit.breakdown.glassCards}\n`;
        report += `  - 🔘 Glass Pills: ${result.glassAudit.breakdown.glassPills}\n`;
        if (result.errors.length > 0) {
          report += `  - ⚠️ Errores consola: ${result.errors.length}\n`;
        }
      }
    });
    report += `\n`;
  });
  
  // Screenshots por tema
  report += `## 📸 Screenshots Light Theme\n\n`;
  results.forEach(result => {
    if (!result.error) {
      report += `### ${result.page} - ${result.viewport} (Light)\n`;
      report += `![${result.page}-${result.viewport}-light](${path.basename(result.screenshotPaths.light)})\n\n`;
    }
  });
  
  report += `## 🌙 Screenshots Dark Theme\n\n`;
  results.forEach(result => {
    if (!result.error) {
      report += `### ${result.page} - ${result.viewport} (Dark)\n`;
      report += `![${result.page}-${result.viewport}-dark](${path.basename(result.screenshotPaths.dark)})\n\n`;
    }
  });
  
  fs.writeFileSync(reportPath, report);
  return reportPath;
}

(async () => {
  console.log('🎭 Iniciando auditoría visual del proyecto Disruptivo Lab...\n');
  
  await createScreenshotsDir();
  
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const results = [];
  
  try {
    for (const viewport of VIEWPORTS) {
      console.log(`📱 Configurando viewport: ${viewport.name} (${viewport.width}x${viewport.height})`);
      
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        userAgent: viewport.name === 'mobile' ? 
          'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15' :
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      });
      
      const page = await context.newPage();
      
      for (const pageInfo of PAGES) {
        const result = await auditPage(page, pageInfo.name, pageInfo.url, viewport.name);
        results.push(result);
        
        // Pausa entre páginas para no sobrecargar
        await page.waitForTimeout(1000);
      }
      
      await context.close();
    }
    
    // Generar reporte
    const reportPath = await generateReport(results);
    
    console.log('\n✅ Auditoría completada!');
    console.log(`📁 Screenshots guardadas en: ${SCREENSHOTS_DIR}`);
    console.log(`📋 Reporte generado: ${reportPath}`);
    console.log(`🔍 Total de capturas: ${results.filter(r => !r.error).length}`);
    
  } catch (error) {
    console.error('❌ Error durante la auditoría:', error);
  } finally {
    await browser.close();
  }
})();
