import { DuoModuleConfig } from './schema';
import { RenderContext } from '../types';
/**
 * Generate HTML structure for the Duo module
 *
 * This creates:
 * - .duo-wrapper container with 2 .duo-slide divs
 * - Central image positioned between slides
 * - Placeholders for slide content
 */
export declare function generateDuoHTML(config: DuoModuleConfig, slideContent: string, baseUrl?: string): string;
/**
 * Wrap existing template HTML with Duo structure
 *
 * This function:
 * 1. Extracts the body content from the original template
 * 2. Wraps it in .duo-wrapper with 2 .duo-slide containers
 * 3. Adds the center image
 * 4. Injects Duo CSS
 */
export declare function wrapTemplateWithDuo(originalHTML: string, config: DuoModuleConfig, duoCSS: string, baseUrl?: string): string;
/**
 * Modify final HTML to wrap content with Duo structure
 * This is called by the compositer after all modules have generated their HTML
 */
export declare function modifyFinalHTMLForDuo(html: string, config: DuoModuleConfig, context: RenderContext): string;
//# sourceMappingURL=html.d.ts.map