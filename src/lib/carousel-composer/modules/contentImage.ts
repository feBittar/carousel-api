/**
 * Content Image Module
 *
 * Handles a single content image placement with positioning and styling controls.
 * This module allows users to add and position images within the carousel card.
 */

import type { ContentImageModule, ModuleDefinition, ModuleData, CompositionOptions } from '../types';

/**
 * Content Image Module Definition
 */
export const contentImageModule: ModuleDefinition = {
  id: 'contentImage',
  name: 'Content Image',
  description: 'Single content image placement',
  icon: 'Image',
  category: 'content',
  zIndex: 5, // Content

  defaults: {
    enabled: false,
    mode: 'single',
    image: {
      url: '',
      width: 400,
      height: 400,
      position: {
        x: 50,
        y: 50,
      },
      objectFit: 'cover',
      borderRadius: 0,
    },
    url2: '',
    comparisonGap: 16,
    borderRadius: 12,
    maxWidth: 100,
    maxHeight: 100,
    objectFit: 'cover',
    position: 'center',
    shadow: { enabled: false, blur: 10, spread: 0, color: 'rgba(0,0,0,0.1)' },
  } as ContentImageModule,

  /**
   * Validates the content image module data
   */
  validate: (data: ModuleData) => {
    const errors: string[] = [];
    const imageData = data as ContentImageModule;

    if (!imageData.enabled) {
      return { valid: true, errors: [] };
    }

    const mode = imageData.mode || 'single';

    if (mode === 'single') {
      // Single mode validation
      if (!imageData.image) {
        errors.push('Image configuration is required');
        return { valid: false, errors };
      }

      // Check if URL is provided
      if (!imageData.image.url || imageData.image.url.trim() === '') {
        errors.push('Image URL is required in single mode');
      }

      // Validate width
      if (imageData.image.width <= 0) {
        errors.push('Image width must be greater than 0');
      }

      if (imageData.image.width < 50 || imageData.image.width > 800) {
        errors.push('Image width must be between 50 and 800 pixels');
      }

      // Validate height
      if (imageData.image.height <= 0) {
        errors.push('Image height must be greater than 0');
      }

      if (imageData.image.height < 50 || imageData.image.height > 800) {
        errors.push('Image height must be between 50 and 800 pixels');
      }

      // Validate position
      if (imageData.image.position) {
        if (imageData.image.position.x < 0 || imageData.image.position.x > 100) {
          errors.push('Image X position must be between 0 and 100');
        }
        if (imageData.image.position.y < 0 || imageData.image.position.y > 100) {
          errors.push('Image Y position must be between 0 and 100');
        }
      }
    } else if (mode === 'comparison') {
      // Comparison mode validation
      if (!imageData.image?.url || imageData.image.url.trim() === '') {
        errors.push('First image URL is required in comparison mode');
      }

      if (!imageData.url2 || imageData.url2.trim() === '') {
        errors.push('Second image URL is required in comparison mode');
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Generates HTML for the content image
   */
  generateHTML: (data: ModuleData, options: CompositionOptions) => {
    const imageData = data as ContentImageModule;

    if (!imageData.enabled) {
      return '';
    }

    const { baseUrl = '' } = options;
    const mode = imageData.mode || 'single';

    // Helper function to check if URL is absolute
    const isAbsoluteUrl = (urlString: string): boolean => {
      return urlString.startsWith('http://') ||
             urlString.startsWith('https://') ||
             urlString.startsWith('data:') ||
             urlString.startsWith('blob:');
    };

    // Helper to construct URL
    const constructUrl = (url: string) => {
      if (!url) return '';
      if (isAbsoluteUrl(url)) return url;

      // Ensure baseUrl has protocol
      const base = baseUrl.startsWith('http')
        ? baseUrl
        : `http://${baseUrl}`;

      // Ensure path starts with /
      const path = url.startsWith('/') ? url : `/${url}`;

      return `${base}${path}`;
    };

    if (mode === 'comparison') {
      // Two images side-by-side
      const imageUrl = constructUrl(imageData.image.url);
      const imageUrl2 = constructUrl(imageData.url2 || '');

      return `
        <div class="content-image content-image-comparison">
          <div class="comparison-container">
            <div class="comparison-image">
              <img src="${imageUrl}" alt="Image 1" crossorigin="anonymous" />
            </div>
            <div class="comparison-image">
              <img src="${imageUrl2}" alt="Image 2" crossorigin="anonymous" />
            </div>
          </div>
        </div>
      `;
    } else {
      // Single image (existing code)
      if (!imageData.image.url) {
        return '';
      }

      const { url, width, height, objectFit = 'cover', borderRadius = 0 } = imageData.image;
      const fullUrl = constructUrl(url);

      return `
        <div class="content-image-wrapper">
          <img
            src="${fullUrl}"
            alt="Content image"
            class="content-image"
            crossorigin="anonymous"
            style="
              width: ${width}px;
              height: ${height}px;
              object-fit: ${objectFit};
              border-radius: ${borderRadius}px;
            "
          />
        </div>
      `;
    }
  },

  /**
   * Generates CSS for the content image positioning and styling
   */
  generateCSS: (data: ModuleData, options: CompositionOptions) => {
    const imageData = data as ContentImageModule;

    if (!imageData.enabled) {
      return '';
    }

    const mode = imageData.mode || 'single';

    // Base styles
    let css = `
      .content-image {
        position: relative;
        z-index: 5;
      }
    `;

    if (mode === 'comparison') {
      // Comparison mode: side-by-side layout
      css += `
        .comparison-container {
          display: flex;
          gap: ${imageData.comparisonGap || 16}px;
          align-items: center;
          justify-content: center;
        }

        .comparison-image {
          flex: 1;
          max-width: ${(imageData.maxWidth || 100) / 2}%;
        }

        .comparison-image img {
          width: 100%;
          height: auto;
          max-height: ${imageData.maxHeight || 100}%;
          object-fit: ${imageData.objectFit || 'cover'};
          object-position: ${imageData.position || 'center'};
          border-radius: ${imageData.borderRadius || 12}px;
        }
      `;
    } else {
      // Single mode styles
      if (!imageData.image.url) {
        return '';
      }

      const { position } = imageData.image;

      css = `
        .content-image-wrapper {
          position: absolute;
          left: ${position.x}%;
          top: ${position.y}%;
          transform: translate(-50%, -50%);
          z-index: 10;
        }

        .content-image {
          display: block;
          max-width: 100%;
          height: auto;
        }
      `;
    }

    // Add shadow if enabled
    if (imageData.shadow?.enabled) {
      const s = imageData.shadow;
      css += `
        .content-image img,
        .comparison-image img {
          box-shadow: 0 0 ${s.blur}px ${s.spread}px ${s.color};
        }
      `;
    }

    return css;
  },
};

export default contentImageModule;
