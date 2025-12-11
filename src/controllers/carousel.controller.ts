import { Request, Response } from 'express';
import { htmlGeneratorService } from '../services/htmlGenerator.service';
import { puppeteerService } from '../services/puppeteer.service';
import { gcsService } from '../services/gcs.service';
import {
  GenerateCarouselRequest,
  GenerateCarouselSuccessResponse,
  GenerateCarouselErrorResponse,
  GeneratedImage,
} from '../types/api';

/**
 * Carousel Controller
 * Orquestra a geração completa de carousels:
 * 1. Valida config
 * 2. Gera HTML (htmlGeneratorService)
 * 3. Renderiza imagens (puppeteerService)
 * 4. Upload para GCS (gcsService)
 * 5. Retorna URLs
 */
export class CarouselController {
  /**
   * POST /api/image-gen/generate-modular
   * Gera carousel completo a partir da configuração
   */
  async generateCarousel(
    req: Request,
    res: Response
  ): Promise<void> {
    const startTime = Date.now();
    console.log('\n========================================');
    console.log('[Controller] 🚀 Starting carousel generation...');
    console.log('========================================\n');

    try {
      // 1. Validate request body
      const { carouselId, workspaceId, config } = req.body as GenerateCarouselRequest;

      if (!carouselId || !workspaceId || !config) {
        const errorResponse: GenerateCarouselErrorResponse = {
          success: false,
          error: 'Missing required fields: carouselId, workspaceId, config',
        };
        res.status(400).json(errorResponse);
        return;
      }

      console.log(`[Controller] Carousel ID: ${carouselId}`);
      console.log(`[Controller] Workspace ID: ${workspaceId}`);
      console.log(`[Controller] Slides count: ${config.slides.length}`);

      // 2. Validate config
      htmlGeneratorService.validateConfig(config);

      // 3. Generate HTML for each slide
      console.log('\n[Controller] 📝 Step 1/3: Generating HTML...');
      const htmlSlides = htmlGeneratorService.generateCarousel(config);

      // 4. Render HTML to images using Puppeteer
      console.log('\n[Controller] 🖼️  Step 2/3: Rendering images...');
      const renderResults = await puppeteerService.renderMultiple(
        htmlSlides,
        1080,
        1440
      );

      // 5. Upload images to Google Cloud Storage
      console.log('\n[Controller] ☁️  Step 3/3: Uploading to GCS...');
      const uploadResults = await gcsService.uploadMultiple(
        renderResults.map(r => r.imageBuffer),
        carouselId
      );

      // 6. Build response with image URLs
      const images: GeneratedImage[] = config.slides.map((slide, index) => ({
        slideIndex: index,
        slideId: slide.id,
        url: uploadResults[index].url,
        fileName: uploadResults[index].fileName,
        width: renderResults[index].width,
        height: renderResults[index].height,
      }));

      const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);

      console.log('\n========================================');
      console.log(`[Controller] ✅ Carousel generation complete!`);
      console.log(`[Controller] ⏱️  Total time: ${elapsedTime}s`);
      console.log(`[Controller] 📊 Generated ${images.length} images`);
      console.log('========================================\n');

      const successResponse: GenerateCarouselSuccessResponse = {
        success: true,
        carouselId,
        images,
        generatedAt: new Date().toISOString(),
      };

      res.status(200).json(successResponse);
    } catch (error: any) {
      console.error('\n========================================');
      console.error('[Controller] ❌ Error generating carousel:');
      console.error(error);
      console.error('========================================\n');

      const errorResponse: GenerateCarouselErrorResponse = {
        success: false,
        error: 'Failed to generate carousel',
        details: error.message || String(error),
      };

      res.status(500).json(errorResponse);
    }
  }

  /**
   * GET /api/health
   * Health check endpoint
   */
  async healthCheck(_req: Request, res: Response): Promise<void> {
    console.log('[Controller] Health check requested');

    try {
      const puppeteerOk = await puppeteerService.healthCheck();
      const gcsOk = await gcsService.healthCheck();

      const allOk = puppeteerOk && gcsOk;

      res.status(allOk ? 200 : 503).json({
        status: allOk ? 'healthy' : 'unhealthy',
        services: {
          puppeteer: puppeteerOk ? 'ok' : 'error',
          gcs: gcsOk ? 'ok' : 'error',
        },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('[Controller] Health check error:', error);
      res.status(503).json({
        status: 'unhealthy',
        error: String(error),
        timestamp: new Date().toISOString(),
      });
    }
  }
}

// Singleton instance
export const carouselController = new CarouselController();
