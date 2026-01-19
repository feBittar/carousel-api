/**
 * Color Palette System Type Definitions
 *
 * Comprehensive type safety for the 3-color palette system used across slide styles.
 * All palettes are WCAG AA compliant with validated contrast ratios.
 *
 * @module color-palette.types
 */

// ============================================================================
// BRANDED TYPES FOR HEX COLORS
// ============================================================================

/**
 * Branded type for validated hex color strings.
 * Ensures type safety and prevents mixing raw strings with color values.
 *
 * @example "#F8FAFC", "#2563EB", "#0F172A"
 */
export type HexColor = string & { readonly __brand: 'HexColor' };

/**
 * Type guard to validate and brand hex color strings.
 * Accepts both 3-digit (#RGB) and 6-digit (#RRGGBB) formats.
 *
 * @example
 * const color = "#F8FAFC";
 * if (isValidHexColor(color)) {
 *   // color is now typed as HexColor
 * }
 */
export function isValidHexColor(value: string): value is HexColor {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
}

/**
 * Helper to create a branded HexColor from a string.
 * Throws if the color is invalid.
 *
 * @throws {Error} If color format is invalid
 *
 * @example
 * const bg = createHexColor("#F8FAFC"); // HexColor
 * const invalid = createHexColor("blue"); // throws Error
 */
export function createHexColor(value: string): HexColor {
  if (!isValidHexColor(value)) {
    throw new Error(`Invalid hex color format: ${value}. Expected format: #RGB or #RRGGBB`);
  }
  return value;
}

// ============================================================================
// WCAG CONTRAST RATIO TYPES
// ============================================================================

/**
 * WCAG 2.1 contrast ratio value.
 * Valid range: 1.0 (no contrast) to 21.0 (maximum contrast - black on white)
 *
 * WCAG AA Requirements:
 * - Normal text: minimum 4.5:1
 * - Large text (18pt+): minimum 3:1
 * - UI components: minimum 3:1
 *
 * WCAG AAA Requirements:
 * - Normal text: minimum 7:1
 * - Large text: minimum 4.5:1
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
 */
export type ContrastRatio = number;

/**
 * WCAG contrast ratios for all color combinations in the palette.
 * All ratios must meet WCAG AA standards (minimum 4.5:1 for normal text).
 *
 * @example
 * {
 *   textOnBackground: 16.1,    // Text color on background - WCAG AAA
 *   accentOnBackground: 7.2    // Accent color on background - WCAG AA
 * }
 */
export interface WCAGContrastRatio {
  /** Contrast ratio between text color and background (min 4.5:1 for AA) */
  textOnBackground: ContrastRatio;

  /** Contrast ratio between accent color and background (min 3:1 for AA UI components) */
  accentOnBackground: ContrastRatio;
}

/**
 * WCAG compliance levels based on contrast ratios.
 */
export type WCAGLevel = 'AAA' | 'AA' | 'FAIL';

/**
 * Helper to determine WCAG compliance level from contrast ratio.
 *
 * @param ratio - Contrast ratio to evaluate
 * @param isLargeText - Whether the text is large (18pt+ or 14pt+ bold)
 * @returns WCAG compliance level
 *
 * @example
 * getWCAGLevel(7.5, false); // 'AAA' - exceeds 7:1 for normal text
 * getWCAGLevel(5.0, false); // 'AA' - meets 4.5:1 but not 7:1
 * getWCAGLevel(3.0, false); // 'FAIL' - below 4.5:1
 * getWCAGLevel(3.0, true);  // 'AA' - meets 3:1 for large text
 */
export function getWCAGLevel(ratio: ContrastRatio, isLargeText = false): WCAGLevel {
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
// PALETTE TYPE ENUMS
// ============================================================================

/**
 * Palette type indicator.
 * - 'predefined': System palette (one of 20 pre-configured palettes)
 * - 'custom': User-created palette (workspace-specific)
 */
export type PaletteType = 'predefined' | 'custom';

/**
 * Predefined palette IDs.
 * These 20 palettes are available system-wide and cannot be modified.
 */
export type PredefinedPaletteId =
  | 'professional-blue'
  | 'ocean-depth'
  | 'fresh-mint'
  | 'forest-dark'
  | 'sunset-warm'
  | 'ember-glow'
  | 'lavender-dream'
  | 'royal-purple'
  | 'slate-modern'
  | 'midnight-slate'
  | 'coral-reef'
  | 'golden-hour'
  | 'teal-wave'
  | 'deep-teal'
  | 'cherry-blossom'
  | 'plum-night'
  | 'sky-light'
  | 'lime-energy'
  | 'elegant-black'
  | 'pure-dark';

// ============================================================================
// MAIN COLOR PALETTE INTERFACE
// ============================================================================

/**
 * Complete color palette definition for slide styles.
 *
 * Each palette contains exactly 3 colors:
 * - background: Main canvas color
 * - text: Primary text color
 * - accent: Highlight/emphasis color
 *
 * All color combinations are validated for WCAG AA compliance.
 *
 * @example Predefined palette
 * {
 *   id: "professional-blue",
 *   type: "predefined",
 *   name: "Azul Profissional",
 *   description: "Paleta corporativa e confiável",
 *   background: "#F8FAFC",
 *   text: "#0F172A",
 *   accent: "#2563EB",
 *   wcagRatio: {
 *     textOnBackground: 16.1,
 *     accentOnBackground: 7.2
 *   },
 *   isActive: true,
 *   createdAt: "2026-01-06T10:00:00Z",
 *   updatedAt: "2026-01-06T10:00:00Z"
 * }
 *
 * @example Custom palette
 * {
 *   id: "cust_abc123xyz",
 *   type: "custom",
 *   name: "Brand Purple",
 *   description: "Company brand colors",
 *   workspaceId: "ws_123456",
 *   background: "#FFFFFF",
 *   text: "#1A1A1A",
 *   accent: "#7C3AED",
 *   wcagRatio: {
 *     textOnBackground: 19.2,
 *     accentOnBackground: 5.8
 *   },
 *   isActive: true,
 *   createdAt: "2026-01-06T11:30:00Z",
 *   updatedAt: "2026-01-06T11:30:00Z"
 * }
 */
export interface ColorPalette {
  /** Unique identifier (predefined ID or UUID for custom palettes) */
  id: string;

  /** Palette type indicator */
  type: PaletteType;

  /** Display name (user-facing) */
  name: string;

  /** Brief description of the palette's mood/purpose */
  description: string;

  /** Workspace ID (required for custom palettes, null for predefined) */
  workspaceId?: string | null;

  // ========== COLOR TRIO ==========

  /** Background color - main canvas color */
  background: HexColor;

  /** Text color - primary text color (must have 4.5:1 ratio with background) */
  text: HexColor;

  /** Accent color - highlight/emphasis color (must have 3:1 ratio with background) */
  accent: HexColor;

  /** Pastel accent color - calculated from accent for styled chunk backgrounds */
  pastelAccent?: HexColor | null;

  // ========== ACCESSIBILITY ==========

  /** WCAG contrast ratios for all color combinations */
  wcagRatio: WCAGContrastRatio;

  // ========== METADATA ==========

  /** Whether palette is active and available for use */
  isActive: boolean;

  /** Creation timestamp (ISO 8601) */
  createdAt: string;

  /** Last update timestamp (ISO 8601) */
  updatedAt: string;
}

// ============================================================================
// PALETTE CRUD DTOS
// ============================================================================

/**
 * Data Transfer Object for creating a new custom palette.
 *
 * Validation requirements:
 * - All hex colors must be valid format (#RRGGBB or #RGB)
 * - textOnBackground ratio must be >= 4.5 (WCAG AA)
 * - accentOnBackground ratio must be >= 3.0 (WCAG AA for UI)
 * - name must be 1-100 characters
 * - description must be 0-500 characters
 *
 * @example
 * const newPalette: CreatePaletteDTO = {
 *   workspaceId: "ws_123456",
 *   name: "Brand Colors",
 *   description: "Official company brand palette",
 *   background: "#FFFFFF",
 *   text: "#1A1A1A",
 *   accent: "#7C3AED",
 *   wcagRatio: {
 *     textOnBackground: 19.2,
 *     accentOnBackground: 5.8
 *   }
 * };
 */
export interface CreatePaletteDTO {
  /** Workspace ID where palette will be created */
  workspaceId: string;

  /** Display name (1-100 characters) */
  name: string;

  /** Description (0-500 characters) */
  description: string;

  /** Background hex color */
  background: HexColor;

  /** Text hex color */
  text: HexColor;

  /** Accent hex color */
  accent: HexColor;

  /** WCAG contrast ratios (must meet AA standards) */
  wcagRatio: WCAGContrastRatio;
}

/**
 * Data Transfer Object for updating an existing custom palette.
 * All fields are optional - only provided fields will be updated.
 *
 * Note: Predefined palettes cannot be updated.
 *
 * @example Partial update
 * const update: UpdatePaletteDTO = {
 *   name: "Updated Brand Colors",
 *   accent: "#8B5CF6"
 *   // Other fields remain unchanged
 * };
 *
 * @example Complete update
 * const update: UpdatePaletteDTO = {
 *   name: "New Name",
 *   description: "New description",
 *   background: "#F5F5F5",
 *   text: "#171717",
 *   accent: "#6366F1",
 *   wcagRatio: {
 *     textOnBackground: 17.8,
 *     accentOnBackground: 6.3
 *   },
 *   isActive: false
 * };
 */
export interface UpdatePaletteDTO {
  /** Updated display name */
  name?: string;

  /** Updated description */
  description?: string;

  /** Updated background color */
  background?: HexColor;

  /** Updated text color */
  text?: HexColor;

  /** Updated accent color */
  accent?: HexColor;

  /** Updated WCAG ratios (required if any color changes) */
  wcagRatio?: WCAGContrastRatio;

  /** Updated active status */
  isActive?: boolean;
}

// ============================================================================
// PALETTE QUERY & FILTER TYPES
// ============================================================================

/**
 * Filter options for querying palettes.
 *
 * @example Get all active palettes in workspace
 * const filter: PaletteFilterOptions = {
 *   workspaceId: "ws_123456",
 *   type: "custom",
 *   isActive: true
 * };
 *
 * @example Get only predefined palettes
 * const filter: PaletteFilterOptions = {
 *   type: "predefined"
 * };
 */
export interface PaletteFilterOptions {
  /** Filter by workspace ID (null for predefined palettes) */
  workspaceId?: string | null;

  /** Filter by palette type */
  type?: PaletteType;

  /** Filter by active status */
  isActive?: boolean;

  /** Search by name (case-insensitive partial match) */
  searchTerm?: string;
}

/**
 * Pagination options for palette queries.
 */
export interface PalettePaginationOptions {
  /** Page number (1-indexed) */
  page: number;

  /** Results per page (default: 20, max: 100) */
  limit: number;

  /** Sort field */
  sortBy?: 'name' | 'createdAt' | 'updatedAt';

  /** Sort direction */
  sortOrder?: 'asc' | 'desc';
}

/**
 * Paginated palette query result.
 */
export interface PaginatedPalettes {
  /** Array of palettes */
  data: ColorPalette[];

  /** Pagination metadata */
  pagination: {
    /** Current page number */
    page: number;

    /** Results per page */
    limit: number;

    /** Total number of results */
    total: number;

    /** Total number of pages */
    totalPages: number;

    /** Whether there is a next page */
    hasNext: boolean;

    /** Whether there is a previous page */
    hasPrev: boolean;
  };
}

// ============================================================================
// PALETTE APPLICATION CONTEXT
// ============================================================================

/**
 * Context for how a palette is applied to a slide style.
 * Maps palette colors to specific visual_config modules.
 *
 * @example
 * {
 *   paletteId: "professional-blue",
 *   appliedAt: "2026-01-06T12:00:00Z",
 *   colorMapping: {
 *     background: "background",
 *     titleText: "text",
 *     bodyText: "text",
 *     highlightBox: "accent",
 *     ctaButton: "accent"
 *   }
 * }
 */
export interface PaletteApplication {
  /** ID of the applied palette */
  paletteId: string;

  /** When the palette was applied */
  appliedAt: string;

  /** Mapping of visual elements to palette colors */
  colorMapping: {
    /** Background element uses palette.background */
    background: 'background';

    /** Title text uses palette.text */
    titleText: 'text';

    /** Body text uses palette.text */
    bodyText: 'text';

    /** Highlight box uses palette.accent */
    highlightBox: 'accent';

    /** CTA button uses palette.accent */
    ctaButton: 'accent';

    /** Additional custom mappings */
    [key: string]: 'background' | 'text' | 'accent';
  };
}

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

/**
 * Validates a complete palette object.
 * Checks color formats, WCAG compliance, and required fields.
 *
 * @param palette - Palette to validate
 * @returns Array of validation error messages (empty if valid)
 *
 * @example
 * const errors = validatePalette(myPalette);
 * if (errors.length > 0) {
 *   console.error("Validation failed:", errors);
 * }
 */
export function validatePalette(palette: Partial<ColorPalette>): string[] {
  const errors: string[] = [];

  // Required fields
  if (!palette.name || palette.name.trim().length === 0) {
    errors.push("Name is required");
  }
  if (palette.name && palette.name.length > 100) {
    errors.push("Name must be 100 characters or less");
  }

  if (!palette.description) {
    errors.push("Description is required");
  }
  if (palette.description && palette.description.length > 500) {
    errors.push("Description must be 500 characters or less");
  }

  // Color validation
  if (!palette.background) {
    errors.push("Background color is required");
  } else if (!isValidHexColor(palette.background)) {
    errors.push(`Invalid background color format: ${palette.background}`);
  }

  if (!palette.text) {
    errors.push("Text color is required");
  } else if (!isValidHexColor(palette.text)) {
    errors.push(`Invalid text color format: ${palette.text}`);
  }

  if (!palette.accent) {
    errors.push("Accent color is required");
  } else if (!isValidHexColor(palette.accent)) {
    errors.push(`Invalid accent color format: ${palette.accent}`);
  }

  // WCAG validation
  if (!palette.wcagRatio) {
    errors.push("WCAG contrast ratios are required");
  } else {
    if (palette.wcagRatio.textOnBackground < 4.5) {
      errors.push(`Text contrast ratio (${palette.wcagRatio.textOnBackground}) must be at least 4.5:1 for WCAG AA`);
    }
    if (palette.wcagRatio.accentOnBackground < 3.0) {
      errors.push(`Accent contrast ratio (${palette.wcagRatio.accentOnBackground}) must be at least 3:1 for WCAG AA`);
    }
  }

  // Custom palette validation
  if (palette.type === 'custom' && !palette.workspaceId) {
    errors.push("Workspace ID is required for custom palettes");
  }

  return errors;
}

/**
 * Type guard to check if a palette is a predefined palette.
 *
 * @example
 * if (isPredefinedPalette(palette)) {
 *   // palette.workspaceId is null/undefined
 *   // palette.type is "predefined"
 * }
 */
export function isPredefinedPalette(palette: ColorPalette): palette is ColorPalette & { type: 'predefined' } {
  return palette.type === 'predefined';
}

/**
 * Type guard to check if a palette is a custom palette.
 *
 * @example
 * if (isCustomPalette(palette)) {
 *   // palette.workspaceId is defined
 *   // palette.type is "custom"
 * }
 */
export function isCustomPalette(palette: ColorPalette): palette is ColorPalette & { type: 'custom'; workspaceId: string } {
  return palette.type === 'custom' && !!palette.workspaceId;
}

// ============================================================================
// EXPORTS
// ============================================================================

export default ColorPalette;
