-- DIAGNÓSTICO: Ver todos los triggers en auth
SELECT 
    trigger_name,
    event_manipulation,
    event_object_table,
    action_statement
FROM information_schema.triggers
WHERE event_object_schema = 'auth';

-- DIAGNÓSTICO: Ver funciones que puedan estar causando problemas
SELECT 
    routine_name,
    routine_type
FROM information_schema.routines
WHERE routine_schema = 'public'
AND routine_name LIKE '%admin%';

-- SOLUCIÓN: Eliminar cualquier trigger problemático en auth.users
-- (Supabase a veces crea triggers automáticos que fallan)
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN 
        SELECT trigger_name, event_object_table
        FROM information_schema.triggers
        WHERE event_object_schema = 'auth'
        AND event_object_table = 'users'
        AND trigger_name NOT LIKE 'pg_%'
    LOOP
        EXECUTE format('DROP TRIGGER IF EXISTS %I ON auth.%I CASCADE', 
                      r.trigger_name, r.event_object_table);
    END LOOP;
END $$;

-- Verificar que admin_users no tenga triggers problemáticos
SELECT 
    trigger_name,
    event_manipulation,
    action_statement
FROM information_schema.triggers
WHERE event_object_table = 'admin_users';
