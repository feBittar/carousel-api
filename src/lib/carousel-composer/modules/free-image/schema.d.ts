import { z } from 'zod';
/**
 * Outline effect schema for free image
 */
export declare const freeImageOutlineEffectSchema: z.ZodObject<{
    enabled: z.ZodDefault<z.ZodBoolean>;
    color: z.ZodDefault<z.ZodString>;
    size: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    size?: number;
    color?: string;
    enabled?: boolean;
}, {
    size?: number;
    color?: string;
    enabled?: boolean;
}>;
/**
 * Free Image Module Schema
 * Validates configuration for a free-positioned image in carousel mode
 */
export declare const freeImageSchema: z.ZodObject<{
    /** Enable/disable the free image */
    enabled: z.ZodDefault<z.ZodBoolean>;
    /** Image URL (PNG recommended for transparency) */
    url: z.ZodDefault<z.ZodString>;
    /** Horizontal offset from center in pixels */
    offsetX: z.ZodDefault<z.ZodNumber>;
    /** Vertical offset from center in pixels */
    offsetY: z.ZodDefault<z.ZodNumber>;
    /** Scale as percentage (100 = original size) */
    scale: z.ZodDefault<z.ZodNumber>;
    /** Rotation in degrees */
    rotation: z.ZodDefault<z.ZodNumber>;
    /** Outline effect configuration */
    outlineEffect: z.ZodDefault<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodBoolean>;
        color: z.ZodDefault<z.ZodString>;
        size: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        size?: number;
        color?: string;
        enabled?: boolean;
    }, {
        size?: number;
        color?: string;
        enabled?: boolean;
    }>>;
}, "strip", z.ZodTypeAny, {
    url?: string;
    enabled?: boolean;
    scale?: number;
    rotation?: number;
    offsetX?: number;
    offsetY?: number;
    outlineEffect?: {
        size?: number;
        color?: string;
        enabled?: boolean;
    };
}, {
    url?: string;
    enabled?: boolean;
    scale?: number;
    rotation?: number;
    offsetX?: number;
    offsetY?: number;
    outlineEffect?: {
        size?: number;
        color?: string;
        enabled?: boolean;
    };
}>;
export type FreeImageData = z.infer<typeof freeImageSchema>;
export type FreeImageOutlineEffect = z.infer<typeof freeImageOutlineEffectSchema>;
//# sourceMappingURL=schema.d.ts.map