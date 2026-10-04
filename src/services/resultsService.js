import { resultsStats, studentResults } from '../data/results';

/**
 * Results Service Layer
 * Manages achievement metrics and historical examination results with year filtering.
 */
export const resultsService = {
  /**
   * Fetch statistical summary cards.
   * @returns {Promise<typeof resultsStats>}
   */
  async getStats() {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return [...resultsStats];
  },

  /**
   * Fetch student results optionally filtered by examination year.
   * @param {number|string} [year]
   * @returns {Promise<typeof studentResults>}
   */
  async getByYear(year) {
    await new Promise((resolve) => setTimeout(resolve, 350));
    if (!year || year === 'All' || year === 'all') {
      return [...studentResults];
    }
    const targetYear = Number(year);
    return studentResults.filter((r) => r.year === targetYear);
  },

  /**
   * Fetch highlighted/featured student results for homepage strip.
   * @param {number} [limit=4]
   * @returns {Promise<typeof studentResults>}
   */
  async getFeatured(limit = 4) {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return studentResults.filter((r) => r.isFeatured).slice(0, limit);
  }
};
