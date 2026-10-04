import { useState, useEffect } from 'react';
import { resultsService } from '../services/resultsService';

/**
 * Custom hook to consume examination results and statistics through the service layer.
 * @param {string|number} [yearFilter='All']
 */
export function useResults(yearFilter = 'All') {
  const [stats, setStats] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    Promise.all([
      resultsService.getStats(),
      resultsService.getByYear(yearFilter)
    ])
      .then(([statsData, resultsData]) => {
        if (isMounted) {
          setStats(statsData);
          setResults(resultsData);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Failed to load results data');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [yearFilter]);

  return { stats, results, loading, error };
}
