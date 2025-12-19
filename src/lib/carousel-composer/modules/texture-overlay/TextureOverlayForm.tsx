'use client';

import * as React from 'react';
import { ModuleFormProps } from '../types';
import { TextureOverlayData } from './schema';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { StyledToggle } from '@/components/ui/styled-toggle';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

/**
 * Texture Overlay Module Form Component
 * Allows configuration of texture overlay with opacity control
 */
export function TextureOverlayForm({ watch, setValue }: ModuleFormProps<any>) {
  // Get all form data and extract textureOverlay
  const formData = watch() as any;
  const textureOverlay = (formData?.textureOverlay || {}) as TextureOverlayData;

  // Update helper - replaces entire textureOverlay object (same pattern as ViewportForm)
  const updateTextureOverlay = (field: keyof TextureOverlayData, value: any) => {
    setValue('textureOverlay' as any, {
      ...textureOverlay,
      [field]: value,
    } as any);
  };

  return (
    <div className="space-y-6">
      {/* ========== TEXTURE OVERLAY SECTION ========== */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Texture Overlay</CardTitle>
            <StyledToggle
              checked={textureOverlay.enabled ?? false}
              onCheckedChange={(checked) => updateTextureOverlay('enabled', checked)}
            />
          </div>
        </CardHeader>
        {textureOverlay.enabled && (
          <CardContent className="space-y-4 pt-0">
            <Separator className="mb-4" />

            {/* Texture URL */}
            <div className="space-y-2">
              <Label htmlFor="texture-url">URL da Textura</Label>
              <Input
                id="texture-url"
                type="text"
                value={textureOverlay.textureUrl ?? ''}
                onChange={(e) => updateTextureOverlay('textureUrl', e.target.value)}
                placeholder="https://example.com/texture.png"
              />
            </div>

            <Separator />

            {/* Opacity Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Opacidade</Label>
                <span className="text-sm text-muted-foreground">
                  {Math.round((textureOverlay.opacity ?? 0.5) * 100)}%
                </span>
              </div>
              <Slider
                value={[(textureOverlay.opacity ?? 0.5) * 100]}
                onValueChange={([value]) => updateTextureOverlay('opacity', value / 100)}
                min={0}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
