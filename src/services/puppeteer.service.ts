import puppeteer, { Browser, Page } from 'puppeteer';

/**
 * Resultado da renderização de uma imagem
 */
export interface RenderResult {
  imageBuffer: Buffer;
  width: number;
  height: number;
}

/**
 * Puppeteer Service
 * Renderiza HTML em imagens usando headless Chrome
 */
export class PuppeteerService {
  private browser: Browser | null = null;

  /**
   * Inicializa o browser Puppeteer
   */
  async initBrowser(): Promise<void> {
    if (this.browser) {
      console.log('[Puppeteer] Browser already initialized');
      return;
    }

    console.log('[Puppeteer] Launching browser...');
    this.browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
      ],
    });

    console.log('[Puppeteer] ✅ Browser launched successfully');
  }

  /**
   * Fecha o browser
   */
  async closeBrowser(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      console.log('[Puppeteer] Browser closed');
    }
  }

  /**
   * Renderiza HTML em uma imagem
   * @param html HTML string completo
   * @param width Largura da viewport (padrão: 1080px)
   * @param height Altura da viewport (padrão: 1440px)
   * @returns Buffer da imagem PNG
   */
  async renderHtmlToImage(
    html: string,
    width: number = 1080,
    height: number = 1440
  ): Promise<RenderResult> {
    if (!this.browser) {
      await this.initBrowser();
    }

    console.log(`[Puppeteer] Rendering HTML to image (${width}x${height})...`);

    const page: Page = await this.browser!.newPage();

    try {
      // Set viewport dimensions
      await page.setViewport({
        width,
        height,
        deviceScaleFactor: 2, // 2x for retina quality
      });

      // Load HTML content
      await page.setContent(html, {
        waitUntil: ['load', 'networkidle0'],
        timeout: 30000,
      });

      // Wait for fonts to load (important!)
      await page.evaluate(() => {
        return document.fonts.ready;
      });

      // Small delay to ensure everything is rendered
      await page.waitForTimeout(500);

      // Take screenshot
      const imageBuffer = await page.screenshot({
        type: 'png',
        clip: {
          x: 0,
          y: 0,
          width,
          height,
        },
        omitBackground: false,
      });

      console.log('[Puppeteer] ✅ Image rendered successfully');

      return {
        imageBuffer: imageBuffer as Buffer,
        width,
        height,
      };
    } catch (error) {
      console.error('[Puppeteer] ❌ Error rendering image:', error);
      throw new Error(`Failed to render image: ${error}`);
    } finally {
      await page.close();
    }
  }

  /**
   * Renderiza múltiplos HTMLs em imagens (batch)
   * @param htmlSlides Array de HTML strings
   * @param width Largura da viewport
   * @param height Altura da viewport
   * @returns Array de buffers de imagens
   */
  async renderMultiple(
    htmlSlides: string[],
    width: number = 1080,
    height: number = 1440
  ): Promise<RenderResult[]> {
    console.log(`[Puppeteer] Rendering ${htmlSlides.length} images in batch...`);

    const results: RenderResult[] = [];

    for (let i = 0; i < htmlSlides.length; i++) {
      console.log(`[Puppeteer] Rendering slide ${i + 1}/${htmlSlides.length}...`);
      const result = await this.renderHtmlToImage(htmlSlides[i], width, height);
      results.push(result);
    }

    console.log(`[Puppeteer] ✅ Batch rendering complete: ${results.length} images`);
    return results;
  }

  /**
   * Health check - verifica se o browser está funcionando
   */
  async healthCheck(): Promise<boolean> {
    try {
      if (!this.browser) {
        await this.initBrowser();
      }

      const page = await this.browser!.newPage();
      await page.setContent('<html><body>Health Check</body></html>');
      await page.close();

      console.log('[Puppeteer] ✅ Health check passed');
      return true;
    } catch (error) {
      console.error('[Puppeteer] ❌ Health check failed:', error);
      return false;
    }
  }
}

// Singleton instance
export const puppeteerService = new PuppeteerService();

// Cleanup on process exit
process.on('SIGINT', async () => {
  console.log('[Puppeteer] Shutting down...');
  await puppeteerService.closeBrowser();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('[Puppeteer] Shutting down...');
  await puppeteerService.closeBrowser();
  process.exit(0);
});
