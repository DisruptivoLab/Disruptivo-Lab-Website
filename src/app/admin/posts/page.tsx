'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { PostPreviewModal } from '@/components/admin/PostPreviewModal';
import { supabase } from '@/lib/supabase';
import { Eye, Edit, Trash2, Plus, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Post {
  id: string;
  slug: string;
  status: 'draft' | 'published' | 'archived';
  author_name: string;
  published_at: string | null;
  created_at: string;
  views_count: number;
  title: string;
  excerpt: string;
  is_featured: boolean;
}

function getTimeAgo(date: string | null): string {
  if (!date) return '-';
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  if (diffYear > 0) return `${diffYear}y`;
  if (diffMonth > 0) return `${diffMonth}m`;
  if (diffDay > 0) return `${diffDay}d`;
  if (diffHour > 0) return `${diffHour}h`;
  if (diffMin > 0) return `${diffMin}min`;
  return `${diffSec}s`;
}

export default function AdminPostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'draft' | 'published' | 'archived'>('all');
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [filter]);

  async function fetchPosts() {
    setLoading(true);
    try {
      let query = supabase
        .from('blog_posts')
        .select(`
          id,
          slug,
          status,
          author_name,
          published_at,
          created_at,
          views_count,
          is_featured,
          blog_post_translations(title, excerpt, locale)
        `)
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, error } = await query;
      if (error) throw error;

      const formattedPosts = data?.map((post: any) => {
        const esTranslation = post.blog_post_translations?.find((t: any) => t.locale === 'es');
        const enTranslation = post.blog_post_translations?.find((t: any) => t.locale === 'en');
        const translation = esTranslation || enTranslation || {};
        
        return {
          ...post,
          title: translation.title || 'Sin título',
          excerpt: translation.excerpt || '',
        };
      }) || [];

      setPosts(formattedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  }

  async function viewPost(postId: string) {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`*, blog_post_translations(*)`)
        .eq('id', postId)
        .single();

      if (error) throw error;
      setSelectedPost(data);
      setShowPreview(true);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  }

  async function publishPost(postId: string) {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ status: 'published', published_at: new Date().toISOString() })
        .eq('id', postId);

      if (error) throw error;
      setShowPreview(false);
      fetchPosts();
    } catch (error) {
      console.error('Error publishing post:', error);
    }
  }

  async function toggleFeatured(id: string, currentValue: boolean) {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ is_featured: !currentValue })
        .eq('id', id);

      if (error) throw error;
      fetchPosts();
    } catch (error) {
      console.error('Error toggling featured:', error);
    }
  }

  async function deletePost(id: string) {
    if (!confirm('¿Estás seguro de eliminar este post?')) return;

    try {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);
      if (error) throw error;
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }

  const statusColors = {
    draft: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
    published: 'bg-green-500/10 text-green-600 dark:text-green-400',
    archived: 'bg-gray-500/10 text-gray-600 dark:text-gray-400',
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <AdminHeader 
        title="Posts del Blog"
        actions={
          <button
            onClick={() => router.push('/admin/posts/new')}
            className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Nuevo Post
          </button>
        }
      />

      <PostPreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        post={selectedPost}
        onPublish={publishPost}
      />

      <div className="p-6">
        <div className="flex gap-2 mb-6">
          {(['all', 'draft', 'published', 'archived'] as const).map((status) => (
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
              {status === 'all' ? 'Todos' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12 text-black/60 dark:text-white/60">Cargando...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 text-black/60 dark:text-white/60">No hay posts</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10">
                  <th className="text-left py-3 px-4 text-sm font-medium text-black/70 dark:text-white/70">Título</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-black/70 dark:text-white/70">Estado</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-black/70 dark:text-white/70">Autor</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-black/70 dark:text-white/70">Vistas</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-black/70 dark:text-white/70">Creado</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-black/70 dark:text-white/70">Publicado</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-black/70 dark:text-white/70">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5">
                    <td className="py-3 px-4">
                      <p className="font-medium text-black dark:text-white text-sm">{post.title}</p>
                      <p className="text-xs text-black/60 dark:text-white/60 truncate max-w-md">{post.excerpt}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className={cn("px-2 py-1 rounded text-xs font-medium", statusColors[post.status])}>
                        {post.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-black/70 dark:text-white/70">{post.author_name}</td>
                    <td className="py-3 px-4 text-sm text-black/70 dark:text-white/70">{post.views_count}</td>
                    <td className="py-3 px-4 text-sm text-black/70 dark:text-white/70">{getTimeAgo(post.created_at)}</td>
                    <td className="py-3 px-4 text-sm text-black/70 dark:text-white/70">{getTimeAgo(post.published_at)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => toggleFeatured(post.id, post.is_featured)} 
                          className={cn(
                            "p-2 rounded-lg transition-colors",
                            post.is_featured
                              ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500/20"
                              : "hover:bg-black/5 dark:hover:bg-white/5 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white"
                          )}
                          title={post.is_featured ? "Quitar destacado" : "Destacar"}
                        >
                          <Star className={cn("w-4 h-4", post.is_featured && "fill-current")} />
                        </button>
                        <button onClick={() => viewPost(post.id)} className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white" title="Ver">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => router.push(`/admin/posts/${post.id}`)} className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white" title="Editar">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => deletePost(post.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-black/70 dark:text-white/70 hover:text-red-600 dark:hover:text-red-400" title="Eliminar">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
