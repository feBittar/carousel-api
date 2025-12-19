import { z } from 'zod';
/**
 * Single SVG element configuration
 */
export declare const svgElementSchema: z.ZodObject<{
    /** Enable/disable this SVG element */
    enabled: z.ZodDefault<z.ZodBoolean>;
    /** SVG URL or path */
    svgUrl: z.ZodDefault<z.ZodString>;
    /** SVG color override (applied via CSS filter) */
    color: z.ZodDefault<z.ZodString>;
    /** SVG width */
    width: z.ZodDefault<z.ZodString>;
    /** SVG height */
    height: z.ZodDefault<z.ZodString>;
    /** Manual position (px or %) - used when specialPosition is 'none' */
    position: z.ZodDefault<z.ZodObject<{
        top: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        left: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        right: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        bottom: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        width: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        height: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    }, "strip", z.ZodTypeAny, {
        top?: string | number;
        bottom?: string | number;
        left?: string | number;
        right?: string | number;
        width?: string | number;
        height?: string | number;
    }, {
        top?: string | number;
        bottom?: string | number;
        left?: string | number;
        right?: string | number;
        width?: string | number;
        height?: string | number;
    }>>;
    /** Special position preset */
    specialPosition: z.ZodDefault<z.ZodEnum<["none", "top-left", "top-right", "bottom-left", "bottom-right", "top-center", "bottom-center", "center-left", "center-right", "center"]>>;
    /** Padding from edge when using special position (percentage 0-20) */
    specialPadding: z.ZodDefault<z.ZodNumber>;
    /** Rotation in degrees (0-360) */
    rotation: z.ZodDefault<z.ZodNumber>;
    /** Opacity (0-1) */
    opacity: z.ZodDefault<z.ZodNumber>;
    /** Z-index override (optional, defaults to module z-index) */
    zIndexOverride: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    color?: string;
    width?: string;
    height?: string;
    enabled?: boolean;
    opacity?: number;
    specialPosition?: "none" | "center" | "top-left" | "top-center" | "top-right" | "center-left" | "center-right" | "bottom-left" | "bottom-center" | "bottom-right";
    position?: {
        top?: string | number;
        bottom?: string | number;
        left?: string | number;
        right?: string | number;
        width?: string | number;
        height?: string | number;
    };
    rotation?: number;
    specialPadding?: number;
    svgUrl?: string;
    zIndexOverride?: number;
}, {
    color?: string;
    width?: string;
    height?: string;
    enabled?: boolean;
    opacity?: number;
    specialPosition?: "none" | "center" | "top-left" | "top-center" | "top-right" | "center-left" | "center-right" | "bottom-left" | "bottom-center" | "bottom-right";
    position?: {
        top?: string | number;
        bottom?: string | number;
        left?: string | number;
        right?: string | number;
        width?: string | number;
        height?: string | number;
    };
    rotation?: number;
    specialPadding?: number;
    svgUrl?: string;
    zIndexOverride?: number;
}>;
export type SvgElement = z.infer<typeof svgElementSchema>;
/**
 * SVGElements Module Schema
 * Manages positioned SVG elements (icons, decorations, logos)
 */
export declare const svgElementsSchema: z.ZodObject<{
    /** Array of SVG element configurations (up to 3) */
    svgElements: z.ZodDefault<z.ZodArray<z.ZodObject<{
        /** Enable/disable this SVG element */
        enabled: z.ZodDefault<z.ZodBoolean>;
        /** SVG URL or path */
        svgUrl: z.ZodDefault<z.ZodString>;
        /** SVG color override (applied via CSS filter) */
        color: z.ZodDefault<z.ZodString>;
        /** SVG width */
        width: z.ZodDefault<z.ZodString>;
        /** SVG height */
        height: z.ZodDefault<z.ZodString>;
        /** Manual position (px or %) - used when specialPosition is 'none' */
        position: z.ZodDefault<z.ZodObject<{
            top: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
            left: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
            right: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
            bottom: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
            width: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
            height: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        }, "strip", z.ZodTypeAny, {
            top?: string | number;
            bottom?: string | number;
            left?: string | number;
            right?: string | number;
            width?: string | number;
            height?: string | number;
        }, {
            top?: string | number;
            bottom?: string | number;
            left?: string | number;
            right?: string | number;
            width?: string | number;
            height?: string | number;
        }>>;
        /** Special position preset */
        specialPosition: z.ZodDefault<z.ZodEnum<["none", "top-left", "top-right", "bottom-left", "bottom-right", "top-center", "bottom-center", "center-left", "center-right", "center"]>>;
        /** Padding from edge when using special position (percentage 0-20) */
        specialPadding: z.ZodDefault<z.ZodNumber>;
        /** Rotation in degrees (0-360) */
        rotation: z.ZodDefault<z.ZodNumber>;
        /** Opacity (0-1) */
        opacity: z.ZodDefault<z.ZodNumber>;
        /** Z-index override (optional, defaults to module z-index) */
        zIndexOverride: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        color?: string;
        width?: string;
        height?: string;
        enabled?: boolean;
        opacity?: number;
        specialPosition?: "none" | "center" | "top-left" | "top-center" | "top-right" | "center-left" | "center-right" | "bottom-left" | "bottom-center" | "bottom-right";
        position?: {
            top?: string | number;
            bottom?: string | number;
            left?: string | number;
            right?: string | number;
            width?: string | number;
            height?: string | number;
        };
        rotation?: number;
        specialPadding?: number;
        svgUrl?: string;
        zIndexOverride?: number;
    }, {
        color?: string;
        width?: string;
        height?: string;
        enabled?: boolean;
        opacity?: number;
        specialPosition?: "none" | "center" | "top-left" | "top-center" | "top-right" | "center-left" | "center-right" | "bottom-left" | "bottom-center" | "bottom-right";
        position?: {
            top?: string | number;
            bottom?: string | number;
            left?: string | number;
            right?: string | number;
            width?: string | number;
            height?: string | number;
        };
        rotation?: number;
        specialPadding?: number;
        svgUrl?: string;
        zIndexOverride?: number;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    svgElements?: {
        color?: string;
        width?: string;
        height?: string;
        enabled?: boolean;
        opacity?: number;
        specialPosition?: "none" | "center" | "top-left" | "top-center" | "top-right" | "center-left" | "center-right" | "bottom-left" | "bottom-center" | "bottom-right";
        position?: {
            top?: string | number;
            bottom?: string | number;
            left?: string | number;
            right?: string | number;
            width?: string | number;
            height?: string | number;
        };
        rotation?: number;
        specialPadding?: number;
        svgUrl?: string;
        zIndexOverride?: number;
    }[];
}, {
    svgElements?: {
        color?: string;
        width?: string;
        height?: string;
        enabled?: boolean;
        opacity?: number;
        specialPosition?: "none" | "center" | "top-left" | "top-center" | "top-right" | "center-left" | "center-right" | "bottom-left" | "bottom-center" | "bottom-right";
        position?: {
            top?: string | number;
            bottom?: string | number;
            left?: string | number;
            right?: string | number;
            width?: string | number;
            height?: string | number;
        };
        rotation?: number;
        specialPadding?: number;
        svgUrl?: string;
        zIndexOverride?: number;
    }[];
}>;
export type SvgElementsData = z.infer<typeof svgElementsSchema>;
/**
 * Default values for SVGElements Module
 */
export declare const svgElementsDefaults: SvgElementsData;
//# sourceMappingURL=schema.d.ts.map