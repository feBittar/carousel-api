import { CarouselConfig } from '../lib/carousel-composer/types';

// ============================================================================
// API REQUEST/RESPONSE TYPES
// ============================================================================

/**
 * Request body para geração de carousel
 */
export interface GenerateCarouselRequest {
  carouselId: string;
  workspaceId: string;
  config: CarouselConfig;
}

/**
 * Informações de uma imagem gerada
 */
export interface GeneratedImage {
  slideIndex: number;
  slideId: string;
  url: string;
  fileName: string;
  width: number;
  height: number;
}

/**
 * Response de sucesso para geração de carousel
 */
export interface GenerateCarouselSuccessResponse {
  success: true;
  carouselId: string;
  images: GeneratedImage[];
  generatedAt: string;
}

/**
 * Response de erro para geração de carousel
 */
export interface GenerateCarouselErrorResponse {
  success: false;
  error: string;
  details?: string;
}

/**
 * Response completa (união de sucesso e erro)
 */
export type GenerateCarouselResponse =
  | GenerateCarouselSuccessResponse
  | GenerateCarouselErrorResponse;
