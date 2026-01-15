-- ============================================
-- SCHEMA PARA BLOG MULTIIDIOMA - DISRUPTIVO LAB
-- SEO Elite + LLM Optimized
-- ============================================

-- Extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla principal de posts
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  
  -- Metadatos
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  featured BOOLEAN DEFAULT false,
  
  -- SEO & AI
  canonical_url TEXT,
  reading_time INTEGER,
  
  -- Imágenes
  cover_image TEXT NOT NULL,
  cover_image_alt TEXT NOT NULL,
  cover_image_width INTEGER,
  cover_image_height INTEGER,
  
  -- Metadata
  author_name TEXT DEFAULT 'Disruptivo Lab',
  author_image TEXT,
  
  -- Timestamps
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Analytics
  views_count INTEGER DEFAULT 0,
  
  -- AI Generation metadata
  generated_by_ai BOOLEAN DEFAULT true,
  ai_model TEXT,
  generation_prompt TEXT,
  
  CONSTRAINT slug_format CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

-- Tabla de contenido multiidioma
CREATE TABLE blog_post_translations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  locale TEXT NOT NULL CHECK (locale IN ('es', 'en')),
  
  -- Contenido
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  content_format TEXT DEFAULT 'html' CHECK (content_format IN ('html', 'markdown')),
  
  -- SEO Elite
  meta_title TEXT,
  meta_description TEXT,
  keywords TEXT[],
  
  -- OpenGraph
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  
  -- Twitter Card
  twitter_title TEXT,
  twitter_description TEXT,
  twitter_image TEXT,
  
  -- Schema.org
  schema_type TEXT DEFAULT 'Article',
  schema_json JSONB,
  
  -- LLM Optimization
  llm_summary TEXT,
  llm_key_points TEXT[],
  llm_entities JSONB,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(post_id, locale)
);

-- Categorías
CREATE TABLE blog_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  icon TEXT,
  color TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE blog_category_translations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES blog_categories(id) ON DELETE CASCADE,
  locale TEXT NOT NULL CHECK (locale IN ('es', 'en')),
  name TEXT NOT NULL,
  description TEXT,
  UNIQUE(category_id, locale)
);

CREATE TABLE blog_post_categories (
  post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES blog_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);

-- Tags
CREATE TABLE blog_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE blog_tag_translations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tag_id UUID NOT NULL REFERENCES blog_tags(id) ON DELETE CASCADE,
  locale TEXT NOT NULL CHECK (locale IN ('es', 'en')),
  name TEXT NOT NULL,
  UNIQUE(tag_id, locale)
);

CREATE TABLE blog_post_tags (
  post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES blog_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Índices
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX idx_blog_posts_featured ON blog_posts(featured) WHERE featured = true;
CREATE INDEX idx_blog_post_translations_post_locale ON blog_post_translations(post_id, locale);

-- Función updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_post_translations_updated_at BEFORE UPDATE ON blog_post_translations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_translations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published posts" ON blog_posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public can read post translations" ON blog_post_translations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM blog_posts 
      WHERE blog_posts.id = blog_post_translations.post_id 
      AND blog_posts.status = 'published'
    )
  );

-- Categorías iniciales
INSERT INTO blog_categories (slug, icon, color) VALUES
  ('inteligencia-artificial', 'Brain', '#FF4500'),
  ('automatizacion', 'Workflow', '#3B82F6'),
  ('desarrollo-software', 'Code2', '#F97316'),
  ('estrategia-digital', 'Lightbulb', '#F59E0B'),
  ('casos-de-exito', 'Trophy', '#10B981');

-- Traducciones de categorías (Español)
INSERT INTO blog_category_translations (category_id, locale, name, description)
SELECT id, 'es', name, description FROM (VALUES
  ((SELECT id FROM blog_categories WHERE slug = 'inteligencia-artificial'), 'Inteligencia Artificial', 'Artículos sobre IA, LLMs y machine learning'),
  ((SELECT id FROM blog_categories WHERE slug = 'automatizacion'), 'Automatización', 'Optimización de procesos con tecnología'),
  ((SELECT id FROM blog_categories WHERE slug = 'desarrollo-software'), 'Desarrollo de Software', 'Mejores prácticas y tecnologías modernas'),
  ((SELECT id FROM blog_categories WHERE slug = 'estrategia-digital'), 'Estrategia Digital', 'Transformación digital y consultoría'),
  ((SELECT id FROM blog_categories WHERE slug = 'casos-de-exito'), 'Casos de Éxito', 'Historias reales de transformación')
) AS t(id, name, description);

-- Traducciones de categorías (Inglés)
INSERT INTO blog_category_translations (category_id, locale, name, description)
SELECT id, 'en', name, description FROM (VALUES
  ((SELECT id FROM blog_categories WHERE slug = 'inteligencia-artificial'), 'Artificial Intelligence', 'Articles about AI, LLMs and machine learning'),
  ((SELECT id FROM blog_categories WHERE slug = 'automatizacion'), 'Automation', 'Process optimization with technology'),
  ((SELECT id FROM blog_categories WHERE slug = 'desarrollo-software'), 'Software Development', 'Best practices and modern technologies'),
  ((SELECT id FROM blog_categories WHERE slug = 'estrategia-digital'), 'Digital Strategy', 'Digital transformation and consulting'),
  ((SELECT id FROM blog_categories WHERE slug = 'casos-de-exito'), 'Success Stories', 'Real transformation stories')
) AS t(id, name, description);
