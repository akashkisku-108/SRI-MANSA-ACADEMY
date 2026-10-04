import React from 'react';

/**
 * Accessible Skeleton loading placeholder primitive.
 */
export function Skeleton({
  variant = 'rectangular', // 'text' | 'circular' | 'rectangular'
  width,
  height,
  className = '',
  ...props
}) {
  const base = "animate-pulse bg-neutral-200";

  const variants = {
    text: "h-4 rounded my-1 w-full",
    circular: "rounded-full shrink-0",
    rectangular: "rounded-card",
  };

  const style = {};
  if (width) style.width = width;
  if (height) style.height = height;

  return (
    <div
      aria-hidden="true"
      style={style}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}

/**
 * Card skeleton placeholder for course and faculty listings.
 */
export function CardSkeleton() {
  return (
    <div className="bg-white p-6 rounded-card border border-neutral-200/80 shadow-card animate-pulse flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Skeleton variant="rectangular" className="h-6 w-24 rounded-full" />
        <Skeleton variant="rectangular" className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton variant="text" className="h-7 w-3/4" />
      <Skeleton variant="text" className="h-4 w-full" />
      <Skeleton variant="text" className="h-4 w-5/6" />
      <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
        <Skeleton variant="rectangular" className="h-5 w-28" />
        <Skeleton variant="rectangular" className="h-10 w-28 rounded-button" />
      </div>
    </div>
  );
}

/**
 * Table row skeleton for results.
 */
export function TableRowSkeleton({ cols = 5 }) {
  return (
    <tr className="animate-pulse border-b border-neutral-100">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="py-4 px-4">
          <Skeleton variant="text" className="h-4 w-4/5" />
        </td>
      ))}
    </tr>
  );
}
