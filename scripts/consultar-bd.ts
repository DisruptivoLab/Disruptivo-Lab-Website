import { supabaseAdmin } from '../src/lib/supabase';

async function consultarEstructuraBD() {
  console.log('🔍 Consultando estructura de la base de datos...\n');

  // 1. Consultar todas las tablas usando query directo
  const { data: tablas, error: errorTablas } = await supabaseAdmin.rpc('exec_sql', {
    query: `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `
  });

  if (errorTablas) {
    console.log('⚠️ No se pudo usar RPC, intentando método alternativo...\n');
  } else {
    console.log('📋 Tablas en la base de datos:', tablas);
  }

  // 2. Intentar consultar tablas comunes del blog
  const posiblesTablas = ['posts', 'blog_posts', 'articles', 'blog', 'categories', 'post_categories'];
  
  for (const tabla of posiblesTablas) {
    console.log(`\n🔎 Consultando tabla: ${tabla}`);
    const { data, error } = await supabaseAdmin
      .from(tabla)
      .select('*')
      .limit(1);

    if (!error && data) {
      console.log(`✅ Tabla "${tabla}" encontrada!`);
      if (data.length > 0) {
        console.log('Columnas:', Object.keys(data[0]));
        console.log('Ejemplo:', data[0]);
      } else {
        console.log('Tabla vacía');
      }
    } else if (error) {
      console.log(`❌ Tabla "${tabla}" no existe o sin permisos`);
    }
  }

  // 3. Verificar admin_users
  console.log('\n🔎 Consultando tabla: admin_users');
  const { data: adminUsers, error: errorAdmin } = await supabaseAdmin
    .from('admin_users')
    .select('*')
    .limit(1);

  if (!errorAdmin && adminUsers) {
    console.log('✅ Tabla "admin_users" encontrada');
    if (adminUsers.length > 0) {
      console.log('Columnas:', Object.keys(adminUsers[0]));
    }
  }

  console.log('\n✅ Consulta completada');
  process.exit(0);
}

consultarEstructuraBD().catch(console.error);
