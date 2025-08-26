"use client";

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/theme-context';

type Props = {
  title: string;
  subtitle?: string;
  colors?: [string, string];
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  className?: string;
  themeClassName?: string; // ej: service-theme-whatsapp-ia
};

// Hero con gradiente: arriba color de marca, desvaneciendo a blanco (light) o negro (dark)
export function ServiceHero({ title, subtitle, Icon, className, themeClassName }: Props) {
  const { theme } = useTheme();

  return (
    <section
      className={cn(
        'relative min-h-[62svh] px-6 pt-28 pb-16 mb-10 overflow-hidden service-hero-gradient',
        // aplica tema por slug si viene (pone --hero-c1/--hero-c2 por clase)
        themeClassName,
        className
      )}
    >
      {/* El gradiente ya está aplicado en el section */}

  {/* Overlay solo en claro; en oscuro lo dejamos transparente para coincidir con #000 */}
  <div className={cn('absolute inset-0 -z-10', theme === 'dark' ? 'bg-transparent' : 'bg-white/10')} />

      <div className="max-w-4xl mx-auto text-center">
        {Icon ? (
          <div className="mb-4 inline-flex items-center justify-center">
            <div className="h-14 w-14 rounded-2xl backdrop-blur-md [background-color:color-mix(in_srgb,var(--c-glass)_18%,transparent)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3),_0_8px_30px_rgba(0,0,0,0.2)] flex items-center justify-center">
              <Icon className="h-7 w-7 text-white drop-shadow" strokeWidth={2} />
            </div>
          </div>
        ) : null}

        <h1 className="text-3xl md:text-5xl font-semibold leading-tight tracking-tight">{title}</h1>
        {subtitle ? (
          <p className="mt-3 text-base md:text-lg text-foreground/85 max-w-2xl mx-auto">{subtitle}</p>
        ) : null}
      </div>
    </section>
  );
}
