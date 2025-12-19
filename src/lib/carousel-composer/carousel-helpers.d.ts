/**
 * Carousel Helpers
 *
 * Utilities for horizontal carousel composition with freeImage support.
 * Ported from image-gen-nextjs/src/lib/utils/carouselHelpers.ts
 */
/**
 * Configuration for the free image overlay in carousel generation
 */
export interface FreeImageConfig {
    enabled: boolean;
    url: string;
    offsetX: number;
    offsetY: number;
    scale: number;
    rotation: number;
    outlineEffect: {
        enabled: boolean;
        color: string;
        size: number;
    };
}
/**
 * Wraps slide HTML content in carousel layout structure
 *
 * @param slideHTMLs - Array of HTML content strings for each slide
 * @param freeImage - Optional free image configuration
 * @returns Complete body HTML content with carousel wrapper
 *
 * @example
 * ```typescript
 * const slides = ['<div>Slide 1</div>', '<div>Slide 2</div>'];
 * const html = wrapInCarousel(slides, {
 *   enabled: true,
 *   url: '/images/logo.png',
 *   offsetX: 50,
 *   offsetY: -20,
 *   scale: 1.2,
 *   rotation: -5,
 *   outlineEffect: { enabled: true, color: '#FFFFFF', size: 4 }
 * });
 * ```
 */
export declare function wrapInCarousel(slideHTMLs: string[], freeImage?: FreeImageConfig): string;
/**
 * Generates CSS styles for carousel layout
 *
 * @param slideCount - Number of slides in the carousel
 * @param freeImage - Optional free image configuration
 * @returns CSS string for carousel layout and optional free image positioning
 *
 * @example
 * ```typescript
 * const css = generateCarouselCSS(3, {
 *   enabled: true,
 *   url: '/logo.png',
 *   offsetX: 100,
 *   offsetY: -50,
 *   scale: 1.5,
 *   rotation: 10,
 *   outlineEffect: { enabled: true, color: '#000000', size: 3 }
 * });
 * ```
 */
export declare function generateCarouselCSS(slideCount: number, freeImage?: FreeImageConfig): string;
/**
 * Validates FreeImageConfig and returns a normalized version
 *
 * @param config - Free image configuration to validate
 * @returns Validated and normalized configuration, or undefined if invalid
 */
export declare function validateFreeImageConfig(config?: Partial<FreeImageConfig>): FreeImageConfig | undefined;
//# sourceMappingURL=carousel-helpers.d.ts.map