/**
 * Controls Bar Component
 * Barra de controles con tema y selector de idioma
 */

'use client';

import { SimpleThemeToggle } from './simple-theme-toggle';
import { LanguageSelector } from './language-selector';

export function ControlsBar() {
  return (
    <div className="flex items-center gap-3">
      <LanguageSelector />
      <SimpleThemeToggle />
    </div>
  );
}