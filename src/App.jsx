import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

// Lazy-loaded route pages for code-splitting and instant initial page load
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Courses = lazy(() => import('./pages/Courses')); // Preserved for future unlocking
const Faculty = lazy(() => import('./pages/Faculty')); // Preserved for future unlocking
const Results = lazy(() => import('./pages/Results')); // Preserved for future unlocking
const Gallery = lazy(() => import('./pages/Gallery')); // Preserved for future unlocking
const Contact = lazy(() => import('./pages/Contact'));
const Admission = lazy(() => import('./pages/Admission'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ComingSoon = lazy(() => import('./pages/ComingSoon'));

/**
 * Fallback loading spinner during route bundle chunk loading
 */
function PageFallbackLoader() {
  return (
    <div
      className="min-h-screen bg-surface-warm flex flex-col items-center justify-center p-6 text-center"
      role="status"
      aria-label="Loading page content"
    >
      <div className="h-14 px-4 py-2 rounded-xl bg-white flex items-center justify-center mb-4 shadow-md border border-neutral-200 animate-pulse">
        <img
          src="/srimanasa-logo.png"
          alt="Srimanasa Educational Academy"
          className="h-10 w-auto object-contain"
        />
      </div>
      <div className="flex items-center gap-2 text-primary-900 font-serif font-bold text-lg mb-1">
        <Loader2 className="w-4 h-4 animate-spin text-accent-600" aria-hidden="true" />
        <span>Srimanasa Educational Academy</span>
      </div>
      <p className="text-xs text-neutral-500">Preparing curriculum details...</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageFallbackLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* Temporarily locked sections showing dedicated Coming Soon state */}
          <Route path="/courses" element={<ComingSoon sectionKey="programs" />} />
          <Route path="/programs" element={<ComingSoon sectionKey="programs" />} />
          <Route path="/faculty" element={<ComingSoon sectionKey="faculty" />} />
          <Route path="/results" element={<ComingSoon sectionKey="results" />} />
          <Route path="/gallery" element={<ComingSoon sectionKey="gallery" />} />
          
          <Route path="/contact" element={<Contact />} />
          <Route path="/admission" element={<Admission />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
