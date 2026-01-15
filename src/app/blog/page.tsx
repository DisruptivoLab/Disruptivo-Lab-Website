'use client';

import { useEffect, useState } from 'react';
import { useModularTranslation } from '@/contexts/modular-translation-context';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import { SectionLoading } from '@/components/ui/global-loading';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover_image: string | null;
  author_name: string;
  published_at: string;
  views_count: number;
  is_featured: boolean;
  reading_time: number;
}

export default function BlogPage() {
  const { locale } = useModularTranslation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, [locale]);

  async function fetchPosts() {
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
          is_featured,
          reading_time,
          blog_post_translations!inner(
            title,
            excerpt,
            locale
          )
        `)
        .eq('status', 'published')
        .eq('blog_post_translations.locale', locale)
        .order('published_at', { ascending: false });

      if (error) throw error;

      const formattedPosts = data?.map((post: any) => ({
        id: post.id,
        slug: post.slug,
        cover_image: post.cover_image,
        author_name: post.author_name,
        published_at: post.published_at,
        views_count: post.views_count,
        is_featured: post.is_featured,
        reading_time: post.reading_time || 5,
        title: post.blog_post_translations[0]?.title || 'Sin título',
        excerpt: post.blog_post_translations[0]?.excerpt || ''
      })) || [];

      const featured = formattedPosts.find(p => p.is_featured);
      const regular = formattedPosts.filter(p => !p.is_featured);

      setFeaturedPost(featured || null);
      setPosts(regular);
    } catch (error) {
      console.error('Error fetching posts:', error);
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

  return (
    <div className="min-h-screen pt-28 pb-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-foreground mb-4">
            Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {locale === 'es' 
              ? 'Insights, tendencias y conocimiento sobre innovación, tecnología e IA'
              : 'Insights, trends and knowledge about innovation, technology and AI'}
          </p>
        </div>

        {featuredPost && (
          <Link href={`/blog/${featuredPost.slug}`}>
            <article className="mb-16 group cursor-pointer">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                  {featuredPost.cover_image ? (
                    <Image
                      src={featuredPost.cover_image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-red-600 to-orange-600" />
                  )}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full">
                    {locale === 'es' ? 'DESTACADO' : 'FEATURED'}
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4 group-hover:text-red-600 transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground text-lg mb-6 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{featuredPost.author_name}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(featuredPost.published_at)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredPost.reading_time} min
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <article className="group cursor-pointer h-full flex flex-col">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-4">
                  {post.cover_image ? (
                    <Image
                      src={post.cover_image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800" />
                  )}
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{post.author_name}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.reading_time} min
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {posts.length === 0 && !featuredPost && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              {locale === 'es' ? 'No hay artículos publicados aún' : 'No published articles yet'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
