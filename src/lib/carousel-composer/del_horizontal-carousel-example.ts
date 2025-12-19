/**
 * Exemplo de uso do modo horizontal do Carousel Composer
 *
 * Este arquivo demonstra como usar o novo modo horizontal com freeImage.
 * Para testar, importe em um componente React ou use em um script Node.js
 */

import { composeTemplate } from './index';
import type { CompositionOptions } from './types';

/**
 * Exemplo 1: Carrossel horizontal básico com 3 slides
 */
export function exampleHorizontalCarousel() {
  const enabledModules = ['viewport', 'card', 'textFields'];

  const moduleData = {
    viewport: {
      enabled: true,
      width: 1080,
      height: 1440,
      backgroundColor: '#1a1a1a'
    },
    card: {
      enabled: true,
      width: 90,
      height: 85,
      borderRadius: 24,
      backgroundColor: '#ffffff',
      padding: { top: 48, right: 48, bottom: 48, left: 48 },
      shadow: {
        enabled: true,
        x: 0,
        y: 4,
        blur: 12,
        spread: 0,
        color: 'rgba(0, 0, 0, 0.1)'
      }
    },
    textFields: {
      enabled: true,
      count: 2,
      gap: 24,
      fields: [
        {
          content: 'Título Principal',
          style: {
            fontSize: '56px',
            fontWeight: '900',
            color: '#000000',
            fontFamily: 'Inter',
            textAlign: 'center'
          }
        },
        {
          content: 'Subtítulo descritivo do conteúdo do carousel',
          style: {
            fontSize: '28px',
            fontWeight: '400',
            color: '#666666',
            fontFamily: 'Inter',
            textAlign: 'center'
          }
        }
      ]
    }
  };

  const options: CompositionOptions = {
    baseUrl: 'http://localhost:8080',
    slideCount: 3,
    carouselMode: 'horizontal',
    freeImage: {
      enabled: true,
      url: '/assets/brand-logo.png',
      offsetX: 0,
      offsetY: -100,
      scale: 1.5,
      rotation: -3,
      outlineEffect: {
        enabled: true,
        color: '#FFFFFF',
        size: 4
      }
    }
  };

  const result = composeTemplate(enabledModules, moduleData, options);

  console.log('=== Exemplo 1: Carrossel Horizontal ===');
  console.log('Viewport:', `${result.viewportWidth}×${result.viewportHeight}`);
  console.log('Expected:', '3240×1440');
  console.log('HTML Length:', result.finalHtml.length, 'chars');
  console.log('CSS includes carousel layout:', result.modulesCSS.includes('.carousel-wrapper'));

  return result;
}

/**
 * Exemplo 2: Auto-detecção de modo horizontal
 * (sem especificar carouselMode explicitamente)
 */
export function exampleAutoDetection() {
  const enabledModules = ['viewport', 'textFields'];

  const moduleData = {
    viewport: {
      enabled: true,
      backgroundColor: '#f8f9fa'
    },
    textFields: {
      enabled: true,
      count: 1,
      fields: [
        {
          content: 'Slide com detecção automática',
          style: {
            fontSize: '40px',
            fontWeight: 'bold',
            color: '#000000'
          }
        }
      ]
    }
  };

  // Modo horizontal será detectado automaticamente
  // porque freeImage.enabled=true e slideCount=4
  const options: CompositionOptions = {
    baseUrl: 'http://localhost:8080',
    slideCount: 4,
    freeImage: {
      enabled: true,
      url: '/watermark.png',
      offsetX: 0,
      offsetY: 0,
      scale: 2.0,
      rotation: -45,
      outlineEffect: {
        enabled: true,
        color: 'rgba(255, 255, 255, 0.6)',
        size: 2
      }
    }
  };

  const result = composeTemplate(enabledModules, moduleData, options);

  console.log('=== Exemplo 2: Auto-detecção ===');
  console.log('Viewport:', `${result.viewportWidth}×${result.viewportHeight}`);
  console.log('Expected:', '4320×1440 (4 slides × 1080)');

  return result;
}

/**
 * Exemplo 3: Modo vertical com freeImage (slideCount = 1)
 */
export function exampleVerticalWithFreeImage() {
  const enabledModules = ['viewport', 'card', 'textFields'];

  const moduleData = {
    viewport: {
      enabled: true,
      width: 1080,
      height: 1350, // Instagram portrait
      backgroundColor: '#ffffff'
    },
    card: {
      enabled: true,
      width: 88,
      height: 80,
      borderRadius: 16,
      backgroundColor: '#f0f0f0',
      padding: { top: 32, right: 32, bottom: 32, left: 32 }
    },
    textFields: {
      enabled: true,
      count: 1,
      fields: [
        {
          content: 'Post único com logo',
          style: {
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#000000'
          }
        }
      ]
    }
  };

  const options: CompositionOptions = {
    baseUrl: 'http://localhost:8080',
    slideCount: 1, // Apenas 1 slide = modo vertical
    freeImage: {
      enabled: true,
      url: '/logo-corner.png',
      offsetX: 350,
      offsetY: -550,
      scale: 0.8,
      rotation: 0,
      outlineEffect: {
        enabled: false,
        color: '#FFFFFF',
        size: 2
      }
    }
  };

  const result = composeTemplate(enabledModules, moduleData, options);

  console.log('=== Exemplo 3: Vertical com freeImage ===');
  console.log('Viewport:', `${result.viewportWidth}×${result.viewportHeight}`);
  console.log('Expected:', '1080×1350 (vertical mesmo com freeImage)');

  return result;
}

/**
 * Exemplo 4: Carousel com múltiplos módulos de conteúdo
 */
export function exampleComplexCarousel() {
  const enabledModules = [
    'viewport',
    'card',
    'textFields',
    'contentImage',
    'bullets',
    'logo'
  ];

  const moduleData = {
    viewport: {
      enabled: true,
      backgroundColor: '#e9ecef'
    },
    card: {
      enabled: true,
      width: 92,
      height: 88,
      borderRadius: 20,
      backgroundColor: '#ffffff',
      padding: { top: 40, right: 40, bottom: 40, left: 40 },
      layoutDirection: 'column',
      contentGap: 20
    },
    textFields: {
      enabled: true,
      count: 1,
      fields: [
        {
          content: 'Título do Carousel',
          style: {
            fontSize: '44px',
            fontWeight: '900',
            color: '#212529',
            textAlign: 'center'
          }
        }
      ]
    },
    contentImage: {
      enabled: true,
      image: {
        url: '/content-image.jpg',
        width: 600,
        height: 400,
        position: { x: 50, y: 35 },
        objectFit: 'cover',
        borderRadius: 12
      }
    },
    bullets: {
      enabled: true,
      items: [
        { id: '1', text: 'Primeiro benefício' },
        { id: '2', text: 'Segundo benefício' },
        { id: '3', text: 'Terceiro benefício' }
      ],
      position: { x: 50, y: 70 },
      fontSize: 20,
      fontFamily: 'Inter',
      color: '#495057',
      fontWeight: 400,
      bulletStyle: 'disc',
      bulletColor: '#0d6efd',
      lineHeight: 1.6,
      spacing: 12
    },
    logo: {
      enabled: true,
      image: {
        url: '/company-logo.png',
        width: 120,
        height: 40
      },
      position: { x: 50, y: 95 },
      opacity: 0.9
    }
  };

  const options: CompositionOptions = {
    baseUrl: 'http://localhost:8080',
    slideCount: 5,
    carouselMode: 'horizontal',
    freeImage: {
      enabled: true,
      url: '/overlay-badge.png',
      offsetX: 0,
      offsetY: -600,
      scale: 1.2,
      rotation: 5,
      outlineEffect: {
        enabled: true,
        color: '#FFFFFF',
        size: 3
      }
    }
  };

  const result = composeTemplate(enabledModules, moduleData, options);

  console.log('=== Exemplo 4: Carousel Complexo ===');
  console.log('Viewport:', `${result.viewportWidth}×${result.viewportHeight}`);
  console.log('Expected:', '5400×1440 (5 slides)');
  console.log('Enabled Modules:', enabledModules.length);

  return result;
}

/**
 * Exemplo 5: Comparação lado a lado (vertical vs horizontal)
 */
export function exampleComparison() {
  const enabledModules = ['viewport', 'textFields'];

  const moduleData = {
    viewport: {
      enabled: true,
      backgroundColor: '#ffffff'
    },
    textFields: {
      enabled: true,
      count: 1,
      fields: [
        {
          content: 'Teste de Modo',
          style: {
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#000000'
          }
        }
      ]
    }
  };

  // Vertical (sem freeImage)
  const verticalResult = composeTemplate(enabledModules, moduleData, {
    baseUrl: 'http://localhost:8080',
    slideCount: 3
  });

  // Horizontal (com freeImage)
  const horizontalResult = composeTemplate(enabledModules, moduleData, {
    baseUrl: 'http://localhost:8080',
    slideCount: 3,
    freeImage: {
      enabled: true,
      url: '/logo.png',
      offsetX: 0,
      offsetY: 0,
      scale: 1.0,
      rotation: 0,
      outlineEffect: {
        enabled: false,
        color: '#FFFFFF',
        size: 2
      }
    }
  });

  console.log('=== Exemplo 5: Comparação ===');
  console.log('VERTICAL:');
  console.log('  Viewport:', `${verticalResult.viewportWidth}×${verticalResult.viewportHeight}`);
  console.log('  Has carousel wrapper:', verticalResult.modulesCSS.includes('.carousel-wrapper'));
  console.log('');
  console.log('HORIZONTAL:');
  console.log('  Viewport:', `${horizontalResult.viewportWidth}×${horizontalResult.viewportHeight}`);
  console.log('  Has carousel wrapper:', horizontalResult.modulesCSS.includes('.carousel-wrapper'));
  console.log('  Has free-image:', horizontalResult.modulesCSS.includes('.free-image'));

  return { verticalResult, horizontalResult };
}

/**
 * Função auxiliar para salvar HTML em arquivo (Node.js)
 */
export function saveHTMLToFile(html: string, filename: string) {
  if (typeof window === 'undefined') {
    // Node.js environment
    const fs = require('fs');
    const path = require('path');

    const outputPath = path.join(process.cwd(), 'output', filename);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, html, 'utf-8');

    console.log(`HTML saved to: ${outputPath}`);
  } else {
    console.warn('saveHTMLToFile only works in Node.js environment');
  }
}

/**
 * Executar todos os exemplos
 */
export function runAllExamples() {
  console.log('\n========================================');
  console.log('  CAROUSEL COMPOSER - EXEMPLOS');
  console.log('========================================\n');

  exampleHorizontalCarousel();
  console.log('');

  exampleAutoDetection();
  console.log('');

  exampleVerticalWithFreeImage();
  console.log('');

  exampleComplexCarousel();
  console.log('');

  exampleComparison();

  console.log('\n========================================');
  console.log('  TODOS OS EXEMPLOS EXECUTADOS');
  console.log('========================================\n');
}

// Descomente para executar quando importar este módulo
// runAllExamples();
