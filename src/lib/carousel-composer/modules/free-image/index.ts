// @ts-nocheck - Module compatibility types
import { ModuleDefinition } from '../types';
import { freeImageSchema, FreeImageData } from './schema';
import { getFreeImageCss } from './css';
import { getFreeImageHtml } from './html';

/**
 * FreeImageModule - Free-positioned image for carousel center
 *
 * Features:
 * - Positions an image at the center of the carousel (between multiple slides)
 * - Only active when there are 2+ slides
 * - Fully customizable position, scale, rotation
 * - Optional outline effect using 8-direction drop shadows
 * - Useful for "VS" images, arrows, connecting elements
 *
 * z-index: 101 (above all content, highest layer)
 */
export const freeImageModule: ModuleDefinition = {
  id: 'freeImage',
  name: 'Free Image',
  description: 'Free-positioned image at carousel center (2+ slides)',
  icon: undefined as any,
  category: 'overlay',
  // @ts-expect-error - Type compatibility with ModuleData
  defaults: {
    enabled: false,
    url: '',
    offsetX: 0,
    offsetY: 0,
    scale: 100,
    rotation: 0,
    outlineEffect: {
      enabled: false,
      color: '#000000',
      size: 0,
    },
  } as FreeImageData,
  generateCSS: getFreeImageCss,
  generateHTML: getFreeImageHtml,
  validate: () => ({ valid: true, errors: [] }),
  getStyleVariables: () => ({}),
  zIndex: 101, // Highest z-index - above everything
  dependencies: [],
  conflicts: [],
};

// Export types for use in other modules
export type { FreeImageData } from './schema';
export { freeImageSchema } from './schema';
export { getFreeImageCss } from './css';
export { getFreeImageHtml } from './html';
