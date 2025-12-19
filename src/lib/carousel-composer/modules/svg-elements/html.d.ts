import { ModuleData, RenderContext } from '../types';
/**
 * Generates HTML for the SVGElements Module
 */
export declare function getSvgElementsHtml(data: ModuleData, context?: RenderContext): string;
/**
 * Helper to generate SVG placeholders for template replacement
 * Used by legacy templates that inject SVGs via {{svg1Content}} syntax
 */
export declare function getSvgElementsPlaceholders(data: ModuleData, context?: RenderContext): Record<string, string>;
//# sourceMappingURL=html.d.ts.map