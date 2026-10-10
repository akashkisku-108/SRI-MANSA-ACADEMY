import React, { useEffect, useRef } from 'react';
import { Button } from './Button';

/**
 * Brand Confetti Burst
 * Lightweight canvas explosion from center: 35 pieces in brand colors + gold, falls ~1.5s, auto cleaned up.
 * Pointer-events none, zero external libraries.
 */
function ConfettiCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Brand Palette: Terracotta (#C86244, #DE7F64), Gold (#C9A436, #E0C168), Deep Indigo (#122033), Emerald (#059669)
    const colors = ['#C86244', '#DE7F64', '#C9A436', '#E0C168', '#122033', '#059669', '#F59E0B'];

    const pieces = [];
    const count = 36;
    const originX = width / 2;
    const originY = Math.min(height / 2, 80);

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const speed = 3.5 + Math.random() * 5.5;
      pieces.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.5,
        gravity: 0.18 + Math.random() * 0.08,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 5 + Math.random() * 5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        opacity: 1,
        drag: 0.985,
      });
    }

    let animId;
    const startTime = performance.now();
    const duration = 1600; // ~1.5 - 1.6s

    function render(now) {
      const elapsed = now - startTime;
      ctx.clearRect(0, 0, width, height);

      if (elapsed >= duration) {
        // Complete and clean up
        return;
      }

      const progress = elapsed / duration;
      const fadeProgress = progress > 0.7 ? (1 - progress) / 0.3 : 1;

      for (let p of pieces) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= p.drag;
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.opacity * fadeProgress);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-20"
      aria-hidden="true"
    />
  );
}

/**
 * Reusable Form Success Panel
 * - Green circle drawing itself with inner checkmark (SVG stroke-dashoffset, ~700ms)
 * - 35-piece confetti burst falling for ~1.5s
 * - "Thank you!" heading and "We have received your details. Our team will call you shortly."
 * - "Send another enquiry" button to restore the form
 * - Full Light/Night mode contrast and role="status" / aria-live="polite"
 */
export function FormSuccessPanel({
  title = "Thank you!",
  message = "We have received your details. Our team will call you shortly.",
  referenceId,
  onReset,
  buttonText = "Send another enquiry",
  additionalInfo
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="relative text-center py-8 px-4 sm:px-6 space-y-6 transition-opacity duration-300 ease-out"
    >
      <ConfettiCanvas />

      {/* Animated Green Circle with Checkmark */}
      <div className="relative mx-auto w-16 h-16 flex items-center justify-center">
        <svg
          className="w-16 h-16"
          viewBox="0 0 52 52"
          fill="none"
          aria-hidden="true"
        >
          {/* Background circle outline */}
          <circle
            cx="26"
            cy="26"
            r="24"
            className="stroke-emerald-200 dark:stroke-emerald-900/60"
            strokeWidth="3"
          />
          {/* Animated drawing circle */}
          <circle
            cx="26"
            cy="26"
            r="24"
            className="stroke-emerald-600 dark:stroke-emerald-400 success-draw-circle"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Animated drawing checkmark */}
          <path
            d="M14 27 L22 35 L38 18"
            className="stroke-emerald-600 dark:stroke-emerald-400 success-draw-check"
            strokeWidth="3.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Headings & Confirmation */}
      <div className="space-y-2">
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-primary-950 dark:text-neutral-50 tracking-tight">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-md mx-auto leading-relaxed">
          {message}
        </p>
      </div>

      {/* Optional reference id or additional details */}
      {referenceId && (
        <div className="bg-surface-warm dark:bg-neutral-800/80 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700/80 max-w-sm mx-auto text-left space-y-1">
          <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
            <span>Enquiry Reference:</span>
            <span className="font-mono font-bold text-primary-950 dark:text-neutral-100 text-sm">
              {referenceId}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
            <span>Response Guarantee:</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Within 24 Working Hours</span>
          </div>
        </div>
      )}

      {additionalInfo}

      {/* Reset Action */}
      <div className="pt-2">
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={onReset}
          className="mx-auto"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
