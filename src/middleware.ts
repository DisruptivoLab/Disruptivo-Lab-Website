import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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
    '/((?!api|_next/static|_next/image|favicon.ico|media).*)',
  ],
};
