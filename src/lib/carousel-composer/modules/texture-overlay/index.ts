// @ts-nocheck - Module compatibility types
import { ModuleDefinition } from '../types';
import { textureOverlaySchema, textureOverlayDefaults, TextureOverlayData } from './schema';
import { getTextureOverlayCss } from './css';
import { getTextureOverlayHtml } from './html';

/**
 * Texture Overlay Module Definition
 * Provides a texture overlay above viewport/card background but below content
 */
export const textureOverlayModule: ModuleDefinition = {
  id: 'textureOverlay',
  name: 'Texture Overlay',
  description: 'Overlay texture image on top of background',
  icon: undefined as any,
  category: 'overlay',
  defaults: textureOverlayDefaults,
  generateCSS: getTextureOverlayCss,
  generateHTML: getTextureOverlayHtml,
  validate: () => ({ valid: true, errors: [] }),
  getStyleVariables: () => ({}),
  zIndex: 2, // Above viewport/card (0-1) but below content
  dependencies: [],
  conflicts: [],
};

// Export types for use in other modules
export type { TextureOverlayData } from './schema';
