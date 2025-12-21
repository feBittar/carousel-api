# Diagnóstico: Viewport CSS não sendo aplicado

## Problema
Imagens de fundo e cores do viewport não aparecem na renderização final em modo horizontal (carousel).

## Root Cause

### Conflito de CSS com `!important`

**Ordem de processamento:**
1. `compositer.ts:327` - Adiciona `generateCarouselCSS()` PRIMEIRO
2. `carousel-helpers.ts:119-120` - Define:
   ```css
   body {
     background: none !important;
     background-image: none !important;
   }
   ```
3. `compositer.ts:370` - Adiciona CSS do viewport DEPOIS
4. `viewport/css.ts:24-35` - Gera:
   ```css
   body {
     background-image: url(...);  /* SEM !important */
   }
   ```

**Resultado:** O `!important` do carousel-helpers VENCE e anula o viewport.

### Código atual tentando compensar (mas falhando)

`compositer.ts:330-344` tenta copiar background para `.carousel-slide`:
```typescript
if (viewportData?.backgroundType === 'image' && viewportData?.backgroundImage) {
  cssParts.push(`
.carousel-slide {
  background-image: url(${viewportData.backgroundImage}) !important;
}
  `.trim());
}
```

**MAS:** Este código só funciona se:
- `backgroundType === 'image'` (linha 332)
- Se `backgroundType` estiver incorreto ou ausente, falha

### Evidência

**Arquivos afetados:**
- `D:\tmp\fix-api\carousel-api\src\lib\carousel-composer\carousel-helpers.ts:119-120`
- `D:\tmp\fix-api\carousel-api\src\lib\carousel-composer\compositer.ts:330-344`
- `D:\tmp\fix-api\carousel-api\src\lib\carousel-composer\modules\viewport\css.ts:24-35`

**O que funciona:**
- Gradiente: OK (linha 83 de viewport/css.ts aplica em `.carousel-slide::after`)

**O que NÃO funciona:**
- Background image: FALHA (body background é anulado, carousel-slide depende de backgroundType)
- Background color: FALHA (mesmo motivo)

## Solução

### Opção 1: FIX no compositer.ts (RECOMENDADA)
Verificar pela existência do campo, não pelo backgroundType:

```typescript
// Line 331-344
const viewportData = moduleData['viewport'] as any;

// Copy background IMAGE if exists
if (viewportData?.backgroundImage && viewportData.backgroundImage.trim() !== '') {
  cssParts.push(`
.carousel-slide {
  background-image: url(${viewportData.backgroundImage}) !important;
  background-size: cover !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
}
  `.trim());
}

// Copy background COLOR if exists (and no image)
if (viewportData?.backgroundColor &&
    (!viewportData?.backgroundImage || viewportData.backgroundImage.trim() === '')) {
  cssParts.push(`
.carousel-slide {
  background-color: ${viewportData.backgroundColor} !important;
}
  `.trim());
}

// Copy GRADIENT if enabled
if (viewportData?.gradientOverlay?.enabled && viewportData.gradientOverlay.color) {
  // Already handled by viewport/css.ts line 83 (.carousel-slide::after)
  // No additional code needed here
}
```

### Opção 2: FIX no viewport/css.ts
Adicionar `!important` no CSS do body (mas isso não resolve em horizontal):

```typescript
// Line 25
bodyStyles.push(`background-image: url(${viewport.backgroundImage}) !important;`);
```

**PROBLEMA:** Em modo horizontal, o body NÃO deve ter background (é anulado intencionalmente).

### Opção 3: Remover `!important` do carousel-helpers
```typescript
// carousel-helpers.ts:119
background: none;  // Remove !important
```

**PROBLEMA:** Pode causar conflitos não intencionais.

## Recomendação

**Implementar Opção 1** pois:
1. Resolve o problema na raiz
2. Não depende do campo `backgroundType` (verifica existência direta)
3. Mantém a arquitetura atual (body sem background, slides com background)
4. Adiciona suporte explícito para ambos image E color
5. Documenta que gradiente já está sendo tratado corretamente

## Teste

Após correção, verificar que:
1. Background image aparece em cada slide
2. Background color aparece quando não há imagem
3. Gradiente continua funcionando (já está OK)
4. Blur continua funcionando (body::before)

## Descoberta Adicional: API vs Preview

### Comportamento Atual da API

**htmlGenerator.service.ts:57** força `slideCount: 1`:
```typescript
const composed: ComposedTemplate = composeTemplate(
  enabledModuleIds,
  modulesData,
  {
    baseUrl: this.baseUrl,
    slideCount: 1, // ❌ Each slide is rendered individually
  }
);
```

**Implicações:**
- API **NUNCA** entra em modo horizontal
- Cada slide é renderizado como 1080x1440 individual
- FreeImage não funciona como esperado (precisa slideCount > 1)
- Background deveria funcionar normalmente (modo vertical)

### Diferença entre API e Preview

| Aspecto | API (carousel-api) | Preview (content-chisel) |
|---------|-------------------|--------------------------|
| Modo | Vertical (slideCount=1) | Horizontal (slideCount>1) |
| Dimensões | 1080x1440 por slide | 3240x1440 para 3 slides |
| FreeImage | Não funciona | Funciona |
| Viewport CSS | Deveria funcionar | Problema identificado |

### Questões para o Usuário

1. **Onde você está vendo o problema?**
   - Na API (carousel-api) renderizando slides individuais?
   - No preview (content-chisel) com carousel horizontal?

2. **Qual é o comportamento esperado?**
   - API deve gerar carousel horizontal com múltiplos slides?
   - Ou deve gerar slides individuais que depois são compostos?

## Status
- [x] Diagnóstico completo
- [x] Correção aplicada (para modo horizontal)
- [ ] Esclarecimento necessário sobre fluxo esperado
- [ ] Teste realizado
