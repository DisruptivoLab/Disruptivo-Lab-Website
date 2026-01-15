'use client';

import { useEffect, useState } from 'react';
import { useModularTranslation } from '@/contexts/modular-translation-context';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
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

const POSTS_PER_PAGE = 9;

export default function BlogPage() {
  const { locale } = useModularTranslation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [currentFeatured, setCurrentFeatured] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    fetchPosts(true);
  }, [locale]);

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

  function nextFeatured() {
    setCurrentFeatured((prev) => (prev + 1) % featuredPosts.length);
  }

  function prevFeatured() {
    setCurrentFeatured((prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length);
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  if (loading) return <SectionLoading />;

  const currentFeaturedPost = featuredPosts[currentFeatured];

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

        {/* Featured Posts Carousel */}
        {featuredPosts.length > 0 && currentFeaturedPost && (
          <div className="mb-16 relative">
            <Link href={`/blog/${currentFeaturedPost.slug}`}>
              <article className="group cursor-pointer">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                    {currentFeaturedPost.cover_image ? (
                      <Image
                        src={currentFeaturedPost.cover_image}
                        alt={currentFeaturedPost.title}
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
                      {currentFeaturedPost.title}
                    </h2>
                    <p className="text-muted-foreground text-lg mb-6 line-clamp-3">
                      {currentFeaturedPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{currentFeaturedPost.author_name}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(currentFeaturedPost.published_at)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {currentFeaturedPost.reading_time} min
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>

            {/* Carousel Controls */}
            {featuredPosts.length > 1 && (
              <>
                <button
                  onClick={prevFeatured}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-white dark:bg-black border border-border shadow-lg flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextFeatured}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-white dark:bg-black border border-border shadow-lg flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                <div className="flex justify-center gap-2 mt-6">
                  {featuredPosts.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentFeatured(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentFeatured ? 'bg-red-600 w-8' : 'bg-muted-foreground/30'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Posts Grid */}
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

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-12 text-center">
            <button
              onClick={loadMore}
              disabled={loadingMore}
              className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingMore 
                ? (locale === 'es' ? 'Cargando...' : 'Loading...') 
                : (locale === 'es' ? 'Cargar más artículos' : 'Load more articles')}
            </button>
          </div>
        )}

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
