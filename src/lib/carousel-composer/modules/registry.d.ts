/**
 * Module Registry
 *
 * Central registry for all carousel composer modules.
 * Provides module lookup, dependency checking, and conflict detection.
 */
import type { ModuleDefinition } from '../types';
/**
 * Module categories for UI organization
 */
export declare const MODULE_CATEGORIES: {
    readonly layout: readonly ["viewport", "card", "textureOverlay"];
    readonly content: readonly ["textFields", "contentImage", "imageTextBox", "bullets", "twitterPost"];
    readonly overlay: readonly ["corners", "freeText", "arrowBottomText", "svgElements", "logo", "duo", "freeImage"];
};
/**
 * Get module definition by ID
 */
export declare function getModule(moduleId: string): ModuleDefinition | null;
/**
 * Get all module IDs
 */
export declare function getAllModuleIds(): string[];
/**
 * Get all modules
 */
export declare function getAllModules(): ModuleDefinition[];
/**
 * Get modules by category
 */
export declare function getModulesByCategory(category: 'layout' | 'content' | 'overlay'): ModuleDefinition[];
/**
 * Check if module exists
 */
export declare function moduleExists(moduleId: string): boolean;
/**
 * Check module dependencies
 * Returns array of missing required modules
 */
export declare function checkDependencies(moduleId: string, enabledModules: string[]): {
    satisfied: boolean;
    missing: string[];
};
/**
 * Check module conflicts
 * Returns array of conflicting enabled modules
 */
export declare function checkConflicts(moduleId: string, enabledModules: string[]): {
    hasConflicts: boolean;
    conflicts: string[];
};
/**
 * Validate module combination
 * Returns validation result with errors
 */
export declare function validateModuleCombination(enabledModules: string[]): {
    valid: boolean;
    errors: string[];
};
/**
 * Get recommended modules
 * Returns modules that work well together
 */
export declare function getRecommendedModules(): string[];
/**
 * Get module display name
 */
export declare function getModuleDisplayName(moduleId: string): string;
/**
 * Get module description
 */
export declare function getModuleDescription(moduleId: string): string;
/**
 * Get module icon
 */
export declare function getModuleIcon(moduleId: string): string;
/**
 * Get module category
 */
export declare function getModuleCategory(moduleId: string): 'layout' | 'content' | 'overlay' | null;
/**
 * Get active modules (alias for getAllModules filtered by IDs)
 */
export declare function getActiveModules(enabledModuleIds: string[]): ModuleDefinition[];
//# sourceMappingURL=registry.d.ts.map