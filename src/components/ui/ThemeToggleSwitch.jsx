import React from 'react';
import { useTheme } from '../../context/ThemeContext';

/**
 * Pill-shaped Theme Switch matching custom minimalist visual design:
 * - Light Mode: Near-white pill track with soft light-gray outline (#DDDDE3),
 *   light-gray circular knob (#DEDEE3) on the left containing dark charcoal (#2F3237)
 *   solid sun icon with 8 flat rectangular rays.
 * - Dark Mode: Dark capsule track fill (#212529) with subtle outline (#373B41),
 *   darker gray knob (#3B3F46) slid to the right containing an off-white (#E5E7EB)
 *   flat crescent moon icon.
 * - Keyboard accessible, role="switch", aria-checked, smooth 300ms ease-in-out transition.
 */
export function ThemeToggleSwitch({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
      className={`relative inline-flex items-center shrink-0 cursor-pointer select-none rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-terracotta-500
        w-[48px] h-[30px] sm:w-[56px] sm:h-[34px]
        p-[2px]
        ${isDark
          ? 'bg-[#1E2228] border-2 border-[#383C44]'
          : 'bg-[#FFFFFF] border-2 border-[#DDDDE3]'
        }
        ${className}`}
    >
      {/* Sliding Circular Knob */}
      <span
        className={`relative flex items-center justify-center rounded-full transition-transform duration-300 ease-in-out
          w-[24px] h-[24px] sm:w-[28px] sm:h-[28px]
          ${isDark
            ? 'translate-x-[16px] sm:translate-x-[20px] bg-[#363B43]'
            : 'translate-x-0 bg-[#DEDEE3]'
          }
        `}
      >
        {/* Sun Icon (Light mode) */}
        <svg
          viewBox="0 0 24 24"
          className={`absolute w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all duration-300 ${
            isDark ? 'opacity-0 scale-75 rotate-90 pointer-events-none' : 'opacity-100 scale-100 rotate-0 text-[#2F3237]'
          }`}
          fill="currentColor"
          aria-hidden="true"
        >
          {/* Solid center circle */}
          <circle cx="12" cy="12" r="5" />
          {/* 8 flat rectangular rays */}
          {/* Top & Bottom */}
          <rect x="11" y="1" width="2" height="3" rx="0.4" />
          <rect x="11" y="20" width="2" height="3" rx="0.4" />
          {/* Left & Right */}
          <rect x="1" y="11" width="3" height="2" rx="0.4" />
          <rect x="20" y="11" width="3" height="2" rx="0.4" />
          {/* Diagonals */}
          <rect x="3.8" y="4.5" width="2" height="3" rx="0.4" transform="rotate(-45 4.8 6)" />
          <rect x="18.2" y="15" width="2" height="3" rx="0.4" transform="rotate(-45 19.2 16.5)" />
          <rect x="15" y="3.8" width="2" height="3" rx="0.4" transform="rotate(45 16 5.3)" />
          <rect x="4.5" y="18.2" width="2" height="3" rx="0.4" transform="rotate(45 5.5 19.7)" />
        </svg>

        {/* Crescent Moon Icon (Dark mode) */}
        <svg
          viewBox="0 0 24 24"
          className={`absolute w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all duration-300 ${
            isDark ? 'opacity-100 scale-100 rotate-0 text-[#E5E7EB]' : 'opacity-0 scale-75 -rotate-90 pointer-events-none'
          }`}
          fill="currentColor"
          aria-hidden="true"
        >
          {/* Clean flat crescent moon matching image */}
          <path d="M12.3 2a10 10 0 0 0-.19 20 10 10 0 0 0 9.89-8.48c-1.12.32-2.31.48-3.5.48a9.5 9.5 0 0 1-9.5-9.5c0-1.03.17-2.04.5-3A9.97 9.97 0 0 0 12.3 2z" />
        </svg>
      </span>
    </button>
  );
}
