import { z } from 'zod';

/**
 * Styled chunk schema for rich text formatting
 */
const styledChunkSchema = z.object({
  text: z.string(),
  color: z.string().optional(),
  bold: z.boolean().optional(),
  italic: z.boolean().optional(),
  underline: z.boolean().optional(),
});

/**
 * Twitter Post Module Schema
 * Creates a complete Twitter/X post mock with profile, text, and optional media
 */
export const twitterPostSchema = z.object({
  /** Enable/disable the module */
  enabled: z.boolean().default(true),

  /** Platform selection: Twitter (old blue) or X (new dark) */
  platform: z.enum(['twitter', 'x']).default('twitter'),

  /** Profile image URL or base64 */
  profileImage: z.string().default(''),

  /** Display name (e.g., "Elon Musk") */
  displayName: z.string().default('John Doe'),

  /** Username without @ (e.g., "elonmusk") */
  username: z.string().default('johndoe'),

  /** Verified badge */
  verified: z.boolean().default(true),

  /** Post text content */
  postText: z.string().default('This is a Twitter post!'),

  /** Styled chunks for rich text formatting */
  styledChunks: z.array(styledChunkSchema).default([]),

  /** Optional post image URL */
  postImage: z.string().default(''),

  /** Timestamp text (e.g., "2h", "3:45 PM · Dec 8, 2025") */
  timestamp: z.string().default('2h'),

  /** Show interaction stats */
  showStats: z.boolean().default(true),

  /** Interaction statistics */
  stats: z.object({
    replies: z.number().default(0),
    retweets: z.number().default(0),
    likes: z.number().default(0),
    views: z.number().default(0),
  }).default({
    replies: 0,
    retweets: 0,
    likes: 0,
    views: 0,
  }),

  /** Background color for the post card */
  backgroundColor: z.string().default('#ffffff'),

  /** Scale factor for the entire post (0.5 to 3.0) */
  scale: z.number().min(0.5).max(3.0).default(1.5),

  /** Positioning */
  position: z.object({
    top: z.string().default('50%'),
    left: z.string().default('50%'),
    transform: z.string().default('translate(-50%, -50%)'),
  }).default({
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }),
});

export type TwitterPostData = z.infer<typeof twitterPostSchema>;

/**
 * Default values for the Twitter Post module
 */
export const twitterPostDefaults: TwitterPostData = {
  enabled: true,
  platform: 'twitter',
  profileImage: '',
  displayName: 'John Doe',
  username: 'johndoe',
  verified: true,
  postText: 'This is a Twitter post!',
  styledChunks: [],
  postImage: '',
  timestamp: '2h',
  showStats: true,
  stats: {
    replies: 42,
    retweets: 128,
    likes: 1547,
    views: 15200,
  },
  backgroundColor: '#ffffff',
  scale: 1.5,
  position: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};
