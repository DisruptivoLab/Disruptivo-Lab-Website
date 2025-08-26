import { useModularTranslation } from '@/contexts/modular-translation-context';

type SupportedLocale = 'es' | 'en' | 'ja' | 'ko' | 'fr' | 'pt' | 'zh';

export function useLanguage() {
  const { locale } = useModularTranslation();
  return locale as SupportedLocale;
}
