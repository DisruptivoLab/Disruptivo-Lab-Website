-- ============================================
-- ESTRUCTURA DE TABLAS PARA EL BLOG
-- ============================================

-- 1. Tabla de categorías
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabla de posts
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  author_id UUID REFERENCES auth.users(id),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabla relación posts-categorías (muchos a muchos)
CREATE TABLE IF NOT EXISTS public.post_categories (
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);

-- 4. Deshabilitar RLS temporalmente
ALTER TABLE public.categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_categories DISABLE ROW LEVEL SECURITY;

-- 5. Dar permisos
GRANT ALL ON public.categories TO authenticated, anon, service_role;
GRANT ALL ON public.posts TO authenticated, anon, service_role;
GRANT ALL ON public.post_categories TO authenticated, anon, service_role;

-- 6. Insertar categorías de ejemplo
INSERT INTO public.categories (name, slug, description) VALUES
  ('Tecnología', 'tecnologia', 'Artículos sobre tecnología e innovación'),
  ('IA', 'ia', 'Inteligencia Artificial y Machine Learning'),
  ('Desarrollo', 'desarrollo', 'Desarrollo de software y mejores prácticas'),
  ('Diseño', 'diseno', 'Diseño UX/UI y experiencia de usuario')
ON CONFLICT (slug) DO NOTHING;

-- 7. Insertar posts de ejemplo
INSERT INTO public.posts (title, slug, excerpt, content, status, published_at, author_id) VALUES
  (
    'Bienvenidos al Blog de Disruptivo Lab',
    'bienvenidos-blog-disruptivo-lab',
    'Inauguramos nuestro blog con contenido sobre tecnología, IA y desarrollo.',
    '<h2>Bienvenidos</h2><p>Este es nuestro primer post en el blog de Disruptivo Lab.</p>',
    'published',
    NOW(),
    (SELECT id FROM auth.users LIMIT 1)
  ),
  (
    'El Futuro de la IA en 2025',
    'futuro-ia-2025',
    'Exploramos las tendencias y predicciones de IA para el próximo año.',
    '<h2>Tendencias de IA</h2><p>La inteligencia artificial continúa evolucionando...</p>',
    'draft',
    NULL,
    (SELECT id FROM auth.users LIMIT 1)
  )
ON CONFLICT (slug) DO NOTHING;

-- 8. Relacionar posts con categorías
INSERT INTO public.post_categories (post_id, category_id)
SELECT 
  p.id,
  c.id
FROM public.posts p
CROSS JOIN public.categories c
WHERE p.slug = 'bienvenidos-blog-disruptivo-lab' AND c.slug IN ('tecnologia', 'ia')
ON CONFLICT DO NOTHING;

-- Verificar
SELECT * FROM public.categories;
SELECT * FROM public.posts;
SELECT * FROM public.post_categories;
