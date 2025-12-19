'use client';

import React, { useState, useEffect } from 'react';
import { ModuleFormProps } from '../../types';
import { FreeImageData } from './schema';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useCarouselModularStore } from '@/state/carouselModularStore';
import { Image as ImageIcon, Info, Minus, Plus } from 'lucide-react';

/**
 * FreeImageForm - Configuration for free image in carousel mode
 *
 * Features:
 * - Toggle enable/disable free image
 * - Image URL input with preview
 * - Position controls (offset X/Y, scale, rotation) with number inputs
 * - Outline effect configuration
 * - Only visible when in carousel mode (2+ slides)
 */
export function FreeImageForm({ watch, setValue }: ModuleFormProps<FreeImageData>) {
  const slides = useCarouselModularStore((state) => state.slides);
  const slidesCount = slides.length;

  const enabled = watch('enabled') as boolean;
  const url = watch('url') as string || '';
  const startSlideIndex = watch('startSlideIndex') as number || 0;
  const endSlideIndex = watch('endSlideIndex') as number || 1;
  const offsetX = watch('offsetX') as number || 0;
  const offsetY = watch('offsetY') as number || 0;
  const scale = watch('scale') as number || 100;
  const rotation = watch('rotation') as number || 0;
  const outlineEffect = (watch('outlineEffect') as FreeImageData['outlineEffect']) || {
    enabled: false,
    color: '#000000',
    size: 0,
  };

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Update preview when URL changes
  useEffect(() => {
    if (url && url.trim()) {
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
  }, [url]);

  const handleUpdateOutlineEffect = (updates: Partial<typeof outlineEffect>) => {
    setValue('outlineEffect', {
      ...outlineEffect,
      ...updates,
    });
  };

  // Helper to increment/decrement with bounds checking
  const adjustValue = (
    currentValue: number,
    delta: number,
    min: number,
    max: number,
    field: 'offsetX' | 'offsetY' | 'scale' | 'rotation'
  ) => {
    const newValue = Math.max(min, Math.min(max, currentValue + delta));
    setValue(field, newValue);
  };

  // Helper to adjust slide indices with validation
  const adjustSlideIndex = (
    currentValue: number,
    delta: number,
    field: 'startSlideIndex' | 'endSlideIndex'
  ) => {
    const newValue = Math.max(0, Math.min(slidesCount - 1, currentValue + delta));

    if (field === 'startSlideIndex') {
      setValue('startSlideIndex', newValue);
      // Ensure endSlideIndex is always >= startSlideIndex
      if (endSlideIndex < newValue) {
        setValue('endSlideIndex', newValue);
      }
    } else {
      setValue('endSlideIndex', newValue);
      // Ensure endSlideIndex is always >= startSlideIndex
      if (newValue < startSlideIndex) {
        setValue('startSlideIndex', newValue);
      }
    }
  };

  // Calculate affected slides count
  const affectedSlidesCount = endSlideIndex - startSlideIndex + 1;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Imagem Livre (Carrossel)</span>
          <div className="flex items-center gap-2">
            <Label>Ativada</Label>
            <Switch
              checked={enabled}
              onCheckedChange={(checked) => setValue('enabled', checked)}
            />
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Info Alert */}
        <Alert className="bg-blue-50 border-blue-200">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 mt-0.5 flex-shrink-0 text-blue-600" />
            <AlertDescription className="space-y-1 text-sm text-blue-900">
              <p className="font-medium">Imagem Livre - Modo Carrossel</p>
              <p className="text-xs">
                Esta imagem aparece centralizada entre os {slidesCount} slides do carrossel,
                conectando-os visualmente. Ideal para elementos como &quot;VS&quot;, setas, ou ícones de transição.
              </p>
            </AlertDescription>
          </div>
        </Alert>

        {/* Image URL */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Configuração da Imagem</h3>
          </div>

          <div className="space-y-2">
            <Label htmlFor="free-image-url">URL da Imagem</Label>
            <Input
              id="free-image-url"
              type="text"
              value={url}
              onChange={(e) => setValue('url', e.target.value)}
              placeholder="Ex: /images/vs.png ou https://..."
              disabled={!enabled}
            />
            <p className="text-xs text-muted-foreground">
              Imagem PNG que aparecerá centralizada entre os slides do carrossel
            </p>
          </div>

          {/* Image Preview */}
          {imagePreview && enabled && (
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <Label className="text-xs mb-2 block">Preview</Label>
              <div className="flex justify-center">
                <img
                  src={imagePreview}
                  alt="Free image preview"
                  className="max-h-32 rounded border border-border"
                  onError={() => setImagePreview(null)}
                />
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Slide Selection */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Slides de Divisão</h3>
          </div>

          {/* Start Slide */}
          <div className="space-y-2">
            <Label htmlFor="free-image-start-slide" className="text-xs">
              Slide Inicial
            </Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => adjustSlideIndex(startSlideIndex, -1, 'startSlideIndex')}
                disabled={!enabled || startSlideIndex === 0}
                className="h-9 w-9"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                id="free-image-start-slide"
                type="number"
                min={1}
                max={slidesCount}
                step={1}
                value={startSlideIndex + 1}
                onChange={(e) => {
                  const uiValue = parseInt(e.target.value) || 1;
                  const internalValue = Math.max(0, Math.min(slidesCount - 1, uiValue - 1));
                  setValue('startSlideIndex', internalValue);
                  // Ensure endSlideIndex is always >= startSlideIndex
                  if (endSlideIndex < internalValue) {
                    setValue('endSlideIndex', internalValue);
                  }
                }}
                disabled={!enabled}
                className="text-center"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => adjustSlideIndex(startSlideIndex, 1, 'startSlideIndex')}
                disabled={!enabled || startSlideIndex === slidesCount - 1}
                className="h-9 w-9"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Primeiro slide onde a imagem aparece
            </p>
          </div>

          {/* End Slide */}
          <div className="space-y-2">
            <Label htmlFor="free-image-end-slide" className="text-xs">
              Slide Final
            </Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => adjustSlideIndex(endSlideIndex, -1, 'endSlideIndex')}
                disabled={!enabled || endSlideIndex === 0}
                className="h-9 w-9"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                id="free-image-end-slide"
                type="number"
                min={1}
                max={slidesCount}
                step={1}
                value={endSlideIndex + 1}
                onChange={(e) => {
                  const uiValue = parseInt(e.target.value) || 1;
                  const internalValue = Math.max(0, Math.min(slidesCount - 1, uiValue - 1));
                  setValue('endSlideIndex', internalValue);
                  // Ensure endSlideIndex is always >= startSlideIndex
                  if (internalValue < startSlideIndex) {
                    setValue('startSlideIndex', internalValue);
                  }
                }}
                disabled={!enabled}
                className="text-center"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => adjustSlideIndex(endSlideIndex, 1, 'endSlideIndex')}
                disabled={!enabled || endSlideIndex === slidesCount - 1}
                className="h-9 w-9"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Último slide onde a imagem aparece
            </p>
          </div>

          {/* Affected Slides Info */}
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3">
            <div className="flex items-center gap-2 text-sm text-blue-900">
              <Info className="h-4 w-4 flex-shrink-0" />
              <span>
                Dividindo entre <strong>{affectedSlidesCount}</strong> {affectedSlidesCount === 1 ? 'slide' : 'slides'}
                {' '}(Slide {startSlideIndex + 1} até Slide {endSlideIndex + 1})
              </span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Transform Controls */}
        <div className="space-y-4">
          <Label className="text-sm font-semibold">Transformações da Imagem</Label>

          {/* Offset X */}
          <div className="space-y-2">
            <Label htmlFor="free-image-offset-x" className="text-xs">
              Deslocamento Horizontal (px)
            </Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => adjustValue(offsetX, -10, -2000, 2000, 'offsetX')}
                disabled={!enabled}
                className="h-9 w-9"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                id="free-image-offset-x"
                type="number"
                min={-2000}
                max={2000}
                step={1}
                value={offsetX}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 0;
                  setValue('offsetX', Math.max(-2000, Math.min(2000, val)));
                }}
                disabled={!enabled}
                className="text-center"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => adjustValue(offsetX, 10, -2000, 2000, 'offsetX')}
                disabled={!enabled}
                className="h-9 w-9"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Negativo = esquerda, Positivo = direita (Limite: -2000 a 2000)
            </p>
          </div>

          {/* Offset Y */}
          <div className="space-y-2">
            <Label htmlFor="free-image-offset-y" className="text-xs">
              Deslocamento Vertical (px)
            </Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => adjustValue(offsetY, -10, -2000, 2000, 'offsetY')}
                disabled={!enabled}
                className="h-9 w-9"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                id="free-image-offset-y"
                type="number"
                min={-2000}
                max={2000}
                step={1}
                value={offsetY}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 0;
                  setValue('offsetY', Math.max(-2000, Math.min(2000, val)));
                }}
                disabled={!enabled}
                className="text-center"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => adjustValue(offsetY, 10, -2000, 2000, 'offsetY')}
                disabled={!enabled}
                className="h-9 w-9"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Negativo = cima, Positivo = baixo (Limite: -2000 a 2000)
            </p>
          </div>

          {/* Scale */}
          <div className="space-y-2">
            <Label htmlFor="free-image-scale" className="text-xs">Escala (%)</Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => adjustValue(scale, -10, 10, 500, 'scale')}
                disabled={!enabled}
                className="h-9 w-9"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                id="free-image-scale"
                type="number"
                min={10}
                max={500}
                step={5}
                value={scale}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 100;
                  setValue('scale', Math.max(10, Math.min(500, val)));
                }}
                disabled={!enabled}
                className="text-center"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => adjustValue(scale, 10, 10, 500, 'scale')}
                disabled={!enabled}
                className="h-9 w-9"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              100% = tamanho original (Limite: 10% a 500%)
            </p>
          </div>

          {/* Rotation */}
          <div className="space-y-2">
            <Label htmlFor="free-image-rotation" className="text-xs">
              Rotação (graus)
            </Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => adjustValue(rotation, -15, -360, 360, 'rotation')}
                disabled={!enabled}
                className="h-9 w-9"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                id="free-image-rotation"
                type="number"
                min={-360}
                max={360}
                step={5}
                value={rotation}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 0;
                  setValue('rotation', Math.max(-360, Math.min(360, val)));
                }}
                disabled={!enabled}
                className="text-center"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => adjustValue(rotation, 15, -360, 360, 'rotation')}
                disabled={!enabled}
                className="h-9 w-9"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Negativo = anti-horário, Positivo = horário (Limite: -360° a 360°)
            </p>
          </div>
        </div>

        <Separator />

        {/* Outline Effect */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Efeito de Contorno</h3>
            <div className="flex items-center gap-2">
              <Label className="text-xs">Ativado</Label>
              <Switch
                checked={outlineEffect.enabled}
                onCheckedChange={(checked) => handleUpdateOutlineEffect({ enabled: checked })}
                disabled={!enabled}
              />
            </div>
          </div>

          {outlineEffect.enabled && (
            <div className="space-y-4 pl-4 border-l-2 border-muted">
              {/* Outline Color */}
              <div className="space-y-2">
                <Label htmlFor="free-image-outline-color" className="text-xs">
                  Cor do Contorno
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="free-image-outline-color"
                    type="color"
                    value={outlineEffect.color}
                    onChange={(e) => handleUpdateOutlineEffect({ color: e.target.value })}
                    disabled={!enabled}
                    className="w-20 h-10"
                  />
                  <Input
                    type="text"
                    value={outlineEffect.color}
                    onChange={(e) => handleUpdateOutlineEffect({ color: e.target.value })}
                    disabled={!enabled}
                    placeholder="#000000"
                  />
                </div>
              </div>

              {/* Outline Size */}
              <div className="space-y-2">
                <Label htmlFor="free-image-outline-size" className="text-xs">
                  Tamanho do Contorno (px)
                </Label>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const newSize = Math.max(0, Math.min(50, outlineEffect.size - 1));
                      handleUpdateOutlineEffect({ size: newSize });
                    }}
                    disabled={!enabled}
                    className="h-9 w-9"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    id="free-image-outline-size"
                    type="number"
                    min={0}
                    max={50}
                    step={1}
                    value={outlineEffect.size}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 0;
                      handleUpdateOutlineEffect({ size: Math.max(0, Math.min(50, val)) });
                    }}
                    disabled={!enabled}
                    className="text-center"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const newSize = Math.max(0, Math.min(50, outlineEffect.size + 1));
                      handleUpdateOutlineEffect({ size: newSize });
                    }}
                    disabled={!enabled}
                    className="h-9 w-9"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Status Info */}
        {enabled && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-sm text-green-900">
            <p className="font-medium mb-2">Imagem Livre Ativa</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Viewport: {slidesCount * 1080}×1440px ({slidesCount} slides)</li>
              <li>Posição: Centralizada entre todos os slides</li>
              <li>Z-index: 101 (acima de todo o conteúdo)</li>
              <li>Output: {slidesCount} arquivos PNG separados</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
