import React from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  Atom, 
  Compass, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

const MARQUEE_ITEMS = [
  { label: 'Class 8 to 12', icon: GraduationCap },
  { label: 'CBSE', icon: BookOpen },
  { label: 'ICSE', icon: Compass },
  { label: 'NEET', icon: Atom },
  { label: 'IIT-JEE', icon: Award },
  { label: 'Foundation', icon: Sparkles },
  { label: 'Board Exams', icon: CheckCircle2 },
];

export function HeroMarquee() {
  // Duplicate array 3 times for completely seamless infinite loop
  const repeatedItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div
      className="relative w-full py-4 border-b border-neutral-200/80 dark:border-white/10 bg-surface-parchment/70 dark:bg-primary-950/40 backdrop-blur-xs overflow-hidden select-none"
      aria-label="Curriculum streams and examination programs"
    >
      {/* Left and Right Edge Gradient Masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-surface-parchment dark:from-neutral-950 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-surface-parchment dark:from-neutral-950 to-transparent z-10" />

      {/* Marquee Track (Infinite horizontal animation, pauses on hover) */}
      <div className="hero-marquee-track flex items-center gap-3 whitespace-nowrap will-change-transform">
        {repeatedItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={`${item.label}-${index}`}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-white/10 border border-neutral-200/90 dark:border-white/15 text-xs font-semibold tracking-wide text-primary-950 dark:text-neutral-100 shadow-2xs hover:border-terracotta-400 hover:text-terracotta-600 transition-colors"
            >
              <Icon className="w-3.5 h-3.5 text-terracotta-600 dark:text-terracotta-400 shrink-0" aria-hidden="true" />
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
