# Configuración de Genkit para Automatización IA

## 🚀 Configuración Rápida

### 1. Obtener API Key de Google AI

1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crea una nueva API key
3. Copia la API key

### 2. Configurar Variables de Entorno

1. Abre el archivo `.env.local` en la raíz del proyecto
2. Reemplaza `your_google_ai_api_key_here` con tu API key real:

```env
GOOGLE_GENAI_API_KEY=tu_api_key_aqui
```

### 3. Instalar Dependencias

```bash
npm install
```

### 4. Ejecutar el Proyecto

```bash
npm run dev
```

## 🎯 Funcionalidad

La página de automatización (`/automatizacion-ia`) fue eliminada del sitio.

- **Quiz gamificado** de 5 preguntas
- **Análisis con IA** usando Genkit + Gemini
- **Reporte personalizado** con recomendaciones específicas
- **Métricas proyectadas** de ahorro y ROI
- **Experiencia inmersiva** con animaciones

## 🔧 Estructura Técnica

- **Flow**: `src/flows/automation-analysis-flow.ts`
- **API**: `src/app/api/genkit/route.ts`
// Página eliminada: `src/app/automatizacion-ia/page.tsx`
- **Config**: `genkit.ts`

## 🐛 Troubleshooting

Si tienes problemas:

1. Verifica que la API key esté correctamente configurada
2. Asegúrate de que todas las dependencias estén instaladas
3. Revisa la consola del navegador para errores
4. Verifica que el archivo `.env.local` esté en la raíz del proyecto

## 📝 Notas

- La API key es gratuita con límites generosos
- El análisis se genera en tiempo real
- Los resultados se muestran en cards hermosas
- La experiencia es completamente mobile-first