'use client';

import { useEffect, useState } from 'react';
import { useModularTranslation } from '@/contexts/modular-translation-context';
import { supabase } from '@/lib/supabase';
import { generateArticleSchema } from '@/lib/structured-data';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { SectionLoading } from '@/components/ui/global-loading';
import { NewsletterCTA } from '@/components/newsletter/NewsletterCTA';

interface Props {
  params: Promise<{ slug: string }>;
}

export default function BlogPostPage({ params }: Props) {
  const { locale } = useModularTranslation();
  const [slug, setSlug] = useState<string>('');
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then(p => setSlug(p.slug));
  }, [params]);

  useEffect(() => {
    if (!slug || !locale) return;
    
    async function fetchPost() {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          id,
          slug,
          cover_image,
          author_name,
          published_at,
          updated_at,
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
        .eq('blog_post_translations.locale', locale)
        .single();

      if (error || !data) {
        notFound();
        return;
      }

      const translation = data.blog_post_translations?.[0];
      if (!translation) {
        notFound();
        return;
      }

      const postData = {
        id: data.id,
        slug: data.slug,
        cover_image: data.cover_image,
        author_name: data.author_name,
        published_at: data.published_at,
        updated_at: data.updated_at,
        views_count: data.views_count,
        reading_time: data.reading_time || 5,
        title: translation.title || 'Sin título',
        excerpt: translation.excerpt || '',
        content: translation.content ? translation.content.replace(/\\n/g, '\n') : '',
        meta_title: translation.meta_title,
        meta_description: translation.meta_description,
      };

      setPost(postData);

      // Update document title
      document.title = `${postData.meta_title || postData.title} | Disruptivo Lab`;

      // Fetch related posts
      const { data: categoryData } = await supabase
        .from('blog_post_categories')
        .select('category_id')
        .eq('post_id', postData.id)
        .limit(1)
        .single();

      if (categoryData?.category_id) {
        const { data: related } = await supabase
          .from('blog_post_categories')
          .select(`
            blog_posts!inner(
              id,
              slug,
              cover_image,
              reading_time,
              blog_post_translations!inner(
                title,
                excerpt,
                locale
              )
            )
          `)
          .eq('category_id', categoryData.category_id)
          .eq('blog_posts.blog_post_translations.locale', locale)
          .neq('post_id', postData.id)
          .limit(3);

        if (related) {
          const relatedData = related
            .map((r: any) => r.blog_posts)
            .filter(Boolean)
            .map((p: any) => ({
              slug: p.slug,
              cover_image: p.cover_image,
              reading_time: p.reading_time,
              title: p.blog_post_translations?.[0]?.title || '',
              excerpt: p.blog_post_translations?.[0]?.excerpt || '',
            }));
          setRelatedPosts(relatedData);
        }
      }

      setLoading(false);
    }

    fetchPost();
  }, [slug, locale]);

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  if (loading || !post) return <SectionLoading />;

  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.meta_description || post.excerpt,
    url: `https://disruptivo.app/blog/${post.slug}`,
    image: post.cover_image || 'https://disruptivo.app/media/Identidad/iconotipo_disrptivo_Lab.png',
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    author: post.author_name,
    wordCount: Math.ceil(post.content.length / 5)
  });

  return (
    <article className="min-h-screen pt-28 pb-16 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
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
            [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mt-16 [&_h2]:mb-8 [&_h2]:text-foreground
            [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:mt-12 [&_h3]:mb-6 [&_h3]:text-foreground
            [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-6 [&_p]:text-base
            [&_a]:text-red-600 [&_a]:no-underline hover:[&_a]:underline [&_a]:font-medium
            [&_strong]:text-foreground [&_strong]:font-semibold
            [&_em]:text-foreground [&_em]:italic
            [&_ul]:my-8 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-3
            [&_ol]:my-8 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-3
            [&_li]:text-muted-foreground [&_li]:leading-relaxed [&_li]:text-base
            [&_li]:marker:text-red-600
            [&_code]:bg-muted [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono [&_code]:text-foreground
            [&_pre]:bg-muted [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:border [&_pre]:border-border [&_pre]:my-8
            [&_blockquote]:border-l-4 [&_blockquote]:border-red-600 [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_blockquote]:my-8
            [&_img]:rounded-xl [&_img]:my-10 [&_img]:shadow-lg
            [&_hr]:border-border [&_hr]:my-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Newsletter CTA */}
        <div className="mt-16">
          <NewsletterCTA 
            source="blog-post"
            articleSlug={post.slug}
          />
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-8 border-t border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">{locale === 'es' ? 'Artículos Relacionados' : 'Related Articles'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group block rounded-lg overflow-hidden border border-border hover:border-red-600 transition-colors"
                >
                  {related.cover_image && (
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={related.cover_image}
                        alt={related.title}
                        fill
                        loading="lazy"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {related.excerpt}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {related.reading_time} min
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

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
