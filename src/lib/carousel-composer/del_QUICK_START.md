# Quick Start - Modo Horizontal do Carousel

## Em 3 Passos

### 1. Import
```typescript
import { composeTemplate } from '@/lib/carousel-composer';
```

### 2. Configure
```typescript
const options = {
  baseUrl: 'http://localhost:8080',
  slideCount: 3,              // Número de slides
  freeImage: {
    enabled: true,            // Ativa modo horizontal
    url: '/brand-logo.png',   // URL da imagem
    offsetX: 0,               // Deslocamento horizontal (px)
    offsetY: -100,            // Deslocamento vertical (px)
    scale: 1.5,               // Escala (1.0 = 100%)
    rotation: -5,             // Rotação (graus)
    outlineEffect: {
      enabled: true,          // Contorno branco
      color: '#FFFFFF',
      size: 4                 // Espessura (px)
    }
  }
};
```

### 3. Gere
```typescript
const result = composeTemplate(
  ['viewport', 'card', 'textFields'],
  moduleData,
  options
);

console.log(result.viewportWidth);  // 3240 (3 × 1080)
console.log(result.viewportHeight); // 1440
console.log(result.finalHtml);      // HTML completo
```

## Resultado

**Viewport:** 3240×1440 (horizontal)
**Layout:** 3 slides lado a lado (1080px cada)
**FreeImage:** Logo centralizado com contorno branco

## Comportamento

| slideCount | freeImage.enabled | Modo Resultante | Viewport |
|-----------|-------------------|-----------------|----------|
| 1 | false | vertical | 1080×1350 |
| 1 | true | vertical | 1080×1350 |
| 3 | false | vertical | 1080×1350 |
| **3** | **true** | **horizontal** | **3240×1440** |

## Copy & Paste

```typescript
import { composeTemplate } from '@/lib/carousel-composer';

// Seu código existente de módulos...
const enabledModules = ['viewport', 'card', 'textFields'];
const moduleData = { /* ... */ };

// Adicione estas opções:
const result = composeTemplate(enabledModules, moduleData, {
  baseUrl: 'http://localhost:8080',
  slideCount: 3,
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

// Pronto! result.finalHtml contém o HTML do carousel horizontal
```

## Exemplos Prontos

Veja `del_horizontal-carousel-example.ts` para 5 exemplos completos:

```typescript
import { exampleHorizontalCarousel } from './del_horizontal-carousel-example';

const result = exampleHorizontalCarousel();
console.log(result.finalHtml);
```

## Troubleshooting

### "Meu carousel está vertical mesmo com freeImage"
**Solução:** Verifique se `slideCount > 1` e `freeImage.enabled = true`

### "A imagem não aparece"
**Solução:** Verifique se `freeImage.url` está correto e acessível

### "O contorno não funciona"
**Solução:** Defina `freeImage.outlineEffect.enabled = true`

### "Viewport errado"
**Solução:** Console.log `result.viewportWidth` e `result.viewportHeight` para debug

## Docs Completas

- **Guia Completo:** `del_CAROUSEL_HORIZONTAL_GUIDE.md`
- **Exemplos:** `del_horizontal-carousel-example.ts`
- **Técnico:** `del_IMPLEMENTATION_SUMMARY.md`
- **Overview:** `del_README_HORIZONTAL_MODE.md`

## Pronto!

Agora você pode criar carrosséis horizontais com logos centralizados! 🎉
