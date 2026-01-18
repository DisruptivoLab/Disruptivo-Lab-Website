import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Obtener todos los posts
    const { data: posts, error: postsError } = await supabase
      .from('blog_posts')
      .select('id, slug, status, blog_post_translations(title, locale)')
      .order('created_at', { ascending: false });

    if (postsError) throw postsError;

    // Obtener todas las relaciones post-categoría
    const { data: postCategories, error: catError } = await supabase
      .from('blog_post_categories')
      .select(`
        post_id,
        blog_categories(
          slug,
          blog_category_translations(name, locale)
        )
      `) as { data: Array<{
        post_id: string;
        blog_categories: {
          slug: string;
          blog_category_translations: Array<{ name: string; locale: string }>;
        } | null;
      }> | null; error: any };

    if (catError) throw catError;

    // Generar informe
    const report = posts?.map(post => {
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

      return {
        id: post.id,
        slug: post.slug,
        title,
        status: post.status,
        hasCategories: categories.length > 0,
        categoriesCount: categories.length,
        categories: categories
      };
    }) || [];

    // Estadísticas
    const totalPosts = report.length;
    const postsWithCategories = report.filter(p => p.hasCategories).length;
    const postsWithoutCategories = totalPosts - postsWithCategories;
    const publishedPosts = report.filter(p => p.status === 'published').length;
    const publishedWithCategories = report.filter(p => p.status === 'published' && p.hasCategories).length;

    const summary = {
      totalPosts,
      postsWithCategories,
      postsWithoutCategories,
      percentageWithCategories: totalPosts > 0 ? ((postsWithCategories / totalPosts) * 100).toFixed(2) + '%' : '0%',
      publishedPosts,
      publishedWithCategories,
      publishedWithoutCategories: publishedPosts - publishedWithCategories
    };

    return NextResponse.json({
      summary,
      posts: report
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Error generating report:', error);
    return NextResponse.json({ error: 'Error generating report' }, { status: 500 });
  }
}
