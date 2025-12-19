import { ModuleData, RenderContext } from '../types';
import { TwitterPostData } from './schema';

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
 * Helper to format numbers (e.g., 15200 → "15.2K", 1500000 → "1.5M")
 */
function formatNumber(num: number): string {
  if (num === 0) return '0';
  if (num < 1000) return num.toString();
  if (num < 1000000) {
    const k = num / 1000;
    return k % 1 === 0 ? `${k}K` : `${k.toFixed(1)}K`;
  }
  const m = num / 1000000;
  return m % 1 === 0 ? `${m}M` : `${m.toFixed(1)}M`;
}

/**
 * Helper to process styled chunks into HTML
 */
function processStyledChunks(chunks: Array<{ text: string; color?: string; bold?: boolean; italic?: boolean; underline?: boolean }>): string {
  if (!chunks || chunks.length === 0) return '';

  return chunks
    .map((chunk) => {
      const styles: string[] = [];
      if (chunk.color) styles.push(`color: ${chunk.color}`);
      if (chunk.bold) styles.push('font-weight: 700');
      if (chunk.italic) styles.push('font-style: italic');
      if (chunk.underline) styles.push('text-decoration: underline');

      const styleAttr = styles.length > 0 ? ` style="${styles.join('; ')}"` : '';
      const escaped = chunk.text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

      return `<span${styleAttr}>${escaped}</span>`;
    })
    .join('');
}

/**
 * SVG Icons
 */
const ICONS = {
  verified: `<svg viewBox="0 0 22 22" aria-label="Verified account" role="img" style="fill: #1d9bf0;"><g><path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path></g></svg>`,

  reply: `<svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path></g></svg>`,

  retweet: `<svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path></g></svg>`,

  like: `<svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g></svg>`,

  views: `<svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"></path></g></svg>`,
};

/**
 * Generates HTML for the Twitter Post module
 * @param data Module data
 * @param context Render context
 */
export function getTwitterPostHtml(data: ModuleData, context?: RenderContext): string {
  const moduleData = data as unknown as TwitterPostData;

  // If disabled, return empty
  if (!moduleData.enabled) {
    return '';
  }

  const {
    platform,
    profileImage,
    displayName,
    username,
    verified,
    postText,
    styledChunks,
    postImage,
    timestamp,
    showStats,
    stats,
  } = moduleData;

  // Resolve profile image URL
  const profileImgUrl = resolveUrl(profileImage, context?.baseUrl) || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"%3E%3Crect fill="%23e1e8ed" width="24" height="24"/%3E%3Cpath fill="%23657786" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/%3E%3C/svg%3E';

  // Process text content
  let textContent = '';
  if (styledChunks && styledChunks.length > 0) {
    textContent = processStyledChunks(styledChunks);
  } else {
    // Fallback to plain text with escaping
    textContent = postText
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Resolve post image URL if present
  const postImgUrl = postImage ? resolveUrl(postImage, context?.baseUrl) : '';

  // Generate verified badge HTML
  const verifiedBadge = verified
    ? `<span class="twitter-post-verified" aria-label="Verified">${ICONS.verified}</span>`
    : '';

  // Generate post image HTML
  const mediaHtml = postImgUrl
    ? `
      <div class="twitter-post-media">
        <img src="${postImgUrl}" alt="Tweet media" class="twitter-post-media-img" />
      </div>
    `
    : '';

  // Generate stats HTML
  const statsHtml = showStats
    ? `
      <div class="twitter-post-actions">
        <button class="twitter-post-action-btn reply" aria-label="Reply">
          ${ICONS.reply}
          <span class="twitter-post-action-count">${formatNumber(stats.replies)}</span>
        </button>
        <button class="twitter-post-action-btn retweet" aria-label="Retweet">
          ${ICONS.retweet}
          <span class="twitter-post-action-count">${formatNumber(stats.retweets)}</span>
        </button>
        <button class="twitter-post-action-btn like" aria-label="Like">
          ${ICONS.like}
          <span class="twitter-post-action-count">${formatNumber(stats.likes)}</span>
        </button>
        <button class="twitter-post-action-btn views" aria-label="Views">
          ${ICONS.views}
          <span class="twitter-post-action-count">${formatNumber(stats.views)}</span>
        </button>
      </div>
    `
    : '';

  return `
    <!-- ===== TWITTER/X POST MODULE ===== -->
    <div class="twitter-post-module" data-platform="${platform}">
      <div class="twitter-post-card">
        <div class="twitter-post-wrapper">
          <!-- Avatar -->
          <div class="twitter-post-avatar">
            <img
              src="${profileImgUrl}"
              alt="${displayName}"
              class="twitter-post-avatar-img"
            />
          </div>

          <!-- Content -->
          <div class="twitter-post-content">
            <!-- Header -->
            <div class="twitter-post-header">
              <span class="twitter-post-display-name">${displayName}</span>
              ${verifiedBadge}
              <span class="twitter-post-username">@${username}</span>
              <span class="twitter-post-timestamp">${timestamp}</span>
            </div>

            <!-- Tweet Text -->
            <div class="twitter-post-text">${textContent}</div>

            <!-- Tweet Media (Optional) -->
            ${mediaHtml}

            <!-- Actions/Stats -->
            ${statsHtml}
          </div>
        </div>
      </div>
    </div>
  `;
}
