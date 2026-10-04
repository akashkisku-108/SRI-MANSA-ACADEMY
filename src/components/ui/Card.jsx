import React from 'react';

/**
 * Card primitive with academic border tokens and subtle hover lift.
 */
export function Card({
  as: Component = 'div',
  children,
  hoverLift = true,
  bordered = true,
  padding = 'md',
  className = '',
  ...props
}) {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4 sm:p-5',
    md: 'p-6 sm:p-7',
    lg: 'p-8 sm:p-10',
  };

  const liftStyles = hoverLift
    ? 'transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-400/80 hover:shadow-card-hover'
    : 'transition-shadow duration-200';

  const borderStyles = bordered
    ? 'border border-neutral-200/90'
    : '';

  return (
    <Component
      className={`bg-white rounded-card shadow-card ${liftStyles} ${borderStyles} ${paddingStyles[padding] || paddingStyles.md} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
