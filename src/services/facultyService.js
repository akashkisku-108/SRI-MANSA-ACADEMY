import { faculty } from '../data/faculty';

/**
 * Faculty Service Layer
 * Manages retrieval of academic faculty profiles.
 */
export const facultyService = {
  /**
   * Fetch all faculty members.
   * @returns {Promise<typeof faculty>}
   */
  async getAll() {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return [...faculty];
  },

  /**
   * Fetch featured faculty members for preview sections.
   * @param {number} [limit=4]
   * @returns {Promise<typeof faculty>}
   */
  async getFeatured(limit = 4) {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return faculty.slice(0, limit);
  }
};
