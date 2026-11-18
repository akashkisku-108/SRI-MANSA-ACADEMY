import { galleryItems, previewGalleryIds } from '../data/gallery';

/**
 * Gallery Service Layer
 * Manages campus images, events, and category filtering.
 */
export const galleryService = {
  /**
   * Fetch all gallery items.
   * @returns {Promise<typeof galleryItems>}
   */
  async getAll() {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return [...galleryItems];
  },

  /**
   * Fetch gallery items filtered by category.
   * @param {string} category
   * @returns {Promise<typeof galleryItems>}
   */
  async getByCategory(category) {
    await new Promise((resolve) => setTimeout(resolve, 250));
    if (!category || category === 'All') {
      return [...galleryItems];
    }
    return galleryItems.filter((item) => item.category === category);
  },

  /**
   * Fetch curated preview gallery items for the homepage.
   * @param {number} [limit=6]
   * @returns {Promise<typeof galleryItems>}
   */
  async getPreview(limit = 6) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    if (previewGalleryIds && previewGalleryIds.length > 0) {
      const itemsMap = new Map(galleryItems.map((item) => [item.id, item]));
      const curated = previewGalleryIds
        .map((id) => itemsMap.get(id))
        .filter(Boolean)
        .slice(0, limit);
      if (curated.length > 0) return curated;
    }
    return galleryItems.slice(0, limit);
  }
};
