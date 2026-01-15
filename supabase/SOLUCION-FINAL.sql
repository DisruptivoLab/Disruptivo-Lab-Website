-- ============================================
-- SOLUCIÓN DEFINITIVA: Eliminar Database Hooks
-- ============================================

-- 1. Ve a tu Dashboard de Supabase
-- 2. Database > Webhooks (o Database Hooks)
-- 3. ELIMINA cualquier webhook/hook que veas ahí

-- 4. Ejecuta este SQL para limpiar triggers:

-- Ver todos los triggers en auth.users
SELECT 
    trigger_name,
    event_manipulation,
    event_object_table
FROM information_schema.triggers
WHERE event_object_schema = 'auth'
AND event_object_table = 'users';

-- Eliminar triggers personalizados (NO los de sistema)
-- Si ves algún trigger que NO sea de Supabase (pg_*), elimínalo:
-- DROP TRIGGER IF EXISTS nombre_del_trigger ON auth.users;

-- ============================================
-- ALTERNATIVA: Usar solo Authentication
-- ============================================
-- Si nada funciona, podemos simplificar y NO usar admin_users
-- Solo validar que el email sea admin@disruptivolab.com en el código
