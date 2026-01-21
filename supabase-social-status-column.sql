-- Agregar columna social_status a blog_posts
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS social_status TEXT DEFAULT 'pending' 
CHECK (social_status IN ('pending', 'partial', 'completed'));

-- Índice para filtrar por estado social
CREATE INDEX IF NOT EXISTS idx_blog_posts_social_status ON blog_posts(social_status);

-- Actualizar posts existentes a 'pending' si es NULL
UPDATE blog_posts SET social_status = 'pending' WHERE social_status IS NULL;
