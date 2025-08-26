# **Plan de Tareas - Sitio Web Disruptivo Lab (Versión 2.0)**

Este documento detalla las tareas a realizar para cumplir con los requerimientos definidos en el `requirements.md` (Versión 2.0). Las tareas están agrupadas por fases lógicas y se priorizarán en colaboración contigo.

## **Fase 0: Estabilización y Limpieza Final** ✅ **COMPLETADA**

### **Tareas de Limpieza de Código**
- [x] **Tarea 0.1: Resolver Advertencias de ESLint (`@typescript-eslint/no-explicit-any`)**  
  📝 **Descripción:** Identificar y tipar correctamente todas las instancias de `any` que aún generan advertencias en el `build`.  
  📁 **Archivos afectados:** `src/contexts/modular-translation-context.tsx`, `src/hooks/use-video-optimization.ts`  
  ⭐ **Prioridad:** Alta

- [x] **Tarea 0.2: Resolver Advertencias de ESLint (`@typescript-eslint/no-unused-vars`)**  
  📝 **Descripción:** Eliminar variables, importaciones y componentes que están definidos pero nunca se utilizan.  
  📁 **Archivos afectados:** Múltiples archivos en `src/app/`, `src/components/`, `src/contexts/`, `src/hooks/`  
  ⭐ **Prioridad:** Media

- [x] **Tarea 0.3: Resolver Advertencias de ESLint (`react-hooks/exhaustive-deps`)**  
  📝 **Descripción:** Asegurar que todas las dependencias de los `useEffect` de React estén correctamente listadas.  
  📁 **Archivos afectados:** `src/hooks/use-video-optimization.ts`  
  ⭐ **Prioridad:** Media

- [x] **Tarea 0.4: Resolver Advertencias de ESLint (`prefer-const`)**  
  📝 **Descripción:** Cambiar `let` por `const` donde la variable no se reasigna.  
  📁 **Archivos afectados:** `src/contexts/modular-translation-context.tsx`  
  ⭐ **Prioridad:** Baja

- [x] **Tarea 0.5: Resolver Advertencias de ESLint (`@next/next/no-page-custom-font`)**  
  📝 **Descripción:** Asegurar que las fuentes personalizadas se carguen de la manera recomendada por Next.js.  
  📁 **Archivos afectados:** `src/app/layout.tsx`  
  ⭐ **Prioridad:** Media

- [x] **Tarea 0.6: Resolver Advertencias de ESLint (Expresiones sin efecto)**  
  📝 **Descripción:** Corregir expresiones que no tienen un efecto secundario o no se asignan.  
  📁 **Archivos afectados:** `src/app/services/page.tsx`  
  ⭐ **Prioridad:** Media

**✅ Resultado:** ¡0 warnings, código 100% limpio!

---

## **Fase 1: Implementación de Requerimientos Clave**

### **Tareas de Refinamiento Principal**
- [ ] **Tarea 1.1: Revisar y Refinar Páginas Principales**  
  📝 **Descripción:** Asegurar que las páginas `/`, `/method`, `/services`, `/portfolio`, `/about` cumplen con los requerimientos de contenido y diseño definidos en el `requirements.md`.  
  ⭐ **Prioridad:** Alta

- [ ] **Tarea 1.2: Refinar Navegación y Elementos UI (Liquid Glass)**  
  📝 **Descripción:** Auditar y refinar la implementación de los principios "Liquid Glass" en la navegación (`navigation.tsx`, `fullscreen-mobile-menu.tsx`) y en los componentes UI (`FrostedButton`, `GlassCard`, `SimpleGlassCard`, etc.) para asegurar consistencia y perfección.  
  ⭐ **Prioridad:** Alta

- [ ] **Tarea 1.3: Implementar Sistema de Temas (Modo Claro)**  
  📝 **Descripción:** Asegurar que el modo claro del tema esté completamente implementado y sea visualmente coherente con la estética "Liquid Glass".  
  ⭐ **Prioridad:** Media

- [ ] **Tarea 1.4: Asegurar Consistencia Tipográfica**  
  📝 **Descripción:** Verificar que Poppins se usa para titulares y JetBrains Mono para textos de cuerpo en todo el sitio.  
  ⭐ **Prioridad:** Alta

---

## **Fase 2: Funcionalidades Transversales y Optimización**

### **Tareas de Sistema y Performance**
- [ ] **Tarea 2.1: Completar Migración de Traducciones Modulares**  
  📝 **Descripción:** Migrar todas las traducciones restantes de los archivos monolíticos (`src/locales/*.json`) a la estructura modular (`src/locales/modular/`).  
  ⭐ **Prioridad:** Alta

- [ ] **Tarea 2.2: Optimización de Rendimiento (Imágenes y Videos)**  
  📝 **Descripción:** Asegurar que todas las imágenes y videos se cargan de forma optimizada (`next/image`, `useVideoOptimization`) para mejorar el rendimiento.  
  ⭐ **Prioridad:** Media

- [ ] **Tarea 2.3: Configurar Despliegue en Firebase Hosting**  
  📝 **Descripción:** Configurar el proyecto para un despliegue automatizado y funcional en Firebase Hosting.  
  ⭐ **Prioridad:** Alta

---

## **Fase 3: Tareas de Mantenimiento y Futuras Consideraciones**

### **Tareas de Organización y Futuro**
- [ ] **Tarea 3.1: Revisar y Limpiar `src/locales/modular/pages/home/*.json`**  
  📝 **Descripción:** El `requirements.md` indica que `pages/home` solo debe contener meta tags y contenido único, pero los archivos actuales (`fr.json`, `ja.json`, `ko.json`, `pt.json`, `zh.json`) contienen `hero` y `agents` que deberían estar en `components/slides`. Mover estas traducciones a su lugar correcto.  
  ⭐ **Prioridad:** Media

- [ ] **Tarea 3.2: Re-evaluar Integración de IA (Genkit)**  
  📝 **Descripción:** Si en el futuro se decide reintroducir la funcionalidad de agentes conversacionales, se deberá investigar y solucionar los problemas de compatibilidad de versiones de Genkit y re-implementar los flujos.  
  ⭐ **Prioridad:** Baja (futura)

---

## **📊 Progreso General**

### **Estado por Fases**
- ✅ **Fase 0:** Completada (6/6 tareas) 
- 🔄 **Fase 1:** En progreso (0/4 tareas)
- ⏳ **Fase 2:** Pendiente (0/3 tareas)
- 🔮 **Fase 3:** Futuro (0/2 tareas)

### **Progreso Total: 6/15 tareas (40%)**

**🎯 Próximo objetivo:** Comenzar Fase 1 - Refinamiento de componentes y páginas principales