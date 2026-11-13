import { config } from '../config/index.js';

/**
 * 404 Route Not Found handler
 */
export function notFoundHandler(req, res, next) {
  res.status(404).json({
    success: false,
    error: {
      message: `Route not found: ${req.method} ${req.originalUrl}`,
      statusCode: 404,
    },
  });
}

/**
 * Global Centralized Error Handler
 */
export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || (err.name === 'ValidationError' ? 400 : 500);

  // Log error stack trace in development
  if (!config.isProduction) {
    console.error(`[Error] ${req.method} ${req.originalUrl}:`, err);
  }

  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message || 'Internal Server Error',
      statusCode,
      ...(config.isProduction ? {} : { stack: err.stack }),
    },
  });
}
