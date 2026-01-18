import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zyzdvaasktubanlwhhwo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5emR2YWFza3R1YmFubHdoaHdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzOTI0NDcsImV4cCI6MjA4Mzk2ODQ0N30.AG60SXhVOpvRq3snL0aLEIx7i3MS_nTLtCcQ1X3Eaiw';
const supabase = createClient(supabaseUrl, supabaseKey);

async function generateReport() {
  console.log('📊 INFORME DE POSTS Y CATEGORÍAS\n');
  console.log('='.repeat(80));

  // Obtener todos los posts
  const { data: posts, error: postsError } = await supabase
    .from('blog_posts')
    .select('id, slug, status, blog_post_translations(title, locale)')
    .order('created_at', { ascending: false });

  if (postsError) {
    console.error('❌ Error obteniendo posts:', postsError);
    return;
  }

  // Obtener todas las relaciones post-categoría
  const { data: postCategories, error: catError } = await supabase
    .from('blog_post_categories')
    .select(`
      post_id,
      blog_categories(
        slug,
        blog_category_translations(name, locale)
      )
    `);

  if (catError) {
    console.error('❌ Error obteniendo categorías:', catError);
    return;
  }

  console.log(`\n📝 Total de posts en BD: ${posts?.length || 0}`);
  console.log(`🔗 Total de relaciones post-categoría: ${postCategories?.length || 0}\n`);

  let postsWithCategories = 0;
  let postsWithoutCategories = 0;
  let publishedWithCategories = 0;
  let publishedWithoutCategories = 0;

  console.log('DETALLE POR POST:');
  console.log('-'.repeat(80));

  posts?.forEach(post => {
    const title = post.blog_post_translations?.find(t => t.locale === 'es')?.title || 
                 post.blog_post_translations?.[0]?.title || 
                 'Sin título';

    const categories = postCategories
      ?.filter(pc => pc.post_id === post.id)
      .map(pc => {
        const catName = pc.blog_categories?.blog_category_translations?.find(t => t.locale === 'es')?.name ||
                       pc.blog_categories?.blog_category_translations?.[0]?.name ||
                       'Sin nombre';
        return catName;
      }) || [];

    const hasCategories = categories.length > 0;
    
    if (hasCategories) {
      postsWithCategories++;
      if (post.status === 'published') publishedWithCategories++;
    } else {
      postsWithoutCategories++;
      if (post.status === 'published') publishedWithoutCategories++;
    }

    const icon = hasCategories ? '✅' : '❌';
    const statusIcon = post.status === 'published' ? '🟢' : '🟡';
    
    console.log(`\n${icon} ${statusIcon} ${title}`);
    console.log(`   Slug: ${post.slug}`);
    console.log(`   Estado: ${post.status}`);
    console.log(`   Categorías (${categories.length}): ${categories.length > 0 ? categories.join(', ') : 'NINGUNA'}`);
  });

  console.log('\n' + '='.repeat(80));
  console.log('\n📊 RESUMEN ESTADÍSTICO:\n');
  console.log(`Total de posts: ${posts?.length || 0}`);
  console.log(`Posts CON categorías: ${postsWithCategories} (${((postsWithCategories / (posts?.length || 1)) * 100).toFixed(1)}%)`);
  console.log(`Posts SIN categorías: ${postsWithoutCategories} (${((postsWithoutCategories / (posts?.length || 1)) * 100).toFixed(1)}%)`);
  console.log(`\nPosts publicados: ${publishedWithCategories + publishedWithoutCategories}`);
  console.log(`  - Con categorías: ${publishedWithCategories}`);
  console.log(`  - Sin categorías: ${publishedWithoutCategories}`);
  console.log('\n' + '='.repeat(80));
}

generateReport().then(() => {
  console.log('\n✅ Informe completado\n');
  process.exit(0);
}).catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
