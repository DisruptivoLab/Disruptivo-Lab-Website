import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://disruptivo.app';

  // Páginas estáticas
  const staticPages = [
    '/',
    '/method',
    '/services',
    '/portfolio',
    '/about',
    '/blog',
    '/validator-ai',
    '/privacy',
    '/terms',
    '/cookies',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '/' ? 1 : route === '/blog' ? 0.9 : route === '/validator-ai' ? 0.85 : 0.8,
  }));

  // Servicios
  const services = [
    'whatsapp-ia',
    'automatizacion',
    'desarrollo-software',
    'consultoria-integral',
    'embudo-ia',
  ].map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Posts del blog (dinámicos desde Supabase)
  let blogPosts: MetadataRoute.Sitemap = [];
  try {
    const { data } = await supabase
      .from('blog_posts')
      .select('slug, updated_at, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (data) {
      blogPosts = data.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updated_at || post.published_at).toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  return [...staticPages, ...services, ...blogPosts];
}
