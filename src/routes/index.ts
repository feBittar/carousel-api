import { Router } from 'express';
import generateRoutes from './generate.routes';
import { carouselController } from '../controllers/carousel.controller';

const router = Router();

// Health check route
router.get('/health', (req, res) => {
  carouselController.healthCheck(req, res);
});

// Image generation routes
router.use('/image-gen', generateRoutes);

export default router;
