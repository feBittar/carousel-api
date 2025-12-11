import { Router } from 'express';
import { carouselController } from '../controllers/carousel.controller';

const router = Router();

/**
 * POST /api/image-gen/generate-modular
 * Gera carousel completo com múltiplos slides
 *
 * Body:
 * {
 *   "carouselId": "uuid",
 *   "workspaceId": "uuid",
 *   "config": {
 *     "slides": [
 *       {
 *         "id": "slide-1",
 *         "order": 0,
 *         "modules": {
 *           "viewport": { "backgroundColor": "#FFF" },
 *           "card": { "enabled": true, "width": 900, "height": 1200 },
 *           "textFields": { "texts": ["Hello World"] }
 *         }
 *       }
 *     ],
 *     "mode": "carousel"
 *   }
 * }
 *
 * Response:
 * {
 *   "success": true,
 *   "carouselId": "uuid",
 *   "images": [
 *     {
 *       "slideIndex": 0,
 *       "slideId": "slide-1",
 *       "url": "https://storage.googleapis.com/...",
 *       "fileName": "carousels/uuid/slide-1.png",
 *       "width": 1080,
 *       "height": 1440
 *     }
 *   ],
 *   "generatedAt": "2025-12-08T12:00:00Z"
 * }
 */
router.post('/generate-modular', (req, res) => {
  carouselController.generateCarousel(req, res);
});

export default router;
