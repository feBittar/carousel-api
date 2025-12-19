/**
 * Text Fields Module
 *
 * Manages up to 5 independent text fields with full typography and positioning controls.
 * Each text field can be individually styled and positioned within the carousel card.
 *
 * ARCHITECTURE (matching image-gen-nextjs):
 * - Creates a .text-section container (flex layout)
 * - Each field is a .text-item div
 * - position: absolute ONLY if field.freePosition === true
 * - By default, fields use flex layout inside the card
 */

import type { TextFieldsModule, TextField, ModuleDefinition, ModuleData, CompositionOptions } from '../types';
import { applyStyledChunks } from '../utils/richTextConverter';

/**
 * Escapes HTML special characters to prevent XSS
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Helper function to get font-family with proper fallback
 * Product Sans is Google's proprietary font and not available on Google Fonts.
 * We provide Quicksand as a similar alternative.
 */
function getFontFamilyWithFallback(fontFamily: string): string {
  if (fontFamily === 'Product Sans') {
    // Product Sans with Quicksand fallback (similar geometric sans-serif)
    return "'Product Sans', 'Quicksand', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  }
  // For other fonts, use the font name with generic fallback
  return `'${fontFamily}', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
}

/**
 * Helper to calculate position CSS based on special position or manual values
 */
function getPositionCSS(field: TextField, viewportWidth: number, viewportHeight: number): string {
  const { specialPosition, specialPadding, position } = field;

  // If using special position, calculate position based on corner/edge
  if (specialPosition && specialPosition !== 'none') {
    // Convert percentage padding to pixels
    const paddingX = (viewportWidth * (specialPadding || 8)) / 100;
    const paddingY = (viewportHeight * (specialPadding || 8)) / 100;

    switch (specialPosition) {
      case 'top-left':
        return `top: ${paddingY}px; left: ${paddingX}px;`;
      case 'top-right':
        return `top: ${paddingY}px; right: ${paddingX}px;`;
      case 'top-center':
        return `top: ${paddingY}px; left: 50%; transform: translateX(-50%);`;
      case 'bottom-left':
        return `bottom: ${paddingY}px; left: ${paddingX}px;`;
      case 'bottom-right':
        return `bottom: ${paddingY}px; right: ${paddingX}px;`;
      case 'bottom-center':
        return `bottom: ${paddingY}px; left: 50%; transform: translateX(-50%);`;
      case 'center-left':
        return `top: 50%; left: ${paddingX}px; transform: translateY(-50%);`;
      case 'center-right':
        return `top: 50%; right: ${paddingX}px; transform: translateY(-50%);`;
      case 'center':
        return `top: 50%; left: 50%; transform: translate(-50%, -50%);`;
      default:
        break;
    }
  }

  // Use manual position values
  let css = '';
  if (position?.top) css += `top: ${position.top}; `;
  if (position?.left) css += `left: ${position.left}; `;

  return css;
}

/**
 * Exports CSS custom properties (CSS variables) for text fields
 * Only exports if enabled and has fields
 */
function getStyleVariables(data: ModuleData): Record<string, string> {
  const textData = data as TextFieldsModule;

  if (!textData.enabled || !textData.fields || textData.fields.length === 0) {
    return {};
  }

  // Export first field's style as variables (most commonly used)
  const firstField = textData.fields[0];
  if (!firstField || !firstField.style) {
    return {};
  }

  return {
    '--text-primary-color': firstField.style.color || '#000000',
    '--text-primary-font': firstField.style.fontFamily || 'Arial',
    '--text-primary-size': firstField.style.fontSize || '24px',
    '--text-primary-weight': firstField.style.fontWeight || '400',
  };
}

/**
 * Text Fields Module Definition
 */
export const textFieldsModule: ModuleDefinition = {
  id: 'textFields',
  name: 'Text Fields',
  description: 'Up to 5 independent text fields',
  icon: 'Type',
  category: 'content',
  zIndex: 10, // Content

  defaults: {
    enabled: true,
    count: 1,
    gap: 20,
    verticalAlign: 'bottom',
    layoutWidth: 'auto',
    alignSelf: 'stretch',
    autoSizeMode: 'off',
    autoSizeLargerIndex: 0,
    fields: [
      {
        content: 'Sample Text',
        style: {
          fontFamily: 'Inter',
          fontSize: '32px',
          fontWeight: '600',
          color: '#000000',
          textAlign: 'center',
          textTransform: 'none',
        },
        styledChunks: [],
        freePosition: false,
        position: { top: '50%', left: '50%' },
        specialPosition: 'none',
        specialPadding: 8,
      },
    ],
  } as TextFieldsModule,

  /**
   * Validates the text fields module data
   */
  validate: (data: ModuleData) => {
    const errors: string[] = [];
    const textData = data as TextFieldsModule;

    if (!textData.fields) {
      errors.push('Fields array is required');
      return { valid: false, errors };
    }

    // Validate maximum number of fields
    if (textData.fields.length > 5) {
      errors.push('Maximum of 5 text fields allowed');
    }

    // Validate each text field
    textData.fields.forEach((field: TextField, index: number) => {
      const fieldLabel = `Field ${index + 1}`;

      // Check if content exists (empty is allowed for now)
      if (field.content === undefined) {
        errors.push(`${fieldLabel}: Content property is required`);
      }

      // Validate style object exists
      if (!field.style) {
        errors.push(`${fieldLabel}: Style configuration is required`);
      }
    });

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Generates HTML for all text fields
   * Creates a .text-section container with .text-item children
   */
  generateHTML: (data: ModuleData, options: CompositionOptions) => {
    const textData = data as TextFieldsModule;

    if (!textData.enabled || !textData.fields || textData.fields.length === 0) {
      return '';
    }


    // Generate HTML for each active text field
    const textItems = textData.fields
      .slice(0, textData.count || textData.fields.length)
      .map((field, index) => {
        if (!field.content) {
          return '';
        }

        // Process styled chunks if available
        let processedContent = field.content;

        if (field.styledChunks && field.styledChunks.length > 0) {
          processedContent = applyStyledChunks(field.content, field.styledChunks, {
            fontFamily: field.style.fontFamily,
            fontSize: field.style.fontSize,
            color: field.style.color,
            fontWeight: field.style.fontWeight,
            letterSpacing: field.style.letterSpacing,
            lineHeight: field.style.lineHeight,
            backgroundColor: field.style.backgroundColor,
            padding: field.style.padding,
            textAlign: field.style.textAlign,
          });
        } else {
          processedContent = escapeHtml(field.content);
        }


        return `    <div class="text-item text-item-${index + 1}">${processedContent}</div>`;
      })
      .filter(Boolean)
      .join('\n');

    const html = `
  <!-- ===== TEXT FIELDS SECTION ===== -->
  <div class="text-section">
${textItems}
  </div>
  `.trim();


    return html;
  },

  /**
   * Generates CSS for all text fields (flex layout by default, absolute if freePosition)
   */
  generateCSS: (data: ModuleData, options: CompositionOptions) => {
    const textData = data as TextFieldsModule;

    if (!textData.enabled || !textData.fields || textData.fields.length === 0) {
      return '';
    }


    // Get viewport dimensions
    const viewportWidth = options.viewportWidth || 1080;
    const viewportHeight = options.viewportHeight || 1350;

    // Generate vertical alignment
    const alignmentMap: Record<string, string> = {
      top: 'flex-start',
      center: 'center',
      bottom: 'flex-end',
    };
    const justifyContent = alignmentMap[textData.verticalAlign || 'bottom'] || 'flex-end';

    // Check if auto-sizing is enabled
    const autoSizeEnabled = textData.autoSizeMode === 'proportional-3-1';

    // Generate individual text item styles
    const textItemStyles = textData.fields
      .slice(0, textData.count || textData.fields.length)
      .map((field, index) => {
        if (!field.content) return '';

        const style = field.style || {};
        const isFreePosition = field.freePosition || false;

        // Base text styles
        const textStyles = `
      font-family: ${getFontFamilyWithFallback(style.fontFamily || 'Arial')};
      ${!autoSizeEnabled ? `font-size: ${style.fontSize || '24px'};` : '/* font-size controlled by auto-size.js */'}
      font-weight: ${style.fontWeight || '400'};
      color: ${style.color || '#000000'};
      text-align: ${style.textAlign || 'left'};
      line-height: ${style.lineHeight || '1.2'};
      letter-spacing: ${style.letterSpacing || '0'};
      text-transform: ${style.textTransform || 'none'};
      ${style.textShadow ? `text-shadow: ${style.textShadow};` : ''}
      ${style.textDecoration ? `text-decoration: ${style.textDecoration};` : ''}
      ${style.backgroundColor ? `background-color: ${style.backgroundColor};` : ''}
      ${style.padding ? `padding: ${style.padding};` : ''}`.trim();

        // Position styles (only for free positioned items)
        const positionStyles = isFreePosition
          ? `position: absolute; ${getPositionCSS(field, viewportWidth, viewportHeight)}`
          : '';

        return `
    .text-item-${index + 1} {
      ${textStyles}
      ${positionStyles}
    }

    /* Hide if empty */
    .text-item-${index + 1}:empty {
      display: none;
    }
      `.trim();
      })
      .filter(Boolean)
      .join('\n\n');

    // CSS for styled chunks
    const styledChunksCss = `
    /* Styled chunks with background colors */
    .text-item span[style*="background-color"] {
      padding: 2px 4px;
      border-radius: 2px;
    }
  `;

    return `
    /* ===== TEXT FIELDS MODULE (z-index: 10) ===== */
    .text-section {
      display: flex;
      flex-direction: column;
      gap: ${textData.gap || 20}px;
      justify-content: ${justifyContent};
      align-items: stretch;
      width: 100%;
      flex: ${textData.layoutWidth === 'auto' ? '1 1 auto' : '0 1 auto'};
      flex-basis: ${textData.layoutWidth || 'auto'};
      align-self: ${textData.alignSelf || 'stretch'};
      min-width: 0;
      min-height: 0;
      flex-shrink: 1;
      position: relative;
      z-index: 10;
      box-sizing: border-box;
    }

    /* Base text item styles */
    .text-item {
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    /* Non-free-positioned items take full width */
    .text-item:not([style*="position: absolute"]) {
      width: 100%;
    }

    ${textItemStyles}

    ${styledChunksCss}
  `.trim();
  },

  getStyleVariables,
};

export default textFieldsModule;
