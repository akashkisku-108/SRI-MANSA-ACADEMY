import { useState, useEffect } from 'react';
import { siteConfigService } from '../services/siteConfigService';

/**
 * Custom hook to consume global academy site configuration.
 */
export function useSiteConfig() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    siteConfigService.getConfig()
      .then((data) => {
        if (isMounted) {
          setConfig(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Failed to load site config');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { config, loading, error };
}
