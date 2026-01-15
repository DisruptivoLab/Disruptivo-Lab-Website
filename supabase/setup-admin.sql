-- Crear tabla admin_users
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role TEXT NOT NULL CHECK (role IN ('admin', 'editor')),
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Política: Los usuarios autenticados pueden leer su propia información
CREATE POLICY "Users can read own data"
  ON public.admin_users
  FOR SELECT
  USING (auth.uid() = id);

-- Política: Solo admins pueden leer todos los usuarios
CREATE POLICY "Admins can read all users"
  ON public.admin_users
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = auth.uid() AND role = 'admin' AND is_active = true
    )
  );

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.admin_users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Insertar usuario admin por defecto
-- IMPORTANTE: Primero debes crear este usuario en Supabase Auth
-- Ve a Authentication > Users en tu dashboard de Supabase y crea un usuario
-- Luego ejecuta este INSERT con el UUID del usuario creado

-- Ejemplo (reemplaza con tu UUID real):
-- INSERT INTO public.admin_users (id, email, full_name, role, is_active)
-- VALUES (
--   'TU-UUID-AQUI',
--   'admin@disruptivolab.com',
--   'Admin Disruptivo Lab',
--   'admin',
--   true
-- );
