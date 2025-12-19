import { ModuleDefinition } from '../types';
/**
 * Logo Module Definition
 *
 * Provides a single logo image overlay that can be positioned anywhere on the viewport.
 *
 * z-index: 30 (above content, below corners)
 *
 * Features:
 * - Select logo from available logos via API
 * - Customizable dimensions (width/height with auto support)
 * - Flexible positioning: special presets or manual coordinates
 * - Opacity control (0-1)
 * - CSS filters: grayscale, invert, brightness, contrast, sepia
 * - Filter intensity control for brightness/contrast
 * - Live preview of selected logo
 */
export declare const LogoModule: ModuleDefinition;
export { logoSchema, logoDefaults } from './schema';
export type { LogoData, LogoFilter } from './schema';
export { getLogoCss, getLogoStyleVariables } from './css';
export { getLogoHtml, getLogoPlaceholder } from './html';
export { LogoForm } from './LogoForm';
//# sourceMappingURL=index.d.ts.map