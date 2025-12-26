// @ts-nocheck - Module compatibility types
/**
 * HTML Compositer for Carousel Composer
 *
 * Composes final HTML documents from enabled modules.
 * Orchestrates HTML/CSS generation and builds complete HTML pages ready for rendering.
 */

import type {
  ModuleData,
  CompositionOptions,
  CompositionResult,
} from './types';
import { CONTENT_MODULES } from './types';
import { getModule } from './modules/registry';
import { wrapInCarousel, generateCarouselCSS, validateFreeImageConfig } from './carousel-helpers';
import { CUSTOM_FONTS } from '../constants/fonts';

// ============================================================================
// CONFIGURATION
// ============================================================================

/**
 * Default base URL for assets (fonts, images, etc)
 * Note: Using process.env instead of import.meta for Node.js compatibility
 */
const DEFAULT_BASE_URL = process.env.BASE_URL || 'http://localhost:8080';

/**
 * Default viewport dimensions (Instagram portrait format)
 * Using 1440px height to match Puppeteer rendering dimensions
 */
const DEFAULT_VIEWPORT = {
  width: 1080,
  height: 1440,
};

/**
 * Google Fonts to include in the generated HTML
 * These fonts are available to all modules
 *
 * NOTE: Product Sans is Google's proprietary font and is NOT available
 * on Google Fonts. We include it here but it will fallback to system fonts.
 * Quicksand, Nunito, and Work Sans are good alternatives that look similar.
 */
const GOOGLE_FONTS = [
  'Inter:wght@400;600;700;900',
  'Roboto:wght@400;600;700;900',
  'Open+Sans:wght@400;600;700;900',
  'Lato:wght@400;600;700;900',
  'Montserrat:wght@400;600;700;900',
  'Bebas+Neue:wght@400',
  'Poppins:wght@400;600;700;900',
  'Quicksand:wght@400;600;700',
  'Nunito:wght@400;600;700;900',
  'Work+Sans:wght@400;600;700;900',
  'Comfortaa:wght@400;600;700',
  'Raleway:wght@400;600;700;900',
  'Ubuntu:wght@400;600;700',
  // Fontes adicionadas para corrigir bug de fontes não carregando
  'PT+Serif:wght@400;700',
  'Libre+Baskerville:wght@400;700',
  'Instrument+Serif:wght@400;600',
  'League+Spartan:wght@400;600;700;900',
];

/**
 * Module rendering order (viewport -> card -> content)
 * Ordered by z-index for proper layering (background to foreground)
 */
const MODULE_ORDER = [
  'viewport',        // z: 0 (background)
  'card',            // z: 1
  'textureOverlay',  // z: 2 (above viewport/card, below content)
  'duo',             // z: 3 (dual layout)
  'contentImage',    // z: 5
  'imageTextBox',    // z: 7
  'textFields',      // z: 10
  'bullets',         // z: 10
  'twitterPost',     // z: 15
  'svgElements',     // z: 20
  'freeText',        // z: 30
  'arrowBottomText', // z: 30
  'logo',            // z: 50
  'corners',         // z: 99 (top layer)
  'freeImage',       // z: 101 (highest layer - carousel center)
];

// ============================================================================
// VIEWPORT CALCULATION HELPERS
// ============================================================================

/**
 * Calcula o número real de slides para renderização baseado no freeImage config
 *
 * Quando free-image está habilitado com startSlideIndex e endSlideIndex definidos,
 * o canvas deve ter a largura expandida para acomodar todos os slides entre esses índices.
 *
 * @param slideCount - Número base de slides (do options)
 * @param freeImageConfig - Configuração validada do free-image (ou undefined)
 * @returns Número de slides a renderizar (afeta viewportWidth = slideCount × 1080)
 *
 * @example
 * // Free-image desabilitado
 * calculateActualSlideCount(5, undefined) // returns 5
 *
 * @example
 * // Free-image habilitado com startSlideIndex=1, endSlideIndex=3
 * calculateActualSlideCount(5, { enabled: true, startSlideIndex: 1, endSlideIndex: 3, ... })
 * // returns 3 (slides 1, 2, 3)
 */
function calculateActualSlideCount(
  slideCount: number,
  freeImageConfig?: {
    enabled: boolean;
    startSlideIndex?: number;
    endSlideIndex?: number;
    [key: string]: any;
  }
): number {
  // Always return total slide count - all slides are rendered
  // Free-image only affects positioning of the overlay image, not which slides exist
  // Example: 3 slides with free-image between slides 0-1 still needs all 3 slides rendered
  return slideCount;
}

// ============================================================================
// MAIN COMPOSITION FUNCTION
// ============================================================================

/**
 * Composes a complete HTML template from enabled modules
 *
 * @param enabledModules - Array of module IDs to render (e.g., ['viewport', 'card', 'textFields'])
 * @param moduleData - Data for each module keyed by module ID
 * @param options - Composition options (baseUrl, moduleOrder, etc.)
 * @returns Complete HTML document with CSS and module content
 */
export function composeTemplate(
  enabledModules: string[],
  moduleData: Record<string, ModuleData>,
  options: CompositionOptions & { moduleOrder?: string[] } = {}
): CompositionResult {
  const { baseUrl = DEFAULT_BASE_URL, moduleOrder } = options;

  // Determine viewport dimensions from viewport module data if available
  const viewportData = moduleData['viewport'] as { width?: number; height?: number } | undefined;
  const defaultViewportWidth = viewportData?.width || DEFAULT_VIEWPORT.width;
  const defaultViewportHeight = viewportData?.height || DEFAULT_VIEWPORT.height;

  // Detect carousel mode: horizontal if freeImage enabled and slideCount > 1
  let freeImageConfig = validateFreeImageConfig(options.freeImage);

  // Calculate actual slide count based on free-image configuration
  const baseSlideCount = options.slideCount || 1;
  const slideCount = calculateActualSlideCount(baseSlideCount, freeImageConfig);

  // IMPORTANT: Validate slide indices are within bounds
  // If freeImage is configured but indices are invalid, disable it
  if (freeImageConfig) {
    const startSlide = freeImageConfig.startSlideIndex ?? 0;
    const endSlide = freeImageConfig.endSlideIndex ?? 1;

    console.log('[Compositer] 🔍 VALIDATING freeImage:', {
      startSlide,
      endSlide,
      slideCount,
      baseSlideCount,
      'options.slideCount': options.slideCount,
    });

    // Check if indices are within valid range
    const isStartValid = startSlide >= 0 && startSlide < slideCount;
    const isEndValid = endSlide >= 0 && endSlide < slideCount;
    const isSpanValid = endSlide > startSlide;

    console.log('[Compositer] 🔍 Validation results:', {
      isStartValid,
      isEndValid,
      isSpanValid,
      willPass: isStartValid && isEndValid && isSpanValid,
    });

    // If any validation fails, disable freeImage to prevent bugs
    if (!isStartValid || !isEndValid || !isSpanValid) {
      console.warn('[Compositer] Invalid freeImage indices:', {
        startSlide,
        endSlide,
        slideCount,
        isStartValid,
        isEndValid,
        isSpanValid,
      });
      freeImageConfig = undefined;
    }
  }

  const carouselMode = options.carouselMode ||
    (freeImageConfig && slideCount > 1 ? 'horizontal' : 'vertical');

  // Calculate viewport dimensions based on carousel mode
  let viewportWidth: number;
  let viewportHeight: number;

  if (carouselMode === 'horizontal') {
    // Horizontal carousel: slideCount × 1080 × 1440
    viewportWidth = slideCount * 1080;
    viewportHeight = 1440;
  } else {
    // Vertical (default): use module dimensions
    viewportWidth = defaultViewportWidth;
    viewportHeight = defaultViewportHeight;
  }

  // Update composition options with baseUrl and viewport dimensions
  const fullOptions: CompositionOptions & { moduleOrder?: string[] } = {
    ...options, // Spread first to get defaults
    baseUrl,
    viewportWidth,
    viewportHeight,
    moduleOrder,
    carouselMode,
    slideCount,
    freeImage: freeImageConfig, // Override with VALIDATED config
  };

  // Step 1: Collect CSS variables from all modules
  const styleVariables = collectStyleVariables(enabledModules, moduleData);

  // Step 2: Collect CSS from all modules in defined order
  const modulesCSS = collectCSS(enabledModules, moduleData, fullOptions);

  // Step 3: Collect HTML from all modules in defined order (respects custom moduleOrder)
  const modulesHTML = collectHTML(enabledModules, moduleData, fullOptions);

  // Step 4: Wrap HTML in carousel structure if in horizontal mode
  let bodyHTML = modulesHTML;
  if (carouselMode === 'horizontal' && slideCount > 1) {
    // In horizontal mode, generate HTML for each slide with its specific index
    // This allows modules like freeImage to render differently per slide
    const slideHTMLs: string[] = [];

    for (let slideIndex = 0; slideIndex < slideCount; slideIndex++) {
      // Create context with currentSlideIndex for this specific slide
      const slideOptions = {
        ...fullOptions,
        currentSlideIndex: slideIndex,
      };

      // Generate HTML for this slide
      const slideHTML = collectHTML(enabledModules, moduleData, slideOptions);
      slideHTMLs.push(slideHTML);
    }

    // Wrap all slides in carousel structure
    bodyHTML = wrapInCarousel(slideHTMLs, freeImageConfig);
  }

  // Step 5: Generate complete HTML document with variables
  const finalHtml = generateFinalHTML({
    viewportWidth,
    viewportHeight,
    modulesCSS,
    modulesHTML: bodyHTML,
    baseUrl,
    styleVariables,
    carouselMode,
    freeImage: freeImageConfig,
  });

  // === LOGGING: Capture final HTML before sending to Puppeteer ===
  console.log('[FINAL HTML] ==================== START ====================');
  console.log('[FINAL HTML] Length:', finalHtml.length, 'chars');
  console.log('[FINAL HTML] Viewport dimensions:', viewportWidth, 'x', viewportHeight);
  console.log('[FINAL HTML] Carousel mode:', carouselMode);
  console.log('[FINAL HTML] Full HTML content:');
  console.log(finalHtml);
  console.log('[FINAL HTML] ==================== END ====================');

  // Check if <style> tag contains viewport CSS
  const hasBodyStyles = finalHtml.includes('body {');
  const hasBackgroundColor = finalHtml.includes('background-color:');
  const hasBackgroundImage = finalHtml.includes('background-image:');
  console.log('[FINAL HTML] CSS Check:');
  console.log('[FINAL HTML]   - Has body styles:', hasBodyStyles);
  console.log('[FINAL HTML]   - Has background-color:', hasBackgroundColor);
  console.log('[FINAL HTML]   - Has background-image:', hasBackgroundImage);

  return {
    finalHtml,
    modulesCSS,
    viewportWidth,
    viewportHeight,
  };
}

// ============================================================================
// CSS VARIABLES COLLECTION
// ============================================================================

/**
 * Collects CSS variables from all enabled modules
 */
function collectStyleVariables(
  enabledModules: string[],
  moduleData: Record<string, ModuleData>
): Record<string, string> {
  const variables: Record<string, string> = {};

  for (const moduleId of MODULE_ORDER) {
    if (!enabledModules.includes(moduleId)) {
      continue;
    }

    const module = getModule(moduleId);
    if (!module || !module.getStyleVariables) {
      continue;
    }

    const data = moduleData[moduleId] || module.defaults;
    const moduleVars = module.getStyleVariables(data);

    // Merge variables
    Object.assign(variables, moduleVars);
  }

  return variables;
}

// ============================================================================
// CSS COLLECTION
// ============================================================================

/**
 * Collects CSS from all enabled modules in the correct order
 */
function collectCSS(
  enabledModules: string[],
  moduleData: Record<string, ModuleData>,
  options: CompositionOptions
): string {
  const cssParts: string[] = [];

  console.log('\n========================================');
  console.log('[Compositer] CSS COLLECTION STARTED');
  console.log('========================================');
  console.log('[Compositer] Enabled modules:', enabledModules);
  console.log('[Compositer] Carousel mode:', options.carouselMode);
  console.log('[Compositer] Slide count:', options.slideCount);

  // Add carousel CSS if in horizontal mode
  if (options.carouselMode === 'horizontal' && options.slideCount && options.slideCount > 1) {
    const carouselCSS = generateCarouselCSS(options.slideCount, options.freeImage);
    console.log('[Compositer] [STEP 1] Adding CAROUSEL CSS');
    console.log('[Compositer]   CSS Length:', carouselCSS.length, 'bytes');
    cssParts.push(`/* === Horizontal Carousel Layout === */\n${carouselCSS}`);

    // IMPORTANT: Copy background from viewport to each carousel-slide
    // FIX: Check for field existence, not backgroundType value
    const viewportData = moduleData['viewport'] as any;

    console.log('[Compositer] [STEP 2] Applying viewport background to carousel-slide:');
    console.log('[Compositer]   backgroundImage:', viewportData?.backgroundImage);
    console.log('[Compositer]   backgroundColor:', viewportData?.backgroundColor);
    console.log('[Compositer]   gradientEnabled:', viewportData?.gradientOverlay?.enabled);

    // Copy background IMAGE if exists (priority over color)
    if (viewportData?.backgroundImage && viewportData.backgroundImage.trim() !== '') {
      console.log('[Compositer]   ✓ Adding background-image to .carousel-slide');
      const imageCSS = `
.carousel-slide {
  background-image: url(${viewportData.backgroundImage}) !important;
  background-size: cover !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
}
      `.trim();
      console.log('[Compositer]   CSS Length:', imageCSS.length, 'bytes');
      cssParts.push(imageCSS);

      // Add color as fallback while image loads
      if (viewportData?.backgroundColor) {
        console.log('[Compositer]   ✓ Adding background-color fallback to .carousel-slide');
        const colorFallbackCSS = `
.carousel-slide {
  background-color: ${viewportData.backgroundColor} !important;
}
        `.trim();
        console.log('[Compositer]   CSS Length:', colorFallbackCSS.length, 'bytes');
        cssParts.push(colorFallbackCSS);
      }
    }
    // Copy background COLOR if exists (and no image)
    else if (viewportData?.backgroundColor) {
      console.log('[Compositer]   ✓ Adding background-color to .carousel-slide');
      const colorCSS = `
.carousel-slide {
  background-color: ${viewportData.backgroundColor} !important;
}
      `.trim();
      console.log('[Compositer]   CSS Length:', colorCSS.length, 'bytes');
      cssParts.push(colorCSS);
    }

    // NOTE: Gradient overlay is already handled by viewport/css.ts line 83
    // It generates .carousel-slide::after with gradient in horizontal mode
  }

  // Process modules in defined order
  console.log('\n[Compositer] [STEP 3] Processing modules in MODULE_ORDER...');
  let moduleCounter = 0;
  for (const moduleId of MODULE_ORDER) {
    // Skip if module is not enabled
    if (!enabledModules.includes(moduleId)) {
      continue;
    }

    // Skip freeImage module CSS in horizontal mode (already included in carousel CSS)
    if (moduleId === 'freeImage' && options.carouselMode === 'horizontal') {
      console.log(`[Compositer]   [Module ${++moduleCounter}] ${moduleId} - SKIPPED (horizontal mode)`);
      continue;
    }

    // Get module definition from registry
    const module = getModule(moduleId);
    if (!module) {
      console.log(`[Compositer]   [Module ${++moduleCounter}] ${moduleId} - SKIPPED (not in registry)`);
      continue;
    }

    // Get module data (or use defaults)
    const data = moduleData[moduleId] || module.defaults;

    // Generate CSS for this module
    try {
      const css = module.generateCSS(data, options);
      if (css) {
        moduleCounter++;
        console.log(`[Compositer]   [Module ${moduleCounter}] ${moduleId} (${module.name})`);
        console.log(`[Compositer]     CSS Length: ${css.length} bytes`);

        // Check for background-related properties
        const hasBackground = /background[-:]/.test(css);
        const hasBodySelector = /\bbody\s*\{/.test(css);
        const hasCarouselSlideSelector = /\.carousel-slide\s*\{/.test(css);
        const hasImportant = /!important/.test(css);

        console.log(`[Compositer]     Contains 'background': ${hasBackground}`);
        console.log(`[Compositer]     Contains 'body' selector: ${hasBodySelector}`);
        console.log(`[Compositer]     Contains '.carousel-slide' selector: ${hasCarouselSlideSelector}`);
        console.log(`[Compositer]     Contains '!important': ${hasImportant}`);

        cssParts.push(`/* === ${module.name} === */\n${css}`);
      } else {
        console.log(`[Compositer]   [Module ${++moduleCounter}] ${moduleId} - NO CSS generated`);
      }
    } catch (error) {
      console.error(`[Compositer] Error generating CSS for module '${moduleId}':`, error);
    }
  }

  // NOTE: content-wrapper CSS is now generated by the viewport module
  // to allow for configurable padding and layout settings
  // See: viewport/css.ts:86-124

  const finalCSS = cssParts.filter(Boolean).join('\n\n');

  console.log('\n========================================');
  console.log('[Compositer] CSS COLLECTION SUMMARY');
  console.log('========================================');
  console.log('[Compositer] Total CSS parts:', cssParts.length);
  console.log('[Compositer] Total CSS length:', finalCSS.length, 'bytes');
  console.log('[Compositer] CSS order (top to bottom):');
  cssParts.forEach((part, index) => {
    const firstLine = part.split('\n')[0];
    console.log(`[Compositer]   ${index + 1}. ${firstLine}`);
  });
  console.log('========================================\n');

  return finalCSS;
}

// ============================================================================
// HTML COLLECTION
// ============================================================================

/**
 * Parse layer ID to check if it's a sub-layer
 */
function parseLayerId(layerId: string): { baseModule: string; subIndex: number | null } {
  const match = layerId.match(/^(.+)-(\d+)$/);
  if (match) {
    return {
      baseModule: match[1],
      subIndex: parseInt(match[2], 10),
    };
  }
  return {
    baseModule: layerId,
    subIndex: null,
  };
}

/**
 * Extract a single text field from textFields HTML
 * Returns HTML for just one field
 */
function extractSingleTextField(fullHTML: string, fieldIndex: number): string {
  // Parse the HTML to find the specific text-item
  const regex = new RegExp(`<div class="text-item text-item-${fieldIndex + 1}">(.*?)</div>`, 's');
  const match = fullHTML.match(regex);

  if (match) {
    // Return just the single field wrapped in the text-section
    return `
  <!-- ===== TEXT FIELDS SECTION (Field ${fieldIndex + 1}) ===== -->
  <div class="text-section">
    <div class="text-item text-item-${fieldIndex + 1}">${match[1]}</div>
  </div>
  `.trim();
  }

  // Fallback: return empty if not found
  return '';
}

/**
 * Collects HTML from all enabled modules in the correct order
 * When card is active, content modules are injected INSIDE the card container
 * When card is disabled, content modules are wrapped in a .content-wrapper div
 *
 * Now supports sub-layers like "textFields-0" for individual text field rendering
 */
function collectHTML(
  enabledModules: string[],
  moduleData: Record<string, ModuleData>,
  options: CompositionOptions & { moduleOrder?: string[] }
): string {
  // Detect if card is active
  const isCardActive = enabledModules.includes('card');

  // Determine rendering order for content modules
  // Now handles both base modules and sub-layers (e.g., "textFields-0")
  const customModuleOrder = options.moduleOrder;
  const contentModuleOrder = customModuleOrder && customModuleOrder.length > 0
    ? customModuleOrder.filter((id) => {
        const { baseModule } = parseLayerId(id);
        return CONTENT_MODULES.includes(baseModule as any) && enabledModules.includes(baseModule);
      })
    : MODULE_ORDER.filter((id) => CONTENT_MODULES.includes(id) && enabledModules.includes(id));

  // Categorize modules
  const backgroundModules: string[] = [];
  const contentModulesHTML: Record<string, string> = {}; // Will be ordered later
  const overlayModules: string[] = [];
  let cardHTML = '';
  let textureOverlayHTML = '';

  // Process modules in defined order and categorize them
  for (const moduleId of MODULE_ORDER) {
    // Skip if module is not enabled
    if (!enabledModules.includes(moduleId)) {
      continue;
    }

    // Skip freeImage module HTML in horizontal mode (already added by wrapInCarousel)
    if (moduleId === 'freeImage' && options.carouselMode === 'horizontal') {
      continue;
    }

    // Get module definition from registry
    const module = getModule(moduleId);
    if (!module) {
      continue;
    }

    // Get module data (or use defaults)
    const data = moduleData[moduleId] || module.defaults;


    // Generate HTML for this module
    try {
      const html = module.generateHTML(data, options);


      if (!html) continue;

      const wrappedHTML = `<!-- ${module.name} -->\n${html}`;

      // Categorize module
      if (moduleId === 'viewport') {
        // Viewport is always background
        backgroundModules.push(wrappedHTML);
      } else if (moduleId === 'textureOverlay') {
        // Texture overlay needs special handling - goes inside card if active
        textureOverlayHTML = wrappedHTML;
      } else if (moduleId === 'card') {
        // Store card HTML separately
        cardHTML = html;
      } else if (CONTENT_MODULES.includes(moduleId)) {
        // Content modules that go inside card - store for ordered rendering
        contentModulesHTML[moduleId] = wrappedHTML;
      } else {
        // Overlay modules (everything else: logo, corners, freeText, etc.)
        overlayModules.push(wrappedHTML);
      }
    } catch (error) {
      console.error(`[Compositer] Error generating HTML for module '${moduleId}':`, error);
    }
  }

  // Order content modules according to moduleOrder
  // Now handles sub-layers: if we find "textFields-0", extract just that field from the full textFields HTML
  const orderedContentModules: string[] = contentModuleOrder
    .map((layerId) => {
      const { baseModule, subIndex } = parseLayerId(layerId);

      // Check if we have HTML for this base module
      if (!contentModulesHTML[baseModule]) {
        return null;
      }

      // If it's a sub-layer (e.g., textFields-0), extract just that field
      if (subIndex !== null && baseModule === 'textFields') {
        const fullHTML = contentModulesHTML[baseModule];
        const singleFieldHTML = extractSingleTextField(fullHTML, subIndex);
        return singleFieldHTML ? `<!-- ${baseModule}-${subIndex} -->\n${singleFieldHTML}` : null;
      }

      // Otherwise, return the full module HTML
      return contentModulesHTML[layerId] || contentModulesHTML[baseModule];
    })
    .filter(Boolean) as string[];

  // Assemble final HTML structure
  const htmlParts: string[] = [];

  // 1. Add background modules (viewport only)
  htmlParts.push(...backgroundModules);

  // 2. Handle card and content modules
  if (isCardActive && cardHTML) {
    // Card is active: inject texture overlay + content modules INSIDE card container

    // Find the closing </div> tag of the card container and insert content before it
    const cardContainerMatch = cardHTML.match(/^([\s\S]*?)(<\/div>\s*)$/);

    if (cardContainerMatch) {
      const [, cardOpeningPart, cardClosingPart] = cardContainerMatch;

      // Build content: texture overlay first (z:2), then content modules (ordered)
      const innerParts: string[] = [];
      if (textureOverlayHTML) {
        innerParts.push(textureOverlayHTML);
      }
      if (orderedContentModules.length > 0) {
        innerParts.push(...orderedContentModules);
      }

      const contentHTML = innerParts.length > 0
        ? '\n' + innerParts.join('\n\n') + '\n'
        : '';


      htmlParts.push(
        '<!-- Card (with texture + content inside) -->',
        cardOpeningPart + contentHTML + cardClosingPart
      );
    } else {
      // Fallback: if card HTML structure is unexpected, append normally
      htmlParts.push('<!-- Card -->', cardHTML);
      if (textureOverlayHTML) htmlParts.push(textureOverlayHTML);
      htmlParts.push(...orderedContentModules);
    }
  } else {
    // Card is disabled: texture overlay goes over viewport, then content-wrapper
    if (textureOverlayHTML) {
      htmlParts.push(textureOverlayHTML);
    }

    if (orderedContentModules.length > 0) {
      htmlParts.push(
        '<!-- Content Wrapper -->',
        '<div class="content-wrapper">',
        ...orderedContentModules,
        '</div>'
      );
    }
  }

  // 3. Add overlay modules (logo, corners, freeText, etc.)
  htmlParts.push(...overlayModules);

  return htmlParts.filter(Boolean).join('\n\n');
}

// ============================================================================
// CUSTOM FONTS GENERATION
// ============================================================================

/**
 * Generates @font-face CSS for all custom fonts
 * Custom fonts are loaded from /fonts/ directory
 */
function generateCustomFontsCSS(baseUrl: string): string {
  return CUSTOM_FONTS.map((font) => {
    const fontUrl = `${baseUrl}/fonts/${font.filename}`;
    const fontFormat = font.filename.endsWith('.otf') ? 'opentype' : 'truetype';

    return `
    @font-face {
      font-family: '${font.family}';
      src: url('${fontUrl}') format('${fontFormat}');
      font-weight: ${font.weight || 400};
      font-style: ${font.style || 'normal'};
      font-display: swap;
    }`;
  }).join('\n');
}

// ============================================================================
// FINAL HTML GENERATION
// ============================================================================

/**
 * Generates the complete HTML document with all required dependencies
 */
function generateFinalHTML(params: {
  viewportWidth: number;
  viewportHeight: number;
  modulesCSS: string;
  modulesHTML: string;
  baseUrl: string;
  styleVariables: Record<string, string>;
  carouselMode?: 'vertical' | 'horizontal';
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
}): string {
  const { viewportWidth, viewportHeight, modulesCSS, modulesHTML, baseUrl, styleVariables, carouselMode, freeImage } = params;

  console.log('\n========================================');
  console.log('[Compositer] FINAL HTML GENERATION');
  console.log('========================================');

  // Convert styleVariables to CSS
  const cssVariablesString = Object.entries(styleVariables)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');

  console.log('[Compositer] CSS Variables count:', Object.keys(styleVariables).length);

  // Build Google Fonts URL
  const fontsUrl = `https://fonts.googleapis.com/css2?${GOOGLE_FONTS.map((f) => `family=${f}`).join('&')}&display=swap`;

  // Generate custom fonts CSS
  const customFontsCSS = generateCustomFontsCSS(baseUrl);
  console.log('[Compositer] Custom fonts CSS length:', customFontsCSS.length, 'bytes');

  // Build mode-specific title
  const modeInfo = carouselMode === 'horizontal'
    ? ` (Horizontal Carousel - ${viewportWidth}×${viewportHeight})`
    : ` (Vertical - ${viewportWidth}×${viewportHeight})`;

  console.log('[Compositer] Viewport dimensions:', viewportWidth, 'x', viewportHeight);
  console.log('[Compositer] Carousel mode:', carouselMode);
  console.log('[Compositer] Modules CSS length:', modulesCSS.length, 'bytes');

  // Check for CSS specificity issues
  const resetHasBodyBackground = /body\s*\{[^}]*background/.test(modulesCSS);
  const resetHasUniversalBackground = /\*\s*\{[^}]*background/.test(modulesCSS);
  const viewportCSSPosition = modulesCSS.indexOf('/* === Viewport');

  console.log('\n[Compositer] CSS CONFLICT ANALYSIS:');
  console.log('[Compositer]   CSS Reset has body background:', resetHasBodyBackground);
  console.log('[Compositer]   CSS Reset has universal background:', resetHasUniversalBackground);
  console.log('[Compositer]   Viewport CSS position in combined CSS:', viewportCSSPosition, '(char index)');

  if (viewportCSSPosition > 5000) {
    console.warn('[Compositer]   ⚠️  WARNING: Viewport CSS appears late in the cascade!');
    console.warn('[Compositer]       This may cause background override issues.');
  }

  console.log('========================================\n');

  const resetCSS = `/* CSS Reset */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    /* Product Sans Fallback - Uses Quicksand as alternative since Product Sans is proprietary */
    @supports (font-family: 'Product Sans') {
      /* Product Sans fallback to Quicksand (similar geometric sans-serif) */
    }

    /* CSS Variables from Modules */
    :root {
${cssVariablesString}
    }

    /* Make html and body fill iframe 100% */
    html, body {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      overflow: hidden;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    /* Body has FIXED dimensions - no responsive scaling */
    body {
      position: relative;
      width: ${viewportWidth}px;
      height: ${viewportHeight}px;
      transform-origin: top left;
    }

    img, picture, video, canvas, svg {
      display: block;
      max-width: 100%;
    }

    button, input, textarea, select {
      font: inherit;
    }

    p, h1, h2, h3, h4, h5, h6 {
      overflow-wrap: break-word;
    }`;

  console.log('\n[Compositer] HTML STRUCTURE ORDER:');
  console.log('[Compositer]   1. Custom Fonts CSS (', customFontsCSS.length, 'bytes )');
  console.log('[Compositer]   2. Google Fonts link tag');
  console.log('[Compositer]   3. CSS Reset (', resetCSS.length, 'bytes )');
  console.log('[Compositer]   4. Module CSS (', modulesCSS.length, 'bytes )');
  console.log('[Compositer]   NOTE: Reset CSS and Module CSS are in the SAME <style> block!');
  console.log('[Compositer]   ⚠️  This means Module CSS comes AFTER Reset CSS in cascade');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Carousel Slide${modeInfo}</title>
  ${carouselMode === 'horizontal' ? '<!-- Generated in HORIZONTAL CAROUSEL MODE -->' : ''}

  <!-- Custom Fonts (@font-face) -->
  <style>
    ${customFontsCSS}
  </style>

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="${fontsUrl}" rel="stylesheet">

  <!-- Base CSS Reset + CSS Variables + Module CSS -->
  <style>
    ${resetCSS}

    /* Module CSS */
    ${modulesCSS}
  </style>
</head>
<body>
  ${modulesHTML}
</body>
</html>`;
}

// ============================================================================
// EXPORTS
// ============================================================================

export { DEFAULT_VIEWPORT, MODULE_ORDER, GOOGLE_FONTS };
