-- Eliminar TODOS los registros viejos
DELETE FROM public.admin_users;

-- Insertar con el UUID CORRECTO (el que aparece en el error)
INSERT INTO public.admin_users (id, email, full_name, role, is_active)
VALUES (
  '68a2623c-a384-4a05-9e3d-64ab50f77a83',
  'admin@disruptivolab.com',
  'Admin Disruptivo Lab',
  'admin',
  true
);

-- Verificar
SELECT * FROM public.admin_users;
SELECT id, email FROM auth.users;
