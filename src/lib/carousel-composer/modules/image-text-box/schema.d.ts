import { z } from 'zod';
/**
 * Shadow configuration for image side
 */
export declare const imageTextBoxShadowSchema: z.ZodObject<{
    enabled: z.ZodDefault<z.ZodBoolean>;
    blur: z.ZodDefault<z.ZodNumber>;
    spread: z.ZodDefault<z.ZodNumber>;
    color: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    color?: string;
    enabled?: boolean;
    blur?: number;
    spread?: number;
}, {
    color?: string;
    enabled?: boolean;
    blur?: number;
    spread?: number;
}>;
export type ImageTextBoxShadow = z.infer<typeof imageTextBoxShadowSchema>;
/**
 * Image side configuration
 */
export declare const imageTextBoxImageConfigSchema: z.ZodObject<{
    /** Image URL */
    url: z.ZodDefault<z.ZodString>;
    /** Border radius in pixels */
    borderRadius: z.ZodDefault<z.ZodNumber>;
    /** Maximum width within its section (percentage) */
    maxWidth: z.ZodDefault<z.ZodNumber>;
    /** Maximum height within its section (percentage) */
    maxHeight: z.ZodDefault<z.ZodNumber>;
    /** How the image fits in its container */
    objectFit: z.ZodDefault<z.ZodEnum<["cover", "contain", "fill"]>>;
    /** Individual padding (pixels) */
    paddingTop: z.ZodDefault<z.ZodNumber>;
    paddingRight: z.ZodDefault<z.ZodNumber>;
    paddingBottom: z.ZodDefault<z.ZodNumber>;
    paddingLeft: z.ZodDefault<z.ZodNumber>;
    /** Shadow configuration */
    shadow: z.ZodDefault<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodBoolean>;
        blur: z.ZodDefault<z.ZodNumber>;
        spread: z.ZodDefault<z.ZodNumber>;
        color: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        color?: string;
        enabled?: boolean;
        blur?: number;
        spread?: number;
    }, {
        color?: string;
        enabled?: boolean;
        blur?: number;
        spread?: number;
    }>>;
}, "strip", z.ZodTypeAny, {
    url?: string;
    borderRadius?: number;
    shadow?: {
        color?: string;
        enabled?: boolean;
        blur?: number;
        spread?: number;
    };
    maxWidth?: number;
    maxHeight?: number;
    objectFit?: "fill" | "cover" | "contain";
    paddingTop?: number;
    paddingRight?: number;
    paddingBottom?: number;
    paddingLeft?: number;
}, {
    url?: string;
    borderRadius?: number;
    shadow?: {
        color?: string;
        enabled?: boolean;
        blur?: number;
        spread?: number;
    };
    maxWidth?: number;
    maxHeight?: number;
    objectFit?: "fill" | "cover" | "contain";
    paddingTop?: number;
    paddingRight?: number;
    paddingBottom?: number;
    paddingLeft?: number;
}>;
export type ImageTextBoxImageConfig = z.infer<typeof imageTextBoxImageConfigSchema>;
/**
 * Individual text field schema
 */
export declare const imageTextBoxTextFieldSchema: z.ZodObject<{
    /** Text content */
    content: z.ZodDefault<z.ZodString>;
    /** Style configuration */
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
    /** Styled chunks for partial formatting (rich text) */
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
}, "strip", z.ZodTypeAny, {
    content?: string;
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
}, {
    content?: string;
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
}>;
export type ImageTextBoxTextField = z.infer<typeof imageTextBoxTextFieldSchema>;
/**
 * Text side configuration
 */
export declare const imageTextBoxTextConfigSchema: z.ZodObject<{
    /** Number of text fields (1-5) */
    count: z.ZodDefault<z.ZodNumber>;
    /** Gap between text fields (pixels) */
    gap: z.ZodDefault<z.ZodNumber>;
    /** Vertical alignment within text section */
    verticalAlign: z.ZodDefault<z.ZodEnum<["top", "center", "bottom"]>>;
    /** Individual padding (pixels) */
    paddingTop: z.ZodDefault<z.ZodNumber>;
    paddingRight: z.ZodDefault<z.ZodNumber>;
    paddingBottom: z.ZodDefault<z.ZodNumber>;
    paddingLeft: z.ZodDefault<z.ZodNumber>;
    /** Text fields array */
    fields: z.ZodDefault<z.ZodArray<z.ZodObject<{
        /** Text content */
        content: z.ZodDefault<z.ZodString>;
        /** Style configuration */
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
        /** Styled chunks for partial formatting (rich text) */
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
    }, "strip", z.ZodTypeAny, {
        content?: string;
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
    }, {
        content?: string;
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
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    count?: number;
    gap?: number;
    verticalAlign?: "center" | "top" | "bottom";
    fields?: {
        content?: string;
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
    }[];
    paddingTop?: number;
    paddingRight?: number;
    paddingBottom?: number;
    paddingLeft?: number;
}, {
    count?: number;
    gap?: number;
    verticalAlign?: "center" | "top" | "bottom";
    fields?: {
        content?: string;
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
    }[];
    paddingTop?: number;
    paddingRight?: number;
    paddingBottom?: number;
    paddingLeft?: number;
}>;
export type ImageTextBoxTextConfig = z.infer<typeof imageTextBoxTextConfigSchema>;
/**
 * Predefined split ratios
 */
export declare const SPLIT_RATIO_OPTIONS: readonly [{
    readonly label: "50% / 50%";
    readonly value: "50-50";
}, {
    readonly label: "40% / 60%";
    readonly value: "40-60";
}, {
    readonly label: "60% / 40%";
    readonly value: "60-40";
}, {
    readonly label: "30% / 70%";
    readonly value: "30-70";
}, {
    readonly label: "70% / 30%";
    readonly value: "70-30";
}, {
    readonly label: "Custom";
    readonly value: "custom";
}];
/**
 * Order options
 */
export declare const ORDER_OPTIONS: readonly [{
    readonly label: "Image Left / Text Right";
    readonly value: "image-left";
}, {
    readonly label: "Text Left / Image Right";
    readonly value: "text-left";
}];
/**
 * Content alignment options
 */
export declare const CONTENT_ALIGN_OPTIONS: readonly [{
    readonly value: "flex-start";
    readonly label: "Top";
}, {
    readonly value: "center";
    readonly label: "Center";
}, {
    readonly value: "flex-end";
    readonly label: "Bottom";
}, {
    readonly value: "stretch";
    readonly label: "Stretch";
}];
/**
 * Image + Text Box Module Schema
 */
export declare const imageTextBoxSchema: z.ZodObject<{
    /** Enable/disable the module */
    enabled: z.ZodDefault<z.ZodBoolean>;
    /** Width of the box (CSS value: %, px) */
    width: z.ZodDefault<z.ZodString>;
    /** Height of the box (CSS value: %, px, auto) */
    height: z.ZodDefault<z.ZodString>;
    /** Split ratio preset or 'custom' */
    splitRatio: z.ZodDefault<z.ZodEnum<["50-50", "40-60", "60-40", "30-70", "70-30", "custom"]>>;
    /** Custom left side percentage (used when splitRatio is 'custom') */
    customLeftPercent: z.ZodDefault<z.ZodNumber>;
    /** Order of elements: image-left or text-left */
    order: z.ZodDefault<z.ZodEnum<["image-left", "text-left"]>>;
    /** Gap between the two sides (pixels) */
    gap: z.ZodDefault<z.ZodNumber>;
    /** Vertical alignment of content within the box */
    contentAlign: z.ZodDefault<z.ZodEnum<["flex-start", "center", "flex-end", "stretch"]>>;
    /** Layout width when inside horizontal card layout (CSS value) */
    layoutWidth: z.ZodDefault<z.ZodString>;
    /** Align-self in parent flex container */
    alignSelf: z.ZodDefault<z.ZodEnum<["auto", "flex-start", "center", "flex-end", "stretch"]>>;
    /** Image side configuration */
    imageConfig: z.ZodDefault<z.ZodObject<{
        /** Image URL */
        url: z.ZodDefault<z.ZodString>;
        /** Border radius in pixels */
        borderRadius: z.ZodDefault<z.ZodNumber>;
        /** Maximum width within its section (percentage) */
        maxWidth: z.ZodDefault<z.ZodNumber>;
        /** Maximum height within its section (percentage) */
        maxHeight: z.ZodDefault<z.ZodNumber>;
        /** How the image fits in its container */
        objectFit: z.ZodDefault<z.ZodEnum<["cover", "contain", "fill"]>>;
        /** Individual padding (pixels) */
        paddingTop: z.ZodDefault<z.ZodNumber>;
        paddingRight: z.ZodDefault<z.ZodNumber>;
        paddingBottom: z.ZodDefault<z.ZodNumber>;
        paddingLeft: z.ZodDefault<z.ZodNumber>;
        /** Shadow configuration */
        shadow: z.ZodDefault<z.ZodObject<{
            enabled: z.ZodDefault<z.ZodBoolean>;
            blur: z.ZodDefault<z.ZodNumber>;
            spread: z.ZodDefault<z.ZodNumber>;
            color: z.ZodDefault<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            color?: string;
            enabled?: boolean;
            blur?: number;
            spread?: number;
        }, {
            color?: string;
            enabled?: boolean;
            blur?: number;
            spread?: number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        url?: string;
        borderRadius?: number;
        shadow?: {
            color?: string;
            enabled?: boolean;
            blur?: number;
            spread?: number;
        };
        maxWidth?: number;
        maxHeight?: number;
        objectFit?: "fill" | "cover" | "contain";
        paddingTop?: number;
        paddingRight?: number;
        paddingBottom?: number;
        paddingLeft?: number;
    }, {
        url?: string;
        borderRadius?: number;
        shadow?: {
            color?: string;
            enabled?: boolean;
            blur?: number;
            spread?: number;
        };
        maxWidth?: number;
        maxHeight?: number;
        objectFit?: "fill" | "cover" | "contain";
        paddingTop?: number;
        paddingRight?: number;
        paddingBottom?: number;
        paddingLeft?: number;
    }>>;
    /** Text side configuration */
    textConfig: z.ZodDefault<z.ZodObject<{
        /** Number of text fields (1-5) */
        count: z.ZodDefault<z.ZodNumber>;
        /** Gap between text fields (pixels) */
        gap: z.ZodDefault<z.ZodNumber>;
        /** Vertical alignment within text section */
        verticalAlign: z.ZodDefault<z.ZodEnum<["top", "center", "bottom"]>>;
        /** Individual padding (pixels) */
        paddingTop: z.ZodDefault<z.ZodNumber>;
        paddingRight: z.ZodDefault<z.ZodNumber>;
        paddingBottom: z.ZodDefault<z.ZodNumber>;
        paddingLeft: z.ZodDefault<z.ZodNumber>;
        /** Text fields array */
        fields: z.ZodDefault<z.ZodArray<z.ZodObject<{
            /** Text content */
            content: z.ZodDefault<z.ZodString>;
            /** Style configuration */
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
            /** Styled chunks for partial formatting (rich text) */
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
        }, "strip", z.ZodTypeAny, {
            content?: string;
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
        }, {
            content?: string;
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
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        count?: number;
        gap?: number;
        verticalAlign?: "center" | "top" | "bottom";
        fields?: {
            content?: string;
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
        }[];
        paddingTop?: number;
        paddingRight?: number;
        paddingBottom?: number;
        paddingLeft?: number;
    }, {
        count?: number;
        gap?: number;
        verticalAlign?: "center" | "top" | "bottom";
        fields?: {
            content?: string;
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
        }[];
        paddingTop?: number;
        paddingRight?: number;
        paddingBottom?: number;
        paddingLeft?: number;
    }>>;
}, "strip", z.ZodTypeAny, {
    order?: "image-left" | "text-left";
    width?: string;
    height?: string;
    enabled?: boolean;
    gap?: number;
    contentAlign?: "center" | "flex-start" | "flex-end" | "stretch";
    layoutWidth?: string;
    alignSelf?: "center" | "auto" | "flex-start" | "flex-end" | "stretch";
    splitRatio?: "custom" | "50-50" | "40-60" | "60-40" | "30-70" | "70-30";
    customLeftPercent?: number;
    imageConfig?: {
        url?: string;
        borderRadius?: number;
        shadow?: {
            color?: string;
            enabled?: boolean;
            blur?: number;
            spread?: number;
        };
        maxWidth?: number;
        maxHeight?: number;
        objectFit?: "fill" | "cover" | "contain";
        paddingTop?: number;
        paddingRight?: number;
        paddingBottom?: number;
        paddingLeft?: number;
    };
    textConfig?: {
        count?: number;
        gap?: number;
        verticalAlign?: "center" | "top" | "bottom";
        fields?: {
            content?: string;
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
        }[];
        paddingTop?: number;
        paddingRight?: number;
        paddingBottom?: number;
        paddingLeft?: number;
    };
}, {
    order?: "image-left" | "text-left";
    width?: string;
    height?: string;
    enabled?: boolean;
    gap?: number;
    contentAlign?: "center" | "flex-start" | "flex-end" | "stretch";
    layoutWidth?: string;
    alignSelf?: "center" | "auto" | "flex-start" | "flex-end" | "stretch";
    splitRatio?: "custom" | "50-50" | "40-60" | "60-40" | "30-70" | "70-30";
    customLeftPercent?: number;
    imageConfig?: {
        url?: string;
        borderRadius?: number;
        shadow?: {
            color?: string;
            enabled?: boolean;
            blur?: number;
            spread?: number;
        };
        maxWidth?: number;
        maxHeight?: number;
        objectFit?: "fill" | "cover" | "contain";
        paddingTop?: number;
        paddingRight?: number;
        paddingBottom?: number;
        paddingLeft?: number;
    };
    textConfig?: {
        count?: number;
        gap?: number;
        verticalAlign?: "center" | "top" | "bottom";
        fields?: {
            content?: string;
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
        }[];
        paddingTop?: number;
        paddingRight?: number;
        paddingBottom?: number;
        paddingLeft?: number;
    };
}>;
export type ImageTextBoxData = z.infer<typeof imageTextBoxSchema>;
/**
 * Default values for the module
 */
export declare const imageTextBoxDefaults: ImageTextBoxData;
//# sourceMappingURL=schema.d.ts.map