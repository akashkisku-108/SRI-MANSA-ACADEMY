import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { ClickSoundProvider } from './components/ui/ClickSoundProvider';
import { ScrollProgressBar } from './components/ui/ScrollProgressBar';
import { CustomCursor } from './components/ui/CustomCursor';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

import Home from './pages/Home';
const About = lazy(() => import('./pages/About'));
const Courses = lazy(() => import('./pages/Courses')); // Preserved for future unlocking
const Faculty = lazy(() => import('./pages/Faculty')); // Preserved for future unlocking
const Results = lazy(() => import('./pages/Results')); // Preserved for future unlocking
const Gallery = lazy(() => import('./pages/Gallery')); // Preserved for future unlocking
const Contact = lazy(() => import('./pages/Contact'));
const Admission = lazy(() => import('./pages/Admission'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ComingSoon = lazy(() => import('./pages/ComingSoon'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));

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
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          {/* Scroll Progress Bar (3px fixed at top) */}
          <ScrollProgressBar />
          {/* Global click sound & haptic provider */}
          <ClickSoundProvider />
          {/* Custom Desktop Smooth Cursor */}
          <CustomCursor />
          <Suspense fallback={<PageFallbackLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              {/* Temporarily locked sections showing dedicated Coming Soon state */}
              <Route path="/courses" element={<ComingSoon sectionKey="programs" />} />
              <Route path="/programs" element={<ComingSoon sectionKey="programs" />} />
              <Route path="/faculty" element={<Faculty />} />
              <Route path="/results" element={<ComingSoon sectionKey="results" />} />
              <Route path="/gallery" element={<Gallery />} />

              {/* Authentication Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin/login" element={<AdminLogin />} />

              <Route path="/contact" element={<Contact />} />
              <Route path="/admission" element={<Admission />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
