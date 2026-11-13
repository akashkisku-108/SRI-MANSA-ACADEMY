import mongoose from 'mongoose';
import { config } from './index.js';

let isConnecting = false;

// Setup MongoDB event listeners
mongoose.connection.on('connected', () => {
  console.log('✅ [MongoDB] Connection established successfully.');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ [MongoDB] Connection error occurred:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ [MongoDB] Disconnected from database.');
});

mongoose.connection.on('reconnected', () => {
  console.log('🔄 [MongoDB] Reconnected to database.');
});

/**
 * Connect to MongoDB Atlas
 * - Reads connection string exclusively from process.env (config.mongodbUri)
 * - Never prints the connection string in the logs
 * - Handles missing URI and connection errors gracefully without uncaught crashes
 */
export async function connectDB() {
  const uri = config.mongodbUri.trim();

  if (!uri) {
    console.warn('\n⚠️ [MongoDB] MONGODB_URI is empty in backend/.env.');
    console.warn('💡 Please paste your MongoDB Atlas connection string into line 9 of backend/.env.');
    console.warn('ℹ️ The server will continue running, and you can test database status at /api/health/db.\n');
    return false;
  }

  if (isConnecting || mongoose.connection.readyState === 1) {
    return true;
  }

  try {
    isConnecting = true;
    console.log('⏳ [MongoDB] Connecting to MongoDB Atlas...');

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of hanging
      autoIndex: !config.isProduction, // Build indexes in dev, manage externally in high-scale prod
    });

    isConnecting = false;
    return true;
  } catch (err) {
    isConnecting = false;
    console.error('\n❌ [MongoDB] Failed to connect to MongoDB Atlas:');
    console.error(`👉 Reason: ${err.message}`);
    console.error('💡 Please verify your database username, password, and Atlas IP Network Access list (allow current IP or 0.0.0.0/0).\n');
    return false;
  }
}

/**
 * Helper to get human-readable DB connection status
 */
export function getDBStatus() {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  const stateCode = mongoose.connection.readyState;
  return {
    isConnected: stateCode === 1,
    state: states[stateCode] || 'unknown',
    readyState: stateCode,
  };
}

/**
 * Graceful database disconnect on server termination
 */
export async function disconnectDB() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    console.log('[MongoDB] Connection closed gracefully.');
  }
}
