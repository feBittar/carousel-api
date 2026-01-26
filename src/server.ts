import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import routes from './routes';
import { puppeteerService } from './services/puppeteer.service';
import { logger } from './lib/logger';

// Load environment variables
dotenv.config();

// ============================================================================
// EXPRESS APP SETUP
// ============================================================================

const app: Application = express();
const PORT = process.env.PORT || 3001;

// ============================================================================
// MIDDLEWARE
// ============================================================================

// Security headers
app.use(helmet({
  contentSecurityPolicy: false, // Disable for API
}));

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5173', 'https://social.gevia.co'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (Puppeteer, mobile apps, curl)
    if (!origin) {
      console.log('[CORS] ✅ Allowing request with no origin (Puppeteer/curl)');
      return callback(null, true);
    }

    // Allow null origin (Puppeteer headless mode)
    if (origin === 'null') {
      console.log('[CORS] ✅ Allowing null origin (Puppeteer headless)');
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      console.log(`[CORS] ✅ Allowing whitelisted origin: ${origin}`);
      callback(null, true);
    } else {
      console.warn(`[CORS] ❌ Blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static file serving for carousel assets
app.use(express.static('public'));
app.use('/fonts', express.static('public/fonts'));
app.use('/svgs', express.static('public/svgs'));

// Request logging
app.use(morgan('combined'));

// Correlation ID middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const correlationId = (req.headers['x-correlation-id'] as string) ||
    `vps-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  logger.setContext({ correlationId });
  res.setHeader('x-correlation-id', correlationId);
  next();
});

// Request logging middleware
app.use((req: Request, _res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.path}`, { method: req.method, path: req.path });
  next();
});

// ============================================================================
// ROUTES
// ============================================================================

// API routes
app.use('/api', routes);

// Root endpoint
app.get('/', (_req: Request, res: Response) => {
  res.json({
    service: 'Carousel API VPS',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: 'GET /api/health',
      generate: 'POST /api/image-gen/generate-modular',
    },
  });
});

// ============================================================================
// ERROR HANDLING
// ============================================================================

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.path,
  });
});

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('\n[ERROR] Unhandled error:');
  console.error(err);

  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message,
  });
});

// ============================================================================
// SERVER STARTUP
// ============================================================================

async function startServer() {
  try {
    console.log('\n========================================');
    console.log('🚀 Starting Carousel API VPS...');
    console.log('========================================\n');

    // Initialize Puppeteer browser
    console.log('[Startup] Initializing Puppeteer...');
    await puppeteerService.initBrowser();

    // Start Express server
    app.listen(PORT, () => {
      console.log('\n========================================');
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🌐 Allowed origins: ${allowedOrigins.join(', ')}`);
      console.log('========================================\n');
    });
  } catch (error) {
    console.error('\n========================================');
    console.error('❌ Failed to start server:');
    console.error(error);
    console.error('========================================\n');
    process.exit(1);
  }
}

// Start the server
startServer();

// ============================================================================
// GRACEFUL SHUTDOWN
// ============================================================================

process.on('SIGINT', async () => {
  console.log('\n\n[Shutdown] Received SIGINT, shutting down gracefully...');
  await puppeteerService.closeBrowser();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n\n[Shutdown] Received SIGTERM, shutting down gracefully...');
  await puppeteerService.closeBrowser();
  process.exit(0);
});
