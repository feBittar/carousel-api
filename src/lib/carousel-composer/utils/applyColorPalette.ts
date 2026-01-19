/**
 * Apply Color Palette Utility
 *
 * Automatically applies a 3-color palette to carousel slide visual configurations.
 * Maps palette colors to appropriate module properties while preserving structure
 * and non-color properties.
 *
 * Color Mapping Strategy:
 * - palette.background -> viewport.backgroundColor, card.backgroundColor
 * - palette.text -> textFields default color
 * - palette.accent -> styledChunks text color, highlights, corners (text + SVG)
 * - palette.pastelAccent -> styledChunks backgroundColor (softer color for text backgrounds)
 *
 * Note: gradientOverlay colors are NOT updated with palette colors
 *
 * @module applyColorPalette
 */

import type { ColorPalette } from '../../../types/color-palette.types';
import type { CarouselSlide, TextField, StyledChunk, GradientOverlay } from '../types';
import { isLightColor, calculateHighlightColor } from '../../wcag-utils';

// ============================================================================
// BACKGROUND IMAGE DETECTION
// ============================================================================

/**
 * Check if a slide has a background image (viewport or card)
 *
 * @param slide - Slide to check
 * @returns true if viewport or card has backgroundType='image' with a backgroundImage URL
 */
export function slideHasBackgroundImage(slide: CarouselSlide): boolean {
  const viewport = slide.modules?.viewport;
  const card = slide.modules?.card;

  const viewportHasImage = viewport?.backgroundType === 'image' && !!viewport?.backgroundImage;
  const cardHasImage = card?.backgroundType === 'image' && !!card?.backgroundImage;

  return viewportHasImage || cardHasImage;
}

/**
 * Extract the effective background color from a slide
 *
 * Priority order:
 * 1. Card backgroundColor (if card uses color background)
 * 2. Viewport backgroundColor (if viewport uses color background)
 * 3. Palette background (fallback)
 *
 * @param slide - Slide to extract background from
 * @param palette - Palette to use as fallback
 * @returns Effective background color as hex string
 */
function getSlideBackgroundColor(slide: CarouselSlide, palette: ColorPalette): string {
  const card = slide.modules?.card;
  const viewport = slide.modules?.viewport;

  // Priority 1: Card background (if using color type)
  if (card?.backgroundType === 'color' && card?.backgroundColor) {
    return card.backgroundColor;
  }

  // Priority 2: Viewport background (if using color type)
  if (viewport?.backgroundType === 'color' && viewport?.backgroundColor) {
    return viewport.backgroundColor;
  }

  // Fallback: Palette background
  return palette.background;
}

/**
 * Create an inverted palette (swap background and text colors)
 *
 * @param palette - Original palette
 * @returns New palette with background and text swapped
 */
export function createInvertedPalette(palette: ColorPalette): ColorPalette {
  return {
    ...palette,
    id: `${palette.id}-inverted`,
    name: `${palette.name} (Invertida)`,
    background: palette.text,
    text: palette.background,
    // Keep accent and pastelAccent unchanged
  };
}

/**
 * Select the best palette for a slide based on background image presence
 *
 * When a slide has a background image, we need text to be readable over it.
 * Since images typically have gradients/overlays, light text is usually more legible.
 *
 * @param slide - Slide to analyze
 * @param primaryPalette - Primary palette
 * @param secondaryPalette - Secondary/inverted palette (optional, will be calculated if not provided)
 * @returns The palette that should be used for this slide
 */
export function selectPaletteForSlide(
  slide: CarouselSlide,
  primaryPalette: ColorPalette,
  secondaryPalette?: ColorPalette
): ColorPalette {
  const hasBgImage = slideHasBackgroundImage(slide);

  console.log('[selectPaletteForSlide] Checking slide:', {
    slideId: slide.id,
    hasModules: !!slide.modules,
    hasViewport: !!slide.modules?.viewport,
    viewportBgType: slide.modules?.viewport?.backgroundType,
    viewportBgImage: slide.modules?.viewport?.backgroundImage?.substring(0, 50),
    hasBgImage,
  });

  if (!hasBgImage) {
    return primaryPalette;
  }

  // Slide has background image - select palette with lighter text
  const secondary = secondaryPalette || createInvertedPalette(primaryPalette);

  const primaryHasLightText = isLightColor(primaryPalette.text);
  const secondaryHasLightText = isLightColor(secondary.text);

  console.log('[selectPaletteForSlide] Palette analysis:', {
    primaryText: primaryPalette.text,
    primaryHasLightText,
    secondaryText: secondary.text,
    secondaryHasLightText,
    selectedPalette: primaryHasLightText ? 'primary' : (secondaryHasLightText ? 'secondary' : 'secondary-fallback'),
  });

  // Prefer the palette with light text for background images
  if (primaryHasLightText) {
    return primaryPalette;
  }
  if (secondaryHasLightText) {
    return secondary;
  }

  // Neither has light text - return secondary (inverted) as it's more likely to work
  return secondary;
}

// ============================================================================
// TYPE GUARDS & VALIDATORS
// ============================================================================

/**
 * Checks if a color value is "intentional" (not default black/white).
 * Intentional colors are custom selections that should be updated with palette.
 *
 * Default colors that are considered "unintentional":
 * - Pure black: #000000, #000, rgb(0,0,0)
 * - Pure white: #FFFFFF, #FFF, rgb(255,255,255)
 * - Empty/undefined values
 *
 * @example
 * isIntentionalColor('#2563EB') // true - custom blue
 * isIntentionalColor('#000000') // false - default black
 * isIntentionalColor('#FFFFFF') // false - default white
 * isIntentionalColor(undefined) // false - no color set
 */
export function isIntentionalColor(color: string | undefined): boolean {
  if (!color || color.trim() === '') return false;

  const normalized = normalizeColor(color);

  // Consider these as "default" or unintentional colors
  const defaultColors = [
    '#000000', // Pure black
    '#ffffff', // Pure white
    'rgb(0,0,0)',
    'rgb(255,255,255)',
    'rgba(0,0,0,1)',
    'rgba(255,255,255,1)',
  ];

  return !defaultColors.includes(normalized);
}

/**
 * Normalizes color values to lowercase hex for comparison.
 * Handles hex (#), rgb(), and rgba() formats.
 *
 * @example
 * normalizeColor('#2563EB') // '#2563eb'
 * normalizeColor('RGB(37, 99, 235)') // 'rgb(37,99,235)'
 * normalizeColor('  #FFF  ') // '#ffffff'
 */
function normalizeColor(color: string): string {
  const trimmed = color.trim().toLowerCase();

  // Normalize hex shorthand (#FFF -> #ffffff)
  if (/^#[0-9a-f]{3}$/i.test(trimmed)) {
    const [, r, g, b] = trimmed;
    return `#${r}${r}${g}${g}${b}${b}`;
  }

  // Remove spaces from rgb/rgba
  if (trimmed.startsWith('rgb')) {
    return trimmed.replace(/\s+/g, '');
  }

  return trimmed;
}

/**
 * Extracts alpha channel from rgba() colors.
 * Returns 1.0 (opaque) for colors without alpha.
 *
 * @example
 * extractAlpha('rgba(37, 99, 235, 0.5)') // 0.5
 * extractAlpha('#2563EB') // 1.0
 * extractAlpha('rgb(37, 99, 235)') // 1.0
 */
function extractAlpha(color: string | undefined): number {
  if (!color) return 1.0;

  const rgbaMatch = color.match(/rgba?\([^)]+,\s*([\d.]+)\)/);
  if (rgbaMatch) {
    return parseFloat(rgbaMatch[1]);
  }

  return 1.0;
}

/**
 * Applies alpha channel to a hex color.
 * Converts hex to rgba if alpha < 1.0.
 *
 * @example
 * applyAlpha('#2563EB', 0.5) // 'rgba(37, 99, 235, 0.5)'
 * applyAlpha('#2563EB', 1.0) // '#2563EB'
 */
function applyAlpha(hexColor: string, alpha: number): string {
  if (alpha >= 1.0) return hexColor;

  // Convert hex to RGB
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Checks if a color is malformed or invalid.
 *
 * @example
 * isMalformedColor('#2563EB') // false - valid hex
 * isMalformedColor('blue') // true - not hex/rgb
 * isMalformedColor('#GGG') // true - invalid hex
 */
function isMalformedColor(color: string | undefined): boolean {
  if (!color) return false;

  const trimmed = color.trim();

  // Valid hex: #RGB or #RRGGBB
  const hexRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
  if (hexRegex.test(trimmed)) return false;

  // Valid rgb/rgba
  const rgbRegex = /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*[\d.]+\s*)?\)$/;
  if (rgbRegex.test(trimmed)) return false;

  return true;
}

// ============================================================================
// MODULE COLOR UPDATERS
// ============================================================================

/**
 * Updates viewport module colors with palette.
 *
 * Applies:
 * - palette.background -> viewport.backgroundColor
 *
 * Note: gradientOverlay.color is NOT updated with palette colors
 *
 * Preserves:
 * - backgroundType
 * - backgroundImage
 * - blurEnabled/blurAmount
 * - All gradient properties (including color)
 */
function updateViewportColors(
  viewport: any,
  palette: ColorPalette
): any {
  if (!viewport) return viewport;

  const updated = { ...viewport };

  // Update background color if using color type
  if (viewport.backgroundType === 'color') {
    updated.backgroundColor = palette.background;
  }

  // NOTE: gradientOverlay.color is NOT updated with palette colors
  // Gradients should maintain their original colors or be controlled separately

  return updated;
}

/**
 * Updates card module colors with palette.
 *
 * Applies:
 * - palette.background -> card.backgroundColor
 *
 * Note: gradientOverlay.color is NOT updated with palette colors
 *
 * Preserves:
 * - backgroundType
 * - backgroundImage
 * - Padding, shadow, border configurations
 * - All layout properties
 * - All gradient properties (including color)
 */
function updateCardColors(
  card: any,
  palette: ColorPalette
): any {
  if (!card) return card;

  const updated = { ...card };

  // Update background color if using color type
  if (card.backgroundType === 'color') {
    updated.backgroundColor = palette.background;
  }

  // NOTE: gradientOverlay.color is NOT updated with palette colors
  // Gradients should maintain their original colors or be controlled separately

  return updated;
}

/**
 * Updates styled chunks colors with palette.
 *
 * Applies:
 * - palette.accent to text color (chunk.color) with intentional colors
 * - Smart highlight color (adaptive to background) to background color (chunk.backgroundColor)
 *
 * The highlight color is calculated dynamically based on the slide's background:
 * - Light backgrounds: Pastel version (average with white)
 * - Dark backgrounds: Luminance-adjusted version preserving hue
 *
 * Preserves all other styling (bold, italic, spacing, etc.)
 *
 * @param chunks - Array of styled chunks to update
 * @param palette - Color palette to apply
 * @param slideBackgroundColor - The effective background color of the slide
 *
 * @example Input chunk (on light background)
 * {
 *   text: "Highlight",
 *   color: "#FF5733",
 *   bold: true,
 *   backgroundColor: "#FFEB3B"
 * }
 *
 * @example Output chunk (on light background: #FFFFFF, palette.accent = "#FF3300")
 * {
 *   text: "Highlight",
 *   color: "#FF3300",      // Updated with accent
 *   bold: true,
 *   backgroundColor: "#FF9980" // Pastel salmon (light background method)
 * }
 *
 * @example Output chunk (on dark background: #1A1A1A, palette.accent = "#FF3300")
 * {
 *   text: "Highlight",
 *   color: "#FF3300",      // Updated with accent
 *   bold: true,
 *   backgroundColor: "#FF6B47" // Vibrant but readable (dark background method)
 * }
 */
function updateStyledChunkColors(
  chunks: StyledChunk[] | undefined,
  palette: ColorPalette,
  slideBackgroundColor: string
): StyledChunk[] | undefined {
  if (!chunks || chunks.length === 0) return chunks;

  return chunks.map(chunk => {
    const updated = { ...chunk };

    // IMPORTANT: Apply accent color to chunks with useAccentColor flag
    // This flag is set by AI generation for highlighted words
    if (chunk.useAccentColor && !chunk.color) {
      updated.color = palette.accent;
    }
    // Update text color if intentional (for manually colored chunks)
    else if (isIntentionalColor(chunk.color)) {
      const alpha = extractAlpha(chunk.color);
      updated.color = applyAlpha(palette.accent, alpha);
    }

    // Update background color with ADAPTIVE highlight color
    // This intelligently adjusts based on the slide's background (light vs dark)
    if (isIntentionalColor(chunk.backgroundColor)) {
      const alpha = extractAlpha(chunk.backgroundColor);
      // Calculate highlight color adaptively based on background lightness
      const highlightColor = calculateHighlightColor(palette.accent, slideBackgroundColor);
      updated.backgroundColor = applyAlpha(highlightColor, alpha);
    }

    // Update blur color if intentional
    if (isIntentionalColor(chunk.blurColor)) {
      const alpha = extractAlpha(chunk.blurColor);
      updated.blurColor = applyAlpha(palette.accent, alpha);
    }

    return updated;
  });
}

/**
 * Updates text field colors with palette.
 *
 * Applies:
 * - palette.text -> field.style.color (default - when useAccentColor is false)
 * - palette.accent -> field.style.color (when useAccentColor is true)
 * - palette.accent -> styledChunks with custom colors
 * - Adaptive highlight color -> field.style.backgroundColor and styledChunks backgroundColor
 *
 * Preserves:
 * - Font properties (family, size, weight, etc.)
 * - Layout properties (textAlign, lineHeight, etc.)
 * - Position and special position settings
 */
function updateTextFieldColors(
  field: TextField,
  palette: ColorPalette,
  slideBackgroundColor: string
): TextField {
  const updated = { ...field };

  // Update default text color
  // If useAccentColor is true, apply accent color instead of text color
  if (updated.style) {
    updated.style = {
      ...updated.style,
      color: field.useAccentColor ? palette.accent : palette.text,
    };

    // Update background color with adaptive highlight color
    if (isIntentionalColor(field.style.backgroundColor)) {
      const alpha = extractAlpha(field.style.backgroundColor);
      const highlightColor = calculateHighlightColor(palette.accent, slideBackgroundColor);
      updated.style.backgroundColor = applyAlpha(highlightColor, alpha);
    }
  }

  // Update styled chunks (only if useAccentColor is true or chunks have intentional colors)
  if (field.styledChunks && field.styledChunks.length > 0) {
    updated.styledChunks = updateStyledChunkColors(
      field.styledChunks,
      palette,
      slideBackgroundColor
    );
  }

  return updated;
}

/**
 * Updates textFields module colors with palette.
 *
 * Iterates through all fields and applies color updates.
 * Preserves module-level settings (count, gap, alignment, etc.)
 */
function updateTextFieldsModuleColors(
  textFields: any,
  palette: ColorPalette,
  slideBackgroundColor: string
): any {
  if (!textFields || !textFields.fields) return textFields;

  return {
    ...textFields,
    fields: textFields.fields.map((field: TextField) =>
      updateTextFieldColors(field, palette, slideBackgroundColor)
    ),
  };
}

/**
 * Updates corners module colors with palette.
 *
 * Applies palette.accent to:
 * - textStyle.color (when corner type = 'text', 'contador', or 'dynamic' with text-based source)
 * - svgColor (when corner type = 'svg' or 'dynamic' with logo source)
 *
 * Preserves all other corner properties (padding, position, etc.)
 */
function updateCornersModuleColors(
  corners: any,
  palette: ColorPalette
): any {
  if (!corners || !corners.corners || !Array.isArray(corners.corners)) {
    return corners;
  }

  return {
    ...corners,
    corners: corners.corners.map((corner: any) => {
      const updated = { ...corner };

      // Update text color for text-type corners
      if (corner.type === 'text' && corner.textStyle) {
        updated.textStyle = {
          ...corner.textStyle,
          color: palette.accent,
        };
      }

      // Update SVG color for svg-type corners
      if (corner.type === 'svg') {
        updated.svgColor = palette.accent;
      }

      // Update text color for contador-type corners (slide counter like "1/5")
      if (corner.type === 'contador' && corner.textStyle) {
        updated.textStyle = {
          ...corner.textStyle,
          color: palette.accent,
        };
      }

      // Update colors for dynamic-type corners based on dynamicSource
      if (corner.type === 'dynamic') {
        const dynamicSource = corner.dynamicSource || 'slide_counter';

        // Logo renders as SVG, so update svgColor
        if (dynamicSource === 'logo') {
          updated.svgColor = palette.accent;
        }
        // All other dynamic sources render as text (slide_counter, company_name, instagram_handle, industry)
        else if (corner.textStyle) {
          updated.textStyle = {
            ...corner.textStyle,
            color: palette.accent,
          };
        }
      }

      return updated;
    }),
  };
}

// ============================================================================
// MAIN PALETTE APPLICATION FUNCTION
// ============================================================================

/**
 * Applies a color palette to a single carousel slide.
 *
 * Updates all color-related properties in the slide's modules while
 * preserving structure, images, and non-color configurations.
 *
 * Color Mapping:
 * - palette.background -> viewport.backgroundColor, card.backgroundColor
 * - palette.text -> textFields.fields[].style.color (when useAccentColor = false)
 * - palette.accent -> textFields text (when useAccentColor = true), styledChunks text color, corners (text + SVG)
 * - palette.pastelAccent -> styledChunks backgroundColor (softer color for text backgrounds)
 *
 * Note: gradientOverlay colors are NOT updated with palette colors
 *
 * Smart Application Rules:
 * - Only updates "intentional" colors (not default black/white)
 * - Preserves alpha channels from original colors
 * - Handles malformed colors gracefully (skips update)
 * - Keeps images and structural properties unchanged
 *
 * @param slide - Carousel slide to update
 * @param palette - Color palette to apply
 * @returns New slide object with colors updated (immutable)
 *
 * @example
 * const updatedSlide = applyPaletteToSlide(originalSlide, professionalBluePalette);
 * // All colors updated, structure preserved
 */

/**
 * Updates imageTextBox module colors with palette.
 *
 * Applies:
 * - palette.text -> textConfig.fields[].style.color (when useAccentColor = false)
 * - palette.accent -> textConfig.fields[].style.color (when useAccentColor = true)
 * - palette.accent -> styledChunks text color
 * - Adaptive highlight color -> styledChunks backgroundColor
 *
 * Preserves all other properties (layout, image config, etc.)
 */
function updateImageTextBoxModuleColors(
  imageTextBox: any,
  palette: ColorPalette,
  slideBackgroundColor: string
): any {
  if (!imageTextBox || !imageTextBox.textConfig || !imageTextBox.textConfig.fields) {
    return imageTextBox;
  }

  return {
    ...imageTextBox,
    textConfig: {
      ...imageTextBox.textConfig,
      fields: imageTextBox.textConfig.fields.map((field: any) => {
        const updated = { ...field };

        // Update default text color based on useAccentColor flag
        if (updated.style) {
          updated.style = {
            ...updated.style,
            color: field.useAccentColor ? palette.accent : palette.text,
          };

          // Update background color with adaptive highlight color
          if (isIntentionalColor(field.style.backgroundColor)) {
            const alpha = extractAlpha(field.style.backgroundColor);
            const highlightColor = calculateHighlightColor(palette.accent, slideBackgroundColor);
            updated.style.backgroundColor = applyAlpha(highlightColor, alpha);
          }
        }

        // Update styled chunks
        if (field.styledChunks && field.styledChunks.length > 0) {
          updated.styledChunks = updateStyledChunkColors(
            field.styledChunks,
            palette,
            slideBackgroundColor
          );
        }

        return updated;
      }),
    },
  };
}

export function applyPaletteToSlide(
  slide: CarouselSlide,
  palette: ColorPalette
): CarouselSlide {
  // Deep clone to avoid mutation
  const updated = { ...slide, modules: { ...slide.modules } };

  // Update viewport module FIRST (establishes background color)
  if (updated.modules.viewport) {
    updated.modules.viewport = updateViewportColors(
      updated.modules.viewport,
      palette
    );
  }

  // Update card module SECOND (may override background color)
  if (updated.modules.card) {
    updated.modules.card = updateCardColors(
      updated.modules.card,
      palette
    );
  }

  // Extract effective background color AFTER viewport and card are updated
  // This ensures we get the correct background for highlight calculation
  const slideBackgroundColor = getSlideBackgroundColor(updated, palette);

  // Update textFields module with adaptive highlight colors
  if (updated.modules.textFields) {
    updated.modules.textFields = updateTextFieldsModuleColors(
      updated.modules.textFields,
      palette,
      slideBackgroundColor
    );
  }

  // Update corners module
  if (updated.modules.corners) {
    updated.modules.corners = updateCornersModuleColors(
      updated.modules.corners,
      palette
    );
  }


  // Update imageTextBox module with adaptive highlight colors
  if (updated.modules.imageTextBox) {
    updated.modules.imageTextBox = updateImageTextBoxModuleColors(
      updated.modules.imageTextBox,
      palette,
      slideBackgroundColor
    );
  }
  // Future: Add support for other modules with color properties
  // - arrowBottomText (color, arrowColor)
  // - bullets (color, bulletColor)
  // - duo (backgroundColor per side)
  // - freeText (color, backgroundColor)
  // - svgElements (color per element)
  // - twitterPost (backgroundColor)

  return updated;
}

/**
 * Options for applying palette to visual config
 */
export interface ApplyPaletteOptions {
  /**
   * Enable smart palette selection based on background images.
   * When true, slides with background images will automatically use
   * a palette with light text for better readability.
   * @default true
   */
  smartPaletteSelection?: boolean;
}

/**
 * Applies a color palette to the entire visual config (all slides + freeImage).
 *
 * Iterates through all slides and applies the palette to each.
 * Preserves freeImage configuration (palette doesn't affect free images).
 *
 * Smart Palette Selection (enabled by default):
 * - Detects slides with background images (viewport or card)
 * - For those slides, automatically uses palette with light text
 * - Creates inverted palette if needed (swaps background/text)
 *
 * @param visualConfig - Complete visual config from slide_styles.visual_config
 * @param palette - Color palette to apply
 * @param options - Optional configuration for palette application
 * @returns New visual config with all slides updated (immutable)
 *
 * @example
 * const config = {
 *   slides: [slide1, slide2, slide3],
 *   freeImage: { enabled: true, url: '...', ... }
 * };
 *
 * const updated = applyPaletteToVisualConfig(config, oceanDepthPalette);
 * // All 3 slides have colors updated
 * // Slides with background images get palette with light text
 * // freeImage unchanged
 */
export function applyPaletteToVisualConfig(
  visualConfig: { slides: CarouselSlide[]; freeImage?: any | null },
  palette: ColorPalette,
  options: ApplyPaletteOptions = {}
): { slides: CarouselSlide[]; freeImage?: any | null } {
  const { smartPaletteSelection = true } = options;

  return {
    ...visualConfig,
    slides: visualConfig.slides.map(slide => {
      // Smart palette selection: use light-text palette for slides with background images
      const paletteToUse = smartPaletteSelection
        ? selectPaletteForSlide(slide, palette)
        : palette;
      return applyPaletteToSlide(slide, paletteToUse);
    }),
    // freeImage is not affected by palette (structural element)
  };
}

// ============================================================================
// UTILITY EXPORTS
// ============================================================================

/**
 * Gets all unique colors used in a slide (for palette extraction/analysis).
 *
 * Useful for:
 * - Analyzing existing slide colors
 * - Creating custom palettes from slides
 * - Color usage reports
 *
 * @param slide - Slide to extract colors from
 * @returns Array of unique hex colors found in the slide
 *
 * @example
 * const colors = extractSlideColors(mySlide);
 * // ['#F8FAFC', '#0F172A', '#2563EB', '#10B981']
 */
export function extractSlideColors(slide: CarouselSlide): string[] {
  const colors = new Set<string>();

  const addColor = (color: string | undefined) => {
    if (color && !isMalformedColor(color)) {
      colors.add(normalizeColor(color));
    }
  };

  // Extract from viewport
  if (slide.modules.viewport) {
    addColor(slide.modules.viewport.backgroundColor);
    addColor(slide.modules.viewport.gradientOverlay?.color);
  }

  // Extract from card
  if (slide.modules.card) {
    addColor(slide.modules.card.backgroundColor);
    addColor(slide.modules.card.gradientOverlay?.color);
  }

  // Extract from textFields
  if (slide.modules.textFields?.fields) {
    slide.modules.textFields.fields.forEach((field: TextField) => {
      addColor(field.style?.color);
      addColor(field.style?.backgroundColor);

      field.styledChunks?.forEach((chunk: StyledChunk) => {
        addColor(chunk.color);
        addColor(chunk.backgroundColor);
        addColor(chunk.blurColor);
      });
    });
  }

  return Array.from(colors);
}

/**
 * Validates if a palette can be safely applied to a slide.
 *
 * Checks:
 * - Palette has all required colors
 * - Palette colors are valid hex format
 * - Slide has modules that can receive colors
 *
 * @param slide - Slide to validate
 * @param palette - Palette to validate
 * @returns Validation result with success flag and error messages
 *
 * @example
 * const validation = validatePaletteApplication(mySlide, myPalette);
 * if (!validation.valid) {
 *   console.error('Cannot apply palette:', validation.errors);
 * }
 */
export function validatePaletteApplication(
  slide: CarouselSlide,
  palette: ColorPalette
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Validate palette colors
  if (!palette.background || isMalformedColor(palette.background)) {
    errors.push('Invalid palette background color');
  }
  if (!palette.text || isMalformedColor(palette.text)) {
    errors.push('Invalid palette text color');
  }
  if (!palette.accent || isMalformedColor(palette.accent)) {
    errors.push('Invalid palette accent color');
  }

  // Check if slide has colorable modules
  const hasColorableModules = !!(
    slide.modules.viewport ||
    slide.modules.card ||
    slide.modules.textFields
  );

  if (!hasColorableModules) {
    errors.push('Slide has no modules that can receive palette colors');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type { ColorPalette } from '../../../types/color-palette.types';
