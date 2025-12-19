import { ModuleDefinition } from '../types';
import { twitterPostSchema, twitterPostDefaults, TwitterPostData } from './schema';
import { getTwitterPostCss } from './css';
import { getTwitterPostHtml } from './html';
import { TwitterPostForm } from './TwitterPostForm';
import { MessageSquare } from 'lucide-react';

/**
 * Twitter Post Module
 *
 * Creates a complete Twitter/X post mockup with:
 * - Profile image, name, username, verified badge
 * - Post text with optional styled chunks
 * - Optional post image/media
 * - Interaction stats (replies, retweets, likes, views)
 * - Authentic Twitter/X visual styling
 *
 * Category: Special (self-contained, no dependencies)
 * Z-index: 100 (top layer overlay)
 */
export const twitterPostModule: ModuleDefinition = {
  id: 'twitterPost',
  name: 'Twitter Post',
  description: 'Create a realistic Twitter/X post mockup with profile, text, media, and stats',
  icon: MessageSquare,
  category: 'content',
  schema: twitterPostSchema,
  defaults: twitterPostDefaults,
  FormComponent: TwitterPostForm,
  generateCSS: getTwitterPostCss,
  generateHTML: getTwitterPostHtml,
  validate: () => ({ valid: true, errors: [] }),
  getStyleVariables: () => ({}),
  zIndex: 15,
  dependencies: [],
  conflicts: [],
};

// Export types for use in other modules
export type { TwitterPostData } from './schema';
