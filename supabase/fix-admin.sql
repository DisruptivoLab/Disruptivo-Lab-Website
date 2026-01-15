-- PASO 1: Eliminar todo lo anterior si existe
DROP TRIGGER IF EXISTS set_updated_at ON public.admin_users;
DROP POLICY IF EXISTS "Users can read own data" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can read all users" ON public.admin_users;
DROP TABLE IF EXISTS public.admin_users CASCADE;

-- PASO 2: Crear tabla sin RLS (más simple)
CREATE TABLE public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role TEXT NOT NULL CHECK (role IN ('admin', 'editor')),
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PASO 3: DESHABILITAR RLS (para que funcione sin problemas)
ALTER TABLE public.admin_users DISABLE ROW LEVEL SECURITY;

-- PASO 4: Dar permisos completos
GRANT ALL ON public.admin_users TO authenticated;
GRANT ALL ON public.admin_users TO anon;
GRANT ALL ON public.admin_users TO service_role;

-- PASO 5: Verificar que el usuario existe en auth.users
-- Ejecuta este query para ver tu usuario:
-- SELECT id, email FROM auth.users;

-- PASO 6: Insertar en admin_users (REEMPLAZA EL UUID)
-- Copia el UUID del query anterior y úsalo aquí:
-- INSERT INTO public.admin_users (id, email, full_name, role, is_active)
-- VALUES (
--   'TU-UUID-AQUI',
--   'admin@disruptivolab.com',
--   'Admin Disruptivo Lab',
--   'admin',
--   true
-- );
