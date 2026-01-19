import { Metadata } from 'next';

export function generateHreflangMetadata(pathname: string, locale: string = 'es'): Metadata['alternates'] {
  const baseUrl = 'https://disruptivo.app';
  
  return {
    canonical: locale === 'es' ? `${baseUrl}${pathname}` : `${baseUrl}/${locale}${pathname}`,
    languages: {
      'es': `${baseUrl}${pathname}`,
      'en': `${baseUrl}/en${pathname}`,
      'pt': `${baseUrl}/pt${pathname}`,
      'fr': `${baseUrl}/fr${pathname}`,
      'ja': `${baseUrl}/ja${pathname}`,
      'ko': `${baseUrl}/ko${pathname}`,
      'zh': `${baseUrl}/zh${pathname}`,
      'x-default': `${baseUrl}${pathname}`
    }
  };
}
