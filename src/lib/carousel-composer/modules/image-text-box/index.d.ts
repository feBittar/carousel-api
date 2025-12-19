import { ModuleDefinition } from '../types';
/**
 * ImageTextBoxModule - Creates a horizontal box combining image + text side by side
 *
 * Features:
 * - Configurable split ratios (50-50, 40-60, 30-70, etc.)
 * - Order control (image-left or text-left)
 * - Independent image and text styling
 * - Works inside Card Container or standalone on viewport
 * - Multiple text fields with styled chunks support
 * - Individual padding for each side
 *
 * z-index: 7 (between contentImage=5 and textFields=10)
 */
export declare const imageTextBoxModule: ModuleDefinition;
export type { ImageTextBoxData } from './schema';
export { imageTextBoxSchema, imageTextBoxDefaults } from './schema';
export { getImageTextBoxCss } from './css';
export { getImageTextBoxHtml } from './html';
export { ImageTextBoxForm } from './ImageTextBoxForm';
//# sourceMappingURL=index.d.ts.map