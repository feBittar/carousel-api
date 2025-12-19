import { ModuleDefinition } from '../types';
/**
 * Corners Module Definition
 *
 * Provides 4 corner elements that can be text or SVG, positioned absolutely at:
 * - Corner 1: Top Left
 * - Corner 2: Top Right
 * - Corner 3: Bottom Left
 * - Corner 4: Bottom Right
 *
 * z-index: 99 (above everything except Duo slides)
 *
 * Features:
 * - Text corners with customizable styling and optional background
 * - SVG corners with color override and size control
 * - Flexible positioning with padding controls
 * - Compatible with Duo module (corners are duplicated for each slide)
 */
export declare const CornersModule: ModuleDefinition;
export { cornersSchema, cornersDefaults } from './schema';
export type { CornersData, Corner, CornerType, CornerSpecialPosition } from './schema';
export { getCornersCss, getCornersStyleVariables } from './css';
export { getCornersHtml, getCornerPlaceholders } from './html';
export { CornersForm } from './CornersForm';
//# sourceMappingURL=index.d.ts.map