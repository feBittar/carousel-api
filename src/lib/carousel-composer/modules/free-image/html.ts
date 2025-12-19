import { ModuleData, RenderContext } from '../types';
import { FreeImageData } from './schema';

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
 * Generates HTML for the Free Image module
 *
 * Renders an absolutely positioned image for each slide within the specified range.
 * Only shows when enabled and URL is provided, and when the current slide is within
 * the startSlideIndex and endSlideIndex range.
 */
export function getFreeImageHtml(data: ModuleData, context?: RenderContext): string {
  const freeImage = data as FreeImageData;

  // Don't render if disabled or no URL
  if (!freeImage.enabled || !freeImage.url) {
    return '';
  }

  // Get slide indices from data
  const startSlideIndex = freeImage.startSlideIndex ?? 0;
  const endSlideIndex = freeImage.endSlideIndex ?? 1;
  const currentSlideIndex = context?.currentSlideIndex ?? 0;

  // Only render on slides within range
  if (currentSlideIndex < startSlideIndex || currentSlideIndex > endSlideIndex) {
    return '';
  }

  // Resolve URL to absolute
  const absoluteUrl = resolveUrl(freeImage.url, context?.baseUrl);

  // Add slide-specific class
  const slideClass = `free-image free-image-slide-${currentSlideIndex}`;

  return `
    <!-- ===== FREE IMAGE (Slide ${currentSlideIndex + 1}) ===== -->
    <img class="${slideClass}" src="${absoluteUrl}" alt="Free Image" data-slide="${currentSlideIndex}" />
  `;
}
