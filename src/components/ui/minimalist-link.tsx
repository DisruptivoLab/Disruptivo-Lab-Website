'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import * as React from 'react';

export type MinimalistLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  size?: 'lg' | 'xl';
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

/**
 * MinimalistLink
 * Enlace grande, tipografía Poppins gruesa, subrayado de link, estilo minimalista.
 */
export function MinimalistLink({ href, children, className, size = 'xl', onClick }: MinimalistLinkProps) {
  const sizeClasses = size === 'xl'
    ? 'text-2xl md:text-3xl lg:text-4xl'
    : 'text-xl md:text-2xl lg:text-3xl';

  return (
    <Link
      href={href}
      className={cn(
        'font-sans font-semibold tracking-tight text-foreground',
        'underline decoration-current underline-offset-8 decoration-2',
        'transition-opacity duration-200 hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 rounded-sm',
        sizeClasses,
        className
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
