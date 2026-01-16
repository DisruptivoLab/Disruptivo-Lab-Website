import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const { data: posts } = await supabase
      .from('blog_posts')
      .select(`
        slug,
        published_at,
        cover_image,
        blog_post_translations!inner(
          title,
          locale
        )
      `)
      .eq('status', 'published')
      .gte('published_at', twoDaysAgo.toISOString())
      .order('published_at', { ascending: false });

    const baseUrl = 'https://disruptivo.app';
    
    const newsItems = posts?.map((post) => {
      const translation = post.blog_post_translations.find((t: any) => t.locale === 'es');
      const pubDate = new Date(post.published_at);
      
      return `
    <url>
      <loc>${baseUrl}/blog/${post.slug}</loc>
      <news:news>
        <news:publication>
          <news:name>Disruptivo Lab</news:name>
          <news:language>es</news:language>
        </news:publication>
        <news:publication_date>${pubDate.toISOString()}</news:publication_date>
        <news:title>${escapeXml(translation?.title || '')}</news:title>
      </news:news>
      ${post.cover_image ? `<image:image>
        <image:loc>${escapeXml(post.cover_image)}</image:loc>
        <image:title>${escapeXml(translation?.title || '')}</image:title>
      </image:image>` : ''}
    </url>`;
    }).join('') || '';

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${newsItems}
</urlset>`;

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error generating news sitemap:', error);
    return new Response('Error', { status: 500 });
  }
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
