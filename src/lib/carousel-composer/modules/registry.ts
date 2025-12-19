/**
 * Module Registry
 *
 * Central registry for all carousel composer modules.
 * Provides module lookup, dependency checking, and conflict detection.
 */

import type { ModuleDefinition } from '../types';
import { viewportModule } from './viewport/index';
import { cardModule } from './card/index';
import { textFieldsModule } from './textFields';
import { contentImageModule } from './content-image/index';
import { ArrowBottomTextModule } from './arrow-bottom-text';
import { bulletsModule } from './bullets';
import { CornersModule } from './corners';
// import { duoModule } from './duo'; // REMOVED - not used anymore
import { FreeTextModule } from './free-text';
import { imageTextBoxModule } from './image-text-box';
import { LogoModule } from './logo';
import { svgElementsModule } from './svg-elements';
import { textureOverlayModule } from './texture-overlay';
import { twitterPostModule } from './twitter-post';
// import { freeImageModule } from './free-image'; // REMOVED - now global configuration

// ============================================================================
// MODULE REGISTRY
// ============================================================================

/**
 * Module categories for UI organization
 */
export const MODULE_CATEGORIES = {
  layout: ['viewport', 'card', 'textureOverlay'],
  content: ['textFields', 'contentImage', 'imageTextBox', 'bullets', 'twitterPost'],
  overlay: ['corners', 'freeText', 'arrowBottomText', 'svgElements', 'logo'],
  // 'freeImage' removed - now global configuration via FreeImagePanel
} as const;

/**
 * All available modules (13 modules)
 * Returns new object every time to avoid circular dependency issues
 * NOTE: Do not cache this - modules are imported at top level so they're already cached by JS engine
 */
function getModulesRegistry(): Record<string, ModuleDefinition> {
  return {
    viewport: viewportModule,
    card: cardModule,
    textFields: textFieldsModule,
    contentImage: contentImageModule,
    arrowBottomText: ArrowBottomTextModule,
    bullets: bulletsModule,
    corners: CornersModule,
    freeText: FreeTextModule,
    imageTextBox: imageTextBoxModule,
    logo: LogoModule,
    svgElements: svgElementsModule,
    textureOverlay: textureOverlayModule,
    twitterPost: twitterPostModule,
  };
}

// ============================================================================
// REGISTRY FUNCTIONS
// ============================================================================

/**
 * Get module definition by ID
 */
export function getModule(moduleId: string): ModuleDefinition | null {
  const modules = getModulesRegistry();
  return modules[moduleId] || null;
}

/**
 * Get all module IDs
 */
export function getAllModuleIds(): string[] {
  const modules = getModulesRegistry();
  return Object.keys(modules);
}

/**
 * Get all modules
 */
export function getAllModules(): ModuleDefinition[] {
  const modules = getModulesRegistry();
  return Object.values(modules);
}

/**
 * Get modules by category
 */
export function getModulesByCategory(category: 'layout' | 'content' | 'overlay'): ModuleDefinition[] {
  const modules = getModulesRegistry();
  const moduleIds = MODULE_CATEGORIES[category] || [];

  const result = moduleIds.map((id) => {
    const module = modules[id];
    return module;
  }).filter(Boolean);

  return result;
}

/**
 * Check if module exists
 */
export function moduleExists(moduleId: string): boolean {
  const modules = getModulesRegistry();
  return moduleId in modules;
}

/**
 * Check module dependencies
 * Returns array of missing required modules
 */
export function checkDependencies(
  moduleId: string,
  enabledModules: string[]
): { satisfied: boolean; missing: string[] } {
  const module = getModule(moduleId);

  if (!module || !module.dependencies || module.dependencies.length === 0) {
    return { satisfied: true, missing: [] };
  }

  const missing = module.dependencies.filter((depId) => !enabledModules.includes(depId));

  return {
    satisfied: missing.length === 0,
    missing,
  };
}

/**
 * Check module conflicts
 * Returns array of conflicting enabled modules
 */
export function checkConflicts(
  moduleId: string,
  enabledModules: string[]
): { hasConflicts: boolean; conflicts: string[] } {
  const module = getModule(moduleId);

  if (!module || !module.conflicts || module.conflicts.length === 0) {
    return { hasConflicts: false, conflicts: [] };
  }

  const conflicts = module.conflicts.filter((conflictId) => enabledModules.includes(conflictId));

  return {
    hasConflicts: conflicts.length > 0,
    conflicts,
  };
}

/**
 * Validate module combination
 * Returns validation result with errors
 */
export function validateModuleCombination(enabledModules: string[]): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Check if all enabled modules exist
  for (const moduleId of enabledModules) {
    if (!moduleExists(moduleId)) {
      errors.push(`Module '${moduleId}' does not exist`);
    }
  }

  // Check dependencies for each enabled module
  for (const moduleId of enabledModules) {
    const { satisfied, missing } = checkDependencies(moduleId, enabledModules);
    if (!satisfied) {
      errors.push(
        `Module '${moduleId}' requires: ${missing.map((m) => `'${m}'`).join(', ')}`
      );
    }
  }

  // Check conflicts for each enabled module
  for (const moduleId of enabledModules) {
    const { hasConflicts, conflicts } = checkConflicts(moduleId, enabledModules);
    if (hasConflicts) {
      errors.push(
        `Module '${moduleId}' conflicts with: ${conflicts.map((c) => `'${c}'`).join(', ')}`
      );
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Get recommended modules
 * Returns modules that work well together
 */
export function getRecommendedModules(): string[] {
  // Basic template: viewport + card + text + image
  return ['viewport', 'card', 'textFields', 'contentImage'];
}

/**
 * Get module display name
 */
export function getModuleDisplayName(moduleId: string): string {
  const module = getModule(moduleId);
  return module ? module.name : moduleId;
}

/**
 * Get module description
 */
export function getModuleDescription(moduleId: string): string {
  const module = getModule(moduleId);
  return module ? module.description : '';
}

/**
 * Get module icon
 */
export function getModuleIcon(moduleId: string): string {
  const module = getModule(moduleId);
  return module ? module.icon : 'Box';
}

/**
 * Get module category
 */
export function getModuleCategory(moduleId: string): 'layout' | 'content' | 'overlay' | null {
  const module = getModule(moduleId);
  return module ? module.category : null;
}

/**
 * Get active modules (alias for getAllModules filtered by IDs)
 */
export function getActiveModules(enabledModuleIds: string[]): ModuleDefinition[] {
  return enabledModuleIds
    .map((id) => getModule(id))
    .filter((m): m is ModuleDefinition => m !== null);
}
