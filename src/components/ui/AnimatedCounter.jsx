import React, { useEffect, useRef, useState } from 'react';

/**
 * Format a number using the Indian numbering system:
 * e.g., 5000 -> 5,000; 12500 -> 12,500; 100000 -> 1,00,000; 1234567 -> 12,34,567
 */
export function formatIndianNumber(val, decimals = 0) {
  if (val === null || val === undefined || isNaN(val)) return '';
  const num = Number(val);
  const fixed = decimals > 0 ? num.toFixed(decimals) : Math.round(num).toString();
  const parts = fixed.split('.');
  let integerPart = parts[0];
  const decimalPart = parts.length > 1 ? '.' + parts[1] : '';

  const isNegative = integerPart.startsWith('-');
  if (isNegative) integerPart = integerPart.slice(1);

  if (integerPart.length <= 3) {
    return (isNegative ? '-' : '') + integerPart + decimalPart;
  }

  // Last 3 digits
  const lastThree = integerPart.slice(-3);
  const otherDigits = integerPart.slice(0, -3);
  // Group the preceding digits in pairs of two
  const formattedOther = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  return (isNegative ? '-' : '') + formattedOther + ',' + lastThree + decimalPart;
}

/**
 * Standard format function: formats with Indian commas by default,
 * or returns raw number/float if formatting is disabled.
 */
function defaultFormat(val, decimals, useGrouping) {
  if (!useGrouping) {
    return decimals > 0 ? Number(val).toFixed(decimals) : Math.round(Number(val)).toString();
  }
  return formatIndianNumber(val, decimals);
}

/**
 * AnimatedCounter component
 * 
 * Props:
 * - value: number | string (target value, e.g. 5000, 200, 10, 99.4)
 * - from?: number (start value, default: 0)
 * - duration?: number (animation duration in ms, default: 2000)
 * - prefix?: string (e.g. "Rank ", "AIR ")
 * - suffix?: string (e.g. "+", "%", "K")
 * - decimals?: number (decimal places, auto-detected if not provided, e.g. 99.4 has 1)
 * - useGrouping?: boolean (format with Indian commas e.g. 12,500, default: true)
 * - delay?: number (stagger delay in ms, default: 0)
 * - className?: string
 * - as?: React.ElementType (default: 'span')
 */
export function AnimatedCounter({
  value,
  from = 0,
  duration = 2000,
  prefix = '',
  suffix = '',
  decimals,
  useGrouping = true,
  delay = 0,
  className = '',
  as: Component = 'span',
  ...props
}) {
  const containerRef = useRef(null);

  // Normalize final numeric value
  const numValue = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : Number(value);
  const isValidNum = !isNaN(numValue);

  // Auto-detect decimals if not explicitly passed (e.g. 99.4 -> 1)
  const resolvedDecimals = decimals !== undefined ? decimals : (
    isValidNum && String(value).includes('.') ? (String(value).split('.')[1] || '').length : 0
  );

  // Format the target final string for SEO, noscript and layout-reservation
  const finalFormatted = isValidNum
    ? defaultFormat(numValue, resolvedDecimals, useGrouping)
    : String(value);

  // Initial state: Start from `from` if valid, otherwise fallback to final
  const [currentValue, setCurrentValue] = useState(() => (isValidNum ? from : numValue));
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isValidNum) return;

    // 1. Respect prefers-reduced-motion: show final number immediately
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCurrentValue(numValue);
      setHasAnimated(true);
      return;
    }

    // 2. Fallback if IntersectionObserver is unsupported: show final value immediately
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setCurrentValue(numValue);
      setHasAnimated(true);
      return;
    }

    const node = containerRef.current;
    if (!node) return;

    let rAFId = null;
    let delayTimer = null;
    let animationTriggered = false;

    const startAnimation = () => {
      if (animationTriggered) return;
      animationTriggered = true;
      setHasAnimated(true);

      let startTime = null;
      const startVal = from;
      const endVal = numValue;
      const change = endVal - startVal;

      // Quartic ease-out: brisk start, gentle deceleration at end
      const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutQuart(progress);
        const current = startVal + change * eased;

        setCurrentValue(current);

        if (progress < 1) {
          rAFId = requestAnimationFrame(step);
        } else {
          setCurrentValue(endVal); // Ensure exact final value landing
        }
      };

      rAFId = requestAnimationFrame(step);
    };

    const triggerWithDelay = () => {
      if (delay > 0) {
        delayTimer = setTimeout(startAnimation, delay);
      } else {
        startAnimation();
      }
    };

    // If already in viewport on mount (e.g. scrolled or above fold)
    const rect = node.getBoundingClientRect();
    const isVisibleNow = rect.top < window.innerHeight * 0.85 && rect.bottom > 0;
    if (isVisibleNow) {
      triggerWithDelay();
      return () => {
        if (rAFId) cancelAnimationFrame(rAFId);
        if (delayTimer) clearTimeout(delayTimer);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animationTriggered) {
            observer.unobserve(entry.target);
            triggerWithDelay();
          }
        });
      },
      {
        threshold: 0.4, // Run when ~40% visible as requested
      }
    );

    observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
      observer.disconnect();
      if (rAFId) cancelAnimationFrame(rAFId);
      if (delayTimer) clearTimeout(delayTimer);
    };
  }, [numValue, from, duration, delay, isValidNum]);

  const displayString = isValidNum
    ? defaultFormat(currentValue, resolvedDecimals, useGrouping)
    : finalFormatted;

  return (
    <Component
      ref={containerRef}
      className={`inline-flex items-baseline font-tabular-nums ${className}`}
      style={{ fontVariantNumeric: 'tabular-nums' }}
      aria-label={`${prefix}${finalFormatted}${suffix}`}
      {...props}
    >
      {/* Reserve width based on final string to prevent layout shifting during digit updates */}
      <span className="relative inline-flex items-baseline">
        {/* Invisible ghost placeholder reserving maximum final width */}
        <span className="invisible select-none pointer-events-none" aria-hidden="true">
          {prefix}{finalFormatted}{suffix}
        </span>
        {/* Active counting value overlay */}
        <span className="absolute inset-0 flex items-baseline select-none">
          {prefix}{displayString}{suffix}
        </span>
      </span>
      {/* Hidden text for screen-readers & SEO bots */}
      <span className="sr-only">
        {prefix}{finalFormatted}{suffix}
      </span>
    </Component>
  );
}
