/**
 * Componente de prueba específico para las traducciones de la página home
 */

'use client';

import React from 'react';
import { useModularTranslation } from '@/contexts/modular-translation-context';

export function HomeTranslationTest() {
  const { t, locale, changeLocale } = useModularTranslation();

  return (
    <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
      <h3 className="text-lg font-bold text-purple-800 mb-4">
        🏠 Prueba de Traducciones de la Página Home
      </h3>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">
          <strong>Idioma actual:</strong> {locale}
        </p>
        
        <div className="flex gap-2 mb-4">
          {(['es', 'en'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => changeLocale(lang)}
              className={`px-3 py-1 text-xs rounded ${
                locale === lang 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {/* Hero Section */}
        <div className="bg-white p-4 rounded border">
          <h4 className="font-semibold text-blue-700 mb-3">🦸‍♂️ Hero Section</h4>
          <div className="space-y-2">
            <div className="p-3 bg-blue-50 rounded">
              <p className="font-medium text-blue-800 text-lg">
                {t('hero.title')}
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded">
              <p className="text-blue-700">
                {t('hero.subtitle')}
              </p>
            </div>
            <div className="p-2 bg-blue-100 rounded inline-block">
              <span className="text-blue-800 font-medium text-sm">
                {t('hero.cta')}
              </span>
            </div>
          </div>
        </div>

        {/* Agents Section */}
        <div className="bg-white p-4 rounded border">
          <h4 className="font-semibold text-green-700 mb-3">🤖 Agents Section</h4>
          <div className="space-y-2">
            <div className="p-3 bg-green-50 rounded">
              <p className="font-medium text-green-800 text-lg">
                {t('agents.title')}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded">
              <p className="text-green-700">
                {t('agents.subtitle')}
              </p>
            </div>
            <div className="p-2 bg-green-100 rounded inline-block">
              <span className="text-green-800 font-medium text-sm">
                {t('agents.cta')}
              </span>
            </div>
          </div>
        </div>

        {/* Common Elements (should still work) */}
        <div className="bg-white p-4 rounded border">
          <h4 className="font-semibold text-orange-700 mb-3">🔧 Common Elements</h4>
          <div className="space-y-1 text-sm">
            <div><strong>Navigation Home:</strong> {t('navigation.home')}</div>
            <div><strong>Loading:</strong> {t('loading')}</div>
            <div><strong>CTA Title:</strong> {t('cta.title')}</div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded">
        <p className="text-purple-800 text-xs">
          <strong>Estado:</strong> Las traducciones de hero.* y agents.* ahora vienen de archivos modulares 
          específicos de la página home, mientras que navigation.* y otros elementos comunes siguen 
          viniendo del módulo common.
        </p>
      </div>
    </div>
  );
}