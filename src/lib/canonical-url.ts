/**
 * Genera la URL canónica para cualquier ruta
 * Siempre usa https://disruptivo.app (sin www)
 */
export function getCanonicalUrl(pathname: string): string {
  const baseUrl = 'https://disruptivo.app';
  // Asegurar que pathname empiece con /
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${baseUrl}${cleanPath}`;
}
