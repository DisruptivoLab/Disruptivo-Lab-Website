# 📊 Guía de Setup - Analytics & Tracking

## 🎯 Google Analytics 4

### 1. Crear Propiedad GA4
1. Ve a [Google Analytics](https://analytics.google.com/)
2. Crear cuenta → Crear propiedad
3. Nombre: "Disruptivo Lab"
4. Zona horaria: Tu zona
5. Copiar **Measurement ID** (G-XXXXXXXXXX)

### 2. Configurar en el Proyecto
```bash
# Agregar a .env.local
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-TU-ID-AQUI
```

### 3. Eventos Personalizados (Opcional)
```typescript
import { event } from '@/components/analytics/GoogleAnalytics';

// Ejemplo: Tracking de clicks en CTA
event({
  action: 'click',
  category: 'CTA',
  label: 'Contact Button',
  value: 1
});
```

## 🏷️ Google Tag Manager (Opcional)

### 1. Crear Cuenta GTM
1. Ve a [Tag Manager](https://tagmanager.google.com/)
2. Crear cuenta → Crear contenedor
3. Tipo: Web
4. Copiar **Container ID** (GTM-XXXXXXX)

### 2. Instalar GTM
```typescript
// src/components/analytics/GoogleTagManager.tsx
'use client';

import Script from 'next/script';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export function GoogleTagManager() {
  if (!GTM_ID || process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />
    </>
  );
}
```

## 🔍 Microsoft Clarity (Heatmaps)

### 1. Crear Proyecto
1. Ve a [Clarity](https://clarity.microsoft.com/)
2. Agregar nuevo proyecto
3. Copiar **Project ID**

### 2. Instalar Clarity
```typescript
// src/components/analytics/MicrosoftClarity.tsx
'use client';

import Script from 'next/script';

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

export function MicrosoftClarity() {
  if (!CLARITY_ID || process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <Script
      id="clarity-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_ID}");
        `,
      }}
    />
  );
}
```

## 📈 Eventos Recomendados para Tracking

### Conversiones Principales
```typescript
// Formulario de contacto enviado
event({
  action: 'submit',
  category: 'Form',
  label: 'Contact Form',
  value: 1
});

// Click en CTA de servicio
event({
  action: 'click',
  category: 'Service',
  label: 'WhatsApp IA CTA',
  value: 1
});

// Descarga de recurso
event({
  action: 'download',
  category: 'Resource',
  label: 'Case Study PDF',
  value: 1
});

// Scroll profundo (75%)
event({
  action: 'scroll',
  category: 'Engagement',
  label: '75% Page Scroll',
  value: 75
});
```

## 🎯 Objetivos en GA4

### Configurar Conversiones
1. GA4 → Admin → Eventos
2. Marcar como conversión:
   - `form_submit`
   - `cta_click`
   - `service_view`
   - `contact_initiated`

### Embudos Recomendados
1. **Embudo de Conversión:**
   - Página de inicio → Servicios → Contacto → Envío

2. **Embudo de Engagement:**
   - Landing → Scroll 25% → Scroll 50% → Scroll 75%

## 🔒 GDPR & Privacidad

### Cookie Consent (Requerido en EU)
```typescript
// Implementar banner de cookies
// Usar: react-cookie-consent o similar
import CookieConsent from 'react-cookie-consent';

<CookieConsent
  location="bottom"
  buttonText="Aceptar"
  declineButtonText="Rechazar"
  enableDeclineButton
  onAccept={() => {
    // Activar GA4 y otros trackers
  }}
>
  Usamos cookies para mejorar tu experiencia.
</CookieConsent>
```

## ✅ Checklist de Verificación

- [ ] GA4 Measurement ID configurado
- [ ] Eventos de página funcionando
- [ ] Conversiones configuradas en GA4
- [ ] GTM instalado (opcional)
- [ ] Clarity instalado (opcional)
- [ ] Cookie consent implementado
- [ ] Eventos personalizados testeados
- [ ] Dashboard de GA4 configurado
- [ ] Alertas de anomalías activadas
- [ ] Reportes semanales configurados

## 📊 Dashboards Recomendados

### Dashboard 1: Adquisición
- Usuarios por fuente
- Sesiones por canal
- Tasa de rebote por fuente
- Conversiones por canal

### Dashboard 2: Comportamiento
- Páginas más vistas
- Tiempo promedio en página
- Scroll depth
- Eventos más frecuentes

### Dashboard 3: Conversiones
- Tasa de conversión
- Embudos de conversión
- Valor por conversión
- ROI por canal
