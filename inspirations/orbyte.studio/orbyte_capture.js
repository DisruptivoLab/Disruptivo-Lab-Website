const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'https://orbyte.studio/es';
const OUTPUT_DIR = 'C:\Users\Administrador\OneDrive\Documentos\disruptivo\Sitio web DL\disruptivo-lab-website\inspirations\orbyte.studio';

async function captureOrbyteStudio() {
    const browser = await chromium.launch({ headless: true });
    let page;

    // Ensure output directory exists (already created, but good practice)
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    console.log('Capturando Orbyte Studio...');

    // --- Desktop Capture ---
    console.log('Capturando Desktop...');
    page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000); // Give time for animations

    await page.screenshot({ path: path.join(OUTPUT_DIR, 'desktop_full.png'), fullPage: true });
    console.log('Desktop full page captured.');

    // Desktop Navbar Interaction (e.g., hover over a menu item)
    // Need to find a selector for a menu item. Let's assume a common one like 'nav a'
    const desktopMenuItemSelector = 'nav a:has-text("Servicios")'; // Example selector, might need adjustment
    if (await page.locator(desktopMenuItemSelector).isVisible()) {
        await page.locator(desktopMenuItemSelector).hover();
        await page.waitForTimeout(500); // Wait for hover effect
        await page.screenshot({ path: path.join(OUTPUT_DIR, 'desktop_navbar_hover_servicios.png') });
        console.log('Desktop navbar hover captured.');
    } else {
        console.log('Desktop menu item "Servicios" not found for hover capture.');
    }


    // --- Mobile Capture ---
    console.log('Capturando Mobile...');
    page = await browser.newPage({ viewport: { width: 375, height: 667 } }); // iPhone SE
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000); // Give time for animations

    await page.screenshot({ path: path.join(OUTPUT_DIR, 'mobile_full.png'), fullPage: true });
    console.log('Mobile full page captured.');

    // Mobile Navbar Interaction (click hamburger menu)
    const hamburgerSelector = 'button[aria-label="Abrir menú"]'; // Common selector for hamburger icon
    if (await page.locator(hamburgerSelector).isVisible()) {
        await page.locator(hamburgerSelector).click();
        await page.waitForTimeout(1000); // Wait for menu to open
        await page.screenshot({ path: path.join(OUTPUT_DIR, 'mobile_navbar_open.png') });
        console.log('Mobile navbar open captured.');
    } else {
        console.log('Hamburger menu not found for mobile capture.');
    }

    await browser.close();
    console.log('Captura de Orbyte Studio completada.');
}

captureOrbyteStudio().catch(console.error);
