/**
 * Carousel Composer - Type Definitions
 *
 * Centralized TypeScript types for the carousel modular editor system.
 * This file defines all data structures for slides, modules, and configurations.
 */
/**
 * Structural modules that define the base canvas/container
 * These should NOT be in the render order
 */
export declare const STRUCTURAL_MODULES: readonly ["viewport", "card"];
/**
 * Overlay modules that sit on top of the content structure
 * These should NOT be in the render order (controlled by z-index)
 */
export declare const OVERLAY_MODULES: readonly ["corners", "logo", "freeText", "svgElements", "arrowBottomText", "textureOverlay", "duo"];
/**
 * Content modules that are part of the main content flow
 * ONLY these should appear in the render order
 */
export declare const CONTENT_MODULES: readonly ["textFields", "contentImage", "bullets", "imageTextBox", "twitterPost"];
/**
 * Check if a module is a content module (can be reordered)
 */
export declare function isContentModule(moduleId: string): boolean;
/**
 * Check if a module is structural (canvas/container)
 */
export declare function isStructuralModule(moduleId: string): boolean;
/**
 * Check if a module is overlay (z-index controlled)
 */
export declare function isOverlayModule(moduleId: string): boolean;
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
    id: string;
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
        blur?: number;
        opacity?: number;
    };
    width: number;
    height: number;
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
    specialPosition?: 'none' | 'center' | 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
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
    mode?: 'single' | 'comparison';
    image: {
        url: string;
        storageKey?: string;
        width: number;
        height: number;
        position: {
            x: number;
            y: number;
        };
        objectFit?: 'cover' | 'contain' | 'fill';
        borderRadius?: number;
    };
    url2?: string;
    comparisonGap?: number;
    borderRadius?: number;
    maxWidth?: number;
    maxHeight?: number;
    objectFit?: 'cover' | 'contain' | 'fill';
    position?: 'top' | 'center' | 'bottom';
    shadow?: {
        enabled: boolean;
        blur: number;
        spread: number;
        color: string;
    };
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
        x: number;
        y: number;
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
        opacity: number;
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
    offsetX: number;
    offsetY: number;
    scale: number;
    rotation: number;
    outlineEffect: {
        enabled: boolean;
        color: string;
        size: number;
    };
}
/**
 * Slide representation in Zustand store
 */
export interface Slide {
    id: string;
    data: Record<string, ModuleData>;
    enabledModules: string[];
    moduleOrder?: string[];
}
/**
 * Union type for all possible module data
 */
export type ModuleData = ViewportModule | CardModule | TextFieldsModule | ContentImageModule | ArrowBottomTextModule | BulletsModule | CornersModule | DuoModule | FreeTextModule | ImageTextBoxModule | LogoModule | SvgElementsModule | TextureOverlayModule | TwitterPostModule | FreeImageModule;
/**
 * Carousel Modular State (Zustand)
 */
export interface CarouselModularState {
    slides: Slide[];
    currentSlideIndex: number;
    carouselId: string | null;
    title: string;
    isDirty: boolean;
    validationErrors: string[];
    isLoading: boolean;
    isSaving: boolean;
    isGenerating: boolean;
    addSlide: () => void;
    removeSlide: (index: number) => void;
    duplicateSlide: (index: number) => void;
    setCurrentSlideIndex: (index: number) => void;
    importSlides: (slides: Slide[]) => void;
    toggleModule: (moduleId: string, enabled: boolean) => void;
    updateModuleData: (moduleId: string, data: Partial<ModuleData>) => void;
    validateModules: () => boolean;
    createNewCarousel: (userId: string, workspaceId: string) => Promise<void>;
    saveToSupabase: (userId: string, workspaceId: string) => Promise<void>;
    loadFromSupabase: (carouselId: string) => Promise<void>;
    generateImages: (userId: string, workspaceId: string) => Promise<string[]>;
    markClean: () => void;
    markDirty: () => void;
    setTitle: (title: string) => void;
    reset: () => void;
}
/**
 * Module Definition
 * Describes how each module behaves and renders
 */
export interface ModuleDefinition {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: 'layout' | 'content' | 'overlay';
    defaults: ModuleData;
    /** Z-index for rendering order (higher = above) */
    zIndex: number;
    dependencies?: string[];
    conflicts?: string[];
    validate: (data: ModuleData) => {
        valid: boolean;
        errors: string[];
    };
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
    baseUrl: string;
    slideIndex?: number;
    totalSlides?: number;
    viewportWidth?: number;
    viewportHeight?: number;
    carouselMode?: 'vertical' | 'horizontal';
    slideCount?: number;
    freeImage?: {
        enabled: boolean;
        url: string;
        offsetX: number;
        offsetY: number;
        scale: number;
        rotation: number;
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
/**
 * VPS API Request
 */
export interface GenerateCarouselRequest {
    slides: CarouselSlide[];
    mode: 'carousel' | 'single';
    workspaceId: string;
    outputFormat?: 'png' | 'jpeg' | 'webp';
    quality?: number;
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
}
export interface UpdateCarouselParams {
    title?: string;
    slides?: Slide[];
    status?: 'draft' | 'generating' | 'completed' | 'failed';
    generated_images_urls?: string[];
    generation_error?: string;
}
export interface ModuleSidebarProps {
    enabledModules: string[];
    onModuleToggle: (moduleId: string, enabled: boolean) => void;
    selectedModuleId?: string;
}
export interface ModularFormBuilderProps {
    activeModule: string | null;
    onModuleSelect: (moduleId: string) => void;
}
export interface LivePreviewProps {
    currentSlide: Slide;
    zoom?: number;
    onZoomChange?: (zoom: number) => void;
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
export interface ValidationResult {
    valid: boolean;
    errors: ValidationError[];
}
export interface ValidationError {
    moduleId: string;
    field: string;
    message: string;
}
/**
 * Deep partial type for module updates
 */
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
/**
 * Module ID type guard
 */
export type ModuleId = 'viewport' | 'card' | 'textFields' | 'contentImage' | 'arrowBottomText' | 'bullets' | 'corners' | 'duo' | 'freeText' | 'imageTextBox' | 'logo' | 'svgElements' | 'textureOverlay' | 'twitterPost' | 'freeImage';
/**
 * Font family options
 */
export type FontFamily = 'Inter' | 'Roboto' | 'Open Sans' | 'Lato' | 'Montserrat' | 'Poppins' | 'Raleway' | 'Ubuntu';
/**
 * Export format options
 */
export type ExportFormat = 'png' | 'jpeg' | 'webp';
import { z } from 'zod';
/**
 * Text style schema
 */
export declare const textStyleSchema: z.ZodObject<{
    fontFamily: z.ZodOptional<z.ZodString>;
    fontSize: z.ZodOptional<z.ZodString>;
    fontWeight: z.ZodOptional<z.ZodString>;
    color: z.ZodOptional<z.ZodString>;
    backgroundColor: z.ZodOptional<z.ZodString>;
    textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
    lineHeight: z.ZodOptional<z.ZodString>;
    letterSpacing: z.ZodOptional<z.ZodString>;
    textTransform: z.ZodOptional<z.ZodEnum<["none", "uppercase", "lowercase", "capitalize"]>>;
    textShadow: z.ZodOptional<z.ZodString>;
    textDecoration: z.ZodOptional<z.ZodString>;
    padding: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    color?: string;
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: string;
    backgroundColor?: string;
    textAlign?: "center" | "left" | "right";
    lineHeight?: string;
    letterSpacing?: string;
    textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
    textShadow?: string;
    textDecoration?: string;
    padding?: string;
}, {
    color?: string;
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: string;
    backgroundColor?: string;
    textAlign?: "center" | "left" | "right";
    lineHeight?: string;
    letterSpacing?: string;
    textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
    textShadow?: string;
    textDecoration?: string;
    padding?: string;
}>;
export type TextStyle = z.infer<typeof textStyleSchema>;
/**
 * Position schema
 */
export declare const positionSchema: z.ZodObject<{
    top: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    left: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    right: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    bottom: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    width: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    height: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
}, "strip", z.ZodTypeAny, {
    top?: string | number;
    bottom?: string | number;
    left?: string | number;
    right?: string | number;
    width?: string | number;
    height?: string | number;
}, {
    top?: string | number;
    bottom?: string | number;
    left?: string | number;
    right?: string | number;
    width?: string | number;
    height?: string | number;
}>;
export type Position = z.infer<typeof positionSchema>;
/**
 * Special position enum
 */
export declare const specialPositionEnum: z.ZodEnum<["none", "top-left", "top-right", "bottom-left", "bottom-right", "top-center", "bottom-center", "center-left", "center-right", "center"]>;
export type SpecialPosition = z.infer<typeof specialPositionEnum>;
/**
 * Styled chunk schema
 */
export declare const styledChunkSchema: z.ZodObject<{
    text: z.ZodString;
    color: z.ZodOptional<z.ZodString>;
    fontFamily: z.ZodOptional<z.ZodString>;
    fontSize: z.ZodOptional<z.ZodString>;
    bold: z.ZodOptional<z.ZodBoolean>;
    italic: z.ZodOptional<z.ZodBoolean>;
    underline: z.ZodOptional<z.ZodBoolean>;
    letterSpacing: z.ZodOptional<z.ZodString>;
    backgroundColor: z.ZodOptional<z.ZodString>;
    backgroundBlur: z.ZodOptional<z.ZodString>;
    blurColor: z.ZodOptional<z.ZodString>;
    blurOpacity: z.ZodOptional<z.ZodNumber>;
    blurFadeDirection: z.ZodOptional<z.ZodEnum<["horizontal", "vertical", "both"]>>;
    blurFadeAmount: z.ZodOptional<z.ZodNumber>;
    padding: z.ZodOptional<z.ZodString>;
    lineBreak: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    bold?: boolean;
    text?: string;
    color?: string;
    fontFamily?: string;
    fontSize?: string;
    backgroundColor?: string;
    letterSpacing?: string;
    padding?: string;
    italic?: boolean;
    underline?: boolean;
    backgroundBlur?: string;
    blurColor?: string;
    blurOpacity?: number;
    blurFadeDirection?: "horizontal" | "vertical" | "both";
    blurFadeAmount?: number;
    lineBreak?: boolean;
}, {
    bold?: boolean;
    text?: string;
    color?: string;
    fontFamily?: string;
    fontSize?: string;
    backgroundColor?: string;
    letterSpacing?: string;
    padding?: string;
    italic?: boolean;
    underline?: boolean;
    backgroundBlur?: string;
    blurColor?: string;
    blurOpacity?: number;
    blurFadeDirection?: "horizontal" | "vertical" | "both";
    blurFadeAmount?: number;
    lineBreak?: boolean;
}>;
export type StyledChunk = z.infer<typeof styledChunkSchema>;
/**
 * Gradient overlay schema
 */
export declare const gradientOverlaySchema: z.ZodObject<{
    enabled: z.ZodDefault<z.ZodBoolean>;
    color: z.ZodOptional<z.ZodString>;
    startOpacity: z.ZodOptional<z.ZodNumber>;
    midOpacity: z.ZodOptional<z.ZodNumber>;
    endOpacity: z.ZodOptional<z.ZodNumber>;
    height: z.ZodOptional<z.ZodNumber>;
    direction: z.ZodOptional<z.ZodEnum<["to top", "to bottom", "to left", "to right"]>>;
    blendMode: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    color?: string;
    height?: number;
    enabled?: boolean;
    startOpacity?: number;
    midOpacity?: number;
    endOpacity?: number;
    direction?: "to top" | "to bottom" | "to left" | "to right";
    blendMode?: string;
}, {
    color?: string;
    height?: number;
    enabled?: boolean;
    startOpacity?: number;
    midOpacity?: number;
    endOpacity?: number;
    direction?: "to top" | "to bottom" | "to left" | "to right";
    blendMode?: string;
}>;
export type GradientOverlay = z.infer<typeof gradientOverlaySchema>;
//# sourceMappingURL=types.d.ts.map