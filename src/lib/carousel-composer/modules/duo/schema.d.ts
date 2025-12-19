import { z } from 'zod';
/**
 * Duo Module Schema
 *
 * This module transforms any template into a 2-slide version by:
 * 1. Doubling the viewport width (1080px -> 2160px)
 * 2. Duplicating the content side-by-side (mirror or independent)
 * 3. Adding a central image that connects both slides
 * 4. Generating 2 separate PNG files
 */
export declare const duoModuleSchema: z.ZodObject<{
    enabled: z.ZodDefault<z.ZodBoolean>;
    mode: z.ZodDefault<z.ZodEnum<["mirror", "independent"]>>;
    centerImageUrl: z.ZodDefault<z.ZodString>;
    centerImageOffsetX: z.ZodDefault<z.ZodNumber>;
    centerImageOffsetY: z.ZodDefault<z.ZodNumber>;
    centerImageScale: z.ZodDefault<z.ZodNumber>;
    centerImageRotation: z.ZodDefault<z.ZodNumber>;
    mirrorContent: z.ZodDefault<z.ZodBoolean>;
    slides: z.ZodOptional<z.ZodObject<{
        slide1: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        slide2: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strip", z.ZodTypeAny, {
        slide1?: Record<string, any>;
        slide2?: Record<string, any>;
    }, {
        slide1?: Record<string, any>;
        slide2?: Record<string, any>;
    }>>;
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
    enabled?: boolean;
    mode?: "mirror" | "independent";
    outlineEffect?: {
        size?: number;
        color?: string;
        enabled?: boolean;
    };
    centerImageUrl?: string;
    centerImageOffsetX?: number;
    centerImageOffsetY?: number;
    centerImageScale?: number;
    centerImageRotation?: number;
    mirrorContent?: boolean;
    slides?: {
        slide1?: Record<string, any>;
        slide2?: Record<string, any>;
    };
}, {
    enabled?: boolean;
    mode?: "mirror" | "independent";
    outlineEffect?: {
        size?: number;
        color?: string;
        enabled?: boolean;
    };
    centerImageUrl?: string;
    centerImageOffsetX?: number;
    centerImageOffsetY?: number;
    centerImageScale?: number;
    centerImageRotation?: number;
    mirrorContent?: boolean;
    slides?: {
        slide1?: Record<string, any>;
        slide2?: Record<string, any>;
    };
}>;
export type DuoModuleConfig = z.infer<typeof duoModuleSchema>;
export declare const duoModuleDefaults: DuoModuleConfig;
//# sourceMappingURL=schema.d.ts.map