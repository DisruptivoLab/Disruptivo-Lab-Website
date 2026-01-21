'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Copy, Check, Download, ExternalLink, Search, Filter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface SocialPost {
  id: string;
  post_id: string;
  platform: string;
  content: string;
  social_title: string | null;
  first_comment: string | null;
  status: string;
  created_at: string;
  blog_posts: {
    slug: string;
    cover_image: string;
    blog_post_translations: Array<{
      title: string;
      locale: string;
    }>;
  };
}

const PLATFORM_ICONS: Record<string, string> = {
  twitter: '𝕏',
  x: '𝕏',
  linkedin: 'in',
  meta: 'f',
  reddit: 'r/',
  digg: 'D',
  video_script: '🎬'
};

const PLATFORM_COLORS: Record<string, string> = {
  twitter: 'bg-black text-white',
  x: 'bg-black text-white',
  linkedin: 'bg-blue-600 text-white',
  meta: 'bg-blue-500 text-white',
  reddit: 'bg-orange-600 text-white',
  digg: 'bg-gray-700 text-white',
  video_script: 'bg-purple-600 text-white'
};

export default function SocialMediaAdminPage() {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetchSocialPosts();
  }, []);

  async function fetchSocialPosts() {
    setLoading(true);
    const { data, error } = await supabase
      .from('blog_social_queue')
      .select(`
        *,
        blog_posts!inner(
          slug,
          cover_image,
          blog_post_translations!inner(
            title,
            locale
          )
        )
      `)
      .eq('blog_posts.blog_post_translations.locale', 'es')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPosts(data as any);
    }
    setLoading(false);
  }

  function copyToClipboard(text: string, id: string) {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  function downloadImage(imageUrl: string, postTitle: string) {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${postTitle.toLowerCase().replace(/\s+/g, '-')}.jpg`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function generateShortlink(slug: string): string {
    return `https://disruptivo.app/b/${slug.split('-').slice(0, 3).join('-')}`;
  }

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.blog_posts.blog_post_translations[0]?.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) || 
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPlatform = platformFilter === 'all' || post.platform === platformFilter;
    
    return matchesSearch && matchesPlatform;
  });

  const groupedPosts = filteredPosts.reduce((acc, post) => {
    const postId = post.post_id;
    if (!acc[postId]) {
      acc[postId] = [];
    }
    acc[postId].push(post);
    return acc;
  }, {} as Record<string, SocialPost[]>);

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-16 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Cargando contenido social...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-16 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Social Media Manager</h1>
          <p className="text-muted-foreground">Gestiona el contenido social de tus artículos</p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por título o contenido..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-black border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="pl-12 pr-8 py-3 bg-white dark:bg-black border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 appearance-none cursor-pointer"
            >
              <option value="all">Todas las plataformas</option>
              <option value="twitter">Twitter/X</option>
              <option value="linkedin">LinkedIn</option>
              <option value="meta">Meta</option>
              <option value="reddit">Reddit</option>
              <option value="digg">Digg</option>
              <option value="video_script">Video Script</option>
            </select>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="space-y-8">
          {Object.entries(groupedPosts).map(([postId, socialPosts]) => {
            const firstPost = socialPosts[0];
            const postTitle = firstPost.blog_posts.blog_post_translations[0]?.title || 'Sin título';
            const postSlug = firstPost.blog_posts.slug;
            const coverImage = firstPost.blog_posts.cover_image;
            const shortlink = generateShortlink(postSlug);

            return (
              <div key={postId} className="bg-white dark:bg-black border border-border rounded-2xl overflow-hidden">
                {/* Post Header */}
                <div className="p-6 border-b border-border">
                  <div className="flex items-start gap-4">
                    {coverImage && (
                      <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                        <Image
                          src={coverImage}
                          alt={postTitle}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl font-bold text-foreground mb-2 line-clamp-2">
                        {postTitle}
                      </h2>
                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        <Link
                          href={`/blog/${postSlug}`}
                          target="_blank"
                          className="flex items-center gap-1 text-red-600 hover:underline"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Ver artículo
                        </Link>
                        <button
                          onClick={() => copyToClipboard(shortlink, `shortlink-${postId}`)}
                          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {copiedId === `shortlink-${postId}` ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                          {shortlink}
                        </button>
                        {coverImage && (
                          <button
                            onClick={() => downloadImage(coverImage, postTitle)}
                            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Download className="w-4 h-4" />
                            Descargar imagen
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Content */}
                <div className="p-6 space-y-4">
                  {socialPosts.map((social) => (
                    <div
                      key={social.id}
                      className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-border"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`w-8 h-8 rounded-lg ${PLATFORM_COLORS[social.platform]} flex items-center justify-center text-sm font-bold`}>
                            {PLATFORM_ICONS[social.platform]}
                          </span>
                          <span className="font-semibold text-foreground capitalize">
                            {social.platform === 'x' ? 'Twitter/X' : social.platform.replace('_', ' ')}
                          </span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(social.content, social.id)}
                          className="flex items-center gap-2 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors"
                        >
                          {copiedId === social.id ? (
                            <>
                              <Check className="w-4 h-4" />
                              Copiado
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              Copiar
                            </>
                          )}
                        </button>
                      </div>

                      <div className="space-y-3">
                        {social.social_title && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Título:</p>
                            <p className="text-sm text-foreground font-medium">{social.social_title}</p>
                          </div>
                        )}
                        
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Contenido:</p>
                          <p className="text-sm text-foreground whitespace-pre-wrap">{social.content}</p>
                        </div>

                        {social.first_comment && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Primer comentario:</p>
                            <p className="text-sm text-foreground whitespace-pre-wrap">{social.first_comment}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No se encontraron posts con contenido social</p>
          </div>
        )}
      </div>
    </div>
  );
}
