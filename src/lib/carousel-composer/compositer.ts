import {
  ModuleData,
  ComposedTemplate,
  RenderContext,
  ComposeOptions,
  Position
} from './types';

// ============================================================================
// TEMPLATE COMPOSITER (Server-side simplified version)
// ============================================================================

/**
 * Base URL para assets (fonts, images, etc)
 */
const DEFAULT_BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

/**
 * Dimensões padrão do viewport
 */
const DEFAULT_VIEWPORT = {
  width: 1080,
  height: 1440,
};

/**
 * Compõe um template final a partir dos dados dos módulos
 * Versão simplificada para servidor - recebe dados já processados
 */
export function composeTemplate(
  enabledModuleIds: string[],
  modulesData: Record<string, ModuleData>,
  options: ComposeOptions = {}
): ComposedTemplate {
  const {
    baseUrl = DEFAULT_BASE_URL,
    slideCount = 1,
  } = options;

  // Determine viewport dimensions
  const { viewportWidth, viewportHeight } = calculateViewport(slideCount);

  // Create render context
  const context: RenderContext = {
    enabledModules: enabledModuleIds,
    allModulesData: modulesData,
    viewportWidth,
    viewportHeight,
    baseUrl,
  };

  // Generate CSS and HTML using helper functions
  const modulesCSS = generateModulesCSS(modulesData, context);
  const modulesHTML = generateModulesHTML(modulesData, context);
  const styleVariables = generateStyleVariables(modulesData);

  // Generate final HTML
  const finalHtml = generateFinalHtml({
    viewportWidth,
    viewportHeight,
    modulesCSS,
    modulesHTML,
    styleVariables,
    baseUrl,
  });

  return {
    viewportWidth,
    viewportHeight,
    modulesCSS,
    modulesHTML,
    styleVariables,
    finalHtml,
  };
}

/**
 * Calcula as dimensões do viewport baseado no número de slides
 */
function calculateViewport(slideCount: number = 1): {
  viewportWidth: number;
  viewportHeight: number;
} {
  return {
    viewportWidth: slideCount * DEFAULT_VIEWPORT.width,
    viewportHeight: DEFAULT_VIEWPORT.height,
  };
}

/**
 * Gera CSS de todos os módulos
 * NOTA: No servidor, você precisará implementar getCss() para cada tipo de módulo
 */
function generateModulesCSS(
  modulesData: Record<string, ModuleData>,
  _context: RenderContext
): string {
  const cssParts: string[] = [];

  // Viewport CSS
  if (modulesData.viewport) {
    cssParts.push(generateViewportCSS(modulesData.viewport));
  }

  // Card CSS
  if (modulesData.card) {
    cssParts.push(generateCardCSS(modulesData.card));
  }

  // Text Fields CSS
  if (modulesData.textFields) {
    cssParts.push(generateTextFieldsCSS(modulesData.textFields));
  }

  // Content Image CSS
  if (modulesData.contentImage) {
    cssParts.push(generateContentImageCSS(modulesData.contentImage));
  }

  // Add more modules as needed

  return cssParts.join('\n\n');
}

/**
 * Gera HTML de todos os módulos
 */
function generateModulesHTML(
  modulesData: Record<string, ModuleData>,
  _context: RenderContext
): string {
  const htmlParts: string[] = [];

  const isCardActive = !!modulesData.card;

  if (isCardActive) {
    // Card wrapper open
    htmlParts.push('<div class="card-container">');

    // Text fields inside card
    if (modulesData.textFields) {
      htmlParts.push(generateTextFieldsHTML(modulesData.textFields));
    }

    // Content image inside card
    if (modulesData.contentImage) {
      htmlParts.push(generateContentImageHTML(modulesData.contentImage));
    }

    // Card wrapper close
    htmlParts.push('</div>');
  } else {
    // No card - wrap in content wrapper
    htmlParts.push('<div class="content-wrapper">');

    if (modulesData.textFields) {
      htmlParts.push(generateTextFieldsHTML(modulesData.textFields));
    }

    if (modulesData.contentImage) {
      htmlParts.push(generateContentImageHTML(modulesData.contentImage));
    }

    htmlParts.push('</div>');
  }

  return htmlParts.join('\n');
}

/**
 * Gera style variables
 */
function generateStyleVariables(modulesData: Record<string, ModuleData>): string {
  const variables: Record<string, string> = {};

  // Viewport variables
  if (modulesData.viewport) {
    const viewport = modulesData.viewport as any;
    if (viewport.backgroundColor) {
      variables['viewport-bg'] = viewport.backgroundColor;
    }
  }

  // Card variables
  if (modulesData.card) {
    const card = modulesData.card as any;
    if (card.backgroundColor) {
      variables['card-bg'] = card.backgroundColor;
    }
  }

  return Object.entries(variables)
    .map(([key, value]) => `--${key}: ${value};`)
    .join('\n      ');
}

/**
 * Gera o HTML final completo
 */
function generateFinalHtml(params: {
  viewportWidth: number;
  viewportHeight: number;
  modulesCSS: string;
  modulesHTML: string;
  styleVariables: string;
  baseUrl: string;
}): string {
  const {
    viewportWidth,
    viewportHeight,
    modulesCSS,
    modulesHTML,
    styleVariables,
    baseUrl,
  } = params;

  return `<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=${viewportWidth}, height=${viewportHeight}">
  <title>Generated Carousel</title>

  <!-- Base CSS -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">

  <!-- Module CSS -->
  <style>
    /* CSS Variables */
    :root {
      ${styleVariables}
    }

    /* Reset */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    /* Base body styles */
    body {
      width: ${viewportWidth}px;
      height: ${viewportHeight}px;
      margin: 0;
      padding: 0;
      overflow: hidden;
      position: relative;
      display: flex;
      flex-direction: column;
      font-family: 'Inter', sans-serif;
    }

    /* Content wrapper (used when card is inactive) */
    .content-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      width: 100%;
      min-height: 0;
      position: relative;
      box-sizing: border-box;
    }

    /* Module styles */
    ${modulesCSS}
  </style>
</head>
<body>
  ${modulesHTML}

  <script>
    // Wait for fonts to load
    document.fonts.ready.then(function() {
      document.body.classList.add('fonts-loaded');
      console.log('Fonts loaded successfully');
    });
  </script>
</body>
</html>`;
}

// ============================================================================
// MODULE-SPECIFIC CSS/HTML GENERATORS
// ============================================================================

/**
 * Gera CSS do viewport
 */
function generateViewportCSS(data: ModuleData): string {
  const viewport = data as any;
  return `
/* === Viewport === */
body {
  background-color: ${viewport.backgroundColor || '#FFFFFF'};
}`;
}

/**
 * Gera CSS do card
 */
function generateCardCSS(data: ModuleData): string {
  const card = data as any;
  const enabled = card.enabled !== false;

  if (!enabled) return '';

  return `
/* === Card === */
.card-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${card.width || 900}px;
  height: ${card.height || 1200}px;
  background-color: ${card.backgroundColor || '#FFFFFF'};
  border-radius: ${card.borderRadius || 24}px;
  box-shadow: ${card.boxShadow || '0 20px 60px rgba(0,0,0,0.15)'};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: ${card.padding || '48px'};
}`;
}

/**
 * Gera CSS dos text fields
 */
function generateTextFieldsCSS(data: ModuleData): string {
  const fields = data as any;

  return `
/* === Text Fields === */
.text-fields-container {
  display: flex;
  flex-direction: column;
  gap: ${fields.gap || '24px'};
  z-index: 10;
}

.text-field {
  color: ${fields.color || '#000000'};
  font-family: ${fields.fontFamily || 'Inter'}, sans-serif;
}

.text-field h1 {
  font-size: ${fields.fontSize || '48px'};
  font-weight: ${fields.fontWeight || '700'};
  line-height: ${fields.lineHeight || '1.2'};
  margin: 0;
}`;
}

/**
 * Gera HTML dos text fields
 */
function generateTextFieldsHTML(data: ModuleData): string {
  const fields = data as any;
  const texts = fields.texts || [];

  if (texts.length === 0) return '';

  const textElements = texts
    .map((text: string) => {
      return `    <div class="text-field"><h1>${sanitizeHtml(text)}</h1></div>`;
    })
    .join('\n');

  return `  <div class="text-fields-container">
${textElements}
  </div>`;
}

/**
 * Gera CSS da content image
 */
function generateContentImageCSS(data: ModuleData): string {
  const image = data as any;

  return `
/* === Content Image === */
.content-image {
  position: relative;
  width: 100%;
  height: ${image.height || '400px'};
  border-radius: ${image.borderRadius || '16px'};
  overflow: hidden;
  z-index: 5;
}

.content-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}`;
}

/**
 * Gera HTML da content image
 */
function generateContentImageHTML(data: ModuleData): string {
  const image = data as any;

  if (!image.imageUrl) return '';

  return `  <div class="content-image">
    <img src="${sanitizeHtml(image.imageUrl)}" alt="Content Image" />
  </div>`;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Processa um valor de posição (string ou number) para CSS
 */
export function processPosition(value: string | number | undefined): string {
  if (value === undefined) return 'auto';
  if (typeof value === 'number') return `${value}px`;
  return value;
}

/**
 * Gera CSS de posicionamento a partir de um objeto Position
 */
export function generatePositionCSS(position: Position): string {
  const rules: string[] = [];

  if (position.top !== undefined) rules.push(`top: ${processPosition(position.top)}`);
  if (position.left !== undefined) rules.push(`left: ${processPosition(position.left)}`);
  if (position.right !== undefined) rules.push(`right: ${processPosition(position.right)}`);
  if (position.bottom !== undefined) rules.push(`bottom: ${processPosition(position.bottom)}`);
  if (position.width !== undefined) rules.push(`width: ${processPosition(position.width)}`);
  if (position.height !== undefined) rules.push(`height: ${processPosition(position.height)}`);

  return rules.join('; ');
}

/**
 * Sanitiza texto para HTML (previne XSS)
 */
export function sanitizeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Converte objeto de estilo para string CSS inline
 */
export function styleObjectToString(style: Record<string, string | number | undefined>): string {
  return Object.entries(style)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => {
      // Convert camelCase to kebab-case
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `${cssKey}: ${value}`;
    })
    .join('; ');
}
