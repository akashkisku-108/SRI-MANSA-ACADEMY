import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollProgressBar
 * - Fixed 3px thin bar at top of page (z-index 60, above navbar)
 * - Gradient using brand primary to accent color with dark-mode tailored tokens
 * - Efficient scaleX() transform with transform-origin: left via requestAnimationFrame
 * - Pointer-events: none (never blocks clicks)
 * - Resets on route transition
 * - Hidden in admin panel / admin routes
 * - Respects prefers-reduced-motion (removes smoothing transition, still updates scale)
 * - role="progressbar" with aria-hidden="true" (purely decorative)
 */
export function ScrollProgressBar() {
  const barRef = useRef(null);
  const location = useLocation();

  // Exclude admin paths if any
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    if (isAdmin) return;

    let rafId = null;
    const bar = barRef.current;
    if (!bar) return;

    // Reset progress when route changes
    bar.style.transform = 'scaleX(0)';

    const updateScrollProgress = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      const docHeight = document.documentElement.scrollHeight || document.body.scrollHeight || 0;
      const winHeight = window.innerHeight || document.documentElement.clientHeight || 1;
      const scrollable = Math.max(1, docHeight - winHeight);

      const progress = Math.min(1, Math.max(0, scrollY / scrollable));
      bar.style.transform = `scaleX(${progress})`;
    };

    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        updateScrollProgress();
        rafId = null;
      });
    };

    const handleResize = () => {
      updateScrollProgress();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Initial check (after layout settles)
    updateScrollProgress();
    const timer = setTimeout(updateScrollProgress, 100);

    // Observe body height changes via ResizeObserver if available
    let resizeObserver = null;
    if (typeof ResizeObserver !== 'undefined' && document.body) {
      resizeObserver = new ResizeObserver(() => {
        updateScrollProgress();
      });
      resizeObserver.observe(document.body);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(timer);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [location.pathname, isAdmin]);

  if (isAdmin) return null;

  return (
    <div
      ref={barRef}
      role="progressbar"
      aria-hidden="true"
      className="scroll-progress-bar fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none origin-left"
      style={{
        transform: 'scaleX(0)',
        willChange: 'transform'
      }}
    />
  );
}
