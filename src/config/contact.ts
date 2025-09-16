/**
 * Configuración de Contacto
 * Centraliza todos los datos de contacto y horarios con soporte multiidioma
 */

// Tipos para el soporte de idiomas
type SupportedLocale = 'es' | 'en' | 'ja' | 'ko' | 'fr' | 'pt' | 'zh';

// Configuración de horarios por zona
export const scheduleConfig = {
  weekdayOpen: "09:00",
  weekdayClose: "18:00",
  saturdayOpen: "09:00",
  saturdayClose: "14:00",
  timezone: "America/Mexico_City", // Usando IANA timezone
  gmtOffset: "-06:00",
  city: {
    current: "Mexico City",
    translations: {
      es: "Ciudad de México",
      en: "Mexico City",
      ja: "メキシコシティ",
      ko: "멕시코시티",
      fr: "Mexico",
      pt: "Cidade do México",
      zh: "墨西哥城"
    }
  },
  
  // Formatos de hora por idioma
  timeFormat: {
    es: (time: string) => time.replace(':00', ':00 hrs'),
    en: (time: string) => {
      const [hours, minutes] = time.split(':');
      const period = Number(hours) >= 12 ? 'PM' : 'AM';
      const hour12 = Number(hours) > 12 ? Number(hours) - 12 : Number(hours);
      return `${hour12}:${minutes} ${period}`;
    },
    ja: (time: string) => {
      const [hours, minutes] = time.split(':');
      return `${hours}時${minutes}分`;
    },
    ko: (time: string) => {
      const [hours, minutes] = time.split(':');
      const period = Number(hours) >= 12 ? '오후' : '오전';
      const hour12 = Number(hours) > 12 ? Number(hours) - 12 : Number(hours);
      return `${period} ${hour12}시 ${minutes}분`;
    },
    fr: (time: string) => time.replace(':00', 'h00'),
    pt: (time: string) => time.replace(':00', ':00h'),
    zh: (time: string) => {
      const [hours, minutes] = time.split(':');
      return `${hours}点${minutes}分`;
    }
  },

  // Obtener horario formateado según idioma
  getFormattedSchedule(locale: SupportedLocale) {
    const formatter = this.timeFormat[locale] || this.timeFormat.en;
    return {
      weekdays: `${formatter(this.weekdayOpen)} - ${formatter(this.weekdayClose)}`,
      saturday: `${formatter(this.saturdayOpen)} - ${formatter(this.saturdayClose)}`,
      timezone: this.getTimezoneText(locale)
    };
  },

  // Texto de zona horaria por idioma
  getTimezoneText(locale: SupportedLocale) {
    const timezoneTexts = {
      es: `Hora del Centro de México (GMT${this.gmtOffset})`,
      en: `Central Mexico Time (GMT${this.gmtOffset})`,
      ja: `メキシコ中央時間（GMT${this.gmtOffset}）`,
      ko: `멕시코 중부 시간 (GMT${this.gmtOffset})`,
      fr: `Heure du Centre du Mexique (GMT${this.gmtOffset})`,
      pt: `Hora do Centro do México (GMT${this.gmtOffset})`,
      zh: `墨西哥中部时间 (GMT${this.gmtOffset})`
    };
    return timezoneTexts[locale] || timezoneTexts.en;
  }
} as const;

export const contactConfig = {
  // Teléfonos
  phone: {
    primary: "+57 300 7874923",
    secondary: "+57 300 7874923",
    display: "+57 300 7874923",
    whatsapp: "573007874923", // Sin + ni espacios
  },

  // Emails
  email: {
    primary: "contacto@disruptivolab.com",
    sales: "ventas@disruptivolab.com",
    support: "soporte@disruptivolab.com",
    info: "info@disruptivolab.com",
  },

  // Redes sociales
  social: {
    whatsapp: "https://wa.me/5233123456789",
    telegram: "https://t.me/disruptivolab",
    instagram: "https://instagram.com/disruptivolab",
    linkedin: "https://linkedin.com/company/disruptivolab",
    twitter: "https://twitter.com/disruptivolab",
  },

  // Ubicación
  location: {
    // Textos traducidos para la ubicación
    getAddress: (locale: SupportedLocale) => {
      const addresses = {
        es: "Guadalajara, Jalisco, México",
        en: "Guadalajara, Jalisco, Mexico",
        ja: "メキシコ、ハリスコ州、グアダラハラ",
        ko: "과달라하라, 할리스코, 멕시코",
        fr: "Guadalajara, Jalisco, Mexique",
        pt: "Guadalajara, Jalisco, México",
        zh: "瓜达拉哈拉，哈利斯科州，墨西哥"
      };
      return addresses[locale] || addresses.en;
    },
    city: "Guadalajara",
    state: "Jalisco",
    country: "México",
    timezone: scheduleConfig.timezone,
  },

  // Mensajes predefinidos para WhatsApp por idioma
  getWhatsAppMessage: (locale: SupportedLocale) => {
    const messages = {
      es: "¡Hola! Me interesa conocer más sobre los servicios de Disruptivo Lab.",
      en: "Hi! I'm interested in learning more about Disruptivo Lab's services.",
      ja: "こんにちは！Disruptivo Labのサービスについて詳しく知りたいです。",
      ko: "안녕하세요! Disruptivo Lab의 서비스에 대해 자세히 알고 싶습니다.",
      fr: "Bonjour ! Je souhaite en savoir plus sur les services de Disruptivo Lab.",
      pt: "Olá! Gostaria de saber mais sobre os serviços da Disruptivo Lab.",
      zh: "你好！我想了解更多关于Disruptivo Lab的服务。"
    };
    return messages[locale] || messages.en;
  },

  // Mensajes predefinidos para WhatsApp
  whatsappMessages: {
    general: "¡Hola! Me interesa conocer más sobre los servicios de Disruptivo Lab.",
    ai: "¡Hola! Me interesa conocer más sobre sus soluciones de Inteligencia Artificial.",
    branding: "¡Hola! Me interesa conocer más sobre sus servicios de Branding.",
    consultation: "¡Hola! Me gustaría agendar una consulta gratuita.",

    // Mensajes específicos por industria
    industries: {
      ecommerce: "¡Hola! Me interesa automatizar mi tienda online con IA. ¿Pueden ayudarme con e-commerce?",
      health: "¡Hola! Tengo una clínica/consultorio y me interesa automatizar procesos médicos con IA.",
      restaurant: "¡Hola! Tengo un restaurante y me interesa automatizar inventario y operaciones con IA.",
      realestate: "¡Hola! Trabajo en inmobiliaria y me interesa automatizar la gestión de leads y propiedades.",
      education: "¡Hola! Trabajo en educación y me interesa automatizar procesos académicos con IA.",
      automotive: "¡Hola! Tengo un taller/concesionario y me interesa automatizar diagnósticos y gestión.",
      beauty: "¡Hola! Tengo una barbería/estética y me interesa automatizar citas y gestión de clientes con IA.",
      professional: "¡Hola! Ofrezco servicios profesionales y me interesa automatizar mi gestión empresarial con IA.",
      tourism: "¡Hola! Trabajo en turismo y me interesa automatizar reservas y atención al cliente con IA.",
    }
  },

  // CTAs configurables por industria
  industryCTAs: {
    ecommerce: {
      text: "Automatizar mi E-commerce",
      message: "¡Hola! Me interesa automatizar mi tienda online. Quiero saber más sobre:",
      details: [
        "• Gestión automática de inventario",
        "• Procesamiento de pedidos sin intervención manual",
        "• Chatbots inteligentes para atención al cliente",
        "• Marketing personalizado automático",
        "• Análisis de datos y reportes automáticos"
      ]
    },
    health: {
      text: "Automatizar mi Clínica",
      message: "¡Hola! Tengo una clínica/consultorio y me interesa automatizar:",
      details: [
        "• Gestión de citas y recordatorios automáticos",
        "• Digitalización de historiales médicos",
        "• Seguimiento automático de pacientes",
        "• Facturación médica automatizada",
        "• Control de inventario médico"
      ]
    },
    restaurant: {
      text: "Automatizar mi Restaurante",
      message: "¡Hola! Tengo un restaurante y me interesa automatizar:",
      details: [
        "• Control automático de inventario de ingredientes",
        "• Pedidos automáticos a proveedores",
        "• Sistema inteligente de reservas",
        "• Análisis automático de ventas y costos",
        "• Chatbots para reservas y consultas"
      ]
    },
    realestate: {
      text: "Automatizar mi Inmobiliaria",
      message: "¡Hola! Trabajo en inmobiliaria y me interesa automatizar:",
      details: [
        "• Generación automática de leads calificados",
        "• Seguimiento automático de prospectos",
        "• Gestión automática de propiedades",
        "• Programación automática de visitas",
        "• Análisis automático del mercado"
      ]
    },
    education: {
      text: "Automatizar mi Institución",
      message: "¡Hola! Trabajo en educación y me interesa automatizar:",
      details: [
        "• Gestión académica y matrículas automáticas",
        "• Comunicación automática con padres",
        "• Sistema de biblioteca digital",
        "• Evaluaciones online automáticas",
        "• Control automático de asistencia"
      ]
    },
    automotive: {
      text: "Automatizar mi Taller",
      message: "¡Hola! Tengo un taller/concesionario y me interesa automatizar:",
      details: [
        "• Diagnóstico inteligente con IA",
        "• Gestión automática de citas de servicio",
        "• Control automático de inventario de repuestos",
        "• Seguimiento automático de flotas",
        "• Facturación automática y cotizaciones"
      ]
    },
    beauty: {
      text: "Automatizar mi Salón",
      message: "¡Hola! Tengo una barbería/estética y me interesa automatizar:",
      details: [
        "• Gestión automática de citas y recordatorios",
        "• Control de inventario de productos y herramientas",
        "• Seguimiento automático de clientes y preferencias",
        "• Marketing personalizado y promociones automáticas",
        "• Facturación y pagos automatizados",
        "• Análisis de rendimiento y reportes automáticos"
      ]
    },
    professional: {
      text: "Automatizar mis Servicios",
      message: "¡Hola! Ofrezco servicios profesionales y me interesa automatizar:",
      details: [
        "• Generación automática de leads calificados",
        "• Gestión automática de proyectos y clientes",
        "• Facturación y contratos automatizados",
        "• Seguimiento automático de propuestas",
        "• Reportes automáticos de tiempo y productividad",
        "• Marketing digital automatizado"
      ]
    },
    tourism: {
      text: "Automatizar mi Negocio Turístico",
      message: "¡Hola! Trabajo en turismo y me interesa automatizar:",
      details: [
        "• Sistema automático de reservas y disponibilidad",
        "• Atención al cliente 24/7 con chatbots inteligentes",
        "• Gestión automática de itinerarios y tours",
        "• Marketing personalizado según preferencias",
        "• Facturación y pagos automatizados",
        "• Análisis automático de satisfacción del cliente"
      ]
    }
  }
} as const;

// Funciones helper actualizadas para soporte multiidioma
export const generateWhatsAppLink = (locale: SupportedLocale = 'es') => {
  const message = contactConfig.getWhatsAppMessage(locale);
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${contactConfig.phone.whatsapp}?text=${encodedMessage}`;
};

export const generateEmailLink = (subject?: string, body?: string) => {
  const params = new URLSearchParams();
  if (subject) params.append('subject', subject);
  if (body) params.append('body', body);
  const queryString = params.toString();
  return `mailto:${contactConfig.email.primary}${queryString ? `?${queryString}` : ''}`;
};

export const generateTelLink = (phone?: string) => {
  return `tel:${phone || contactConfig.phone.primary}`;
};

// Función específica para generar links de WhatsApp por industria
export const generateIndustryWhatsAppLink = (industry: keyof typeof contactConfig.industryCTAs) => {
  const cta = contactConfig.industryCTAs[industry];
  const fullMessage = `${cta.message}\n\n${cta.details.join('\n')}\n\n¿Pueden ayudarme con esto?`;
  const encodedMessage = encodeURIComponent(fullMessage);
  return `https://wa.me/${contactConfig.phone.whatsapp}?text=${encodedMessage}`;
};

// Función para obtener CTA por industria
export const getIndustryCTA = (industry: keyof typeof contactConfig.industryCTAs) => {
  return contactConfig.industryCTAs[industry];
};

// Función para obtener mensaje de WhatsApp por industria
export const getIndustryWhatsAppMessage = (industry: keyof typeof contactConfig.whatsappMessages.industries) => {
  return contactConfig.whatsappMessages.industries[industry];
};