import { Metadata } from 'next';

export function generateHreflangMetadata(pathname: string, locale: string = 'es'): Metadata['alternates'] {
  const baseUrl = 'https://disruptivo.app';
  
  return {
    canonical: `${baseUrl}${pathname}`,
    languages: {
      'es': `${baseUrl}${pathname}`,
      'x-default': `${baseUrl}${pathname}`
    }
  };
}
