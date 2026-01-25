# 🔍 Problemas de Indexación - Google Search Console

**Fecha de análisis**: 23 de enero de 2026  
**Dominio**: disruptivo.app  
**Total de páginas afectadas**: 101 páginas

---

## 📊 Resumen Ejecutivo

| Problema | Páginas | Severidad | Estado |
|----------|---------|-----------|--------|
| Página con redirección | 8 | 🔴 ERROR | Pendiente |
| No se ha encontrado (404) | 19 | 🟡 Advertencia | Pendiente |
| Duplicada sin canonical | 17 | 🟠 Importante | Pendiente |
| Descubierta sin indexar | 47 | 🟡 Advertencia | Pendiente |
| Rastreada sin indexar | 10 | 🟢 Menor | Pendiente |

**Impacto total**: 101 páginas no indexadas que no aparecen en Google

---

## 🔴 1. Página con Redirección (8 páginas - ERROR)

### Descripción
Google detectó redirecciones en estas URLs. Las páginas con redirecciones no se indexan.

### Páginas Afectadas

```
https://disruptivo.app/blog/react-19-acelera-desarrollo-5963
https://disruptivo.app/blog/deepseek-coder-ia-codigo
https://disruptivo.app/blog/gpt-5-automatizacion-negocios-7352
https://disruptivo.app/blog/gpt-5-automatizacion-profesional-3268
https://disruptivo.app/blog/claude-cowork-agente-ia
http://disruptivo.app/
https://disruptivo.app/
http://www.disruptivo.app/
```

### Causa Raíz
1. **Variaciones de dominio**: http vs https, www vs sin www
2. **Slugs de blog incompletos**: Faltan números al final del slug
3. **Redirecciones en middleware**: Posiblemente redirigiendo a versiones con/sin trailing slash

### Impacto
- ❌ Google no indexa estas páginas
- ❌ No aparecen en resultados de búsqueda
- ❌ Pérdida de tráfico orgánico potencial

### Solución Requerida
1. Forzar HTTPS sin www como versión canónica
2. Implementar canonical tags en todas las páginas
3. Corregir slugs de blog posts en base de datos
4. Configurar redirecciones 301 permanentes en middleware

---

## 🟡 2. No se ha Encontrado - 404 (19 páginas)

### Descripción
Google intenta rastrear URLs que no existen en el sitio.

### Páginas Afectadas

#### Subdominios Inexistentes
```
https://validator.disruptivo.app/about
```

#### URLs de Idiomas que No Existen
```
https://disruptivo.app/fr/blog/agentes-ia-code-only-8872
https://disruptivo.app/fr/blog/react-19-rendimiento-disruptivo-8547
https://disruptivo.app/ja/blog/react-19-rendimiento-disruptivo-8547
https://disruptivo.app/en/blog/react-19-rendimiento-disruptivo-8547
https://disruptivo.app/ko/blog/react-19-rendimiento-disruptivo-8547
https://disruptivo.app/en/blog/gpt-5-automatizacion-profesional-3268
https://disruptivo.app/pt/blog/openai-modelos-open-source-4405
https://disruptivo.app/fr/blog/openai-modelos-open-source-4405
https://disruptivo.app/pt/blog/supabase-index-advisor-ia-7436
```

### Causa Raíz
1. **Hreflang tags incorrectos**: Se implementaron hreflang para 7 idiomas (es, en, pt, fr, ja, ko, zh) pero solo existe contenido en español
2. **Subdominios no configurados**: validator.disruptivo.app no existe
3. **Enlaces rotos**: Posiblemente enlaces internos o externos apuntando a URLs inexistentes

### Impacto
- ⚠️ Desperdicio de crawl budget de Google
- ⚠️ Experiencia negativa para usuarios que llegan a 404
- ⚠️ Señal negativa para SEO

### Solución Requerida
1. **CRÍTICO**: Eliminar hreflang tags de idiomas sin contenido
2. Mantener solo hreflang para español (es) y x-default
3. Configurar redirecciones 301 de URLs de idiomas a versión española
4. Verificar y eliminar enlaces internos rotos
5. Usar Google Search Console para marcar como corregidas

---

## 🟠 3. Duplicada sin Canonical (17 páginas)

### Descripción
Google detectó contenido duplicado entre www.disruptivo.app y disruptivo.app sin indicación de versión preferida.

### Páginas Afectadas

```
https://www.disruptivo.app/blog/claude-cowork-automatizacion-ia-2949
https://www.disruptivo.app/blog/supabase-index-advisor-ia-7436
https://www.disruptivo.app/blog/react-19-rendimiento-disruptivo-8547
https://www.disruptivo.app/blog/renacimiento-coder-ia-3661
https://www.disruptivo.app/blog/tailwind-v4-rust-100x-3227
https://www.disruptivo.app/blog/gpt-5-agentes-autonomos-4097
https://www.disruptivo.app/blog/n8n-automatizacion-empresarial-1513
... (17 páginas totales)
```

### Causa Raíz
1. **Falta de canonical tags**: No se especifica cuál es la versión preferida
2. **Ambas versiones accesibles**: www y sin www responden con 200 OK
3. **Sin redirección automática**: No hay redirección de www a sin www (o viceversa)

### Impacto
- ❌ Dilución de autoridad SEO entre dos URLs
- ❌ Google debe elegir cuál indexar (puede elegir la incorrecta)
- ❌ Pérdida de ranking potencial

### Solución Requerida
1. Decidir versión canónica: **disruptivo.app** (sin www)
2. Implementar canonical tags en todas las páginas
3. Redireccionar 301 de www.disruptivo.app a disruptivo.app
4. Configurar en Vercel/DNS la versión preferida

---

## 🟡 4. Descubierta sin Indexar (47 páginas)

### Descripción
Google descubrió estas páginas pero decidió no indexarlas (aún).

### Páginas Afectadas (Muestra)

```
https://disruptivo.app/about
https://disruptivo.app/blog
https://disruptivo.app/blog/agente-ia-autonomo-manus-1813
https://disruptivo.app/blog/agentes-ia-automatizacion-empresarial
https://disruptivo.app/blog/alerta-2026-ia-desinformacion-riesgo-digital-empresas-8309
https://disruptivo.app/blog/alianza-titanes-apple-google-gemini-siri-2852
https://disruptivo.app/blog/apple-google-gemini-potencia-siri-3456
https://disruptivo.app/blog/apple-google-gemini-siri-alianza-ia-4110
https://disruptivo.app/blog/auge-agentes-ia-5501
https://disruptivo.app/blog/aws-ai-factories-on-prem
... (47 páginas totales)
```

### Causa Raíz
1. **Contenido nuevo**: Google aún no ha priorizado indexar estas páginas
2. **Baja autoridad de dominio**: Sitio relativamente nuevo
3. **Falta de enlaces internos**: Páginas con poca vinculación interna
4. **Crawl budget limitado**: Google prioriza otras páginas

### Impacto
- ⚠️ Contenido válido no aparece en búsquedas
- ⚠️ Retraso en obtener tráfico orgánico
- ⚠️ Oportunidades de ranking perdidas

### Solución Requerida
1. Solicitar indexación manual en Search Console
2. Mejorar enlazado interno (breadcrumbs, related posts)
3. Generar backlinks de calidad
4. Optimizar sitemap.xml con prioridades
5. Mejorar Core Web Vitals (ya optimizado)
6. Aumentar frecuencia de actualización de contenido

---

## 🟢 5. Rastreada sin Indexar (10 páginas)

### Descripción
Google rastreó estas páginas pero decidió no indexarlas (correcto para archivos estáticos).

### Páginas Afectadas

```
https://disruptivo.app/blog/qwen3-tts-revoluciona-voz-ia-open-source-1048
https://www.disruptivo.app/blog/qwen3-tts-revoluciona-voz-ia-open-source-1048
https://www.disruptivo.app/_next/static/media/8888a3826f4a3af4-s.p.woff2
https://www.disruptivo.app/_next/static/media/eafabf029ad39a43-s.p.woff2
https://chat.disruptivo.app/_next/static/media/bb3ef058b751a6ad-s.p.woff2
https://www.disruptivo.app/_next/static/media/b957ea75a84b6ea7-s.p.woff2
https://www.disruptivo.app/_next/static/media/558ca1a6aa3cb55e-s.p.woff2
https://www.disruptivo.app/favicon.ico
https://chat.disruptivo.app/_next/static/media/eafabf029ad39a43-s.p.woff2
https://chat.disruptivo.app/favicon.ico
```

### Causa Raíz
1. **Archivos estáticos rastreables**: .woff2, favicon.ico no deberían ser rastreados
2. **Falta de robots.txt adecuado**: No se bloquean rutas /_next/static/
3. **Subdominios adicionales**: chat.disruptivo.app también siendo rastreado
4. **Duplicados www**: Mismo contenido en www y sin www

### Impacto
- ✅ Impacto menor (archivos estáticos no deben indexarse)
- ⚠️ Desperdicio de crawl budget
- ⚠️ Duplicados de blog posts (2 URLs del mismo post)

### Solución Requerida
1. Actualizar robots.txt para bloquear /_next/static/
2. Bloquear archivos .woff2, .ico, .svg en robots.txt
3. Resolver duplicados de blog posts (www vs sin www)
4. Configurar canonical para subdominios si es necesario

---

## 🎯 Plan de Acción Priorizado

### Fase 1: Correcciones Críticas (Inmediato)
- [ ] Implementar canonical tags en todas las páginas
- [ ] Redireccionar www a sin www (301)
- [ ] Eliminar hreflang de idiomas sin contenido
- [ ] Corregir slugs de blog posts con redirecciones

### Fase 2: Optimización SEO (1-2 días)
- [ ] Actualizar robots.txt
- [ ] Optimizar sitemap.xml (solo español)
- [ ] Configurar redirecciones 301 para URLs de idiomas
- [ ] Solicitar indexación manual de páginas importantes

### Fase 3: Mejoras Continuas (1 semana)
- [ ] Mejorar enlazado interno
- [ ] Generar backlinks de calidad
- [ ] Monitorear indexación en Search Console
- [ ] Validar correcciones

---

## 📈 Métricas de Éxito

### Antes
- ✅ Páginas indexadas: ~3
- ❌ Páginas con problemas: 101
- ❌ Tasa de indexación: ~3%

### Objetivo (30 días)
- ✅ Páginas indexadas: 50+
- ✅ Páginas con problemas: <10
- ✅ Tasa de indexación: >80%

---

## 🔗 Referencias

- [Google Search Console](https://search.google.com/search-console)
- [Canonical Tags - Google](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Hreflang Tags - Google](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Robots.txt - Google](https://developers.google.com/search/docs/crawling-indexing/robots/intro)

---

**Última actualización**: 24 de enero de 2026  
**Responsable**: Equipo Disruptivo Lab  
**Estado**: 🔴 Requiere acción inmediata
