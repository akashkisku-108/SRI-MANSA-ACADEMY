import { z } from 'zod';

export const registerSchema = z.object({
  name: z
    .string({ required_error: 'Full name is required' })
    .trim()
    .min(2, 'Name must be at least 2 characters long')
    .max(60, 'Name cannot exceed 60 characters'),
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .email('Please enter a valid email address')
    .toLowerCase(),
  phone: z
    .string()
    .trim()
    .optional()
    .default(''),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, 'Password must be at least 6 characters long')
    .max(100, 'Password cannot exceed 100 characters'),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .email('Please enter a valid email address')
    .toLowerCase(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, 'Password cannot be empty'),
});

/**
 * Express middleware to validate request body against a Zod schema
 */
export const validateBody = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const issues = result.error.issues || result.error.errors || [];
    const firstError = issues[0]?.message || 'Invalid input data';
    return res.status(400).json({
      success: false,
      message: firstError,
      errors: issues.map((e) => ({
        field: e.path ? e.path.join('.') : '',
        message: e.message,
      })),
    });
  }
  req.body = result.data;
  next();
};
