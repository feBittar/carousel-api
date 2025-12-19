'use client';

import * as React from 'react';
import { CardData, SPECIAL_POSITIONS, SpecialPosition } from './schema';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { StyledToggle } from '@/components/ui/styled-toggle';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ColorPicker } from '@/components/editor/ColorPicker';
import { FileUploadInput } from '@/components/editor/FileUploadInput';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Link2, Link2Off } from 'lucide-react';

const BACKGROUND_TYPE_OPTIONS = [
  { value: 'color', label: 'Cor Sólida' },
  { value: 'image', label: 'Imagem' },
];

const GRADIENT_DIRECTION_OPTIONS = [
  { value: 'to top', label: 'Para Cima' },
  { value: 'to bottom', label: 'Para Baixo' },
  { value: 'to left', label: 'Para Esquerda' },
  { value: 'to right', label: 'Para Direita' },
];

const POSITION_LABELS: Record<SpecialPosition, string> = {
  'none': 'Nenhum',
  'center': 'Centro',
  'top-left': 'Topo Esquerda',
  'top-center': 'Topo Centro',
  'top-right': 'Topo Direita',
  'center-left': 'Centro Esquerda',
  'center-right': 'Centro Direita',
  'bottom-left': 'Base Esquerda',
  'bottom-center': 'Base Centro',
  'bottom-right': 'Base Direita',
};

interface CardFormProps {
  watch: () => any;
  setValue: (name: any, value: any) => void;
}

export function CardForm({ watch, setValue }: CardFormProps) {
  const formData = watch() as any;
  const card = (formData?.card || {}) as Partial<CardData>;

  const updateCard = (field: keyof CardData, value: any) => {
    setValue('card' as any, {
      ...card,
      [field]: value,
    } as any);
  };

  const updateGradient = (field: string, value: any) => {
    const currentGradient = card.gradientOverlay || {
      enabled: false,
      color: '#000000',
      startOpacity: 0.7,
      midOpacity: 0.3,
      endOpacity: 0,
      height: 50,
      direction: 'to top',
    };
    setValue('card' as any, {
      ...card,
      gradientOverlay: {
        ...currentGradient,
        [field]: value,
      },
    } as any);
  };

  const updateShadow = (field: string, value: any) => {
    const currentShadow = card.shadow || {
      enabled: false,
      x: 0,
      y: 10,
      blur: 30,
      spread: 0,
      color: 'rgba(0, 0, 0, 0.3)',
    };
    setValue('card' as any, {
      ...card,
      shadow: {
        ...currentShadow,
        [field]: value,
      },
    } as any);
  };

  const [paddingLinked, setPaddingLinked] = React.useState(true);

  const handlePaddingChange = (side: 'top' | 'right' | 'bottom' | 'left', value: number) => {
    const currentPadding = card.padding || { top: 80, right: 80, bottom: 80, left: 80 };
    if (paddingLinked) {
      setValue('card' as any, {
        ...card,
        padding: {
          top: value,
          right: value,
          bottom: value,
          left: value,
        },
      } as any);
    } else {
      setValue('card' as any, {
        ...card,
        padding: {
          ...currentPadding,
          [side]: value,
        },
      } as any);
    }
  };

  return (
    <div className="space-y-6">
      {/* ========== DIMENSIONS & POSITION SECTION ========== */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Dimensões & Posição</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="card-width">Largura (%)</Label>
              <Input
                id="card-width"
                type="number"
                min={0}
                max={100}
                value={card.width ?? 90}
                onChange={(e) => updateCard('width', Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="card-height">Altura (%)</Label>
              <Input
                id="card-height"
                type="number"
                min={0}
                max={100}
                value={card.height ?? 90}
                onChange={(e) => updateCard('height', Number(e.target.value))}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Posição</Label>
            <Select
              value={card.specialPosition ?? 'center'}
              onValueChange={(value) => updateCard('specialPosition', value as SpecialPosition)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a posição" />
              </SelectTrigger>
              <SelectContent>
                {SPECIAL_POSITIONS.map((pos) => (
                  <SelectItem key={pos} value={pos}>
                    {POSITION_LABELS[pos]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {card.specialPosition && card.specialPosition !== 'none' && card.specialPosition !== 'center' && (
            <div className="space-y-2">
              <Label htmlFor="position-padding">Distância da Borda (px)</Label>
              <Input
                id="position-padding"
                type="number"
                min={0}
                value={card.positionPadding ?? 40}
                onChange={(e) => updateCard('positionPadding', Number(e.target.value))}
              />
            </div>
          )}

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="card-border-radius">Raio da Borda (px)</Label>
            <Input
              id="card-border-radius"
              type="number"
              min={0}
              value={card.borderRadius ?? 0}
              onChange={(e) => updateCard('borderRadius', Number(e.target.value))}
            />
          </div>
        </CardContent>
      </Card>

      {/* ========== BACKGROUND SECTION ========== */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Background</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Tipo de Background</Label>
            <Select
              value={card.backgroundType ?? 'color'}
              onValueChange={(value) => updateCard('backgroundType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                {BACKGROUND_TYPE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {card.backgroundType === 'color' && (
            <ColorPicker
              label="Cor de Fundo"
              color={card.backgroundColor ?? '#FFFFFF'}
              onChange={(value) => updateCard('backgroundColor', value)}
            />
          )}

          {card.backgroundType === 'image' && (
            <FileUploadInput
              label="Imagem de Fundo"
              value={card.backgroundImage ?? ''}
              onChange={(value) => updateCard('backgroundImage', value)}
              placeholder="URL da imagem ou arraste arquivo"
            />
          )}
        </CardContent>
      </Card>

      {/* ========== PADDING SECTION ========== */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Padding Interno</CardTitle>
            <div
              role="switch"
              aria-checked={paddingLinked}
              onClick={() => setPaddingLinked(!paddingLinked)}
              className={cn(
                "relative flex-shrink-0 h-7 w-12 rounded-full cursor-pointer transition-colors border-2",
                paddingLinked
                  ? "bg-[#E64A19] border-[#E64A19]"
                  : "bg-zinc-200 dark:bg-zinc-700 border-zinc-300 dark:border-zinc-600"
              )}
              title={paddingLinked ? "Valores vinculados" : "Valores independentes"}
            >
              <div
                className={cn(
                  "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-200 flex items-center justify-center",
                  paddingLinked ? "translate-x-[22px]" : "translate-x-0.5"
                )}
              >
                {paddingLinked ? (
                  <Link2 className="h-3 w-3 text-[#E64A19]" />
                ) : (
                  <Link2Off className="h-3 w-3 text-zinc-400" />
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {paddingLinked ? (
            <div className="space-y-2">
              <Label htmlFor="card-padding">Todos os Lados (px)</Label>
              <Input
                id="card-padding"
                type="number"
                min={0}
                value={card.padding?.top ?? 80}
                onChange={(e) => handlePaddingChange('top', Number(e.target.value))}
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="card-padding-top">Topo (px)</Label>
                <Input
                  id="card-padding-top"
                  type="number"
                  min={0}
                  value={card.padding?.top ?? 80}
                  onChange={(e) => handlePaddingChange('top', Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="card-padding-right">Direita (px)</Label>
                <Input
                  id="card-padding-right"
                  type="number"
                  min={0}
                  value={card.padding?.right ?? 80}
                  onChange={(e) => handlePaddingChange('right', Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="card-padding-bottom">Base (px)</Label>
                <Input
                  id="card-padding-bottom"
                  type="number"
                  min={0}
                  value={card.padding?.bottom ?? 80}
                  onChange={(e) => handlePaddingChange('bottom', Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="card-padding-left">Esquerda (px)</Label>
                <Input
                  id="card-padding-left"
                  type="number"
                  min={0}
                  value={card.padding?.left ?? 80}
                  onChange={(e) => handlePaddingChange('left', Number(e.target.value))}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ========== LAYOUT DIRECTION SECTION ========== */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Layout do Conteúdo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Direção do Layout</Label>
            <Select
              value={card.layoutDirection ?? 'column'}
              onValueChange={(value) => updateCard('layoutDirection', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a direção" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="column">Vertical (Column)</SelectItem>
                <SelectItem value="row">Horizontal (Row)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Alinhamento Vertical</Label>
            <Select
              value={card.verticalAlign ?? 'flex-start'}
              onValueChange={(value) => updateCard('verticalAlign', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o alinhamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flex-start">Início/Topo 🔵</SelectItem>
                <SelectItem value="center">Centro 🟢</SelectItem>
                <SelectItem value="flex-end">Fim/Fundo 🔴</SelectItem>
                <SelectItem value="space-between">Espaçado (Entre)</SelectItem>
                <SelectItem value="space-around">Espaçado (Em Volta)</SelectItem>
                <SelectItem value="space-evenly">Espaçado (Uniforme)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Controla onde os módulos são posicionados verticalmente no container
            </p>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="content-gap">Espaçamento entre Módulos</Label>
            <Input
              id="content-gap"
              type="text"
              value={card.contentGap ?? '12px'}
              onChange={(e) => updateCard('contentGap', e.target.value)}
              placeholder="12px"
            />
            <p className="text-xs text-muted-foreground">
              Valores CSS: px, %, rem, em, etc.
            </p>
          </div>

          {card.layoutDirection === 'row' && (
            <>
              <Separator />
              <div className="space-y-2">
                <Label>Alinhamento Horizontal</Label>
                <Select
                  value={card.contentAlign ?? 'stretch'}
                  onValueChange={(value) => updateCard('contentAlign', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o alinhamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flex-start">Início (Flex Start)</SelectItem>
                    <SelectItem value="center">Centro (Center)</SelectItem>
                    <SelectItem value="flex-end">Fim (Flex End)</SelectItem>
                    <SelectItem value="stretch">Esticado (Stretch)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* ========== GRADIENT OVERLAY SECTION ========== */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Gradient Overlay</CardTitle>
            <Switch
              checked={card.gradientOverlay?.enabled ?? false}
              onCheckedChange={(checked) => updateGradient('enabled', checked)}
            />
          </div>
        </CardHeader>
        {card.gradientOverlay?.enabled && (
          <CardContent className="space-y-4 pt-0">
            <Separator className="mb-4" />
            <ColorPicker
              label="Cor do Gradient"
              color={card.gradientOverlay.color ?? '#000000'}
              onChange={(value) => updateGradient('color', value)}
            />

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="grad-start">Início (%)</Label>
                <Input
                  id="grad-start"
                  type="number"
                  min={0}
                  max={100}
                  value={Math.round((card.gradientOverlay.startOpacity ?? 0.7) * 100)}
                  onChange={(e) => updateGradient('startOpacity', Number(e.target.value) / 100)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grad-mid">Meio (%)</Label>
                <Input
                  id="grad-mid"
                  type="number"
                  min={0}
                  max={100}
                  value={Math.round((card.gradientOverlay.midOpacity ?? 0.3) * 100)}
                  onChange={(e) => updateGradient('midOpacity', Number(e.target.value) / 100)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grad-end">Fim (%)</Label>
                <Input
                  id="grad-end"
                  type="number"
                  min={0}
                  max={100}
                  value={Math.round((card.gradientOverlay.endOpacity ?? 0) * 100)}
                  onChange={(e) => updateGradient('endOpacity', Number(e.target.value) / 100)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="grad-height">Altura (%)</Label>
                <Input
                  id="grad-height"
                  type="number"
                  min={10}
                  max={100}
                  value={card.gradientOverlay.height ?? 50}
                  onChange={(e) => updateGradient('height', Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>Direção</Label>
                <Select
                  value={card.gradientOverlay.direction ?? 'to top'}
                  onValueChange={(value) => updateGradient('direction', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {GRADIENT_DIRECTION_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* ========== SHADOW SECTION ========== */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Sombra</CardTitle>
            <Switch
              checked={card.shadow?.enabled ?? false}
              onCheckedChange={(checked) => updateShadow('enabled', checked)}
            />
          </div>
        </CardHeader>
        {card.shadow?.enabled && (
          <CardContent className="space-y-4 pt-0">
            <Separator className="mb-4" />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="shadow-x">X (px)</Label>
                <Input
                  id="shadow-x"
                  type="number"
                  value={card.shadow.x ?? 0}
                  onChange={(e) => updateShadow('x', Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shadow-y">Y (px)</Label>
                <Input
                  id="shadow-y"
                  type="number"
                  value={card.shadow.y ?? 10}
                  onChange={(e) => updateShadow('y', Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shadow-blur">Blur (px)</Label>
                <Input
                  id="shadow-blur"
                  type="number"
                  min={0}
                  value={card.shadow.blur ?? 30}
                  onChange={(e) => updateShadow('blur', Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shadow-spread">Spread (px)</Label>
                <Input
                  id="shadow-spread"
                  type="number"
                  value={card.shadow.spread ?? 0}
                  onChange={(e) => updateShadow('spread', Number(e.target.value))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shadow-color">Cor da Sombra</Label>
              <Input
                id="shadow-color"
                type="text"
                value={card.shadow.color ?? 'rgba(0, 0, 0, 0.3)'}
                onChange={(e) => updateShadow('color', e.target.value)}
                placeholder="rgba(0, 0, 0, 0.3)"
              />
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
