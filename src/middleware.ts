import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  // Forzar HTTPS sin www
  if (request.headers.get('host')?.startsWith('www.')) {
    url.host = url.host.replace('www.', '');
    return NextResponse.redirect(url, 301);
  }

  // Redirigir URLs de idiomas no soportados a español
  const unsupportedLocales = ['/en/', '/pt/', '/fr/', '/ja/', '/ko/', '/zh/'];
  for (const locale of unsupportedLocales) {
    if (pathname.startsWith(locale)) {
      url.pathname = pathname.replace(locale, '/');
      return NextResponse.redirect(url, 301);
    }
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
    '/((?!api|_next/static|_next/image|favicon.ico|media).*)',
  ],
};
