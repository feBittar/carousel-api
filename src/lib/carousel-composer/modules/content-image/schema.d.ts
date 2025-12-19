import { z } from 'zod';
/**
 * Shadow configuration for content image
 */
export declare const contentImageShadowSchema: z.ZodObject<{
    enabled: z.ZodDefault<z.ZodBoolean>;
    blur: z.ZodDefault<z.ZodNumber>;
    spread: z.ZodDefault<z.ZodNumber>;
    color: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    color?: string;
    enabled?: boolean;
    blur?: number;
    spread?: number;
}, {
    color?: string;
    enabled?: boolean;
    blur?: number;
    spread?: number;
}>;
export type ContentImageShadow = z.infer<typeof contentImageShadowSchema>;
/**
 * Content Image Module Schema
 * Supports both single image and comparison mode (2 images side by side)
 */
export declare const contentImageSchema: z.ZodObject<{
    /** Enable/disable the content image section */
    enabled: z.ZodDefault<z.ZodBoolean>;
    /** Image URL for single mode */
    url: z.ZodDefault<z.ZodString>;
    /** Border radius in pixels */
    borderRadius: z.ZodDefault<z.ZodNumber>;
    /** Maximum width as percentage of container (0-100) */
    maxWidth: z.ZodDefault<z.ZodNumber>;
    /** Maximum height as percentage of container (0-100) */
    maxHeight: z.ZodDefault<z.ZodNumber>;
    /** How the image fits in its container */
    objectFit: z.ZodDefault<z.ZodEnum<["cover", "contain", "fill"]>>;
    /** Vertical positioning of image within container */
    position: z.ZodDefault<z.ZodEnum<["top", "center", "bottom"]>>;
    /** Shadow configuration */
    shadow: z.ZodDefault<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodBoolean>;
        blur: z.ZodDefault<z.ZodNumber>;
        spread: z.ZodDefault<z.ZodNumber>;
        color: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        color?: string;
        enabled?: boolean;
        blur?: number;
        spread?: number;
    }, {
        color?: string;
        enabled?: boolean;
        blur?: number;
        spread?: number;
    }>>;
    /** Display mode: single image or comparison (2 images side by side) */
    mode: z.ZodDefault<z.ZodEnum<["single", "comparison"]>>;
    /** Gap between images in comparison mode (px) */
    comparisonGap: z.ZodDefault<z.ZodNumber>;
    /** Second image URL for comparison mode */
    url2: z.ZodDefault<z.ZodString>;
    /** Layout width in horizontal card layouts (percentage or CSS value) */
    layoutWidth: z.ZodDefault<z.ZodString>;
    /** Align-self in horizontal card layouts */
    alignSelf: z.ZodDefault<z.ZodEnum<["auto", "flex-start", "center", "flex-end", "stretch"]>>;
}, "strip", z.ZodTypeAny, {
    url?: string;
    enabled?: boolean;
    mode?: "single" | "comparison";
    borderRadius?: number;
    shadow?: {
        color?: string;
        enabled?: boolean;
        blur?: number;
        spread?: number;
    };
    layoutWidth?: string;
    alignSelf?: "center" | "auto" | "flex-start" | "flex-end" | "stretch";
    url2?: string;
    comparisonGap?: number;
    maxWidth?: number;
    maxHeight?: number;
    objectFit?: "fill" | "cover" | "contain";
    position?: "center" | "top" | "bottom";
}, {
    url?: string;
    enabled?: boolean;
    mode?: "single" | "comparison";
    borderRadius?: number;
    shadow?: {
        color?: string;
        enabled?: boolean;
        blur?: number;
        spread?: number;
    };
    layoutWidth?: string;
    alignSelf?: "center" | "auto" | "flex-start" | "flex-end" | "stretch";
    url2?: string;
    comparisonGap?: number;
    maxWidth?: number;
    maxHeight?: number;
    objectFit?: "fill" | "cover" | "contain";
    position?: "center" | "top" | "bottom";
}>;
export type ContentImageData = z.infer<typeof contentImageSchema>;
//# sourceMappingURL=schema.d.ts.map