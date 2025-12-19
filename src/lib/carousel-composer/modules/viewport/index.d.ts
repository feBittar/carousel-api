import { ModuleDefinition } from '../../types';
/**
 * ViewportModule - Controla o background, blur e gradient overlay do viewport
 *
 * Funcionalidades:
 * - Background color ou image
 * - Blur overlay (backdrop-filter via ::before)
 * - Gradient overlay (linear-gradient via ::after)
 *
 * z-index: 0 (background layer)
 */
export declare const viewportModule: ModuleDefinition;
export { viewportSchema, viewportDefaults } from './schema';
export type { ViewportData } from './schema';
export { getViewportCss, getViewportStyleVariables } from './css';
export { getViewportHtml } from './html';
export { ViewportForm } from './ViewportForm';
//# sourceMappingURL=index.d.ts.map