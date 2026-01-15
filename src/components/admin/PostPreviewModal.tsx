'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PostPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: any;
  onPublish?: (postId: string) => void;
}

export function PostPreviewModal({ isOpen, onClose, post, onPublish }: PostPreviewModalProps) {
  const [activeTab, setActiveTab] = useState<'es' | 'en'>('es');

  if (!isOpen || !post) return null;

  const esTranslation = post.blog_post_translations?.find((t: any) => t.locale === 'es');
  const enTranslation = post.blog_post_translations?.find((t: any) => t.locale === 'en');
  const currentTranslation = activeTab === 'es' ? esTranslation : enTranslation;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div
          className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-white dark:bg-black border border-black/10 dark:border-white/10"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-black/10 dark:border-white/10">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-black dark:text-white">Preview Post</h2>
              {post.status === 'draft' && onPublish && (
                <button
                  onClick={() => onPublish(post.id)}
                  className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Publicar
                </button>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-black dark:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 p-4 border-b border-black/10 dark:border-white/10">
            <button
              onClick={() => setActiveTab('es')}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2",
                activeTab === 'es'
                  ? "bg-red-600 text-white"
                  : "bg-black/5 dark:bg-white/5 text-black/70 dark:text-white/70 hover:bg-black/10 dark:hover:bg-white/10"
              )}
            >
              <Globe className="w-4 h-4" />
              Español
            </button>
            <button
              onClick={() => setActiveTab('en')}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2",
                activeTab === 'en'
                  ? "bg-red-600 text-white"
                  : "bg-black/5 dark:bg-white/5 text-black/70 dark:text-white/70 hover:bg-black/10 dark:hover:bg-white/10"
              )}
            >
              <Globe className="w-4 h-4" />
              English
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6 space-y-6">
            {/* Cover Image */}
            {post.cover_image && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-black dark:text-white">Imagen de portada</h3>
                <div className="w-full aspect-video rounded-lg overflow-hidden bg-black/5 dark:bg-white/5">
                  <img 
                    src={post.cover_image} 
                    alt={currentTranslation?.title || 'Post cover'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            )}

            {/* SEO Preview */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-black dark:text-white">SEO Preview (Google)</h3>
              <div className="p-4 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                <div className="text-xs text-black/60 dark:text-white/60 mb-1">
                  disruptivolab.com › blog › {post.slug}
                </div>
                <div className="text-lg text-blue-600 dark:text-blue-400 font-medium mb-1">
                  {currentTranslation?.meta_title || currentTranslation?.title || 'Sin título'}
                </div>
                <div className="text-sm text-black/70 dark:text-white/70">
                  {currentTranslation?.meta_description || currentTranslation?.excerpt || 'Sin descripción'}
                </div>
              </div>
            </div>

            {/* Post Content */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-black dark:text-white">Contenido</h3>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <h1 className="text-2xl font-bold text-black dark:text-white mb-2">
                  {currentTranslation?.title || 'Sin título'}
                </h1>
                <p className="text-black/70 dark:text-white/70 mb-4">
                  {currentTranslation?.excerpt || ''}
                </p>
                <div 
                  className="text-black dark:text-white space-y-4
                    [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3
                    [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mt-5 [&_h3]:mb-2
                    [&_p]:leading-relaxed [&_p]:mb-4
                    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-2
                    [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:space-y-2
                    [&_li]:leading-relaxed
                    [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:bg-black/10 [&_code]:dark:bg-white/10 [&_code]:text-sm [&_code]:font-mono
                    [&_strong]:font-bold [&_strong]:text-black [&_strong]:dark:text-white"
                  dangerouslySetInnerHTML={{ __html: currentTranslation?.content || '<p>Sin contenido</p>' }}
                />
              </div>
            </div>

            {/* Meta Info */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black/10 dark:border-white/10">
              <div>
                <p className="text-xs text-black/60 dark:text-white/60">Autor</p>
                <p className="text-sm font-medium text-black dark:text-white">{post.author_name}</p>
              </div>
              <div>
                <p className="text-xs text-black/60 dark:text-white/60">Estado</p>
                <p className="text-sm font-medium text-black dark:text-white">{post.status}</p>
              </div>
              <div>
                <p className="text-xs text-black/60 dark:text-white/60">Vistas</p>
                <p className="text-sm font-medium text-black dark:text-white">{post.views_count || 0}</p>
              </div>
              <div>
                <p className="text-xs text-black/60 dark:text-white/60">Fecha</p>
                <p className="text-sm font-medium text-black dark:text-white">
                  {new Date(post.created_at).toLocaleDateString('es')}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
