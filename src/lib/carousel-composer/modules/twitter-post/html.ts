import { ModuleData, RenderContext, CompositionOptions } from '../../types';
import { TwitterPostData } from './schema';
import { applyStyledChunks } from '../../utils/richTextConverter';

/**
 * Helper to convert relative URLs to absolute
 */
function resolveUrl(url: string, baseUrl?: string): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  if (!baseUrl) return url;
  const cleanBaseUrl = baseUrl.replace(/\/$/, '');
  const cleanUrl = url.startsWith('/') ? url : `/${url}`;
  return `${cleanBaseUrl}${cleanUrl}`;
}

/**
 * Escapes HTML characters to prevent XSS
 */
function escapeHtml(text: string): string {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Helper to get dynamic data from company profile
 */
function getDynamicProfileData(
  field: 'profileImage' | 'displayName' | 'username',
  options?: CompositionOptions
): string {
  const companyProfile = options?.companyProfile;

  switch (field) {
    case 'profileImage':
      return companyProfile?.logo_url || '';

    case 'displayName':
      return companyProfile?.company_name || '';

    case 'username':
      const instagram = companyProfile?.social_media_handles?.instagram || '';
      // Remove @ if present, we add it in the HTML
      return instagram.replace('@', '');

    default:
      return '';
  }
}

/**
 * SVG Icons
 */
const ICONS = {
  verified: `<svg viewBox="0 0 22 22" aria-label="Verified account" role="img"><g><path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path></g></svg>`,
};

/**
 * Generates HTML for the Twitter Post module (Minimal Mode)
 * Creates a minimal Twitter/X post with compact header and large text
 * @param data Module data
 * @param options Composition options (includes company profile for dynamic data)
 */
export function getTwitterPostHtml(data: ModuleData, options?: CompositionOptions): string {
  const moduleData = data as TwitterPostData;

  // If disabled, return empty
  if (!moduleData.enabled) {
    return '';
  }

  const {
    dynamicProfileImage,
    profileImage,
    dynamicDisplayName,
    displayName,
    dynamicUsername,
    username,
    verified,
    postText,
    styledChunks,
    textStyle,
    postImageEnabled,
    postImageUrl,
  } = moduleData;

  // Get profile image (dynamic or static)
  let profileImgUrl = '';
  if (dynamicProfileImage) {
    const dynamicImg = getDynamicProfileData('profileImage', options);
    profileImgUrl = resolveUrl(dynamicImg, options?.baseUrl) || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"%3E%3Crect fill="%23e1e8ed" width="24" height="24"/%3E%3Cpath fill="%23657786" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/%3E%3C/svg%3E';
  } else {
    profileImgUrl = resolveUrl(profileImage, options?.baseUrl) || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"%3E%3Crect fill="%23e1e8ed" width="24" height="24"/%3E%3Cpath fill="%23657786" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/%3E%3C/svg%3E';
  }

  // Get display name (dynamic or static)
  const finalDisplayName = dynamicDisplayName
    ? getDynamicProfileData('displayName', options) || displayName
    : displayName;

  // Get username (dynamic or static)
  const finalUsername = dynamicUsername
    ? getDynamicProfileData('username', options) || username
    : username;

  // Process text content using applyStyledChunks (same as textFields module)
  let textContent = '';
  if (styledChunks && styledChunks.length > 0) {
    // Convert styled chunks to HTML with parent styles for inheritance
    const parentStyles = {
      fontFamily: textStyle?.fontFamily,
      fontSize: textStyle?.fontSize,
      fontWeight: textStyle?.fontWeight,
      color: textStyle?.color,
      letterSpacing: textStyle?.letterSpacing,
      lineHeight: textStyle?.lineHeight,
      textAlign: textStyle?.textAlign,
      slideBackgroundColor: options?.slideBackgroundColor,
    };

    textContent = applyStyledChunks(
      postText,
      styledChunks,
      parentStyles
    );
  } else {
    // Fallback to plain text with escaping
    textContent = escapeHtml(postText);
  }

  // Generate verified badge HTML
  const verifiedBadge = verified
    ? `<span class="twitter-header-verified">${ICONS.verified}</span>`
    : '';

  // Data attributes for visual editor
  const profileImageDataAttrs = options?.includeDataAttributes
    ? ' data-field-type="image" data-field-index="0"'
    : '';

  const displayNameDataAttrs = options?.includeDataAttributes
    ? ' data-field-type="text" data-field-index="1"'
    : '';

  const usernameDataAttrs = options?.includeDataAttributes
    ? ' data-field-type="text" data-field-index="2"'
    : '';

  const postTextDataAttrs = options?.includeDataAttributes
    ? ' data-field-type="text" data-field-index="3"'
    : '';

  const postImageDataAttrs = options?.includeDataAttributes
    ? ' data-field-type="image" data-field-index="4"'
    : '';

  // Build post image HTML if enabled
  const postImageUrl_resolved = postImageUrl ? resolveUrl(postImageUrl, options?.baseUrl) : '';
  const postImageHtml = postImageEnabled && postImageUrl_resolved
    ? `
      <!-- Post Image -->
      <div class="twitter-post-image-container">
        <img
          src="${postImageUrl_resolved}"
          alt="Post image"
          class="twitter-post-image"${postImageDataAttrs}
        />
      </div>
    `
    : '';

  return `
    <!-- ===== TWITTER/X POST MODULE (MINIMAL MODE) ===== -->
    <div class="twitter-post-module-minimal"${options?.includeDataAttributes ? ' data-module-id="twitterPost"' : ''}>
      <!-- Compact Header (fixed at top) -->
      <div class="twitter-header-minimal">
        <img
          src="${profileImgUrl}"
          alt="${finalDisplayName}"
          class="twitter-header-avatar"${profileImageDataAttrs}
        />
        <div class="twitter-header-info">
          <span class="twitter-header-name"${displayNameDataAttrs}>${escapeHtml(finalDisplayName)}</span>
          ${verifiedBadge}
          <span class="twitter-header-username"${usernameDataAttrs}>@${escapeHtml(finalUsername)}</span>
        </div>
      </div>

      <!-- Main Text (fills canvas, styled chunks supported) -->
      <div class="twitter-post-text-main"${postTextDataAttrs}>${textContent}</div>
      ${postImageHtml}
    </div>
  `;
}
