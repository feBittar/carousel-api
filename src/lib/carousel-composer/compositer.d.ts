/**
 * HTML Compositer for Carousel Composer
 *
 * Composes final HTML documents from enabled modules.
 * Orchestrates HTML/CSS generation and builds complete HTML pages ready for rendering.
 */
import type { ModuleData, CompositionOptions, CompositionResult } from './types';
/**
 * Default viewport dimensions (Instagram portrait format 4:5)
 */
declare const DEFAULT_VIEWPORT: {
    width: number;
    height: number;
};
/**
 * Google Fonts to include in the generated HTML
 * These fonts are available to all modules
 *
 * NOTE: Product Sans is Google's proprietary font and is NOT available
 * on Google Fonts. We include it here but it will fallback to system fonts.
 * Quicksand, Nunito, and Work Sans are good alternatives that look similar.
 */
declare const GOOGLE_FONTS: string[];
/**
 * Module rendering order (viewport -> card -> content)
 * Ordered by z-index for proper layering (background to foreground)
 */
declare const MODULE_ORDER: string[];
/**
 * Composes a complete HTML template from enabled modules
 *
 * @param enabledModules - Array of module IDs to render (e.g., ['viewport', 'card', 'textFields'])
 * @param moduleData - Data for each module keyed by module ID
 * @param options - Composition options (baseUrl, moduleOrder, etc.)
 * @returns Complete HTML document with CSS and module content
 */
export declare function composeTemplate(enabledModules: string[], moduleData: Record<string, ModuleData>, options?: CompositionOptions & {
    moduleOrder?: string[];
}): CompositionResult;
export { DEFAULT_VIEWPORT, MODULE_ORDER, GOOGLE_FONTS };
//# sourceMappingURL=compositer.d.ts.map