import React from 'react';
import { SearchX } from 'lucide-react';
import { Button } from './Button';

/**
 * EmptyState display when filters return no records.
 */
export function EmptyState({
  icon: Icon = SearchX,
  title = "No results found",
  description = "We couldn't find any items matching your active criteria.",
  actionText,
  onAction,
  className = '',
}) {
  return (
    <div className={`text-center py-16 px-4 max-w-md mx-auto flex flex-col items-center ${className}`}>
      <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-4 border border-neutral-200">
        <Icon className="w-8 h-8" aria-hidden="true" />
      </div>
      <h3 className="text-xl font-serif font-bold text-neutral-900 mb-2">
        {title}
      </h3>
      <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
}
