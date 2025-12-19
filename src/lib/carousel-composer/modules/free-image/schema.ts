import { z } from 'zod';

/**
 * Outline effect schema for free image
 */
export const freeImageOutlineEffectSchema = z.object({
  enabled: z.boolean().default(false),
  color: z.string().default('#000000'),
  size: z.number().min(0).max(50).default(0),
});

/**
 * Free Image Module Schema
 * Validates configuration for a free-positioned image in carousel mode
 */
export const freeImageSchema = z.object({
  /** Enable/disable the free image */
  enabled: z.boolean().default(false),

  /** Image URL (PNG recommended for transparency) */
  url: z.string().default(''),

  /** Horizontal offset from center in pixels */
  offsetX: z.number().min(-2000).max(2000).default(0),

  /** Vertical offset from center in pixels */
  offsetY: z.number().min(-2000).max(2000).default(0),

  /** Scale as percentage (100 = original size) */
  scale: z.number().min(10).max(500).default(100),

  /** Rotation in degrees */
  rotation: z.number().min(-360).max(360).default(0),

  /** Starting slide index (0-based) for image division */
  startSlideIndex: z.number().int().min(0).default(0),

  /** Ending slide index (0-based) for image division */
  endSlideIndex: z.number().int().min(0).default(1),

  /** Outline effect configuration */
  outlineEffect: freeImageOutlineEffectSchema.default({
    enabled: false,
    color: '#000000',
    size: 0,
  }),
}).refine(
  (data) => data.endSlideIndex >= data.startSlideIndex,
  {
    message: 'endSlideIndex must be greater than or equal to startSlideIndex',
    path: ['endSlideIndex'],
  }
);

export type FreeImageData = z.infer<typeof freeImageSchema>;
export type FreeImageOutlineEffect = z.infer<typeof freeImageOutlineEffectSchema>;
