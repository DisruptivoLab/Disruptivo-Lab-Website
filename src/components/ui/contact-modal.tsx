/**
 * Contact Modal Component
 * Modal de contacto elegante con todos los métodos de comunicación
 */

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  Send,
  Copy,
  Check,
  Sparkles
} from 'lucide-react';
import { useTheme } from '@/contexts/theme-context';
import { useModularTranslation } from '@/contexts/modular-translation-context';
import { cn } from '@/lib/utils';
import { contactConfig, scheduleConfig, generateWhatsAppLink, generateEmailLink, generateTelLink } from '@/config/contact';
import { useLanguage } from '@/hooks/use-language';
import { formatWithVariables } from '@/utils/text-formatter';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { theme } = useTheme();
  const { t, loadModularTranslation } = useModularTranslation();
  const locale = useLanguage();
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  useEffect(() => {
    loadModularTranslation('components/modals/contact');
  }, [loadModularTranslation]);

  const copyToClipboard = async (text: string, item: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(item);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Error copying to clipboard:', err);
    }
  };

  const contactMethods = [
    {
      id: 'whatsapp',
      icon: MessageCircle,
      title: t('whatsapp.title'),
      subtitle: t('whatsapp.subtitle'),
      value: contactConfig.phone.display,
      action: () => window.open(generateWhatsAppLink(locale), '_blank'),
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
    },
    {
      id: 'phone',
      icon: Phone,
      title: t('phone.title'),
      subtitle: t('phone.subtitle'),
      value: contactConfig.phone.display,
      action: () => window.open(generateTelLink(), '_self'),
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      id: 'email',
      icon: Mail,
      title: t('email.title'),
      subtitle: t('email.subtitle'),
      value: contactConfig.email.primary,
      action: () => window.open(generateEmailLink(t('email.defaultSubject')), '_self'),
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
    },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        
        {/* Modal */}
        <motion.div
          className={cn(
            "relative w-full max-w-md overflow-hidden rounded-3xl",
            "backdrop-blur-xl backdrop-saturate-150 border",
            theme === 'dark' 
              ? 'bg-black/90 border-white/20' 
              : 'bg-white/90 border-black/20'
          )}
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Header */}
          <div className="relative p-6 pb-4">
            <button
              onClick={onClose}
              className={cn(
                "absolute top-4 right-4 p-2 rounded-full transition-colors",
                theme === 'dark' 
                  ? 'hover:bg-white/10 text-white' 
                  : 'hover:bg-black/10 text-black'
              )}
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-3 mb-2">
              <div className={cn(
                "p-3 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500",
                "shadow-lg shadow-orange-500/25"
              )}>
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className={cn(
                  "text-xl font-bold",
                  theme === 'dark' ? 'text-white' : 'text-black'
                )}>
                  {t('modal.title')}
                </h2>
                <p className={cn(
                  "text-sm",
                  theme === 'dark' ? 'text-white/70' : 'text-black/70'
                )}>
                  {t('modal.subtitle')}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Methods */}
          <div className="px-6 pb-4 space-y-3">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              const isCopied = copiedItem === method.id;
              
              return (
                <motion.div
                  key={method.id}
                  className={cn(
                    "p-4 rounded-2xl border transition-all duration-300 cursor-pointer group",
                    "hover:scale-[1.02] active:scale-[0.98]",
                    theme === 'dark' 
                      ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                      : 'bg-black/5 border-black/10 hover:bg-black/10'
                  )}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={method.action}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "p-3 rounded-xl bg-gradient-to-br",
                      method.color,
                      "shadow-lg group-hover:scale-110 transition-transform duration-300"
                    )}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className={cn(
                        "font-semibold text-sm",
                        theme === 'dark' ? 'text-white' : 'text-black'
                      )}>
                        {method.title}
                      </h3>
                      <p className={cn(
                        "text-xs mb-1",
                        theme === 'dark' ? 'text-white/60' : 'text-black/60'
                      )}>
                        {method.subtitle}
                      </p>
                      <p className={cn(
                        "text-sm font-mono",
                        theme === 'dark' ? 'text-white/80' : 'text-black/80'
                      )}>
                        {method.value}
                      </p>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(method.value, method.id);
                      }}
                      className={cn(
                        "p-2 rounded-lg transition-all duration-200",
                        theme === 'dark' 
                          ? 'hover:bg-white/10 text-white/60 hover:text-white' 
                          : 'hover:bg-black/10 text-black/60 hover:text-black'
                      )}
                    >
                      {isCopied ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Schedule Info */}
          <div className={cn(
            "mx-6 mb-6 p-4 rounded-2xl border",
            theme === 'dark' 
              ? 'bg-white/5 border-white/10' 
              : 'bg-black/5 border-black/10'
          )}>
            <div className="flex items-center gap-3 mb-2">
              <Clock className={cn(
                "w-5 h-5",
                theme === 'dark' ? 'text-white/70' : 'text-black/70'
              )} />
              <h3 className={cn(
                "font-semibold text-sm",
                theme === 'dark' ? 'text-white' : 'text-black'
              )}>
                {t('schedule.title')}
              </h3>
            </div>
            <div className={cn(
              "text-xs space-y-1",
              theme === 'dark' ? 'text-white/60' : 'text-black/60'
            )}>
              <p>{formatWithVariables(t('schedule.weekdays'), {
                start: scheduleConfig.timeFormat[locale](scheduleConfig.weekdayOpen),
                end: scheduleConfig.timeFormat[locale](scheduleConfig.weekdayClose)
              })}</p>
              <p>{formatWithVariables(t('schedule.saturday'), {
                start: scheduleConfig.timeFormat[locale](scheduleConfig.saturdayOpen),
                end: scheduleConfig.timeFormat[locale](scheduleConfig.saturdayClose)
              })}</p>
              <p className="font-medium">{formatWithVariables(t('schedule.timezone'), {
                offset: scheduleConfig.gmtOffset,
                city: scheduleConfig.city.translations[locale as keyof typeof scheduleConfig.city.translations] || scheduleConfig.city.current
              })}</p>
            </div>
          </div>

          {/* CTA */}
          <div className="px-6 pb-6">
            <motion.button
              onClick={() => window.open(generateWhatsAppLink(locale), '_blank')}
              className={cn(
                "w-full p-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500",
                "text-white font-semibold text-sm shadow-lg shadow-orange-500/25",
                "hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300",
                "flex items-center justify-center gap-2"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send className="w-4 h-4" />
              {t('cta.primary')}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}