import React from 'react';

/**
 * Academic Badge pill for tags, ranks, and categories.
 */
export function Badge({
  children,
  variant = 'gold',
  size = 'md',
  className = '',
  ...props
}) {
  const base = "inline-flex items-center font-medium rounded-button tracking-wide";

  const variants = {
    gold: "bg-accent-100 text-neutral-900 border border-accent-300/80",
    terracotta: "bg-terracotta-50 text-terracotta-800 border border-terracotta-200",
    primary: "bg-primary-50 text-primary-900 border border-primary-200",
    navy: "bg-primary-900 text-neutral-100",
    neutral: "bg-neutral-100 text-neutral-700 border border-neutral-200",
    success: "bg-emerald-50 text-emerald-800 border border-emerald-200",
    outline: "bg-transparent text-neutral-700 border border-neutral-300",
  };

  const sizes = {
    sm: "text-[11px] px-2 py-0.5 font-medium",
    md: "text-xs px-2.5 py-0.5 font-medium",
    lg: "text-sm px-3.5 py-1 font-medium",
  };

  return (
    <span
      className={`${base} ${variants[variant] || variants.gold} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
