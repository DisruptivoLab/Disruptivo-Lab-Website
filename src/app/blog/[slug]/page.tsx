'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useModularTranslation } from '@/contexts/modular-translation-context';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import { SectionLoading } from '@/components/ui/global-loading';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  author_name: string;
  published_at: string;
  views_count: number;
  reading_time: number;
  seo_title: string | null;
  seo_description: string | null;
  categories: string[];
  tags: string[];
}

export default function BlogPostPage() {
  const params = useParams();
  const { locale } = useModularTranslation();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.slug) {
      fetchPost(params.slug as string);
    }
  }, [params.slug, locale]);

  async function fetchPost(slug: string) {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          id,
          slug,
          cover_image,
          author_name,
          published_at,
          views_count,
          reading_time,
          blog_post_translations!inner(
            title,
            excerpt,
            content,
            seo_title,
            seo_description,
            locale
          )
        `)
        .eq('slug', slug)
        .eq('status', 'published')
        .eq('blog_post_translations.locale', locale)
        .single();

      if (error) throw error;

      const translation = data.blog_post_translations[0];
      
      setPost({
        id: data.id,
        slug: data.slug,
        cover_image: data.cover_image,
        author_name: data.author_name,
        published_at: data.published_at,
        views_count: data.views_count,
        reading_time: data.reading_time || 5,
        title: translation?.title || 'Sin título',
        excerpt: translation?.excerpt || '',
        content: translation?.content || '',
        seo_title: translation?.seo_title,
        seo_description: translation?.seo_description,
        categories: [],
        tags: []
      });

      // Incrementar vistas
      await supabase
        .from('blog_posts')
        .update({ views_count: (data.views_count || 0) + 1 })
        .eq('id', data.id);

    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  if (loading) return <SectionLoading />;
  if (!post) return (
    <div className="min-h-screen pt-28 pb-16 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          {locale === 'es' ? 'Artículo no encontrado' : 'Article not found'}
        </h1>
        <Link href="/blog" className="text-red-600 hover:underline">
          {locale === 'es' ? '← Volver al blog' : '← Back to blog'}
        </Link>
      </div>
    </div>
  );

  return (
    <article className="min-h-screen pt-28 pb-16 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Back button */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          {locale === 'es' ? 'Volver al blog' : 'Back to blog'}
        </Link>

        {/* Cover Image */}
        {post.cover_image && (
          <div className="relative aspect-[21/9] overflow-hidden rounded-2xl mb-8">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            {post.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{post.author_name}</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(post.published_at)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.reading_time} min
            </span>
          </div>
        </header>

        {/* Content */}
        <div 
          className="prose prose-lg max-w-none
            prose-headings:font-heading prose-headings:font-bold prose-headings:text-foreground
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground prose-strong:font-semibold
            prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
            prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
            prose-li:text-muted-foreground prose-li:mb-2
            prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
            prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
            prose-blockquote:border-l-4 prose-blockquote:border-red-600 prose-blockquote:pl-4 prose-blockquote:italic
            prose-img:rounded-xl prose-img:my-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            {locale === 'es' ? 'Ver más artículos' : 'View more articles'}
          </Link>
        </footer>
      </div>
    </article>
  );
}
