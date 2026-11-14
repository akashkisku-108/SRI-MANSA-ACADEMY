import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * CustomCursor
 * - Desktop only (matches '(pointer: fine) and (hover: hover)')
 * - Disabled on touch devices and when prefers-reduced-motion is active
 * - Pointer-events: none (never interferes with clicking)
 * - Normal cursor remains visible
 * - Follows mouse via requestAnimationFrame (exact dot, smoothly lagged ring)
 * - Expands over links, buttons, and cards
 * - Hides completely over text inputs, contenteditables, and login/admin pages
 * - Hides when mouse leaves window
 */
export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const location = useLocation();

  // Target mouse position
  const mousePos = useRef({ x: -100, y: -100 });
  // Interpolated ring position
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);

  // States
  const [cursorMode, setCursorMode] = useState('hidden'); // 'hidden' | 'default' | 'hover' | 'card'

  // Determine if on login or admin route
  const isAuthOrAdmin =
    location.pathname.startsWith('/admin') ||
    location.pathname === '/login' ||
    location.pathname === '/register';

  useEffect(() => {
    // 1. Guard against non-browser environments
    if (typeof window === 'undefined') return;

    // 2. Disable on touch devices (pointer: fine ensures real mouse/trackpad)
    const isMousePointer = window.matchMedia('(pointer: fine) and (hover: hover)').matches;
    if (!isMousePointer) return;

    // 3. Disable if prefers-reduced-motion is active
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // 4. Hide on auth and admin pages
    if (isAuthOrAdmin) {
      setCursorMode('hidden');
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let isVisible = false;

    // 60fps render loop with lerp smoothing on ring
    const render = () => {
      // Ring follows mouse with smooth 0.18 lerp delay
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18;

      dot.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisible) {
        isVisible = true;
        ringPos.current.x = e.clientX;
        ringPos.current.y = e.clientY;
      }

      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      // Hide over text inputs, select, textareas, contenteditable
      if (
        (target instanceof HTMLInputElement &&
          ['text', 'email', 'tel', 'password', 'search', 'number', 'url', 'date'].includes(target.type)) ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        target.isContentEditable ||
        target.closest('input, textarea, select, [contenteditable="true"]')
      ) {
        setCursorMode('hidden');
        return;
      }

      // Check for links, buttons, or clickable elements
      if (
        target.closest('a, button, [role="button"], input[type="submit"], input[type="button"]')
      ) {
        setCursorMode('hover');
        return;
      }

      // Check for interactive cards or articles
      if (
        target.closest('.interactive-card-wrapper, .rounded-card, article, .card-hover')
      ) {
        setCursorMode('card');
        return;
      }

      // Default standard state
      setCursorMode('default');
    };

    const handleMouseLeave = () => {
      isVisible = false;
      setCursorMode('hidden');
    };

    const handleMouseEnter = () => {
      setCursorMode('default');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isAuthOrAdmin]);

  // Don't render on auth or admin pages
  if (isAuthOrAdmin) return null;

  const isHidden = cursorMode === 'hidden';
  const isHover = cursorMode === 'hover';
  const isCard = cursorMode === 'card';

  return (
    <div
      className={`custom-cursor-container pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none transition-opacity duration-200 ${
        isHidden ? 'opacity-0' : 'opacity-100'
      }`}
      aria-hidden="true"
    >
      {/* 1. Exact Center Dot (6px) */}
      <div
        ref={dotRef}
        className={`custom-cursor-dot fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-terracotta-600 dark:bg-terracotta-400 will-change-transform transition-[opacity,transform] duration-150 ${
          isHover ? 'opacity-0 scale-50' : 'opacity-100 scale-100'
        }`}
      />

      {/* 2. Soft Lagged Ring */}
      <div
        ref={ringRef}
        className={`custom-cursor-ring fixed top-0 left-0 rounded-full border will-change-transform transition-[width,height,margin,border-color,background-color,transform] duration-200 ease-out ${
          isHover
            ? 'w-11 h-11 -ml-[22px] -mt-[22px] border-terracotta-500/80 bg-terracotta-500/15 dark:border-accent-400/80 dark:bg-accent-400/20 backdrop-blur-[0.5px] scale-105'
            : isCard
            ? 'w-9 h-9 -ml-[18px] -mt-[18px] border-terracotta-600/60 dark:border-terracotta-400/60 bg-terracotta-500/5 dark:bg-terracotta-400/10'
            : 'w-7 h-7 -ml-[14px] -mt-[14px] border-terracotta-600/40 dark:border-neutral-300/40 bg-transparent'
        }`}
      />
    </div>
  );
}
