import { ModuleDefinition } from '../types';
/**
 * FreeText Module Definition
 *
 * Provides freely positioned text elements (CTAs, labels, badges, etc.) that can be placed
 * anywhere on the viewport using either manual coordinates or special position presets.
 *
 * z-index: 30 (above text fields and content, below corners)
 *
 * Features:
 * - Up to 5 free text elements
 * - Manual positioning (px or %) or special position presets (corners, edges, center)
 * - Full text styling (font, size, weight, color, etc.)
 * - Optional background highlight with customizable padding and border radius
 * - Percentage-based padding when using special positions (scales with viewport)
 * - Compatible with Duo module (free texts are duplicated for each slide)
 */
export declare const FreeTextModule: ModuleDefinition;
export { freeTextSchema, freeTextDefaults } from './schema';
export type { FreeTextData, FreeTextElement } from './schema';
export { getFreeTextCss, getFreeTextStyleVariables } from './css';
export { getFreeTextHtml, getFreeTextPlaceholders } from './html';
export { FreeTextForm } from './FreeTextForm';
//# sourceMappingURL=index.d.ts.map