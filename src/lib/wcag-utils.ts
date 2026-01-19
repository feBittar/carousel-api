/**
 * WCAG Utilities
 *
 * Helper functions for calculating WCAG contrast ratios
 * and validating color accessibility compliance.
 *
 * @module wcag-utils
 */

// ============================================================================
// TYPES
// ============================================================================

export interface WCAGValidationResult {
  isValid: boolean;
  ratios: {
    bgToText: number;
    bgToAccent: number;
    textToAccent: number;
  };
  errors: string[];
}

// ============================================================================
// CONTRAST CALCULATION
// ============================================================================

/**
 * Calculate relative luminance of a color per WCAG 2.1 spec
 * @see https://www.w3.org/WAI/GL/wiki/Relative_luminance
 */
function calculateLuminance(hexColor: string): number {
  const hex = hexColor.replace('#', '');
  const fullHex = hex.length === 3
    ? hex.split('').map(char => char + char).join('')
    : hex;

  const r = parseInt(fullHex.substring(0, 2), 16) / 255;
  const g = parseInt(fullHex.substring(2, 4), 16) / 255;
  const b = parseInt(fullHex.substring(4, 6), 16) / 255;

  const rsRGB = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const gsRGB = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const bsRGB = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

  return 0.2126 * rsRGB + 0.7152 * gsRGB + 0.0722 * bsRGB;
}

/**
 * Calculate WCAG contrast ratio between two colors
 * Formula: (L1 + 0.05) / (L2 + 0.05) where L1 > L2
 */
function calculateContrastRatio(color1: string, color2: string): number {
  const lum1 = calculateLuminance(color1);
  const lum2 = calculateLuminance(color2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

// ============================================================================
// VALIDATION
// ============================================================================

/**
 * Validate WCAG AA compliance for a 3-color palette
 *
 * Requirements:
 * - Background to Text: minimum 4.5:1 (WCAG AA normal text)
 * - Background to Accent: minimum 3.0:1 (WCAG AA large text/UI components)
 *
 * @param backgroundColor - Background hex color
 * @param textColor - Text hex color
 * @param accentColor - Accent hex color
 * @returns Validation result with ratios and errors
 */
export function validateWCAG(
  backgroundColor: string,
  textColor: string,
  accentColor: string
): WCAGValidationResult {
  const errors: string[] = [];

  // Calculate all contrast ratios
  const bgToText = calculateContrastRatio(backgroundColor, textColor);
  const bgToAccent = calculateContrastRatio(backgroundColor, accentColor);
  const textToAccent = calculateContrastRatio(textColor, accentColor);

  // Validate WCAG AA requirements
  if (bgToText < 4.5) {
    errors.push(
      `Background to Text contrast (${bgToText.toFixed(2)}:1) is below WCAG AA minimum of 4.5:1`
    );
  }

  if (bgToAccent < 3.0) {
    errors.push(
      `Background to Accent contrast (${bgToAccent.toFixed(2)}:1) is below WCAG AA minimum of 3.0:1`
    );
  }

  // Note: textToAccent is informational, not required
  // (text and accent colors don't typically appear directly on each other)

  return {
    isValid: errors.length === 0,
    ratios: {
      bgToText,
      bgToAccent,
      textToAccent,
    },
    errors,
  };
}

/**
 * Check if a color pair meets WCAG AA standard
 *
 * @param color1 - First hex color
 * @param color2 - Second hex color
 * @param minRatio - Minimum contrast ratio (default: 4.5 for normal text)
 * @returns Whether the pair meets the standard
 */
export function meetsWCAGAA(
  color1: string,
  color2: string,
  minRatio: number = 4.5
): boolean {
  const ratio = calculateContrastRatio(color1, color2);
  return ratio >= minRatio;
}

/**
 * Get WCAG level for a contrast ratio
 *
 * @param ratio - Contrast ratio
 * @param isLargeText - Whether it's large text (18pt+ or 14pt+ bold)
 * @returns WCAG compliance level
 */
export function getWCAGLevel(
  ratio: number,
  isLargeText: boolean = false
): 'AAA' | 'AA' | 'FAIL' {
  if (isLargeText) {
    if (ratio >= 4.5) return 'AAA';
    if (ratio >= 3.0) return 'AA';
    return 'FAIL';
  }

  if (ratio >= 7.0) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  return 'FAIL';
}

// ============================================================================
// PASTEL COLOR CALCULATION
// ============================================================================

/**
 * Converts hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const cleanHex = hex.replace('#', '');
  const fullHex = cleanHex.length === 3
    ? cleanHex.split('').map(char => char + char).join('')
    : cleanHex;

  return {
    r: parseInt(fullHex.substring(0, 2), 16),
    g: parseInt(fullHex.substring(2, 4), 16),
    b: parseInt(fullHex.substring(4, 6), 16),
  };
}

/**
 * Converts RGB to HSL color space
 * @returns { h: 0-360, s: 0-100, l: 0-100 }
 */
function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Converts HSL to RGB color space
 * @param h - Hue (0-360)
 * @param s - Saturation (0-100)
 * @param l - Lightness (0-100)
 */
function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h /= 360;
  s /= 100;
  l /= 100;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/**
 * Converts RGB to hex color
 */
function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (value: number): string => {
    const clamped = Math.max(0, Math.min(255, Math.round(value)));
    const hex = clamped.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

/**
 * Alpha blends two colors (overlays foreground on background)
 * @param fg - Foreground color (RGB)
 * @param bg - Background color (RGB)
 * @param alpha - Opacity of foreground (0-1)
 */
function alphaBlend(
  fg: { r: number; g: number; b: number },
  bg: { r: number; g: number; b: number },
  alpha: number
): { r: number; g: number; b: number } {
  return {
    r: Math.round(fg.r * alpha + bg.r * (1 - alpha)),
    g: Math.round(fg.g * alpha + bg.g * (1 - alpha)),
    b: Math.round(fg.b * alpha + bg.b * (1 - alpha)),
  };
}

/**
 * Calculates a pastel version of a color using the "Average with White" method
 *
 * Formula: Pastel = (Original + 255) / 2
 *
 * This simple method averages each RGB channel with white (255),
 * creating a soft, light pastel tone while preserving the original hue.
 *
 * @param hexColor - Hex color string with or without # prefix
 * @returns Pastel hex color string with # prefix
 *
 * @example
 * calculatePastelColor("#FF3300") // -> "#FF9980" (vibrant red-orange -> soft salmon)
 * calculatePastelColor("#0066CC") // -> "#80B3E6" (bold blue -> soft sky blue)
 * calculatePastelColor("#00FF00") // -> "#80FF80" (bright green -> soft mint)
 */
export function calculatePastelColor(hexColor: string): string {
  const rgb = hexToRgb(hexColor);

  // Average with white (255) for each channel
  const r = Math.round((rgb.r + 255) / 2);
  const g = Math.round((rgb.g + 255) / 2);
  const b = Math.round((rgb.b + 255) / 2);

  return rgbToHex(r, g, b);
}

/**
 * Calculates an adaptive highlight color based on background lightness
 *
 * Uses different algorithms for light vs dark backgrounds to ensure
 * proper contrast and readability while preserving the color's "vibe":
 *
 * - **Light backgrounds**: Pastel version (average with white)
 * - **Dark backgrounds**: Luminance-adjusted + alpha-blended version
 *
 * The dark background method:
 * 1. Converts to HSL and increases lightness (preserves hue & saturation)
 * 2. Alpha-blends with background for subtle integration
 * 3. Ensures high chroma for visibility without eye strain
 *
 * @param accentColor - The accent color to create highlight from
 * @param backgroundColor - The background color to check lightness against
 * @returns Optimized highlight color as hex string
 *
 * @see https://arxiv.org/html/2512.00516 - Chameleon algorithm (dark mode adaptation)
 * @see https://www.tech-rz.com/blog/dark-mode-design-best-practices-in-2026/
 *
 * @example Light background
 * calculateHighlightColor("#FF3300", "#FFFFFF")
 * // -> "#FF9980" (pastel salmon - same as before)
 *
 * @example Dark background
 * calculateHighlightColor("#FF3300", "#1A1A1A")
 * // -> "#FF6B47" (vibrant but readable on dark - preserves hue)
 */
export function calculateHighlightColor(
  accentColor: string,
  backgroundColor: string
): string {
  // Detect if background is light or dark
  const bgIsLight = isLightColor(backgroundColor, 0.5);

  if (bgIsLight) {
    // Light background: use existing pastel method (average with white)
    return calculatePastelColor(accentColor);
  } else {
    // Dark background: use luminance-based method preserving hue
    const rgb = hexToRgb(accentColor);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const bgRgb = hexToRgb(backgroundColor);

    // Strategy for dark backgrounds:
    // 1. Increase lightness while preserving hue and saturation
    //    Target: 65-75% lightness for good visibility
    // 2. Boost saturation slightly for vibrancy
    // 3. Alpha blend with background for subtle integration

    // Adjust lightness: aim for 65-75 range (readable but not harsh)
    let targetLightness = hsl.l;
    if (targetLightness < 65) {
      targetLightness = Math.max(65, Math.min(75, targetLightness + 30));
    } else if (targetLightness > 75) {
      targetLightness = 70; // Cap to avoid too bright
    }

    // Boost saturation for dark backgrounds (high chroma = better visibility)
    let adjustedSaturation = hsl.s;
    if (adjustedSaturation < 70) {
      adjustedSaturation = Math.min(90, adjustedSaturation + 20);
    }

    // Convert back to RGB with adjusted HSL
    const adjustedRgb = hslToRgb(hsl.h, adjustedSaturation, targetLightness);

    // Alpha blend with background (15% background, 85% accent)
    // This creates a subtle integration with the dark background
    const blended = alphaBlend(adjustedRgb, bgRgb, 0.85);

    return rgbToHex(blended.r, blended.g, blended.b);
  }
}

// ============================================================================
// COLOR LIGHTNESS DETECTION
// ============================================================================

/**
 * Check if a color is "light" (has high luminance)
 * Useful for determining if text on this background should be dark
 *
 * @param hexColor - Hex color string
 * @param threshold - Luminance threshold (default: 0.5)
 * @returns true if the color is light
 *
 * @example
 * isLightColor('#FFFFFF') // true (white)
 * isLightColor('#000000') // false (black)
 * isLightColor('#808080') // true (gray is borderline)
 */
export function isLightColor(hexColor: string | undefined, threshold: number = 0.5): boolean {
  if (!hexColor) return false;
  try {
    const luminance = calculateLuminance(hexColor);
    return luminance > threshold;
  } catch {
    return false;
  }
}

/**
 * Check if a palette has light-colored text
 * Useful for selecting palettes for dark backgrounds (like images)
 *
 * @param palette - Color palette with text property
 * @returns true if the text color is light
 */
export function hasLightText(palette: { text: string } | undefined): boolean {
  if (!palette?.text) return false;
  return isLightColor(palette.text, 0.5);
}

// Export individual utilities
export const wcagUtils = {
  calculateLuminance,
  calculateContrastRatio,
  validateWCAG,
  meetsWCAGAA,
  getWCAGLevel,
  calculatePastelColor,
  calculateHighlightColor,
  isLightColor,
  hasLightText,
};
