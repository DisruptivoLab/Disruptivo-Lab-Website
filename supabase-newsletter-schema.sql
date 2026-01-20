-- Tabla para suscriptores del newsletter
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  locale TEXT DEFAULT 'es',
  source TEXT, -- 'blog-post', 'homepage', etc.
  subscribed_at TIMESTAMP DEFAULT NOW(),
  status TEXT DEFAULT 'active', -- 'active', 'unsubscribed'
  metadata JSONB, -- {article_slug, category, etc.}
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices para mejorar performance
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_status ON newsletter_subscribers(status);
CREATE INDEX IF NOT EXISTS idx_newsletter_locale ON newsletter_subscribers(locale);

-- RLS (Row Level Security) - Permitir inserts públicos
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Eliminar políticas existentes si existen
DROP POLICY IF EXISTS "Allow public inserts" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Allow public select count" ON newsletter_subscribers;

-- Crear política para INSERT (usuarios anónimos y autenticados)
CREATE POLICY "Enable insert for anon and authenticated users" 
ON newsletter_subscribers
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Crear política para SELECT (usuarios anónimos y autenticados)
CREATE POLICY "Enable select for anon and authenticated users" 
ON newsletter_subscribers
FOR SELECT 
TO anon, authenticated
USING (true);

-- Función para obtener el conteo de suscriptores activos
CREATE OR REPLACE FUNCTION get_active_subscribers_count()
RETURNS INTEGER AS $$
  SELECT COUNT(*)::INTEGER FROM newsletter_subscribers WHERE status = 'active';
$$ LANGUAGE SQL STABLE;
