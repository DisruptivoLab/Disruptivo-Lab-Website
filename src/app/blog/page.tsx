'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useModularTranslation } from '@/contexts/modular-translation-context';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionLoading } from '@/components/ui/global-loading';
import { getTimeAgo } from '@/lib/time-utils';

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

const POSTS_PER_PAGE = 9;

export default function BlogPage() {
  const { locale } = useModularTranslation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchPosts(true);
  }, [locale]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loadingMore, loading]);

  async function fetchPosts(reset = false) {
    if (reset) {
      setLoading(true);
      setPage(1);
    } else {
      setLoadingMore(true);
    }

    try {
      const currentPage = reset ? 1 : page;
      const from = (currentPage - 1) * POSTS_PER_PAGE;
      const to = from + POSTS_PER_PAGE - 1;

      // Fetch featured posts
      const { data: featuredData } = await supabase
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
        .eq('is_featured', true)
        .eq('blog_post_translations.locale', locale)
        .order('published_at', { ascending: false });

      // Fetch regular posts
      const { data: regularData, error } = await supabase
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
        .eq('is_featured', false)
        .eq('blog_post_translations.locale', locale)
        .order('published_at', { ascending: false })
        .range(from, to);

      if (error) throw error;

      const formatPosts = (data: any[]) => data?.map((post: any) => ({
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

      if (reset) {
        setFeaturedPosts(formatPosts(featuredData || []));
        setPosts(formatPosts(regularData || []));
      } else {
        setPosts(prev => [...prev, ...formatPosts(regularData || [])]);
      }

      setHasMore((regularData?.length || 0) === POSTS_PER_PAGE);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  function loadMore() {
    setPage(prev => prev + 1);
    fetchPosts(false);
  }

  function scrollCarousel(direction: 'left' | 'right') {
    if (scrollRef.current) {
      const scrollAmount = 420;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
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
    <div className="min-h-screen pt-28 pb-16">
      {/* Header con container */}
      <div className="container mx-auto max-w-7xl px-4">
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
      </div>

      {/* Featured Posts Carousel - Full Width */}
      {featuredPosts.length > 0 && (
        <div className="mb-16 w-full">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                {locale === 'es' ? 'Destacados' : 'Featured'}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => scrollCarousel('left')}
                  className="w-10 h-10 rounded-full bg-white dark:bg-black border border-border shadow-sm flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollCarousel('right')}
                  className="w-10 h-10 rounded-full bg-white dark:bg-black border border-border shadow-sm flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          <div className="relative group px-4">
            <div 
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {featuredPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <article className="flex-shrink-0 w-[340px] md:w-[400px] group/card cursor-pointer snap-start">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-4">
                      {post.cover_image ? (
                        <Image
                          src={post.cover_image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover/card:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-red-600 to-orange-600" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4 px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full">
                        {locale === 'es' ? 'DESTACADO' : 'FEATURED'}
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-heading font-bold text-xl mb-2 line-clamp-2">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-2 text-white/80 text-xs">
                          <span className="font-medium">{post.author_name}</span>
                          <span>•</span>
                          <span>{getTimeAgo(post.published_at, locale)}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.reading_time} min
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Posts Grid con container */}
      <div className="container mx-auto max-w-7xl px-4">
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
                  <span>{getTimeAgo(post.published_at, locale)}</span>
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

        {/* Infinite Scroll Observer */}
        <div ref={observerRef} className="h-20 flex items-center justify-center">
          {loadingMore && (
            <div className="text-muted-foreground text-sm">
              {locale === 'es' ? 'Cargando más artículos...' : 'Loading more articles...'}
            </div>
          )}
        </div>

        {/* Empty State */}
        {posts.length === 0 && featuredPosts.length === 0 && (
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
