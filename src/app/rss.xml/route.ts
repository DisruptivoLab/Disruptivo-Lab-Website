import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: posts } = await supabase
      .from('blog_posts')
      .select(`
        slug,
        published_at,
        cover_image,
        author_name,
        blog_post_translations!inner(
          title,
          excerpt,
          content,
          locale
        )
      `)
      .eq('status', 'published')
      .eq('blog_post_translations.locale', 'en')
      .order('published_at', { ascending: false })
      .limit(50);

    const baseUrl = 'https://disruptivo.app';
    
    const items = posts?.map((post) => {
      const translation = post.blog_post_translations[0];
      const pubDate = new Date(post.published_at).toUTCString();
      const contentPreview = translation?.excerpt || '';
      const fullContent = translation?.content || '';
      
      return `
    <item>
      <title>${escapeXml(translation?.title || '')}</title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <description>${escapeXml(contentPreview)}</description>
      <content:encoded><![CDATA[${fullContent}]]></content:encoded>
      <pubDate>${pubDate}</pubDate>
      <dc:creator>${escapeXml(post.author_name)}</dc:creator>
      ${post.cover_image ? `<media:thumbnail url="${escapeXml(post.cover_image)}" />
      <enclosure url="${escapeXml(post.cover_image)}" type="image/jpeg" length="0" />` : ''}
      <category>Technology</category>
      <category>Innovation</category>
      <category>AI</category>
    </item>`;
    }).join('') || '';

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:media="http://search.yahoo.com/mrss/"
     xmlns:snf="http://www.smartnews.be/snf">
  <channel>
    <title>Disruptivo Lab - Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Insights, trends and knowledge about innovation, technology and AI</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <snf:logo>
      <url>${baseUrl}/media/Identidad/iconotipo_disrptivo_Lab.png</url>
    </snf:logo>
    <image>
      <url>${baseUrl}/media/Identidad/iconotipo_disrptivo_Lab.png</url>
      <title>Disruptivo Lab</title>
      <link>${baseUrl}</link>
    </image>
    ${items}
  </channel>
</rss>`;

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
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
