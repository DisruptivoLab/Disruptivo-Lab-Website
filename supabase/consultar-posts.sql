-- ============================================
-- CONSULTAR TODOS LOS POSTS DEL BLOG
-- ============================================

-- Posts con sus traducciones en español
SELECT 
  p.id,
  p.slug,
  p.status,
  p.featured,
  p.cover_image,
  p.author_name,
  p.published_at,
  p.created_at,
  p.views_count,
  pt.locale,
  pt.title,
  pt.excerpt,
  pt.content,
  -- Categorías (agregadas como array)
  ARRAY_AGG(DISTINCT ct.name) FILTER (WHERE ct.name IS NOT NULL) as categories,
  -- Tags (agregados como array)
  ARRAY_AGG(DISTINCT tt.name) FILTER (WHERE tt.name IS NOT NULL) as tags
FROM public.blog_posts p
LEFT JOIN public.blog_post_translations pt ON p.id = pt.post_id
LEFT JOIN public.blog_post_categories pc ON p.id = pc.post_id
LEFT JOIN public.blog_categories c ON pc.category_id = c.id
LEFT JOIN public.blog_category_translations ct ON c.id = ct.category_id AND ct.locale = pt.locale
LEFT JOIN public.blog_post_tags ptg ON p.id = ptg.post_id
LEFT JOIN public.blog_tags t ON ptg.tag_id = t.id
LEFT JOIN public.blog_tag_translations tt ON t.id = tt.tag_id AND tt.locale = pt.locale
WHERE pt.locale = 'es' OR pt.locale IS NULL
GROUP BY p.id, p.slug, p.status, p.featured, p.cover_image, p.author_name, 
         p.published_at, p.created_at, p.views_count, pt.locale, pt.title, 
         pt.excerpt, pt.content
ORDER BY p.created_at DESC;

-- Contar posts por estado
SELECT status, COUNT(*) as total
FROM public.blog_posts
GROUP BY status;

-- Ver todas las categorías con traducciones
SELECT 
  c.id,
  c.slug,
  ct.locale,
  ct.name,
  ct.description
FROM public.blog_categories c
LEFT JOIN public.blog_category_translations ct ON c.id = ct.category_id
ORDER BY c.slug, ct.locale;

-- Ver todos los tags con traducciones
SELECT 
  t.id,
  t.slug,
  tt.locale,
  tt.name
FROM public.blog_tags t
LEFT JOIN public.blog_tag_translations tt ON t.id = tt.tag_id
ORDER BY t.slug, tt.locale;
