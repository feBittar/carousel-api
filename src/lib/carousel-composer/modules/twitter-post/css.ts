import { ModuleData, RenderContext } from '../types';
import { TwitterPostData } from './schema';

/**
 * Generates CSS for the Twitter Post module
 * Supports both Twitter (old blue theme) and X (new dark theme)
 * @param data Module data
 * @param context Render context
 */
export function getTwitterPostCss(data: ModuleData, context?: RenderContext): string {
  const moduleData = data as unknown as TwitterPostData;

  // If disabled, hide the module
  if (!moduleData.enabled) {
    return `
      /* Twitter Post Module - Disabled */
      .twitter-post-module {
        display: none;
      }
    `;
  }

  const { scale, position, platform } = moduleData;
  const isTwitter = platform === 'twitter';

  // Color schemes based on platform
  const colors = isTwitter
    ? {
        primary: '#1DA1F2',         // Twitter Blue
        background: '#FFFFFF',      // White
        text: '#14171A',            // Dark text
        secondary: '#657786',       // Gray text
        border: '#E1E8ED',          // Light gray border
        hover: '#1A8CD8',           // Darker blue on hover
        verified: '#1DA1F2',        // Blue checkmark
      }
    : {
        primary: '#000000',         // X Black
        background: '#000000',      // Dark background
        text: '#E7E9EA',            // Light text
        secondary: '#71767B',       // Gray text
        border: '#2F3336',          // Dark gray border
        hover: '#1D1F23',           // Lighter on hover
        verified: '#1D9BF0',        // X Blue verification
      };

  return `
    /* ===== TWITTER/X POST MODULE (z-index: 100) ===== */

    /* Container positioning */
    .twitter-post-module {
      position: absolute;
      top: ${position.top};
      left: ${position.left};
      transform: ${position.transform} scale(${scale || 1.5});
      transform-origin: center center;
      z-index: 100;
      width: 598px; /* Twitter's standard post width */
      /* Note: No max-width/height constraints - let content determine size */
      /* Overflow is controlled by parent containers (body, card-container) */
    }

    /* Platform indicator - for conditional styling */
    .twitter-post-module[data-platform="${platform}"] {
      /* Platform-specific overrides can go here */
    }

    /* Tweet card */
    .twitter-post-card {
      background-color: ${colors.background};
      border: 1px solid ${colors.border};
      border-radius: ${isTwitter ? '16px' : '16px'};
      padding: ${isTwitter ? '16px' : '12px 16px'};
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      box-shadow: ${
        isTwitter
          ? 'rgba(101, 119, 134, 0.2) 0px 0px 15px, rgba(101, 119, 134, 0.15) 0px 0px 3px 1px'
          : 'rgba(255, 255, 255, 0.1) 0px 0px 15px, rgba(255, 255, 255, 0.05) 0px 0px 3px 1px'
      };
    }

    /* Main wrapper with flexbox */
    .twitter-post-wrapper {
      display: flex;
      gap: 12px;
    }

    /* Avatar section */
    .twitter-post-avatar {
      flex-shrink: 0;
      width: 48px;
      height: 48px;
    }

    .twitter-post-avatar-img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
      background-color: ${colors.border};
    }

    /* Content section */
    .twitter-post-content {
      flex: 1;
      min-width: 0; /* Prevents flex overflow */
    }

    /* Header section */
    .twitter-post-header {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-bottom: 4px;
      flex-wrap: wrap;
      line-height: 20px;
    }

    .twitter-post-display-name {
      font-size: 15px;
      font-weight: 700;
      color: ${colors.text};
    }

    /* Verified badge */
    .twitter-post-verified {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      margin-left: 2px;
    }

    .twitter-post-verified svg {
      width: 18px;
      height: 18px;
      fill: ${colors.verified};
    }

    .twitter-post-username,
    .twitter-post-timestamp {
      font-size: 15px;
      font-weight: 400;
      color: ${colors.secondary};
    }

    .twitter-post-timestamp::before {
      content: "·";
      margin: 0 4px;
      color: ${colors.secondary};
    }

    /* Tweet text */
    .twitter-post-text {
      font-size: 15px;
      font-weight: 400;
      line-height: 20px;
      color: ${colors.text};
      margin-bottom: 12px;
      word-wrap: break-word;
      white-space: pre-wrap;
    }

    /* Tweet media */
    .twitter-post-media {
      margin-top: 12px;
      margin-bottom: 12px;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid ${colors.border};
    }

    .twitter-post-media-img {
      width: 100%;
      height: auto;
      display: block;
      max-height: 510px;
      object-fit: cover;
    }

    /* Action icons */
    .twitter-post-actions {
      display: flex;
      justify-content: space-between;
      max-width: 425px;
      margin-top: 12px;
      gap: 8px;
    }

    .twitter-post-action-btn {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 6px 8px;
      border-radius: 9999px;
      background: none;
      border: none;
      cursor: pointer;
      color: ${colors.secondary};
      font-size: 13px;
      transition: all 0.2s ease;
      font-family: inherit;
    }

    .twitter-post-action-btn svg {
      width: 18.75px;
      height: 18.75px;
      fill: currentColor;
    }

    /* Platform-specific hover states */
    ${
      isTwitter
        ? `
    .twitter-post-action-btn.reply:hover {
      background-color: rgba(29, 161, 242, 0.1);
      color: #1da1f2;
    }

    .twitter-post-action-btn.retweet:hover {
      background-color: rgba(0, 186, 124, 0.1);
      color: #00ba7c;
    }

    .twitter-post-action-btn.like:hover {
      background-color: rgba(249, 24, 128, 0.1);
      color: #f91880;
    }

    .twitter-post-action-btn.views:hover {
      background-color: rgba(29, 161, 242, 0.1);
      color: #1da1f2;
    }
    `
        : `
    .twitter-post-action-btn.reply:hover {
      background-color: rgba(29, 155, 240, 0.1);
      color: #1d9bf0;
    }

    .twitter-post-action-btn.retweet:hover {
      background-color: rgba(0, 186, 124, 0.1);
      color: #00ba7c;
    }

    .twitter-post-action-btn.like:hover {
      background-color: rgba(249, 24, 128, 0.1);
      color: #f91880;
    }

    .twitter-post-action-btn.views:hover {
      background-color: rgba(29, 155, 240, 0.1);
      color: #1d9bf0;
    }
    `
    }

    .twitter-post-action-count {
      font-size: 13px;
      font-weight: 400;
      min-width: 20px;
      text-align: left;
    }

    /* Logo styling */
    .twitter-post-logo {
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }

    .twitter-post-logo.twitter-logo svg {
      fill: #1DA1F2;
    }

    .twitter-post-logo.x-logo svg {
      fill: ${isTwitter ? '#000000' : '#FFFFFF'};
    }

    /* Responsive adjustments */
    @media (max-width: 640px) {
      .twitter-post-module {
        width: 100%;
        max-width: calc(100vw - 32px);
      }
    }

    /* Smooth transitions for theme changes */
    .twitter-post-card,
    .twitter-post-display-name,
    .twitter-post-text,
    .twitter-post-username,
    .twitter-post-timestamp,
    .twitter-post-action-btn {
      transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
    }
  `;
}
