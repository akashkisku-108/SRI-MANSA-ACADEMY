import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';

/**
 * Standard page layout with accessible skip link, sticky navbar, and footer.
 */
export function PageLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-surface-warm text-neutral-800">
      <ScrollToTop />

      {/* Accessible skip link for screen reader and keyboard navigators */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent-500 focus:text-primary-950 focus:font-bold focus:rounded focus:shadow-lg"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content" className="flex-1 focus:outline-none">
        {children}
      </main>

      <Footer />
    </div>
  );
}
