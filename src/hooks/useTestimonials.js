import { useState, useEffect } from 'react';
import { testimonialsService } from '../services/testimonialsService';

/**
 * Custom hook to consume testimonials through the service layer.
 * @param {'student' | 'parent' | 'all'} [roleFilter='all']
 */
export function useTestimonials(roleFilter = 'all') {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    testimonialsService.getByRole(roleFilter)
      .then((data) => {
        if (isMounted) {
          setTestimonials(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Failed to load testimonials');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [roleFilter]);

  return { testimonials, loading, error };
}
