/**
 * Carousel Composer - Type Definitions
 *
 * Centralized TypeScript types for the carousel modular editor system.
 * This file defines all data structures for slides, modules, and configurations.
 */

// ============================================================================
// MODULE CATEGORIZATION
// ============================================================================

/**
 * Structural modules that define the base canvas/container
 * These should NOT be in the render order
 */
export const STRUCTURAL_MODULES = ['viewport', 'card'] as const;

/**
 * Overlay modules that sit on top of the content structure
 * These should NOT be in the render order (controlled by z-index)
 */
export const OVERLAY_MODULES = [
  'corners',
  'logo',
  'freeText',
  'svgElements',
  'arrowBottomText',
  'textureOverlay',
  'duo',
] as const;

/**
 * Content modules that are part of the main content flow
 * ONLY these should appear in the render order
 */
export const CONTENT_MODULES = [
  'textFields',
  'contentImage',
  'bullets',
  'imageTextBox',
  'twitterPost',
] as const;

/**
 * Check if a module is a content module (can be reordered)
 */
export function isContentModule(moduleId: string): boolean {
  return CONTENT_MODULES.includes(moduleId as any);
}

/**
 * Check if a module is structural (canvas/container)
 */
export function isStructuralModule(moduleId: string): boolean {
  return STRUCTURAL_MODULES.includes(moduleId as any);
}

/**
 * Check if a module is overlay (z-index controlled)
 */
export function isOverlayModule(moduleId: string): boolean {
  return OVERLAY_MODULES.includes(moduleId as any);
}

// ============================================================================
// CAROUSEL CONFIGURATION
// ============================================================================

export interface CarouselModularConfig {
  global?: {
    defaultFontFamily?: string;
    defaultColorScheme?: {
      primary: string;
      secondary: string;
      background: string;
    };
  };
  slides: CarouselSlide[];
}

export interface CarouselSlide {
  id: string; // UUID
  order: number;
  modules: {
    viewport?: ViewportModule;
    card?: CardModule;
    textFields?: TextFieldsModule;
    contentImage?: ContentImageModule;
    arrowBottomText?: ArrowBottomTextModule;
    bullets?: BulletsModule;
    corners?: CornersModule;
    duo?: DuoModule;
    freeText?: FreeTextModule;
    imageTextBox?: ImageTextBoxModule;
    logo?: LogoModule;
    svgElements?: SvgElementsModule;
    textureOverlay?: TextureOverlayModule;
    twitterPost?: TwitterPostModule;
    freeImage?: FreeImageModule;
  };
}

// ============================================================================
// MODULE DEFINITIONS
// ============================================================================

/**
 * Viewport Module
 * Controls the canvas dimensions and background
 */
export interface ViewportModule {
  enabled: boolean;
  backgroundColor?: string;
  backgroundImage?: {
    url: string;
    storageKey?: string;
    blur?: number; // 0-20
    opacity?: number; // 0-100
  };
  width: number; // Default: 1080
  height: number; // Default: 1440 (Instagram Portrait)
}

/**
 * Card padding configuration
 */
export interface CardPadding {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

/**
 * Card shadow configuration
 */
export interface CardShadow {
  enabled: boolean;
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
}

/**
 * Card Module
 * Central container with customizable styling
 */
export interface CardModule {
  enabled: boolean;

  /** Width as percentage of viewport (0-100) */
  width: number;

  /** Height as percentage of viewport (0-100) */
  height: number;

  /** Special position preset */
  specialPosition?: 'none' | 'center' | 'top-left' | 'top-center' | 'top-right' |
  'center-left' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

  /** Padding from edge when using special position (px) */
  positionPadding?: number;

  /** Border radius in pixels */
  borderRadius: number;

  /** Background type: solid color or image */
  backgroundType?: 'color' | 'image';

  /** Background color (hex) */
  backgroundColor: string;

  /** Background image URL */
  backgroundImage?: string;

  /** Padding configuration */
  padding: CardPadding;

  /** Gradient overlay configuration */
  gradientOverlay?: {
    enabled: boolean;
    color: string;
    startOpacity: number;
    endOpacity: number;
    direction: 'to-top' | 'to-bottom' | 'to-left' | 'to-right';
  };

  /** Box shadow configuration */
  shadow?: CardShadow;

  /** Layout direction for content modules */
  layoutDirection?: 'column' | 'row';

  /** Gap between content modules */
  contentGap?: number;

  /** Optional border */
  borderWidth?: number;
  borderColor?: string;
}

/**
 * Text Fields Module
 * Manages up to 5 independent text fields
 */
export interface TextFieldsModule {
  enabled?: boolean;
  /** Number of fields to display */
  count?: number;
  /** Gap between fields (pixels) */
  gap?: number;
  /** Vertical alignment */
  verticalAlign?: 'top' | 'center' | 'bottom';
  /** Layout width in horizontal layouts */
  layoutWidth?: string;
  /** Align-self in horizontal layouts */
  alignSelf?: 'auto' | 'flex-start' | 'center' | 'flex-end' | 'stretch';
  /** Auto-sizing mode */
  autoSizeMode?: 'off' | 'proportional-3-1';
  /** Index of larger text field */
  autoSizeLargerIndex?: number;
  /** Array of text fields */
  fields: TextField[];
}

export interface TextField {
  id?: string;
  /** Text content */
  content: string;
  /** Style configuration */
  style: TextStyle;
  /** Styled chunks for partial formatting */
  styledChunks?: StyledChunk[];
  /** Enable free positioning (absolute) */
  freePosition?: boolean;
  /** Manual position - used when freePosition is true */
  position?: Position;
  /** Special position preset */
  specialPosition?: SpecialPosition;
  /** Padding from edge when using special position (percentage) */
  specialPadding?: number;
}

/**
 * Content Image Module
 * Handles a single content image placement or side-by-side comparison
 */
export interface ContentImageModule {
  enabled: boolean;

  // Mode selection
  mode?: 'single' | 'comparison';

  // Single mode properties
  image: {
    url: string;
    storageKey?: string;
    width: number; // 50-800
    height: number; // 50-800
    position: {
      x: number; // 0-100 (percentage)
      y: number; // 0-100 (percentage)
    };
    objectFit?: 'cover' | 'contain' | 'fill';
    borderRadius?: number; // 0-50
  };

  // Comparison mode properties
  url2?: string;              // Second image URL
  comparisonGap?: number;     // Gap between images (px)

  // Shared properties for comparison mode
  borderRadius?: number;
  maxWidth?: number;          // percentage (0-100)
  maxHeight?: number;         // percentage (0-100)
  objectFit?: 'cover' | 'contain' | 'fill';
  position?: 'top' | 'center' | 'bottom';
  shadow?: {
    enabled: boolean;
    blur: number;
    spread: number;
    color: string;
  };

  // Layout (for horizontal card layouts)
  layoutWidth?: string;
  alignSelf?: 'auto' | 'flex-start' | 'center' | 'flex-end' | 'stretch';
}

/**
 * Arrow Bottom Text Module
 * Displays text with an arrow pointing downward
 */
export interface ArrowBottomTextModule {
  enabled: boolean;
  text: string;
  position: {
    x: number; // 0-100 (percentage)
    y: number; // 0-100 (percentage)
  };
  fontSize: number;
  fontFamily: string;
  color: string;
  fontWeight: number;
  arrowColor?: string;
  arrowSize?: number;
}

/**
 * Bullets Module
 * Creates bulleted lists with customizable styling
 */
export interface BulletsModule {
  enabled: boolean;
  items: {
    id: string;
    text: string;
  }[];
  position: {
    x: number;
    y: number;
  };
  fontSize: number;
  fontFamily: string;
  color: string;
  fontWeight: number;
  bulletStyle?: 'disc' | 'circle' | 'square' | 'none';
  bulletColor?: string;
  lineHeight?: number;
  spacing?: number;
}

/**
 * Corners Module
 * Adds decorative corner elements
 */
export interface CornersModule {
  enabled: boolean;
  topLeft?: {
    enabled: boolean;
    type: string;
    color?: string;
    size?: number;
  };
  topRight?: {
    enabled: boolean;
    type: string;
    color?: string;
    size?: number;
  };
  bottomLeft?: {
    enabled: boolean;
    type: string;
    color?: string;
    size?: number;
  };
  bottomRight?: {
    enabled: boolean;
    type: string;
    color?: string;
    size?: number;
  };
}

/**
 * Duo Module
 * Creates side-by-side dual viewport layouts
 */
export interface DuoModule {
  enabled: boolean;
  leftSide: {
    backgroundColor?: string;
    backgroundImage?: string;
    content?: Record<string, unknown>;
  };
  rightSide: {
    backgroundColor?: string;
    backgroundImage?: string;
    content?: Record<string, unknown>;
  };
  dividerWidth?: number;
  dividerColor?: string;
}

/**
 * Free Text Module
 * Allows completely free-positioned text elements
 */
export interface FreeTextModule {
  enabled: boolean;
  text: string;
  position: {
    x: number;
    y: number;
  };
  fontSize: number;
  fontFamily: string;
  color: string;
  fontWeight: number;
  textAlign: 'left' | 'center' | 'right';
  rotation?: number;
  opacity?: number;
  textShadow?: string;
  backgroundColor?: string;
  padding?: number;
  borderRadius?: number;
}

/**
 * Image Text Box Module
 * Combines image and text in a box layout
 */
export interface ImageTextBoxModule {
  enabled: boolean;
  image: {
    url: string;
    storageKey?: string;
    position: 'left' | 'right' | 'top' | 'bottom';
    width: number;
    height: number;
    objectFit?: 'cover' | 'contain' | 'fill';
  };
  text: {
    content: string;
    fontSize: number;
    fontFamily: string;
    color: string;
    fontWeight: number;
    textAlign: 'left' | 'center' | 'right';
  };
  boxPosition: {
    x: number;
    y: number;
  };
  boxWidth: number;
  boxHeight: number;
  backgroundColor?: string;
  borderRadius?: number;
  padding?: number;
}

/**
 * Logo Module
 * Places a logo image at specified position
 */
export interface LogoModule {
  enabled: boolean;
  image: {
    url: string;
    storageKey?: string;
    width: number;
    height: number;
  };
  position: {
    x: number;
    y: number;
  };
  opacity?: number;
  borderRadius?: number;
}

/**
 * SVG Elements Module
 * Adds custom SVG elements and shapes
 */
export interface SvgElementsModule {
  enabled: boolean;
  elements: {
    id: string;
    type: 'circle' | 'rect' | 'path' | 'polygon' | 'custom';
    svg: string;
    position: {
      x: number;
      y: number;
    };
    width?: number;
    height?: number;
    color?: string;
    opacity?: number;
    rotation?: number;
  }[];
}

/**
 * Texture Overlay Module
 * Applies texture overlays to the entire canvas
 */
export interface TextureOverlayModule {
  enabled: boolean;
  texture: {
    url: string;
    storageKey?: string;
    opacity: number; // 0-100
    blendMode?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten';
  };
}

/**
 * Twitter Post Module
 * Simulates a Twitter/X post layout
 */
export interface TwitterPostModule {
  enabled: boolean;
  avatar: {
    url: string;
    storageKey?: string;
  };
  username: string;
  handle: string;
  timestamp: string;
  content: string;
  stats?: {
    replies?: number;
    retweets?: number;
    likes?: number;
  };
  position: {
    x: number;
    y: number;
  };
  width: number;
  backgroundColor?: string;
  borderRadius?: number;
}

/**
 * Free Image Module
 * Free-positioned image at carousel center (between multiple slides)
 */
export interface FreeImageModule {
  enabled: boolean;
  url: string;
  offsetX: number; // -500 to 500
  offsetY: number; // -500 to 500
  scale: number; // 50 to 200 (%)
  rotation: number; // -180 to 180 (degrees)
  outlineEffect: {
    enabled: boolean;
    color: string;
    size: number; // 0 to 50 (pixels)
  };
}

/**
 * Outline effect configuration for FreeImageModuleData
 */
export interface FreeImageOutlineEffect {
  enabled: boolean;
  color: string;
  size: number; // 0 to 50 (pixels)
}

/**
 * FreeImageModuleData - Interface for free image module data
 *
 * Renders an image positioned absolutely at the center of the carousel viewport.
 * Useful for "VS" images, arrows, or other connecting elements between slides.
 */
export interface FreeImageModuleData {
  /** Enable/disable the free image */
  enabled: boolean;

  /** Image URL */
  url: string;

  /** Horizontal offset from center (-500 to 500 pixels) */
  offsetX: number;

  /** Vertical offset from center (-500 to 500 pixels) */
  offsetY: number;

  /** Scale percentage (50 to 200) */
  scale: number;

  /** Rotation in degrees (-180 to 180) */
  rotation: number;

  /**
   * Starting slide index (0-based) for image division.
   * Controls which slide the left half of the image appears on.
   * @default 0
   */
  startSlideIndex: number;

  /**
   * Ending slide index (0-based) for image division.
   * Controls which slide the right half of the image appears on.
   * Must be >= startSlideIndex.
   * @default 1
   */
  endSlideIndex: number;

  /** Outline effect with 8-direction drop shadows */
  outlineEffect: FreeImageOutlineEffect;
}

// ============================================================================
// ZUSTAND STORE TYPES
// ============================================================================

/**
 * Slide representation in Zustand store
 */
export interface Slide {
  id: string;
  data: Record<string, ModuleData>;
  enabledModules: string[];
  moduleOrder?: string[]; // Order of content modules for rendering
}

/**
 * Union type for all possible module data
 */
export type ModuleData =
  | ViewportModule
  | CardModule
  | TextFieldsModule
  | ContentImageModule
  | ArrowBottomTextModule
  | BulletsModule
  | CornersModule
  | DuoModule
  | FreeTextModule
  | ImageTextBoxModule
  | LogoModule
  | SvgElementsModule
  | TextureOverlayModule
  | TwitterPostModule
  | FreeImageModule;

/**
 * Carousel Modular State (Zustand)
 */
export interface CarouselModularState {
  // Slide management
  slides: Slide[];
  currentSlideIndex: number;

  // Meta state
  carouselId: string | null; // Supabase record ID
  title: string;
  freeImage: FreeImageModuleData | null; // Global free-image configuration
  isDirty: boolean;
  validationErrors: string[];

  // Loading states
  isLoading: boolean;
  isSaving: boolean;
  isGenerating: boolean;

  // Internal initialization
  _initialize: () => void;

  // Actions - Slide management
  addSlide: () => void;
  removeSlide: (index: number) => void;
  duplicateSlide: (index: number) => void;
  setCurrentSlideIndex: (index: number) => void;
  importSlides: (slides: Slide[]) => void;

  // Actions - Module management
  toggleModule: (moduleId: string, enabled: boolean) => void;
  updateModuleData: (moduleId: string, data: Partial<ModuleData>) => void;

  // Actions - Free Image (Global)
  setFreeImage: (config: FreeImageModuleData | null) => void;
  updateFreeImage: (updates: Partial<FreeImageModuleData>) => void;

  // Actions - Validation
  validateModules: () => boolean;

  // Actions - Persistence
  createNewCarousel: (userId: string, workspaceId: string) => Promise<void>;
  saveToSupabase: (userId: string, workspaceId: string) => Promise<void>;
  loadFromSupabase: (carouselId: string, workspaceId: string) => Promise<void>;

  // Actions - Template Merge
  mergeTemplateWithData: (
    templateId: string,
    n8nData: any,
    workspaceId: string
  ) => Promise<{ success: boolean; slidesCount: number }>;

  // Actions - Generation
  generateImages: (userId: string, workspaceId: string) => Promise<string[]>;

  // Actions - Utility
  markClean: () => void;
  markDirty: () => void;
  setTitle: (title: string) => void;
  reset: () => void;
}

// ============================================================================
// MODULE REGISTRY TYPES
// ============================================================================

/**
 * Module Definition
 * Describes how each module behaves and renders
 */
export interface ModuleDefinition {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  category: 'layout' | 'content' | 'overlay';
  defaults: ModuleData;

  /** Z-index for rendering order (higher = above) */
  zIndex: number;

  dependencies?: string[]; // Required modules
  conflicts?: string[]; // Incompatible modules
  validate: (data: ModuleData) => { valid: boolean; errors: string[] };
  generateHTML: (data: ModuleData, options: CompositionOptions) => string;
  generateCSS: (data: ModuleData, options: CompositionOptions) => string;

  /** Optional: Export CSS custom properties (CSS variables) for use by other modules */
  getStyleVariables?: (data: ModuleData) => Record<string, string>;
}

/**
 * Composition Options
 * Passed to HTML/CSS generators
 */
export interface CompositionOptions {
  baseUrl: string; // For loading assets
  slideIndex?: number;
  totalSlides?: number;
  currentSlideIndex?: number; // Current slide being rendered (0-based)
  viewportWidth?: number; // Viewport width for pixel calculations
  viewportHeight?: number; // Viewport height for pixel calculations
  carouselMode?: 'vertical' | 'horizontal'; // Layout mode
  slideCount?: number; // Number of slides for horizontal carousel
  freeImage?: {
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
  };
}

/**
 * Composition Result
 * Output from the compositer
 */
export interface CompositionResult {
  finalHtml: string;
  modulesCSS: string;
  viewportWidth: number;
  viewportHeight: number;
}

// ============================================================================
// API TYPES (VPS Integration)
// ============================================================================

/**
 * VPS API Request
 */
export interface GenerateCarouselRequest {
  slides: CarouselSlide[];
  mode: 'carousel' | 'single';
  workspaceId: string;
  outputFormat?: 'png' | 'jpeg' | 'webp';
  quality?: number; // 1-100
}

/**
 * VPS API Response
 */
export interface GenerateCarouselResponse {
  success: boolean;
  images: GeneratedImage[];
  error?: string;
}

export interface GeneratedImage {
  slideIndex: number;
  url: string;
  width: number;
  height: number;
}

// ============================================================================
// SUPABASE DATABASE TYPES
// ============================================================================

/**
 * Database record for app_carousel_modular_configs
 */
export interface CarouselModularConfigDB {
  id: string;
  workspace_id: string;
  user_id: string | null;
  title: string;
  config_data: {
    slides: CarouselSlide[];
    freeImage?: FreeImageModuleData | null;
  };
  status: 'draft' | 'generating' | 'completed' | 'failed';
  generated_images_urls: string[] | null;
  generation_started_at: string | null;
  generation_completed_at: string | null;
  generation_error: string | null;
  generation_retry_count: number;
  content_id: string | null;
  metadata: Record<string, unknown>;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Supabase service method parameters
 */
export interface CreateCarouselParams {
  userId: string;
  workspaceId: string;
  title?: string;
  slides?: Slide[];
  freeImage?: FreeImageModuleData | null;
}

export interface UpdateCarouselParams {
  title?: string;
  slides?: Slide[];
  freeImage?: FreeImageModuleData | null;
  status?: 'draft' | 'generating' | 'completed' | 'failed';
  generated_images_urls?: string[];
  generation_error?: string;
  content_id?: string | null;
}

// ============================================================================
// UI COMPONENT PROPS
// ============================================================================

export interface ModuleSidebarProps {
  enabledModules: string[];
  onModuleToggle: (moduleId: string, enabled: boolean) => void;
  selectedModuleId?: string; // Optional: highlights the selected module with visual emphasis
}

export interface ModularFormBuilderProps {
  activeModule: string | null;
  onModuleSelect: (moduleId: string) => void;
}

export interface LivePreviewProps {
  currentSlide: Slide;
  zoom?: number;
  onZoomChange?: (zoom: number) => void;
  // Navigation props
  totalSlides?: number;
  currentSlideIndex?: number;
  onSlideChange?: (index: number) => void;
}

export interface SlideTabBarProps {
  slides: Slide[];
  currentIndex: number;
  onSlideChange: (index: number) => void;
  onAddSlide: () => void;
  onRemoveSlide: (index: number) => void;
  onDuplicateSlide: (index: number) => void;
}

// ============================================================================
// VALIDATION TYPES
// ============================================================================

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  moduleId: string;
  field: string;
  message: string;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Deep partial type for module updates
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Module ID type guard
 */
export type ModuleId =
  | 'viewport'
  | 'card'
  | 'textFields'
  | 'contentImage'
  | 'arrowBottomText'
  | 'bullets'
  | 'corners'
  | 'duo'
  | 'freeText'
  | 'imageTextBox'
  | 'logo'
  | 'svgElements'
  | 'textureOverlay'
  | 'twitterPost'
  | 'freeImage';

/**
 * Font family options
 */
export type FontFamily =
  | 'Inter'
  | 'Roboto'
  | 'Open Sans'
  | 'Lato'
  | 'Montserrat'
  | 'Poppins'
  | 'Raleway'
  | 'Ubuntu';

/**
 * Export format options
 */
export type ExportFormat = 'png' | 'jpeg' | 'webp';

// ============================================================================
// SHARED SCHEMA TYPES (for use in modules)
// ============================================================================

import { z } from 'zod';

/**
 * Text style schema
 */
export const textStyleSchema = z.object({
  fontFamily: z.string().optional(),
  fontSize: z.string().optional(),
  fontWeight: z.string().optional(),
  color: z.string().optional(),
  backgroundColor: z.string().optional(),
  textAlign: z.enum(['left', 'center', 'right']).optional(),
  lineHeight: z.string().optional(),
  letterSpacing: z.string().optional(),
  textTransform: z.enum(['none', 'uppercase', 'lowercase', 'capitalize']).optional(),
  textShadow: z.string().optional(),
  textDecoration: z.string().optional(),
  padding: z.string().optional(),
});

export type TextStyle = z.infer<typeof textStyleSchema>;

/**
 * Position schema
 */
export const positionSchema = z.object({
  top: z.union([z.string(), z.number()]).optional(),
  left: z.union([z.string(), z.number()]).optional(),
  right: z.union([z.string(), z.number()]).optional(),
  bottom: z.union([z.string(), z.number()]).optional(),
  width: z.union([z.string(), z.number()]).optional(),
  height: z.union([z.string(), z.number()]).optional(),
});

export type Position = z.infer<typeof positionSchema>;

/**
 * Special position enum
 */
export const specialPositionEnum = z.enum([
  'none',
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
  'top-center',
  'bottom-center',
  'center-left',
  'center-right',
  'center',
]);

export type SpecialPosition = z.infer<typeof specialPositionEnum>;

/**
 * Styled chunk schema
 */
export const styledChunkSchema = z.object({
  text: z.string(),
  color: z.string().optional(),
  fontFamily: z.string().optional(),
  fontSize: z.string().optional(),
  bold: z.boolean().optional(),
  italic: z.boolean().optional(),
  underline: z.boolean().optional(),
  letterSpacing: z.string().optional(),
  backgroundColor: z.string().optional(),
  backgroundBlur: z.string().optional(),
  blurColor: z.string().optional(),
  blurOpacity: z.number().optional(),
  blurFadeDirection: z.enum(['horizontal', 'vertical', 'both']).optional(),
  blurFadeAmount: z.number().optional(),
  padding: z.string().optional(),
  margin: z.string().optional(),
  lineBreak: z.boolean().optional(),
});

export type StyledChunk = z.infer<typeof styledChunkSchema>;

/**
 * Gradient overlay schema
 */
export const gradientOverlaySchema = z.object({
  enabled: z.boolean().default(false),
  color: z.string().optional(),
  startOpacity: z.number().optional(),
  midOpacity: z.number().optional(),
  endOpacity: z.number().optional(),
  height: z.number().optional(),
  direction: z.enum(['to top', 'to bottom', 'to left', 'to right']).optional(),
  blendMode: z.string().optional(),
});

export type GradientOverlay = z.infer<typeof gradientOverlaySchema>;

// ==========================================
// API-specific types (for carousel-api VPS)
// ==========================================

/**
 * Configuration for a single slide in the carousel
 */
export interface SlideConfig {
  id: string;
  order: number;
  modules: Array<{
    type: string;
    data: ModuleData;
  }>;
}

/**
 * Configuration for the entire carousel
 */
export interface CarouselConfig {
  slides: SlideConfig[];
}

/**
 * Result of template composition
 * Alias for CompositionResult for backwards compatibility
 */
export type ComposedTemplate = CompositionResult;

// ==========================================
// Missing exports for API compatibility
// ==========================================

/**
 * RenderContext - Context passed to module renderers
 * Provides slide-level and carousel-level information during rendering
 */
export interface RenderContext {
  slideIndex?: number;
  totalSlides?: number;
  carouselId?: string;
  [key: string]: any;
}

/**
 * GenerationOptions - Options for carousel image generation
 * Used by duo/generation.server.ts and other generation modules
 */
export interface GenerationOptions {
  [key: string]: any;
}

/**
 * GenerationResult - Result of carousel generation
 * Contains the generated HTML and CSS for a slide or carousel
 */
export interface GenerationResult {
  html: string;
  css: string;
  [key: string]: any;
}

/**
 * ModuleFormProps - Props for module configuration forms
 * Generic interface for module form components
 */
export interface ModuleFormProps<T = any> {
  data: T;
  onChange: (data: T) => void;
  [key: string]: any;
}
