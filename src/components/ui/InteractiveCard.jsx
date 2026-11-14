import React from 'react';
import { useInteractiveCard } from '../../hooks/useInteractiveCard';
import { useScrollReveal } from './Reveal';

/**
 * InteractiveCard primitive wrapper.
 * Provides desktop 3D tilt + mouse-following spotlight glow in brand colors,
 * mobile 0.98 active press scale, and optional scroll reveal with staggered animation.
 */
export function InteractiveCard({
  children,
  className = '',
  as: Component = 'div',
  innerClassName = '',
  reveal = false,
  staggerIndex = 0,
  ...props
}) {
  const tiltRef = useInteractiveCard();
  const [revealRef, isRevealed] = useScrollReveal();

  const cappedIndex = Math.min(6, Math.max(0, staggerIndex));
  const staggerDelay = cappedIndex * 80;

  // Merge refs so both tilt and intersection observer attach to the outer element
  const setRefs = (element) => {
    tiltRef.current = element;
    revealRef.current = element;
  };

  const revealClasses = reveal
    ? `reveal-init ${isRevealed ? 'reveal-visible' : ''}`
    : '';

  return (
    <Component
      ref={setRefs}
      className={`interactive-card-wrapper ${revealClasses} ${className}`}
      style={{
        ...(reveal && staggerDelay > 0 ? { transitionDelay: `${staggerDelay}ms` } : {}),
        ...props.style,
      }}
      {...props}
    >
      <div className={`interactive-card-surface ${innerClassName}`}>
        {/* Spotlight Radial Glow Overlay */}
        <div className="interactive-card-spotlight pointer-events-none" aria-hidden="true" />
        {children}
      </div>
    </Component>
  );
}
