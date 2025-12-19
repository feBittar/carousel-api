'use client';

import * as React from 'react';
import { ModuleFormProps } from '../types';
import { TwitterPostData } from './schema';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { StyledToggle } from '@/components/ui/styled-toggle';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FileUploadInput } from '@/components/editor/FileUploadInput';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCarouselModularStore } from '@/state/carouselModularStore';

/**
 * Twitter Post Module Form Component
 * Allows configuration of a complete Twitter/X post mockup
 */
export function TwitterPostForm({ watch, setValue, fieldPrefix = 'twitterPost' }: ModuleFormProps<any>) {
  const twitterPost = (watch(fieldPrefix) || {}) as TwitterPostData;
  const markDirty = useCarouselModularStore((state) => state.markDirty);

  const updateField = (field: keyof TwitterPostData, value: any) => {
    const currentData = watch(fieldPrefix) || {};
    setValue(fieldPrefix as any, { ...currentData, [field]: value });
    // Force re-render by marking the store as dirty
    markDirty();
  };

  const updateStats = (field: string, value: number) => {
    const currentData = watch(fieldPrefix) || {};
    const currentStats = currentData.stats || { replies: 0, retweets: 0, likes: 0, views: 0 };
    setValue(fieldPrefix as any, {
      ...currentData,
      stats: { ...currentStats, [field]: value },
    });
    // Force re-render by marking the store as dirty
    markDirty();
  };

  const updatePosition = (field: string, value: string) => {
    const currentData = watch(fieldPrefix) || {};
    const currentPosition = currentData.position || {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    };
    setValue(fieldPrefix as any, {
      ...currentData,
      position: { ...currentPosition, [field]: value },
    });
    // Force re-render by marking the store as dirty
    markDirty();
  };

  // File upload handler
  const handleFileUpload = async (file: File): Promise<string> => {
    return URL.createObjectURL(file);
  };

  const enabled = twitterPost.enabled ?? true;

  return (
    <div className="space-y-6">
      {/* ========== MAIN TOGGLE ========== */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Twitter Post Module</CardTitle>
            <StyledToggle
              checked={enabled}
              onCheckedChange={(checked) => updateField('enabled', checked)}
            />
          </div>
        </CardHeader>

        {enabled && (
          <CardContent className="space-y-4 pt-0">
            <Separator className="mb-4" />

            {/* ========== PLATFORM SELECTION ========== */}
            <div className="space-y-2">
              <Label>Platform</Label>
              <Select
                value={twitterPost.platform ?? 'twitter'}
                onValueChange={(value) => updateField('platform', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="twitter">
                    <span className="flex items-center gap-2">
                      🐦 Twitter (Blue theme)
                    </span>
                  </SelectItem>
                  <SelectItem value="x">
                    <span className="flex items-center gap-2">
                      𝕏 X (Dark theme)
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Choose between Twitter (old blue design) or X (new dark design)
              </p>
            </div>

            <Separator />

            {/* ========== PROFILE SECTION ========== */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Profile Information</h3>

              {/* Profile Image */}
              <div className="space-y-2">
                <Label htmlFor="profile-image">Profile Image</Label>
                <FileUploadInput
                  value={twitterPost.profileImage ?? ''}
                  onChange={(value) => updateField('profileImage', value)}
                  onUpload={handleFileUpload}
                  accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.gif'] }}
                  placeholder="Upload or paste image URL"
                />
                <p className="text-xs text-muted-foreground">
                  Recommended: 400x400px, will display as 48x48px circle
                </p>
              </div>

              <Separator />

              {/* Display Name */}
              <div className="space-y-2">
                <Label htmlFor="display-name">Display Name</Label>
                <Input
                  id="display-name"
                  type="text"
                  value={twitterPost.displayName ?? 'John Doe'}
                  onChange={(e) => updateField('displayName', e.target.value)}
                  placeholder="John Doe"
                />
              </div>

              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username">Username (without @)</Label>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">@</span>
                  <Input
                    id="username"
                    type="text"
                    value={twitterPost.username ?? 'johndoe'}
                    onChange={(e) => updateField('username', e.target.value)}
                    placeholder="johndoe"
                  />
                </div>
              </div>

              {/* Verified Badge */}
              <div className="flex items-center justify-between">
                <div>
                  <Label>Verified Badge</Label>
                  <p className="text-xs text-muted-foreground">Show blue checkmark</p>
                </div>
                <StyledToggle
                  checked={twitterPost.verified ?? false}
                  onCheckedChange={(checked) => updateField('verified', checked)}
                />
              </div>
            </div>

            <Separator />

            {/* ========== POST CONTENT SECTION ========== */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Post Content</h3>

              {/* Post Text */}
              <div className="space-y-2">
                <Label htmlFor="post-text">Post Text</Label>
                <Textarea
                  id="post-text"
                  value={twitterPost.postText ?? ''}
                  onChange={(e) => updateField('postText', e.target.value)}
                  placeholder="What's happening?"
                  rows={4}
                />
                <p className="text-xs text-muted-foreground">
                  Note: For styled text (colors, bold, etc.), use the styledChunks field in JSON mode
                </p>
              </div>

              <Separator />

              {/* Post Image */}
              <div className="space-y-2">
                <Label htmlFor="post-image">Post Image (optional)</Label>
                <FileUploadInput
                  value={twitterPost.postImage ?? ''}
                  onChange={(value) => updateField('postImage', value)}
                  onUpload={handleFileUpload}
                  accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.gif'] }}
                  placeholder="Upload or paste image URL"
                />
                <p className="text-xs text-muted-foreground">
                  Recommended: 1200x675px for best results
                </p>
              </div>

              <Separator />

              {/* Timestamp */}
              <div className="space-y-2">
                <Label htmlFor="timestamp">Timestamp</Label>
                <Input
                  id="timestamp"
                  type="text"
                  value={twitterPost.timestamp ?? '2h'}
                  onChange={(e) => updateField('timestamp', e.target.value)}
                  placeholder="2h"
                />
                <p className="text-xs text-muted-foreground">
                  Examples: "2h", "3:45 PM · Dec 8, 2025"
                </p>
              </div>
            </div>

            <Separator />

            {/* ========== STATS SECTION ========== */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold">Interaction Stats</h3>
                  <p className="text-xs text-muted-foreground">Show engagement numbers</p>
                </div>
                <StyledToggle
                  checked={twitterPost.showStats ?? true}
                  onCheckedChange={(checked) => updateField('showStats', checked)}
                />
              </div>

              {twitterPost.showStats !== false && (
                <div className="grid grid-cols-2 gap-4">
                  {/* Replies */}
                  <div className="space-y-2">
                    <Label htmlFor="stats-replies">Replies</Label>
                    <Input
                      id="stats-replies"
                      type="number"
                      min="0"
                      value={twitterPost.stats?.replies ?? 0}
                      onChange={(e) => updateStats('replies', parseInt(e.target.value) || 0)}
                    />
                  </div>

                  {/* Retweets */}
                  <div className="space-y-2">
                    <Label htmlFor="stats-retweets">Retweets</Label>
                    <Input
                      id="stats-retweets"
                      type="number"
                      min="0"
                      value={twitterPost.stats?.retweets ?? 0}
                      onChange={(e) => updateStats('retweets', parseInt(e.target.value) || 0)}
                    />
                  </div>

                  {/* Likes */}
                  <div className="space-y-2">
                    <Label htmlFor="stats-likes">Likes</Label>
                    <Input
                      id="stats-likes"
                      type="number"
                      min="0"
                      value={twitterPost.stats?.likes ?? 0}
                      onChange={(e) => updateStats('likes', parseInt(e.target.value) || 0)}
                    />
                  </div>

                  {/* Views */}
                  <div className="space-y-2">
                    <Label htmlFor="stats-views">Views</Label>
                    <Input
                      id="stats-views"
                      type="number"
                      min="0"
                      value={twitterPost.stats?.views ?? 0}
                      onChange={(e) => updateStats('views', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* ========== APPEARANCE SECTION ========== */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Appearance</h3>

              {/* Background Color */}
              <div className="space-y-2">
                <Label htmlFor="bg-color">Background Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="bg-color"
                    type="color"
                    value={twitterPost.backgroundColor ?? '#ffffff'}
                    onChange={(e) => updateField('backgroundColor', e.target.value)}
                    className="w-20 h-10"
                  />
                  <Input
                    type="text"
                    value={twitterPost.backgroundColor ?? '#ffffff'}
                    onChange={(e) => updateField('backgroundColor', e.target.value)}
                    placeholder="#ffffff"
                    className="flex-1"
                  />
                </div>
              </div>

              <Separator />

              {/* Scale */}
              <div className="space-y-2">
                <Label htmlFor="scale">Scale</Label>
                <Input
                  id="scale"
                  type="number"
                  min={0.5}
                  max={3.0}
                  step={0.1}
                  defaultValue={twitterPost.scale || 1.5}
                  onBlur={(e) => {
                    const value = parseFloat(e.target.value);
                    if (!isNaN(value) && value >= 0.5 && value <= 3.0) {
                      updateField('scale', value);
                    } else {
                      e.target.value = String(twitterPost.scale || 1.5);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const value = parseFloat(e.currentTarget.value);
                      if (!isNaN(value) && value >= 0.5 && value <= 3.0) {
                        updateField('scale', value);
                      } else {
                        e.currentTarget.value = String(twitterPost.scale || 1.5);
                      }
                    }
                  }}
                />
                <p className="text-xs text-muted-foreground">
                  Adjust scale (0.5 to 3.0). Press Enter to apply.
                </p>
              </div>
            </div>

            <Separator />

            {/* ========== POSITION SECTION ========== */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Position</h3>

              <div className="grid grid-cols-2 gap-4">
                {/* Top */}
                <div className="space-y-2">
                  <Label htmlFor="pos-top">Top</Label>
                  <Input
                    id="pos-top"
                    type="text"
                    value={twitterPost.position?.top ?? '50%'}
                    onChange={(e) => updatePosition('top', e.target.value)}
                    placeholder="50%"
                  />
                </div>

                {/* Left */}
                <div className="space-y-2">
                  <Label htmlFor="pos-left">Left</Label>
                  <Input
                    id="pos-left"
                    type="text"
                    value={twitterPost.position?.left ?? '50%'}
                    onChange={(e) => updatePosition('left', e.target.value)}
                    placeholder="50%"
                  />
                </div>
              </div>

              {/* Transform */}
              <div className="space-y-2">
                <Label htmlFor="pos-transform">Transform</Label>
                <Input
                  id="pos-transform"
                  type="text"
                  value={twitterPost.position?.transform ?? 'translate(-50%, -50%)'}
                  onChange={(e) => updatePosition('transform', e.target.value)}
                  placeholder="translate(-50%, -50%)"
                />
                <p className="text-xs text-muted-foreground">
                  Default centers the post. Use CSS transform values.
                </p>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
