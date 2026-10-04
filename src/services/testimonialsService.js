import { testimonials } from '../data/testimonials';

/**
 * Testimonials Service Layer
 * Fetches verified student and parent reviews.
 */
export const testimonialsService = {
  /**
   * Fetch all testimonials.
   * @returns {Promise<typeof testimonials>}
   */
  async getAll() {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return [...testimonials];
  },

  /**
   * Fetch testimonials by role: 'student' or 'parent'.
   * @param {'student' | 'parent'} role
   * @returns {Promise<typeof testimonials>}
   */
  async getByRole(role) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    if (!role || role === 'all') {
      return [...testimonials];
    }
    return testimonials.filter((t) => t.role === role);
  }
};
