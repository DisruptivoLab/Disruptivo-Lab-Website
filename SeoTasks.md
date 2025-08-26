# Plan de Tareas SEO para la Página de Inicio

Este documento detalla las tareas de alto nivel necesarias para mejorar el SEO del sitio web, con un enfoque en la correcta implementación multi-idioma.

## 📊 Progreso General

### Estado: Pendiente

---

## 📈 Tareas de SEO para la Página de Inicio

### ✅ Verificación e Implementación SEO

- [ ] **Subtarea SEO.1: Implementar Metadatos Dinámicos**
  📝 **Descripción:** Actualmente, los metadatos son estáticos y están en español. Esto perjudica el ranking en otros idiomas. La tarea consiste en hacer que el título, descripción, y etiquetas Open Graph se carguen dinámicamente desde los archivos de traducción según el idioma activo.
  📁 **Archivos afectados:** `src/app/layout.tsx`, `src/locales/en.json`, `src/locales/es.json`, etc.
  ⭐ **Prioridad:** Alta

- [ ] **Subtarea SEO.2: Generar Etiquetas `hreflang`**
  📝 **Descripción:** Las etiquetas `hreflang` son cruciales para que los buscadores entiendan las diferentes versiones idiomáticas de una página. Se deben generar dinámicamente para informar a Google sobre las URLs correspondientes a cada idioma, evitando así problemas de contenido duplicado.
  📁 **Archivos afectados:** `src/app/layout.tsx`
  ⭐ **Prioridad:** Alta

- [ ] **Subtarea SEO.3: Crear un `sitemap.xml` Multi-idioma**
  📝 **Descripción:** Un sitemap ayuda a los buscadores a descubrir todas las páginas que deben indexar. Es fundamental que el sitemap incluya las URLs de todas las páginas en cada uno de los idiomas soportados para asegurar una indexación completa y rápida de todo el sitio.
  📁 **Archivos afectados:** `src/app/sitemap.ts` (requiere creación).
  ⭐ **Prioridad:** Alta
