/**
 * Text Fields Module
 *
 * Manages up to 5 independent text fields with full typography and positioning controls.
 * Each text field can be individually styled and positioned within the carousel card.
 *
 * ARCHITECTURE (matching image-gen-nextjs):
 * - Creates a .text-section container (flex layout)
 * - Each field is a .text-item div
 * - position: absolute ONLY if field.freePosition === true
 * - By default, fields use flex layout inside the card
 */
import type { ModuleDefinition } from '@/lib/carousel-composer/types';
/**
 * Text Fields Module Definition
 */
export declare const textFieldsModule: ModuleDefinition;
export default textFieldsModule;
//# sourceMappingURL=textFields.d.ts.map