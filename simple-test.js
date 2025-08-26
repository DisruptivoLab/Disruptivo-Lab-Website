const { chromium } = require('playwright');

(async () => {
  console.log('🔍 Iniciando test simple...');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    console.log('⏳ Esperando 3 segundos...');
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    console.log('🌐 Navegando a 192.168.1.71:3000...');
    await page.goto('http://192.168.1.71:3000', { 
      waitUntil: 'domcontentloaded',
      timeout: 30000 
    });
    
    console.log('⏳ Esperando que cargue completamente...');
    await page.waitForTimeout(2000);
    
    console.log('📸 Tomando screenshot...');
    await page.screenshot({ 
      path: 'test-screenshot.png',
      fullPage: true 
    });
    
    const title = await page.title();
    console.log('📄 Título de página:', title);
    console.log('✅ Test exitoso - screenshot guardado como test-screenshot.png');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
})();
