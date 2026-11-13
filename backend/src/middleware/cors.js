import cors from 'cors';
import { config } from '../config/index.js';

/**
 * Development Origins Pattern:
 * In development, allows localhost/127.0.0.1 on ports 5173, 5174, etc.,
 * and private local network IPs (e.g. 192.168.x.x, 10.x.x.x, 172.16-31.x.x) on Vite dev ports.
 */
function isAllowedDevOrigin(origin) {
  try {
    const url = new URL(origin);
    const hostname = url.hostname;
    const port = url.port;

    // Check if port is in typical frontend dev range (5173, 5174, 3000, etc.)
    const isDevPort = ['5173', '5174', '5175', '3000'].includes(port);

    // Localhost or loopback
    if ((hostname === 'localhost' || hostname === '127.0.0.1') && isDevPort) {
      return true;
    }

    // Local network IPs: 192.168.x.x, 10.x.x.x, 172.16-31.x.x
    const isLocalNetworkIP =
      /^192\.168\.\d{1,3}\.\d{1,3}$/.test(hostname) ||
      /^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname) ||
      /^172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}$/.test(hostname);

    // Tunnel domains for live sharing
    if (hostname.endsWith('.loca.lt') || hostname.endsWith('.trycloudflare.com')) {
      return true;
    }

    if (isLocalNetworkIP && isDevPort) {
      return true;
    }
  } catch (e) {
    return false;
  }
  return false;
}

/**
 * Restricted CORS configuration:
 * - In Development: allows configured CLIENT_URL, plus localhost:5173, localhost:5174, and local network IPs (e.g. 192.168.31.64:5174)
 * - In Production: strictly allows ONLY the configured CLIENT_URL from environment variables
 * - Always enables credentials for httpOnly authentication cookies
 */
export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // 1. Allow non-browser requests (curl, Postman, server-to-server)
    if (!origin) {
      return callback(null, true);
    }

    const cleanOrigin = origin.replace(/\/$/, '');

    // 2. Check explicitly configured CLIENT_URL(s)
    if (config.allowedOrigins.includes(cleanOrigin)) {
      return callback(null, true);
    }

    // 3. In Development: allow localhost 5173/5174 and local network IPs
    if (!config.isProduction && isAllowedDevOrigin(cleanOrigin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Set-Cookie'],
});
