import { ModuleDefinition } from '../types';
/**
 * SVGElements Module Definition
 *
 * Provides positioned SVG elements (icons, decorations, logos) that can be placed
 * anywhere on the viewport using either manual coordinates or special position presets.
 *
 * z-index: 20 (above content, below free text and corners)
 *
 * Features:
 * - Up to 3 SVG elements
 * - Manual positioning (px or %) or special position presets (corners, edges, center)
 * - Color override via CSS filters (changes SVG fill color)
 * - Rotation (0-360 degrees)
 * - Opacity control (0-1)
 * - Optional z-index override per element
 * - Percentage-based padding when using special positions (scales with viewport)
 * - Compatible with Duo module (SVGs are duplicated for each slide)
 */
export declare const svgElementsModule: ModuleDefinition;
export { svgElementsSchema, svgElementsDefaults } from './schema';
export type { SvgElementsData, SvgElement } from './schema';
export { getSvgElementsCss, getSvgElementsStyleVariables } from './css';
export { getSvgElementsHtml, getSvgElementsPlaceholders } from './html';
export { SvgElementsForm } from './SvgElementsForm';
//# sourceMappingURL=index.d.ts.map