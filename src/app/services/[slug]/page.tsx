"use client";

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useModularTranslation } from '@/contexts/modular-translation-context';
import { SectionLoading } from '@/components/ui/global-loading';
import { ChevronLeft, ChevronRight, ArrowLeft, CheckCircle2, Clock, Rocket, PlugZap, LineChart, ShieldCheck, Bot, MessageCircle, CalendarCheck } from 'lucide-react';
import Link from 'next/link';
import { MinimalistLink } from '@/components/ui/minimalist-link';
import { ContactModal } from '@/components/ui/contact-modal';
import { FloatingControlsBar } from '@/components/ui/floating-controls-bar';
import { ServiceHero } from '@/components/sections/ServiceHero';
import { getServiceTheme } from '@/config/service-themes';

export default function ServiceDetailPage() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const slug = params?.slug as string;
  const { t, get, loadModularTranslation, isLoading } = useModularTranslation();
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      // Carga secuencial para evitar carreras: el módulo del slug SIEMPRE al final
      await loadModularTranslation('pages/services-landing');
      await loadModularTranslation('pages/services');
      await loadModularTranslation('components/modals/contact');
      await loadModularTranslation('pages/services-common');
      if (!cancelled) {
        await loadModularTranslation(`pages/services.${slug}`);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [loadModularTranslation, slug]);

  const services = useMemo(
    () => (get('servicesLanding.cards') as Array<{ slug: string; title: string; desc?: string }>) ?? [],
    [get]
  );

  const index = services.findIndex((s) => s.slug === slug);
  const service = index >= 0 ? services[index] : null;
  const prev = index > 0 ? services[index - 1] : null;
  const next = index >= 0 && index < services.length - 1 ? services[index + 1] : null;

  // JSON-LD básico para Service
  const jsonLd = service
    ? {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: (get('hero.title') as string) || service.title,
        description: (get('hero.subtitle') as string) || service.desc || '',
        provider: {
          '@type': 'Organization',
          name: 'Disruptivo Lab',
          url: 'https://disruptivolab.com',
        },
      }
    : null;

  // Contenido detallado por slug (por ahora, whatsapp-ia)
  const details = (() => {
    const subtitleLong = (get('pitch.subtitle_long') as string) || '';
    const pains = (get('pains') as string[]) || [];
    const outcomes = (get('outcomes') as Array<{ label: string; value: string }>) || [];
    const deliverables = (get('deliverables') as string[]) || [];
    const stepsData = (get('steps') as Array<{ title: string; desc: string }>) || [];
    const integrations = (get('integrations') as string[]) || [];
    const faqs = (get('faqs') as Array<{ q: string; a: string }>) || [];
    const salesFocus = (get('pitch.sales_focus') as string[]) || [];

    return {
      subtitleLong,
      pains,
      outcomes,
      deliverables,
      steps: stepsData.map((s, i) => ({
        ...s,
        Icon: [MessageCircle, PlugZap, Bot, Clock, Rocket][Math.min(i, 4)],
      })),
      integrations,
      faqs,
      salesFocus,
    } as const;
  })();

  const faqJsonLd = details
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: details.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.a,
          },
        })),
      }
    : null;

  if (!service) {
    return (
      <main className="min-h-[100svh] flex items-center justify-center p-8">
        <div className="max-w-md text-center">
          <p className="text-base opacity-70">Servicio no encontrado.</p>
          <div className="mt-4">
            <Link href="/services" className="underline underline-offset-4">Volver a servicios</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
  <main key={slug} className="min-h-[100svh]">
      {/* JSON-LD */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Barra superior minimal con breadcrumbs y navegación */}
      <div className="fixed top-4 left-4 right-4 z-40 flex items-center justify-between">
        {/* Migas de pan compactas a la izquierda */}
        <nav aria-label="breadcrumbs" className="flex items-center gap-3">
          <MinimalistLink
            href="#"
            size="lg"
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}
            className="!text-base md:!text-lg inline-flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{t('breadcrumb.back') || 'Back'}</span>
          </MinimalistLink>
          <span className="opacity-50">/</span>
          <MinimalistLink href="/services" size="lg" className="!text-base md:!text-lg">
            {t('breadcrumb.services') || 'Services'}
          </MinimalistLink>
        </nav>

        {/* Navegación prev/next a la derecha */}
        <div className="flex items-center gap-6">
          {prev && (
            <MinimalistLink
              href={`/services/${prev.slug}`}
              size="lg"
              className="!text-base md:!text-lg inline-flex items-center gap-1"
              onClick={(e) => {
                e.preventDefault();
                // Navegación con refresco completo para asegurar carga del módulo correcto
                window.location.assign(`/services/${prev.slug}`);
              }}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">{prev.title}</span>
            </MinimalistLink>
          )}
          {next && (
            <MinimalistLink
              href={`/services/${next.slug}`}
              size="lg"
              className="!text-base md:!text-lg inline-flex items-center gap-1"
              onClick={(e) => {
                e.preventDefault();
                // Navegación con refresco completo para asegurar carga del módulo correcto
                window.location.assign(`/services/${next.slug}`);
              }}
            >
              <span className="hidden sm:inline">{next.title}</span>
              <ChevronRight className="h-4 w-4" />
            </MinimalistLink>
          )}
        </div>
      </div>

      {/* Hero con gradiente de marca (arriba) → blanco/negro (abajo) */}
      {(() => {
    const themeDef = getServiceTheme(slug);
        const themeClass = themeDef ? `service-theme-${slug}` : 'service-theme-default';
        const ctaButton = slug === 'whatsapp-ia' ? {
          text: get('hero.cta_button') as string,
          href: 'https://chat.disruptivo.app',
          target: '_blank'
        } : undefined;

        return (
          <ServiceHero
      title={(get('hero.title') as string) || service.title}
      subtitle={(get('hero.subtitle') as string) || service.desc || ''}
            Icon={themeDef?.Icon}
            themeClassName={themeClass}
            ctaButton={ctaButton}
          />
        );
      })()}

      {/* Loading state para evitar flicker de contenido del slug previo */}
      {isLoading && (
        <section className="container mx-auto px-6 py-16">
          <SectionLoading />
        </section>
      )}

      {/* Contenido principal */}
      <section className="container mx-auto px-6 pb-28">
        {details ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Columna principal */}
            <div className="md:col-span-2 space-y-6">
              {/* Intro persuasiva: por qué ahora y foco comercial/soporte */}
              <div className="rounded-2xl p-6 bg-white/8 dark:bg-white/5 backdrop-blur">
                <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5" /> {t('headings.why_now')}
                </h2>
                <p className="opacity-80 leading-relaxed">{details.subtitleLong}</p>
                {details.salesFocus?.length ? (
                  <ul className="mt-3 grid sm:grid-cols-2 gap-2">
                    {details.salesFocus.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-sm opacity-90">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" /> {s}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              {/* Qué es (definición clara) */}
              <div className="rounded-2xl p-6 bg-white/8 dark:bg-white/5 backdrop-blur">
                <h3 className="font-semibold mb-3">{t('headings.what')}</h3>
                <p className="opacity-80 leading-relaxed">{(get('definition.what_is') as string) || ''}</p>
                {Array.isArray(get('definition.key_benefits')) && (
                  <ul className="mt-3 grid sm:grid-cols-2 gap-2">
                    {(get('definition.key_benefits') as string[]).map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm opacity-90">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" /> {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Problemas que resolvemos */}
              <div className="rounded-2xl p-6 bg-white/8 dark:bg-white/5 backdrop-blur">
                <h3 className="font-semibold mb-3">{t('headings.pain')}</h3>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {details.pains.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" />
                      <span className="opacity-80">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Entregables */}
              <div className="rounded-2xl p-6 bg-white/8 dark:bg-white/5 backdrop-blur">
                <h3 className="font-semibold mb-3">{t('headings.deliverables')}</h3>
                <ul className="list-disc pl-5 space-y-2 opacity-80">
                  {details.deliverables.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>

              {/* Cómo funciona (pasos) */}
              <div className="rounded-2xl p-6 bg-white/8 dark:bg-white/5 backdrop-blur">
                <h3 className="font-semibold mb-3">{t('headings.how')}</h3>
                <ol className="space-y-3">
                  {details.steps.map(({ title, desc, Icon }, i) => (
                    <li key={title} className="flex items-start gap-3">
                      <div className="h-9 w-9 rounded-xl bg-white/60 dark:bg-black/40 border border-black/10 dark:border-white/10 backdrop-blur inline-flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{i + 1}. {title}</p>
                        <p className="opacity-75 text-sm">{desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Aside */}
            <aside className="space-y-6">
              {/* Resultados esperados */}
              <div className="rounded-2xl p-6 bg-white/8 dark:bg-white/5 backdrop-blur">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <LineChart className="h-5 w-5" /> {t('headings.outcomes')}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {details.outcomes.map((o) => (
                    <div key={o.label} className="rounded-xl p-3 bg-white/60 dark:bg-black/40 border border-black/10 dark:border-white/10 backdrop-blur">
                      <p className="text-lg font-semibold">{o.value}</p>
                      <p className="text-xs opacity-75">{o.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Integraciones */}
              <div className="rounded-2xl p-6 bg-white/8 dark:bg-white/5 backdrop-blur">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <PlugZap className="h-5 w-5" /> {t('headings.integrations')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {details.integrations.map((name) => (
                    <span key={name} className="text-xs rounded-full px-3 py-1 bg-white/60 dark:bg-black/40 border border-black/10 dark:border-white/10">
                      {name}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA lateral */}
              <div className="rounded-2xl p-6 bg-white/8 dark:bg-white/5 backdrop-blur">
                <h3 className="font-semibold mb-2">{t('cta.title')}</h3>
                <p className="opacity-80 mb-3">{t('cta.desc')}</p>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/70 dark:bg-black/40 backdrop-blur border border-black/10 dark:border-white/10 hover:bg-white/90 dark:hover:bg-black/60 transition"
                >
                  <CalendarCheck className="h-4 w-4" /> {t('cta.button')}
                </button>
              </div>

              {/* FAQs */}
              <div className="rounded-2xl p-6 bg-white/8 dark:bg-white/5 backdrop-blur">
                <h3 className="font-semibold mb-3">{t('headings.faq')}</h3>
                <ul className="space-y-3">
                  {details.faqs.slice(0, 3).map((f) => (
                    <li key={f.q}>
                      <p className="font-medium">{f.q}</p>
                      <p className="text-sm opacity-80">{f.a}</p>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 text-sm opacity-70">Más preguntas al final del proyecto.</div>
              </div>
            </aside>
          </div>
        ) : (
          // Fallback para otros slugs aún no poblados
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="rounded-2xl p-6 bg-white/8 dark:bg-white/5 backdrop-blur">
                <h2 className="text-xl font-semibold mb-2">Qué es</h2>
                <p className="opacity-80">Definición breve del servicio y su valor.</p>
              </div>
              <div className="rounded-2xl p-6 bg-white/8 dark:bg-white/5 backdrop-blur">
                <h2 className="text-xl font-semibold mb-2">Cómo funciona</h2>
                <p className="opacity-80">Pasos principales, herramientas e integración.</p>
              </div>
              <div className="rounded-2xl p-6 bg-white/8 dark:bg-white/5 backdrop-blur">
                <h2 className="text-xl font-semibold mb-2">Beneficios</h2>
                <ul className="list-disc pl-5 space-y-1 opacity-80">
                  <li>Impacto en KPIs clave</li>
                  <li>Automatización y eficiencia</li>
                  <li>Escalabilidad</li>
                </ul>
              </div>
            </div>
            <aside className="space-y-6">
              <div className="rounded-2xl p-6 bg-white/8 dark:bg-white/5 backdrop-blur">
                <h3 className="font-semibold mb-2">CTA</h3>
                <p className="opacity-80 mb-3">¿Listo para explorar este servicio?</p>
                <Link href="/method" className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/70 dark:bg-black/40 backdrop-blur border border-black/10 dark:border-white/10 hover:bg-white/90 dark:hover:bg-black/60 transition">
                  Empezar
                </Link>
              </div>
              <div className="rounded-2xl p-6 bg-white/8 dark:bg-white/5 backdrop-blur">
                <h3 className="font-semibold mb-2">FAQs</h3>
                <p className="opacity-80">Próximamente: preguntas frecuentes y JSON-LD FAQPage.</p>
              </div>
            </aside>
          </div>
        )}
      </section>

  {/* Barra flotante inferior (Glass) con idioma, CTA y tema */}
  <FloatingControlsBar onContact={() => setIsContactOpen(true)} />

      {/* Modal de contacto */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </main>
  );
}
