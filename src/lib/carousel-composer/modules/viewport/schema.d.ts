import { z } from 'zod';
/**
 * Content Wrapper padding schema
 */
export declare const contentWrapperPaddingSchema: z.ZodObject<{
    top: z.ZodDefault<z.ZodNumber>;
    right: z.ZodDefault<z.ZodNumber>;
    bottom: z.ZodDefault<z.ZodNumber>;
    left: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
}, {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
}>;
/**
 * Content Wrapper configuration (used when card is inactive)
 */
export declare const contentWrapperSchema: z.ZodObject<{
    padding: z.ZodDefault<z.ZodObject<{
        top: z.ZodDefault<z.ZodNumber>;
        right: z.ZodDefault<z.ZodNumber>;
        bottom: z.ZodDefault<z.ZodNumber>;
        left: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
    }, {
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
    }>>;
    gap: z.ZodDefault<z.ZodNumber>;
    layoutDirection: z.ZodDefault<z.ZodEnum<["column", "row"]>>;
    contentAlign: z.ZodDefault<z.ZodEnum<["flex-start", "center", "flex-end", "stretch", "space-between"]>>;
    justifyContent: z.ZodDefault<z.ZodEnum<["flex-start", "center", "flex-end", "space-between", "space-around"]>>;
}, "strip", z.ZodTypeAny, {
    padding?: {
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
    };
    gap?: number;
    layoutDirection?: "column" | "row";
    contentAlign?: "center" | "flex-start" | "flex-end" | "stretch" | "space-between";
    justifyContent?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around";
}, {
    padding?: {
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
    };
    gap?: number;
    layoutDirection?: "column" | "row";
    contentAlign?: "center" | "flex-start" | "flex-end" | "stretch" | "space-between";
    justifyContent?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around";
}>;
export type ContentWrapperConfig = z.infer<typeof contentWrapperSchema>;
/**
 * Schema Zod para o módulo Viewport
 * Define background (cor ou imagem), blur overlay, e gradient overlay
 */
export declare const viewportSchema: z.ZodObject<{
    backgroundType: z.ZodDefault<z.ZodEnum<["color", "image"]>>;
    backgroundColor: z.ZodDefault<z.ZodString>;
    backgroundImage: z.ZodDefault<z.ZodString>;
    blurEnabled: z.ZodDefault<z.ZodBoolean>;
    blurAmount: z.ZodDefault<z.ZodNumber>;
    gradientOverlay: z.ZodObject<{
        enabled: z.ZodDefault<z.ZodBoolean>;
        color: z.ZodOptional<z.ZodString>;
        startOpacity: z.ZodOptional<z.ZodNumber>;
        midOpacity: z.ZodOptional<z.ZodNumber>;
        endOpacity: z.ZodOptional<z.ZodNumber>;
        height: z.ZodOptional<z.ZodNumber>;
        direction: z.ZodOptional<z.ZodEnum<["to top", "to bottom", "to left", "to right"]>>;
        blendMode: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        color?: string;
        height?: number;
        enabled?: boolean;
        startOpacity?: number;
        midOpacity?: number;
        endOpacity?: number;
        direction?: "to top" | "to bottom" | "to left" | "to right";
        blendMode?: string;
    }, {
        color?: string;
        height?: number;
        enabled?: boolean;
        startOpacity?: number;
        midOpacity?: number;
        endOpacity?: number;
        direction?: "to top" | "to bottom" | "to left" | "to right";
        blendMode?: string;
    }>;
    contentWrapper: z.ZodDefault<z.ZodObject<{
        padding: z.ZodDefault<z.ZodObject<{
            top: z.ZodDefault<z.ZodNumber>;
            right: z.ZodDefault<z.ZodNumber>;
            bottom: z.ZodDefault<z.ZodNumber>;
            left: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            top?: number;
            bottom?: number;
            left?: number;
            right?: number;
        }, {
            top?: number;
            bottom?: number;
            left?: number;
            right?: number;
        }>>;
        gap: z.ZodDefault<z.ZodNumber>;
        layoutDirection: z.ZodDefault<z.ZodEnum<["column", "row"]>>;
        contentAlign: z.ZodDefault<z.ZodEnum<["flex-start", "center", "flex-end", "stretch", "space-between"]>>;
        justifyContent: z.ZodDefault<z.ZodEnum<["flex-start", "center", "flex-end", "space-between", "space-around"]>>;
    }, "strip", z.ZodTypeAny, {
        padding?: {
            top?: number;
            bottom?: number;
            left?: number;
            right?: number;
        };
        gap?: number;
        layoutDirection?: "column" | "row";
        contentAlign?: "center" | "flex-start" | "flex-end" | "stretch" | "space-between";
        justifyContent?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around";
    }, {
        padding?: {
            top?: number;
            bottom?: number;
            left?: number;
            right?: number;
        };
        gap?: number;
        layoutDirection?: "column" | "row";
        contentAlign?: "center" | "flex-start" | "flex-end" | "stretch" | "space-between";
        justifyContent?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around";
    }>>;
}, "strip", z.ZodTypeAny, {
    backgroundColor?: string;
    backgroundType?: "color" | "image";
    backgroundImage?: string;
    blurEnabled?: boolean;
    blurAmount?: number;
    gradientOverlay?: {
        color?: string;
        height?: number;
        enabled?: boolean;
        startOpacity?: number;
        midOpacity?: number;
        endOpacity?: number;
        direction?: "to top" | "to bottom" | "to left" | "to right";
        blendMode?: string;
    };
    contentWrapper?: {
        padding?: {
            top?: number;
            bottom?: number;
            left?: number;
            right?: number;
        };
        gap?: number;
        layoutDirection?: "column" | "row";
        contentAlign?: "center" | "flex-start" | "flex-end" | "stretch" | "space-between";
        justifyContent?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around";
    };
}, {
    backgroundColor?: string;
    backgroundType?: "color" | "image";
    backgroundImage?: string;
    blurEnabled?: boolean;
    blurAmount?: number;
    gradientOverlay?: {
        color?: string;
        height?: number;
        enabled?: boolean;
        startOpacity?: number;
        midOpacity?: number;
        endOpacity?: number;
        direction?: "to top" | "to bottom" | "to left" | "to right";
        blendMode?: string;
    };
    contentWrapper?: {
        padding?: {
            top?: number;
            bottom?: number;
            left?: number;
            right?: number;
        };
        gap?: number;
        layoutDirection?: "column" | "row";
        contentAlign?: "center" | "flex-start" | "flex-end" | "stretch" | "space-between";
        justifyContent?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around";
    };
}>;
export type ViewportData = z.infer<typeof viewportSchema>;
/**
 * Valores padrão para o módulo Viewport
 */
export declare const viewportDefaults: ViewportData;
//# sourceMappingURL=schema.d.ts.map