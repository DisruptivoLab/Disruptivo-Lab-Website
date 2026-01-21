'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { X, Copy, Check, Send, ChevronDown, ChevronUp, Download, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface SocialPost {
  id: string;
  platform: string;
  content: string;
  social_title: string | null;
  first_comment: string | null;
  status: string;
}

interface SocialMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
  postTitle: string;
  postSlug: string;
  coverImage: string | null;
}

const PLATFORM_CONFIG: Record<string, { name: string; icon: string; color: string; bgColor: string }> = {
  twitter: { name: 'Twitter/X', icon: '𝕏', color: 'text-white', bgColor: 'bg-black' },
  x: { name: 'Twitter/X', icon: '𝕏', color: 'text-white', bgColor: 'bg-black' },
  linkedin: { name: 'LinkedIn', icon: 'in', color: 'text-white', bgColor: 'bg-blue-600' },
  meta: { name: 'Meta', icon: 'f', color: 'text-white', bgColor: 'bg-blue-500' },
  reddit: { name: 'Reddit', icon: 'r/', color: 'text-white', bgColor: 'bg-orange-600' },
  digg: { name: 'Digg', icon: 'D', color: 'text-white', bgColor: 'bg-gray-700' },
  video_script: { name: 'Video Script', icon: '🎬', color: 'text-white', bgColor: 'bg-purple-600' }
};

export function SocialMediaModal({ isOpen, onClose, postId, postTitle, postSlug, coverImage }: SocialMediaModalProps) {
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedPlatform, setExpandedPlatform] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [publishing, setPublishing] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && postId) {
      fetchSocialPosts();
    }
  }, [isOpen, postId]);

  async function fetchSocialPosts() {
    setLoading(true);
    const { data, error } = await supabase
      .from('blog_social_queue')
      .select('*')
      .eq('post_id', postId)
      .order('platform');

    if (!error && data) {
      setSocialPosts(data);
      if (data.length > 0) {
        setExpandedPlatform(data[0].platform);
      }
    }
    setLoading(false);
  }

  function copyToClipboard(text: string, id: string) {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  function downloadImage() {
    if (!coverImage) return;
    const link = document.createElement('a');
    link.href = coverImage;
    link.download = `${postTitle.toLowerCase().replace(/\s+/g, '-')}.jpg`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function generateShortlink(): string {
    return `https://disruptivo.app/blog/${postSlug}`;
  }

  async function publishToPlatform(social: SocialPost) {
    setPublishing(social.id);
    
    try {
      // Limpiar markdown para Reddit (usa editor visual)
      let contentToCopy = social.content;
      if (social.platform === 'reddit') {
        contentToCopy = social.content
          .replace(/\*\*(.+?)\*\*/g, '$1') // Quitar negritas **texto**
          .replace(/\*(.+?)\*/g, '$1')     // Quitar cursivas *texto*
          .replace(/#{1,6}\s/g, '')        // Quitar headers #
          .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Quitar links [texto](url)
          .replace(/`(.+?)`/g, '$1')       // Quitar code `texto`
          .replace(/^[-*+]\s/gm, '• ')     // Convertir listas a bullets
          .replace(/^\d+\.\s/gm, '')       // Quitar numeración
          .trim();
      }
      
      // 1. Copiar contenido al portapapeles
      await navigator.clipboard.writeText(contentToCopy);
      
      // 2. Generar URL de la plataforma
      const platformUrls: Record<string, string> = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(social.content)}`,
        x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(social.content)}`,
        linkedin: 'https://www.linkedin.com/feed/',
        meta: 'https://www.facebook.com/',
        reddit: 'https://www.reddit.com/submit',
        digg: 'https://digg.com/submit',
        video_script: '' // No tiene URL, solo copia
      };

      const url = platformUrls[social.platform];
      
      // 3. Abrir plataforma en nueva pestaña (excepto video_script)
      if (url) {
        window.open(url, '_blank');
      }

      // 4. Actualizar estado en BD
      const { error } = await supabase
        .from('blog_social_queue')
        .update({ status: 'published' })
        .eq('id', social.id);

      if (error) throw error;

      // 5. Actualizar estado local
      setSocialPosts(prev => 
        prev.map(p => p.id === social.id ? { ...p, status: 'published' } : p)
      );

      // 6. Mostrar mensaje de éxito
      const platformName = PLATFORM_CONFIG[social.platform]?.name || social.platform;
      const message = social.platform === 'reddit'
        ? `✓ Contenido limpio (sin markdown) copiado y ${platformName} abierto.\n\nPega el contenido (Ctrl+V) en el editor visual y publica.`
        : `✓ Contenido copiado y ${platformName} abierto.\n\nPega el contenido (Ctrl+V) y publica.`;
      alert(message);
    } catch (error) {
      console.error('Error publishing:', error);
      alert('Error al procesar. Intenta de nuevo.');
    } finally {
      setPublishing(null);
    }
  }

  if (!isOpen) return null;

  const shortlink = generateShortlink();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-black rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-border">
          <div className="flex-1 pr-4">
            <h2 className="text-2xl font-bold text-foreground mb-2">Social Media Manager</h2>
            <p className="text-sm text-muted-foreground line-clamp-2">{postTitle}</p>
            <div className="flex flex-wrap items-center gap-3 mt-3 text-sm">
              <Link
                href={`/blog/${postSlug}`}
                target="_blank"
                className="flex items-center gap-1 text-red-600 hover:underline"
              >
                <ExternalLink className="w-4 h-4" />
                Ver artículo
              </Link>
              <button
                onClick={() => copyToClipboard(shortlink, 'shortlink')}
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                {copiedId === 'shortlink' ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {shortlink}
              </button>
              {coverImage && (
                <button
                  onClick={downloadImage}
                  className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Descargar imagen
                </button>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Cargando contenido social...</p>
            </div>
          ) : socialPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No hay contenido social para este post</p>
            </div>
          ) : (
            <div className="space-y-3">
              {socialPosts.map((social) => {
                const config = PLATFORM_CONFIG[social.platform];
                const isExpanded = expandedPlatform === social.platform;

                return (
                  <div
                    key={social.id}
                    className="border border-border rounded-xl overflow-hidden"
                  >
                    {/* Accordion Header */}
                    <button
                      onClick={() => setExpandedPlatform(isExpanded ? null : social.platform)}
                      className="w-full flex items-center justify-between p-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-10 h-10 rounded-lg ${config?.bgColor} ${config?.color} flex items-center justify-center text-lg font-bold`}>
                          {config?.icon}
                        </span>
                        <div className="text-left">
                          <p className="font-semibold text-foreground">{config?.name || social.platform}</p>
                          <p className="text-xs text-muted-foreground">
                            {social.status === 'published' ? '✓ Publicado' : 'Pendiente'}
                          </p>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </button>

                    {/* Accordion Content */}
                    {isExpanded && (
                      <div className="p-4 border-t border-border bg-gray-50 dark:bg-gray-900 space-y-4">
                        {social.social_title && (
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-2">Título:</p>
                            <p className="text-sm text-foreground font-medium">{social.social_title}</p>
                          </div>
                        )}

                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-2">Contenido:</p>
                          <p className="text-sm text-foreground whitespace-pre-wrap">{social.content}</p>
                        </div>

                        {social.first_comment && (
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-2">Primer comentario:</p>
                            <p className="text-sm text-foreground whitespace-pre-wrap">{social.first_comment}</p>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={() => copyToClipboard(social.content, social.id)}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-foreground"
                          >
                            {copiedId === social.id ? (
                              <>
                                <Check className="w-4 h-4 text-green-500" />
                                <span className="text-sm font-medium">Copiado</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4" />
                                <span className="text-sm font-medium">Copiar</span>
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => publishToPlatform(social)}
                            disabled={social.status === 'published' || publishing === social.id}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {publishing === social.id ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span className="text-sm font-medium">Publicando...</span>
                              </>
                            ) : social.status === 'published' ? (
                              <>
                                <Check className="w-4 h-4" />
                                <span className="text-sm font-medium">Publicado</span>
                              </>
                            ) : (
                              <>
                                <Send className="w-4 h-4" />
                                <span className="text-sm font-medium">Publicar</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
