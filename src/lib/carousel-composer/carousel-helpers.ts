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
  startSlideIndex?: number;
  endSlideIndex?: number;
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
export function wrapInCarousel(slideHTMLs: string[], freeImage?: FreeImageConfig): string {
  // Handle empty array case
  if (slideHTMLs.length === 0) {
    return '<div class="carousel-wrapper"></div>';
  }


  // Determine the range of slides for free image
  const startSlide = freeImage?.startSlideIndex ?? 0;
  const endSlide = freeImage?.endSlideIndex ?? (slideHTMLs.length - 1);

  if (freeImage?.enabled && freeImage.url) {
  }

  // Wrap each slide in carousel-slide div with index-based class (0-based)
  const slideElements = slideHTMLs.map((html, index) => {
    const slideContent = `  <div class="carousel-slide carousel-slide-${index}">
    ${html}
  </div>`;
    return slideContent;
  }).join('\n');

  // Add single free image OUTSIDE slides if enabled
  let freeImageHTML = '';
  if (freeImage?.enabled && freeImage.url) {
    freeImageHTML = `
  <img class="free-image" src="${freeImage.url}" alt="Free Image">`;
  }

  // Build carousel wrapper with slides and optional free image
  const bodyContent = `<div class="carousel-wrapper">
${slideElements}${freeImageHTML}
</div>`;

  return bodyContent;
}

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
export function generateCarouselCSS(slideCount: number, freeImage?: FreeImageConfig): string {
  // Handle edge case
  if (slideCount < 1) {
    slideCount = 1;
  }

  const totalWidth = slideCount * 1080;

  let css = `body {
  width: ${totalWidth}px;
  height: 1350px;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background: none !important;
  background-image: none !important;
}

/* Disable body pseudo-elements in horizontal mode
   - ::before (blur overlay) would affect entire carousel width
   - ::after (gradient) is handled per-slide by viewport module */
body::before,
body::after {
  display: none !important;
}

.carousel-wrapper {
  display: flex;
  flex-direction: row;
  width: ${totalWidth}px;
  height: 1350px;
  position: relative; /* Required for absolute positioning of free-image */
}

.carousel-slide {
  width: 1080px;
  height: 1350px;
  position: relative;
  flex-shrink: 0;
  background-size: cover !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
}`;

  // Add free image styles if enabled
  if (freeImage?.enabled && freeImage.url) {

    // Determine the range of slides for free image
    const startSlide = freeImage.startSlideIndex ?? 0;
    const endSlide = freeImage.endSlideIndex ?? (slideCount - 1);

    // Calculate position as percentage of total carousel width
    // For slides 0-1 (2 slides total): center between them = 50% of carousel
    // Formula: (centerSlideIndex + 0.5) / slideCount * 100%
    const centerSlideIndex = (startSlide + endSlide) / 2;
    const leftPositionPercent = ((centerSlideIndex + 0.5) / slideCount) * 100;

    console.log('[generateCarouselCSS] Free image positioning:', {
      slideCount,
      startSlide,
      endSlide,
      centerSlideIndex,
      leftPositionPercent: `${leftPositionPercent}%`,
      offsetX: freeImage.offsetX,
      offsetY: freeImage.offsetY,
      scale: freeImage.scale,
    });


    // Generate outline effect using drop-shadow filters in 8 directions
    let filterValue = '';
    if (freeImage.outlineEffect?.enabled) {
      const { color, size } = freeImage.outlineEffect;
      const shadows = [
        `drop-shadow(${size}px 0 0 ${color})`,      // right
        `drop-shadow(-${size}px 0 0 ${color})`,     // left
        `drop-shadow(0 ${size}px 0 ${color})`,      // bottom
        `drop-shadow(0 -${size}px 0 ${color})`,     // top
        `drop-shadow(${size}px ${size}px 0 ${color})`,   // bottom-right
        `drop-shadow(-${size}px ${size}px 0 ${color})`,  // bottom-left
        `drop-shadow(${size}px -${size}px 0 ${color})`,  // top-right
        `drop-shadow(-${size}px -${size}px 0 ${color})`  // top-left
      ];
      filterValue = `\n  filter: ${shadows.join(' ')};`;
    }

    const transforms = [
      'translate(-50%, 0)', // Center horizontally at the position
      `translate(${freeImage.offsetX}px, ${freeImage.offsetY}px)`,
      `scale(${freeImage.scale / 100})`, // Convert percentage to decimal (100 -> 1.0)
      `rotate(${freeImage.rotation}deg)`
    ].join(' ');

    css += `

.free-image {
  position: absolute;
  left: ${leftPositionPercent}%;
  bottom: 0;
  transform: ${transforms};
  z-index: 101;
  pointer-events: none;${filterValue}
}`;

  } else {
  }

  return css;
}

/**
 * Validates FreeImageConfig and returns a normalized version
 *
 * @param config - Free image configuration to validate
 * @returns Validated and normalized configuration, or undefined if invalid
 */
export function validateFreeImageConfig(config?: Partial<FreeImageConfig>): FreeImageConfig | undefined {

  if (!config || !config.enabled || !config.url) {
    return undefined;
  }

  const result = {
    enabled: true,
    url: config.url,
    offsetX: config.offsetX ?? 0,
    offsetY: config.offsetY ?? 0,
    scale: config.scale ?? 1,
    rotation: config.rotation ?? 0,
    startSlideIndex: config.startSlideIndex,
    endSlideIndex: config.endSlideIndex,
    outlineEffect: {
      enabled: config.outlineEffect?.enabled ?? false,
      color: config.outlineEffect?.color ?? '#FFFFFF',
      size: config.outlineEffect?.size ?? 2
    }
  };

  return result;
}
