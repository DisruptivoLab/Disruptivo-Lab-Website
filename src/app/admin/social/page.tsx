'use client';

import { useEffect, useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { supabase } from '@/lib/supabase';
import { Trash2, CheckCircle, Clock, XCircle, ExternalLink, Copy, Send, Download, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SocialPost {
  id: string;
  post_id: string;
  platform: string;
  content: string;
  status: 'pending' | 'published' | 'failed';
  created_at: string;
  blog_posts?: {
    slug: string;
    cover_image: string;
    blog_post_translations: Array<{ title: string; locale: string }>;
  };
}

function getTimeAgo(date: string): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffDay > 0) return `${diffDay}d`;
  if (diffHour > 0) return `${diffHour}h`;
  if (diffMin > 0) return `${diffMin}min`;
  return 'ahora';
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export default function AdminSocialPage() {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'published' | 'failed'>('all');
  const [selectedPosts, setSelectedPosts] = useState<Set<string>>(new Set());
  const [publishing, setPublishing] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchPosts();
  }, [filter]);

  async function fetchPosts() {
    setLoading(true);
    try {
      let query = supabase
        .from('blog_social_queue')
        .select(`
          *,
          blog_posts(
            slug,
            cover_image,
            blog_post_translations(title, locale)
          )
        `)
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, error } = await query;
      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching social posts:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, status: 'published' | 'failed') {
    try {
      const { error } = await supabase
        .from('blog_social_queue')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      fetchPosts();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  }

  async function deletePost(id: string) {
    if (!confirm('¿Eliminar esta publicación?')) return;

    try {
      const { error } = await supabase
        .from('blog_social_queue')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }

  async function copyContent(content: string) {
    await navigator.clipboard.writeText(content);
  }

  async function downloadImage(imageUrl: string, postTitle: string) {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${postTitle.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  }

  function openSocialPlatform(platform: string, content: string, postUrl: string) {
    const encodedContent = encodeURIComponent(content + '\n\n' + postUrl);
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedContent}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`,
      instagram: 'https://www.instagram.com/',
      reddit: `https://www.reddit.com/submit?url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(content)}`,
      whatsapp: `https://wa.me/?text=${encodedContent}`
    };
    window.open(urls[platform] || urls.twitter, '_blank');
  }

  function toggleSelect(id: string) {
    const newSelected = new Set(selectedPosts);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedPosts(newSelected);
  }

  function selectAll() {
    if (selectedPosts.size === posts.length) {
      setSelectedPosts(new Set());
    } else {
      setSelectedPosts(new Set(posts.map(p => p.id)));
    }
  }

  async function publishSelected() {
    const toPublish = Array.from(selectedPosts);
    setPublishing(new Set(toPublish));
    
    for (const id of toPublish) {
      await updateStatus(id, 'published');
    }
    
    setPublishing(new Set());
    setSelectedPosts(new Set());
  }

  const statusConfig = {
    pending: { color: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400', icon: Clock, label: 'Pendiente' },
    published: { color: 'bg-green-500/10 text-green-600 dark:text-green-400', icon: CheckCircle, label: 'Publicado' },
    failed: { color: 'bg-red-500/10 text-red-600 dark:text-red-400', icon: XCircle, label: 'Fallido' },
  };

  const platformConfig: Record<string, { color: string; icon: JSX.Element; name: string }> = {
    twitter: { 
      color: 'bg-black/10 text-black dark:bg-white/10 dark:text-white hover:bg-black/20 dark:hover:bg-white/20', 
      icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
      name: 'X'
    },
    facebook: { 
      color: 'bg-blue-600/10 text-blue-600 dark:text-blue-400 hover:bg-blue-600/20', 
      icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
      name: 'Facebook'
    },
    linkedin: { 
      color: 'bg-blue-700/10 text-blue-700 dark:text-blue-300 hover:bg-blue-700/20', 
      icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
      name: 'LinkedIn'
    },
    instagram: { 
      color: 'bg-pink-600/10 text-pink-600 dark:text-pink-400 hover:bg-pink-600/20', 
      icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
      name: 'Instagram'
    },
    reddit: { 
      color: 'bg-orange-600/10 text-orange-600 dark:text-orange-400 hover:bg-orange-600/20', 
      icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>,
      name: 'Reddit'
    },
    whatsapp: { 
      color: 'bg-green-600/10 text-green-600 dark:text-green-400 hover:bg-green-600/20', 
      icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>,
      name: 'WhatsApp'
    },
  };

  const baseUrl = 'https://disruptivo.app';

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <AdminHeader title="Cola de Redes Sociales" />

      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            {(['all', 'pending', 'published', 'failed'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  filter === status
                    ? "bg-red-600 text-white"
                    : "bg-black/5 dark:bg-white/5 text-black/70 dark:text-white/70 hover:bg-black/10 dark:hover:bg-white/10"
                )}
              >
                {status === 'all' ? 'Todos' : statusConfig[status]?.label || status}
              </button>
            ))}
          </div>
          
          {selectedPosts.size > 0 && (
            <button
              onClick={publishSelected}
              disabled={publishing.size > 0}
              className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              Publicar {selectedPosts.size} seleccionados
            </button>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12 text-black/60 dark:text-white/60">Cargando...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 text-black/60 dark:text-white/60">No hay publicaciones</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10">
                  <th className="text-left py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedPosts.size === posts.length && posts.length > 0}
                      onChange={selectAll}
                      className="w-4 h-4 rounded border-black/20 dark:border-white/20"
                    />
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-black/70 dark:text-white/70">Post</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-black/70 dark:text-white/70">Imagen</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-black/70 dark:text-white/70">Publicar en</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-black/70 dark:text-white/70">Contenido</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-black/70 dark:text-white/70">Estado</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-black/70 dark:text-white/70">Creado</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-black/70 dark:text-white/70">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => {
                  const StatusIcon = statusConfig[post.status]?.icon;
                  const postTitle = post.blog_posts?.blog_post_translations?.find(t => t.locale === 'es')?.title || 
                                   post.blog_posts?.blog_post_translations?.[0]?.title || 
                                   'Sin título';
                  const postUrl = `${baseUrl}/blog/${post.blog_posts?.slug}`;
                  const platform = platformConfig[post.platform] || { color: 'bg-gray-500/10 text-gray-600', emoji: '🌐', name: post.platform };

                  return (
                    <tr key={post.id} className="border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5">
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          checked={selectedPosts.has(post.id)}
                          onChange={() => toggleSelect(post.id)}
                          className="w-4 h-4 rounded border-black/20 dark:border-white/20"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div>
                            <p className="font-medium text-black dark:text-white text-sm">{postTitle}</p>
                            <a 
                              href={postUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                            >
                              Ver post <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {post.blog_posts?.cover_image ? (
                          <div className="flex items-center gap-2">
                            <img 
                              src={post.blog_posts.cover_image} 
                              alt={postTitle}
                              className="w-16 h-16 object-cover rounded border border-black/10 dark:border-white/10"
                            />
                            <button
                              onClick={() => downloadImage(post.blog_posts!.cover_image, postTitle)}
                              className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white"
                              title="Descargar imagen"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-black/40 dark:text-white/40">
                            <ImageIcon className="w-4 h-4" />
                            <span className="text-xs">Sin imagen</span>
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {Object.entries(platformConfig).map(([key, config]) => (
                            <button
                              key={key}
                              onClick={() => openSocialPlatform(key, post.content, postUrl)}
                              className={cn("px-2 py-1.5 rounded text-xs font-medium inline-flex items-center gap-1.5 transition-colors", config.color)}
                              title={`Publicar en ${config.name}`}
                            >
                              {config.icon}
                              <span className="hidden sm:inline">{config.name}</span>
                            </button>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 max-w-md">
                        <p className="text-sm text-black/70 dark:text-white/70 line-clamp-2">
                          {post.content}
                        </p>
                      </td>
                      <td className="py-3 px-4">
                        <span className={cn("px-2 py-1 rounded text-xs font-medium flex items-center gap-1 w-fit", statusConfig[post.status].color)}>
                          {StatusIcon && <StatusIcon className="w-3 h-3" />}
                          {statusConfig[post.status].label}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm text-black dark:text-white">{formatDate(post.created_at)}</p>
                        <p className="text-xs text-black/60 dark:text-white/60">{getTimeAgo(post.created_at)}</p>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => copyContent(post.content)}
                            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white"
                            title="Copiar contenido"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openSocialPlatform(post.platform, post.content, postUrl)}
                            className="p-2 rounded-lg hover:bg-blue-500/10 text-black/70 dark:text-white/70 hover:text-blue-600 dark:hover:text-blue-400"
                            title="Abrir en red social"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                          {post.status === 'pending' && (
                            <button
                              onClick={() => updateStatus(post.id, 'published')}
                              className="p-2 rounded-lg hover:bg-green-500/10 text-black/70 dark:text-white/70 hover:text-green-600 dark:hover:text-green-400"
                              title="Marcar como publicado"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deletePost(post.id)}
                            className="p-2 rounded-lg hover:bg-red-500/10 text-black/70 dark:text-white/70 hover:text-red-600 dark:hover:text-red-400"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
