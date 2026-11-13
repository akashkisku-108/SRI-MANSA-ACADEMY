import { Router } from 'express';
import {
  register,
  login,
  getCurrentUser,
  logout,
} from '../controllers/authController.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';
import { validateBody, registerSchema, loginSchema } from '../middleware/validate.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Public routes with rate limiting and validation
router.post('/register', authLimiter, validateBody(registerSchema), register);
router.post('/login', authLimiter, validateBody(loginSchema), login);

// Authenticated user routes
router.get('/me', requireAuth, getCurrentUser);
router.post('/logout', requireAuth, logout);

// Protected test routes for verification
router.get('/test/protected', requireAuth, (req, res) => {
  res.json({
    success: true,
    message: `Hello ${req.user.name}, you are authenticated as ${req.user.role}!`,
  });
});

router.get('/test/admin-only', requireAuth, requireAdmin, (req, res) => {
  res.json({
    success: true,
    message: `Welcome Admin ${req.user.name}. You have access to administrative controls.`,
  });
});

export default router;
