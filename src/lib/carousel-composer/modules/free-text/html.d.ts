import { ModuleData, RenderContext } from '../types';
/**
 * Generates HTML for the FreeText Module
 */
export declare function getFreeTextHtml(data: ModuleData, context?: RenderContext): string;
/**
 * Helper to generate free text placeholders for template replacement
 * Used by legacy templates that inject free text via {{freeText1}} syntax
 */
export declare function getFreeTextPlaceholders(data: ModuleData): Record<string, string>;
//# sourceMappingURL=html.d.ts.map