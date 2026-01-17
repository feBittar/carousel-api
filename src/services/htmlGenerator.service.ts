// @ts-nocheck - Module compatibility types
import { composeTemplate } from '../lib/carousel-composer';
import {
  CarouselModularConfig,
  CarouselSlide,
  ComposedTemplate,
  CompanyProfile,
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
   * @param companyProfile Optional company profile for dynamic corner elements
   * @returns Array de HTML strings (1 por slide)
   */
  generateCarousel(config: CarouselConfig, companyProfile?: CompanyProfile): string[] {
    console.log(`[HTML Generator] Generating ${config.slides.length} slides...`);
    if (companyProfile) {
      console.log(`[HTML Generator] Company profile provided: ${companyProfile.company_name || 'unnamed'}`);
    }

    const htmlSlides: string[] = [];
    const totalSlides = config.slides.length;

    for (let i = 0; i < config.slides.length; i++) {
      const slide = config.slides[i];
      const html = this.generateSlide(slide, i, totalSlides, companyProfile);
      htmlSlides.push(html);
    }

    console.log(`[HTML Generator] ✅ Generated ${htmlSlides.length} slides successfully`);
    return htmlSlides;
  }

  /**
   * Gera HTML para um slide individual
   * @param slide Configuração do slide
   * @param slideIndex Índice do slide (0-based)
   * @param totalSlides Total de slides no carousel
   * @param companyProfile Optional company profile for dynamic corner elements
   * @returns HTML string completo
   */
  private generateSlide(
    slide: SlideConfig,
    slideIndex: number = 0,
    totalSlides: number = 1,
    companyProfile?: CompanyProfile
  ): string {
    console.log(`[HTML Generator] Generating slide: ${slide.id} (${slideIndex + 1}/${totalSlides})`);

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
      enabledModules: enabledModuleIds, // Pass enabled modules for duo mode detection
      // Pass slide numbering info for corner elements with "contador" type (m/n format)
      slideIndex,
      totalSlides,
      // Pass company profile for dynamic corner elements (@instagram, company_name, etc.)
      companyProfile,
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

    if (config.slides.length > 20) {
      throw new Error('Carousel config cannot have more than 20 slides');
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
