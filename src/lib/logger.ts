/**
 * Structured Logger for Carousel API VPS
 */

export interface LogContext {
  correlationId?: string;
  carouselId?: string;
  workspaceId?: string;
  slideIndex?: number;
  operation?: string;
  durationMs?: number;
  [key: string]: unknown;
}

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class Logger {
  private service: string;
  private context: LogContext = {};

  constructor(service: string) {
    this.service = service;
  }

  setContext(ctx: LogContext): void {
    this.context = { ...this.context, ...ctx };
  }

  clearContext(): void {
    this.context = {};
  }

  getContext(): LogContext {
    return { ...this.context };
  }

  private formatLog(level: LogLevel, message: string, ctx?: LogContext, error?: Error): string {
    const entry = {
      timestamp: new Date().toISOString(),
      level,
      service: this.service,
      message,
      ...this.context,
      ...ctx,
      ...(error && { error: { name: error.name, message: error.message, stack: error.stack } })
    };
    return JSON.stringify(entry);
  }

  info(message: string, context?: LogContext): void {
    console.log(this.formatLog('info', message, context));
  }

  warn(message: string, context?: LogContext): void {
    console.warn(this.formatLog('warn', message, context));
  }

  error(message: string, context?: LogContext, error?: Error): void {
    console.error(this.formatLog('error', message, context, error));
  }

  debug(message: string, context?: LogContext): void {
    if (process.env.NODE_ENV !== 'production') {
      console.log(this.formatLog('debug', message, context));
    }
  }

  startTimer(operation: string): () => number {
    const start = Date.now();
    return () => {
      const durationMs = Date.now() - start;
      this.info(`${operation} completed`, { operation, durationMs });
      return durationMs;
    };
  }
}

export const logger = new Logger('carousel-api-vps');
export { Logger };
