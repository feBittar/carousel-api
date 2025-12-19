import { z } from 'zod';
/**
 * Single free text element configuration
 */
export declare const freeTextElementSchema: z.ZodObject<{
    /** Text content */
    content: z.ZodDefault<z.ZodString>;
    /** Text styling */
    style: z.ZodDefault<z.ZodObject<{
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
    /** Background color for text highlight */
    backgroundColor: z.ZodDefault<z.ZodString>;
    /** Background padding */
    backgroundPadding: z.ZodDefault<z.ZodString>;
    /** Border radius for background */
    borderRadius: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    content?: string;
    backgroundColor?: string;
    style?: {
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
    specialPosition?: "none" | "center" | "top-left" | "top-center" | "top-right" | "center-left" | "center-right" | "bottom-left" | "bottom-center" | "bottom-right";
    borderRadius?: string;
    position?: {
        top?: string | number;
        bottom?: string | number;
        left?: string | number;
        right?: string | number;
        width?: string | number;
        height?: string | number;
    };
    specialPadding?: number;
    backgroundPadding?: string;
}, {
    content?: string;
    backgroundColor?: string;
    style?: {
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
    specialPosition?: "none" | "center" | "top-left" | "top-center" | "top-right" | "center-left" | "center-right" | "bottom-left" | "bottom-center" | "bottom-right";
    borderRadius?: string;
    position?: {
        top?: string | number;
        bottom?: string | number;
        left?: string | number;
        right?: string | number;
        width?: string | number;
        height?: string | number;
    };
    specialPadding?: number;
    backgroundPadding?: string;
}>;
export type FreeTextElement = z.infer<typeof freeTextElementSchema>;
/**
 * FreeText Module Schema
 * Manages freely positioned text elements (CTAs, labels, etc)
 */
export declare const freeTextSchema: z.ZodObject<{
    /** Number of free text elements to display (1-5) */
    count: z.ZodDefault<z.ZodNumber>;
    /** Array of free text element configurations */
    texts: z.ZodDefault<z.ZodArray<z.ZodObject<{
        /** Text content */
        content: z.ZodDefault<z.ZodString>;
        /** Text styling */
        style: z.ZodDefault<z.ZodObject<{
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
        /** Background color for text highlight */
        backgroundColor: z.ZodDefault<z.ZodString>;
        /** Background padding */
        backgroundPadding: z.ZodDefault<z.ZodString>;
        /** Border radius for background */
        borderRadius: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        content?: string;
        backgroundColor?: string;
        style?: {
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
        specialPosition?: "none" | "center" | "top-left" | "top-center" | "top-right" | "center-left" | "center-right" | "bottom-left" | "bottom-center" | "bottom-right";
        borderRadius?: string;
        position?: {
            top?: string | number;
            bottom?: string | number;
            left?: string | number;
            right?: string | number;
            width?: string | number;
            height?: string | number;
        };
        specialPadding?: number;
        backgroundPadding?: string;
    }, {
        content?: string;
        backgroundColor?: string;
        style?: {
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
        specialPosition?: "none" | "center" | "top-left" | "top-center" | "top-right" | "center-left" | "center-right" | "bottom-left" | "bottom-center" | "bottom-right";
        borderRadius?: string;
        position?: {
            top?: string | number;
            bottom?: string | number;
            left?: string | number;
            right?: string | number;
            width?: string | number;
            height?: string | number;
        };
        specialPadding?: number;
        backgroundPadding?: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    count?: number;
    texts?: {
        content?: string;
        backgroundColor?: string;
        style?: {
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
        specialPosition?: "none" | "center" | "top-left" | "top-center" | "top-right" | "center-left" | "center-right" | "bottom-left" | "bottom-center" | "bottom-right";
        borderRadius?: string;
        position?: {
            top?: string | number;
            bottom?: string | number;
            left?: string | number;
            right?: string | number;
            width?: string | number;
            height?: string | number;
        };
        specialPadding?: number;
        backgroundPadding?: string;
    }[];
}, {
    count?: number;
    texts?: {
        content?: string;
        backgroundColor?: string;
        style?: {
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
        specialPosition?: "none" | "center" | "top-left" | "top-center" | "top-right" | "center-left" | "center-right" | "bottom-left" | "bottom-center" | "bottom-right";
        borderRadius?: string;
        position?: {
            top?: string | number;
            bottom?: string | number;
            left?: string | number;
            right?: string | number;
            width?: string | number;
            height?: string | number;
        };
        specialPadding?: number;
        backgroundPadding?: string;
    }[];
}>;
export type FreeTextData = z.infer<typeof freeTextSchema>;
/**
 * Default values for FreeText Module
 */
export declare const freeTextDefaults: FreeTextData;
//# sourceMappingURL=schema.d.ts.map