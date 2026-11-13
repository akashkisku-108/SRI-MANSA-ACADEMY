import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';

const COOKIE_NAME = 'sm_token';

/**
 * Generate signed JWT
 */
export const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user.id || user._id,
      email: user.email,
      role: user.role,
    },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn }
  );
};

/**
 * Send secure httpOnly cookie with JWT
 */
export const sendTokenCookie = (res, token) => {
  const isProduction = config.isProduction;

  // Max-age: 7 days in milliseconds
  const sevenDays = 7 * 24 * 60 * 60 * 1000;

  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProduction, // HTTPS only in production; allow HTTP on local network / dev
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: sevenDays,
    path: '/',
  });
};

/**
 * Clear the auth cookie on logout
 */
export const clearTokenCookie = (res) => {
  const isProduction = config.isProduction;

  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    path: '/',
  });
};

export { COOKIE_NAME };
