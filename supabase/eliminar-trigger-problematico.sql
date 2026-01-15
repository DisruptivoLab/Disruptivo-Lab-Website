-- ELIMINAR EL TRIGGER PROBLEMÁTICO
DROP TRIGGER IF EXISTS update_admin_last_login_trigger ON auth.users;
DROP FUNCTION IF EXISTS update_admin_last_login() CASCADE;

-- Verificar que se eliminó
SELECT 
    trigger_name,
    event_object_table
FROM information_schema.triggers
WHERE trigger_name LIKE '%admin%';

-- Si ves más triggers relacionados con admin, elimínalos también:
-- DROP TRIGGER IF EXISTS nombre_del_trigger ON auth.users;
