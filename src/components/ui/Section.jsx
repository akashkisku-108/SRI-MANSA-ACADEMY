import React from 'react';
import { Container } from './Container';

/**
 * Semantic Section container with alternating backgrounds for rhythm.
 */
export function Section({
  id,
  children,
  background = 'warm', // 'warm' | 'white' | 'navy' | 'subtle'
  spacing = 'normal', // 'tight' | 'normal' | 'spacious'
  className = '',
  containerClassName = '',
  withContainer = true,
  ...props
}) {
  const backgrounds = {
    warm: 'bg-surface-warm text-neutral-800',
    white: 'bg-white text-neutral-800',
    navy: 'bg-primary-950 text-white',
    subtle: 'bg-neutral-100 text-neutral-800',
    primary: 'bg-primary-900 text-white',
  };

  const spacings = {
    tight: 'py-10 md:py-14',
    normal: 'py-16 md:py-20 lg:py-24',
    spacious: 'py-20 md:py-28 lg:py-32',
  };

  const content = withContainer ? (
    <Container className={containerClassName}>{children}</Container>
  ) : (
    children
  );

  return (
    <section
      id={id}
      className={`relative scroll-mt-20 hover-darken-section ${backgrounds[background] || backgrounds.warm} ${spacings[spacing] || spacings.normal} ${className}`}
      {...props}
    >
      {content}
    </section>
  );
}
