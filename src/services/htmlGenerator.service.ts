// @ts-nocheck - Module compatibility types
import { composeTemplate } from '../lib/carousel-composer';
import {
  CarouselModularConfig,
  CarouselSlide,
  ComposedTemplate,
} from '../lib/carousel-composer/types';

// Type aliases for backward compatibility
type CarouselConfig = CarouselModularConfig;
type SlideConfig = CarouselSlide;

/**
 * HTML Generator Service
 * Gera HTML completo para cada slide do carousel
 */
export class HtmlGeneratorService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  }

  /**
   * Gera HTML para um carousel completo (todos os slides)
   * @param config Configuração do carousel com todos os slides
   * @returns Array de HTML strings (1 por slide)
   */
  generateCarousel(config: CarouselConfig): string[] {
    console.log(`[HTML Generator] Generating ${config.slides.length} slides...`);

    const htmlSlides: string[] = [];

    for (const slide of config.slides) {
      const html = this.generateSlide(slide);
      htmlSlides.push(html);
    }

    console.log(`[HTML Generator] ✅ Generated ${htmlSlides.length} slides successfully`);
    return htmlSlides;
  }

  /**
   * Gera HTML para um slide individual
   * @param slide Configuração do slide
   * @returns HTML string completo
   */
  private generateSlide(slide: SlideConfig): string {
    console.log(`[HTML Generator] Generating slide: ${slide.id}`);

    // Extract module IDs from slide config
    const enabledModuleIds = Object.keys(slide.modules);
    const modulesData = slide.modules;

    // Compose template using carousel-composer library
    // IMPORTANT: Pass visualLayout and moduleOrder from the slide to replicate
    // the exact positioning and ordering from the visual editor
    const options = {
      baseUrl: this.baseUrl,
      slideCount: 1, // Each slide is rendered individually (vertical mode)
      moduleOrder: slide.moduleOrder, // Preserve module rendering order
      visualLayout: slide.visualLayout, // Apply visual editor positions
      includeDataAttributes: false, // Disable for Puppeteer (no need for data attributes in final render)
    };

    const composed: ComposedTemplate = composeTemplate(
      enabledModuleIds,
      modulesData,
      options
    );

    return composed.finalHtml;
  }

  /**
   * Valida configuração do carousel
   * @param config Configuração a validar
   * @returns true se válida, lança erro se inválida
   */
  validateConfig(config: CarouselConfig): boolean {
    if (!config.slides || config.slides.length === 0) {
      throw new Error('Carousel config must have at least 1 slide');
    }

    if (config.slides.length > 10) {
      throw new Error('Carousel config cannot have more than 10 slides');
    }

    for (const slide of config.slides) {
      if (!slide.id || typeof slide.id !== 'string') {
        throw new Error('Each slide must have a valid string id');
      }

      if (typeof slide.order !== 'number') {
        throw new Error('Each slide must have a numeric order');
      }

      if (!slide.modules || typeof slide.modules !== 'object') {
        throw new Error('Each slide must have a modules object');
      }
    }

    console.log('[HTML Generator] ✅ Config validation passed');
    return true;
  }
}

// Singleton instance
export const htmlGeneratorService = new HtmlGeneratorService();
