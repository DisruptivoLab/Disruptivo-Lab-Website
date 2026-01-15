'use client';

import { useTheme } from '@/contexts/theme-context';
import { useModularTranslation } from '@/contexts/modular-translation-context';
import { MinimalistLink } from '@/components/ui';
import { HeroTitle, BodyText } from '@/components/ui/typography';

export default function AboutSection() {
  const { theme } = useTheme();
  const { t } = useModularTranslation();

  // Tecnologías modernas que utilizamos
  const technologies = [
    // Frontend & UI
    'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'WebGL', 'WebGPU', 'shadcn/ui',

    // Backend & Runtimes
    'Node.js', 'Python', 'Go', 'Rust', 'Bun', 'Deno', 'Express', 'NestJS', 'FastAPI',

    // Mobile & Apps
    'React Native', 'Expo', 'Flutter', 'iOS', 'Android',

    // APIs & Data
    'GraphQL', 'Apollo', 'tRPC', 'gRPC', 'REST',

    // ORMs & DB
    'Prisma', 'Drizzle ORM', 'TypeORM',
    'PostgreSQL', 'MySQL', 'SQLite', 'MongoDB', 'Redis', 'Kafka', 'RabbitMQ',

    // Cloud & Infra
    'AWS', 'GCP', 'Vercel', 'Cloudflare', 'Docker', 'Kubernetes', 'Terraform',
    'Supabase', 'Firebase', 'PlanetScale', 'Neon', 'Turso',

    // AI & LLMs
    'OpenAI GPT', 'Gemini', 'Claude', 'Agents', 'LangChain', 'LangGraph', 'AutoGen', 'RAG',
    'Pinecone', 'Weaviate', 'Qdrant', 'Whisper', 'Vision', 'TTS',

    // DevTools & QA
    'Git', 'GitHub', 'GitHub Actions', 'Playwright', 'Cypress', 'Vitest', 'Jest', 'Storybook', 'Serenity/JS',

    // Realtime & Media
    'WebRTC', 'Socket.IO',

    // Payments & Biz
    'Stripe'
  ];

  // Duplicar el array para hacer el loop infinito
  const duplicatedTechnologies = [...technologies, ...technologies];

  return (
    <section className={`py-16 md:py-24 lg:py-32 relative overflow-hidden ${
      theme === 'dark' ? 'bg-black' : 'bg-white'
    }`}>
      {/* Fondo sutil con gradiente: sólo en modo oscuro para no ensuciar el blanco */}
      {theme === 'dark' && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800/10 via-gray-700/5 to-gray-900/10" />
      )}
      
      <div className="relative z-10">
        {/* Carrusel de Tecnologías - Full bleed (de lado a lado) */}
        <div className="relative left-1/2 -translate-x-1/2 w-full max-w-[100vw]">
          <div className="mb-20 overflow-hidden">
            <div className="flex animate-scroll-left space-x-12 md:space-x-16 lg:space-x-20 px-4 md:px-8">
              {duplicatedTechnologies.map((tech, index) => (
                <div
                  key={`${tech}-${index}`}
                  className="flex-shrink-0"
                >
                  <span className={`font-poppins font-semibold text-2xl md:text-3xl lg:text-4xl whitespace-nowrap transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white/80 hover:text-white' : 'text-gray-800/80 hover:text-gray-800'
                  }`}>
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contenido en dos columnas - mismo ancho 98% que los slides */}
        <div className="w-[98%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      {/* Columna 1: Descripción SEO */}
          <div className="space-y-6">
            <BodyText className="text-foreground leading-relaxed text-base md:text-lg">
        {t('about.body.p1')}
            </BodyText>
          </div>

          {/* Columna 2: Slogan y Botones */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <HeroTitle className="text-foreground text-3xl md:text-4xl lg:text-5xl leading-tight">
                {t('about.slogan.leading')}{' '}
                <span className="text-primary">
                  {t('about.slogan.highlight')}
                </span>
              </HeroTitle>
            </div>

            {/* Enlaces minimalistas */}
            <div className="flex flex-col sm:flex-row gap-6">
              <MinimalistLink href="/about" size="xl">{t('about.cta.about')}</MinimalistLink>
              <MinimalistLink href="/services" size="xl">{t('about.cta.services')}</MinimalistLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
