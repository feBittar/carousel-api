import { z } from 'zod';
/**
 * Layout direction for arrow and text
 */
export declare const arrowBottomTextLayoutEnum: z.ZodEnum<["vertical", "horizontal"]>;
export type ArrowBottomTextLayout = z.infer<typeof arrowBottomTextLayoutEnum>;
/**
 * Arrow Bottom Text Module Schema
 *
 * Combo of Arrow (SVG/image) + bottom text, commonly used in bottom corner for CTAs like "swipe up"
 */
export declare const arrowBottomTextSchema: z.ZodObject<{
    /** Enable/disable the entire module */
    enabled: z.ZodDefault<z.ZodBoolean>;
    /** Arrow image URL (SVG or PNG) */
    arrowImageUrl: z.ZodDefault<z.ZodString>;
    /** Arrow color override (for SVG) */
    arrowColor: z.ZodDefault<z.ZodString>;
    /** Arrow width (px or %) */
    arrowWidth: z.ZodDefault<z.ZodString>;
    /** Arrow height (px or %) */
    arrowHeight: z.ZodDefault<z.ZodString>;
    /** Bottom text content */
    bottomText: z.ZodDefault<z.ZodString>;
    /** Text style configuration */
    bottomTextStyle: z.ZodDefault<z.ZodObject<{
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
    /** Special position preset */
    specialPosition: z.ZodDefault<z.ZodEnum<["none", "top-left", "top-right", "bottom-left", "bottom-right", "top-center", "bottom-center", "center-left", "center-right", "center"]>>;
    /** Padding from edge (%) */
    padding: z.ZodDefault<z.ZodNumber>;
    /** Gap between arrow and text (px) */
    gapBetween: z.ZodDefault<z.ZodNumber>;
    /** Layout direction: arrow above text (vertical) or beside text (horizontal) */
    layout: z.ZodDefault<z.ZodEnum<["vertical", "horizontal"]>>;
}, "strip", z.ZodTypeAny, {
    padding?: number;
    layout?: "horizontal" | "vertical";
    enabled?: boolean;
    specialPosition?: "none" | "center" | "top-left" | "top-center" | "top-right" | "center-left" | "center-right" | "bottom-left" | "bottom-center" | "bottom-right";
    arrowColor?: string;
    arrowImageUrl?: string;
    arrowWidth?: string;
    arrowHeight?: string;
    bottomText?: string;
    bottomTextStyle?: {
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
    gapBetween?: number;
}, {
    padding?: number;
    layout?: "horizontal" | "vertical";
    enabled?: boolean;
    specialPosition?: "none" | "center" | "top-left" | "top-center" | "top-right" | "center-left" | "center-right" | "bottom-left" | "bottom-center" | "bottom-right";
    arrowColor?: string;
    arrowImageUrl?: string;
    arrowWidth?: string;
    arrowHeight?: string;
    bottomText?: string;
    bottomTextStyle?: {
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
    gapBetween?: number;
}>;
export type ArrowBottomTextData = z.infer<typeof arrowBottomTextSchema>;
/**
 * Default values for Arrow Bottom Text Module
 */
export declare const arrowBottomTextDefaults: ArrowBottomTextData;
//# sourceMappingURL=schema.d.ts.map