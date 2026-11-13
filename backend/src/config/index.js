import dotenv from 'dotenv';
dotenv.config();

const port = parseInt(process.env.PORT || '5001', 10);
const nodeEnv = process.env.NODE_ENV || 'development';
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

// Parse comma-separated client URLs for CORS
const allowedOrigins = clientUrl
  .split(',')
  .map((url) => url.trim().replace(/\/$/, ''))
  .filter(Boolean);

export const config = {
  port,
  nodeEnv,
  isProduction: nodeEnv === 'production',
  allowedOrigins: allowedOrigins.length > 0 ? allowedOrigins : ['http://localhost:5173'],
  jwtSecret: process.env.JWT_SECRET || 'dev_secret_replace',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  mongodbUri: process.env.MONGODB_URI || '',
};
