/**
 * Page CTA Component
 * Componente de llamada a la acción para páginas internas
 */

'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { SimpleFrostedButton } from '@/components/ui/simple-frosted-button';
import { ScalableContainer, Title, BodyText } from '@/components/ui/typography';
import { useModularTranslation } from '@/contexts/modular-translation-context';
import { Mail, MessageCircle, Calendar, ArrowRight } from 'lucide-react';
import { generateWhatsAppLink, generateEmailLink } from '@/config/contact';
import { ContactModal } from '@/components/ui/contact-modal';

interface PageCTAProps {
  title?: string;
  description?: string;
  primaryAction?: {
    text: string;
    href: string;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    text: string;
    href: string;
    icon?: React.ReactNode;
  };
  variant?: 'default' | 'minimal' | 'centered';
  className?: string;
}

export function PageCTA({
  title,
  description,
  primaryAction,
  secondaryAction,
  variant = 'default',
  className
}: PageCTAProps) {
  const { t, loadModularTranslation } = useModularTranslation();
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Cargar las traducciones del componente
  useEffect(() => {
    loadModularTranslation('components/ui/page-cta');
  }, [loadModularTranslation]);

  // Valores por defecto
  const defaultTitle = title || t('default.title');
  const defaultDescription = description || t('default.description');
  const defaultPrimaryAction = primaryAction || {
    text: t('default.contact'),
    href: generateEmailLink(t('default.title'), t('default.description')),
    icon: <Mail className="w-4 h-4" />
  };
  const defaultSecondaryAction = secondaryAction || {
    text: t('default.whatsapp'),
    href: generateWhatsAppLink(),
    icon: <MessageCircle className="w-4 h-4" />
  };

  // Detectar si el consumidor pasó acciones personalizadas.
  // Si NO pasó acciones, usamos el ContactModal por defecto.
  const hasCustomActions = Boolean(primaryAction || secondaryAction);

  if (variant === 'minimal') {
    return (
      <div className={cn(
        "flex flex-col sm:flex-row gap-4 justify-center items-center",
        className
      )}>
        <SimpleFrostedButton
          variant="primary"
          size="lg"
          onClick={() => {
            if (hasCustomActions) {
              window.open(defaultPrimaryAction.href, '_blank');
            } else {
              setIsContactOpen(true);
            }
          }}
          className="w-full sm:w-auto"
        >
          {defaultPrimaryAction.icon}
          {defaultPrimaryAction.text}
        </SimpleFrostedButton>
        
        {defaultSecondaryAction && (
          <SimpleFrostedButton
            variant="secondary"
            size="lg"
            onClick={() => {
              if (hasCustomActions) {
                window.open(defaultSecondaryAction.href, '_blank');
              } else {
                setIsContactOpen(true);
              }
            }}
            className="w-full sm:w-auto"
          >
            {defaultSecondaryAction.icon}
            {defaultSecondaryAction.text}
          </SimpleFrostedButton>
        )}

        {/* Modal de contacto */}
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      </div>
    );
  }

  if (variant === 'centered') {
    return (
      <ScalableContainer 
        spacing="xl" 
        gap="lg"
        className={cn("text-center", className)}
      >
        <div className="space-y-4">
          <Title className="text-foreground">
            {defaultTitle}
          </Title>
          <BodyText className="text-muted-foreground max-w-2xl mx-auto">
            {defaultDescription}
          </BodyText>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <SimpleFrostedButton
            variant="primary"
            size="lg"
            onClick={() => {
              if (hasCustomActions) {
                window.open(defaultPrimaryAction.href, '_blank');
              } else {
                setIsContactOpen(true);
              }
            }}
            className="w-full sm:w-auto"
          >
            {defaultPrimaryAction.icon}
            {defaultPrimaryAction.text}
            <ArrowRight className="w-4 h-4 ml-2" />
          </SimpleFrostedButton>
          
          {defaultSecondaryAction && (
            <SimpleFrostedButton
              variant="secondary"
              size="lg"
              onClick={() => {
                if (hasCustomActions) {
                  window.open(defaultSecondaryAction.href, '_blank');
                } else {
                  setIsContactOpen(true);
                }
              }}
              className="w-full sm:w-auto"
            >
              {defaultSecondaryAction.icon}
              {defaultSecondaryAction.text}
            </SimpleFrostedButton>
          )}
          {/* Modal de contacto */}
          <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </div>
      </ScalableContainer>
    );
  }

  // Variant 'default'
  return (
    <ScalableContainer 
      spacing="lg" 
      gap="md"
      className={cn(
        "bg-gradient-to-br from-muted/50 to-muted/30 rounded-2xl border border-border/50 p-8",
        className
      )}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-3">
          <Title className="text-foreground">
            {defaultTitle}
          </Title>
          <BodyText className="text-muted-foreground max-w-xl">
            {defaultDescription}
          </BodyText>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
          <SimpleFrostedButton
            variant="primary"
            size="lg"
            onClick={() => {
              if (hasCustomActions) {
                window.open(defaultPrimaryAction.href, '_blank');
              } else {
                setIsContactOpen(true);
              }
            }}
            className="w-full sm:w-auto"
          >
            {defaultPrimaryAction.icon}
            {defaultPrimaryAction.text}
          </SimpleFrostedButton>
          
          {defaultSecondaryAction && (
            <SimpleFrostedButton
              variant="secondary"
              size="lg"
              onClick={() => {
                if (hasCustomActions) {
                  window.open(defaultSecondaryAction.href, '_blank');
                } else {
                  setIsContactOpen(true);
                }
              }}
              className="w-full sm:w-auto"
            >
              {defaultSecondaryAction.icon}
              {defaultSecondaryAction.text}
            </SimpleFrostedButton>
          )}
        </div>
      </div>
    </ScalableContainer>
  );
}

// Componente específico para CTA de contacto rápido
export function QuickContactCTA({ className }: { className?: string }) {
  const { t, loadModularTranslation } = useModularTranslation();

  useEffect(() => {
    loadModularTranslation('components/ui/page-cta');
  }, [loadModularTranslation]);
  
  return (
    <PageCTA
      variant="minimal"
      primaryAction={{
        text: t('default.schedule'),
        href: 'https://calendly.com/disruptivo-lab',
        icon: <Calendar className="w-4 h-4" />
      }}
      secondaryAction={{
        text: t('default.whatsapp'),
        href: generateWhatsAppLink(),
        icon: <MessageCircle className="w-4 h-4" />
      }}
      className={className}
    />
  );
}