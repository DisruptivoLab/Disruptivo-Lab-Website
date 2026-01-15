'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useModularTranslation } from '@/contexts/modular-translation-context';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
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
            meta_title,
            meta_description,
            locale
          )
        `)
        .eq('slug', slug)
        .eq('status', 'published')
        .eq('blog_post_translations.locale', locale);

      console.log('Query result:', { data, error });

      if (error) {
        console.error('Supabase error details:', JSON.stringify(error, null, 2));
        throw error;
      }

      if (!data || data.length === 0) {
        console.warn('No post found for slug:', slug);
        setPost(null);
        setLoading(false);
        return;
      }

      const postData = Array.isArray(data) ? data[0] : data;
      const translation = postData.blog_post_translations?.[0];
      
      if (!translation) {
        console.warn('No translation found for locale:', locale);
        setPost(null);
        setLoading(false);
        return;
      }

      setPost({
        id: postData.id,
        slug: postData.slug,
        cover_image: postData.cover_image,
        author_name: postData.author_name,
        published_at: postData.published_at,
        views_count: postData.views_count,
        reading_time: postData.reading_time || 5,
        title: translation.title || 'Sin título',
        excerpt: translation.excerpt || '',
        content: translation.content || '',
        seo_title: translation.meta_title,
        seo_description: translation.meta_description,
        categories: [],
        tags: []
      });

      // Incrementar vistas
      await supabase
        .from('blog_posts')
        .update({ views_count: (postData.views_count || 0) + 1 })
        .eq('id', postData.id);

    } catch (error) {
      console.error('Error fetching post:', error);
      setPost(null);
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
    <>
      {/* SEO Meta Tags */}
      {post && (
        <Head>
          <title>{post.seo_title || post.title}</title>
          <meta name="description" content={post.seo_description || post.excerpt} />
          <meta property="og:title" content={post.seo_title || post.title} />
          <meta property="og:description" content={post.seo_description || post.excerpt} />
          <meta property="og:image" content={post.cover_image || ''} />
          <meta property="og:type" content="article" />
          <meta property="article:published_time" content={post.published_at} />
          <meta property="article:author" content={post.author_name} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={post.seo_title || post.title} />
          <meta name="twitter:description" content={post.seo_description || post.excerpt} />
          <meta name="twitter:image" content={post.cover_image || ''} />
        </Head>
      )}

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
          className="prose prose-lg max-w-none dark:prose-invert
            prose-headings:font-heading prose-headings:font-bold prose-headings:text-foreground
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:leading-tight
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:leading-snug
            prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6 prose-p:text-base
            prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
            prose-strong:text-foreground prose-strong:font-semibold
            prose-em:text-foreground prose-em:italic
            prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
            prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2
            prose-li:text-muted-foreground prose-li:leading-relaxed prose-li:text-base
            prose-li:marker:text-red-600
            prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:text-foreground
            prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:border prose-pre:border-border
            prose-blockquote:border-l-4 prose-blockquote:border-red-600 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-muted-foreground
            prose-img:rounded-xl prose-img:my-8 prose-img:shadow-lg
            prose-hr:border-border prose-hr:my-8
            [&>h2]:scroll-mt-28 [&>h3]:scroll-mt-28"
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
    </>
  );
}
