import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';
import { User } from '../models/User.js';
import { COOKIE_NAME } from '../utils/token.js';

/**
 * Middleware: requireAuth
 * Verifies JWT token from httpOnly cookie or Bearer Authorization header.
 * Attaches authenticated user document to req.user.
 */
export const requireAuth = async (req, res, next) => {
  try {
    let token = req.cookies?.[COOKIE_NAME];

    // Fallback to Bearer token in Authorization header if present
    if (!token && req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please log in to continue.',
      });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, config.jwtSecret);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Your session has expired. Please log in again.',
        });
      }
      return res.status(401).json({
        success: false,
        message: 'Invalid session token. Please log in again.',
      });
    }

    // Fetch user from DB to ensure user still exists and is active
    const user = await User.findById(decoded.userId);
    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account not found or deactivated. Please contact support.',
      });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Middleware: requireAdmin
 * Requires user to have role 'admin'. Returns clear "not allowed" message to students.
 */
export const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required.',
    });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. You do not have permission to view or manage admin resources.',
    });
  }

  next();
};
