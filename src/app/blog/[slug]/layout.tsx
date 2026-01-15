import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const { data } = await supabase
      .from('blog_posts')
      .select(`
        slug,
        cover_image,
        published_at,
        author_name,
        blog_post_translations!inner(
          title,
          excerpt,
          meta_title,
          meta_description,
          locale
        )
      `)
      .eq('slug', params.slug)
      .eq('status', 'published')
      .eq('blog_post_translations.locale', 'es')
      .single();

    if (!data) {
      return {
        title: 'Artículo no encontrado | Disruptivo Lab',
      };
    }

    const translation = data.blog_post_translations[0];
    const title = translation?.meta_title || translation?.title || 'Blog';
    const description = translation?.meta_description || translation?.excerpt || '';
    const url = `https://disruptivolab.com/blog/${data.slug}`;

    return {
      title: `${title} | Disruptivo Lab`,
      description,
      openGraph: {
        title,
        description,
        url,
        siteName: 'Disruptivo Lab',
        images: data.cover_image ? [
          {
            url: data.cover_image,
            width: 1200,
            height: 630,
            alt: title,
          },
        ] : [],
        locale: 'es_ES',
        type: 'article',
        publishedTime: data.published_at,
        authors: [data.author_name],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: data.cover_image ? [data.cover_image] : [],
      },
      alternates: {
        canonical: url,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog | Disruptivo Lab',
    };
  }
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return children;
}
