import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirigir URLs de idiomas no soportados a español
  if (pathname.startsWith('/en/') || pathname.startsWith('/pt/') || 
      pathname.startsWith('/fr/') || pathname.startsWith('/ja/') || 
      pathname.startsWith('/ko/') || pathname.startsWith('/zh/')) {
    const newPath = pathname.replace(/^\/(en|pt|fr|ja|ko|zh)\//, '/');
    return NextResponse.redirect(new URL(newPath, request.url), 301);
  }

  // Redirects 301 permanentes
  const redirects: Record<string, string> = {
    '/servicios': '/services',
    '/nosotros': '/about',
    '/metodo': '/method',
    '/portafolio': '/portfolio',
  };

  if (redirects[pathname]) {
    return NextResponse.redirect(new URL(redirects[pathname], request.url), 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|api|favicon.ico|media).*)',
  ],
};
