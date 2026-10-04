import { courses } from '../data/courses';

/**
 * Courses Service Layer
 * Abstracts data access for academic courses. Can be seamlessly upgraded to REST/GraphQL APIs.
 */
export const coursesService = {
  /**
   * Fetch all active course offerings.
   * @returns {Promise<typeof courses>}
   */
  async getAll() {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return [...courses];
  },

  /**
   * Fetch a specific course by unique ID.
   * @param {string} id
   * @returns {Promise<typeof courses[0] | null>}
   */
  async getById(id) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const course = courses.find((c) => c.id === id);
    return course ? { ...course } : null;
  },

  /**
   * Fetch courses filtered by class category.
   * @param {string} classCategory
   * @returns {Promise<typeof courses>}
   */
  async getByClass(classCategory) {
    await new Promise((resolve) => setTimeout(resolve, 250));
    if (!classCategory || classCategory === 'All') {
      return [...courses];
    }
    return courses.filter((c) => c.classCategory === classCategory);
  },

  /**
   * Fetch featured courses for home page preview.
   * @param {number} [limit=4]
   * @returns {Promise<typeof courses>}
   */
  async getFeatured(limit = 4) {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return courses.filter((c) => c.isFeatured).slice(0, limit);
  }
};
