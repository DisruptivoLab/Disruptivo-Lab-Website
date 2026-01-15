-- Ver el UUID real del usuario autenticado
SELECT id, email FROM auth.users WHERE email = 'admin@disruptivolab.com';

-- Eliminar el registro viejo
DELETE FROM public.admin_users WHERE email = 'admin@disruptivolab.com';

-- Insertar con el UUID correcto (el que aparece arriba)
INSERT INTO public.admin_users (id, email, full_name, role, is_active)
VALUES (
  'a709cf15-3240-44ba-9a58-44c854df1156',  -- Este es el UUID correcto que apareció en el error
  'admin@disruptivolab.com',
  'Admin Disruptivo Lab',
  'admin',
  true
);

-- Verificar
SELECT * FROM public.admin_users;
