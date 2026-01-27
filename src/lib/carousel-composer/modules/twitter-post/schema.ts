import { z } from 'zod';
import { styledChunkSchema, textStyleSchema } from '../../types';

/**
 * Twitter Post Module Schema (Minimal Mode - Default)
 * Creates a minimal Twitter/X post with compact header and large text
 * Similar to Alex Hormozi style - maximizes text space, minimizes chrome
 */
export const twitterPostSchema = z.object({
  /** Enable/disable the module */
  enabled: z.boolean().default(true),

  /** Platform selection: Twitter (old blue) or X (new dark) */
  platform: z.enum(['twitter', 'x']).default('twitter'),

  /** Use dynamic profile image from company profile (logo_url) */
  dynamicProfileImage: z.boolean().default(false),

  /** Profile image URL or base64 (used when dynamicProfileImage is false) */
  profileImage: z.string().default(''),

  /** Use dynamic display name from company profile (company_name) */
  dynamicDisplayName: z.boolean().default(false),

  /** Display name (e.g., "Alex Hormozi") - used when dynamicDisplayName is false */
  displayName: z.string().default('John Doe'),

  /** Use dynamic username from company profile (instagram handle) */
  dynamicUsername: z.boolean().default(false),

  /** Username without @ (e.g., "AlexHormozi") - used when dynamicUsername is false */
  username: z.string().default('johndoe'),

  /** Verified badge */
  verified: z.boolean().default(true),

  /** Post text content (main text that fills the canvas) */
  postText: z.string().default('Your success in life will boil down to your ability to tolerate difficulty without changing your course of action.'),

  /** Text style configuration (fontSize, fontFamily, fontWeight, color, etc) */
  textStyle: textStyleSchema.default({
    fontFamily: 'Arial',
    fontSize: '48px',
    fontWeight: '700',
    color: '#000000',
    textAlign: 'left',
    lineHeight: '1.2',
  }),

  /** Styled chunks for rich text formatting (highlights, colors, etc) */
  styledChunks: z.array(styledChunkSchema).default([]),

  /** Vertical alignment of the entire Twitter post block */
  verticalAlign: z.enum(['top', 'center', 'bottom']).default('top'),

  /** Header position from top (pixels) - only used when verticalAlign is 'top' */
  headerTop: z.number().min(0).max(200).default(40),

  /** Text position from top (pixels) - only used when verticalAlign is 'top' */
  textTop: z.number().min(100).max(400).default(180),

  /** Text horizontal padding (percentage of viewport width) */
  textPadding: z.number().min(0).max(30).default(8),

  /** Enable/disable post image */
  postImageEnabled: z.boolean().default(false),

  /** Post image URL or base64 */
  postImageUrl: z.string().default(''),

  /** Post image border radius (px) */
  postImageBorderRadius: z.number().min(0).max(50).default(16),

  /** Header name color (applied from palette.text) */
  headerNameColor: z.string().optional(),

  /** Header username color (applied from palette.text with opacity) */
  headerUsernameColor: z.string().optional(),

  /** Verified badge color (applied from palette.accent) */
  verifiedBadgeColor: z.string().optional(),
});

export type TwitterPostData = z.infer<typeof twitterPostSchema>;

/**
 * Default values for the Twitter Post module
 */
export const twitterPostDefaults: TwitterPostData = {
  enabled: true,
  platform: 'twitter',
  dynamicProfileImage: false,
  profileImage: '',
  dynamicDisplayName: false,
  displayName: 'John Doe',
  dynamicUsername: false,
  username: 'johndoe',
  verified: true,
  postText: 'Your success in life will boil down to your ability to tolerate difficulty without changing your course of action.',
  textStyle: {
    fontFamily: 'Arial',
    fontSize: '48px',
    fontWeight: '700',
    color: '#000000',
    textAlign: 'left',
    lineHeight: '1.2',
  },
  styledChunks: [],
  verticalAlign: 'top',
  headerTop: 40,
  textTop: 180,
  textPadding: 8,
  postImageEnabled: false,
  postImageUrl: '',
  postImageBorderRadius: 16,
};
