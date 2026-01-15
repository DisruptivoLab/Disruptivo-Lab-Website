-- ============================================
-- CONSULTAR ESTRUCTURA DE TABLAS DEL BLOG
-- ============================================

-- Ver todas las tablas relacionadas con blog/posts
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE '%post%' OR table_name LIKE '%blog%' OR table_name LIKE '%article%'
ORDER BY table_name;

-- Ver todas las tablas públicas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;

-- Si existe una tabla de posts, ver su estructura
SELECT 
    column_name,
    data_type,
    character_maximum_length,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'posts' -- Cambiar si el nombre es diferente
ORDER BY ordinal_position;

-- Ver datos de ejemplo (si existe la tabla)
-- SELECT * FROM posts LIMIT 5;

-- Ver categorías (si existe)
-- SELECT * FROM categories LIMIT 10;

-- Ver relación posts-categorías (si existe)
-- SELECT * FROM post_categories LIMIT 10;
