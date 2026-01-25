export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  provider: string;
  areaServed?: string;
  offers?: { price: string; priceCurrency: string };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "url": service.url,
    "provider": {
      "@type": "Organization",
      "name": service.provider,
      "url": "https://disruptivo.app"
    },
    "areaServed": service.areaServed || "Worldwide",
    "serviceType": service.name,
    ...(service.offers && {
      "offers": {
        "@type": "Offer",
        "price": service.offers.price,
        "priceCurrency": service.offers.priceCurrency
      }
    })
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: string;
  wordCount?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "url": article.url,
    "image": {
      "@type": "ImageObject",
      "url": article.image,
      "width": 1200,
      "height": 630
    },
    "datePublished": article.datePublished,
    "dateModified": article.dateModified,
    "author": {
      "@type": "Person",
      "name": article.author,
      "url": "https://disruptivo.app/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Disruptivo Lab",
      "url": "https://disruptivo.app",
      "logo": {
        "@type": "ImageObject",
        "url": "https://disruptivo.app/media/Identidad/iconotipo_disrptivo_Lab.png",
        "width": 600,
        "height": 60
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": article.url
    },
    "articleSection": "Technology",
    "inLanguage": "es-ES",
    ...(article.wordCount && { "wordCount": article.wordCount })
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function generateWebPageSchema(page: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": page.name,
    "description": page.description,
    "url": page.url,
    "publisher": {
      "@type": "Organization",
      "name": "Disruptivo Lab",
      "url": "https://disruptivo.app"
    }
  };
}
