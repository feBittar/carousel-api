# Text Fields Styled Chunks - Test Example

This file demonstrates how to test the styled chunks implementation.

## Test Data Example

```typescript
const testField: TextField = {
  content: 'Learn React in 30 days',
  style: {
    fontFamily: 'Inter',
    fontSize: '48px',
    color: '#000000',
    textAlign: 'left',
    fontWeight: '400',
    textTransform: 'none',
  },
  styledChunks: [
    {
      text: 'React',
      color: '#61DAFB',
      bold: true,
    },
    {
      text: '30 days',
      color: '#FF6B6B',
      italic: true,
    },
  ],
  freePosition: false,
  position: { top: '50%', left: '50%' },
  specialPosition: 'none',
  specialPadding: 8,
};
```

## Expected HTML Output

```html
<div class="text-field text-field-0" data-field-index="0">
  <span style="font-family:Inter;color:#000000;font-size:48px;font-weight:400">
    Learn <span style="color:#61DAFB;font-size:48px;font-family:Inter;font-weight:bold">React</span> in
    <span style="color:#FF6B6B;font-size:48px;font-family:Inter;font-style:italic">30 days</span>
  </span>
</div>
```

## Key Features Implemented

1. **Style Inheritance**: Chunks inherit parent field styles (fontFamily, fontSize, color)
2. **Style Override**: Chunk-specific styles override inherited values
3. **HTML Escaping**: Non-styled text is properly escaped to prevent XSS
4. **Fallback**: Plain text without chunks falls back to simple escaped content
5. **Rich Formatting**: Supports:
   - Colors (color, backgroundColor)
   - Typography (bold, italic, underline)
   - Spacing (letterSpacing, padding)
   - Advanced effects (backgroundBlur, blurColor, blurOpacity, etc.)

## Implementation Files

- ✅ **richTextConverter.ts**: Contains `applyStyledChunks()` function
- ✅ **types.ts**: Has complete `StyledChunk` interface with all properties
- ✅ **textFields.ts**: Updated to use `applyStyledChunks()` instead of inline rendering

## Validation Checklist

- [x] TypeScript builds successfully
- [x] `applyStyledChunks()` is imported and used
- [x] `escapeHtml()` is available for plain text fallback
- [x] HTML generation uses styled chunks when present
- [x] Plain text fallback works when no chunks
- [x] Parent styles are passed for inheritance
- [x] All `StyledChunk` properties are supported
