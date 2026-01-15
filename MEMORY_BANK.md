# 🧠 MEMORY BANK - Disruptivo Lab Website

## 📋 INFORMACIÓN GENERAL DEL PROYECTO

### Identidad del Proyecto
- **Nombre**: Disruptivo Lab Website
- **Tipo**: Sitio web corporativo de agencia digital
- **Framework**: Next.js 15.4.5 (App Router)
- **Lenguaje**: TypeScript
- **Versión**: 0.1.0

### Propósito
Sitio web de agencia de innovación y tecnología especializada en:
- Inteligencia Artificial
- Branding y Estrategia Digital
- Desarrollo de Software
- Automatización de Procesos
- Consultoría Integral

---

## 🎨 SISTEMA DE DISEÑO

### Filosofía Visual
**"Liquid Glass Design"** - Inspirado en el diseño de Apple con efectos glassmorphism

### Paleta de Colores

#### Marca Principal
- **Primary Orange**: `#FF4500` (Disruptivo Lab signature)
- **Gradientes**: 50-900 del naranja principal

#### Temas
**Light Mode:**
- Background: `#ffffff`
- Foreground: `#000000`
- Cards: Transparencias con `rgba(255, 255, 255, 0.1-0.2)`

**Dark Mode:**
- Background: `#000000` (negro puro)
- Foreground: `#ffffff`
- Cards: Transparencias con `rgba(0, 0, 0, 0.2-0.4)`

### Tipografía

#### Fuentes Principales
1. **Poppins** (Google Fonts)
   - Uso: Títulos, headings, navegación
   - Pesos: 300, 400, 500, 600, 700
   - Variable CSS: `--font-poppins`

2. **JetBrains Mono** (Google Fonts)
   - Uso: Textos de cuerpo, párrafos, UI
   - Pesos: 400, 500, 600, 700
   - Variable CSS: `--font-jetbrains-mono`

#### Jerarquía
- H1-H6: Poppins (font-heading)
- Body text: JetBrains Mono (font-body)
- Logo: JetBrains Mono (font-mono)

### Efectos Glass

#### Variantes Implementadas
1. **Light Glass**: `backdrop-blur-[6px]` + `bg-white/6%`
2. **Medium Glass**: `backdrop-blur-[8px]` + `bg-white/8%`
3. **Heavy Glass**: `backdrop-blur-[12px]` + `bg-white/12%`

#### Variables CSS Glass
```css
--c-glass: #bbbbbc
--c-light: #fff
--c-dark: #000
--glass-reflex-dark: 1-2
--glass-reflex-light: 0.3-1
--saturation: 150%
```

---

## 🏗️ ARQUITECTURA DEL PROYECTO

### Estructura de Carpetas
```
src/
├── app/                    # Next.js App Router
│   ├── about/             # Página Nosotros
│   ├── api/genkit/        # API Genkit (IA)
│   ├── cookies/           # Política de cookies
│   ├── method/            # El Método
│   ├── portfolio/         # Portafolio de clientes
│   ├── privacy/           # Política de privacidad
│   ├── services/          # Servicios (con [slug])
│   ├── terms/             # Términos y condiciones
│   ├── layout.tsx         # Layout raíz
│   ├── page.tsx           # Homepage
│   └── globals.css        # Estilos globales
├── components/
│   ├── layout/            # Componentes de layout
│   ├── providers/         # Context providers
│   ├── sections/          # Secciones reutilizables
│   ├── slides/            # Slides del homepage
│   ├── test/              # Componentes de testing
│   └── ui/                # Componentes UI base
├── config/                # Configuraciones
│   ├── contact.ts
│   ├── industries.ts
│   ├── portfolio.ts
│   └── service-themes.ts
├── constants/             # Constantes del proyecto
├── contexts/              # React Contexts
│   ├── modular-translation-context.tsx
│   ├── navbar-context.tsx
│   └── theme-context.tsx
├── hooks/                 # Custom hooks
├── lib/                   # Utilidades
├── locales/               # Sistema i18n
│   ├── modular/          # Traducciones modulares
│   └── *.json            # Archivos de idioma
├── types/                 # TypeScript types
└── utils/                 # Funciones utilitarias
```

---

## 🌐 SISTEMA DE INTERNACIONALIZACIÓN (i18n)

### Arquitectura Modular

#### Idiomas Soportados
- **Español (es)**: Idioma predeterminado
- **Inglés (en)**: Idioma secundario
- Preparado para: fr, pt, ja, ko, zh

#### Sistema Híbrido
1. **Archivos Monolíticos**: `/src/locales/{lang}.json`
2. **Archivos Modulares**: `/src/locales/modular/{module}/{lang}.json`

#### Estructura Modular
```
locales/modular/
├── common/              # Traducciones comunes
├── components/          # Componentes específicos
│   └── slides/         # Slides del homepage
└── pages/              # Páginas específicas
    ├── home/
    ├── services/
    └── portfolio/
```

### Context de Traducción

#### ModularTranslationContext
- **Función principal**: `t(key, params?)`
- **Carga dinámica**: `loadModularTranslation(moduleName)`
- **Cambio de idioma**: `changeLocale(locale)`
- **Estado de carga**: `isLoading`
- **Obtener valores crudos**: `get(key)`

#### Características
- Detección automática de idioma del navegador
- Persistencia en localStorage
- Cache de módulos cargados
- Soporte para parámetros dinámicos
- Fallback a claves si no hay traducción

---

## 🎭 SISTEMA DE TEMAS

### ThemeContext

#### Temas Disponibles
- `dark`: Modo oscuro (predeterminado en homepage)
- `light`: Modo claro (predeterminado en páginas internas)

#### Comportamiento
- **Homepage**: Dark mode por defecto
- **Páginas internas**: Light mode por defecto
- **Persistencia**: localStorage (`disruptivo-theme`)
- **Transiciones**: 300ms duration

#### Aplicación de Temas
```typescript
// Clases aplicadas al <html>
root.classList.add('dark' | 'light')

// Clases aplicadas al <body>
dark: 'bg-black text-white'
light: 'bg-white text-black'
```

---

## 📄 PÁGINAS PRINCIPALES

### 1. Homepage (`/`)
**Tipo**: Carrusel vertical de slides

#### Slides Implementados
1. **HeroSlide**: Presentación principal
2. **AutomationSlide**: Automatización
3. **ConsultingSlide**: Consultoría
4. **ProductDevelopmentSlide**: Desarrollo de productos

#### Características
- Auto-play cada 8 segundos
- Navegación con flechas (desktop)
- Dots de navegación (mobile)
- Transiciones suaves (1000ms)
- Respeta `prefers-reduced-motion`
- Optimización de videos con lazy loading

#### Secciones Adicionales
- **AboutSection**: Quiénes somos
- **ParallaxVideoCTA**: Video parallax con CTA
- **ConversionSection**: Sección de conversión

### 2. Services (`/services`)
**Estructura**: Página índice + páginas dinámicas por slug

#### Servicios Configurados
1. **whatsapp-ia**: Agentes de WhatsApp con IA
2. **automatizacion**: Automatización de procesos
3. **desarrollo-software**: Desarrollo de software
4. **consultoria-integral**: Consultoría integral
5. **embudo-ia**: Embudo de conversión con IA

#### Service Themes
Cada servicio tiene:
- Colores de gradiente únicos
- Icono representativo (Lucide React)
- Tema visual consistente

### 3. Portfolio (`/portfolio`)
**Sistema**: Modular con i18n

#### Clientes Actuales
1. **TAGGER PET** (2024)
   - Categoría: Desarrollo de Software
   - Industria: Pet Tech
   - Website: taggerpet.com

2. **BEE CONSULTORÍA** (2024)
   - Categoría: Consultoría IA
   - Industria: Servicios Financieros

3. **DOMIPET** (2024)
   - Categoría: eCommerce
   - Industria: Pet Commerce
   - Website: domipet.com

4. **SOLODOMIS** (2024)
   - Categoría: Marketing Digital
   - Industria: Marketing

5. **PAPAS PAISAS** (2024)
   - Categoría: eCommerce
   - Industria: Alimentario

#### Características
- Filtros por categoría
- Modal de detalle con información completa
- Cards con aspect ratio 4:3
- Hover effects con scale
- Responsive grid (2 cols desktop, 1 col mobile)

### 4. Method (`/method`)
Página explicativa del método de trabajo

### 5. About (`/about`)
Página sobre la empresa

---

## 🧩 COMPONENTES CLAVE

### Layout Components

#### Navigation
- Logo con iconotipo + texto
- Links de navegación (desktop)
- Menú hamburguesa (mobile)
- Selector de idioma
- Toggle de tema
- Botón de contacto

#### Footer
- Información de contacto
- Links legales
- Redes sociales
- Copyright

### UI Components

#### Glass Components
1. **GlassCard**: Card base con efectos glass
   - Variantes: light, medium, heavy
   - Hover opcional
   - Adaptativo a temas

2. **GlassIconButton**: Botón circular con glass
3. **SimpleFrostedButton**: Botón con efecto frosted
4. **SimpleGlassCard**: Card simplificada

#### Interactive Components
1. **ContactButton**: Botón de contacto con modal
2. **ContactModal**: Modal de formulario de contacto
3. **LanguageSelector**: Selector de idioma
4. **ThemeToggle**: Toggle de tema dark/light
5. **HamburgerMenu**: Menú hamburguesa animado
6. **FullscreenMobileMenu**: Menú móvil fullscreen

#### Loading Components
1. **DisruptivoLoading**: Loading principal de marca
2. **GlobalLoading**: Loading global
3. **ContentLoading**: Loading de contenido
4. **LightweightLoading**: Loading ligero

### Slide Components
Todos los slides reciben:
- `isActive`: Si el slide está activo
- `slideIndex`: Índice del slide
- `onVideoLoad`: Callback de carga de video
- `onVideoError`: Callback de error de video
- `prefersReducedMotion`: Preferencia de movimiento
- `shouldLoadVideo`: Si debe cargar el video
- `preloadStrategy`: Estrategia de precarga
- `registerVideoRef`: Registro de referencia de video

---

## 🔧 HOOKS PERSONALIZADOS

### useModularTranslation
Sistema de traducciones modulares
```typescript
const { t, locale, changeLocale, loadModularTranslation, isLoading, get } = useModularTranslation()
```

### useTheme
Gestión de temas
```typescript
const { theme, toggleTheme, setTheme } = useTheme()
```

### useLanguageDetection
Detección automática de idioma del navegador

### useVideoOptimization
Optimización de carga de videos
- Lazy loading
- Preload estratégico
- Gestión de estados

### useScroll
Detección de scroll para efectos

---

## 📦 DEPENDENCIAS PRINCIPALES

### Core
- **next**: 15.4.5
- **react**: 18.3.1
- **react-dom**: 18.3.1
- **typescript**: ^5

### UI & Styling
- **tailwindcss**: ^4
- **framer-motion**: 12.23.12
- **lucide-react**: 0.536.0
- **react-icons**: 5.5.0
- **class-variance-authority**: 0.7.1
- **clsx**: 2.1.1
- **tailwind-merge**: 3.3.1

### AI & Tools
- **@google/generative-ai**: 0.21.0
- **zod**: 3.25.76

### Testing
- **@playwright/test**: 1.55.0

---

## 🎯 CARACTERÍSTICAS ESPECIALES

### 1. Sistema de Optimización de Videos
- Lazy loading inteligente
- Preload de slides adyacentes
- Gestión de estados de carga
- Respeto a `prefers-reduced-motion`

### 2. Sistema de Service Themes
Cada servicio tiene colores y iconos únicos que se aplican:
- En el hero del servicio
- En las cards del homepage
- En los acentos visuales

### 3. Sistema de Portfolio Modular
- Datos base separados de traducciones
- Helper functions para combinar datos
- Categorías e industrias dinámicas
- Escalable sin modificar UI

### 4. Sistema de Loading States
Múltiples componentes de loading para diferentes contextos:
- Global (transiciones de página)
- Content (carga de contenido)
- Lightweight (operaciones rápidas)
- Disruptivo (branded loading)

### 5. Responsive Design
- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Menú fullscreen en mobile
- Controles adaptativos por viewport

---

## 🔐 VARIABLES DE ENTORNO

### .env.local
```env
GOOGLE_GENAI_API_KEY=AIzaSy...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 📱 SEO & METADATA

### Metadata Base
- **Title**: "Disruptivo Lab - Innovación Radical, Resultados Reales"
- **Description**: Transformamos ideas en futuros digitales
- **Keywords**: innovación, tecnología, IA, branding, desarrollo web
- **Theme Color**: #FF4500

### Open Graph
- Imágenes configuradas
- Locale: es_ES
- Type: website

### Twitter Card
- Card type: summary_large_image
- Imágenes optimizadas

### Structured Data
- Schema.org Organization
- Datos de contacto
- Servicios ofrecidos
- Idiomas disponibles

---

## 🚀 SCRIPTS DISPONIBLES

```json
{
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "test:visual": "node tests/playwright-test.js"
}
```

---

## 📊 SISTEMA DE TESTING VISUAL

### Playwright Test
Script automatizado que captura:
- 15 páginas del sitio
- 3 viewports (desktop, tablet, mobile)
- 2 temas (dark, light)
- Total: 90 screenshots

### Páginas Testeadas
- Homepage, Services, Portfolio, About, Method
- Páginas legales (Privacy, Terms, Cookies)
- Páginas de demostración

---

## 🎨 INSPIRACIONES DE DISEÑO

### Glass Design References
Carpeta `inspirations/glass-design/`:
- Blur sidebar y botones modo oscuro
- Botones en footer
- Controles dinámicos pill
- Dropdowns
- Iconos y cards

### Design Layout References
Carpeta `inspirations/design/`:
- Posicionamiento de slides
- Espaciado y márgenes
- Sección de servicios

### Competitive Analysis
- Orbyte Studio (script de captura automatizado)

---

## 📝 DOCUMENTACIÓN ADICIONAL

### Archivos de Documentación
- `README.md`: Guía de inicio
- `DEMO_GUIDE.md`: Guía de demostración
- `LAUNCH_GUIDE.md`: Guía de lanzamiento
- `LOADING_SYSTEM.md`: Sistema de loading
- `GLASS_IMPLEMENTATION_PLAN.md`: Plan de implementación glass
- `INSPIRACIONES_ANALISIS.md`: Análisis de inspiraciones
- `PORTFOLIO_SYSTEM.md`: Sistema de portafolio
- `GENKIT_SETUP.md`: Configuración de Genkit
- `PROYECTO_AUDITORIA.md`: Auditoría del proyecto

---

## 🔄 FLUJO DE TRABAJO

### Desarrollo Local
1. `npm run dev` - Inicia servidor con Turbopack
2. Abre `http://localhost:3000`
3. Hot reload automático

### Build de Producción
1. `npm run build` - Genera build optimizado
2. `npm start` - Inicia servidor de producción

### Testing Visual
1. `npm run test:visual` - Ejecuta Playwright
2. Revisa screenshots en `/screenshots`

---

## 🎯 MEJORES PRÁCTICAS IMPLEMENTADAS

### Performance
- Lazy loading de imágenes y videos
- Code splitting automático (Next.js)
- Optimización de fuentes (next/font)
- Turbopack para desarrollo rápido

### Accesibilidad
- Labels en todos los controles
- Navegación por teclado
- Respeto a `prefers-reduced-motion`
- Contraste de colores optimizado
- ARIA labels donde necesario

### SEO
- Metadata completa
- Structured data (Schema.org)
- URLs semánticas
- Sitemap preparado
- Robots.txt configurado

### UX
- Transiciones suaves (300-1000ms)
- Feedback visual en interacciones
- Estados de loading claros
- Mensajes de error informativos
- Navegación intuitiva

---

## 🔮 ROADMAP & PRÓXIMOS PASOS

### Corto Plazo
- [ ] Completar traducciones de todos los módulos
- [ ] Agregar más casos de éxito al portafolio
- [ ] Implementar formulario de contacto funcional
- [ ] Optimizar imágenes del portafolio

### Medio Plazo
- [ ] Implementar blog/recursos
- [ ] Sistema de testimonios
- [ ] Integración con CRM
- [ ] Analytics avanzado

### Largo Plazo
- [ ] Portal de clientes
- [ ] Sistema de cotizaciones online
- [ ] Chatbot con IA
- [ ] Expansión a más idiomas

---

## 💡 NOTAS IMPORTANTES

### Convenciones de Código
- TypeScript estricto
- Componentes funcionales con hooks
- Props interfaces explícitas
- Naming en inglés (código) y español (contenido)

### Git Workflow
- Commits descriptivos
- Branches por feature
- Pull requests con review

### Deployment
- Vercel (configurado en `.vercel/`)
- Auto-deploy desde main branch
- Preview deployments en PRs

---

## 🔐 ADMIN PANEL

### Credenciales Super Admin
- **Email**: disruptivolabcol@gmail.com
- **UUID**: a709cf15-3240-44ba-9a58-44c854df1156
- **Role**: admin

### Rutas Admin
- `/admin/login` - Página de login
- `/admin` - Dashboard principal
- `/admin/blog` - Gestión de blog (próximamente)

### Contextos
- **AdminAuthContext**: Autenticación con Supabase
- **AdminSidebarContext**: Estado del sidebar

### Base de Datos
- Tabla: `admin_users`
- Auth: Supabase Auth + RLS
- Roles: admin, editor

---

**Última actualización**: 2025
**Mantenido por**: Disruptivo Lab Team
