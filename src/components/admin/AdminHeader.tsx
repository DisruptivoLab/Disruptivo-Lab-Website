'use client';

import { useRouter } from 'next/navigation';
import { useAdminTheme } from '@/contexts/admin/AdminThemeContext';
import { useModularTranslation } from '@/contexts/modular-translation-context';
import { 
  ChevronLeft, 
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';
import { ReactNode } from 'react';

interface AdminHeaderProps {
  title: string;
  actions?: ReactNode;
  showBack?: boolean;
  showNext?: boolean;
  onBack?: () => void;
  onNext?: () => void;
}

export function AdminHeader({ 
  title, 
  actions,
  showBack,
  showNext,
  onBack,
  onNext
}: AdminHeaderProps) {
  const router = useRouter();
  const { theme, toggleTheme } = useAdminTheme();
  const { locale, changeLocale } = useModularTranslation();

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-black/10 dark:border-white/10 transition-colors">
      <div className="flex items-center justify-between px-4 py-1">
        {/* Left: Navigation + Title */}
        <div className="flex items-center gap-2">
          {showBack && (
            <button
              onClick={onBack || (() => router.back())}
              className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-black dark:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          <h1 className="text-lg font-bold text-black dark:text-white">{title}</h1>

          {showNext && (
            <button
              onClick={onNext}
              className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-black dark:text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Right: Actions + Theme + Language */}
        <div className="flex items-center gap-2">
          {actions}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Language Toggle */}
          <button
            onClick={() => changeLocale(locale === 'es' ? 'en' : 'es')}
            className="px-2 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors"
          >
            <span className="text-xs font-bold uppercase">{locale}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
