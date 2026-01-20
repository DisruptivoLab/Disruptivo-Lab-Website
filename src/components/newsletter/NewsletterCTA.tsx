'use client';

import { useState, useEffect } from 'react';
import { useModularTranslation } from '@/contexts/modular-translation-context';
import { supabase } from '@/lib/supabase';
import { Mail, Sparkles, Check, Loader2 } from 'lucide-react';

interface NewsletterCTAProps {
  source?: string;
  articleSlug?: string;
  category?: string;
}

export function NewsletterCTA({ source = 'blog-post', articleSlug, category }: NewsletterCTAProps) {
  const { locale, t, get, loadModularTranslation } = useModularTranslation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [subscriberCount, setSubscriberCount] = useState(1247);
  const [benefits, setBenefits] = useState<string[]>([]);

  useEffect(() => {
    loadModularTranslation('newsletter');
    fetchSubscriberCount();
  }, [loadModularTranslation]);

  useEffect(() => {
    const benefitsData = get('newsletter.benefits');
    if (Array.isArray(benefitsData)) {
      setBenefits(benefitsData);
    }
  }, [locale, get]);

  async function fetchSubscriberCount() {
    const { data, error } = await supabase.rpc('get_active_subscribers_count');
    if (!error && data) {
      setSubscriberCount(data);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMessage(t('newsletter.error_invalid'));
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .insert({
          email: email.toLowerCase().trim(),
          locale,
          source,
          metadata: {
            article_slug: articleSlug,
            category,
            subscribed_from: window.location.href
          }
        });

      if (error) {
        if (error.code === '23505') {
          setStatus('error');
          setErrorMessage(t('newsletter.error_exists'));
        } else {
          throw error;
        }
      } else {
        setStatus('success');
        setEmail('');
        setSubscriberCount(prev => prev + 1);
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setStatus('error');
      setErrorMessage(t('newsletter.error_generic'));
    }
  }

  if (status === 'success') {
    return (
      <div className="relative overflow-hidden bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl p-8 text-white">
        <div className="absolute inset-0 bg-[url('/media/patterns/grid.svg')] opacity-10" />
        <div className="relative text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 animate-bounce">
            <Check className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold mb-2">{t('newsletter.success_title')}</h3>
          <p className="text-white/90">{t('newsletter.success_message')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 border border-border">
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full blur-3xl" />
      <div className="relative">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              {t('newsletter.title')}
            </h3>
            <p className="text-muted-foreground">
              {t('newsletter.subtitle').replace('{count}', subscriberCount.toLocaleString())}
            </p>
          </div>
        </div>

        <ul className="space-y-3 mb-6">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-center gap-3 text-foreground">
              <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('newsletter.placeholder')}
                disabled={status === 'loading'}
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-black border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{locale === 'es' ? 'Enviando...' : 'Sending...'}</span>
                </>
              ) : (
                t('newsletter.cta')
              )}
            </button>
          </div>

          {status === 'error' && (
            <p className="text-red-600 text-sm">{errorMessage}</p>
          )}

          <p className="text-xs text-muted-foreground flex items-center gap-2">
            <span className="text-green-500">🔒</span>
            {t('newsletter.privacy')}
          </p>
        </form>
      </div>
    </div>
  );
}
