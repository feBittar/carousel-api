/**
 * Carousel Composer - Main Export
 *
 * Central export point for the carousel composer library.
 * Provides HTML composition, module management, and type definitions.
 */

// Composition
export { composeTemplate } from './compositer';

// Carousel Helpers (for horizontal carousel mode)
export {
  wrapInCarousel,
  generateCarouselCSS,
  validateFreeImageConfig,
  type FreeImageConfig,
} from './carousel-helpers';

// Module Registry
export {
  getModule,
  getAllModuleIds,
  getAllModules,
  getModulesByCategory,
  moduleExists,
  checkDependencies,
  checkConflicts,
  validateModuleCombination,
  getRecommendedModules,
  getModuleDisplayName,
  getModuleDescription,
  getModuleIcon,
  getModuleCategory,
  MODULE_CATEGORIES,
} from './modules/registry';

// Individual Modules
export { viewportModule } from './modules/viewport/index';
export { cardModule } from './modules/card/index';
export { textFieldsModule } from './modules/textFields';
export { contentImageModule } from './modules/content-image/index';

// Types
export type {
  // Configuration
  CarouselModularConfig,
  CarouselSlide,

  // Modules
  ViewportModule,
  CardModule,
  TextFieldsModule,
  TextField,
  ContentImageModule,

  // Store
  Slide,
  ModuleData,
  CarouselModularState,

  // Module Definition
  ModuleDefinition,
  CompositionOptions,
  CompositionResult,

  // API
  GenerateCarouselRequest,
  GenerateCarouselResponse,
  GeneratedImage,

  // Database
  CarouselModularConfigDB,
  CreateCarouselParams,
  UpdateCarouselParams,

  // UI Component Props
  ModuleSidebarProps,
  ModularFormBuilderProps,
  LivePreviewProps,
  SlideTabBarProps,

  // Validation
  ValidationResult,
  ValidationError,

  // Utility
  DeepPartial,
  ModuleId,
  FontFamily,
  ExportFormat,
} from './types';
