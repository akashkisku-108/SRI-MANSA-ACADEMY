import { useEffect } from 'react';

/**
 * Custom hook for dynamically updating page title and meta description for SEO.
 * @param {string} title
 * @param {string} [description]
 */
export function useDocumentTitle(title, description) {
  useEffect(() => {
    const baseTitle = 'Srimanasa Educational Academy';
    document.title = title ? `${title} | ${baseTitle}` : baseTitle;

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }
  }, [title, description]);
}
