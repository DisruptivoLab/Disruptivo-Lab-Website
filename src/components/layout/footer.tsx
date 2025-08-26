'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/theme-context';
import { useModularTranslation } from '@/contexts/modular-translation-context';
import { MinimalistLink, FrostedButton } from '@/components/ui';
import { ContactModal } from '@/components/ui/contact-modal';
import { contactConfig, generateWhatsAppLink } from '@/config/contact';

export default function Footer() {
  const { theme } = useTheme();
  const { t, loadModularTranslation, locale } = useModularTranslation();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    loadModularTranslation('common');
  }, [loadModularTranslation]);

  const year = new Date().getFullYear();
  const waLink = useMemo(() => generateWhatsAppLink(locale as any), [locale]);
  const phoneForSchema = useMemo(() => {
    const raw = (contactConfig as any)?.phone?.whatsapp || '';
    const e164Candidate = raw ? (raw.startsWith('+') ? raw : `+${raw}`) : '';
    return e164Candidate || (contactConfig as any)?.phone?.display || '';
  }, []);

  const navLinks = [
    { href: '/', label: t('navigation.home') },
    { href: '/method', label: t('navigation.method') },
    { href: '/services', label: t('navigation.services') },
    { href: '/portfolio', label: t('navigation.portfolio') },
    { href: '/about', label: t('navigation.about') },
  ];

  const legalLinks = [
    { href: '/privacy', label: t('footer.legal.privacy') },
    { href: '/terms', label: t('footer.legal.terms') },
    { href: '/cookies', label: t('footer.legal.cookies') },
  ];

  return (
    <footer className={cn(
      'mt-24 border-t',
      theme === 'dark' ? 'bg-black/90 border-white/10' : 'bg-white/90 border-black/10'
    )}>
      {/* Capa CTA superior */}
      <div className="w-[97%] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-10 sm:py-12 md:py-14">
        <div className={cn(
          'rounded-2xl p-6 sm:p-8 md:p-10',
          'backdrop-blur-[10px] backdrop-saturate-150',
          theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-black/5 border border-black/10'
        )}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                {t('footer.cta.title')}
              </h2>
              <p className="text-foreground/80 text-sm sm:text-base max-w-2xl">
                {t('footer.cta.subtitle')}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <FrostedButton
                variant="primary"
                size="md"
                onClick={() => setIsContactModalOpen(true)}
              >
                {t('footer.cta.contact')}
              </FrostedButton>
              <button
                onClick={() => setIsContactModalOpen(true)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-semibold transition-opacity underline underline-offset-4',
                  'decoration-2 hover:opacity-80',
                  'text-foreground'
                )}
                aria-label="Abrir contacto por WhatsApp"
              >
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sección principal */}
      <div className="w-[97%] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Marca */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/media/Identidad/Icono-Disruptivo-Lab.webp"
                alt="Disruptivo Lab Icon"
                width={40}
                height={40}
                className="h-8 w-auto"
              />
              <span className="font-mono font-bold text-base sm:text-lg text-foreground">Disruptivo_Lab</span>
            </Link>
            <p className="text-sm text-foreground/70 max-w-sm">
              {t('footer.brand.tagline')}
            </p>
          </div>

          {/* Sitemap */}
          <nav aria-label="Footer Navigation" className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/80">
              {t('footer.links.title')}
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <MinimalistLink href={link.href} className="text-foreground/80 hover:text-foreground">
                    {link.label}
                  </MinimalistLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/80">
              {t('footer.contact.title')}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:hola@disruptivolab.com" className="text-foreground/80 hover:text-foreground">
                  {t('footer.contact.email')}: hola@disruptivolab.com
                </a>
              </li>
              <li>
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-foreground">
                  {t('footer.contact.whatsapp')}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/80">
              {t('footer.legal.title')}
            </h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-foreground/80 hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className={cn(
        'py-6',
        theme === 'dark' ? 'border-t border-white/10' : 'border-t border-black/10'
      )}>
        <div className="w-[97%] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs sm:text-sm text-foreground/60">
            {t('footer.rights', { year })}
          </p>
          <div className="text-xs sm:text-sm text-foreground/60">
            <span>{t('footer.madeBy')}</span>
          </div>
        </div>
      </div>

      {/* Rich Snippets: SiteNavigationElement + Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              'itemListElement': navLinks.map((link, idx) => ({
                '@type': 'ListItem',
                position: idx + 1,
                item: {
                  '@type': 'SiteNavigationElement',
                  name: link.label,
                  url: `https://disruptivolab.com${link.href}`
                }
              }))
            },
            {
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Disruptivo Lab',
              url: 'https://disruptivolab.com',
              logo: 'https://disruptivolab.com/media/Identidad/iconotipo_disrptivo_Lab.png',
              sameAs: [
                'https://www.linkedin.com/company/disruptivo-lab',
                'https://x.com/disruptivolab'
              ],
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  contactType: 'customer service',
                  email: 'hola@disruptivolab.com',
                  telephone: phoneForSchema || '+0000000000',
                  availableLanguage: ['es', 'en']
                }
              ]
            }
          ])
        }}
      />

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </footer>
  );
}
