import { ModuleData, RenderContext } from '../types';
import { CornersData, Corner, DynamicSource } from './schema';

/**
 * Helper to convert relative URLs to absolute URLs
 */
function resolveUrl(url: string, baseUrl?: string): string {
  // If URL is already absolute, return as-is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // If no baseUrl provided, return as-is (fallback)
  if (!baseUrl) {
    return url;
  }

  // Ensure baseUrl doesn't end with / and url starts with /
  const cleanBaseUrl = baseUrl.replace(/\/$/, '');
  const cleanUrl = url.startsWith('/') ? url : `/${url}`;

  return `${cleanBaseUrl}${cleanUrl}`;
}

/**
 * Helper to get dynamic data based on source
 */
function getDynamicData(source: DynamicSource, context?: RenderContext): string {
  const companyProfile = (context as any)?.companyProfile;

  switch (source) {
    case 'slide_counter': {
      const slideIndex = (context as any)?.currentSlideIndex ?? context?.slideIndex ?? 0;
      const currentSlide = slideIndex + 1;
      const totalSlides = context?.totalSlides ?? 1;
      return `${currentSlide}/${totalSlides}`;
    }
    case 'company_name':
      return companyProfile?.company_name || '';
    case 'instagram_handle': {
      const handle = companyProfile?.social_media_handles?.instagram || '';
      return handle ? (handle.startsWith('@') ? handle : `@${handle}`) : '';
    }
    case 'logo':
      return companyProfile?.logo_url || '';
    case 'industry':
      return companyProfile?.industry || '';
    default:
      return '';
  }
}

/**
 * Helper to fetch SVG content from URL
 * Note: In actual implementation, this would be async and cached
 */
function getSvgContent(corner: Corner, baseUrl: string = '', isDynamic: boolean = false): string {
  // If svgContent is provided inline, use it
  if (corner.svgContent && corner.svgContent.trim()) {
    return corner.svgContent;
  }

  // If svgUrl is provided, return a div (SVG will be used as mask-image for color control)
  if (corner.svgUrl && corner.svgUrl.trim() && corner.svgUrl !== 'none') {
    // Convert relative URLs to absolute URLs for Puppeteer
    const absoluteUrl = resolveUrl(corner.svgUrl, baseUrl);

    // For dynamic logos, apply inline mask-image style for runtime substitution
    if (isDynamic) {
      const svgColor = corner.svgColor || '#ffffff';
      return `<div class="corner-svg-mask" data-svg-url="${absoluteUrl}" style="background-color: ${svgColor}; -webkit-mask-image: url('${absoluteUrl}'); mask-image: url('${absoluteUrl}');"></div>`;
    }

    // Using div with data attribute - mask-image will be applied via CSS
    return `<div class="corner-svg-mask" data-svg-url="${absoluteUrl}"></div>`;
  }

  return '';
}

/**
 * Helper to generate HTML for a single corner
 */
function getCornerHtml(corner: Corner, cornerNum: number, baseUrl: string = '', context?: RenderContext): string {
  if (corner.type === 'none') {
    return '';
  }

  if (corner.type === 'text') {
    const text = corner.text || '';
    return `<span class="corner-${cornerNum}-text">${text}</span>`;
  }

  if (corner.type === 'contador') {
    const slideIndex = (context as any)?.currentSlideIndex ?? context?.slideIndex ?? 0;
    const currentSlide = slideIndex + 1;
    const totalSlides = context?.totalSlides ?? 1;
    const contadorText = `${currentSlide}/${totalSlides}`;
    return `<span class="corner-${cornerNum}-text">${contadorText}</span>`;
  }

  if (corner.type === 'svg') {
    return getSvgContent(corner, baseUrl);
  }

  if (corner.type === 'dynamic') {
    const dynamicSource = (corner as any).dynamicSource || 'slide_counter';
    const dynamicData = getDynamicData(dynamicSource, context);

    // If dynamic source is logo, render as SVG
    if (dynamicSource === 'logo' && dynamicData) {
      const logoCorner = { ...corner, svgUrl: dynamicData, type: 'svg' } as Corner;
      return getSvgContent(logoCorner, baseUrl, true);
    }

    // Otherwise, render as text
    if (dynamicData) {
      return `<span class="corner-${cornerNum}-text">${dynamicData}</span>`;
    }

    return '';
  }

  return '';
}

/**
 * Helper to check if duo mode is active
 */
function isDuoModeActive(context?: RenderContext): boolean {
  return context?.enabledModules?.includes('duo') ?? false;
}

/**
 * Generates HTML for the Corners Module
 */
export function getCornersHtml(data: ModuleData, context?: RenderContext): string {
  const cornersData = data as unknown as CornersData;
  const { corners } = cornersData;
  const baseUrl = context?.baseUrl || '';
  const isDuo = isDuoModeActive(context);

  // Generate HTML for each corner
  const corner1Content = getCornerHtml(corners[0], 1, baseUrl, context);
  const corner2Content = getCornerHtml(corners[1], 2, baseUrl, context);
  const corner3Content = getCornerHtml(corners[2], 3, baseUrl, context);
  const corner4Content = getCornerHtml(corners[3], 4, baseUrl, context);

  if (isDuo) {
    // Duo mode: 8 corners (4 per slide) with -s1 and -s2 classes
    return `
  <div class="overlay-layer">
    <div class="corner corner-1-s1">${corner1Content}</div>
    <div class="corner corner-2-s1">${corner2Content}</div>
    <div class="corner corner-3-s1">${corner3Content}</div>
    <div class="corner corner-4-s1">${corner4Content}</div>
    <div class="corner corner-1-s2">${corner1Content}</div>
    <div class="corner corner-2-s2">${corner2Content}</div>
    <div class="corner corner-3-s2">${corner3Content}</div>
    <div class="corner corner-4-s2">${corner4Content}</div>
  </div>
  `;
  }

  // Single mode: 4 corners
  return `
  <div class="overlay-layer">
    <div class="corner corner-1">${corner1Content}</div>
    <div class="corner corner-2">${corner2Content}</div>
    <div class="corner corner-3">${corner3Content}</div>
    <div class="corner corner-4">${corner4Content}</div>
  </div>
  `;
}

/**
 * Helper to generate corner content placeholders for template replacement
 * Used by legacy templates that inject corners via {{{corner1Content}}} syntax
 */
export function getCornerPlaceholders(data: ModuleData, baseUrl: string = '', context?: RenderContext): Record<string, string> {
  const cornersData = data as unknown as CornersData;
  const { corners } = cornersData;

  return {
    corner1Content: getCornerHtml(corners[0], 1, baseUrl, context),
    corner2Content: getCornerHtml(corners[1], 2, baseUrl, context),
    corner3Content: getCornerHtml(corners[2], 3, baseUrl, context),
    corner4Content: getCornerHtml(corners[3], 4, baseUrl, context),
  };
}
