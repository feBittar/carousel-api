// @ts-nocheck - Module compatibility types
import { ModuleDefinition } from '../types';
import { logoSchema, logoDefaults } from './schema';
import { getLogoCss, getLogoStyleVariables } from './css';
import { getLogoHtml } from './html';

/**
 * Logo Module Definition
 *
 * Provides a single logo image overlay that can be positioned anywhere on the viewport.
 *
 * z-index: 30 (above content, below corners)
 *
 * Features:
 * - Select logo from available logos via API
 * - Customizable dimensions (width/height with auto support)
 * - Flexible positioning: special presets or manual coordinates
 * - Opacity control (0-1)
 * - CSS filters: grayscale, invert, brightness, contrast, sepia
 * - Filter intensity control for brightness/contrast
 * - Live preview of selected logo
 */
export const LogoModule: ModuleDefinition = {
  id: 'logo',
  name: 'Logo',
  description: 'Display a logo image with customizable position, opacity, and filters',
  icon: undefined as any,
  category: 'overlay',
  defaults: logoDefaults,
  generateCSS: getLogoCss,
  generateHTML: getLogoHtml,
  validate: () => ({ valid: true, errors: [] }),
  getStyleVariables: getLogoStyleVariables,
  zIndex: 30, // Above content, below corners
  dependencies: [],
  conflicts: [],
};

// Re-export types and utilities
export { logoSchema, logoDefaults } from './schema';
export type { LogoData, LogoFilter } from './schema';
export { getLogoCss, getLogoStyleVariables } from './css';
export { getLogoHtml, getLogoPlaceholder } from './html';
