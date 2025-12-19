import { z } from 'zod';
/**
 * Individual bullet item configuration
 */
export declare const bulletItemSchema: z.ZodObject<{
    /** Whether this bullet is enabled/visible */
    enabled: z.ZodDefault<z.ZodBoolean>;
    /** Icon URL or emoji character */
    icon: z.ZodDefault<z.ZodString>;
    /** Icon type: 'url' for image, 'emoji' for emoji, 'number' for auto-numbering */
    iconType: z.ZodDefault<z.ZodEnum<["url", "emoji", "number"]>>;
    /** Text content */
    text: z.ZodDefault<z.ZodString>;
    /** Styled chunks for partial formatting */
    styledChunks: z.ZodDefault<z.ZodArray<z.ZodObject<{
        text: z.ZodString;
        color: z.ZodOptional<z.ZodString>;
        fontFamily: z.ZodOptional<z.ZodString>;
        fontSize: z.ZodOptional<z.ZodString>;
        bold: z.ZodOptional<z.ZodBoolean>;
        italic: z.ZodOptional<z.ZodBoolean>;
        underline: z.ZodOptional<z.ZodBoolean>;
        letterSpacing: z.ZodOptional<z.ZodString>;
        backgroundColor: z.ZodOptional<z.ZodString>;
        backgroundBlur: z.ZodOptional<z.ZodString>;
        blurColor: z.ZodOptional<z.ZodString>;
        blurOpacity: z.ZodOptional<z.ZodNumber>;
        blurFadeDirection: z.ZodOptional<z.ZodEnum<["horizontal", "vertical", "both"]>>;
        blurFadeAmount: z.ZodOptional<z.ZodNumber>;
        padding: z.ZodOptional<z.ZodString>;
        lineBreak: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        bold?: boolean;
        text?: string;
        color?: string;
        fontFamily?: string;
        fontSize?: string;
        backgroundColor?: string;
        letterSpacing?: string;
        padding?: string;
        italic?: boolean;
        underline?: boolean;
        backgroundBlur?: string;
        blurColor?: string;
        blurOpacity?: number;
        blurFadeDirection?: "horizontal" | "vertical" | "both";
        blurFadeAmount?: number;
        lineBreak?: boolean;
    }, {
        bold?: boolean;
        text?: string;
        color?: string;
        fontFamily?: string;
        fontSize?: string;
        backgroundColor?: string;
        letterSpacing?: string;
        padding?: string;
        italic?: boolean;
        underline?: boolean;
        backgroundBlur?: string;
        blurColor?: string;
        blurOpacity?: number;
        blurFadeDirection?: "horizontal" | "vertical" | "both";
        blurFadeAmount?: number;
        lineBreak?: boolean;
    }>, "many">>;
    /** Background color for this bullet card */
    backgroundColor: z.ZodDefault<z.ZodString>;
    /** Text style configuration for this bullet */
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
}, "strip", z.ZodTypeAny, {
    text?: string;
    backgroundColor?: string;
    enabled?: boolean;
    icon?: string;
    iconType?: "number" | "url" | "emoji";
    styledChunks?: {
        bold?: boolean;
        text?: string;
        color?: string;
        fontFamily?: string;
        fontSize?: string;
        backgroundColor?: string;
        letterSpacing?: string;
        padding?: string;
        italic?: boolean;
        underline?: boolean;
        backgroundBlur?: string;
        blurColor?: string;
        blurOpacity?: number;
        blurFadeDirection?: "horizontal" | "vertical" | "both";
        blurFadeAmount?: number;
        lineBreak?: boolean;
    }[];
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
}, {
    text?: string;
    backgroundColor?: string;
    enabled?: boolean;
    icon?: string;
    iconType?: "number" | "url" | "emoji";
    styledChunks?: {
        bold?: boolean;
        text?: string;
        color?: string;
        fontFamily?: string;
        fontSize?: string;
        backgroundColor?: string;
        letterSpacing?: string;
        padding?: string;
        italic?: boolean;
        underline?: boolean;
        backgroundBlur?: string;
        blurColor?: string;
        blurOpacity?: number;
        blurFadeDirection?: "horizontal" | "vertical" | "both";
        blurFadeAmount?: number;
        lineBreak?: boolean;
    }[];
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
}>;
export type BulletItem = z.infer<typeof bulletItemSchema>;
/**
 * Bullets Module Schema
 * Displays bullet points/cards with icons and text
 */
export declare const bulletsSchema: z.ZodObject<{
    /** Array of bullet items (3-5 items) */
    items: z.ZodDefault<z.ZodArray<z.ZodObject<{
        /** Whether this bullet is enabled/visible */
        enabled: z.ZodDefault<z.ZodBoolean>;
        /** Icon URL or emoji character */
        icon: z.ZodDefault<z.ZodString>;
        /** Icon type: 'url' for image, 'emoji' for emoji, 'number' for auto-numbering */
        iconType: z.ZodDefault<z.ZodEnum<["url", "emoji", "number"]>>;
        /** Text content */
        text: z.ZodDefault<z.ZodString>;
        /** Styled chunks for partial formatting */
        styledChunks: z.ZodDefault<z.ZodArray<z.ZodObject<{
            text: z.ZodString;
            color: z.ZodOptional<z.ZodString>;
            fontFamily: z.ZodOptional<z.ZodString>;
            fontSize: z.ZodOptional<z.ZodString>;
            bold: z.ZodOptional<z.ZodBoolean>;
            italic: z.ZodOptional<z.ZodBoolean>;
            underline: z.ZodOptional<z.ZodBoolean>;
            letterSpacing: z.ZodOptional<z.ZodString>;
            backgroundColor: z.ZodOptional<z.ZodString>;
            backgroundBlur: z.ZodOptional<z.ZodString>;
            blurColor: z.ZodOptional<z.ZodString>;
            blurOpacity: z.ZodOptional<z.ZodNumber>;
            blurFadeDirection: z.ZodOptional<z.ZodEnum<["horizontal", "vertical", "both"]>>;
            blurFadeAmount: z.ZodOptional<z.ZodNumber>;
            padding: z.ZodOptional<z.ZodString>;
            lineBreak: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            bold?: boolean;
            text?: string;
            color?: string;
            fontFamily?: string;
            fontSize?: string;
            backgroundColor?: string;
            letterSpacing?: string;
            padding?: string;
            italic?: boolean;
            underline?: boolean;
            backgroundBlur?: string;
            blurColor?: string;
            blurOpacity?: number;
            blurFadeDirection?: "horizontal" | "vertical" | "both";
            blurFadeAmount?: number;
            lineBreak?: boolean;
        }, {
            bold?: boolean;
            text?: string;
            color?: string;
            fontFamily?: string;
            fontSize?: string;
            backgroundColor?: string;
            letterSpacing?: string;
            padding?: string;
            italic?: boolean;
            underline?: boolean;
            backgroundBlur?: string;
            blurColor?: string;
            blurOpacity?: number;
            blurFadeDirection?: "horizontal" | "vertical" | "both";
            blurFadeAmount?: number;
            lineBreak?: boolean;
        }>, "many">>;
        /** Background color for this bullet card */
        backgroundColor: z.ZodDefault<z.ZodString>;
        /** Text style configuration for this bullet */
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
    }, "strip", z.ZodTypeAny, {
        text?: string;
        backgroundColor?: string;
        enabled?: boolean;
        icon?: string;
        iconType?: "number" | "url" | "emoji";
        styledChunks?: {
            bold?: boolean;
            text?: string;
            color?: string;
            fontFamily?: string;
            fontSize?: string;
            backgroundColor?: string;
            letterSpacing?: string;
            padding?: string;
            italic?: boolean;
            underline?: boolean;
            backgroundBlur?: string;
            blurColor?: string;
            blurOpacity?: number;
            blurFadeDirection?: "horizontal" | "vertical" | "both";
            blurFadeAmount?: number;
            lineBreak?: boolean;
        }[];
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
    }, {
        text?: string;
        backgroundColor?: string;
        enabled?: boolean;
        icon?: string;
        iconType?: "number" | "url" | "emoji";
        styledChunks?: {
            bold?: boolean;
            text?: string;
            color?: string;
            fontFamily?: string;
            fontSize?: string;
            backgroundColor?: string;
            letterSpacing?: string;
            padding?: string;
            italic?: boolean;
            underline?: boolean;
            backgroundBlur?: string;
            blurColor?: string;
            blurOpacity?: number;
            blurFadeDirection?: "horizontal" | "vertical" | "both";
            blurFadeAmount?: number;
            lineBreak?: boolean;
        }[];
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
    }>, "many">>;
    /** Layout direction */
    layout: z.ZodDefault<z.ZodEnum<["vertical", "horizontal", "grid"]>>;
    /** Gap between bullet cards (pixels) */
    gap: z.ZodDefault<z.ZodNumber>;
    /** Padding inside each bullet card */
    itemPadding: z.ZodDefault<z.ZodString>;
    /** Border radius for bullet cards */
    borderRadius: z.ZodDefault<z.ZodNumber>;
    /** Icon size (pixels) */
    iconSize: z.ZodDefault<z.ZodNumber>;
    /** Icon background color */
    iconBackgroundColor: z.ZodDefault<z.ZodString>;
    /** Icon color (for SVG or text) */
    iconColor: z.ZodDefault<z.ZodString>;
    /** Gap between icon and text inside each card */
    iconGap: z.ZodDefault<z.ZodNumber>;
    /** Card shadow */
    cardShadow: z.ZodDefault<z.ZodString>;
    /** Minimum height for cards */
    cardMinHeight: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    items?: {
        text?: string;
        backgroundColor?: string;
        enabled?: boolean;
        icon?: string;
        iconType?: "number" | "url" | "emoji";
        styledChunks?: {
            bold?: boolean;
            text?: string;
            color?: string;
            fontFamily?: string;
            fontSize?: string;
            backgroundColor?: string;
            letterSpacing?: string;
            padding?: string;
            italic?: boolean;
            underline?: boolean;
            backgroundBlur?: string;
            blurColor?: string;
            blurOpacity?: number;
            blurFadeDirection?: "horizontal" | "vertical" | "both";
            blurFadeAmount?: number;
            lineBreak?: boolean;
        }[];
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
    }[];
    layout?: "horizontal" | "vertical" | "grid";
    gap?: number;
    borderRadius?: number;
    itemPadding?: string;
    iconSize?: number;
    iconBackgroundColor?: string;
    iconColor?: string;
    iconGap?: number;
    cardShadow?: string;
    cardMinHeight?: number;
}, {
    items?: {
        text?: string;
        backgroundColor?: string;
        enabled?: boolean;
        icon?: string;
        iconType?: "number" | "url" | "emoji";
        styledChunks?: {
            bold?: boolean;
            text?: string;
            color?: string;
            fontFamily?: string;
            fontSize?: string;
            backgroundColor?: string;
            letterSpacing?: string;
            padding?: string;
            italic?: boolean;
            underline?: boolean;
            backgroundBlur?: string;
            blurColor?: string;
            blurOpacity?: number;
            blurFadeDirection?: "horizontal" | "vertical" | "both";
            blurFadeAmount?: number;
            lineBreak?: boolean;
        }[];
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
    }[];
    layout?: "horizontal" | "vertical" | "grid";
    gap?: number;
    borderRadius?: number;
    itemPadding?: string;
    iconSize?: number;
    iconBackgroundColor?: string;
    iconColor?: string;
    iconGap?: number;
    cardShadow?: string;
    cardMinHeight?: number;
}>;
export type BulletsData = z.infer<typeof bulletsSchema>;
//# sourceMappingURL=schema.d.ts.map