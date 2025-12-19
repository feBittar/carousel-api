import { Storage, Bucket } from '@google-cloud/storage';

/**
 * Resultado do upload de uma imagem
 */
export interface UploadResult {
  url: string;
  fileName: string;
  bucket: string;
}

/**
 * Google Cloud Storage Service
 * Faz upload de imagens para o Google Cloud Storage
 */
export class GcsService {
  private storage: Storage;
  private bucket: Bucket;
  private bucketName: string;

  constructor() {
    // Initialize Google Cloud Storage client
    this.storage = new Storage({
      projectId: process.env.GCS_PROJECT_ID,
      keyFilename: process.env.GCS_KEY_FILE, // Path to service account JSON
    });

    this.bucketName = process.env.GCS_BUCKET_NAME || 'gevia-carousel-images';
    this.bucket = this.storage.bucket(this.bucketName);

    console.log(`[GCS] Initialized with bucket: ${this.bucketName}`);
  }

  /**
   * Faz upload de uma imagem para o GCS
   * @param imageBuffer Buffer da imagem PNG
   * @param fileName Nome do arquivo (sem extensão)
   * @param carouselId ID do carousel (para organizar em pastas)
   * @returns URL pública da imagem
   */
  async uploadImage(
    imageBuffer: Buffer,
    fileName: string,
    carouselId: string
  ): Promise<UploadResult> {
    console.log(`[GCS] Uploading image: ${fileName}...`);

    try {
      // Generate file path: carousels/{carouselId}/{fileName}.png
      const filePath = `carousels/${carouselId}/${fileName}.png`;

      const file = this.bucket.file(filePath);

      // Upload buffer to GCS
      await file.save(imageBuffer, {
        metadata: {
          contentType: 'image/png',
          cacheControl: 'public, max-age=31536000', // Cache for 1 year
        },
        // Don't use 'public: true' - it uses legacy ACLs
        // Use makePublic() instead for uniform bucket-level access
      });

      // Make file publicly accessible (works with uniform bucket-level access)
      await file.makePublic();

      // Get public URL
      const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${filePath}`;

      console.log(`[GCS] ✅ Image uploaded successfully: ${publicUrl}`);

      return {
        url: publicUrl,
        fileName: filePath,
        bucket: this.bucketName,
      };
    } catch (error) {
      console.error(`[GCS] ❌ Error uploading image:`, error);
      throw new Error(`Failed to upload image to GCS: ${error}`);
    }
  }

  /**
   * Faz upload de múltiplas imagens em batch
   * @param imageBuffers Array de buffers de imagens
   * @param carouselId ID do carousel
   * @returns Array de URLs públicas
   */
  async uploadMultiple(
    imageBuffers: Buffer[],
    carouselId: string
  ): Promise<UploadResult[]> {
    console.log(`[GCS] Uploading ${imageBuffers.length} images in batch...`);

    const results: UploadResult[] = [];

    for (let i = 0; i < imageBuffers.length; i++) {
      const fileName = `slide-${i + 1}`;
      const result = await this.uploadImage(imageBuffers[i], fileName, carouselId);
      results.push(result);
    }

    console.log(`[GCS] ✅ Batch upload complete: ${results.length} images`);
    return results;
  }

  /**
   * Deleta uma imagem do GCS
   * @param fileName Nome completo do arquivo (com path)
   */
  async deleteImage(fileName: string): Promise<void> {
    console.log(`[GCS] Deleting image: ${fileName}...`);

    try {
      await this.bucket.file(fileName).delete();
      console.log(`[GCS] ✅ Image deleted successfully`);
    } catch (error) {
      console.error(`[GCS] ❌ Error deleting image:`, error);
      throw new Error(`Failed to delete image from GCS: ${error}`);
    }
  }

  /**
   * Deleta todos os arquivos de um carousel
   * @param carouselId ID do carousel
   */
  async deleteCarousel(carouselId: string): Promise<void> {
    console.log(`[GCS] Deleting all images for carousel: ${carouselId}...`);

    try {
      const prefix = `carousels/${carouselId}/`;
      const [files] = await this.bucket.getFiles({ prefix });

      if (files.length === 0) {
        console.log(`[GCS] No files found for carousel: ${carouselId}`);
        return;
      }

      // Delete all files
      await Promise.all(files.map(file => file.delete()));

      console.log(`[GCS] ✅ Deleted ${files.length} images for carousel: ${carouselId}`);
    } catch (error) {
      console.error(`[GCS] ❌ Error deleting carousel images:`, error);
      throw new Error(`Failed to delete carousel images from GCS: ${error}`);
    }
  }

  /**
   * Health check - verifica se consegue acessar o bucket
   */
  async healthCheck(): Promise<boolean> {
    try {
      const [exists] = await this.bucket.exists();

      if (!exists) {
        console.error(`[GCS] ❌ Bucket does not exist: ${this.bucketName}`);
        return false;
      }

      console.log('[GCS] ✅ Health check passed');
      return true;
    } catch (error) {
      console.error('[GCS] ❌ Health check failed:', error);
      return false;
    }
  }
}

// Singleton instance
export const gcsService = new GcsService();
