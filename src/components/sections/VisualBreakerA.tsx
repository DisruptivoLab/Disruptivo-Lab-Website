'use client';

import { useTheme } from '@/contexts/theme-context';
import { cn } from '@/lib/utils';

export default function VisualBreakerA() {
  const { theme } = useTheme();

  // Lista compacta y visual (sin texto largo)
  const items = [
    'OpenAI', 'Next.js', 'Vercel', 'AWS', 'Cloudflare', 'Stripe', 'Supabase', 'LangChain', 'Three.js', 'Playwright'
  ];
  const duplicated = [...items, ...items];

  return (
    <section aria-hidden className={cn('relative w-full', theme === 'dark' ? 'bg-black' : 'bg-white')}>
      {/* Glass Wave Divider (full-bleed) */}
      <div className="relative left-1/2 -translate-x-1/2 w-full max-w-[100vw] h-40 md:h-52 overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-md" />
        <svg
          className="absolute inset-x-0 bottom-0 h-full w-[200%] -left-1/2"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path
            className={cn(
              'transition-colors duration-300',
              theme === 'dark' ? 'fill-white/10' : 'fill-black/5'
            )}
            d="M0,96L60,117.3C120,139,240,181,360,176C480,171,600,117,720,117.3C840,117,960,171,1080,186.7C1200,203,1320,181,1380,170.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
          <path
            className={cn(
              'transition-colors duration-300',
              theme === 'dark' ? 'fill-white/5' : 'fill-black/3'
            )}
            d="M0,64L60,69.3C120,75,240,85,360,117.3C480,149,600,203,720,213.3C840,224,960,192,1080,165.3C1200,139,1320,117,1380,106.7L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
        <div
          className={cn(
            'absolute inset-0 pointer-events-none',
            theme === 'dark'
              ? 'bg-gradient-to-b from-transparent via-white/5 to-white/0'
              : 'bg-gradient-to-b from-transparent via-black/5 to-black/0'
          )}
        />
      </div>

      {/* Tech Ribbon (mini) */}
      <div className="relative left-1/2 -translate-x-1/2 w-full max-w-[100vw]">
        <div className="overflow-hidden py-6">
          <div className="flex animate-scroll-left gap-6 md:gap-10 px-4 md:px-8">
            {duplicated.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className={cn(
                  'select-none rounded-full px-4 py-2 text-sm md:text-base font-semibold tracking-tight',
                  'border border-border/30 shadow-sm',
                  theme === 'dark'
                    ? 'bg-white/5 text-white/80 hover:text-white'
                    : 'bg-black/5 text-gray-800/80 hover:text-gray-800'
                )}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
