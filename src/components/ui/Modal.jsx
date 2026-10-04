import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

/**
 * Accessible Modal dialog with keyboard trapping, Escape listener, and body scroll lock.
 */
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-2xl',
  ariaLabelledBy = 'modal-title',
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // Body scroll locking
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus inside modal
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements?.[0];
    firstElement?.focus();

    // Escape key handler
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }

      // Trap focus
      if (e.key === 'Tab' && focusableElements && focusableElements.length > 0) {
        const lastElement = focusableElements[focusableElements.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? ariaLabelledBy : undefined}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-primary-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog box */}
      <div
        ref={modalRef}
        className={`relative w-full ${maxWidth} bg-white rounded-card shadow-elevated border border-neutral-200 z-10 overflow-hidden transform transition-all my-8`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50/50">
          {title && (
            <h3 id={ariaLabelledBy} className="text-lg font-serif font-bold text-primary-950">
              {title}
            </h3>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-2 ml-auto text-neutral-500 hover:text-neutral-900 rounded-button hover:bg-neutral-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(85vh-100px)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
