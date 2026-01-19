'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { getTimeAgo } from '@/lib/time-utils';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover_image: string | null;
  author_name: string;
  published_at: string;
  reading_time: number;
}

interface CategoryCarouselProps {
  categoryName: string;
  posts: BlogPost[];
  locale: 'es' | 'en';
}

export function CategoryCarousel({ categoryName, posts, locale }: CategoryCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scrollCarousel(direction: 'left' | 'right') {
    if (scrollRef.current) {
      const scrollAmount = 420;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  }

  if (posts.length === 0) return null;

  return (
    <div className="mb-16 w-full">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-heading font-bold text-foreground">
            {categoryName}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => scrollCarousel('left')}
              className="w-10 h-10 rounded-full bg-white dark:bg-black border border-border shadow-sm flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors"
              aria-label={`Scroll ${categoryName} left`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              className="w-10 h-10 rounded-full bg-white dark:bg-black border border-border shadow-sm flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors"
              aria-label={`Scroll ${categoryName} right`}
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
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <article className="flex-shrink-0 w-[340px] md:w-[400px] group/card cursor-pointer snap-start">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-4">
                  {post.cover_image ? (
                    <Image
                      src={post.cover_image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover/card:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 340px, 400px"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
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
  );
}
