import { Router } from 'express';
import { getDBStatus } from '../config/db.js';

const router = Router();

/**
 * GET /api/health
 * Public health check route to verify server status, uptime and environment
 */
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: 'healthy',
      service: 'srimanasa-online-test-backend',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
    },
  });
});

/**
 * GET /api/health/db
 * Dedicated route to verify MongoDB Atlas connection status
 */
router.get('/health/db', (req, res) => {
  const dbStatus = getDBStatus();

  if (dbStatus.isConnected) {
    return res.status(200).json({
      success: true,
      data: {
        database: 'MongoDB Atlas',
        status: 'connected',
        readyState: dbStatus.readyState,
        message: 'Database connection is active and healthy.',
        timestamp: new Date().toISOString(),
      },
    });
  }

  return res.status(503).json({
    success: false,
    data: {
      database: 'MongoDB Atlas',
      status: dbStatus.state,
      readyState: dbStatus.readyState,
      message: dbStatus.state === 'disconnected'
        ? 'Database is currently disconnected. Please check MONGODB_URI in backend/.env.'
        : `Database is in state: ${dbStatus.state}`,
      timestamp: new Date().toISOString(),
    },
  });
});

export default router;
