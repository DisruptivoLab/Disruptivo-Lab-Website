import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await supabase
    .from('blog_posts')
    .select(`
      slug,
      cover_image,
      blog_post_translations!inner(
        title,
        excerpt,
        meta_title,
        meta_description,
        locale
      )
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .eq('blog_post_translations.locale', 'es')
    .single();

  if (!data) {
    return {
      title: 'Artículo no encontrado | Disruptivo Lab',
    };
  }

  const translation = data.blog_post_translations?.[0];
  const title = translation?.meta_title || translation?.title || 'Disruptivo Lab';
  const description = translation?.meta_description || translation?.excerpt || '';

  return {
    title: `${title} | Disruptivo Lab`,
    description,
    openGraph: {
      title,
      description,
      images: data.cover_image ? [data.cover_image] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: data.cover_image ? [data.cover_image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
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
    .eq('blog_post_translations.locale', 'es')
    .single();

  if (error || !data) {
    notFound();
  }

  const translation = data.blog_post_translations?.[0];
  if (!translation) {
    notFound();
  }

  const post = {
    id: data.id,
    slug: data.slug,
    cover_image: data.cover_image,
    author_name: data.author_name,
    published_at: data.published_at,
    views_count: data.views_count,
    reading_time: data.reading_time || 5,
    title: translation.title || 'Sin título',
    excerpt: translation.excerpt || '',
    content: translation.content ? translation.content.replace(/\\n/g, '\n') : '',
  };

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  return (
    <article className="min-h-screen pt-28 pb-16 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Back button */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Volver al blog
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

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Ver más artículos
          </Link>
        </footer>
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            image: post.cover_image,
            author: {
              '@type': 'Person',
              name: post.author_name,
            },
            publisher: {
              '@type': 'Organization',
              name: 'Disruptivo Lab',
              logo: {
                '@type': 'ImageObject',
                url: 'https://disruptivo.app/media/Identidad/iconotipo_disrptivo_Lab.png',
              },
            },
            datePublished: post.published_at,
            dateModified: post.published_at,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://disruptivo.app/blog/${post.slug}`,
            },
          }),
        }}
      />
    </article>
  );
}
