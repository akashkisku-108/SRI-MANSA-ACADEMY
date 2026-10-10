import React, { useEffect, useRef, useState } from 'react';

/**
 * Scroll Reveal Hook using IntersectionObserver
 * - Observes element entry into viewport (default: 15% visible)
 * - Triggers animation once only (unobserves upon reveal)
 * - Safe fallback: if IntersectionObserver is unsupported, reveals immediately
 * - Respects prefers-reduced-motion
 */
export function useScrollReveal(options = {}) {
  const { threshold = 0.15, rootMargin = '0px 0px -40px 0px' } = options;
  const ref = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    // If user prefers reduced motion, reveal immediately
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsRevealed(true);
      return;
    }

    // Fallback if IntersectionObserver is missing
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsRevealed(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    // If already in viewport (e.g. above the fold on initial load), trigger without delay
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return [ref, isRevealed];
}

/**
 * Reusable <Reveal> component:
 * - Slides up 24px and fades in over 600ms with ease-out curve
 * - Staggers child items when staggerIndex is passed (capped at 6 steps × 80ms)
 * - Content is rendered statically with no JS hiding if disabled or unsupported
 */
export function Reveal({
  children,
  as: Component = 'div',
  staggerIndex = 0,
  delay = 0,
  className = '',
  style = {},
  ...props
}) {
  const [ref, isRevealed] = useScrollReveal();

  // Cap stagger index at 6 steps (~480ms max wait)
  const cappedIndex = Math.min(6, Math.max(0, staggerIndex));
  const computedDelay = delay > 0 ? delay : cappedIndex * 80;

  return (
    <Component
      ref={ref}
      className={`reveal-init ${isRevealed ? 'reveal-visible' : ''} ${className}`}
      style={{
        ...style,
        ...(computedDelay > 0 && !isRevealed ? { transitionDelay: `${computedDelay}ms` } : {}),
        ...(computedDelay > 0 && isRevealed ? { transitionDelay: `${computedDelay}ms` } : {}),
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
