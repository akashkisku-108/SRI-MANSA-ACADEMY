import React, { forwardRef } from 'react';

/**
 * FormField wrapper providing accessible label, help text, error message, and char counter.
 */
export function FormField({
  id,
  label,
  required = false,
  error,
  helpText,
  charCount,
  maxChars,
  children,
  className = '',
}) {
  const errorId = error ? `${id}-error` : undefined;
  const helpId = helpText ? `${id}-help` : undefined;
  const describedBy = [errorId, helpId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="text-sm font-semibold text-neutral-800 flex items-center gap-1 select-none"
        >
          {label}
          {required && (
            <span className="text-red-600 font-bold" title="Required field" aria-hidden="true">*</span>
          )}
        </label>
        {typeof charCount === 'number' && maxChars && (
          <span
            className={`text-xs ${
              charCount > maxChars ? 'text-red-600 font-semibold' : 'text-neutral-500'
            }`}
            aria-live="polite"
          >
            {charCount}/{maxChars}
          </span>
        )}
      </div>

      {/* Clone children to inject accessibility attributes */}
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child, {
          id,
          'aria-required': required ? 'true' : undefined,
          'aria-invalid': error ? 'true' : 'false',
          'aria-describedby': describedBy,
        });
      })}

      {error ? (
        <p id={errorId} className="text-xs font-medium text-red-600 flex items-center gap-1" role="alert">
          <span aria-hidden="true">⚠</span> {error}
        </p>
      ) : helpText ? (
        <p id={helpId} className="text-xs text-neutral-500">
          {helpText}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Styled accessible text input primitive.
 */
export const Input = forwardRef(function Input(
  { className = '', hasError = false, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={`w-full min-h-[44px] px-3.5 py-2.5 text-sm text-neutral-900 bg-white border rounded-button transition-colors duration-150 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:bg-neutral-100 disabled:cursor-not-allowed ${
        hasError
          ? 'border-red-500 focus:border-red-500 focus:ring-red-400'
          : 'border-neutral-300 focus:border-accent-500 focus:ring-accent-400/50'
      } ${className}`}
      {...props}
    />
  );
});

/**
 * Styled accessible select dropdown primitive.
 */
export const Select = forwardRef(function Select(
  { className = '', hasError = false, children, ...props },
  ref
) {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={`w-full min-h-[44px] px-3.5 py-2.5 text-sm text-neutral-900 bg-white border rounded-button appearance-none pr-10 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:bg-neutral-100 disabled:cursor-not-allowed ${
          hasError
            ? 'border-red-500 focus:border-red-500 focus:ring-red-400'
            : 'border-neutral-300 focus:border-accent-500 focus:ring-accent-400/50'
        } ${className}`}
        {...props}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-500">
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
});

/**
 * Styled accessible textarea primitive.
 */
export const Textarea = forwardRef(function Textarea(
  { className = '', hasError = false, rows = 4, ...props },
  ref
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={`w-full p-3 text-sm text-neutral-900 bg-white border rounded-button transition-colors duration-150 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:bg-neutral-100 disabled:cursor-not-allowed resize-y ${
        hasError
          ? 'border-red-500 focus:border-red-500 focus:ring-red-400'
          : 'border-neutral-300 focus:border-accent-500 focus:ring-accent-400/50'
      } ${className}`}
      {...props}
    />
  );
});
