import React from 'react';

/**
 * Centered responsive container maintaining an 8px grid alignment.
 */
export function Container({ children, className = '', ...props }) {
  return (
    <div
      className={`max-w-content mx-auto px-4 sm:px-6 lg:px-8 w-full ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
