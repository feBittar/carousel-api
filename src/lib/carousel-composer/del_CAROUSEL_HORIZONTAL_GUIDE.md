# Guia: Modo Horizontal do Carousel Composer

Este guia explica como usar o novo modo horizontal de carrossel no Content Chisel, especialmente quando combinado com `freeImage`.

## Visão Geral

O Carousel Composer agora suporta dois modos de layout:

1. **Vertical** (padrão) - Slides individuais em viewport 1080×1350
2. **Horizontal** (novo) - Múltiplos slides lado a lado em viewport N×1080×1440

O modo horizontal é ativado automaticamente quando:
- `freeImage.enabled` está ativo
- `slideCount` é maior que 1

## Exemplo de Uso Básico

```typescript
import { composeTemplate } from '@/lib/carousel-composer';

const enabledModules = ['viewport', 'card', 'textFields'];
const moduleData = {
  viewport: {
    enabled: true,
    width: 1080,
    height: 1440,
    backgroundColor: '#ffffff'
  },
  card: {
    enabled: true,
    width: 90,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    padding: { top: 40, right: 40, bottom: 40, left: 40 }
  },
  textFields: {
    enabled: true,
    count: 2,
    fields: [
      {
        content: 'Slide 1',
        style: { fontSize: '48px', fontWeight: 'bold', color: '#000000' }
      },
      {
        content: 'Conteúdo do primeiro slide',
        style: { fontSize: '24px', color: '#666666' }
      }
    ]
  }
};

// Composição em modo horizontal com freeImage
const result = composeTemplate(enabledModules, moduleData, {
  baseUrl: 'http://localhost:8080',
  carouselMode: 'horizontal', // Ativa modo horizontal
  slideCount: 3, // 3 slides lado a lado
  freeImage: {
    enabled: true,
    url: '/assets/logo.png',
    offsetX: 0,
    offsetY: -100,
    scale: 1.5,
    rotation: -5,
    outlineEffect: {
      enabled: true,
      color: '#FFFFFF',
      size: 4
    }
  }
});

console.log('Viewport:', result.viewportWidth, 'x', result.viewportHeight);
// Output: Viewport: 3240 x 1440 (3 slides × 1080)

console.log('HTML:', result.finalHtml);
```

## Auto-detecção do Modo Horizontal

O compositor detecta automaticamente quando usar modo horizontal:

```typescript
// Modo horizontal ativado automaticamente
const result = composeTemplate(enabledModules, moduleData, {
  baseUrl: 'http://localhost:8080',
  slideCount: 4,
  freeImage: {
    enabled: true,
    url: '/logo.png',
    offsetX: 0,
    offsetY: 0,
    scale: 1.0,
    rotation: 0,
    outlineEffect: { enabled: false, color: '#FFFFFF', size: 2 }
  }
});
// Resultado: viewport 4320×1440 (4 slides)
```

## Estrutura HTML Gerada

### Modo Horizontal

```html
<body>
  <div class="carousel-wrapper">
    <div class="carousel-slide carousel-slide-1">
      <!-- Conteúdo do Slide 1 -->
    </div>
    <div class="carousel-slide carousel-slide-2">
      <!-- Conteúdo do Slide 2 -->
    </div>
    <div class="carousel-slide carousel-slide-3">
      <!-- Conteúdo do Slide 3 -->
    </div>
  </div>

  <!-- Free image overlay (posicionada no centro de toda a viewport) -->
  <img class="free-image" src="/logo.png" alt="Free Image">
</body>
```

### CSS Aplicado

```css
body {
  width: 3240px; /* 3 slides × 1080 */
  height: 1440px;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.carousel-wrapper {
  display: flex;
  flex-direction: row;
  width: 3240px;
  height: 1440px;
}

.carousel-slide {
  width: 1080px;
  height: 1440px;
  position: relative;
  flex-shrink: 0;
}

.free-image {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) translate(0px, -100px) scale(1.5) rotate(-5deg);
  z-index: 100;
  pointer-events: none;
  filter: drop-shadow(4px 0 0 #FFFFFF) drop-shadow(-4px 0 0 #FFFFFF)
          drop-shadow(0 4px 0 #FFFFFF) drop-shadow(0 -4px 0 #FFFFFF)
          drop-shadow(4px 4px 0 #FFFFFF) drop-shadow(-4px 4px 0 #FFFFFF)
          drop-shadow(4px -4px 0 #FFFFFF) drop-shadow(-4px -4px 0 #FFFFFF);
}
```

## Viewport Dimensions

| Modo       | Largura          | Altura | Descrição                           |
|------------|------------------|--------|-------------------------------------|
| Vertical   | Module width     | Module height | Dimensões definidas pelo módulo viewport |
| Horizontal | slideCount × 1080 | 1440   | Calculado automaticamente           |

### Exemplos de Dimensões

```typescript
// 1 slide = 1080×1440 (vertical, mesmo com freeImage)
slideCount: 1, freeImage.enabled: true  → 1080×1440

// 2 slides = 2160×1440 (horizontal)
slideCount: 2, freeImage.enabled: true  → 2160×1440

// 3 slides = 3240×1440 (horizontal)
slideCount: 3, freeImage.enabled: true  → 3240×1440

// 5 slides = 5400×1440 (horizontal)
slideCount: 5, freeImage.enabled: true  → 5400×1440
```

## Configuração do freeImage

### Propriedades

```typescript
interface FreeImageConfig {
  enabled: boolean;        // Ativa/desativa a imagem livre
  url: string;            // URL da imagem
  offsetX: number;        // Deslocamento horizontal (px)
  offsetY: number;        // Deslocamento vertical (px)
  scale: number;          // Escala (1.0 = 100%)
  rotation: number;       // Rotação em graus
  outlineEffect: {
    enabled: boolean;     // Ativa efeito de contorno
    color: string;        // Cor do contorno (hex)
    size: number;         // Tamanho do contorno (px)
  };
}
```

### Exemplos de Configuração

#### Logo centralizado com contorno branco
```typescript
freeImage: {
  enabled: true,
  url: '/assets/brand-logo.png',
  offsetX: 0,
  offsetY: 0,
  scale: 1.2,
  rotation: 0,
  outlineEffect: {
    enabled: true,
    color: '#FFFFFF',
    size: 3
  }
}
```

#### Selo no canto superior direito
```typescript
freeImage: {
  enabled: true,
  url: '/assets/seal.png',
  offsetX: 400,
  offsetY: -500,
  scale: 0.8,
  rotation: 15,
  outlineEffect: {
    enabled: false,
    color: '#000000',
    size: 2
  }
}
```

#### Marca d'água rotacionada
```typescript
freeImage: {
  enabled: true,
  url: '/assets/watermark.png',
  offsetX: 0,
  offsetY: 0,
  scale: 2.0,
  rotation: -45,
  outlineEffect: {
    enabled: true,
    color: 'rgba(255, 255, 255, 0.8)',
    size: 1
  }
}
```

## Comportamento de Fallback

### Sem freeImage
```typescript
// Modo vertical padrão, mesmo com slideCount > 1
const result = composeTemplate(enabledModules, moduleData, {
  slideCount: 3,
  freeImage: { enabled: false }
});
// Resultado: 1080×1350 (vertical)
```

### Com slideCount = 1
```typescript
// Modo vertical, mesmo com freeImage ativo
const result = composeTemplate(enabledModules, moduleData, {
  slideCount: 1,
  freeImage: { enabled: true, url: '/logo.png', ... }
});
// Resultado: 1080×1350 (vertical)
```

## Validação de Configuração

Use `validateFreeImageConfig()` para normalizar e validar:

```typescript
import { validateFreeImageConfig } from '@/lib/carousel-composer';

const userInput = {
  enabled: true,
  url: '/logo.png',
  offsetX: 50
  // Propriedades faltando serão preenchidas com defaults
};

const validated = validateFreeImageConfig(userInput);
console.log(validated);
// {
//   enabled: true,
//   url: '/logo.png',
//   offsetX: 50,
//   offsetY: 0,      // Default
//   scale: 1,         // Default
//   rotation: 0,      // Default
//   outlineEffect: {
//     enabled: false, // Default
//     color: '#FFFFFF',
//     size: 2
//   }
// }
```

## Captura de Slides Individuais

Para capturar slides individuais de um carrossel horizontal com Puppeteer:

```typescript
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();

// Definir viewport para o tamanho total do carrossel
await page.setViewport({
  width: 3240,  // 3 slides × 1080
  height: 1440
});

// Carregar HTML gerado
await page.setContent(result.finalHtml);

// Capturar cada slide com clipping
for (let i = 0; i < 3; i++) {
  await page.screenshot({
    path: `slide-${i + 1}.png`,
    clip: {
      x: i * 1080,
      y: 0,
      width: 1080,
      height: 1440
    }
  });
}

await browser.close();
```

## Integração com Módulos Existentes

O modo horizontal funciona perfeitamente com todos os módulos existentes:

### Viewport
```typescript
viewport: {
  enabled: true,
  width: 1080,    // Ignorado em modo horizontal
  height: 1440,   // Usado como altura
  backgroundColor: '#f0f0f0'
}
```

### Card
```typescript
card: {
  enabled: true,
  width: 85,      // Percentual do slide (1080px)
  height: 90,     // Percentual da altura (1440px)
  borderRadius: 20,
  backgroundColor: '#ffffff'
}
```

### Content Modules
Todos os módulos de conteúdo (textFields, contentImage, bullets, etc.) funcionam normalmente dentro de cada slide.

## Troubleshooting

### Problema: Imagem não aparece centralizada
**Solução:** O freeImage é posicionado no centro da viewport TOTAL (N×1080), não de cada slide individual.

### Problema: CSS sobrescrito
**Solução:** O CSS do carousel é injetado ANTES do CSS dos módulos, permitindo que módulos façam overrides se necessário.

### Problema: Viewport errado
**Solução:** Verifique se `slideCount` e `freeImage.enabled` estão corretos. Use console.log para verificar `carouselMode` detectado.

## Changelog

- **2024-12-14**: Implementação inicial do modo horizontal
  - Detecção automática de modo
  - Suporte para freeImage com outline effect
  - Viewport calculado dinamicamente
  - Compatibilidade total com módulos existentes
