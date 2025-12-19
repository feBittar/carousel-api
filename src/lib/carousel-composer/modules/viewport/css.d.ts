import { ModuleData } from '../../types';
/**
 * Gera CSS para o módulo Viewport
 * Controla o background do body, blur overlay (::before), e gradient overlay (::after)
 */
export declare function getViewportCss(data: ModuleData): string;
/**
 * Gera CSS variables para o módulo Viewport
 * Outros módulos podem usar essas variáveis
 */
export declare function getViewportStyleVariables(data: ModuleData): Record<string, string>;
//# sourceMappingURL=css.d.ts.map