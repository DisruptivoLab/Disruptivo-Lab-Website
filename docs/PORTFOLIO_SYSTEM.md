# Sistema de Portafolio - Disruptivo Lab

Este documento describe el sistema modular implementado para gestionar el portafolio de clientes de manera escalable.

## 🏗️ Arquitectura

### Archivos Principales
- `src/config/portfolio.ts`: Configuración central de clientes
- `src/app/portfolio/page.tsx`: Página principal del portafolio
- `src/utils/client-images.ts`: Utilidades para manejo de imágenes

### Interface PortfolioClient
```typescript
interface PortfolioClient {
  id: string;           // Identificador único
  name: string;         // Nombre del cliente
  title: string;        // Título descriptivo del proyecto
  description: string;  // Descripción completa del caso de éxito
  category: string;     // Categoría del servicio
  website?: string;     // URL del sitio web (opcional)
  image: string;        // Ruta de la imagen
  tags: string[];       // Tags/tecnologías utilizadas
  year: string;         // Año del proyecto
  industry: string;     // Industria del cliente
}
```

## 📋 Clientes Actuales

### 1. TAGGER PET
- **Categoría**: Desarrollo de Software
- **Industria**: Pet Tech
- **Año**: 2024
- **Sitio**: [taggerpet.com](https://taggerpet.com)
- **Tags**: Multiplataforma, IA, Salud Animal, UX/UI

### 2. BEE CONSULTORÍA
- **Categoría**: Consultoría IA
- **Industria**: Servicios Financieros
- **Año**: 2024
- **Tags**: Automatización, IA, Testing, Fintech

### 3. DOMIPET
- **Categoría**: eCommerce
- **Industria**: Pet Commerce
- **Año**: 2024
- **Sitio**: [domipet.com](https://www.domipet.com)
- **Tags**: eCommerce, IA, Pet Care, Branding

### 4. SIVESPA
- **Categoría**: Software Especializado
- **Industria**: Sector Público
- **Año**: 2023
- **Tags**: Salud Pública, Big Data, Gobierno, Epidemiología

### 5. SOLODOMIS
- **Categoría**: Marketing Digital
- **Industria**: Marketing
- **Año**: 2024
- **Tags**: Landing Pages, Conversión, Marketing, Diseño

### 6. PAPAS PAISAS
- **Categoría**: eCommerce
- **Industria**: Alimentario
- **Año**: 2024
- **Tags**: eCommerce, Branding, Alimentos, Regional

## ➕ Cómo Agregar Nuevos Clientes

1. **Editar `src/config/portfolio.ts`**:
```typescript
{
  id: 'nuevo-cliente',
  name: 'NOMBRE CLIENTE',
  title: 'Título del proyecto',
  description: 'Descripción completa del caso de éxito...',
  category: 'Categoría del Servicio',
  website: 'https://sitio-cliente.com', // Opcional
  image: 'ruta/a/imagen.jpg',
  tags: ['Tag1', 'Tag2', 'Tag3'],
  year: '2025',
  industry: 'Industria del Cliente'
}
```

2. **Agregar imagen**: 
   - Subir imagen a `/public/media/clients/`
   - O usar URL externa temporalmente

3. **Las categorías se actualizan automáticamente** en los filtros

## 🎨 Características del Diseño

### Cards de Vista General
- Aspect ratio fijo (4:3) para consistencia visual
- Overlay gradual con información básica
- Tags flotantes para año e industria
- Hover effects con scale y transiciones suaves

### Modal de Detalle
- Layout responsivo (grid 2 columnas en desktop)
- Scroll interno para contenido largo
- Metadatos organizados con iconos
- Enlace directo al sitio web del cliente
- Animaciones spring para apertura/cierre

### Responsive Design
- Desktop: 2 columnas
- Tablet/Mobile: 1 columna
- Filtros con wrap para pantallas pequeñas
- Modal adaptativo con máxima altura

## 🔧 Utilidades Disponibles

```typescript
// Obtener cliente por ID
const client = getClientById('tagger-pet');

// Obtener clientes por categoría
const ecommerceClients = getClientsByCategory('eCommerce');

// Todas las categorías disponibles
console.log(portfolioCategories); // ['Todos', 'Desarrollo de Software', ...]

// Todas las industrias
console.log(portfolioIndustries); // ['Pet Tech', 'Servicios Financieros', ...]
```

## 📝 Notas de Implementación

- **Imágenes Temporales**: Actualmente usando Picsum con seeds temáticas
- **Escalabilidad**: Diseñado para crecer sin modificar código de UI
- **SEO Ready**: Estructura preparada para metadatos dinámicos
- **Accessibility**: Labels, titles y navegación por teclado implementados

---

**Próximos pasos**:
- [ ] Reemplazar imágenes placeholder con fotos reales de proyectos
- [ ] Agregar más casos de éxito según crecimiento de cartera
- [ ] Implementar filtros por industria si se considera necesario
- [ ] Agregar animaciones de entrada más sofisticadas por categorías
