# Solução: Viewport CSS não sendo aplicado

## Problema Identificado

### Root Cause
Conflito de CSS com `!important` em **modo horizontal (carousel)**:

```css
/* 1. PRIMEIRO: carousel-helpers.ts:119-120 */
body {
  background: none !important;        /* ❌ ANULA viewport background */
  background-image: none !important;
}

/* 2. DEPOIS: viewport/css.ts:24-35 */
body {
  background-image: url(...);         /* ❌ SEM !important - PERDE */
}
```

### Arquivos Afetados
- `D:\tmp\fix-api\carousel-api\src\lib\carousel-composer\carousel-helpers.ts:119-120`
- `D:\tmp\fix-api\carousel-api\src\lib\carousel-composer\compositer.ts:330-344`
- `D:\tmp\fix-api\carousel-api\src\lib\carousel-composer\modules\viewport\css.ts:24-35`

## Correção Aplicada

### Arquivo: `compositer.ts:330-365`

**ANTES:**
```typescript
// Verifica backgroundType (campo pode estar incorreto)
if (viewportData?.backgroundType === 'image' && viewportData?.backgroundImage) {
  cssParts.push(`
.carousel-slide {
  background-image: url(${viewportData.backgroundImage}) !important;
}
  `.trim());
}
```

**DEPOIS:**
```typescript
// Verifica existência do campo, não backgroundType
if (viewportData?.backgroundImage && viewportData.backgroundImage.trim() !== '') {
  cssParts.push(`
.carousel-slide {
  background-image: url(${viewportData.backgroundImage}) !important;
  background-size: cover !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
}
  `.trim());

  // Add color as fallback while image loads
  if (viewportData?.backgroundColor) {
    cssParts.push(`
.carousel-slide {
  background-color: ${viewportData.backgroundColor} !important;
}
    `.trim());
  }
}
// Copy background COLOR if exists (and no image)
else if (viewportData?.backgroundColor) {
  cssParts.push(`
.carousel-slide {
  background-color: ${viewportData.backgroundColor} !important;
}
  `.trim());
}
```

### Melhorias
1. ✅ Não depende de `backgroundType` (verifica existência direta)
2. ✅ Adiciona `background-size`, `background-position`, `background-repeat`
3. ✅ Suporta cor como fallback durante carregamento de imagem
4. ✅ Suporta cor sozinha quando não há imagem
5. ✅ Adiciona logs de debug para diagnóstico

## Como Funciona

### Modo Horizontal (slideCount > 1 + freeImage)
```
body (3240x1440) ← background: none !important (carousel-helpers.ts)
└── .carousel-slide (1080x1440) ← background aplicado aqui (compositer.ts)
    ├── .carousel-slide::after ← gradiente (viewport/css.ts:83)
    └── content...
```

### Modo Vertical (slideCount = 1)
```
body (1080x1440) ← background aplicado aqui (viewport/css.ts:24-35)
├── body::before ← blur overlay
├── body::after ← gradiente
└── content...
```

## Logs de Debug Adicionados

```typescript
console.log('[Compositer] Applying viewport background to carousel-slide:');
console.log('[Compositer]   backgroundImage:', viewportData?.backgroundImage);
console.log('[Compositer]   backgroundColor:', viewportData?.backgroundColor);
console.log('[Compositer]   gradientEnabled:', viewportData?.gradientOverlay?.enabled);
```

## Importante: Escopo da API

### Comportamento Atual
A API (`htmlGenerator.service.ts`) **sempre** usa `slideCount: 1`:
- Nunca entra em modo horizontal
- Gera slides individuais (1080x1440)
- Viewport CSS deveria funcionar normalmente
- FreeImage **NÃO** funciona (precisa slideCount > 1)

### Se o problema está na API
A correção aplicada **NÃO** afeta a API, pois ela nunca entra em modo horizontal.
O problema deve ser outro (possivelmente dados incorretos sendo passados).

### Se o problema está no Preview (content-chisel)
A correção aplicada **DEVE** resolver, pois:
- Preview gera carousel horizontal (slideCount > 1)
- Correção garante que `.carousel-slide` recebe background corretamente
- Não depende mais de `backgroundType`

## Teste Recomendado

### 1. Verificar logs de debug:
```
[Viewport CSS] Generating CSS for viewport:
[Viewport CSS]   backgroundType: ...
[Viewport CSS]   backgroundImage: ...
[Viewport CSS]   gradientEnabled: ...

[Compositer] Applying viewport background to carousel-slide:
[Compositer]   backgroundImage: ...
[Compositer]   backgroundColor: ...
[Compositer] ✓ Adding background-image to .carousel-slide
```

### 2. Verificar CSS gerado:
```css
.carousel-slide {
  background-image: url(...) !important;
  background-size: cover !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
}
```

### 3. Verificar HTML final:
- Inspecionar elemento `.carousel-slide`
- Confirmar que CSS está sendo aplicado
- Verificar se imagem está carregando (Network tab)

## Próximos Passos

1. **Se o problema persistir**, verificar:
   - Dados sendo passados para `composeTemplate()`
   - URL da imagem é válida e acessível
   - Não há outros CSS sobrescrevendo depois

2. **Se a API precisa gerar carousel horizontal**, modificar:
   - `htmlGenerator.service.ts:57` para passar `slideCount` correto
   - Adicionar suporte para `freeImage` na configuração

## Arquivos Modificados

1. `D:\tmp\fix-api\carousel-api\src\lib\carousel-composer\compositer.ts`
   - Linhas 330-365: Lógica de cópia de background para .carousel-slide
   - Linhas 334-337: Logs de debug

## Arquivos de Diagnóstico Criados

1. `D:\tmp\fix-api\carousel-api\del_DIAGNOSIS_viewport_css.md`
2. `D:\tmp\fix-api\carousel-api\del_SOLUTION_SUMMARY.md` (este arquivo)
