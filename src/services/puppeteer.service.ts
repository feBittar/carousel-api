import puppeteer, { Browser, Page } from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';

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

      // DEBUG: Save HTML to disk for testing outside Puppeteer
      const timestamp = Date.now();
      const debugPath = `/tmp/debug-slide-${timestamp}.html`;

      try {
        fs.writeFileSync(debugPath, html, 'utf-8');
        console.log('[Puppeteer] 💾 HTML saved for debugging:', debugPath);
      } catch (err) {
        console.warn('[Puppeteer] ⚠️ Failed to save debug HTML:', err);
      }

      // Load HTML content and wait for all network requests
      console.log('[Puppeteer] Loading HTML content...');
      await page.setContent(html, {
        waitUntil: 'networkidle0', // Wait until no network connections for 500ms
        timeout: 30000, // 30 seconds timeout
      });
      console.log('[Puppeteer] HTML loaded, network idle');

      // Wait for fonts to load (critical for text rendering!)
      console.log('[Puppeteer] Waiting for fonts to load...');
      await page.evaluate(() => {
        // @ts-ignore - document.fonts exists in browser context
        return document.fonts.ready;
      });
      console.log('[Puppeteer] Fonts loaded successfully');

      // Additional delay to ensure CSS animations and final rendering complete
      console.log('[Puppeteer] Waiting for final rendering (1s delay)...');
      await page.waitForTimeout(1000);
      console.log('[Puppeteer] Content fully loaded and ready for screenshot');

      // Take screenshot - Try body element first as fallback
      let imageBuffer: Buffer;

      try {
        console.log('[Puppeteer] Attempting body element screenshot (fallback method)...');
        const bodyElement = await page.$('body');

        if (bodyElement) {
          const bodyScreenshot = await bodyElement.screenshot({
            type: 'png',
            omitBackground: false  // Include background
          });
          console.log(`[Puppeteer] 📸 Body element screenshot taken: ${bodyScreenshot.length} bytes`);
          imageBuffer = bodyScreenshot as Buffer;
        } else {
          throw new Error('Body element not found');
        }
      } catch (bodyErr) {
        console.log('[Puppeteer] ⚠️ Body screenshot failed, using clip method:', bodyErr);

        // Fallback to clip method
        const clipScreenshot = await page.screenshot({
          type: 'png',
          clip: {
            x: 0,
            y: 0,
            width,
            height,
          },
          omitBackground: false,
        });
        console.log(`[Puppeteer] 📸 Clip screenshot taken: ${clipScreenshot.length} bytes`);
        imageBuffer = clipScreenshot as Buffer;
      }

      console.log(`[Puppeteer] ✅ Image rendered successfully (${imageBuffer.length} bytes)`);

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
