import { z } from 'zod';
/**
 * Special position options for card
 */
export declare const SPECIAL_POSITIONS: readonly ["none", "center", "top-left", "top-center", "top-right", "center-left", "center-right", "bottom-left", "bottom-center", "bottom-right"];
export type SpecialPosition = typeof SPECIAL_POSITIONS[number];
/**
 * Padding configuration for card
 */
export declare const cardPaddingSchema: z.ZodObject<{
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
export type CardPadding = z.infer<typeof cardPaddingSchema>;
/**
 * Shadow configuration for card
 */
export declare const cardShadowSchema: z.ZodObject<{
    enabled: z.ZodDefault<z.ZodBoolean>;
    x: z.ZodDefault<z.ZodNumber>;
    y: z.ZodDefault<z.ZodNumber>;
    blur: z.ZodDefault<z.ZodNumber>;
    spread: z.ZodDefault<z.ZodNumber>;
    color: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    x?: number;
    y?: number;
    color?: string;
    enabled?: boolean;
    blur?: number;
    spread?: number;
}, {
    x?: number;
    y?: number;
    color?: string;
    enabled?: boolean;
    blur?: number;
    spread?: number;
}>;
export type CardShadow = z.infer<typeof cardShadowSchema>;
/**
 * Card Module Schema
 * Defines a centered container for content with customizable styling
 */
export declare const cardSchema: z.ZodObject<{
    /** Enable/disable the card */
    enabled: z.ZodDefault<z.ZodBoolean>;
    /** Width as percentage of viewport (0-100) */
    width: z.ZodDefault<z.ZodNumber>;
    /** Height as percentage of viewport (0-100) */
    height: z.ZodDefault<z.ZodNumber>;
    /** Special position preset */
    specialPosition: z.ZodDefault<z.ZodEnum<["none", "center", "top-left", "top-center", "top-right", "center-left", "center-right", "bottom-left", "bottom-center", "bottom-right"]>>;
    /** Padding from edge when using special position (px) */
    positionPadding: z.ZodDefault<z.ZodNumber>;
    /** Border radius in pixels */
    borderRadius: z.ZodDefault<z.ZodNumber>;
    /** Background type: solid color or image */
    backgroundType: z.ZodDefault<z.ZodEnum<["color", "image"]>>;
    /** Background color (hex) */
    backgroundColor: z.ZodDefault<z.ZodString>;
    /** Background image URL */
    backgroundImage: z.ZodDefault<z.ZodString>;
    /** Padding configuration */
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
    /** Gradient overlay configuration */
    gradientOverlay: z.ZodDefault<z.ZodObject<{
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
    }>>;
    /** Box shadow configuration */
    shadow: z.ZodDefault<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodBoolean>;
        x: z.ZodDefault<z.ZodNumber>;
        y: z.ZodDefault<z.ZodNumber>;
        blur: z.ZodDefault<z.ZodNumber>;
        spread: z.ZodDefault<z.ZodNumber>;
        color: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        x?: number;
        y?: number;
        color?: string;
        enabled?: boolean;
        blur?: number;
        spread?: number;
    }, {
        x?: number;
        y?: number;
        color?: string;
        enabled?: boolean;
        blur?: number;
        spread?: number;
    }>>;
    /** Layout direction for content modules (vertical or horizontal) */
    layoutDirection: z.ZodDefault<z.ZodEnum<["column", "row"]>>;
    /** Gap between content modules */
    contentGap: z.ZodDefault<z.ZodString>;
    /** Horizontal alignment of content modules (align-items) */
    contentAlign: z.ZodDefault<z.ZodEnum<["flex-start", "center", "flex-end", "stretch"]>>;
    /** Vertical alignment of content modules (justify-content) */
    verticalAlign: z.ZodDefault<z.ZodEnum<["flex-start", "center", "flex-end", "space-between", "space-around", "space-evenly"]>>;
}, "strip", z.ZodTypeAny, {
    backgroundColor?: string;
    padding?: {
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
    };
    width?: number;
    height?: number;
    enabled?: boolean;
    layoutDirection?: "column" | "row";
    contentAlign?: "center" | "flex-start" | "flex-end" | "stretch";
    backgroundType?: "color" | "image";
    backgroundImage?: string;
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
    specialPosition?: "none" | "center" | "top-left" | "top-center" | "top-right" | "center-left" | "center-right" | "bottom-left" | "bottom-center" | "bottom-right";
    positionPadding?: number;
    borderRadius?: number;
    shadow?: {
        x?: number;
        y?: number;
        color?: string;
        enabled?: boolean;
        blur?: number;
        spread?: number;
    };
    contentGap?: string;
    verticalAlign?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly";
}, {
    backgroundColor?: string;
    padding?: {
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
    };
    width?: number;
    height?: number;
    enabled?: boolean;
    layoutDirection?: "column" | "row";
    contentAlign?: "center" | "flex-start" | "flex-end" | "stretch";
    backgroundType?: "color" | "image";
    backgroundImage?: string;
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
    specialPosition?: "none" | "center" | "top-left" | "top-center" | "top-right" | "center-left" | "center-right" | "bottom-left" | "bottom-center" | "bottom-right";
    positionPadding?: number;
    borderRadius?: number;
    shadow?: {
        x?: number;
        y?: number;
        color?: string;
        enabled?: boolean;
        blur?: number;
        spread?: number;
    };
    contentGap?: string;
    verticalAlign?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly";
}>;
export type CardData = z.infer<typeof cardSchema>;
//# sourceMappingURL=schema.d.ts.map