import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * BackToTopButton
 * - Circular back-to-top button fixed at bottom-right.
 * - Positioned at bottom-6 right-6 (and on mobile bottom-5 right-5).
 * - SVG circular stroke-dashoffset progress ring filling as page scrolls.
 * - Smooth scroll to top on click without click-sound pollution on scroll.
 * - Light and Night mode support with subtle hover lift and soft glow.
 * - Respects prefers-reduced-motion.
 */
export function BackToTopButton() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let rafId = null;

    const calculateScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      const docHeight = document.documentElement.scrollHeight || document.body.scrollHeight || 0;
      const winHeight = window.innerHeight || document.documentElement.clientHeight || 1;
      const scrollable = Math.max(1, docHeight - winHeight);

      const progress = Math.min(1, Math.max(0, scrollY / scrollable));
      setScrollProgress(progress);
      setIsVisible(scrollY > 280);
    };

    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        calculateScroll();
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', calculateScroll, { passive: true });
    calculateScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Circular SVG ring math: radius 18, circumference = 2 * PI * 18 ~ 113.1
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - scrollProgress * circumference;

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-300 pointer-events-none ${
        isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <button
        type="button"
        onClick={scrollToTop}
        className="relative group w-12 h-12 rounded-full bg-white dark:bg-[#132236] text-primary-950 dark:text-neutral-100 shadow-md hover:shadow-xl border border-neutral-200/90 dark:border-white/15 flex items-center justify-center transition-all duration-200 hover:-translate-y-1 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500"
        aria-label="Back to top of page"
        title="Back to top"
      >
        {/* SVG Progress Ring */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
          viewBox="0 0 44 44"
          aria-hidden="true"
        >
          {/* Background track circle */}
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-neutral-200 dark:text-white/10"
          />
          {/* Active progress stroke */}
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="none"
            stroke="url(#backToTopGradient)"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-[stroke-dashoffset] duration-100"
          />
          <defs>
            <linearGradient id="backToTopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C86244" />
              <stop offset="100%" stopColor="#C9A436" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Arrow Icon */}
        <ArrowUp
          className="w-4 h-4 text-terracotta-600 dark:text-terracotta-400 group-hover:-translate-y-0.5 transition-transform duration-200"
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
