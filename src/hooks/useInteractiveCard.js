import { useEffect, useRef } from 'react';

/**
 * Custom hook for Interactive 3D Card Tilt & Mouse Spotlight Glow.
 * 
 * Requirements:
 * - Desktop: Soft radial glow following the cursor in brand accent color + max 6deg 3D tilt with smooth return and translateY -4px.
 * - Mobile / Touch: No tilt or spotlight; quick press scale to 0.98.
 * - Performance: Animates ONLY transform and opacity via CSS variables & requestAnimationFrame (zero layout shift).
 * - Respects prefers-reduced-motion.
 */
export function useInteractiveCard() {
  const cardRef = useRef(null);
  const rafIdRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Check pointer fine / hover capability (Desktop only)
    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isDesktop) return;

    let targetRotateX = 0;
    let targetRotateY = 0;
    let targetLift = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;
    let currentLift = 0;
    let isHovering = false;

    // Animation Loop using rAF for butter-smooth 60fps interpolation
    const updateMotion = () => {
      // Ease toward target (interpolation factor 0.15)
      currentRotateX += (targetRotateX - currentRotateX) * 0.15;
      currentRotateY += (targetRotateY - currentRotateY) * 0.15;
      currentLift += (targetLift - currentLift) * 0.15;

      el.style.setProperty('--card-tilt-x', `${currentRotateX.toFixed(2)}deg`);
      el.style.setProperty('--card-tilt-y', `${currentRotateY.toFixed(2)}deg`);
      el.style.setProperty('--card-lift-y', `${currentLift.toFixed(2)}px`);

      // Keep looping while hovering or until returned near 0
      if (
        isHovering ||
        Math.abs(currentRotateX) > 0.05 ||
        Math.abs(currentRotateY) > 0.05 ||
        Math.abs(currentLift) > 0.05
      ) {
        rafIdRef.current = requestAnimationFrame(updateMotion);
      } else {
        // Snap to exact zero
        currentRotateX = 0;
        currentRotateY = 0;
        currentLift = 0;
        el.style.setProperty('--card-tilt-x', '0deg');
        el.style.setProperty('--card-tilt-y', '0deg');
        el.style.setProperty('--card-lift-y', '0px');
        rafIdRef.current = null;
      }
    };

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update spotlight position CSS variables
      el.style.setProperty('--spotlight-x', `${x}px`);
      el.style.setProperty('--spotlight-y', `${y}px`);

      // Calculate tilt angles (Max 6 degrees)
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const normalizedX = (x - centerX) / centerX; // -1 to 1
      const normalizedY = (y - centerY) / centerY; // -1 to 1

      // Tilt toward the cursor: cursor down tilts bottom forward, cursor right tilts right forward
      targetRotateX = -normalizedY * 6; // Max 6 deg
      targetRotateY = normalizedX * 6;  // Max 6 deg
      targetLift = -4; // -4px lift

      if (!rafIdRef.current) {
        rafIdRef.current = requestAnimationFrame(updateMotion);
      }
    };

    const handleMouseEnter = (e) => {
      isHovering = true;
      el.style.setProperty('--spotlight-opacity', '1');
      handleMouseMove(e);
    };

    const handleMouseLeave = () => {
      isHovering = false;
      el.style.setProperty('--spotlight-opacity', '0');
      targetRotateX = 0;
      targetRotateY = 0;
      targetLift = 0;

      if (!rafIdRef.current) {
        rafIdRef.current = requestAnimationFrame(updateMotion);
      }
    };

    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return cardRef;
}
