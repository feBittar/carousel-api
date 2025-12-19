import { z } from 'zod';

/**
 * Texture Overlay Module Schema
 * Defines a texture overlay that sits above the viewport/card background but below content
 */
export const textureOverlaySchema = z.object({
  /** Enable/disable the texture overlay */
  enabled: z.boolean().default(false),

  /** URL to the texture image */
  textureUrl: z.string().default(''),

  /** Opacity of the texture overlay (0-1) */
  opacity: z.number().min(0).max(1).default(0.5),
});

export type TextureOverlayData = z.infer<typeof textureOverlaySchema>;

/**
 * Default values for the Texture Overlay module
 */
export const textureOverlayDefaults: TextureOverlayData = {
  enabled: false,
  textureUrl: '',
  opacity: 0.5,
};
