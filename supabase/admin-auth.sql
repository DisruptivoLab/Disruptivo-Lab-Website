-- ============================================
-- ADMIN AUTH SCHEMA - DISRUPTIVO LAB
-- ============================================

-- Tabla de usuarios admin
CREATE TABLE admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role TEXT DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true
);

-- Índices
CREATE INDEX idx_admin_users_email ON admin_users(email);
CREATE INDEX idx_admin_users_role ON admin_users(role);

-- RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read all admin users"
  ON admin_users FOR SELECT
  USING (auth.uid() IN (SELECT id FROM admin_users WHERE is_active = true));

CREATE POLICY "Admins can update their own profile"
  ON admin_users FOR UPDATE
  USING (auth.uid() = id);

-- Función para actualizar last_login
CREATE OR REPLACE FUNCTION update_admin_last_login()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE admin_users 
  SET last_login = NOW() 
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger en auth.users para actualizar last_login
CREATE TRIGGER on_auth_user_login
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  WHEN (OLD.last_sign_in_at IS DISTINCT FROM NEW.last_sign_in_at)
  EXECUTE FUNCTION update_admin_last_login();

-- Insertar usuario admin inicial (cambiar email y password después)
-- Nota: Primero debes crear el usuario en Supabase Auth Dashboard
-- Luego ejecutar este INSERT con el UUID del usuario creado
INSERT INTO admin_users (id, email, full_name, role)
VALUES (
'uuid-del-usuario-de-auth',
'disruptivolabcol@gmail.com',
'Admin Disruptivo Lab',
'admin'
);
