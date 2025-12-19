// @ts-nocheck - Module compatibility types
import { ModuleDefinition } from '../../types';
import { viewportSchema, viewportDefaults } from './schema';
import { getViewportCss, getViewportStyleVariables } from './css';
import { getViewportHtml } from './html';

/**
 * ViewportModule - Controla o background, blur e gradient overlay do viewport
 *
 * Funcionalidades:
 * - Background color ou image
 * - Blur overlay (backdrop-filter via ::before)
 * - Gradient overlay (linear-gradient via ::after)
 *
 * z-index: 0 (background layer)
 */
export const viewportModule: ModuleDefinition = {
  id: 'viewport',
  name: 'Viewport',
  description: 'Controla o background, blur e gradient overlay do viewport',
  icon: undefined as any,
  category: 'layout',
  defaults: viewportDefaults,
  generateCSS: getViewportCss,
  generateHTML: getViewportHtml,
  validate: () => ({ valid: true, errors: [] }),
  getStyleVariables: getViewportStyleVariables,
  zIndex: 0, // Background layer
  dependencies: [],
  conflicts: [],
};

// Re-export tipos e utilidades
export { viewportSchema, viewportDefaults } from './schema';
export type { ViewportData } from './schema';
export { getViewportCss, getViewportStyleVariables } from './css';
export { getViewportHtml } from './html';
