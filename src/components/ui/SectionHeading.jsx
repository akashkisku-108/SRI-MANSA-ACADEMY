import React from 'react';
import { Badge } from './Badge';

/**
 * Academic SectionHeading with eyebrow kicker, serif h2 heading, and supporting text.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center', // 'left' | 'center'
  theme = 'light', // 'light' | 'dark'
  className = '',
  titleClassName = '',
}) {
  const isCentered = align === 'center';
  const isDark = theme === 'dark';

  return (
    <div className={`mb-10 md:mb-14 ${isCentered ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'} ${className}`}>
      {eyebrow && (
        <div className={`mb-2.5 ${isCentered ? 'flex justify-center' : ''}`}>
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest ${
            isDark ? 'text-accent-300' : 'text-terracotta-700'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500 inline-block" aria-hidden="true" />
            {eyebrow}
          </span>
        </div>
      )}
      <h2
        className={`text-2xl sm:text-3xl lg:text-4xl font-serif tracking-tight leading-[1.2] ${
          isDark ? 'text-white' : 'text-primary-950 font-normal'
        } ${titleClassName}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3.5 text-base sm:text-lg leading-relaxed ${
            isDark ? 'text-neutral-300' : 'text-neutral-600'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
