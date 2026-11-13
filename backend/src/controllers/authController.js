import { User } from '../models/User.js';
import { generateToken, sendTokenCookie, clearTokenCookie } from '../utils/token.js';

/**
 * Register student
 * POST /api/auth/register
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check if email already registered
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered. Please log in instead.',
      });
    }

    // Role is always enforced as 'student' through the public endpoint
    const user = new User({
      name,
      email,
      phone: phone || '',
      password,
      role: 'student',
    });

    await user.save();

    // Generate JWT and send httpOnly cookie
    const token = generateToken(user);
    sendTokenCookie(res, token);

    return res.status(201).json({
      success: true,
      message: 'Registration successful! Welcome to SriManasa Academy.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Student & Admin Login
 * POST /api/auth/login
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user with password selected
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Wrong email or password',
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Your account is deactivated. Please contact administration.',
      });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Wrong email or password',
      });
    }

    // Generate JWT and send httpOnly cookie
    const token = generateToken(user);
    sendTokenCookie(res, token);

    return res.status(200).json({
      success: true,
      message: 'Login successful!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get current logged-in user profile
 * GET /api/auth/me
 */
export const getCurrentUser = async (req, res) => {
  // req.user is populated by requireAuth middleware
  return res.status(200).json({
    success: true,
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
      role: req.user.role,
    },
  });
};

/**
 * Logout
 * POST /api/auth/logout
 */
export const logout = async (req, res) => {
  clearTokenCookie(res);
  return res.status(200).json({
    success: true,
    message: 'Logged out successfully.',
  });
};
