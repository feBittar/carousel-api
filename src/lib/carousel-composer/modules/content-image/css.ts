import { ModuleData } from '../types';
import { ContentImageData } from './schema';

/**
 * Resolve placeholder color based on source
 */
function resolvePlaceholderColor(
  colorSource: 'accent' | 'text' | 'custom',
  customColor: string
): string {
  if (colorSource === 'custom') {
    return customColor;
  }
  return customColor || '#cccccc';
}

/**
 * Generates CSS for the Content Image module
 */
export function getContentImageCss(data: ModuleData): string {
  const contentImage = data as unknown as ContentImageData;

  if (!contentImage.enabled) {
    return `
      /* Content Image Module - Disabled */
      .content-image-section {
        display: none;
      }
    `;
  }

  // Generate shadow CSS if enabled
  const shadowCss = contentImage.shadow?.enabled
    ? `0 0 ${contentImage.shadow.blur}px ${contentImage.shadow.spread}px ${contentImage.shadow.color}`
    : 'none';

  // Check if using placeholder mode
  const isPlaceholder = (contentImage as any).imageType === 'placeholder';

  if (isPlaceholder && contentImage.mode === 'single') {
    const color = resolvePlaceholderColor(
      (contentImage as any).placeholderColorSource || 'accent',
      (contentImage as any).placeholderCustomColor || '#cccccc'
    );

    return `
      /* ===== CONTENT IMAGE MODULE - PLACEHOLDER MODE (z-index: 5) ===== */
      .content-image-section {
        flex: 0 1 auto;
        flex-basis: ${contentImage.layoutWidth || 'auto'};
        align-self: ${contentImage.alignSelf || 'stretch'};
        min-width: 0;
        flex-shrink: 1;
        z-index: 5;
        position: relative;
        display: flex;
        min-height: 0;
        overflow: hidden;
        align-items: ${getAlignItemsValue(contentImage.position)};
        justify-content: center;
      }

      .content-image-placeholder {
        width: 100%;
        height: 100%;
        max-width: ${contentImage.maxWidth}%;
        max-height: ${contentImage.maxHeight}%;
        border-radius: ${contentImage.borderRadius}px;
        border: 2px solid ${color};
        box-sizing: border-box;
        position: relative;
        aspect-ratio: 1;
        cursor: pointer;
      }

      /* SVG icon inside placeholder using mask */
      .content-image-placeholder::after {
        content: '';
        position: absolute;
        inset: 0;
        background-color: ${color};
        -webkit-mask-image: url('/placeholder-mono.svg');
        mask-image: url('/placeholder-mono.svg');
        -webkit-mask-size: 60%;
        mask-size: 60%;
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-position: center;
        mask-position: center;
        pointer-events: none;
      }

    `;
  }

  // Single image mode CSS
  if (contentImage.mode === 'single') {
    return `
      /* ===== CONTENT IMAGE MODULE (z-index: 5) ===== */
      .content-image-section {
        flex: 0 1 auto;
        flex-basis: ${contentImage.layoutWidth || 'auto'};
        align-self: ${contentImage.alignSelf || 'stretch'};
        min-width: 0;
        flex-shrink: 1;
        z-index: 5;
        position: relative;
        display: flex;
        min-height: 0;
        overflow: hidden;
        align-items: ${getAlignItemsValue(contentImage.position)};
        justify-content: center;
      }

      .content-image {
        width: 100%;
        height: auto;
        max-width: ${contentImage.maxWidth}%;
        max-height: ${contentImage.maxHeight}%;
        object-fit: ${contentImage.objectFit};
        object-position: ${contentImage.position};
        border-radius: ${contentImage.borderRadius}px;
        box-shadow: ${shadowCss};
        display: block;
      }

      /* Hide content image if src is empty */
      .content-image[src=""],
      .content-image:not([src]) {
        display: none;
      }

      /* Show placeholder when image is empty */
      .content-image-section:has(.content-image[src=""]),
      .content-image-section:has(.content-image:not([src])) {
        background: repeating-linear-gradient(
          45deg,
          #f0f0f0,
          #f0f0f0 10px,
          #e0e0e0 10px,
          #e0e0e0 20px
        );
        border: 2px dashed #ccc;
        border-radius: ${contentImage.borderRadius}px;
      }

      /* Placeholder text */
      .content-image-section:has(.content-image[src=""])::after,
      .content-image-section:has(.content-image:not([src]))::after {
        content: 'Image URL Required';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #999;
        font-size: 24px;
        font-weight: 600;
        text-align: center;
        pointer-events: none;
      }
    `;
  }

  // Comparison mode CSS
  return `
    /* ===== CONTENT IMAGE MODULE - COMPARISON MODE (z-index: 5) ===== */
    .content-image-section {
      flex: 0 1 auto;
      flex-basis: ${contentImage.layoutWidth || 'auto'};
      align-self: ${contentImage.alignSelf || 'stretch'};
      min-width: 0;
      flex-shrink: 1;
      z-index: 5;
      position: relative;
      display: ${contentImage.url || contentImage.url2 ? 'flex' : 'none'};
      min-height: 0;
    }

    .comparison-row {
      width: 100%;
      height: 100%;
      display: flex;
      gap: ${contentImage.comparisonGap}px;
      align-items: ${getAlignItemsValue(contentImage.position)};
      justify-content: center;
    }

    .comparison-image {
      flex: 1;
      max-width: ${contentImage.maxWidth}%;
      max-height: ${contentImage.maxHeight}%;
      border-radius: ${contentImage.borderRadius}px;
      position: relative;
      display: flex;
      align-items: ${getAlignItemsValue(contentImage.position)};
      justify-content: center;
    }

    .comparison-image img {
      width: 100%;
      height: 100%;
      object-fit: ${contentImage.objectFit};
      object-position: ${contentImage.position};
      box-shadow: ${shadowCss};
      display: block;
    }

    /* Hide comparison images if src is empty */
    .comparison-image img[src=""] {
      display: none;
    }
  `;
}

/**
 * Convert position value to CSS align-items
 */
function getAlignItemsValue(position: 'top' | 'center' | 'bottom'): string {
  switch (position) {
    case 'top':
      return 'flex-start';
    case 'bottom':
      return 'flex-end';
    case 'center':
    default:
      return 'center';
  }
}
