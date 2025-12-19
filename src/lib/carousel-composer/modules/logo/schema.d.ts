import { z } from 'zod';
/**
 * CSS filter options for logo styling
 */
export declare const logoFilterEnum: z.ZodEnum<["none", "grayscale", "invert", "brightness", "contrast", "sepia"]>;
export type LogoFilter = z.infer<typeof logoFilterEnum>;
/**
 * Logo Module Schema
 * Displays a single logo image that can be positioned anywhere on the viewport
 */
export declare const logoSchema: z.ZodObject<{
    /** Whether the logo is enabled */
    enabled: z.ZodDefault<z.ZodBoolean>;
    /** Logo image URL */
    logoUrl: z.ZodDefault<z.ZodString>;
    /** Logo width (px, %, or 'auto') */
    width: z.ZodDefault<z.ZodString>;
    /** Logo height (px, %, or 'auto') */
    height: z.ZodDefault<z.ZodString>;
    /** Special position preset (or 'none' for manual positioning) */
    specialPosition: z.ZodDefault<z.ZodEnum<["none", "top-left", "top-right", "bottom-left", "bottom-right", "top-center", "bottom-center", "center-left", "center-right", "center"]>>;
    /** Manual position - top (only used when specialPosition is 'none') */
    top: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    /** Manual position - left (only used when specialPosition is 'none') */
    left: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    /** Manual position - right (only used when specialPosition is 'none') */
    right: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    /** Manual position - bottom (only used when specialPosition is 'none') */
    bottom: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    /** Padding from edge (X axis) in pixels (used with special positions) */
    paddingX: z.ZodDefault<z.ZodNumber>;
    /** Padding from edge (Y axis) in pixels (used with special positions) */
    paddingY: z.ZodDefault<z.ZodNumber>;
    /** Logo opacity (0-1) */
    opacity: z.ZodDefault<z.ZodNumber>;
    /** CSS filter effect */
    filter: z.ZodDefault<z.ZodEnum<["none", "grayscale", "invert", "brightness", "contrast", "sepia"]>>;
    /** Filter intensity (0-100) - used for brightness, contrast, etc. */
    filterIntensity: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    filter?: "none" | "grayscale" | "invert" | "brightness" | "contrast" | "sepia";
    top?: string | number;
    bottom?: string | number;
    left?: string | number;
    right?: string | number;
    width?: string;
    height?: string;
    enabled?: boolean;
    opacity?: number;
    specialPosition?: "none" | "center" | "top-left" | "top-center" | "top-right" | "center-left" | "center-right" | "bottom-left" | "bottom-center" | "bottom-right";
    paddingX?: number;
    paddingY?: number;
    logoUrl?: string;
    filterIntensity?: number;
}, {
    filter?: "none" | "grayscale" | "invert" | "brightness" | "contrast" | "sepia";
    top?: string | number;
    bottom?: string | number;
    left?: string | number;
    right?: string | number;
    width?: string;
    height?: string;
    enabled?: boolean;
    opacity?: number;
    specialPosition?: "none" | "center" | "top-left" | "top-center" | "top-right" | "center-left" | "center-right" | "bottom-left" | "bottom-center" | "bottom-right";
    paddingX?: number;
    paddingY?: number;
    logoUrl?: string;
    filterIntensity?: number;
}>;
export type LogoData = z.infer<typeof logoSchema>;
/**
 * Default values for Logo Module
 */
export declare const logoDefaults: LogoData;
//# sourceMappingURL=schema.d.ts.map