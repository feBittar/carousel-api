/**
 * Font utility functions for carousel composer
 *
 * Handles proper CSS formatting for fonts with spaces in their names
 */

/**
 * Formats a font family name for CSS usage
 * - Adds quotes around font names with spaces
 * - Adds fallback fonts
 * - Handles special cases like Product Sans
 *
 * @param fontFamily - The font family name (e.g., "League Spartan", "Inter")
 * @param category - Optional font category for better fallbacks ('sans-serif', 'serif', 'monospace')
 * @returns Properly formatted CSS font-family value
 *
 * @example
 * formatFontFamily('League Spartan') → "'League Spartan', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
 * formatFontFamily('Inter') → "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
 * formatFontFamily('PT Serif', 'serif') → "'PT Serif', Georgia, serif"
 */
export function formatFontFamily(fontFamily: string, category?: 'sans-serif' | 'serif' | 'monospace'): string {
  if (!fontFamily || fontFamily === 'Arial') {
    return 'Arial, sans-serif';
  }

  // Special case: Product Sans (Google proprietary, use Quicksand as fallback)
  if (fontFamily === 'Product Sans') {
    return "'Product Sans', 'Quicksand', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  }

  // Check if font name contains spaces - if so, wrap in quotes
  const needsQuotes = fontFamily.includes(' ');
  const quotedFont = needsQuotes ? `'${fontFamily}'` : fontFamily;

  // Build fallback chain based on category
  let fallbacks: string;
  if (category === 'serif') {
    fallbacks = "Georgia, 'Times New Roman', serif";
  } else if (category === 'monospace') {
    fallbacks = "'Courier New', Courier, monospace";
  } else {
    // Default to sans-serif
    fallbacks = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  }

  return `${quotedFont}, ${fallbacks}`;
}

/**
 * Simplified version that only wraps font names in quotes if needed
 * Use this when you want to preserve existing fallbacks or don't need system fallbacks
 *
 * @param fontFamily - The font family name
 * @returns Font name with quotes if it contains spaces
 *
 * @example
 * quoteFontName('League Spartan') → "'League Spartan'"
 * quoteFontName('Inter') → "Inter"
 */
export function quoteFontName(fontFamily: string): string {
  if (!fontFamily) return 'Arial';

  const needsQuotes = fontFamily.includes(' ');
  return needsQuotes ? `'${fontFamily}'` : fontFamily;
}
