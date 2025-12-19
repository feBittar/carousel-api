import { z } from 'zod';
/**
 * Twitter Post Module Schema
 * Creates a complete Twitter/X post mock with profile, text, and optional media
 */
export declare const twitterPostSchema: z.ZodObject<{
    /** Enable/disable the module */
    enabled: z.ZodDefault<z.ZodBoolean>;
    /** Platform selection: Twitter (old blue) or X (new dark) */
    platform: z.ZodDefault<z.ZodEnum<["twitter", "x"]>>;
    /** Profile image URL or base64 */
    profileImage: z.ZodDefault<z.ZodString>;
    /** Display name (e.g., "Elon Musk") */
    displayName: z.ZodDefault<z.ZodString>;
    /** Username without @ (e.g., "elonmusk") */
    username: z.ZodDefault<z.ZodString>;
    /** Verified badge */
    verified: z.ZodDefault<z.ZodBoolean>;
    /** Post text content */
    postText: z.ZodDefault<z.ZodString>;
    /** Styled chunks for rich text formatting */
    styledChunks: z.ZodDefault<z.ZodArray<z.ZodObject<{
        text: z.ZodString;
        color: z.ZodOptional<z.ZodString>;
        bold: z.ZodOptional<z.ZodBoolean>;
        italic: z.ZodOptional<z.ZodBoolean>;
        underline: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        bold?: boolean;
        text?: string;
        color?: string;
        italic?: boolean;
        underline?: boolean;
    }, {
        bold?: boolean;
        text?: string;
        color?: string;
        italic?: boolean;
        underline?: boolean;
    }>, "many">>;
    /** Optional post image URL */
    postImage: z.ZodDefault<z.ZodString>;
    /** Timestamp text (e.g., "2h", "3:45 PM · Dec 8, 2025") */
    timestamp: z.ZodDefault<z.ZodString>;
    /** Show interaction stats */
    showStats: z.ZodDefault<z.ZodBoolean>;
    /** Interaction statistics */
    stats: z.ZodDefault<z.ZodObject<{
        replies: z.ZodDefault<z.ZodNumber>;
        retweets: z.ZodDefault<z.ZodNumber>;
        likes: z.ZodDefault<z.ZodNumber>;
        views: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        likes?: number;
        views?: number;
        replies?: number;
        retweets?: number;
    }, {
        likes?: number;
        views?: number;
        replies?: number;
        retweets?: number;
    }>>;
    /** Background color for the post card */
    backgroundColor: z.ZodDefault<z.ZodString>;
    /** Scale factor for the entire post (0.5 to 3.0) */
    scale: z.ZodDefault<z.ZodNumber>;
    /** Positioning */
    position: z.ZodDefault<z.ZodObject<{
        top: z.ZodDefault<z.ZodString>;
        left: z.ZodDefault<z.ZodString>;
        transform: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        top?: string;
        left?: string;
        transform?: string;
    }, {
        top?: string;
        left?: string;
        transform?: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    timestamp?: string;
    username?: string;
    backgroundColor?: string;
    enabled?: boolean;
    scale?: number;
    position?: {
        top?: string;
        left?: string;
        transform?: string;
    };
    stats?: {
        likes?: number;
        views?: number;
        replies?: number;
        retweets?: number;
    };
    styledChunks?: {
        bold?: boolean;
        text?: string;
        color?: string;
        italic?: boolean;
        underline?: boolean;
    }[];
    platform?: "x" | "twitter";
    profileImage?: string;
    displayName?: string;
    verified?: boolean;
    postText?: string;
    postImage?: string;
    showStats?: boolean;
}, {
    timestamp?: string;
    username?: string;
    backgroundColor?: string;
    enabled?: boolean;
    scale?: number;
    position?: {
        top?: string;
        left?: string;
        transform?: string;
    };
    stats?: {
        likes?: number;
        views?: number;
        replies?: number;
        retweets?: number;
    };
    styledChunks?: {
        bold?: boolean;
        text?: string;
        color?: string;
        italic?: boolean;
        underline?: boolean;
    }[];
    platform?: "x" | "twitter";
    profileImage?: string;
    displayName?: string;
    verified?: boolean;
    postText?: string;
    postImage?: string;
    showStats?: boolean;
}>;
export type TwitterPostData = z.infer<typeof twitterPostSchema>;
/**
 * Default values for the Twitter Post module
 */
export declare const twitterPostDefaults: TwitterPostData;
//# sourceMappingURL=schema.d.ts.map