import type { Metadata, Viewport } from "next";
import { ClientProviders } from "@/components/providers/client-providers";
import { Poppins, JetBrains_Mono } from 'next/font/google';
import "./globals.css";

// Configurar las fuentes
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://disruptivolab.com"),
  title: "Disruptivo Lab - Innovación Radical, Resultados Reales",
  description: "Transformamos ideas en futuros digitales. Agencia de innovación y tecnología especializada en IA, Branding, Estrategia y Plataformas Web con metodología disruptiva.",
  keywords: ["innovación", "tecnología", "IA", "inteligencia artificial", "branding", "estrategia digital", "desarrollo web", "agencia digital", "transformación digital"],
  authors: [{ name: "Disruptivo Lab" }],
  creator: "Disruptivo Lab",
  publisher: "Disruptivo Lab",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Disruptivo Lab - Innovación Radical, Resultados Reales",
    description: "Transformamos ideas en futuros digitales. Agencia de innovación y tecnología especializada en IA, Branding, Estrategia y Plataformas Web.",
    type: "website",
    locale: "es_ES",
    siteName: "Disruptivo Lab",
    images: [
      {
        url: "/media/Identidad/iconotipo_disrptivo_Lab.png",
        width: 1200,
        height: 630,
        alt: "Disruptivo Lab - Agencia de Innovación y Tecnología",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Disruptivo Lab - Innovación Radical, Resultados Reales",
    description: "Transformamos ideas en futuros digitales. Agencia de innovación y tecnología.",
    images: ["/media/Identidad/iconotipo_disrptivo_Lab.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FF4500",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FF4500" />
        <link rel="icon" href="/media/Identidad/iconotipo_disrptivo_Lab.png" />
        <link rel="apple-touch-icon" href="/media/Identidad/iconotipo_disrptivo_Lab.png" />
        <meta name="format-detection" content="telephone=no" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Disruptivo Lab",
              "description": "Agencia de innovación y tecnología especializada en IA, Branding, Estrategia y Plataformas Web",
              "url": "https://disruptivolab.com",
              "logo": "/media/Identidad/iconotipo_disrptivo_Lab.png",
              "sameAs": [],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": ["Spanish", "English", "Portuguese"]
              },
              "areaServed": "Worldwide",
              "serviceType": ["Artificial Intelligence", "Branding", "Digital Strategy", "Web Development"]
            })
          }}
        />
      </head>
      <body
        className={`antialiased ${poppins.variable} ${jetbrainsMono.variable}`}
      >
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <filter id="switcher" primitiveUnits="objectBoundingBox">
            <feImage result="map" width="100%" height="100%" x="0" y="0" href="data:image/webp;base64,UklGRq4vAABXRUJQVlA4WAoAAAAQAAAA5wEAhwAAQUxQSOYWAAABHAVpGzCrf9t7EiJCYdIGTDpvURGm9n7K+YS32rZ1W8q0LSSEBCQgAQlIwEGGA3CQOAAHSEDCJSEk4KDvUmL31vrYkSX3ufgXEb4gSbKt2LatxlqIgNBBzbM3ikHVkvUvq7btKpaOBCQgIRIiAQeNg46DwgE4oB1QDuKgS0IcXBykXieHkwdjX/4iAhZtK3ErSBYGEelp+4aM/5/+z14+//jLlz/++s/Xr4//kl9C8Ns8DaajU+lPX/74+viv/eWxOXsO+eHL3/88/ut/2b0zref99evjX8NLmNt1fP7178e/jJcw9k3G//XP49/Iy2qaa7328Xkk9ZnWx0VUj3bcyCY4Pi7C6reeEagEohnRCbQQwFmUp9ggYQj8MChjTSI0Ck7G/bh6P5ykNU9yP+10G8I2UAwXeQ96DQwNjqyPu/c4tK+5CtGOK0oM7AH5f767lHpotXVYYI66B+HjMhHj43C5wok3YDH4/vZFZRkB7rNnEfC39WS2Q3K78y25wFNTPf5f+/fN9YI1YyDvjuzV5rQtsfn1Ez1ka3PkeGxOZ6IODxDJqCLpF7vdb9Z3s/ufLr6jf/55zbW3LodwwVVg7LmauP... [truncated]"/>
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.04" result="blur"/>
            <feDisplacementMap
                               id="disp"
                               in="blur"
                               in2="map"
                               scale="0.5"
                               xChannelSelector="R"
                               yChannelSelector="G">
            </feDisplacementMap>
          </filter>

          <filter id="toggler" primitiveUnits="objectBoundingBox">
            <feImage result="map" width="100%" height="100%" x="0" y="0" href="data:image/webp;base64,UklGRq4vAABXRUJQVlA4WAoAAAAQAAAA5wEAhwAAQUxQSOYWAAABHAVpGzCrf9t7EiJCYdIGTDpvURGm9n7K+YS32rZ1W8q0LSSEBCQgAQlIwEGGA3CQOAAHSEDCJSEk4KDvUmL31vrYkSX3ufgXEb4gSbKt2LatxlqIgNBBzbM3ikHVkvUvq7btKpaOBCQgIRIiAQeNg46DwgE4oB1QDuKgS0IcXBykXieHkwdjX/4iAhZtK3ErSBYGEelp+4aM/5/+z14+//jLlz/++s/Xr4//kl9C8Ns8DaajU+lPX/74+viv/eWxOXsO+eHL3/88/ut/2b0zref99evjX8NLmNt1fP7178e/jJcw9k3G//XP49/Iy2qaa7328Xkk9ZnWx0VUj3bcyCY4Pi7C6reeEagEohnRCbQQwFmUp9ggYQj8MChjTSI0Ck7G/bh6P5ykNU9yP+10G8I2UAwXeQ96DQwNjqyPu/c4tK+5CtGOK0oM7AH5f767lHpotXVYYI66B+HjMhHj43C5wok3YDH4/vZFZRkB7rNnEfC39WS2Q3K78y25wFNTPf5f+/fN9YI1YyDvjuzV5rQtsfn1Ez1ka3PkeGxOZ6IODxDJqCLpF7vdb9Z3s/ufLr6jf/55zbW3LodwwVVg7LmauP... [truncated]"/>
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.01" result="blur"/>
            <feDisplacementMap
                               id="disp"
                               in="blur"
                               in2="map"
                               scale="0.5"
                               xChannelSelector="R"
                               yChannelSelector="G">
            </feDisplacementMap>
          </filter>
        </svg>
        <ClientProviders>
          {children}
          {/* Toast de detección de idioma */}
          <div id="language-detection-portal" />
        </ClientProviders>
      </body>
    </html>
  );
}
