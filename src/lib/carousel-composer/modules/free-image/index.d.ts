import { ModuleDefinition } from '../types';
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
export declare const freeImageModule: ModuleDefinition;
export type { FreeImageData } from './schema';
export { freeImageSchema } from './schema';
export { getFreeImageCss } from './css';
export { getFreeImageHtml } from './html';
export { FreeImageForm } from './FreeImageForm';
//# sourceMappingURL=index.d.ts.map