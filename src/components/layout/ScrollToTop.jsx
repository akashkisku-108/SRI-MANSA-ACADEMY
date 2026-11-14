import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component:
 * - Scrolls window to top on every route change.
 * - If URL has a hash (e.g. #demo-class or #main-content), smoothly scrolls to that element.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Allow DOM to settle before locating element
      const targetId = hash.replace(/^#/, '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        return;
      }
      // If element not ready yet, retry once after short delay
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      });
    }
  }, [pathname, hash]);

  return null;
}
