# Configuración de Supabase para Admin Panel

## Pasos para configurar:

### 1. Crear la tabla admin_users

Ve a tu dashboard de Supabase: https://supabase.com/dashboard/project/zyzdvaasktubanlwhhwo

1. Ve a **SQL Editor**
2. Copia y pega el contenido del archivo `supabase/setup-admin.sql`
3. Ejecuta el script (botón "Run")

### 2. Crear usuario admin en Authentication

1. Ve a **Authentication** > **Users**
2. Click en **Add user** > **Create new user**
3. Ingresa:
   - Email: `admin@disruptivolab.com` (o el que prefieras)
   - Password: Crea una contraseña segura
   - Confirma el email automáticamente (toggle)
4. Click en **Create user**
5. **COPIA EL UUID** del usuario creado (aparece en la lista)

### 3. Vincular usuario con admin_users

1. Ve de nuevo a **SQL Editor**
2. Ejecuta este query (reemplaza `TU-UUID-AQUI` con el UUID que copiaste):

```sql
INSERT INTO public.admin_users (id, email, full_name, role, is_active)
VALUES (
  'TU-UUID-AQUI',
  'admin@disruptivolab.com',
  'Admin Disruptivo Lab',
  'admin',
  true
);
```

### 4. Probar el login

Ahora puedes iniciar sesión en `/admin/login` con:
- Email: `admin@disruptivolab.com`
- Password: La contraseña que creaste

## Troubleshooting

Si tienes errores:
- Verifica que el UUID coincida entre auth.users y admin_users
- Verifica que is_active = true
- Revisa los logs en Supabase Dashboard > Logs
