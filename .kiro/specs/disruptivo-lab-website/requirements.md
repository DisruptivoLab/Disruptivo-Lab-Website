### **Documento de Requerimientos - Sitio Web Disruptivo Lab (Versión 2.0 - Post-Limpieza)**

#### **Visión General y Propósito**

El sitio web de Disruptivo Lab es la carta de presentación digital de la agencia, diseñada para ser una experiencia inmersiva, visualmente impactante y tecnológicamente avanzada. Su propósito principal es demostrar la capacidad innovadora de Disruptivo Lab en **automatización, desarrollo de software a medida y consultoría estratégica**, atrayendo a clientes potenciales y consolidando la marca como líder en el sector.

**Razonamiento:** Se mantiene la visión original, pero se ajusta el enfoque de las capacidades de la agencia para reflejar la eliminación de los agentes conversacionales de IA como funcionalidad principal del sitio web. La "experiencia inmersiva" y "tecnológicamente avanzada" sigue siendo clave para la marca.

---

#### **1. Principios Fundamentales de Diseño y Experiencia de Usuario (UX)**

El diseño del sitio se regirá por la filosofía **"Liquid Glass" de Apple**, priorizando una experiencia **mobile-first** y una **interacción fluida y orgánica**.

**Razonamiento:** Los documentos `liquid_glass_design.md` y `Liquid Glass Switcher.md` son la base de la identidad visual y se han internalizado. Es crucial que estos principios se apliquen consistentemente en todo el sitio. El enfoque mobile-first es una directriz moderna y esencial para la accesibilidad y el rendimiento.

**1.1. Efecto "Liquid Glass" (Magnificación y Borde de Vidrio Real)**
*   **Requerimiento:** Todos los elementos UI que simulen vidrio (tarjetas, botones, barras de navegación, modales) DEBEN implementar el efecto "Liquid Glass" siguiendo la fórmula de magnificación (saturación y brillo del fondo) y el borde de vidrio real (múltiples sombras `inset` y `box-shadow` sutiles).
*   **No DEBEN:** Utilizar fondos opacos (`bg-white/X`, `bg-black/X`), bordes visibles que compitan con el efecto, o blurs excesivos que distorsionen el contenido.
*   **Razonamiento:** Directamente de `liquid_glass_design.md`. Este es el diferenciador visual clave. La implementación actual en componentes como `FrostedButton`, `SimpleGlassCard`, `GlassCard`, `CompactLanguageSelector`, `ContactButton`, `HamburgerMenu`, `FullscreenMobileMenu`, `LiquidAccordion`, `LiquidCarousel`, `LiquidGlassControl`, `LiquidInput`, `LiquidSlider`, `SimpleFrostedButton`, `SimpleGlassCard`, `SimpleThemeToggle` ya incorpora muchos de estos principios, lo que valida su viabilidad y establece el estándar.

**1.2. Diseño Mobile-First y Responsividad**
*   **Requerimiento:** Cada componente y página DEBE ser diseñado y desarrollado priorizando la experiencia en dispositivos móviles, escalando elegantemente a tablets y desktops.
*   **Requerimiento:** La navegación y los elementos interactivos DEBEN ser optimizados para la interacción táctil.
*   **Razonamiento:** Mantenemos este requerimiento del `requirements.md` original. Es una práctica estándar y el proyecto ya lo sigue en gran medida.

**1.3. Microinteracciones y Animaciones Fluidas**
*   **Requerimiento:** Las interacciones del usuario (hover, click, scroll) DEBEN ser acompañadas de microinteracciones sutiles y animaciones fluidas que refuercen la sensación de "fluidez" del Liquid Glass.
*   **Razonamiento:** Crucial para la experiencia "cinematográfica" y "orgánica" mencionada en la visión. `framer-motion` ya está en uso, lo que facilita esto.

---

#### **2. Identidad Visual y Branding**

**2.1. Paleta de Colores**
*   **Requerimiento:** El sitio DEBE usar la paleta de colores definida: fondo `#121212` (oscuro), texto `#FFFFFF` (claro), y acento `#FF4500` (naranja). El sistema de temas DEBE permitir alternar entre un modo oscuro principal y un modo claro secundario, adaptando los colores de texto y fondo.
*   **Razonamiento:** Directamente del `requirements.md` original y confirmado por `theme-context.tsx`.

**2.2. Tipografía**
*   **Requerimiento:** Los titulares DEBEN usar **Poppins** y los textos de cuerpo DEBEN usar **JetBrains Mono**.
*   **Razonamiento:** Confirmado por `typography.tsx` y `typography-test/page.tsx`.

**2.3. Logo y Branding en Navegación**
*   **Requerimiento:** El logo DEBE consistir en el iconotipo (`/public/media/Identidad/Icono-Disruptivo-Lab.webp`) acompañado del texto "Disruptivo_Lab" en tipografía JetBrains Mono. Este logo DEBE ser el elemento principal de identidad en la navegación.
*   **Razonamiento:** Confirmado por `navigation.tsx`.

---

#### **3. Estructura de Contenido y Páginas Principales**

**Razonamiento:** Basado en las páginas existentes y funcionales que has decidido mantener.

**3.1. Página de Inicio (`/`)**
*   **Requerimiento:** DEBE presentar un hero fullscreen con video de fondo en bucle y contenido principal que introduzca la agencia.
*   **Requerimiento:** DEBE incluir un carrusel de slides (`HeroSlide`, `AutomationSlide`, `ConsultingSlide`, `ProductDevelopmentSlide`, `SeoSlide`) que se naveguen verticalmente.
*   **Razonamiento:** `page.tsx` ya implementa esto. Se han eliminado los slides específicos de agentes.

**3.2. Página "El Método" (`/method`)**
*   **Requerimiento:** DEBE mostrar el proceso de trabajo de Disruptivo Lab con secciones animadas que se revelan con el scroll (scrollytelling).
*   **Razonamiento:** `method/page.tsx` ya implementa esto.

**3.3. Página "Servicios" (`/services`)**
*   **Requerimiento:** DEBE presentar los servicios de la agencia (Automatización, Software a Medida, Sitios Web y Marketing Digital, Consultoría) con un diseño de grid o carrusel adaptable.
*   **Requerimiento:** DEBE incluir una calculadora de ROI interactiva y un simulador de chat (este último como demo de automatización, no de agente conversacional).
*   **Razonamiento:** `services/page.tsx` ya implementa esto. Se ajusta la descripción para reflejar los servicios actuales y el simulador de chat se recontextualiza.

**3.4. Página "Portafolio" (`/portfolio`)**
*   **Requerimiento:** DEBE mostrar una galería de proyectos con un layout de mampostería (masonry) y un modal fullscreen para ver los detalles de cada proyecto.
*   **Razonamiento:** `portfolio/page.tsx` ya implementa esto.

**3.5. Página "Nosotros" (`/about`)**
*   **Requerimiento:** DEBE presentar información del equipo, la historia de la empresa y sus valores.
*   **Razonamiento:** `about/page.tsx` ya implementa esto.

**3.6. Páginas de Prueba**
*   **Requerimiento:** La página `/prueba` DEBE conservarse como un entorno de pruebas temporal para nuevos componentes.
*   **Requerimiento:** La página `/typography-test` DEBE conservarse como una herramienta para verificar la tipografía.
*   **Razonamiento:** Decisión explícita del usuario.

---

#### **4. Funcionalidades Transversales**

**4.1. Sistema de Traducciones Modulares**
*   **Requerimiento:** El sitio DEBE utilizar la arquitectura de traducciones modulares definida en `src/locales/modular/README.md`.
*   **Requerimiento:** Todas las nuevas traducciones DEBEN ser añadidas a los archivos modulares correspondientes (`common/`, `pages/`, `components/`).
*   **Requerimiento:** La migración de traducciones existentes a la estructura modular DEBE continuar de forma incremental.
*   **Razonamiento:** Este es un mandato oficial del proyecto y ya está implementado. Es crucial para la mantenibilidad y escalabilidad.

**4.2. Manejo de Errores y Estados de Carga**
*   **Requerimiento:** El sitio DEBE implementar un manejo robusto de errores (`ErrorBoundary`) y estados de carga (skeletons, spinners) para una experiencia de usuario fluida.
*   **Razonamiento:** `error-boundary.tsx` ya existe y es una buena práctica.

---

#### **5. Arquitectura Técnica y Rendimiento**

**5.1. Stack Tecnológico**
*   **Requerimiento:** El proyecto DEBE mantener el stack actual: **Next.js 14+ (App Router), TypeScript, Tailwind CSS, ShadCN UI.**
*   **Razonamiento:** Confirmado por el análisis y la limpieza.

**5.2. Optimización de Rendimiento**
*   **Requerimiento:** El sitio DEBE implementar optimizaciones como code splitting, lazy loading, optimización de imágenes (`next/image`), y preload de fuentes para asegurar una carga rápida y fluida.
*   **Razonamiento:** `use-video-optimization.ts` y el uso de `next/image` ya apuntan a esto.

**5.3. Despliegue**
*   **Requerimiento:** El sitio DEBE estar configurado para despliegue en **Firebase Hosting**.
*   **Razonamiento:** Mantenemos el objetivo de despliegue.
