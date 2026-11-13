import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { config } from './src/config/index.js';
import { connectDB, disconnectDB } from './src/config/db.js';
import { corsMiddleware } from './src/middleware/cors.js';
import { notFoundHandler, errorHandler } from './src/middleware/errorHandler.js';
import healthRoutes from './src/routes/healthRoutes.js';
import authRoutes from './src/routes/authRoutes.js';

const app = express();

// 1. Security Headers via Helmet
app.use(helmet());

// 2. Restricted Cross-Origin Resource Sharing
app.use(corsMiddleware);

// 3. Body Parsing Middleware
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// 4. Cookie Parsing for httpOnly JWT authentication
app.use(cookieParser());

// 5. Mount API Routes
app.use('/api', healthRoutes);
app.use('/api/auth', authRoutes);

// 6. 404 Route Not Found Handler
app.use(notFoundHandler);

// 7. Global Centralized Error Handler
app.use(errorHandler);

// Start HTTP Server and connect to MongoDB
const server = app.listen(config.port, async () => {
  console.log(`\n=================================================`);
  console.log(`🚀 SriManasa Online Test Backend running!`);
  console.log(`📡 URL: http://localhost:${config.port}`);
  console.log(`🩺 Health check: http://localhost:${config.port}/api/health`);
  console.log(`📊 DB Health: http://localhost:${config.port}/api/health/db`);
  console.log(`🔒 Environment: ${config.nodeEnv}`);
  console.log(`🌐 Allowed CORS: ${config.allowedOrigins.join(', ')}`);
  console.log(`=================================================\n`);

  // Initialize MongoDB Atlas connection
  await connectDB();
});

// Handle graceful shutdown
const gracefulShutdown = async (signal) => {
  console.log(`\n[${signal}] Initiating graceful shutdown...`);
  await disconnectDB();
  server.close(() => {
    console.log('[Server] HTTP server closed gracefully.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

export default app;
