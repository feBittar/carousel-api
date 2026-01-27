/**
 * SVG Placeholder as Data URI - works in both browser and Puppeteer (setContent mode)
 * Uses black fills with opacity for CSS mask-image compatibility.
 *
 * When Puppeteer uses page.setContent(), relative URLs like url('/placeholder-mono.svg')
 * won't resolve because there's no base URL. Data URIs solve this by embedding the SVG inline.
 */
export const PLACEHOLDER_SVG_DATA_URI = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200"><circle cx="600" cy="600" r="280" fill="black" opacity="0.15"/><circle cx="600" cy="600" r="200" fill="black" opacity="0.1"/><line x1="320" y1="600" x2="480" y2="600" stroke="black" stroke-width="8" opacity="0.2"/><line x1="720" y1="600" x2="880" y2="600" stroke="black" stroke-width="8" opacity="0.2"/><line x1="600" y1="320" x2="600" y2="480" stroke="black" stroke-width="8" opacity="0.2"/><line x1="600" y1="720" x2="600" y2="880" stroke="black" stroke-width="8" opacity="0.2"/><g transform="translate(520, 520)"><rect x="0" y="20" width="160" height="120" rx="12" fill="black" opacity="0.4"/><circle cx="50" cy="70" r="25" fill="black" opacity="0.6"/><path d="M90 140 L130 90 L160 120 L160 140 Z" fill="black" opacity="0.5"/><path d="M0 140 L60 80 L100 120 L100 140 Z" fill="black" opacity="0.5"/></g></svg>`)}`;
