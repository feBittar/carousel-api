import { z } from 'zod';
/**
 * Texture Overlay Module Schema
 * Defines a texture overlay that sits above the viewport/card background but below content
 */
export declare const textureOverlaySchema: z.ZodObject<{
    /** Enable/disable the texture overlay */
    enabled: z.ZodDefault<z.ZodBoolean>;
    /** URL to the texture image */
    textureUrl: z.ZodDefault<z.ZodString>;
    /** Opacity of the texture overlay (0-1) */
    opacity: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    enabled?: boolean;
    opacity?: number;
    textureUrl?: string;
}, {
    enabled?: boolean;
    opacity?: number;
    textureUrl?: string;
}>;
export type TextureOverlayData = z.infer<typeof textureOverlaySchema>;
/**
 * Default values for the Texture Overlay module
 */
export declare const textureOverlayDefaults: TextureOverlayData;
//# sourceMappingURL=schema.d.ts.map