import { useState, useEffect } from 'react';
import { facultyService } from '../services/facultyService';

/**
 * Custom hook to consume faculty members through the service layer.
 * Returns the full roster as well as separated leadership and teaching cohorts.
 * @param {boolean} [featuredOnly=false]
 */
export function useFaculty(featuredOnly = false) {
  const [faculty, setFaculty] = useState([]);
  const [leadershipFaculty, setLeadershipFaculty] = useState([]);
  const [teachingFaculty, setTeachingFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetcher = featuredOnly
      ? facultyService.getFeatured(4)
      : facultyService.getAll();

    fetcher
      .then((data) => {
        if (isMounted) {
          setFaculty(data);
          setLeadershipFaculty(data.filter((m) => m.isLeadership));
          setTeachingFaculty(data.filter((m) => !m.isLeadership));
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Failed to load faculty profiles');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [featuredOnly]);

  return { faculty, leadershipFaculty, teachingFaculty, loading, error };
}
