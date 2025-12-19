import { ModuleData, RenderContext } from '../types';
import { TextureOverlayData } from './schema';

/**
 * Generates HTML for the Texture Overlay module
 * Creates a separate div element to ensure proper z-index layering
 */
export function getTextureOverlayHtml(data: ModuleData, context?: RenderContext): string {
  const overlay = data as TextureOverlayData;

  // Return empty if not enabled or no texture URL
  if (!overlay.enabled || !overlay.textureUrl) {
    return '';
  }

  // Return a div with the texture overlay class
  // CSS will handle positioning and styling
  return '<div class="texture-overlay"></div>';
}
