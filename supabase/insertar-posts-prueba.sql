-- Insertar post de prueba en blog_posts
INSERT INTO public.blog_posts (
  slug,
  status,
  featured,
  cover_image,
  cover_image_alt,
  author_name,
  published_at
) VALUES (
  'bienvenido-disruptivo-lab',
  'published',
  true,
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800',
  'Tecnología y código',
  'Disruptivo Lab',
  NOW()
);

-- Obtener el ID del post recién creado
DO $$
DECLARE
  post_id_var UUID;
BEGIN
  SELECT id INTO post_id_var FROM public.blog_posts WHERE slug = 'bienvenido-disruptivo-lab';
  
  -- Insertar traducción en español
  INSERT INTO public.blog_post_translations (
    post_id,
    locale,
    title,
    excerpt,
    content,
    meta_title,
    meta_description
  ) VALUES (
    post_id_var,
    'es',
    'Bienvenido al Blog de Disruptivo Lab',
    'Inauguramos nuestro blog con contenido sobre tecnología, IA y desarrollo.',
    '<h2>Bienvenidos</h2><p>Este es nuestro primer post en el blog de Disruptivo Lab. Aquí compartiremos contenido sobre tecnología, inteligencia artificial y desarrollo de software.</p>',
    'Bienvenido al Blog de Disruptivo Lab',
    'Primer post del blog de Disruptivo Lab sobre tecnología e innovación'
  );
  
  -- Insertar traducción en inglés
  INSERT INTO public.blog_post_translations (
    post_id,
    locale,
    title,
    excerpt,
    content,
    meta_title,
    meta_description
  ) VALUES (
    post_id_var,
    'en',
    'Welcome to Disruptivo Lab Blog',
    'We launch our blog with content about technology, AI and development.',
    '<h2>Welcome</h2><p>This is our first post on the Disruptivo Lab blog. Here we will share content about technology, artificial intelligence and software development.</p>',
    'Welcome to Disruptivo Lab Blog',
    'First post from Disruptivo Lab blog about technology and innovation'
  );
END $$;

-- Verificar
SELECT 
  p.id,
  p.slug,
  p.status,
  pt.locale,
  pt.title
FROM public.blog_posts p
LEFT JOIN public.blog_post_translations pt ON p.id = pt.post_id
ORDER BY p.created_at DESC;
