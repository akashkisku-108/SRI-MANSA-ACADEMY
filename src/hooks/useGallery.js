import { useState, useEffect } from 'react';
import { galleryService } from '../services/galleryService';

/**
 * Custom hook to consume gallery images through the service layer.
 * @param {string} [categoryFilter='All']
 */
export function useGallery(categoryFilter = 'All') {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    galleryService.getByCategory(categoryFilter)
      .then((data) => {
        if (isMounted) {
          setItems(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Failed to load gallery items');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [categoryFilter]);

  return { items, loading, error };
}
