-- Agregar columna is_featured a blog_posts
ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

-- Crear índice para búsquedas rápidas de posts destacados
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured 
ON public.blog_posts(is_featured) 
WHERE is_featured = true;
