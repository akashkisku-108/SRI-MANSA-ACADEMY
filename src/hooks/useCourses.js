import { useState, useEffect } from 'react';
import { coursesService } from '../services/coursesService';

/**
 * Custom hook to consume courses through the service layer.
 * @param {string} [classFilter='All']
 */
export function useCourses(classFilter = 'All') {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    coursesService.getByClass(classFilter)
      .then((data) => {
        if (isMounted) {
          setCourses(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Failed to load courses');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [classFilter]);

  return { courses, loading, error };
}

/**
 * Custom hook to retrieve a single course by ID.
 * @param {string} id
 */
export function useCourse(id) {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setCourse(null);
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);

    coursesService.getById(id)
      .then((data) => {
        if (isMounted) {
          setCourse(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Failed to fetch course details');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { course, loading, error };
}
