import { ModuleDefinition } from '../types';
/**
 * ContentImageModule - Manages content images with single or comparison mode
 *
 * Features:
 * - Single image display with customizable sizing and positioning
 * - Comparison mode (2 images side by side) for versus-style templates
 * - Border radius, shadows, object-fit controls
 * - Automatic hiding when no URL provided
 *
 * z-index: 5 (above card background, below text)
 */
export declare const contentImageModule: ModuleDefinition;
export type { ContentImageData } from './schema';
export { contentImageSchema } from './schema';
export { getContentImageCss } from './css';
export { getContentImageHtml } from './html';
export { ContentImageForm } from './ContentImageForm';
//# sourceMappingURL=index.d.ts.map