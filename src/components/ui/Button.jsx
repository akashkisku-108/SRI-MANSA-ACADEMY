import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Reusable Button primitive with academic styling tokens, focus states, and loading spinner.
 */
export function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className = '',
  children,
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-150 select-none rounded-button focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.99]";

  const variantStyles = {
    // Deep Indigo Academic Primary
    primary: "bg-primary-900 text-white hover:bg-primary-800 shadow-sm focus-visible:ring-primary-700 active:bg-primary-950",
    // Terracotta Academic Callout
    terracotta: "bg-terracotta-600 text-white hover:bg-terracotta-700 font-semibold shadow-sm focus-visible:ring-terracotta-500",
    // Muted Turmeric Gold Accent
    accent: "bg-accent-500 text-neutral-950 hover:bg-accent-400 font-medium shadow-sm focus-visible:ring-accent-500 active:bg-accent-600",
    // Secondary with dignified warm border
    secondary: "bg-white text-primary-900 border border-neutral-300 hover:bg-neutral-100 hover:border-neutral-400 shadow-sm focus-visible:ring-primary-700",
    // Ghost transparent button
    ghost: "bg-transparent text-primary-900 hover:bg-neutral-200/50 focus-visible:ring-primary-700",
    // White card style on dark backgrounds
    white: "bg-white text-primary-900 hover:bg-neutral-100 shadow-sm focus-visible:ring-white",
    // Outline white on dark
    outlineWhite: "bg-transparent text-neutral-100 border border-white/30 hover:bg-white/10 focus-visible:ring-white",
  };

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 gap-1.5 min-h-[36px]",
    md: "text-sm px-5 py-2.5 gap-2 min-h-[44px]", // 44px touch target
    lg: "text-base px-7 py-3.5 gap-2.5 min-h-[48px]",
  };

  return (
    <Component
      className={`${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${sizeStyles[size] || sizeStyles.md} ${className}`}
      disabled={Component === 'button' ? (disabled || isLoading) : undefined}
      aria-disabled={disabled || isLoading ? true : undefined}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-current" aria-hidden="true" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {LeftIcon && <LeftIcon className="w-4 h-4 shrink-0" aria-hidden="true" />}
          <span>{children}</span>
          {RightIcon && <RightIcon className="w-4 h-4 shrink-0" aria-hidden="true" />}
        </>
      )}
    </Component>
  );
}
