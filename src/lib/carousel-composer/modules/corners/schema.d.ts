import { z } from 'zod';
/**
 * Corner element type
 */
export declare const cornerTypeEnum: z.ZodEnum<["none", "text", "svg"]>;
export type CornerType = z.infer<typeof cornerTypeEnum>;
/**
 * Special position for corner placement
 */
export declare const cornerSpecialPositionEnum: z.ZodEnum<["none", "top-left", "top-right", "bottom-left", "bottom-right"]>;
export type CornerSpecialPosition = z.infer<typeof cornerSpecialPositionEnum>;
/**
 * Single corner configuration
 */
export declare const cornerSchema: z.ZodObject<{
    /** Type of corner content */
    type: z.ZodDefault<z.ZodEnum<["none", "text", "svg"]>>;
    /** Text content (when type = 'text') */
    text: z.ZodDefault<z.ZodString>;
    /** Text styling (when type = 'text') */
    textStyle: z.ZodDefault<z.ZodObject<{
        fontFamily: z.ZodOptional<z.ZodString>;
        fontSize: z.ZodOptional<z.ZodString>;
        fontWeight: z.ZodOptional<z.ZodString>;
        color: z.ZodOptional<z.ZodString>;
        backgroundColor: z.ZodOptional<z.ZodString>;
        textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
        lineHeight: z.ZodOptional<z.ZodString>;
        letterSpacing: z.ZodOptional<z.ZodString>;
        textTransform: z.ZodOptional<z.ZodEnum<["none", "uppercase", "lowercase", "capitalize"]>>;
        textShadow: z.ZodOptional<z.ZodString>;
        textDecoration: z.ZodOptional<z.ZodString>;
        padding: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        color?: string;
        fontFamily?: string;
        fontSize?: string;
        fontWeight?: string;
        backgroundColor?: string;
        textAlign?: "center" | "left" | "right";
        lineHeight?: string;
        letterSpacing?: string;
        textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
        textShadow?: string;
        textDecoration?: string;
        padding?: string;
    }, {
        color?: string;
        fontFamily?: string;
        fontSize?: string;
        fontWeight?: string;
        backgroundColor?: string;
        textAlign?: "center" | "left" | "right";
        lineHeight?: string;
        letterSpacing?: string;
        textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
        textShadow?: string;
        textDecoration?: string;
        padding?: string;
    }>>;
    /** Background enabled for text */
    backgroundEnabled: z.ZodDefault<z.ZodBoolean>;
    /** SVG content inline (when type = 'svg') */
    svgContent: z.ZodDefault<z.ZodString>;
    /** SVG URL (when type = 'svg') */
    svgUrl: z.ZodDefault<z.ZodString>;
    /** SVG color override */
    svgColor: z.ZodDefault<z.ZodString>;
    /** SVG width */
    svgWidth: z.ZodDefault<z.ZodString>;
    /** SVG height */
    svgHeight: z.ZodDefault<z.ZodString>;
    /** Special position preset */
    specialPosition: z.ZodDefault<z.ZodEnum<["none", "top-left", "top-right", "bottom-left", "bottom-right"]>>;
    /** Padding from edge (X axis) in pixels */
    paddingX: z.ZodDefault<z.ZodNumber>;
    /** Padding from edge (Y axis) in pixels */
    paddingY: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    type?: "text" | "none" | "svg";
    text?: string;
    specialPosition?: "none" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
    textStyle?: {
        color?: string;
        fontFamily?: string;
        fontSize?: string;
        fontWeight?: string;
        backgroundColor?: string;
        textAlign?: "center" | "left" | "right";
        lineHeight?: string;
        letterSpacing?: string;
        textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
        textShadow?: string;
        textDecoration?: string;
        padding?: string;
    };
    backgroundEnabled?: boolean;
    svgContent?: string;
    svgUrl?: string;
    svgColor?: string;
    svgWidth?: string;
    svgHeight?: string;
    paddingX?: number;
    paddingY?: number;
}, {
    type?: "text" | "none" | "svg";
    text?: string;
    specialPosition?: "none" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
    textStyle?: {
        color?: string;
        fontFamily?: string;
        fontSize?: string;
        fontWeight?: string;
        backgroundColor?: string;
        textAlign?: "center" | "left" | "right";
        lineHeight?: string;
        letterSpacing?: string;
        textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
        textShadow?: string;
        textDecoration?: string;
        padding?: string;
    };
    backgroundEnabled?: boolean;
    svgContent?: string;
    svgUrl?: string;
    svgColor?: string;
    svgWidth?: string;
    svgHeight?: string;
    paddingX?: number;
    paddingY?: number;
}>;
export type Corner = z.infer<typeof cornerSchema>;
/**
 * Corners Module Schema
 * Array of 4 corners (top-left, top-right, bottom-left, bottom-right)
 */
export declare const cornersSchema: z.ZodObject<{
    /** Array of 4 corners */
    corners: z.ZodDefault<z.ZodArray<z.ZodObject<{
        /** Type of corner content */
        type: z.ZodDefault<z.ZodEnum<["none", "text", "svg"]>>;
        /** Text content (when type = 'text') */
        text: z.ZodDefault<z.ZodString>;
        /** Text styling (when type = 'text') */
        textStyle: z.ZodDefault<z.ZodObject<{
            fontFamily: z.ZodOptional<z.ZodString>;
            fontSize: z.ZodOptional<z.ZodString>;
            fontWeight: z.ZodOptional<z.ZodString>;
            color: z.ZodOptional<z.ZodString>;
            backgroundColor: z.ZodOptional<z.ZodString>;
            textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
            lineHeight: z.ZodOptional<z.ZodString>;
            letterSpacing: z.ZodOptional<z.ZodString>;
            textTransform: z.ZodOptional<z.ZodEnum<["none", "uppercase", "lowercase", "capitalize"]>>;
            textShadow: z.ZodOptional<z.ZodString>;
            textDecoration: z.ZodOptional<z.ZodString>;
            padding: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            color?: string;
            fontFamily?: string;
            fontSize?: string;
            fontWeight?: string;
            backgroundColor?: string;
            textAlign?: "center" | "left" | "right";
            lineHeight?: string;
            letterSpacing?: string;
            textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
            textShadow?: string;
            textDecoration?: string;
            padding?: string;
        }, {
            color?: string;
            fontFamily?: string;
            fontSize?: string;
            fontWeight?: string;
            backgroundColor?: string;
            textAlign?: "center" | "left" | "right";
            lineHeight?: string;
            letterSpacing?: string;
            textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
            textShadow?: string;
            textDecoration?: string;
            padding?: string;
        }>>;
        /** Background enabled for text */
        backgroundEnabled: z.ZodDefault<z.ZodBoolean>;
        /** SVG content inline (when type = 'svg') */
        svgContent: z.ZodDefault<z.ZodString>;
        /** SVG URL (when type = 'svg') */
        svgUrl: z.ZodDefault<z.ZodString>;
        /** SVG color override */
        svgColor: z.ZodDefault<z.ZodString>;
        /** SVG width */
        svgWidth: z.ZodDefault<z.ZodString>;
        /** SVG height */
        svgHeight: z.ZodDefault<z.ZodString>;
        /** Special position preset */
        specialPosition: z.ZodDefault<z.ZodEnum<["none", "top-left", "top-right", "bottom-left", "bottom-right"]>>;
        /** Padding from edge (X axis) in pixels */
        paddingX: z.ZodDefault<z.ZodNumber>;
        /** Padding from edge (Y axis) in pixels */
        paddingY: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        type?: "text" | "none" | "svg";
        text?: string;
        specialPosition?: "none" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
        textStyle?: {
            color?: string;
            fontFamily?: string;
            fontSize?: string;
            fontWeight?: string;
            backgroundColor?: string;
            textAlign?: "center" | "left" | "right";
            lineHeight?: string;
            letterSpacing?: string;
            textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
            textShadow?: string;
            textDecoration?: string;
            padding?: string;
        };
        backgroundEnabled?: boolean;
        svgContent?: string;
        svgUrl?: string;
        svgColor?: string;
        svgWidth?: string;
        svgHeight?: string;
        paddingX?: number;
        paddingY?: number;
    }, {
        type?: "text" | "none" | "svg";
        text?: string;
        specialPosition?: "none" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
        textStyle?: {
            color?: string;
            fontFamily?: string;
            fontSize?: string;
            fontWeight?: string;
            backgroundColor?: string;
            textAlign?: "center" | "left" | "right";
            lineHeight?: string;
            letterSpacing?: string;
            textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
            textShadow?: string;
            textDecoration?: string;
            padding?: string;
        };
        backgroundEnabled?: boolean;
        svgContent?: string;
        svgUrl?: string;
        svgColor?: string;
        svgWidth?: string;
        svgHeight?: string;
        paddingX?: number;
        paddingY?: number;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    corners?: {
        type?: "text" | "none" | "svg";
        text?: string;
        specialPosition?: "none" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
        textStyle?: {
            color?: string;
            fontFamily?: string;
            fontSize?: string;
            fontWeight?: string;
            backgroundColor?: string;
            textAlign?: "center" | "left" | "right";
            lineHeight?: string;
            letterSpacing?: string;
            textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
            textShadow?: string;
            textDecoration?: string;
            padding?: string;
        };
        backgroundEnabled?: boolean;
        svgContent?: string;
        svgUrl?: string;
        svgColor?: string;
        svgWidth?: string;
        svgHeight?: string;
        paddingX?: number;
        paddingY?: number;
    }[];
}, {
    corners?: {
        type?: "text" | "none" | "svg";
        text?: string;
        specialPosition?: "none" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
        textStyle?: {
            color?: string;
            fontFamily?: string;
            fontSize?: string;
            fontWeight?: string;
            backgroundColor?: string;
            textAlign?: "center" | "left" | "right";
            lineHeight?: string;
            letterSpacing?: string;
            textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
            textShadow?: string;
            textDecoration?: string;
            padding?: string;
        };
        backgroundEnabled?: boolean;
        svgContent?: string;
        svgUrl?: string;
        svgColor?: string;
        svgWidth?: string;
        svgHeight?: string;
        paddingX?: number;
        paddingY?: number;
    }[];
}>;
export type CornersData = z.infer<typeof cornersSchema>;
/**
 * Default values for Corners Module
 */
export declare const cornersDefaults: CornersData;
//# sourceMappingURL=schema.d.ts.map