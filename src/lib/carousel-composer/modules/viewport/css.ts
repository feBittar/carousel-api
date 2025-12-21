import { ModuleData, CompositionOptions } from '../../types';
import { ViewportData } from './schema';

/**
 * Gera CSS para o módulo Viewport
 * Controla o background do body, blur overlay (::before), e gradient overlay (::after)
 */
export function getViewportCss(data: ModuleData, options?: CompositionOptions): string {
  const viewport = data as unknown as ViewportData;

  // DEBUG: Log viewport data
  console.log('[Viewport CSS] Generating CSS for viewport:');
  console.log('[Viewport CSS]   backgroundType:', viewport.backgroundType);
  console.log('[Viewport CSS]   backgroundColor:', viewport.backgroundColor);
  console.log('[Viewport CSS]   backgroundImage:', viewport.backgroundImage);
  console.log('[Viewport CSS]   gradientEnabled:', viewport.gradientOverlay?.enabled);
  console.log('[Viewport CSS]   gradientColor:', viewport.gradientOverlay?.color);

  // CSS para o body (background principal)
  const bodyStyles: string[] = [];

  // Background: imagem tem prioridade sobre cor
  // FIX: Usar imagem se existir, mesmo que backgroundType esteja como 'color'
  if (viewport.backgroundImage && viewport.backgroundImage.trim() !== '') {
    bodyStyles.push(`background-image: url(${viewport.backgroundImage});`);
    bodyStyles.push('background-size: cover;');
    bodyStyles.push('background-position: center;');
    bodyStyles.push('background-repeat: no-repeat;');
    // Adiciona cor de fundo como fallback enquanto a imagem carrega
    if (viewport.backgroundColor) {
      bodyStyles.push(`background-color: ${viewport.backgroundColor};`);
    }
  } else if (viewport.backgroundColor) {
    bodyStyles.push(`background-color: ${viewport.backgroundColor};`);
  }

  const bodyCss = bodyStyles.length > 0
    ? `body {\n  ${bodyStyles.join('\n  ')}\n}`
    : '';

  // CSS para ::before (blur overlay)
  let beforeCss = '';
  if (viewport.blurEnabled && viewport.blurAmount > 0) {
    beforeCss = `
body::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(${viewport.blurAmount}px);
  -webkit-backdrop-filter: blur(${viewport.blurAmount}px);
  pointer-events: none;
  z-index: 0;
}`;
  }

  // CSS para ::after (gradient overlay)
  let afterCss = '';
  const gradient = viewport.gradientOverlay;

  if (gradient?.enabled && gradient.color) {
    const startOpacity = gradient.startOpacity ?? 0.7;
    const midOpacity = gradient.midOpacity ?? 0.3;
    const endOpacity = gradient.endOpacity ?? 0;
    const height = gradient.height ?? 50;
    const direction = gradient.direction || 'to top';
    const blendMode = gradient.blendMode || 'normal';

    // Converter direção para valores de posição do gradient
    const gradientStops = `
      rgba(${hexToRgb(gradient.color)}, ${startOpacity}) 0%,
      rgba(${hexToRgb(gradient.color)}, ${midOpacity}) ${height}%,
      rgba(${hexToRgb(gradient.color)}, ${endOpacity}) 100%
    `.trim();

    // FIX: Em modo horizontal (free-image), aplicar gradiente em cada slide
    // Em modo vertical, aplicar no body
    const isHorizontalMode = options?.carouselMode === 'horizontal';
    const selector = isHorizontalMode ? '.carousel-slide::after' : 'body::after';

    afterCss = `
${selector} {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(${direction}, ${gradientStops});
  mix-blend-mode: ${blendMode};
  pointer-events: none;
  z-index: 0;
}`;
  }

  // CSS para content-wrapper (usado quando card está inativo)
  // Deve ter a MESMA estrutura do card-container, mas sem estilos visuais
  const cw = viewport.contentWrapper || {
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
    gap: 12,
    layoutDirection: 'column',
    contentAlign: 'stretch',
    justifyContent: 'flex-start',
  };

  const padding = cw.padding || { top: 0, right: 0, bottom: 0, left: 0 };

  const contentWrapperCss = `
/* ===== CONTENT WRAPPER (funciona como card invisível) ===== */
.content-wrapper {
  /* Estrutura igual ao card-container */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: ${cw.layoutDirection || 'column'};
  gap: ${cw.gap ?? 12}px;
  padding: ${padding.top ?? 0}px ${padding.right ?? 0}px ${padding.bottom ?? 0}px ${padding.left ?? 0}px;
  align-items: ${cw.layoutDirection === 'row' ? (cw.contentAlign || 'stretch') : 'stretch'};
  justify-content: ${cw.justifyContent || 'flex-start'};
  box-sizing: border-box;
  z-index: 1;

  /* Sem estilos visuais (invisível) */
  background: none;
  border: none;
  box-shadow: none;
  pointer-events: none; /* Permite clicks atravessarem */
}

/* Filhos do content-wrapper devem receber eventos novamente */
.content-wrapper > * {
  pointer-events: auto;
}`;

  // Combinar todos os CSS
  const finalCss = [bodyCss, beforeCss, afterCss, contentWrapperCss].filter(Boolean).join('\n\n');

  // DEBUG: Log generated CSS
  console.log('[Viewport CSS] Generated CSS length:', finalCss.length);
  console.log('[Viewport CSS] Has body CSS:', bodyCss.length > 0);
  console.log('[Viewport CSS] Has gradient CSS:', afterCss.length > 0);

  return finalCss;
}

/**
 * Gera CSS variables para o módulo Viewport
 * Outros módulos podem usar essas variáveis
 */
export function getViewportStyleVariables(data: ModuleData): Record<string, string> {
  const viewport = data as unknown as ViewportData;

  return {
    '--viewport-bg-color': viewport.backgroundColor,
    '--viewport-blur': viewport.blurEnabled ? `${viewport.blurAmount}px` : '0px',
  };
}

/**
 * Helper: Converte hex para RGB (sem alpha)
 */
function hexToRgb(hex: string): string {
  // Remove # se presente
  const cleanHex = hex.replace('#', '');

  // Parse hex to RGB
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  return `${r}, ${g}, ${b}`;
}
