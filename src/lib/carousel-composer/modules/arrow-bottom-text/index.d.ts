import { ModuleDefinition } from '../types';
/**
 * Arrow Bottom Text Module Definition
 *
 * Combo of Arrow (SVG/image) + bottom text, commonly used in bottom corner for CTAs like "swipe up".
 *
 * z-index: 30 (same level as freeText, above most elements except Duo slides and corners)
 *
 * Features:
 * - Arrow SVG/image with color customization
 * - Bottom text with full typography control
 * - Flexible positioning with special position presets
 * - Layout options: vertical (arrow above text) or horizontal (arrow beside text)
 * - Gap control between arrow and text
 * - Typically positioned at bottom-right corner
 */
export declare const ArrowBottomTextModule: ModuleDefinition;
export { arrowBottomTextSchema, arrowBottomTextDefaults } from './schema';
export type { ArrowBottomTextData, ArrowBottomTextLayout } from './schema';
export { getArrowBottomTextCss, getArrowBottomTextStyleVariables } from './css';
export { getArrowBottomTextHtml, getArrowBottomTextPlaceholders } from './html';
export { ArrowBottomTextForm } from './ArrowBottomTextForm';
//# sourceMappingURL=index.d.ts.map