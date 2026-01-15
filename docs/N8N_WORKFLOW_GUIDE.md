# 🤖 Guía para Workflow n8n - Blog Disruptivo Lab

## 📋 Información de Conexión Supabase

```
URL: https://zyzdvaasktubanlwhhwo.supabase.co
Service Role Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5emR2YWFza3R1YmFubHdoaHdvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODM5MjQ0NywiZXhwIjoyMDgzOTY4NDQ3fQ.v4s_BgDikIb_bKdbAgVWGGUCcsfJDhdsRK_aaPa_gJ4
Storage Bucket: blog-images
```

---

## 🗄️ Estructura de Base de Datos

### 1. Tabla Principal: `blog_posts`

**Campos obligatorios:**
- `slug` (TEXT): URL única del post (ej: "como-usar-ia-en-tu-negocio")
- `cover_image` (TEXT): URL de la imagen en Supabase Storage
- `cover_image_alt` (TEXT): Texto alternativo para la imagen
- `status` (TEXT): "published" para publicar, "draft" para borrador

**Campos opcionales importantes:**
- `featured` (BOOLEAN): true para destacar en homepage
- `reading_time` (INTEGER): Minutos de lectura estimados
- `published_at` (TIMESTAMPTZ): Fecha de publicación
- `ai_model` (TEXT): Modelo usado (ej: "gpt-4", "claude-3-opus")
- `generation_prompt` (TEXT): Prompt usado para generar

**Campos automáticos:**
- `id` (UUID): Se genera automáticamente
- `author_name`: Por defecto "Disruptivo Lab"
- `generated_by_ai`: Por defecto true
- `created_at`, `updated_at`: Automáticos

---

### 2. Tabla de Traducciones: `blog_post_translations`

**IMPORTANTE**: Debes crear 2 registros por cada post (uno en español, uno en inglés)

**Campos obligatorios:**
- `post_id` (UUID): ID del post de la tabla blog_posts
- `locale` (TEXT): "es" o "en"
- `title` (TEXT): Título del artículo
- `excerpt` (TEXT): Resumen de 160 caracteres EXACTOS (para meta description)
- `content` (TEXT): Contenido completo en HTML

**Campos SEO (muy importantes):**
- `meta_description` (TEXT): 160 caracteres para Google
- `keywords` (TEXT[]): Array de palabras clave ["ia", "automatizacion", "negocio"]

**Campos LLM (para posicionamiento en IA):**
- `llm_summary` (TEXT): Resumen de 200-300 palabras optimizado para LLMs
- `llm_key_points` (TEXT[]): Array de puntos clave ["Punto 1", "Punto 2", "Punto 3"]
- `llm_entities` (JSONB): Objeto con entidades nombradas

**Ejemplo de llm_entities:**
```json
{
  "personas": ["Sam Altman", "Elon Musk"],
  "organizaciones": ["OpenAI", "Anthropic", "Disruptivo Lab"],
  "tecnologias": ["GPT-4", "Claude", "LangChain", "Next.js"]
}
```

---

### 3. Categorías Disponibles

**IDs de categorías (usa estos slugs):**
- `inteligencia-artificial` - Color: #FF4500
- `automatizacion` - Color: #3B82F6
- `desarrollo-software` - Color: #F97316
- `estrategia-digital` - Color: #F59E0B
- `casos-de-exito` - Color: #10B981

**Para asignar categoría:**
Inserta en tabla `blog_post_categories`:
```sql
INSERT INTO blog_post_categories (post_id, category_id)
VALUES (
  'uuid-del-post',
  (SELECT id FROM blog_categories WHERE slug = 'inteligencia-artificial')
);
```

---

## 🔄 Flujo Completo del Workflow

### Paso 1: Generar Contenido con IA

**Prompt sugerido para el LLM:**

```
Genera un artículo de blog profesional sobre [TEMA] para Disruptivo Lab, 
una agencia de innovación y tecnología líder en Latinoamérica.

CONTEXTO:
- Audiencia: CTOs, gerentes de tecnología, emprendedores tech
- Tono: Profesional pero accesible, inspirador
- Objetivo: Posicionar a Disruptivo Lab como referente en innovación

REQUISITOS:
- Longitud: 1500-2000 palabras
- Incluir: Ejemplos prácticos, estadísticas actuales, casos de uso reales
- Estructura: Introducción impactante, 3-4 secciones principales con subtítulos, conclusión con CTA
- SEO: Incluir keywords naturalmente sin forzar
- Formato: HTML limpio con <h2>, <h3>, <p>, <ul>, <li>, <strong>, <em>

FORMATO DE SALIDA (JSON):
{
  "title_es": "Título atractivo en español (máx 60 caracteres)",
  "title_en": "Attractive title in English (max 60 characters)",
  "excerpt_es": "Resumen EXACTO de 160 caracteres en español",
  "excerpt_en": "EXACT 160 character summary in English",
  "content_es": "Contenido completo en HTML en español",
  "content_en": "Full content in HTML in English",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "reading_time": 8,
  "slug": "titulo-en-formato-url-amigable",
  "llm_summary_es": "Resumen de 250 palabras optimizado para LLMs en español",
  "llm_summary_en": "250-word summary optimized for LLMs in English",
  "llm_key_points_es": ["Punto clave 1", "Punto clave 2", "Punto clave 3"],
  "llm_key_points_en": ["Key point 1", "Key point 2", "Key point 3"],
  "llm_entities": {
    "personas": ["Nombre Persona 1", "Nombre Persona 2"],
    "organizaciones": ["Empresa 1", "Empresa 2", "Disruptivo Lab"],
    "tecnologias": ["Tecnología 1", "Tecnología 2"]
  },
  "category_slug": "inteligencia-artificial",
  "image_prompt": "Prompt detallado para generar imagen relacionada con el artículo"
}
```

---

### Paso 2: Generar Imagen

**Especificaciones:**
- Dimensiones: 1200x630px (óptimo para OpenGraph)
- Formato: WebP o PNG
- Estilo: Profesional, moderno, tech
- Incluir: Elementos visuales relacionados con el tema
- NO incluir: Texto en la imagen (se añade en el diseño web)

**Prompt para DALL-E/Midjourney:**
Usa el `image_prompt` generado en el paso anterior.

---

### Paso 3: Subir Imagen a Supabase Storage

**Endpoint:**
```
POST https://zyzdvaasktubanlwhhwo.supabase.co/storage/v1/object/blog-images/{filename}
```

**Headers:**
```
Authorization: Bearer {SERVICE_ROLE_KEY}
Content-Type: image/webp
```

**Filename sugerido:**
```
{slug}-{timestamp}.webp
```

**Respuesta exitosa:**
```json
{
  "Key": "blog-images/como-usar-ia-1234567890.webp"
}
```

**URL pública de la imagen:**
```
https://zyzdvaasktubanlwhhwo.supabase.co/storage/v1/object/public/blog-images/{filename}
```

---

### Paso 4: Insertar Post en Supabase

**4.1 Insertar en `blog_posts`:**

```sql
INSERT INTO blog_posts (
  slug,
  status,
  featured,
  cover_image,
  cover_image_alt,
  cover_image_width,
  cover_image_height,
  reading_time,
  published_at,
  ai_model,
  generation_prompt
) VALUES (
  'como-usar-ia-en-tu-negocio',
  'published',
  false,
  'https://zyzdvaasktubanlwhhwo.supabase.co/storage/v1/object/public/blog-images/como-usar-ia-1234567890.webp',
  'Ilustración sobre inteligencia artificial en negocios',
  1200,
  630,
  8,
  NOW(),
  'gpt-4',
  'Prompt usado para generar el contenido...'
)
RETURNING id;
```

**Guarda el `id` retornado para los siguientes pasos.**

---

**4.2 Insertar traducción en ESPAÑOL:**

```sql
INSERT INTO blog_post_translations (
  post_id,
  locale,
  title,
  excerpt,
  content,
  content_format,
  meta_description,
  keywords,
  llm_summary,
  llm_key_points,
  llm_entities
) VALUES (
  '{post_id_del_paso_anterior}',
  'es',
  'Cómo Usar IA en tu Negocio: Guía Completa 2025',
  'Descubre las mejores prácticas para implementar inteligencia artificial en tu empresa y aumentar la productividad hasta un 40%. Guía práctica y actualizada.',
  '<h2>Introducción</h2><p>Contenido completo en HTML...</p>',
  'html',
  'Descubre las mejores prácticas para implementar inteligencia artificial en tu empresa y aumentar la productividad hasta un 40%. Guía práctica y actualizada.',
  ARRAY['inteligencia artificial', 'ia', 'negocios', 'automatizacion', 'productividad'],
  'Este artículo explora cómo las empresas pueden implementar IA de manera efectiva...',
  ARRAY['La IA puede aumentar la productividad hasta un 40%', 'Existen herramientas accesibles para PyMEs', 'La implementación requiere planificación estratégica'],
  '{"personas": ["Sam Altman"], "organizaciones": ["OpenAI", "Disruptivo Lab"], "tecnologias": ["GPT-4", "Claude", "LangChain"]}'::jsonb
);
```

---

**4.3 Insertar traducción en INGLÉS:**

```sql
INSERT INTO blog_post_translations (
  post_id,
  locale,
  title,
  excerpt,
  content,
  content_format,
  meta_description,
  keywords,
  llm_summary,
  llm_key_points,
  llm_entities
) VALUES (
  '{post_id_del_paso_anterior}',
  'en',
  'How to Use AI in Your Business: Complete 2025 Guide',
  'Discover best practices to implement artificial intelligence in your company and increase productivity up to 40%. Practical and updated guide.',
  '<h2>Introduction</h2><p>Full content in HTML...</p>',
  'html',
  'Discover best practices to implement artificial intelligence in your company and increase productivity up to 40%. Practical and updated guide.',
  ARRAY['artificial intelligence', 'ai', 'business', 'automation', 'productivity'],
  'This article explores how companies can effectively implement AI...',
  ARRAY['AI can increase productivity up to 40%', 'Accessible tools exist for SMEs', 'Implementation requires strategic planning'],
  '{"personas": ["Sam Altman"], "organizaciones": ["OpenAI", "Disruptivo Lab"], "tecnologias": ["GPT-4", "Claude", "LangChain"]}'::jsonb
);
```

---

**4.4 Asignar categoría:**

```sql
INSERT INTO blog_post_categories (post_id, category_id)
VALUES (
  '{post_id_del_paso_anterior}',
  (SELECT id FROM blog_categories WHERE slug = 'inteligencia-artificial')
);
```

---

## 📊 Ejemplo Completo en JSON (para n8n HTTP Request)

**Endpoint Supabase REST API:**
```
POST https://zyzdvaasktubanlwhhwo.supabase.co/rest/v1/blog_posts
```

**Headers:**
```json
{
  "apikey": "SERVICE_ROLE_KEY",
  "Authorization": "Bearer SERVICE_ROLE_KEY",
  "Content-Type": "application/json",
  "Prefer": "return=representation"
}
```

**Body:**
```json
{
  "slug": "como-usar-ia-en-tu-negocio",
  "status": "published",
  "featured": false,
  "cover_image": "https://zyzdvaasktubanlwhhwo.supabase.co/storage/v1/object/public/blog-images/como-usar-ia-1234567890.webp",
  "cover_image_alt": "Ilustración sobre inteligencia artificial en negocios",
  "cover_image_width": 1200,
  "cover_image_height": 630,
  "reading_time": 8,
  "published_at": "2025-01-15T10:00:00Z",
  "ai_model": "gpt-4",
  "generation_prompt": "Genera un artículo sobre..."
}
```

---

## ✅ Checklist de Validación

Antes de publicar, verifica:

- [ ] Slug es único y formato correcto (solo minúsculas y guiones)
- [ ] Imagen subida correctamente a Supabase Storage
- [ ] Imagen es 1200x630px
- [ ] Post tiene status "published"
- [ ] Ambas traducciones (es + en) insertadas
- [ ] Excerpt es EXACTAMENTE 160 caracteres
- [ ] Keywords incluidas (5-7 palabras)
- [ ] llm_summary tiene 200-300 palabras
- [ ] llm_key_points tiene 3-5 puntos
- [ ] llm_entities tiene al menos 2 tecnologías
- [ ] Categoría asignada
- [ ] reading_time calculado
- [ ] Contenido HTML es válido

---

## 🚨 Errores Comunes

1. **Slug duplicado**: Cada slug debe ser único
2. **Excerpt muy largo**: Debe ser EXACTO 160 caracteres
3. **Imagen no pública**: Verificar que el bucket sea público
4. **post_id incorrecto**: Usar el UUID retornado al insertar blog_posts
5. **locale inválido**: Solo "es" o "en"
6. **keywords no es array**: Debe ser formato PostgreSQL array

---

## 📞 Soporte

Si tienes dudas sobre el workflow, consulta:
- `docs/BLOG_SYSTEM.md` - Documentación completa
- `supabase/schema.sql` - Schema de base de datos
- `src/types/blog.ts` - TypeScript types

---

**Creado para**: Workflow n8n de generación automática de blog posts
**Fecha**: Enero 2025
**Versión**: 1.0
