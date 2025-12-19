import { ModuleData } from '../types';
import { FreeImageData } from './schema';

/**
 * Generates CSS for the Free Image module
 *
 * Creates:
 * - Absolute positioning divided across slides
 * - CSS transforms for offset, scale, and rotation
 * - Optional outline effect using 8 drop-shadows (N, NE, E, SE, S, SW, W, NW)
 * - Slide-specific positioning to create illusion of continuous image
 */
export function getFreeImageCss(data: ModuleData): string {
  const freeImage = data as unknown as FreeImageData;

  // Don't render CSS if disabled or no URL
  if (!freeImage.enabled || !freeImage.url) {
    return `
      /* Free Image Module - Disabled */
      .free-image {
        display: none;
      }
    `;
  }

  const startSlideIndex = freeImage.startSlideIndex ?? 0;
  const endSlideIndex = freeImage.endSlideIndex ?? 1;
  const totalAffectedSlides = endSlideIndex - startSlideIndex + 1;

  // Build drop-shadow for outline effect (8 directions)
  let dropShadowCss = 'none';
  if (freeImage.outlineEffect.enabled && freeImage.outlineEffect.size > 0) {
    const { color, size } = freeImage.outlineEffect;

    // Create 8 drop-shadows in cardinal and diagonal directions
    const shadows = [
      // Cardinal directions
      `drop-shadow(0 ${-size}px 0 ${color})`,           // N
      `drop-shadow(${size}px 0 0 ${color})`,             // E
      `drop-shadow(0 ${size}px 0 ${color})`,             // S
      `drop-shadow(${-size}px 0 0 ${color})`,            // W

      // Diagonal directions
      `drop-shadow(${size}px ${-size}px 0 ${color})`,    // NE
      `drop-shadow(${size}px ${size}px 0 ${color})`,     // SE
      `drop-shadow(${-size}px ${size}px 0 ${color})`,    // SW
      `drop-shadow(${-size}px ${-size}px 0 ${color})`,   // NW
    ];

    dropShadowCss = shadows.join(' ');
  }

  // Build CSS for each affected slide
  const slideSpecificCSS: string[] = [];

  for (let i = startSlideIndex; i <= endSlideIndex; i++) {
    const relativeIndex = i - startSlideIndex;

    // Calculate position for this slide
    let leftPosition: string;
    let translateXOffset: string;

    if (relativeIndex === 0) {
      // First slide: image at right edge
      leftPosition = '100%';
      translateXOffset = '-50%';
    } else {
      // Last slide (or middle slides): image at left edge
      leftPosition = '0%';
      translateXOffset = '-50%';
    }

    // Build transform string for this slide
    const transforms: string[] = [];

    // Start with centering on edge (horizontal) + vertical center
    transforms.push(`translate(${translateXOffset}, -50%)`);

    // Add user offset if not zero
    if (freeImage.offsetX !== 0 || freeImage.offsetY !== 0) {
      transforms.push(`translate(${freeImage.offsetX}px, ${freeImage.offsetY}px)`);
    }

    // Add scale if not 100%
    if (freeImage.scale !== 100) {
      transforms.push(`scale(${freeImage.scale / 100})`);
    }

    // Add rotation if not 0
    if (freeImage.rotation !== 0) {
      transforms.push(`rotate(${freeImage.rotation}deg)`);
    }

    const transformCss = transforms.join(' ');

    slideSpecificCSS.push(`
    /* Free Image - Slide ${i + 1} */
    .carousel-slide-${i} .free-image-slide-${i} {
      position: absolute;
      top: 50%;
      left: ${leftPosition};
      transform: ${transformCss};
      z-index: 101;
      pointer-events: none;
      max-width: none;
      height: auto;
      filter: ${dropShadowCss};
    }`);
  }

  return `
    /* ===== FREE IMAGE MODULE (Divided across ${totalAffectedSlides} slides) ===== */
    ${slideSpecificCSS.join('\n')}

    /* Hide if src is empty */
    .free-image[src=""],
    .free-image:not([src]) {
      display: none;
    }
  `;
}
