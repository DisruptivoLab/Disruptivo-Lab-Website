'use client';

import { useEffect, useState } from 'react';
import { useModularTranslation } from '@/contexts/modular-translation-context';
import { generateFAQSchema } from '@/lib/structured-data';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { ContactModal } from '@/components/ui/contact-modal';
import { cn } from '@/lib/utils';

export default function FAQPage() {
  const { t, get, loadModularTranslation } = useModularTranslation();
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    loadModularTranslation('pages/faq');
  }, [loadModularTranslation]);

  const categories = ['general', 'services', 'pricing', 'technical', 'process'];

  const allFaqs = categories.flatMap(cat => {
    const faqs = get(`faqs.${cat}`) as Array<{ q: string; a: string }> || [];
    return faqs.map(faq => ({ question: faq.q, answer: faq.a }));
  });

  const faqSchema = generateFAQSchema(allFaqs);

  return (
    <main className="min-h-screen pt-28 pb-16 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container mx-auto max-w-4xl">
        {/* Hero */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t('hero.subtitle')}
          </p>
        </header>

        {/* FAQs por categoría */}
        <div className="space-y-12">
          {categories.map(category => {
            const faqs = get(`faqs.${category}`) as Array<{ q: string; a: string }> || [];
            if (faqs.length === 0) return null;

            return (
              <section key={category}>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {t(`categories.${category}`)}
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq, idx) => {
                    const key = `${category}-${idx}`;
                    const isOpen = openIndex === key;

                    return (
                      <div
                        key={key}
                        className="rounded-lg border border-border bg-card overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : key)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                        >
                          <span className="font-semibold text-foreground pr-4">
                            {faq.q}
                          </span>
                          <ChevronDown
                            className={cn(
                              "w-5 h-5 text-muted-foreground transition-transform flex-shrink-0",
                              isOpen && "rotate-180"
                            )}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-4 text-muted-foreground">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center rounded-2xl border border-border bg-card p-8">
          <MessageCircle className="w-12 h-12 mx-auto mb-4 text-red-600" />
          <h3 className="text-2xl font-bold text-foreground mb-2">
            {t('cta.title')}
          </h3>
          <p className="text-muted-foreground mb-6">
            {t('cta.description')}
          </p>
          <button
            onClick={() => setIsContactOpen(true)}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            {t('cta.button')}
          </button>
        </div>
      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </main>
  );
}
