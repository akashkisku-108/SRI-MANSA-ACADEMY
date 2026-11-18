import { faculty, leadershipFaculty, teachingFaculty } from '../data/faculty';

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
   * Fetch senior faculty & leadership members.
   * @returns {Promise<typeof leadershipFaculty>}
   */
  async getLeadership() {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return [...leadershipFaculty];
  },

  /**
   * Fetch teaching faculty members.
   * @returns {Promise<typeof teachingFaculty>}
   */
  async getTeaching() {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return [...teachingFaculty];
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
