'use client';

import { useEffect, useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { supabase } from '@/lib/supabase';
import { Tag } from 'lucide-react';

interface Category {
  id: string;
  slug: string;
  created_at: string;
  category_translations: Array<{
    name: string;
    description: string;
    locale: string;
  }>;
  _count?: {
    posts: number;
  };
}

function getTimeAgo(date: string): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffDay = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  if (diffYear > 0) return `${diffYear}y`;
  if (diffMonth > 0) return `${diffMonth}m`;
  if (diffDay > 0) return `${diffDay}d`;
  return 'hoy';
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_categories')
        .select(`
          id,
          slug,
          created_at,
          category_translations(name, description, locale)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Contar posts por categoría
      const categoriesWithCount = await Promise.all(
        (data || []).map(async (cat) => {
          const { count } = await supabase
            .from('blog_post_categories')
            .select('*', { count: 'exact', head: true })
            .eq('category_id', cat.id);

          return {
            ...cat,
            _count: { posts: count || 0 }
          };
        })
      );

      setCategories(categoriesWithCount);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <AdminHeader title="Categorías del Blog" />

      <div className="p-6">
        {loading ? (
          <div className="text-center py-12 text-black/60 dark:text-white/60">Cargando...</div>
        ) : categories.length === 0 ? (
          <div className="text-center py-12 text-black/60 dark:text-white/60">No hay categorías</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10">
                  <th className="text-left py-3 px-4 text-sm font-medium text-black/70 dark:text-white/70">Categoría</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-black/70 dark:text-white/70">Slug</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-black/70 dark:text-white/70">Descripción</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-black/70 dark:text-white/70">Posts</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-black/70 dark:text-white/70">Creado</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => {
                  const esTranslation = category.category_translations?.find(t => t.locale === 'es');
                  const enTranslation = category.category_translations?.find(t => t.locale === 'en');
                  const translation = esTranslation || enTranslation || { name: '', description: '' };

                  return (
                    <tr key={category.id} className="border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-red-600" />
                          <span className="font-medium text-black dark:text-white text-sm">
                            {translation.name || 'Sin nombre'}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <code className="text-xs bg-black/5 dark:bg-white/5 px-2 py-1 rounded text-black/70 dark:text-white/70">
                          {category.slug}
                        </code>
                      </td>
                      <td className="py-3 px-4 max-w-md">
                        <p className="text-sm text-black/70 dark:text-white/70 line-clamp-2">
                          {translation.description || '-'}
                        </p>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-medium text-black dark:text-white">
                          {category._count?.posts || 0}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-black/70 dark:text-white/70">
                        {getTimeAgo(category.created_at)}
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
