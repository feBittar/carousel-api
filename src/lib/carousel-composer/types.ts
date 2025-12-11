// ============================================================================
// MODULE SYSTEM TYPES (Server-side simplified version)
// ============================================================================

/**
 * Dados do módulo após processamento (para geração de CSS/HTML)
 */
export type ModuleData = Record<string, unknown>;

/**
 * Contexto passado para funções de renderização
 */
export interface RenderContext {
  /** Lista de IDs de módulos ativos */
  enabledModules: string[];

  /** Dados de todos os módulos ativos */
  allModulesData: Record<string, ModuleData>;

  /** Dimensões do viewport */
  viewportWidth: number;
  viewportHeight: number;

  /** URL base para assets */
  baseUrl: string;
}

/**
 * Template composto após processamento de todos os módulos
 */
export interface ComposedTemplate {
  /** Largura do viewport */
  viewportWidth: number;

  /** Altura do viewport */
  viewportHeight: number;

  /** CSS combinado de todos os módulos */
  modulesCSS: string;

  /** HTML combinado de todos os módulos */
  modulesHTML: string;

  /** CSS variables combinadas */
  styleVariables: string;

  /** HTML final completo */
  finalHtml: string;
}

/**
 * Opções para composição de template
 */
export interface ComposeOptions {
  baseUrl?: string;
  slideCount?: number;
}

/**
 * Configuração do carousel completo
 */
export interface CarouselConfig {
  slides: SlideConfig[];
  mode: 'carousel';
}

/**
 * Configuração de um slide individual
 */
export interface SlideConfig {
  id: string;
  order: number;
  modules: Record<string, ModuleData>;
}

/**
 * Shared schema types (para uso em módulos)
 */

export interface TextStyle {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  backgroundColor?: string;
  textAlign?: 'left' | 'center' | 'right';
  lineHeight?: string;
  letterSpacing?: string;
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  textShadow?: string;
  textDecoration?: string;
  padding?: string;
}

export interface Position {
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
  width?: string | number;
  height?: string | number;
}

export interface StyledChunk {
  text: string;
  color?: string;
  fontFamily?: string;
  fontSize?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  letterSpacing?: string;
  backgroundColor?: string;
  backgroundBlur?: string;
  blurColor?: string;
  blurOpacity?: number;
  blurFadeDirection?: 'horizontal' | 'vertical' | 'both';
  blurFadeAmount?: number;
  padding?: string;
}

export interface GradientOverlay {
  enabled?: boolean;
  color?: string;
  startOpacity?: number;
  midOpacity?: number;
  endOpacity?: number;
  height?: number;
  direction?: 'to top' | 'to bottom' | 'to left' | 'to right';
  blendMode?: string;
}
