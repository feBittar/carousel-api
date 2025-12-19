import { ModuleData, RenderContext } from '../types';
/**
 * Generates HTML for the Corners Module
 */
export declare function getCornersHtml(data: ModuleData, context?: RenderContext): string;
/**
 * Helper to generate corner content placeholders for template replacement
 * Used by legacy templates that inject corners via {{{corner1Content}}} syntax
 */
export declare function getCornerPlaceholders(data: ModuleData, baseUrl?: string): Record<string, string>;
//# sourceMappingURL=html.d.ts.map