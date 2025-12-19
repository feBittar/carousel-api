import { ModuleData, RenderContext } from '../types';
import { TextureOverlayData } from './schema';

/**
 * Generates CSS for the Texture Overlay module
 * Creates a separate div element for proper z-index layering
 */
export function getTextureOverlayCss(data: ModuleData, context?: RenderContext): string {
  const overlay = data as TextureOverlayData;

  // Return empty if not enabled or no texture URL
  if (!overlay.enabled || !overlay.textureUrl) {
    return '';
  }

  // Check if card module is active to determine border radius
  const isCardActive =
    context?.enabledModules?.includes('card') &&
    context?.allModulesData?.card?.enabled !== false;

  // Get border radius from card if active
  const cardData = context?.allModulesData?.card as any;
  const borderRadius = isCardActive && cardData?.borderRadius
    ? `${cardData.borderRadius}px`
    : '0';

  return `
/* ===== TEXTURE OVERLAY (z-index: 2) ===== */
.texture-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-image: url(${overlay.textureUrl});
  background-size: cover;
  background-position: center;
  background-repeat: repeat;
  opacity: ${overlay.opacity};
  pointer-events: none;
  z-index: 2;
  border-radius: ${borderRadius};
}`;
}
