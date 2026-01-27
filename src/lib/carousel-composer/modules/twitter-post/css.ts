import { ModuleData, CompositionOptions } from '../../types';
import { TwitterPostData } from './schema';
import { formatFontFamily } from '../../utils/fontHelpers';

/**
 * Generates CSS for the Twitter Post module (Minimal Mode)
 * Creates a minimal Twitter/X post with compact header and large text
 * @param data Module data
 * @param options Composition options
 */
export function getTwitterPostCss(data: ModuleData, options?: CompositionOptions): string {
  const moduleData = data as TwitterPostData;

  // If disabled, hide the module
  if (!moduleData.enabled) {
    return `
      /* Twitter Post Module - Disabled */
      .twitter-post-module-minimal {
        display: none;
      }
    `;
  }

  const {
    platform,
    verticalAlign,
    headerTop,
    textTop,
    textPadding,
    textStyle,
    postImageEnabled,
    postImageBorderRadius,
    headerNameColor,
    headerUsernameColor,
    verifiedBadgeColor,
  } = moduleData;

  // Get viewport dimensions from options or use defaults
  const viewportWidth = options?.viewportWidth || 1080;
  const viewportHeight = options?.viewportHeight || 1350;

  // Calculate horizontal padding in pixels
  const paddingX = (viewportWidth * textPadding) / 100;

  const isTwitter = platform === 'twitter';

  // Header sizes (Alex Hormozi style - BIG and bold)
  const avatarSize = 110;
  const nameSize = 42;
  const usernameSize = 32;
  const verifiedSize = 38;

  // Color schemes - use palette colors if available, fallback to platform defaults
  const nameColor = headerNameColor || '#000000';
  const usernameColor = headerUsernameColor || (isTwitter ? '#657786' : '#71767B');
  const verifiedColor = verifiedBadgeColor || (isTwitter ? '#1DA1F2' : '#1D9BF0');

  // Text styles from schema
  const style = textStyle || {};

  // Vertical alignment mapping
  const alignmentMap = {
    top: 'flex-start',
    center: 'center',
    bottom: 'flex-end',
  };
  const justifyContent = alignmentMap[verticalAlign || 'top'];

  // Use absolute positioning only for 'top' alignment (for fine-tune control)
  const useAbsolutePositioning = verticalAlign === 'top';

  // Calculate header height for center compensation (avatar + gap)
  const headerHeight = avatarSize + 40; // 110 + 40 = 150px

  // Build container styles
  // For 'center': add extra padding-bottom to compensate for header,
  // so the visual center is on the text, not the header+text block
  const containerStyles = useAbsolutePositioning
    ? ''
    : `display: flex;
      flex-direction: column;
      justify-content: ${justifyContent};
      padding: ${paddingX}px;
      padding-bottom: ${verticalAlign === 'center' ? (paddingX + headerHeight) : paddingX}px;
      gap: 40px;`;

  // Build header styles
  const headerStyles = useAbsolutePositioning
    ? `position: absolute;
      top: ${headerTop}px;
      left: ${paddingX}px;
      right: ${paddingX}px;`
    : '';

  // Build text styles
  const textStyles = useAbsolutePositioning
    ? `position: absolute;
      top: ${textTop}px;
      left: ${paddingX}px;
      right: ${paddingX}px;
      bottom: ${paddingX}px;`
    : `flex-shrink: 0;
      width: 100%;`;

  return `
    /* ===== TWITTER/X POST MODULE - MINIMAL MODE (z-index: 15) ===== */

    /* Main container (full canvas with flexbox for vertical alignment) */
    .twitter-post-module-minimal {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 15;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      ${containerStyles}
    }

    /* Compact Header */
    .twitter-header-minimal {
      ${headerStyles}
      display: flex;
      align-items: center;
      gap: 20px;
      z-index: 16;
      flex-shrink: 0;
    }

    .twitter-header-avatar {
      width: ${avatarSize}px;
      height: ${avatarSize}px;
      border-radius: 50%;
      object-fit: cover;
      background-color: #e1e8ed;
      flex-shrink: 0;
    }

    .twitter-header-info {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    .twitter-header-name {
      font-size: ${nameSize}px;
      font-weight: 900;
      color: ${nameColor};
    }

    .twitter-header-verified {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: ${verifiedSize}px;
      height: ${verifiedSize}px;
    }

    .twitter-header-verified svg {
      width: ${verifiedSize}px;
      height: ${verifiedSize}px;
      fill: ${verifiedColor};
    }

    .twitter-header-username {
      font-size: ${usernameSize}px;
      font-weight: 400;
      color: ${usernameColor};
    }

    /* Main Text (fills canvas with styling from textStyle) */
    .twitter-post-text-main {
      ${textStyles}
      font-family: ${formatFontFamily(style.fontFamily || 'Arial')};
      font-size: ${style.fontSize || '48px'};
      font-weight: ${style.fontWeight || '700'};
      color: ${style.color || '#000000'};
      text-align: ${style.textAlign || 'left'};
      line-height: ${style.lineHeight || '1.2'};
      letter-spacing: ${style.letterSpacing || '0'};
      text-transform: ${style.textTransform || 'none'};
      word-wrap: break-word;
      overflow-wrap: break-word;
      z-index: 15;
      ${style.textShadow ? `text-shadow: ${style.textShadow};` : ''}
      ${style.textDecoration ? `text-decoration: ${style.textDecoration};` : ''}
    }

    /* Styled chunks with background colors (same as textFields) */
    .twitter-post-text-main span[style*="background-color"] {
      padding: 2px 4px;
      border-radius: 2px;
    }

    /* Post Image (Twitter-style attached media) */
    .twitter-post-image-container {
      ${useAbsolutePositioning ? `
        position: absolute;
        left: ${paddingX}px;
        right: ${paddingX}px;
        bottom: ${paddingX}px;
      ` : `
        flex-shrink: 0;
        width: 100%;
        margin-top: 20px;
      `}
      z-index: 15;
    }

    .twitter-post-image {
      width: 100%;
      max-height: 500px;
      object-fit: cover;
      border-radius: ${postImageBorderRadius ?? 16}px;
      border: 1px solid #e1e8ed;
    }
  `;
}
